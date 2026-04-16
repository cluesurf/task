import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task replay',
  describe: 'Replay an asciinema .cast (terminal playback or render to gif/mp4)',
  options: [
    { long: 'output',     short: 'o', describe: 'Render to .gif / .mp4 (default: terminal playback)' },
    { long: 'speed',      short: 's', describe: 'Playback speed multiplier (e.g. 2 for 2x)' },
    { long: 'idle-limit',             describe: 'Compress idle pauses to N seconds during playback' },
    { long: 'format',                 describe: 'play (default) | gif | mp4 — overrides output extension' },
  ],
  examples: [
    { comment: 'play in terminal',   command: 'task replay demo.cast' },
    { comment: '2x speed',           command: 'task replay demo.cast -s 2' },
    { comment: 'render to gif',      command: 'task replay demo.cast -o demo.gif' },
    { comment: 'render to mp4',      command: 'task replay demo.cast -o demo.mp4' },
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
    .option('format',     { type: 'string', choices: ['play', 'gif', 'mp4'] as const }),
  handler: async argv => {
    const { runReplay } = await import('~/code/tool/node/record/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.input as string,
      output: argv.output as string | undefined,
      speed: argv.speed as number | undefined,
      idleLimit: argv['idle-limit'] as number | undefined,
      format: argv.format as 'play' | 'gif' | 'mp4' | undefined,
    }
    await runAction({
      action: 'replay',
      input: input as unknown as Record<string, unknown>,
      run: () => runReplay(input),
    })
  },
}
