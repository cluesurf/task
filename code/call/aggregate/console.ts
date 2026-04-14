import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { aggregateLogConsole } from './log/console'

registerGroupHelp({
  command: 'task aggregate',
  describe: 'Roll up structured records by a key (count, sum, ...)',
  commands: [
    { name: 'log', describe: 'Aggregate log entries by a named field' },
  ],
})

export const aggregateConsole: CommandModule = {
  command: 'aggregate <thing>',
  describe: 'Roll up structured records by a key',
  builder: y =>
    y
      .command(aggregateLogConsole)
      .demandCommand(1, 'Specify what to aggregate'),
  handler: () => {},
}
