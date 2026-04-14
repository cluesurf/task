/**
 * `task list process` — hand-written CommandModule. The schema
 * has enough flags + behavioural overlaps (positional PID,
 * mutually-informing --top / --sort / --layout) that the generic
 * `buildActionCommand` path doesn't express the shape cleanly.
 * Help is registered explicitly to match the rest of the CLI.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task list process',
  describe: 'List running processes with filter / sort / group / tree',
  options: [
    { long: 'port', describe: 'Filter to the process using a specific TCP/UDP port' },
    { long: 'text', describe: 'Fuzzy match name or command (substring)' },
    { long: 'user', describe: 'Filter by user' },
    { long: 'top', describe: 'Return the top N by `cpu` or `memory`' },
    { long: 'sort', describe: 'Sort key: cpu | memory | rss | pid | name | user' },
    { long: 'direction', describe: 'increasing | decreasing (default decreasing)' },
    { long: 'layout', describe: '`table` (default) or `tree`' },
    { long: 'group', describe: 'Group by `name` or `user` and aggregate CPU / memory' },
    { long: 'show', describe: '`children` when passed a positional PID' },
    { long: 'limit', describe: 'Row cap for table output (default 50)' },
  ],
  examples: [
    { comment: 'what\'s using port 3000', command: 'task list process --port 3000' },
    { comment: 'find all node processes', command: 'task list process --text node' },
    { comment: 'top 10 memory consumers', command: 'task list process --top memory' },
    { comment: 'full process tree', command: 'task list process --layout tree' },
    { comment: 'subtree from a PID', command: 'task list process 1234 --layout tree' },
    { comment: 'group by process name', command: 'task list process --group name' },
  ],
})

export const listProcessConsole: CommandModule = {
  command: 'process [pid]',
  describe: 'List running processes with filter / sort / group / tree',
  builder: y =>
    y
      .positional('pid', { type: 'number', describe: 'A specific PID to drill into' })
      .option('port', { type: 'number' })
      .option('text', { type: 'string' })
      .option('user', { type: 'string' })
      .option('top', { type: 'string', choices: ['cpu', 'memory'] })
      .option('sort', { type: 'string', choices: ['cpu', 'memory', 'rss', 'pid', 'name', 'user'] })
      .option('direction', { type: 'string', choices: ['increasing', 'decreasing'] })
      .option('layout', { type: 'string', choices: ['table', 'tree'] })
      .option('group', { type: 'string', choices: ['name', 'user'] })
      .option('show', { type: 'string' })
      .option('limit', { type: 'number', default: 50 }),
  handler: async argv => {
    const { listProcessNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      pid: argv.pid as number | undefined,
      port: argv.port as number | undefined,
      text: argv.text as string | undefined,
      user: argv.user as string | undefined,
      top: argv.top as 'cpu' | 'memory' | undefined,
      sort: argv.sort as string | undefined,
      direction: argv.direction as 'increasing' | 'decreasing' | undefined,
      layout: (argv.layout as 'table' | 'tree' | undefined) ?? 'table',
      group: argv.group as 'name' | 'user' | undefined,
      show: argv.show as string | undefined,
      limit: argv.limit as number,
    }
    await runAction({
      action: 'list',
      input: input as unknown as Record<string, unknown>,
      run: () => listProcessNode(input),
    })
  },
}
