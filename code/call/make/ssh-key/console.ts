import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task make ssh-key',
  describe: 'Generate a new SSH key pair; optionally wire it into ~/.ssh/config',
  options: [
    { long: 'type', describe: 'Key type (ed25519 default, rsa, ecdsa)' },
    { long: 'bits', describe: 'Key length — only for --type rsa' },
    { long: 'comment', describe: 'Key comment (default: $USER@$HOST)' },
    { long: 'empty-pass', describe: 'No passphrase' },
    { long: 'force', describe: 'Overwrite an existing key with this name' },
    { long: 'host', describe: 'Also add a matching `task add ssh` entry' },
    { long: 'user', describe: 'Login user (only used with --host)' },
    { long: 'port', describe: 'Port (only used with --host)' },
  ],
  examples: [
    { comment: 'basic ed25519 key', command: 'task make ssh-key prod' },
    { comment: 'comment + no passphrase', command: 'task make ssh-key prod --comment "lance@laptop" --empty-pass' },
    { comment: 'also register in ssh config', command: 'task make ssh-key prod --host 1.2.3.4 --user ubuntu' },
  ],
})

export const makeSshKeyConsole: CommandModule = {
  command: 'ssh-key <name>',
  describe: 'Generate a new SSH key pair',
  builder: y =>
    y
      .positional('name', { type: 'string' })
      .option('type', { type: 'string', default: 'ed25519' })
      .option('bits', { type: 'number' })
      .option('comment', { type: 'string' })
      .option('empty-pass', { type: 'boolean', default: true })
      .option('force', { type: 'boolean', default: false })
      .option('host', { type: 'string' })
      .option('user', { type: 'string' })
      .option('port', { type: 'number' }),
  handler: async argv => {
    const { makeSshKeyNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      name: argv.name as string,
      type: argv.type as string,
      bits: argv.bits as number | undefined,
      comment: argv.comment as string | undefined,
      emptyPass: argv['empty-pass'] as boolean,
      force: argv.force as boolean,
      host: argv.host as string | undefined,
      user: argv.user as string | undefined,
      port: argv.port as number | undefined,
    }
    await runAction({
      action: 'make',
      input: input as unknown as Record<string, unknown>,
      run: () => makeSshKeyNode(input),
    })
  },
}
