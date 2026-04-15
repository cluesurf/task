import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { scaleDeploymentConsole } from './deployment/console'

registerGroupHelp({
  command: 'task scale',
  describe: 'Scale a resource (e.g. Kubernetes Deployment)',
  commands: [
    { name: 'deployment', describe: 'Scale a Kubernetes Deployment' },
  ],
})

export const scaleConsole: CommandModule = {
  command: 'scale <thing>',
  describe: 'Scale a resource',
  builder: y =>
    y.command(scaleDeploymentConsole).demandCommand(1, 'Specify what to scale'),
  handler: () => {},
}
