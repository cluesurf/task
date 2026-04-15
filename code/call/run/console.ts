import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { runCodeConsole } from './code/console'
import { runNotifyConsole } from './notify/console'
import { runServiceConsole } from './service/console'
import { runSystemConsole } from './system/console'

registerGroupHelp({
  command: 'task run',
  describe: 'Start a project (zero-config) or run a one-off action',
  commands: [
    { name: 'code',    describe: 'Project mode — infer ecosystem and start its dev server / entrypoint' },
    { name: 'service', describe: 'Start a system service' },
    { name: 'notify',  describe: 'Show a desktop notification' },
    { name: 'system',  describe: 'sleep / lock / shutdown / restart' },
  ],
})

export const runConsole: CommandModule = {
  command: 'run <thing>',
  describe: 'Start a project (zero-config) or run a one-off action',
  builder: y =>
    y
      .command(runCodeConsole)
      .command(runServiceConsole)
      .command(runNotifyConsole)
      .command(runSystemConsole)
      .demandCommand(1, 'Specify what to run'),
  handler: () => {},
}
