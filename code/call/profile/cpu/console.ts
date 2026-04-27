/**
 * `task profile cpu` — sampling CPU profiler with three backends:
 *
 * - samply  → cross-platform Rust profiler (default outside Node)
 * - 0x      → Node.js flamegraph (default for `node` commands)
 * - clinic  → NearForm Clinic.js (richer Node breakdown)
 *
 * Pick a backend via `--tool`; otherwise we sniff the command and
 * pick samply for non-Node, 0x for Node.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task profile cpu',
  describe: 'Sample CPU usage of a process or command and emit a flamegraph',
  options: [
    { long: 'pid', describe: 'Attach to an existing PID (samply only)' },
    { long: 'command', describe: 'Launch and profile this command (rest of argv)' },
    { long: 'tool', describe: 'Force a backend — samply / 0x / clinic' },
    { long: 'rate', describe: 'Sampling rate in Hz (samply)' },
    { long: 'output', describe: 'Save the report to this path' },
    { long: 'no-open', describe: "Don't auto-open a browser (samply)" },
    { long: 'tool-mode', describe: 'Clinic subtool — flame / doctor / bubbleprof / heapprofiler' },
  ],
  examples: [
    { comment: 'profile a Rust binary', command: 'task profile cpu --command ./target/release/parse' },
    { comment: 'profile a Node script', command: 'task profile cpu --command "node server.js"' },
    { comment: 'attach to a running pid', command: 'task profile cpu --pid 4242' },
    { comment: 'force clinic flamegraph', command: 'task profile cpu --command "node app.js" --tool clinic' },
  ],
})

type Tool = 'samply' | '0x' | 'clinic'

function pickTool(command: string[] | undefined): Tool {
  const head = command?.[0] ?? ''
  if (/^(node|nodejs|npx|tsx|ts-node)$/i.test(head)) return '0x'
  return 'samply'
}

export const profileCpuConsole: CommandModule = {
  command: 'cpu',
  describe: 'Sample CPU usage of a process or command and emit a flamegraph',
  builder: y =>
    y
      .option('pid', { type: 'number' })
      .option('command', { type: 'array', string: true })
      .option('tool', { type: 'string', choices: ['samply', '0x', 'clinic'] as const })
      .option('rate', { type: 'number' })
      .option('output', { type: 'string' })
      .option('no-open', { type: 'boolean', default: false })
      .option('tool-mode', {
        type: 'string',
        choices: ['flame', 'doctor', 'bubbleprof', 'heapprofiler'] as const,
      })
      .check(argv => {
        if (argv.pid === undefined && (!argv.command || (argv.command as string[]).length === 0)) {
          throw new Error('profile cpu: provide --pid or --command')
        }
        return true
      }),
  handler: async argv => {
    const command = argv.command as string[] | undefined
    const tool: Tool = (argv.tool as Tool | undefined) ?? pickTool(command)

    switch (tool) {
      case 'samply': {
        const { profileCpuSamplyNode } = await import('./samply/node')
        await profileCpuSamplyNode({
          pid: argv.pid as number | undefined,
          command,
          rate: argv.rate as number | undefined,
          output: argv.output as string | undefined,
          noOpen: argv['no-open'] as boolean,
        })
        return
      }
      case '0x': {
        const { profileCpuZeroxNode } = await import('./zerox/node')
        if (!command) throw new Error('profile cpu 0x: --command is required')
        await profileCpuZeroxNode({
          command,
          outputDir: argv.output as string | undefined,
          quiet: argv['no-open'] as boolean,
        })
        return
      }
      case 'clinic': {
        const { profileCpuClinicNode } = await import('./clinic/node')
        if (!command) throw new Error('profile cpu clinic: --command is required')
        await profileCpuClinicNode({
          command,
          tool: argv['tool-mode'] as
            | 'flame' | 'doctor' | 'bubbleprof' | 'heapprofiler'
            | undefined,
          outputDir: argv.output as string | undefined,
        })
        return
      }
    }
  },
}
