/**
 * Worker for `task scout domain`.
 *
 * Steps:
 *
 *   1. Resolve the extension list. `all` and `tld:*`
 *      pull from the IANA list; `--type generic` etc.
 *      filter it.
 *   2. Expand the pattern spec into a candidate FQDN
 *      list (`shared.expandPatterns`).
 *   3. If the user passed `<domain>` directly (e.g.
 *      `task scout domain example.com`) feed it in too.
 *   4. Run each requested provider concurrently via the
 *      existing `check/domain/node.ts` dispatcher.
 *   5. Merge per-provider results into a single
 *      `DomainCheckResult[]`, applying `--status` filter,
 *      `--sort`, `--limit`, and the chosen output shape.
 *
 * The provider list is honored as a "quorum-on-demand"
 * surface: if any provider returns `available=true`, we
 * mark the domain as `available=true` in the merged
 * record but keep every provider's verdict in
 * `details.providerVerdicts` so the caller can see who
 * disagreed.
 */

import {
  loadIanaTlds,
  type IanaTldKind,
} from '~/code/tool/node/iana-tld'
import { checkDomainNode } from '~/code/call/check/domain/node'
import type {
  DomainCheckResult,
  DomainProvider,
} from '~/code/call/check/domain/make'

import { expandPatterns, parsePatternList } from './shared'

export type ScoutDomainStatus = 'available' | 'taken' | 'error' | 'all'
export type ScoutDomainSort = 'name' | 'length' | 'available' | 'tld'
export type ScoutDomainOutput = 'json' | 'csv' | 'text'

export type ScoutDomainNodeInput = {
  /** Full FQDN or bare label. Optional when patterns are set. */
  domain?: string
  /** TLD list. `all` resolves via IANA. */
  extension?: string[] | string
  /** Restrict the IANA expansion when `extension=all`. */
  tldType?: IanaTldKind | 'all'
  /** Wildcard text patterns. */
  text?: string[] | string
  prefix?: string
  suffix?: string
  contains?: string
  length?: number
  lengthMin?: number
  lengthMax?: number
  alphabet?: string
  noDigits?: boolean
  noHyphens?: boolean
  exclude?: string
  /** Provider list (CSV or repeated). */
  provider?: string[] | string
  /** Merged-result filter. */
  status?: ScoutDomainStatus
  sort?: ScoutDomainSort
  reverse?: boolean
  limit?: number
  /** Hard cap on candidate generation. */
  maxCandidates?: number
  /** Per-provider concurrency. */
  concurrency?: number
}

export type ScoutDomainNodeOutput = {
  candidateCount: number
  results: ScoutDomainResult[]
}

export type ScoutDomainResult = {
  domain: string
  available: boolean
  /**
   * Per-provider verdicts. `true` / `false` is the
   * `available` flag from each provider; `'error'` flags
   * a provider that could not answer.
   */
  providerVerdicts: Record<string, boolean | 'error'>
  errors?: Array<{ provider: string; message: string }>
}

const DEFAULT_PROVIDERS: DomainProvider[] = ['namecheap']
const DEFAULT_MAX_CANDIDATES = 100_000

/**
 * Resolve the `--extension` flag into a concrete TLD list.
 * Handles `'all'` plus `--type` filtering.
 */

async function resolveExtensions({
  extensions,
  tldType,
}: {
  extensions: string[]
  tldType: IanaTldKind | 'all' | undefined
}): Promise<string[]> {
  if (extensions.length === 0) return []
  if (extensions.length === 1 && extensions[0] === 'all') {
    const tlds = await loadIanaTlds({
      kind: tldType && tldType !== 'all' ? tldType : undefined,
    })
    return tlds.map(t => t.tld)
  }
  return extensions.map(e => e.replace(/^\./, '').toLowerCase())
}

/**
 * Split FQDNs from bare labels in the user's positional
 * input. `example.com` is a full FQDN; `example` is a
 * bare label that needs cross-product with `extensions`.
 */

function splitDomainArg(value: string | undefined): {
  fqdn: string | undefined
  label: string | undefined
} {
  if (!value) return { fqdn: undefined, label: undefined }
  return value.includes('.')
    ? { fqdn: value.toLowerCase(), label: undefined }
    : { fqdn: undefined, label: value.toLowerCase() }
}

/**
 * Run one provider against the candidate list and return
 * per-domain results.
 */

