/**
 * `task parse entity <input>` — pull semi-structured tokens out
 * of arbitrary text. Each entity kind delegates to a battle-
 * tested library so the regex edge cases (IDN URLs, IPv6
 * `::` zero-compression, Luhn-valid credit cards, libphonenumber
 * country routing) are someone else's problem.
 *
 * Backends:
 *   email / url  — `linkify-it`
 *   ip           — `ip-regex`
 *   phone        — `libphonenumber-js/min` (findPhoneNumbersInText)
 *   cc           — regex candidate + `validator.isCreditCard`
 *   mac          — regex candidate + `validator.isMACAddress`
 *   uuid         — regex candidate + `validator.isUUID`
 *   bitcoin      — regex candidate + `validator.isBtcAddress`
 *   ssn          — pure regex (US-only, stable shape)
 *
 * Pass `kinds` to scope; default extracts every kind. Each match
 * is returned with its byte-offset window so the caller can
 * highlight the original text.
 */

import fs from 'node:fs/promises'
import LinkifyIt from 'linkify-it'
import ipRegex from 'ip-regex'
import { findPhoneNumbersInText } from 'libphonenumber-js/min'
import validator from 'validator'

export type EntityKind =
  | 'email'
  | 'url'
  | 'ip'
  | 'phone'
  | 'cc'
  | 'ssn'
  | 'mac'
  | 'bitcoin'
  | 'uuid'

export type ParseEntityNodeInput = {
  /** Either a path to read or raw text (use `text` for the latter). */
  input?: { file?: { path: string }; text?: string }
  /** Where to write the JSON result. Stdout if omitted. */
  output?: { file?: { path: string } }
  kinds?: ReadonlyArray<EntityKind>
  /** Deduplicate by (kind, value) — default true. */
  unique?: boolean
  /** Default country for libphonenumber when a number lacks `+`. */
  phoneCountry?: string
}

export type ParseEntityMatch = {
  kind: EntityKind
  value: string
  start: number
  end: number
  /** Per-kind extras (libphonenumber gives e164 + country, etc.). */
  meta?: Record<string, unknown>
}

export type ParseEntityNodeOutput = {
  matches: ParseEntityMatch[]
}

const ALL_KINDS: ReadonlyArray<EntityKind> = [
  'email', 'url', 'ip', 'phone', 'cc', 'ssn', 'mac', 'bitcoin', 'uuid',
]

// Candidate regexes — these find shapes; validator confirms.
// 13–19 digits with optional space/dash separators; no trailing
// separator (the final position is always a digit).
const CC_CANDIDATE = /\b\d(?:[ -]?\d){12,18}\b/g
const SSN = /\b\d{3}-\d{2}-\d{4}\b/g
const MAC_CANDIDATE = /\b(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b/g
const UUID_CANDIDATE =
  /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g
// Bitcoin addresses span legacy P2PKH/P2SH (base58), bech32 segwit
// (bc1...), and bech32m taproot (bc1p...). Keep the candidate
// permissive; validator.isBtcAddress decides.
const BTC_CANDIDATE = /\b(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-z0-9]{25,87})\b/g

// Built once — linkify-it is allocation-cheap but reusing the
// instance keeps fragmentation down across many calls.
const linkify = new LinkifyIt()

async function parseEntityNode(
  source: ParseEntityNodeInput,
): Promise<ParseEntityNodeOutput> {
  const text = await readSource(source)
  const wanted = source.kinds && source.kinds.length > 0
    ? new Set(source.kinds)
    : new Set(ALL_KINDS)
  const unique = source.unique !== false

  const matches: ParseEntityMatch[] = []
  const seen = new Set<string>()
  const country = source.phoneCountry ?? 'US'

  const push = (m: ParseEntityMatch) => {
    if (unique) {
      const key = `${m.kind}\t${m.value}`
      if (seen.has(key)) return
      seen.add(key)
    }
    matches.push(m)
  }

  if (wanted.has('email') || wanted.has('url')) {
    for (const m of linkify.match(text) ?? []) {
      const isEmail = m.schema === 'mailto:'
      const kind: EntityKind = isEmail ? 'email' : 'url'
      if (!wanted.has(kind)) continue
      push({
        kind,
        value: isEmail ? m.text : m.url,
        start: m.index,
        end: m.lastIndex,
      })
    }
  }

  if (wanted.has('ip')) {
    const re = new RegExp(ipRegex({ exact: false }).source, 'g')
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      push({
        kind: 'ip',
        value: m[0],
        start: m.index,
        end: m.index + m[0].length,
      })
    }
  }

  if (wanted.has('phone')) {
    for (const m of findPhoneNumbersInText(text, country as never)) {
      push({
        kind: 'phone',
        value: m.number.number, // E.164
        start: m.startsAt,
        end: m.endsAt,
        meta: {
          country: m.number.country,
          national: m.number.formatNational(),
        },
      })
    }
  }

  if (wanted.has('cc')) collectByRegex(text, CC_CANDIDATE, 'cc', push, validator.isCreditCard)
  if (wanted.has('ssn')) collectByRegex(text, SSN, 'ssn', push)
  if (wanted.has('mac')) collectByRegex(text, MAC_CANDIDATE, 'mac', push, v => validator.isMACAddress(v))
  if (wanted.has('uuid')) collectByRegex(text, UUID_CANDIDATE, 'uuid', push, v => validator.isUUID(v))
  if (wanted.has('bitcoin')) collectByRegex(text, BTC_CANDIDATE, 'bitcoin', push, v => validator.isBtcAddress(v))

  matches.sort((a, b) => a.start - b.start)

  const output: ParseEntityNodeOutput = { matches }
  const dst = source.output?.file?.path
  if (dst) {
    await fs.writeFile(dst, JSON.stringify(output, null, 2) + '\n')
  }
  return output
}

function collectByRegex(
  text: string,
  pattern: RegExp,
  kind: EntityKind,
  push: (m: ParseEntityMatch) => void,
  validate?: (value: string) => boolean,
): void {
  const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const value = m[0]
    if (validate && !validate(value)) continue
    push({ kind, value, start: m.index, end: m.index + value.length })
  }
}

async function readSource(input: ParseEntityNodeInput): Promise<string> {
  if (input.input?.text !== undefined) return input.input.text
  const p = input.input?.file?.path
  if (!p) {
    throw new Error('parse entity: provide input.file.path or input.text')
  }
  return fs.readFile(p, 'utf8')
}

export default parseEntityNode
export { parseEntityNode }
