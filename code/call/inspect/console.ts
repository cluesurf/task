import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { inspectColorConsole } from './color/console'
import { inspectFileConsole } from './file/console'
import { inspectMetadataConsole } from './metadata/console'
import { inspectNetworkConsole } from './network/console'
import { inspectPortConsole } from './port/console'
import { inspectProcessConsole } from './process/console'
import { inspectSystemConsole } from './system/console'

registerGroupHelp({
  command: 'task inspect',
  describe: 'Inspect a file, process, network state, or the system',
  commands: [
    { name: 'color', describe: 'Inspect colors in an image' },
    { name: 'file', describe: 'Inspect a file and print a key/value table of its metadata' },
    { name: 'metadata', describe: 'Inspect file metadata (EXIF, XMP, ...)' },
    { name: 'network', describe: 'Summarize network state or look up DNS for a host' },
    { name: 'port', describe: 'Show who owns a port (PID, command, user)' },
    { name: 'process', describe: 'Inspect a running process by PID' },
    { name: 'system', describe: 'System summary: CPU / memory / disk / uptime' },
  ],
})

export const inspectConsole: CommandModule = {
  command: 'inspect <thing>',
  describe: 'Inspect a file, process, network state, or the system',
  builder: y =>
    y
      .command(inspectColorConsole)
      .command(inspectFileConsole)
      .command(inspectMetadataConsole)
      .command(inspectNetworkConsole)
      .command(inspectPortConsole)
      .command(inspectProcessConsole)
      .command(inspectSystemConsole)
      .demandCommand(1, 'Specify what to inspect'),
  handler: () => {},
}
