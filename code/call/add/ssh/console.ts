import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task add ssh',
  describe: 'Add a new Host entry to ~/.ssh/config',
  options: [
    { long: 'host', required: true, describe: 'Hostname or IP' },
    { long: 'user', describe: 'Login user' },
    { long: 'port', describe: 'Port (default 22)' },
    { long: 'key', describe: 'Identity file path' },
    { long: 'jump', describe: 'ProxyJump host name' },
    { long: 'forward', describe: 'LocalForward spec (repeatable)' },
  ],
  examples: [
    {
      comment: 'simple production host',
      command: 'task add ssh prod --host 1.2.3.4 --user ubuntu --key ~/.ssh/prod',
    },
    {
      comment: 'with jump host and port forward',
      command:
        'task add ssh api --host api.internal --jump bastion --forward "3000:localhost:3000"',
    },
  ],
})

export const addSshConsole: CommandModule = {
  command: 'ssh <name>',
  describe: 'Add a new Host entry to ~/.ssh/config',
  builder: y =>
    y
      .positional('name', { type: 'string', describe: 'Host alias' })
      .option('host', { type: 'string', demandOption: true })
      .option('user', { type: 'string' })
      .option('port', { type: 'number' })
      .option('key', { type: 'string' })
      .option('jump', { type: 'string' })
      .option('forward', { type: 'string', array: true }),
  handler: async argv => {
    const { addSshNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      name: argv.name as string,
      host: argv.host as string,
      user: argv.user as string | undefined,
      port: argv.port as number | undefined,
      key: argv.key as string | undefined,
      jump: argv.jump as string | undefined,
      forward: argv.forward as string[] | undefined,
    }
    await runAction({
      action: 'add',
      input: input as unknown as Record<string, unknown>,
      run: () => addSshNode(input),
    })
  },
}
