import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson } from '~/code/tool/node/cloudflare-cli'

export const inspectDnsConsole: CommandModule = {
  command: 'dns <zone>',
  describe: 'Cloudflare DNS records for a zone',
  builder: y =>
    cfCommonFlags(y).positional('zone', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { listDnsRecords } = await import('~/code/tool/node/cloudflare')
    printJson(await listDnsRecords(argv.zone as string))
  },
}
