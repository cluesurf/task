/**
 * `task project <verb>` — zero-config multi-language build
 * runner. Detects the ecosystem from marker files (package.json,
 * Cargo.toml, go.mod, pyproject.toml, requirements.txt, Makefile,
 * Dockerfile) and runs the canonical command for the requested
 * verb. `.taskrc` in the repo root overrides the inference.
 *
 * See `note/idea/zero-config-build-runner.md` for the design and
 * `code/tool/node/runner/registry.ts` for the Tier 1 ecosystem
 * table (pnpm, bun, npm, cargo, go, uv, poetry, pip, make, docker).
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { projectBuildConsole } from './build/console'
import { projectTestConsole } from './test/console'
import { projectRunConsole } from './run/console'
import { projectLintConsole } from './lint/console'
import { projectFormatConsole } from './format/console'
import { projectInstallConsole } from './install/console'
import { projectCleanConsole } from './clean/console'
import { projectCallConsole } from './call/console'

registerGroupHelp({
  command: 'task project',
  describe: 'Zero-config build runner — infers the right command per ecosystem',
  commands: [
    { name: 'build',   describe: 'Compile / bundle (pnpm / cargo / go / uv / make / docker / ...)' },
    { name: 'test',    describe: 'Run the test suite' },
    { name: 'run',     describe: 'Start the dev server / default entrypoint' },
    { name: 'lint',    describe: 'Run the linter' },
    { name: 'format',  describe: 'Format the source tree' },
    { name: 'install', describe: 'Install dependencies' },
    { name: 'clean',   describe: 'Remove build outputs / caches' },
    { name: 'call',    describe: 'Escape hatch — run an arbitrary command in the project root' },
  ],
})

export const projectConsole: CommandModule = {
  command: 'project <verb>',
  describe: 'Zero-config build runner — one verb per common action',
  builder: y =>
    y
      .command(projectBuildConsole)
      .command(projectTestConsole)
      .command(projectRunConsole)
      .command(projectLintConsole)
      .command(projectFormatConsole)
      .command(projectInstallConsole)
      .command(projectCleanConsole)
      .command(projectCallConsole)
      .demandCommand(1, 'Specify a project verb'),
  handler: () => {},
}
