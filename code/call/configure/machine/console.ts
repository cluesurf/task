import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task configure machine',
  describe: 'Bootstrap a fresh dev machine from a manifest or built-in preset',
  options: [
    { long: 'preset',                  describe: 'dev (default) | min — built-in manifest' },
    { long: 'from',                    describe: 'Path or URL to a custom manifest (yml or json)' },
    { long: 'dry-run',                 describe: 'Print what would run, change nothing' },
    { long: 'skip',                    describe: 'Stage to skip: packages | shell | theme | vscode | dotfiles | git (repeatable)' },
  ],
  examples: [
    { comment: 'sane defaults',     command: 'task configure machine' },
    { comment: 'minimal',           command: 'task configure machine --preset min' },
    { comment: 'remote manifest',   command: 'task configure machine --from https://example.com/my-machine.yml' },
    { comment: 'preview only',      command: 'task configure machine --dry-run' },
    { comment: 'skip vscode + git', command: 'task configure machine --skip vscode --skip git' },
  ],
})

export const configureMachineConsole: CommandModule = {
  command: 'machine',
  describe: 'Bootstrap a fresh dev machine',
  builder: y => y
    .option('preset',  { type: 'string', choices: ['dev', 'min'] as const })
    .option('from',    { type: 'string' })
    .option('dry-run', { type: 'boolean' })
    .option('skip',    { type: 'array', string: true }),
  handler: async argv => {
    const { configureMachineNode } = await import('~/code/tool/node/configure/machine')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      preset: argv.preset as 'dev' | 'min' | undefined,
      from: argv.from as string | undefined,
      dryRun: argv['dry-run'] as boolean | undefined,
      skip: argv.skip as ('packages'|'shell'|'theme'|'vscode'|'dotfiles'|'git')[] | undefined,
    }
    await runAction({
      action: 'configure',
      input: input as unknown as Record<string, unknown>,
      run: () => configureMachineNode(input),
    })
  },
}
