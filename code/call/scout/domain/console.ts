/**
 * Yargs subcommand for `task scout domain`.
 *
 * Three input modes (any combo, deduped at the end):
 *
 *   1. positional FQDN or label
 *        task scout domain example.com --provider namecheap
 *        task scout domain example --extension com,net
 *
 *   2. file of newline-separated labels (one per line):
 *        task scout domain --text-file ./names.txt --extension com,ai
 *
 *   3. patterns (wildcards, prefix/suffix, length range):
 *        task scout domain --length 4 --tld com --status available
 *        task scout domain --text "app*" --text "*ly" --tld all
 *
 * Optional `--domain-file` reads pre-formed FQDNs.
 *
 * `--provider namecheap,godaddy` runs every named
 * provider in parallel and merges the verdicts.
 */

import fs from 'node:fs/promises'
import type { CommandModule } from 'yargs'

import type {
  ScoutDomainOutput,
  ScoutDomainSort,
  ScoutDomainStatus,
} from './node'

const STATUS_VALUES: ReadonlyArray<ScoutDomainStatus> = [
  'available',
  'taken',
  'error',
  'all',
] as const

const SORT_VALUES: ReadonlyArray<ScoutDomainSort> = [
  'name',
  'length',
  'available',
  'tld',
] as const

const OUTPUT_VALUES: ReadonlyArray<ScoutDomainOutput> = [
  'json',
  'csv',
  'text',
] as const

const TLD_TYPE_VALUES = [
  'generic',
  'country',
  'sponsored',
  'infrastructure',
  'test',
  'unknown',
  'all',
] as const

async function readLineFile(path: string): Promise<string[]> {
  const raw = await fs.readFile(path, 'utf-8')
  return raw
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('#'))
}

