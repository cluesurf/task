import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson } from '~/code/tool/node/cloudflare-cli'

export const inspectZoneConsole: CommandModule = {
  command: 'zone <name>',
  describe: 'Cloudflare zone details (plan, status, nameservers, ...)',
  builder: y =>
    cfCommonFlags(y).positional('name', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { getZone } = await import('~/code/tool/node/cloudflare')
    printJson(await getZone(argv.name as string))
  },
}