async function runOneProvider({
  provider,
  candidates,
}: {
  provider: DomainProvider
  candidates: string[]
}): Promise<{
  results: DomainCheckResult[]
  error?: string
}> {
  try {
    const out = await checkDomainNode({
      source: { input: { domain: candidates, provider } },
    })
    return { results: out.results }
  } catch (err) {
    return {
      results: [],
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

function mergeProviderResults({
  providers,
  perProvider,
}: {
  providers: DomainProvider[]
  perProvider: Map<DomainProvider, DomainCheckResult[]>
}): ScoutDomainResult[] {
  const merged = new Map<string, ScoutDomainResult>()
  for (const provider of providers) {
    const rows = perProvider.get(provider) ?? []
    for (const row of rows) {
      const existing = merged.get(row.domain) ?? {
        domain: row.domain,
        available: false,
        providerVerdicts: {},
      }
      if (row.errorCode || row.errorMessage) {
        existing.providerVerdicts[provider] = 'error'
        existing.errors = existing.errors ?? []
        existing.errors.push({
          provider,
          message:
            row.errorMessage ?? `error ${row.errorCode ?? '?'}`,
        })
      } else {
        existing.providerVerdicts[provider] = row.available
        if (row.available) existing.available = true
      }
      merged.set(row.domain, existing)
    }
  }
  return Array.from(merged.values())
}

function applyStatusFilter(
  results: ScoutDomainResult[],
  status: ScoutDomainStatus | undefined,
): ScoutDomainResult[] {
  switch (status) {
    case 'available':
      return results.filter(r => r.available)
    case 'taken':
      return results.filter(r => !r.available && !r.errors)
    case 'error':
      return results.filter(r => r.errors && r.errors.length > 0)
    case 'all':
    case undefined:
      return results
    default:
      return results
  }
}

function sortResults(
  results: ScoutDomainResult[],
  sort: ScoutDomainSort | undefined,
  reverse: boolean,
): ScoutDomainResult[] {
  const out = results.slice()
  switch (sort) {
    case 'length':
      out.sort(
        (a, b) =>
          a.domain.length - b.domain.length ||
          a.domain.localeCompare(b.domain),
      )
      break
    case 'available':
      out.sort((a, b) => {
        if (a.available !== b.available) return a.available ? -1 : 1
        return a.domain.localeCompare(b.domain)
      })
      break
    case 'tld':
      out.sort((a, b) => {
        const ta = a.domain.split('.').slice(-1)[0] ?? ''
        const tb = b.domain.split('.').slice(-1)[0] ?? ''
        return ta.localeCompare(tb) || a.domain.localeCompare(b.domain)
      })
      break
    case 'name':
    default:
      out.sort((a, b) => a.domain.localeCompare(b.domain))
      break
  }
  return reverse ? out.reverse() : out
}

async function scoutDomainNode({
  source,
}: {
  source: ScoutDomainNodeInput
}): Promise<ScoutDomainNodeOutput> {
  const extensions = await resolveExtensions({
    extensions: parsePatternList(source.extension),
    tldType: source.tldType,
  })

  const { fqdn, label } = splitDomainArg(source.domain)

  const candidateSet = new Set<string>()
  if (fqdn) candidateSet.add(fqdn)
  if (label) {
    for (const tld of extensions) candidateSet.add(`${label}.${tld}`)
  }

  // Pattern-based expansion only fires when at least one
  // pattern flag is set; otherwise the positional
  // `domain` and `--extension` cross-product carry the
  // request alone.
  const hasPattern =
    !!source.text ||
    !!source.prefix ||
    !!source.suffix ||
    !!source.contains ||
    source.length !== undefined ||
    source.lengthMin !== undefined ||
    source.lengthMax !== undefined

  if (hasPattern) {
    if (extensions.length === 0) {
      throw new Error(
        'scout domain: --extension (or --tld) is required when using pattern flags',
      )
    }
    const expanded = expandPatterns({
      text: parsePatternList(source.text),
      prefix: source.prefix,
      suffix: source.suffix,
      contains: source.contains,
      length: source.length,
      lengthMin: source.lengthMin,
      lengthMax: source.lengthMax,
      alphabet: source.alphabet,
      noDigits: source.noDigits,
      noHyphens: source.noHyphens,
      exclude: source.exclude ? new RegExp(source.exclude) : undefined,
      extensions,
      maxCandidates: source.maxCandidates ?? DEFAULT_MAX_CANDIDATES,
    })
    for (const c of expanded.candidates) candidateSet.add(c)
  }

  const candidates = Array.from(candidateSet)
  if (candidates.length === 0) {
    return { candidateCount: 0, results: [] }
  }

  const providers: DomainProvider[] = (
    parsePatternList(source.provider) as DomainProvider[]
  ).filter(Boolean).length
    ? (parsePatternList(source.provider) as DomainProvider[])
    : DEFAULT_PROVIDERS

  // Each provider runs in its own task, but candidates
  // are shared across providers so the underlying
  // namecheap/godaddy/etc. workers can do their own
  // batching. `concurrency` here is the per-provider
  // fan-out; the providers themselves run in parallel
  // unconditionally.
  const perProvider = new Map<DomainProvider, DomainCheckResult[]>()
  await Promise.all(
    providers.map(async provider => {
      const { results, error } = await runOneProvider({
        provider,
        candidates,
      })
      if (error) {
        // Synthesize an error row for every candidate so
        // the merge step can flag the provider as failed.
        perProvider.set(
          provider,
          candidates.map(domain => ({
            domain,
            available: false,
            provider,
            errorMessage: error,
          })),
        )
      } else {
        perProvider.set(provider, results)
      }
    }),
  )

  let merged = mergeProviderResults({ providers, perProvider })
  merged = applyStatusFilter(merged, source.status)
  merged = sortResults(merged, source.sort, source.reverse ?? false)
  if (source.limit !== undefined) {
    merged = merged.slice(0, source.limit)
  }

  return {
    candidateCount: candidates.length,
    results: merged,
  }
}

export default scoutDomainNode
export { scoutDomainNode }
