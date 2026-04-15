import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { watchAttackConsole } from './attack/console'
import { watchCacheConsole } from './cache/console'
import { watchProcessConsole } from './process/console'
import { watchRequestConsole } from './request/console'

registerGroupHelp({
  command: 'task watch',
  describe: 'Live-update a listing or stream a metric as it changes',
  commands: [
    { name: 'process', describe: 'Live-refreshing process table' },
    { name: 'request', describe: 'Cloudflare request + bandwidth count' },
    { name: 'attack',  describe: 'New Cloudflare firewall events' },
    { name: 'cache',   describe: 'Cloudflare cache hit rate' },
  ],
})

export const watchConsole: CommandModule = {
  command: 'watch <thing>',
  describe: 'Live-update a listing or stream a metric as it changes',
  builder: y =>
    y
      .command(watchProcessConsole)
      .command(watchRequestConsole)
      .command(watchAttackConsole)
      .command(watchCacheConsole)
      .demandCommand(1, 'Specify what to watch'),
  handler: () => {},
}
