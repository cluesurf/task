import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { checkFileConsole } from './file/console'
import { checkDomainConsole } from './domain/console'

registerGroupHelp({
  command: 'task check',
  describe: 'Check files and other artifacts',
  commands: [
    { name: 'file',   describe: 'Check that a file exists and is readable' },
    { name: 'domain', describe: 'Check domain availability via a registrar API' },
  ],
})

export const checkConsole: CommandModule = {
  command: 'check <thing>',
  describe: 'Check files and other artifacts',
  builder: y =>
    y
      .command(checkFileConsole)
      .command(checkDomainConsole)
      .demandCommand(1, 'Specify what to check'),
  handler: () => {},
}
