import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { recordScreenConsole } from './screen/console'
import { recordTerminalConsole } from './terminal/console'
import { recordWindowConsole } from './window/console'

registerGroupHelp({
  command: 'task record',
  describe: 'Record screen / window / terminal sessions for demos and bug reports',
  commands: [
    { name: 'screen',   describe: 'Screen capture (mp4 / webm / gif via ffmpeg)' },
    { name: 'window',   describe: 'Single-window capture by id (see `task list window`)' },
    { name: 'terminal', describe: 'Terminal session capture (asciinema .cast / .html)' },
  ],
})

export const recordConsole: CommandModule = {
  command: 'record <thing>',
  describe: 'Record screen, a window, or a terminal session',
  builder: y =>
    y
      .command(recordScreenConsole)
      .command(recordWindowConsole)
      .command(recordTerminalConsole)
      .demandCommand(1, 'Specify what to record'),
  handler: () => {},
}
