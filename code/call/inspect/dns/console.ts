import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task inspect dns',
  describe:
    'Resolve DNS records for a host via the local resolver (or Cloudflare API with --tool cloudflare)',
  options: [
    { long: 'type', short: 't', describe: 'Record type — A / AAAA / CNAME / MX / NS / TXT / SOA / SRV / PTR / CAA / ANY' },
    { long: 'resolver', describe: 'Override the system resolver (e.g. 1.1.1.1)' },
    { long: 'tool', describe: 'system (default) or cloudflare for the zone-records API' },
  ],
  examples: [
    { comment: 'all common record types', command: 'task inspect dns example.com' },
    { comment: 'just MX', command: 'task inspect dns example.com -t MX' },
    { comment: 'lookup via Cloudflare DNS-over-HTTPS', command: 'task inspect dns example.com --resolver 1.1.1.1' },
    { comment: 'Cloudflare zone records', command: 'task inspect dns example.com --tool cloudflare' },
  ],
})

export const inspectDnsConsole: CommandModule = {
  command: 'dns <host>',
  describe: 'Resolve DNS records for a host',
  builder: y =>
    y
      .positional('host', { type: 'string', demandOption: true })
      .option('type', {
        alias: 't',
        type: 'string',
        choices: [
          'A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT',
          'SOA', 'SRV', 'PTR', 'CAA', 'ANY',
        ] as const,
      })
      .option('resolver', { type: 'string' })
      .option('tool', {
        type: 'string',
        choices: ['system', 'cloudflare'] as const,
        default: 'system',
      }),
  handler: async argv => {
    const { inspectDnsNode } = await import('./node')
    const result = await inspectDnsNode({
      host: argv.host as string,
      type: argv.type as never,
      resolver: argv.resolver as string | undefined,
      tool: argv.tool as 'system' | 'cloudflare',
    })
    process.stdout.write(JSON.stringify(result, null, 2) + '\n')
  },
}
