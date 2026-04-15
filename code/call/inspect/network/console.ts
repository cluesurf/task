import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task inspect network',
  describe: 'Summarize network state, list sockets, or group remote endpoints',
  options: [
    { long: 'show',         short: 's', describe: 'Comma list: interface, route, connection, dns:A,MX,...' },
    { long: 'connections',              describe: 'List every open socket + owning process (lsof)' },
    { long: 'listening',                describe: 'Only LISTEN sockets (servers)' },
    { long: 'established',              describe: 'Only ESTABLISHED sockets (live traffic)' },
    { long: 'remote',                   describe: 'Only sockets with a non-local remote endpoint' },
    { long: 'group',                    describe: 'ip | domain — group `--remote` output' },
    { long: 'filter',                   describe: 'Glob on process name (`*` / `?`), case-insensitive' },
    { long: 'watch',                    describe: 'Re-run in place every `--interval` seconds (Ctrl-C to stop)' },
    { long: 'interval',                 describe: 'Watch interval in seconds (default 2)' },
  ],
  examples: [
    { comment: 'summary',                         command: 'task inspect network' },
    { comment: 'everything with a socket open',   command: 'task inspect network --connections' },
    { comment: 'what are the servers on this box',command: 'task inspect network --listening' },
    { comment: 'who is currently talking to whom',command: 'task inspect network --established' },
    { comment: 'remote hosts only',               command: 'task inspect network --remote' },
    { comment: 'group by remote IP',              command: 'task inspect network --remote --group ip' },
    { comment: 'reverse-DNS group by domain',     command: 'task inspect network --remote --group domain' },
    { comment: 'filter by process (glob)',        command: 'task inspect network --connections --filter "*chrome*"' },
    { comment: 'live view while idle',            command: 'task inspect network --remote --group domain --watch' },
    { comment: 'DNS lookup',                      command: 'task inspect network example.com --show dns:A,MX,TXT' },
  ],
})

export const inspectNetworkConsole: CommandModule = {
  command: 'network [host]',
  describe: 'Summarize network state or inspect sockets + remote endpoints',
  builder: y =>
    y
      .positional('host', { type: 'string' })
      .option('show',        { alias: 's', type: 'string' })
      .option('connections', { type: 'boolean' })
      .option('listening',   { type: 'boolean' })
      .option('established', { type: 'boolean' })
      .option('remote',      { type: 'boolean' })
      .option('group',       { type: 'string', choices: ['ip', 'domain', 'process'] as const })
      .option('filter',      { type: 'string' })
      .option('watch',       { type: 'boolean' })
      .option('interval',    { type: 'number' }),
  handler: async argv => {
    const { inspectNetworkNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      host: argv.host as string | undefined,
      show: argv.show as string | undefined,
      connections: argv.connections as boolean | undefined,
      listening: argv.listening as boolean | undefined,
      established: argv.established as boolean | undefined,
      remote: argv.remote as boolean | undefined,
      group: argv.group as 'ip' | 'domain' | 'process' | undefined,
      filter: argv.filter as string | undefined,
      watch: argv.watch as boolean | undefined,
      interval: argv.interval as number | undefined,
    }
    await runAction({
      action: 'inspect',
      input: input as unknown as Record<string, unknown>,
      run: () => inspectNetworkNode(input),
    })
  },
}
