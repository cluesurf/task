import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { diffManifestConsole } from './manifest/console'

registerGroupHelp({
  command: 'task diff',
  describe: 'Diff a thing against its live / remote counterpart',
  commands: [
    { name: 'manifest', describe: 'Diff a Kubernetes manifest against the cluster' },
  ],
})

export const diffConsole: CommandModule = {
  command: 'diff <thing>',
  describe: 'Diff a thing against its live counterpart',
  builder: y =>
    y.command(diffManifestConsole).demandCommand(1, 'Specify what to diff'),
  handler: () => {},
}
