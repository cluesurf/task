import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const listRecordConsole: CommandModule = {
  command: 'record',
  describe: 'List Cloudflare DNS records for a zone',
  builder: y => cfCommonFlags(y),
  handler: async argv => {
    const { listDnsRecords } = await import('~/code/tool/node/cloudflare')
    printJson(await listDnsRecords(await resolveCfZone(argv.zone as string | undefined)))
  },
}
