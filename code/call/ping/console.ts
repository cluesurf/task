import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task ping',
  describe: 'ICMP ping a host and report latency / loss',
  options: [
    { long: 'count', short: 'c', describe: 'Number of pings (default 4)' },
  ],
  examples: [
    { comment: 'quick reachability', command: 'task ping example.com' },
    { comment: 'longer sample', command: 'task ping example.com -c 20' },
  ],
})

export const pingConsole: CommandModule = {
  command: 'ping <host>',
  describe: 'ICMP ping a host and report latency / loss',
  builder: y =>
    y
      .positional('host', { type: 'string', describe: 'Host or IP' })
      .option('count', { alias: 'c', type: 'number', default: 4 }),
  handler: async argv => {
    const { pingNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      host: argv.host as string,
      count: argv.count as number,
    }
    await runAction({
      action: 'ping',
      input: input as unknown as Record<string, unknown>,
      run: () => pingNode(input),
    })
  },
}
