import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task container shell',
  describe: 'Boot a throwaway container into bash / sh',
  options: [
    { long: 'shell',               describe: 'auto (default) | bash | sh | zsh | fish' },
    { long: 'user',     short: 'u',describe: 'User inside the container' },
    { long: 'workdir',  short: 'w',describe: 'Initial cwd inside the container' },
    { long: 'mount-cwd',           describe: 'Mount host cwd at this path (e.g. /work)' },
    { long: 'network',             describe: 'Network mode (host | bridge | none | <name>)' },
    { long: 'env',      short: 'e',describe: 'KEY=VALUE (repeatable)' },
  ],
  examples: [
    { comment: 'poke at alpine',         command: 'task container shell alpine:latest' },
    { comment: 'mount cwd, become root', command: 'task container shell node:24 --mount-cwd /work -w /work' },
    { comment: 'force bash',             command: 'task container shell debian:stable --shell bash' },
    { comment: 'with env vars',          command: 'task container shell python:3.12 -e PYTHONUNBUFFERED=1' },
  ],
})

export const containerShellConsole: CommandModule = {
  command: 'shell <image>',
  describe: 'Boot a throwaway container into a shell',
  builder: y => y
    .positional('image', { type: 'string' })
    .option('shell',     { type: 'string', choices: ['bash','sh','zsh','fish','auto'] as const })
    .option('user',      { alias: 'u', type: 'string' })
    .option('workdir',   { alias: 'w', type: 'string' })
    .option('mount-cwd', { type: 'string' })
    .option('network',   { type: 'string' })
    .option('env',       { alias: 'e', type: 'array', string: true }),
  handler: async argv => {
    const { runShell } = await import('~/code/tool/node/container/base')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      image: argv.image as string,
      shell: argv.shell as 'bash'|'sh'|'zsh'|'fish'|'auto'|undefined,
      user: argv.user as string | undefined,
      workdir: argv.workdir as string | undefined,
      mountCwd: argv['mount-cwd'] as string | undefined,
      network: argv.network as string | undefined,
      env: argv.env as string[] | undefined,
    }
    await runAction({
      action: 'open',
      input: input as unknown as Record<string, unknown>,
      run: () => runShell(input),
    })
  },
}
