import type { CommandModule } from 'yargs'
import { listDomainRecordConsole } from './record/console'

/**
 * `task list domain` has two faces:
 *
 *   - default                 list DigitalOcean DNS zones
 *     you own (existing)
 *   - `--form extension|tld`  list IANA TLDs (new),
 *     optionally filtered by `--type generic|country|...`
 *
 * `--form` is the discriminator; everything else (sort,
 * limit, output) is shared by both faces.
 */

const FORM_VALUES = ['domain', 'extension', 'tld'] as const
const TYPE_VALUES = [
  'generic',
  'country',
  'sponsored',
  'infrastructure',
  'test',
  'unknown',
  'all',
] as const
const SORT_VALUES = ['name', 'kind', 'length'] as const
const OUTPUT_VALUES = ['json', 'csv', 'text'] as const

export const listDomainConsole: CommandModule = {
  command: 'domain',
  describe:
    'List DNS domains (DigitalOcean) or all TLDs (--form tld).',
  builder: y =>
    y
      .option('platform', { alias: 'p', type: 'string' })
      .option('form', {
        type: 'string',
        choices: FORM_VALUES as readonly string[],
        default: 'domain',
        describe:
          'What to list: own DNS zones (`domain`) or every TLD (`extension` / `tld`)',
      })
      .option('type', {
        type: 'string',
        choices: TYPE_VALUES as readonly string[],
        default: 'all',
        describe:
          'Filter TLDs by class. Only meaningful with `--form tld`.',
      })
      .option('sort', {
        type: 'string',
        choices: SORT_VALUES as readonly string[],
        default: 'name',
        describe: 'Sort key',
      })
      .option('reverse', {
        type: 'boolean',
        default: false,
        describe: 'Reverse the sort order',
      })
      .option('limit', {
        type: 'number',
        describe: 'Cap the number of rows returned',
      })
      .option('output', {
        type: 'string',
        choices: OUTPUT_VALUES as readonly string[],
        default: 'json',
        describe: 'Output shape',
      })
      .option('output-file', {
        type: 'string',
        describe: 'Write to file instead of stdout',
      })
      .option('refresh', {
        type: 'boolean',
        default: false,
        describe:
          'Bypass the local TLD cache and refetch from IANA',
      })
      .command(listDomainRecordConsole),
  handler: async argv => {
    if (argv._.length > 1) return // subcommand handled it

    const form = argv.form as 'domain' | 'extension' | 'tld'

    if (form === 'extension' || form === 'tld') {
      const { listIanaTldsCli } = await import('./node')
      await listIanaTldsCli({
        type: argv.type as string,
        sort: argv.sort as string,
        reverse: argv.reverse as boolean,
        limit: argv.limit as number | undefined,
        output: argv.output as string,
        outputFile: argv['output-file'] as string | undefined,
        refresh: argv.refresh as boolean,
      })
      return
    }

    const { listDomains } = await import('~/code/tool/node/doctl')
    process.stdout.write(await listDomains())
  },
}
