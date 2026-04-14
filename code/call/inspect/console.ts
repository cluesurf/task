import type { CommandModule } from 'yargs'
import { inspectColorConsole } from './color/console'
import { inspectMetadataConsole } from './metadata/console'

export const inspectConsole: CommandModule = {
  command: 'inspect <thing>',
  describe: 'Inspect a file',
  builder: y =>
    y
      .command(inspectColorConsole)
      .command(inspectMetadataConsole)
      .demandCommand(1, 'Specify what to inspect'),
  handler: () => {},
}
