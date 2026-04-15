import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { logPodConsole } from './pod/console'

registerGroupHelp({
  command: 'task log',
  describe: 'Tail / stream logs from a source',
  commands: [{ name: 'pod', describe: 'Tail logs across Kubernetes pods' }],
})

export const logConsole: CommandModule = {
  command: 'log <thing>',
  describe: 'Tail / stream logs from a source',
  builder: y =>
    y.command(logPodConsole).demandCommand(1, 'Specify what to tail'),
  handler: () => {},
}
