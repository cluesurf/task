import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task scout username',
  describe: 'Check username availability across platforms (one or many names → matrix view)',
  options: [
    { long: 'platform',    short: 'p', describe: 'Comma list or repeated flag. Omit = every known platform.' },
    { long: 'concurrency',             describe: 'Parallel probe count (default 8, max 20)' },
    { long: 'format',      short: 'f', describe: 'pretty (default) or json' },
  ],
  examples: [
    { comment: 'single name, every platform',  command: 'task scout username foobar' },
    { comment: 'matrix of names × platforms',  command: 'task scout username foobar lance dev_lance -p github,npm,x,reddit' },
    { comment: 'repeat the flag',              command: 'task scout username foobar -p github -p twitter' },
    { comment: 'machine-readable',             command: 'task scout username foobar lance -f json' },
  ],
})

export const scoutUsernameConsole: CommandModule = {
  command: 'username <usernames..>',
  describe: 'Check username availability across many platforms',
  builder: y => y
    .positional('usernames', { type: 'string', array: true, describe: 'One or many usernames' })
    .option('platform',    { alias: 'p', type: 'array', string: true })
    .option('concurrency', { type: 'number' }),
  handler: async argv => {
    const { scoutUsernameNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      usernames: (argv.usernames as string[]) ?? [],
      platform: argv.platform as string[] | undefined,
      concurrency: argv.concurrency as number | undefined,
    }
    await runAction({
      action: 'scout',
      input: input as unknown as Record<string, unknown>,
      run: () => scoutUsernameNode(input),
    })
  },
}
