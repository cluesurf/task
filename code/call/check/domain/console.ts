/**
 * Yargs subcommand for `task check domain`.
 *
 * Two ways to feed in domains:
 *
 *   --domain acme.com --domain widgets.io ...
 *
 * or
 *
 *   --domain-file ./domains.txt   (one fqdn per line)
 *
 * Both forms accumulate into the same flat list before
 * dispatch. Output goes to stdout as JSON or, if
 * `--output-file` is set, to the named JSON file.
 */

import fs from 'node:fs/promises'
import type { CommandModule } from 'yargs'

import type {
  DomainProvider,
  CheckDomainNodeInput,
} from './base'

const PROVIDERS: ReadonlyArray<DomainProvider> = [
  'namecheap',
  'godaddy',
  'cloudflare',
  'porkbun',
  'dynadot',
  'name-com',
  'gandi',
] as const

export const checkDomainConsole: CommandModule = {
  command: 'domain',
  describe:
    'Check domain availability across one or more registrar APIs',
  builder: y =>
    y
      .option('domain', {
        type: 'string',
        array: true,
        describe: 'Fully-qualified domain name (repeatable)',
        default: [] as string[],
      })
      .option('domain-file', {
        type: 'string',
        describe: 'Newline-delimited file of domains',
      })
      .option('provider', {
        type: 'string',
        choices: PROVIDERS as readonly string[],
        default: 'namecheap',
        describe: 'Registrar API to use',
      })
      .option('output-file', {
        type: 'string',
        describe:
          'Write the JSON result to this path instead of stdout',
      })
      .option('available-only', {
        type: 'boolean',
        default: false,
        describe: 'Print only domains that came back available',
      }),
  handler: async argv => {
    const { checkDomainNode } = await import('./node')

    const fromFlag = (argv.domain as string[]) ?? []
    const fromFile = argv['domain-file'] as string | undefined
    const fileDomains = fromFile
      ? (await fs.readFile(fromFile, 'utf-8'))
          .split(/\r?\n/)
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.startsWith('#'))
      : []
    const domains = [...fromFlag, ...fileDomains]

    if (domains.length === 0) {
      throw new Error(
        'check domain: pass at least one --domain or --domain-file',
      )
    }

    const source: CheckDomainNodeInput = {
      input: {
        domain: domains,
        provider: argv.provider as DomainProvider,
      },
    }
    const result = await checkDomainNode({ source })

    const filtered = argv['available-only']
      ? result.results.filter(r => r.available)
      : result.results

    const json = JSON.stringify(filtered, null, 2)
    const outputFile = argv['output-file'] as string | undefined
    if (outputFile) {
      await fs.writeFile(outputFile, json)
    } else {
      process.stdout.write(json + '\n')
    }
  },
}
