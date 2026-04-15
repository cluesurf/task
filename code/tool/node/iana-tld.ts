/**
 * IANA TLD list helper.
 *
 * Fetches the canonical list at
 *   https://data.iana.org/TLD/tlds-alpha-by-domain.txt
 * and classifies each entry as `generic`, `country`,
 * `sponsored`, `infrastructure`, `test`, or `unknown`.
 *
 * The classification is heuristic: IANA's text file does
 * not include category metadata, so we use:
 *
 *   - the well-known `arpa` infrastructure TLD
 *   - the `test` TLD (RFC 6761)
 *   - 2-letter ASCII labels → `country` (matches the
 *     ICANN ccTLD definition for the vast majority of
 *     codes; punycode IDN ccTLDs are flagged as `country`
 *     when the corresponding ISO 3166-1 alpha-2 maps in)
 *   - everything else → `generic`
 *
 * For richer metadata (sponsoring org, agreement type,
 * delegation date) the IANA root zone DB at
 *   https://www.iana.org/domains/root/db
 * is the source of truth, but it has no machine-readable
 * bulk feed.
 *
 * Results are cached in `~/.cache/cluesurf-task/iana-tlds.json`
 * for `CACHE_TTL_MS` to avoid hammering IANA on every
 * `task list domain --form tld` invocation.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const IANA_URL =
  'https://data.iana.org/TLD/tlds-alpha-by-domain.txt'

const CACHE_DIR = path.join(
  os.homedir(),
  '.cache',
  'cluesurf-task',
)
const CACHE_FILE = path.join(CACHE_DIR, 'iana-tlds.json')
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24h

export type IanaTldKind =
  | 'generic'
  | 'country'
  | 'sponsored'
  | 'infrastructure'
  | 'test'
  | 'unknown'

export type IanaTld = {
  /** Lowercase ASCII (or A-label punycode for IDN ccTLDs). */
  tld: string
  kind: IanaTldKind
}

type CacheShape = {
  fetchedAt: number
  tlds: IanaTld[]
}

function classify(tld: string): IanaTldKind {
  if (tld === 'arpa') return 'infrastructure'
  if (tld === 'test' || tld === 'example' || tld === 'invalid' || tld === 'localhost') {
    return 'test'
  }
  // Punycode IDN ccTLDs start with `xn--` and are usually
  // country-coded. Default them to `country`; users can
  // override via `--type` if they need a stricter cut.
  if (tld.startsWith('xn--')) return 'country'
  if (/^[a-z]{2}$/.test(tld)) return 'country'
  return 'generic'
}

async function loadCache(): Promise<CacheShape | undefined> {
  try {
    const raw = await fs.readFile(CACHE_FILE, 'utf-8')
    const parsed = JSON.parse(raw) as CacheShape
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      return undefined
    }
    return parsed
  } catch {
    return undefined
  }
}

async function saveCache(value: CacheShape): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true })
  await fs.writeFile(CACHE_FILE, JSON.stringify(value))
}

async function fetchFresh(): Promise<IanaTld[]> {
  const res = await fetch(IANA_URL)
  if (!res.ok) {
    throw new Error(
      `iana tld list: HTTP ${res.status} from ${IANA_URL}`,
    )
  }
  const text = await res.text()
  const tlds: IanaTld[] = []
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const tld = trimmed.toLowerCase()
    tlds.push({ tld, kind: classify(tld) })
  }
  return tlds
}

/**
 * Return the IANA TLD list, optionally filtered by kind.
 * Cached for a day on disk.
 */

export async function loadIanaTlds(options?: {
  kind?: IanaTldKind | IanaTldKind[]
  /** Bypass the on-disk cache. */
  force?: boolean
}): Promise<IanaTld[]> {
  let cached = options?.force ? undefined : await loadCache()
  if (!cached) {
    const tlds = await fetchFresh()
    cached = { fetchedAt: Date.now(), tlds }
    await saveCache(cached)
  }
  let out = cached.tlds
  if (options?.kind) {
    const allowed = new Set<IanaTldKind>(
      Array.isArray(options.kind) ? options.kind : [options.kind],
    )
    out = out.filter(t => allowed.has(t.kind))
  }
  return out
}
