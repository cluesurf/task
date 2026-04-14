import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { inspectColorConsole } from './color/console'
import { inspectFileConsole } from './file/console'
import { inspectMetadataConsole } from './metadata/console'

registerGroupHelp({
  command: 'task inspect',
  describe: 'Inspect a file',
  commands: [
    { name: 'color', describe: 'Inspect colors in an image' },
    { name: 'file', describe: 'Inspect a file and print a key/value table of its metadata' },
    { name: 'metadata', describe: 'Inspect file metadata (EXIF, XMP, ...)' },
  ],
})

export const inspectConsole: CommandModule = {
  command: 'inspect <thing>',
  describe: 'Inspect a file',
  builder: y =>
    y
      .command(inspectColorConsole)
      .command(inspectFileConsole)
      .command(inspectMetadataConsole)
      .demandCommand(1, 'Specify what to inspect'),
  handler: () => {},
}
