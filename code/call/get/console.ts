/**
 * Yargs command group for `task get <thing>`.
 *
 *   - `task get duration` — read media duration via ffprobe.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { getDurationConsole } from './duration/console'
import { getEnvironmentConsole } from './environment/console'
import { getSshConsole } from './ssh/console'
import { getSshKeyConsole } from './ssh-key/console'

registerGroupHelp({
  command: 'task get',
  describe: 'Read a single property or entry (duration, env, ssh, ssh-key, ...)',
  commands: [
    { name: 'duration', describe: 'Read the duration of an audio or video file' },
    { name: 'environment', describe: 'Read an environment variable' },
    { name: 'ssh', describe: 'Read one SSH Host entry' },
    { name: 'ssh-key', describe: 'Print the public key for a named SSH key' },
  ],
})

export const getConsole: CommandModule = {
  command: 'get <thing>',
  describe: 'Read a single property or entry (duration, env, ssh, ssh-key, ...)',
  builder: y =>
    y
      .command(getDurationConsole)
      .command(getEnvironmentConsole)
      .command(getSshConsole)
      .command(getSshKeyConsole)
      .demandCommand(1, 'Specify what to get'),
  handler: () => {},
}
