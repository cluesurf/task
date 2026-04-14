import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task parse log',
  describe: 'Parse a log file into structured records (JSON / YAML)',
  options: [
    { long: 'format', describe: 'Output format: `json` (default) or `yaml`' },
    { long: 'limit', describe: 'Cap the number of entries emitted' },
  ],
  examples: [
    { comment: 'nginx → JSON', command: 'task parse log access.log' },
    { comment: 'syslog → YAML', command: 'task parse log system.log --format yaml' },
  ],
})

export const parseLogConsole: CommandModule = {
  command: 'log <file>',
  describe: 'Parse a log file into structured records',
  builder: y =>
    y
      .positional('file', { type: 'string', describe: 'Log file path' })
      .option('format', { type: 'string', choices: ['json', 'yaml'] })
      .option('limit', { type: 'number' }),
  handler: async argv => {
    const { parseLogNode } = await import('./node')
    const { runAction, setLoggingStyle, resolveLoggingStyle } =
      await import('~/code/tool/node/log')
    // `--format` here means the output serialization; restore
    // logging style so the global middleware doesn't flip into
    // JSON emission mode when the user types `--format json`.
    const rawFormat = argv.format as string | undefined
    if (rawFormat === 'json' || rawFormat === 'yaml') {
      setLoggingStyle(resolveLoggingStyle('pretty'))
    }
    const input = {
      file: argv.file as string,
      format: (rawFormat as 'json' | 'yaml' | undefined) ?? 'json',
      limit: argv.limit as number | undefined,
    }
    await runAction({
      action: 'parse',
      input: input as unknown as Record<string, unknown>,
      run: () => parseLogNode(input),
    })
  },
}
