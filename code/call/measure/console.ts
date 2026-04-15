import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { measureBandwidthConsole } from './bandwidth/console'
import { measureCacheConsole } from './cache/console'
import { measureDbConsole } from './db/console'
import { measureMachineConsole } from './machine/console'
import { measureR2Console } from './r2/console'
import { measureRequestConsole } from './request/console'
import { measureUrlConsole } from './url/console'
import { measureWorkerConsole } from './worker/console'

registerGroupHelp({
  command: 'task measure',
  describe: 'Measure latency / time / cloud metrics',
  commands: [
    { name: 'url',       describe: 'HTTP latency to a URL' },
    { name: 'db',        describe: 'EXPLAIN ANALYZE + time a Postgres query' },
    { name: 'machine',   describe: 'Cloud machine monitoring (cpu / memory / bandwidth / load / ...)' },
    { name: 'request',   describe: 'Cloudflare total requests over the range' },
    { name: 'bandwidth', describe: 'Cloudflare total bytes over the range' },
    { name: 'cache',     describe: 'Cloudflare cache hit rate' },
    { name: 'r2',        describe: 'Cloudflare R2 metrics (egress, ops)' },
    { name: 'worker',    describe: 'Cloudflare Worker metrics' },
  ],
})

export const measureConsole: CommandModule = {
  command: 'measure <thing>',
  describe: 'Measure latency / time / cloud metrics',
  builder: y =>
    y
      .command(measureUrlConsole)
      .command(measureDbConsole)
      .command(measureMachineConsole)
      .command(measureRequestConsole)
      .command(measureBandwidthConsole)
      .command(measureCacheConsole)
      .command(measureR2Console)
      .command(measureWorkerConsole)
      .demandCommand(1, 'Specify what to measure'),
  handler: () => {},
}
