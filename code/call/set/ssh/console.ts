import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task set ssh',
  describe: 'Patch fields on an existing SSH Host entry',
  options: [
    { long: 'host', describe: 'Hostname or IP' },
    { long: 'user', describe: 'Login user' },
    { long: 'port', describe: 'Port' },
    { long: 'key', describe: 'Identity file path' },
    { long: 'jump', describe: 'ProxyJump host' },
    { long: 'forward', describe: 'LocalForward spec (repeatable; replaces existing)' },
  ],
  examples: [
    { comment: 'change login user', command: 'task set ssh prod --user root' },
    { comment: 'raise port', command: 'task set ssh prod --port 2222' },
    { comment: 'add a jump host', command: 'task set ssh prod --jump bastion' },
  ],
})

export const setSshConsole: CommandModule = {
  command: 'ssh <name>',
  describe: 'Patch fields on an existing SSH Host entry',
  builder: y =>
    y
      .positional('name', { type: 'string' })
      .option('host', { type: 'string' })
      .option('user', { type: 'string' })
      .option('port', { type: 'number' })
      .option('key', { type: 'string' })
      .option('jump', { type: 'string' })
      .option('forward', { type: 'string', array: true }),
  handler: async argv => {
    const { setSshNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      name: argv.name as string,
      host: argv.host as string | undefined,
      user: argv.user as string | undefined,
      port: argv.port as number | undefined,
      key: argv.key as string | undefined,
      jump: argv.jump as string | undefined,
      forward: argv.forward as string[] | undefined,
    }
    await runAction({
      action: 'set',
      input: input as unknown as Record<string, unknown>,
      run: () => setSshNode(input),
    })
  },
}
