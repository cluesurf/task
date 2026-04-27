/**
 * `task trace process` — per-OS dispatch.
 *
 * - Linux  → strace
 * - macOS  → dtruss (DTrace, requires sudo)
 * - Windows → procmon (Sysinternals)
 *
 * The thing-level console reads `--tool` to override the OS
 * default; otherwise picks the right backend off `os.platform()`.
 */

import os from 'node:os'
import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task trace process',
  describe: 'Trace a running or launched process — syscalls, files, network',
  options: [
    { long: 'pid', describe: 'Attach to an existing PID' },
    { long: 'command', describe: 'Launch and trace this command (rest of argv)' },
    { long: 'tool', describe: 'Override the OS-default backend (strace / dtruss / procmon)' },
    { long: 'summary', describe: 'Print a syscall summary table (Linux only)' },
    { long: 'follow', describe: 'Follow forks' },
    { long: 'syscalls', describe: 'Comma-separated syscall names to filter to (Linux)' },
    { long: 'output', describe: 'Write trace to file instead of stderr' },
  ],
  examples: [
    { comment: 'attach to pid 42 with summary', command: 'task trace process --pid 42 --summary' },
    { comment: 'trace a fresh command', command: 'task trace process --command "ls /tmp"' },
    { comment: 'macOS DTrace via dtruss', command: 'task trace process --pid 42 --tool dtruss' },
  ],
})

type Tool = 'strace' | 'dtruss' | 'procmon'

function defaultTool(): Tool {
  switch (os.platform()) {
    case 'linux':   return 'strace'
    case 'darwin':  return 'dtruss'
    case 'win32':   return 'procmon'
    default:
      throw new Error(`trace process: no default backend for platform ${os.platform()}`)
  }
}

export const traceProcessConsole: CommandModule = {
  command: 'process',
  describe: 'Trace a process (syscalls, files, network)',
  builder: y =>
    y
      .option('pid', { type: 'number' })
      .option('command', { type: 'array', string: true })
      .option('tool', {
        type: 'string',
        choices: ['strace', 'dtruss', 'procmon'] as const,
      })
      .option('summary', { type: 'boolean', default: false })
      .option('follow', { type: 'boolean', default: false })
      .option('syscalls', { type: 'string' })
      .option('output', { type: 'string' })
      .option('match', { type: 'string', describe: 'dtruss: filter by name glob' })
      .option('elapsed', { type: 'boolean', describe: 'dtruss: print elapsed time' })
      .option('capture', { type: 'string', describe: 'procmon: backing .pml file' })
      .option('duration', { type: 'number', describe: 'procmon: capture seconds' })
      .check(argv => {
        if (argv.pid === undefined && (!argv.command || (argv.command as string[]).length === 0)) {
          throw new Error('trace process: provide --pid or --command')
        }
        return true
      }),
  handler: async argv => {
    const tool: Tool = (argv.tool as Tool | undefined) ?? defaultTool()
    const pid = argv.pid as number | undefined
    const command = argv.command as string[] | undefined

    switch (tool) {
      case 'strace': {
        const { traceProcessStraceNode } = await import('./strace/node')
        await traceProcessStraceNode({
          pid,
          command,
          summary: argv.summary as boolean,
          follow: argv.follow as boolean,
          syscalls: argv.syscalls as string | undefined,
          output: argv.output as string | undefined,
        })
        return
      }
      case 'dtruss': {
        const { traceProcessDtrussNode } = await import('./dtruss/node')
        await traceProcessDtrussNode({
          pid,
          command,
          follow: argv.follow as boolean,
          match: argv.match as string | undefined,
          elapsed: argv.elapsed as boolean,
        })
        return
      }
      case 'procmon': {
        const { traceProcessProcmonNode } = await import('./procmon/node')
        const capture = argv.capture as string | undefined
        if (!capture) {
          throw new Error('trace process procmon: --capture <pml-path> is required')
        }
        await traceProcessProcmonNode({
          pid,
          command,
          capture,
          output: argv.output as string | undefined,
          duration: argv.duration as number | undefined,
        })
        return
      }
    }
  },
}