export const scoutDomainConsole: CommandModule = {
  command: 'domain [name]',
  describe:
    'Scout for available domains via patterns + multi-registrar checks',
  builder: y =>
    y
      .positional('name', {
        type: 'string',
        describe:
          'Optional FQDN (`example.com`) or bare label (`example`)',
      })
      // -- input sources --------------------------------
      .option('domain-file', {
        type: 'string',
        describe: 'File of newline-separated FQDNs to check',
      })
      .option('text-file', {
        type: 'string',
        describe:
          'File of newline-separated labels (or wildcard patterns) to use as candidates',
      })
      .option('text', {
        type: 'string',
        array: true,
        describe:
          'Wildcard pattern, repeatable. `*` = any LDH run, `?` = one LDH char.',
        default: [] as string[],
      })
      .option('prefix', {
        type: 'string',
        describe: 'Convenience: same as `--text "<prefix>*"`',
      })
      .option('suffix', {
        type: 'string',
        describe: 'Convenience: same as `--text "*<suffix>"`',
      })
      .option('contains', {
        type: 'string',
        describe: 'Convenience: same as `--text "*<contains>*"`',
      })
      // -- length / alphabet ----------------------------
      .option('length', {
        type: 'number',
        describe: 'Exact label length',
      })
      .option('length-min', {
        type: 'number',
        describe: 'Minimum label length (inclusive)',
      })
      .option('length-max', {
        type: 'number',
        describe: 'Maximum label length (inclusive)',
      })
      .option('alphabet', {
        type: 'string',
        describe:
          'Allowed character set. Default: a-z + 0-9 + hyphen.',
      })
      .option('no-digits', {
        type: 'boolean',
        default: false,
        describe: 'Strip digits from the alphabet',
      })
      .option('no-hyphens', {
        type: 'boolean',
        default: false,
        describe: 'Strip hyphen from the alphabet',
      })
      .option('exclude', {
        type: 'string',
        describe: 'Regex; matching labels are dropped',
      })
      // -- TLDs / extensions ----------------------------
      .option('extension', {
        type: 'string',
        array: true,
        alias: ['e', 'tld'],
        default: [] as string[],
        describe:
          'TLD(s) to cross with each label. CSV or repeated. Use `all` to expand from IANA.',
      })
      .option('tld-type', {
        type: 'string',
        choices: TLD_TYPE_VALUES as readonly string[],
        default: 'all',
        describe:
          'Filter `--extension all` by IANA classification',
      })
      // -- providers ------------------------------------
      .option('provider', {
        type: 'string',
        array: true,
        default: ['namecheap'] as string[],
        describe:
          'Registrar API(s) to query. CSV or repeated. Multiple providers run in parallel.',
      })
      // -- output / filter ------------------------------
      .option('status', {
        type: 'string',
        choices: STATUS_VALUES as readonly string[],
        default: 'all',
        describe: 'Filter the merged results by verdict',
      })
      .option('available-only', {
        type: 'boolean',
        default: false,
        describe: 'Shorthand for `--status available`',
      })
      .option('sort', {
        type: 'string',
        choices: SORT_VALUES as readonly string[],
        default: 'name',
      })
      .option('reverse', {
        type: 'boolean',
        default: false,
        describe: 'Reverse the sort order',
      })
      .option('limit', {
        type: 'number',
        describe: 'Cap the number of result rows',
      })
      .option('output', {
        type: 'string',
        choices: OUTPUT_VALUES as readonly string[],
        default: 'json',
      })
      .option('output-file', {
        type: 'string',
        describe: 'Write to file instead of stdout',
      })
      // -- safety / perf -------------------------------
      .option('max-candidates', {
        type: 'number',
        describe:
          'Hard ceiling on candidate count. Default 100k.',
      })
      .option('concurrency', {
        type: 'number',
        default: 4,
        describe:
          'Per-provider concurrent requests (provider workers do their own batching)',
      })
      .option('timeout', {
        type: 'number',
        default: 30_000,
        describe: 'Per-call timeout in ms (placeholder; provider-specific)',
      })
      .option('retry', {
        type: 'number',
        default: 1,
        describe: 'Retry count on transient errors (placeholder)',
      })
      .option('verbose', {
        alias: 'v',
        type: 'boolean',
        default: false,
        describe: 'Log per-batch progress to stderr',
      }),
  handler: async argv => {
    const { scoutDomainNode } = await import('./node')

    // Merge `--text` flag with `--text-file` lines.
    const textArr = (argv.text as string[]) ?? []
    if (argv['text-file']) {
      textArr.push(...(await readLineFile(argv['text-file'] as string)))
    }

    // Merge `--domain-file` into a list of pre-formed FQDNs.
    // We piggy-back the positional `name` slot and feed
    // additional FQDNs through the result merge by
    // calling the worker once per chunk.
    const fileDomains = argv['domain-file']
      ? await readLineFile(argv['domain-file'] as string)
      : []

    const positional = argv.name as string | undefined

    const status: string = argv['available-only']
      ? 'available'
      : (argv.status as string)

    const baseInput = {
      extension: argv.extension as string[],
      tldType: argv['tld-type'] as
        | 'all'
        | 'generic'
        | 'country'
        | 'sponsored'
        | 'infrastructure'
        | 'test'
        | 'unknown',
      text: textArr.length > 0 ? textArr : undefined,
      prefix: argv.prefix as string | undefined,
      suffix: argv.suffix as string | undefined,
      contains: argv.contains as string | undefined,
      length: argv.length as number | undefined,
      lengthMin: argv['length-min'] as number | undefined,
      lengthMax: argv['length-max'] as number | undefined,
      alphabet: argv.alphabet as string | undefined,
      noDigits: argv['no-digits'] as boolean,
      noHyphens: argv['no-hyphens'] as boolean,
      exclude: argv.exclude as string | undefined,
      provider: argv.provider as string[],
      status: status as
        | 'available'
        | 'taken'
        | 'error'
        | 'all',
      sort: argv.sort as 'name' | 'length' | 'available' | 'tld',
      reverse: argv.reverse as boolean,
      limit: argv.limit as number | undefined,
      maxCandidates: argv['max-candidates'] as number | undefined,
      concurrency: argv.concurrency as number,
    }

    // Single sweep covers positional + patterns + extensions.
    const passes: Array<{
      name?: string
    }> = [{ name: positional }]
    // Each `--domain-file` line becomes its own positional pass.
    for (const fqdn of fileDomains) {
      passes.push({ name: fqdn })
    }

    type Row = Awaited<ReturnType<typeof scoutDomainNode>>['results'][number]
    const allResults: Row[] = []
    let totalCandidates = 0
    for (const pass of passes) {
      const out = await scoutDomainNode({
        source: { ...baseInput, domain: pass.name },
      })
      totalCandidates += out.candidateCount
      allResults.push(...out.results)
    }

    // Dedupe by FQDN (last verdict wins; provider merge
    // already happened inside scoutDomainNode).
    const dedup = new Map<string, (typeof allResults)[number]>()
    for (const r of allResults) dedup.set(r.domain, r)
    const finalResults = Array.from(dedup.values())

    const formatted = formatScoutResults(
      finalResults,
      argv.output as string,
    )
    const outputFile = argv['output-file'] as string | undefined
    if (outputFile) {
      await fs.writeFile(outputFile, formatted)
    } else {
      process.stdout.write(formatted)
      if (!formatted.endsWith('\n')) process.stdout.write('\n')
    }

    if (argv.verbose) {
      process.stderr.write(
        `scout domain: ${totalCandidates} candidate(s), ${finalResults.length} row(s) after filter\n`,
      )
    }
  },
}

function formatScoutResults(
  results: Array<{
    domain: string
    available: boolean
    providerVerdicts: Record<string, boolean | 'error'>
    errors?: Array<{ provider: string; message: string }>
  }>,
  output: string,
): string {
  switch (output) {
    case 'csv': {
      const providers = new Set<string>()
      for (const r of results) {
        for (const p of Object.keys(r.providerVerdicts)) {
          providers.add(p)
        }
      }
      const provHeaders = Array.from(providers).sort()
      const header = ['domain', 'available', ...provHeaders].join(',')
      const rows = results.map(r => {
        const cells = [
          r.domain,
          r.available ? 'true' : 'false',
          ...provHeaders.map(p => {
            const v = r.providerVerdicts[p]
            if (v === 'error') return 'error'
            if (v === undefined) return ''
            return v ? 'true' : 'false'
          }),
        ]
        return cells.join(',')
      })
      return [header, ...rows].join('\n')
    }
    case 'text':
      return results.map(r => r.domain).join('\n')
    case 'json':
    default:
      return JSON.stringify(results, null, 2)
  }
}
