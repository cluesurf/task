import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task replay',
  describe: 'Replay an asciinema .cast (terminal playback, gif, mp4, or autoplay HTML)',
  options: [
    { long: 'output',     short: 'o', describe: 'Render to .gif / .mp4 / .html (default: terminal playback)' },
    { long: 'speed',      short: 's', describe: 'Playback speed multiplier (e.g. 2 for 2x)' },
    { long: 'idle-limit',             describe: 'Compress idle pauses to N seconds during playback' },
    { long: 'format',     short: 'f', describe: 'play | gif | mp4 | html — overrides output extension. The global --format flag is verb-defined: replay reads it as render-format; values outside the render set fall through to the extension.' },
  ],
  examples: [
    { comment: 'play in terminal',     command: 'task replay demo.cast' },
    { comment: '2x speed',             command: 'task replay demo.cast -s 2' },
    { comment: 'render to gif',        command: 'task replay demo.cast -o demo.gif' },
    { comment: 'render to mp4',        command: 'task replay demo.cast -o demo.mp4' },
    { comment: 'autoplay HTML embed',  command: 'task replay demo.cast -o demo.html' },
    { comment: 'force gif render',     command: 'task replay demo.cast -o demo.bin --format gif' },
  ],
})

export const replayConsole: CommandModule = {
  command: 'replay <input>',
  describe: 'Replay an asciinema .cast (playback or render)',
  builder: y => y
    .positional('input',  { type: 'string' })
    .option('output',     { alias: 'o', type: 'string' })
    .option('speed',      { alias: 's', type: 'number' })
    .option('idle-limit', { type: 'number' })
    .option('format', {
      // Local re-declaration of the (otherwise global) --format
      // flag. By convention each verb defines what --format means
      // for itself; for `replay` it picks the render target.
      // The global default of `pretty` still leaks in via
      // argv.format, so the handler filters it down to the
      // render-format set below.
      alias: 'f',
      type: 'string',
    }),
  handler: async argv => {
    const { runReplay } = await import('~/code/tool/node/record/make')
    const { runAction } = await import('~/code/tool/node/log')
    const RENDER_FORMATS = new Set(['play', 'gif', 'mp4', 'html'])
    const raw = argv.format as string | undefined
    const format = raw && RENDER_FORMATS.has(raw)
      ? (raw as 'play' | 'gif' | 'mp4' | 'html')
      : undefined
    const input = {
      input: argv.input as string,
      output: argv.output as string | undefined,
      speed: argv.speed as number | undefined,
      idleLimit: argv['idle-limit'] as number | undefined,
      format,
    }
    await runAction({
      action: 'replay',
      input: input as unknown as Record<string, unknown>,
      run: () => runReplay(input),
    })
  },
}
