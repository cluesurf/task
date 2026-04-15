import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { recordScreenConsole } from './screen/console'
import { recordTerminalConsole } from './terminal/console'

registerGroupHelp({
  command: 'task record',
  describe: 'Record screen / terminal sessions for demos and bug reports',
  commands: [
    { name: 'screen',   describe: 'Screen capture (mp4 / webm / gif via ffmpeg)' },
    { name: 'terminal', describe: 'Terminal session capture (asciinema .cast)' },
  ],
})

export const recordConsole: CommandModule = {
  command: 'record <thing>',
  describe: 'Record screen or terminal',
  builder: y =>
    y
      .command(recordScreenConsole)
      .command(recordTerminalConsole)
      .demandCommand(1, 'Specify what to record'),
  handler: () => {},
}
