import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { checkDomainConsole } from './domain/console'
import { checkFileConsole } from './file/console'
import { checkSecretConsole } from './secret/console'

registerGroupHelp({
  command: 'task check',
  describe: 'Check files, domains, secrets, and other artifacts',
  commands: [
    { name: 'domain', describe: 'Check domain availability via a registrar API' },
    { name: 'file',   describe: 'Check that a file exists and is readable' },
    { name: 'secret', describe: 'List secrets in a store with last-set info' },
  ],
})

export const checkConsole: CommandModule = {
  command: 'check <thing>',
  describe: 'Check files, domains, secrets, and other artifacts',
  builder: y =>
    y
      .command(checkDomainConsole)
      .command(checkFileConsole)
      .command(checkSecretConsole)
      .demandCommand(1, 'Specify what to check'),
  handler: () => {},
}
