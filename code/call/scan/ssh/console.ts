import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task scan ssh',
  describe: 'Scan a host\'s SSH public host keys (ssh-keyscan)',
  options: [
    { long: 'type', short: 't', describe: 'Key type: rsa, ecdsa, ed25519 (default: all)' },
  ],
  examples: [
    { comment: 'default scan', command: 'task scan ssh github.com' },
    { comment: 'only ed25519', command: 'task scan ssh github.com -t ed25519' },
  ],
})

export const scanSshConsole: CommandModule = {
  command: 'ssh <host>',
  describe: 'Scan a host\'s SSH public host keys',
  builder: y =>
    y
      .positional('host', { type: 'string' })
      .option('type', { alias: 't', type: 'string' }),
  handler: async argv => {
    const { scanSshNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      host: argv.host as string,
      type: argv.type as string | undefined,
    }
    await runAction({
      action: 'scan',
      input: input as unknown as Record<string, unknown>,
      run: () => scanSshNode(input),
    })
  },
}
