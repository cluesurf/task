import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { containerBuildConsole } from './build/console'
import { containerScanConsole } from './scan/console'
import { containerSizeConsole } from './size/console'
import { containerShellConsole } from './shell/console'
import { containerCleanConsole } from './clean/console'

registerGroupHelp({
  command: 'task container',
  describe: 'Container lifecycle: build, scan, size, shell, clean',
  commands: [
    { name: 'build', describe: 'Build an image (docker build or buildpacks)' },
    { name: 'scan',  describe: 'Scan an image for CVEs (trivy / grype)' },
    { name: 'size',  describe: 'Layer-by-layer size breakdown (dive)' },
    { name: 'shell', describe: 'Boot a throwaway container into bash / sh' },
    { name: 'clean', describe: 'Prune disk usage with before/after report' },
  ],
})

export const containerConsole: CommandModule = {
  command: 'container <thing>',
  describe: 'Container lifecycle: build / scan / size / shell / clean',
  builder: y =>
    y
      .command(containerBuildConsole)
      .command(containerScanConsole)
      .command(containerSizeConsole)
      .command(containerShellConsole)
      .command(containerCleanConsole)
      .demandCommand(1, 'Specify a container subcommand'),
  handler: () => {},
}
