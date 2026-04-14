/**
 * `task compare a b` — semantic diff. For JSON / YAML / TOML we
 * parse both sides and walk the shape, reporting added / removed
 * / changed keys regardless of serialization order or whitespace.
 * Falls back to a line-based diff for formats we don't parse.
 *
 * Hand-written console because the two-positional shape (`a b`)
 * doesn't fit the generic schema path, and because there's no
 * output file — the diff renders inline.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task compare',
  describe: 'Semantic diff of two structured files (JSON, YAML, TOML)',
  options: [
    {
      long: 'format',
      describe: 'Force a format: json | yaml | toml | text (default: inferred from extension)',
    },
  ],
  examples: [
    { comment: 'JSON diff', command: 'task compare a.json b.json' },
    { comment: 'YAML diff', command: 'task compare a.yaml b.yaml' },
    { comment: 'line-based fallback', command: 'task compare a.txt b.txt --format text' },
  ],
})

export const compareConsole: CommandModule = {
  command: 'compare <left> <right>',
  describe: 'Semantic diff of two structured files (JSON, YAML, TOML)',
  builder: y =>
    y
      .positional('left', { type: 'string', describe: 'Left file' })
      .positional('right', { type: 'string', describe: 'Right file' })
      // `--format` here means the *file* format of the two files
      // being diffed. The global `-f / --format` output-style
      // switch is still reachable via `-f pretty` / `-f json`
      // — both options coexist at this subcommand level because
      // yargs scopes them per-command.
      .option('format', {
        type: 'string',
        choices: ['json', 'yaml', 'toml', 'text'],
      }),
  handler: async argv => {
    const { compareNode } = await import('./node')
    const { runAction, setLoggingStyle, resolveLoggingStyle } =
      await import('~/code/tool/node/log')
    // `--format` here means the *file* format of the two files
    // being diffed, not the global output style. If the value
    // happens to look like a file format, peel it off and reset
    // the logging style that the global middleware already
    // latched onto (it would otherwise flip into JSON mode when
    // a user types `--format json`).
    const rawFormat = argv.format as string | undefined
    const fileFormats = ['json', 'yaml', 'toml', 'text']
    const format = rawFormat && fileFormats.includes(rawFormat) ? rawFormat : undefined
    if (format) {
      setLoggingStyle(resolveLoggingStyle('pretty'))
    }
    const input = {
      left: argv.left as string,
      right: argv.right as string,
      as: format,
    }
    await runAction({
      action: 'compare',
      input: input as unknown as Record<string, unknown>,
      run: () => compareNode(input),
    })
  },
}
