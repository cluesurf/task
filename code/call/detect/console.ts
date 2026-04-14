import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { detectBidiConsole } from './bidi/console'

registerGroupHelp({
  command: 'task detect',
  describe: 'Scan a file for a specific hazard (bidi markers, ...)',
  commands: [
    { name: 'bidi', describe: 'Flag Unicode bidi-override markers (Trojan Source)' },
  ],
})

export const detectConsole: CommandModule = {
  command: 'detect <thing>',
  describe: 'Scan a file for a specific hazard (bidi markers, ...)',
  builder: y =>
    y
      .command(detectBidiConsole)
      .demandCommand(1, 'Specify what to detect'),
  handler: () => {},
}
