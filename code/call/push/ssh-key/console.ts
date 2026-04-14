import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task push ssh-key',
  describe: 'Install a named SSH public key on a host via ssh-copy-id',
  options: [],
  examples: [
    { comment: 'install prod.pub on the "prod" host', command: 'task push ssh-key prod prod' },
    { comment: 'different name and host', command: 'task push ssh-key work ubuntu@10.0.0.5' },
  ],
})

export const pushSshKeyConsole: CommandModule = {
  command: 'ssh-key <name> <host>',
  describe: 'Install a named SSH public key on a host',
  builder: y =>
    y
      .positional('name', { type: 'string' })
      .positional('host', { type: 'string' }),
  handler: async argv => {
    const { pushSshKeyNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      name: argv.name as string,
      host: argv.host as string,
    }
    await runAction({
      action: 'push',
      input: input as unknown as Record<string, unknown>,
      run: () => pushSshKeyNode(input),
    })
  },
}
