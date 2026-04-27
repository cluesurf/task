/**
 * `task profile <thing>` — sampling profilers for the dev loop.
 * Today: cpu. Future: memory / heap / io / network.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { profileCpuConsole } from './cpu/console'

registerGroupHelp({
  command: 'task profile',
  describe: 'Sampling profilers — CPU / memory / I/O',
  commands: [
    { name: 'cpu', describe: 'Sample CPU usage and emit a flamegraph' },
  ],
})

export const profileConsole: CommandModule = {
  command: 'profile <thing>',
  describe: 'Sampling profilers — CPU / memory / I/O',
  builder: y =>
    y
      .command(profileCpuConsole)
      .demandCommand(1, 'Specify what to profile'),
  handler: () => {},
}
