import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task show ip',
  describe: 'Print the machine\'s IPv4 / IPv6 address',
  options: [
    { long: 'scope', short: 's', describe: '`local` (default) reads interface addresses; `public` queries an external service' },
    { long: 'public', describe: 'Shorthand for `--scope public`' },
    { long: 'all', short: 'a', describe: 'List every local address (only meaningful with --scope local)' },
  ],
  examples: [
    { comment: 'primary LAN IP', command: 'task show ip' },
    { comment: 'public / WAN IP', command: 'task show ip --public' },
    { comment: 'every interface', command: 'task show ip --all' },
  ],
})

export const showIpConsole: CommandModule = {
  command: 'ip',
  describe: 'Print the machine\'s IPv4 / IPv6 address',
  builder: y =>
    y
      .option('scope', {
        alias: 's',
        type: 'string',
        choices: ['local', 'public'],
        default: 'local',
      })
      // `--public` is a no-value shortcut for `--scope public` —
      // less typing for the common "what's my WAN IP?" case.
      .option('public', { type: 'boolean', default: false })
      .option('all', { alias: 'a', type: 'boolean', default: false }),
  handler: async argv => {
    const { showIpNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const scope: 'local' | 'public' = argv.public
      ? 'public'
      : (argv.scope as 'local' | 'public')
    const input = {
      scope,
      all: argv.all as boolean,
    }
    await runAction({
      action: 'show',
      input: input as unknown as Record<string, unknown>,
      run: () => showIpNode(input),
    })
  },
}
