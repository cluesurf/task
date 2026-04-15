import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson } from '~/code/tool/node/cloudflare-cli'

export const listZoneConsole: CommandModule = {
  command: 'zone',
  describe: 'List Cloudflare zones',
  builder: y => cfCommonFlags(y),
  handler: async () => {
    const { listZones } = await import('~/code/tool/node/cloudflare')
    printJson(await listZones())
  },
}
