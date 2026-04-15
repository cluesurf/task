/**
 * `task scout` action group — availability probes for
 * identifiers you might want to claim.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { scoutDomainConsole } from './domain/console'
import { scoutUsernameConsole } from './username/console'

registerGroupHelp({
  command: 'task scout',
  describe: 'Search for available domains, usernames, and other identifiers',
  commands: [
    { name: 'domain',   describe: 'Pattern + multi-registrar domain availability search' },
    { name: 'username', describe: 'Check username availability across ~30 platforms' },
  ],
})

export const scoutConsole: CommandModule = {
  command: 'scout <thing>',
  describe: 'Search for available domains, usernames, and other identifiers',
  builder: y =>
    y
      .command(scoutDomainConsole)
      .command(scoutUsernameConsole)
      .demandCommand(1, 'Specify what to scout for'),
  handler: () => {},
}
