/**
 * `task record window <id>` — capture a single window.
 *
 *   $ task list window           # find an id
 *   $ task record window 501:abcd1234 -o demo.mp4 -t 15
 *
 * Per-platform capture path:
 *   - macOS: avfoundation grabs the whole display; ffmpeg
 *     `-vf crop=...` clips to the window's bbox (read from
 *     System Events).
 *   - Linux X11: x11grab with `-i :0.0+x,y` and
 *     `-video_size WxH` from `wmctrl -l -G`.
 *   - Windows: gdigrab `title="..."` selector.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task record window',
  describe: 'Record a single window via ffmpeg (mp4 / webm / gif)',
  options: [
    { long: 'output',    short: 'o', describe: 'Output file (.mp4 / .webm / .gif)' },
    { long: 'framerate', short: 'r', describe: 'Frames per second' },
    { long: 'duration',  short: 't', describe: 'Stop after N seconds (Ctrl-C otherwise)' },
    { long: 'audio',                 describe: 'Audio device id (mac avfoundation)' },
    { long: 'cursor',                describe: 'Capture cursor (default true)' },
  ],
  examples: [
    { comment: 'list windows first',
      command: 'task list window' },
    { comment: 'record by stable id',
      command: 'task record window 501:abcd1234 -o demo.mp4' },
    { comment: 'record by title substring',
      command: 'task record window "Safari" -o web.gif -t 10' },
  ],
})

export const recordWindowConsole: CommandModule = {
  command: 'window <id>',
  describe: 'Record a single window (mp4 / webm / gif)',
  builder: y => y
    .positional('id',     { type: 'string', demandOption: true })
    .option('output',     { alias: 'o', type: 'string', demandOption: true })
    .option('framerate',  { alias: 'r', type: 'number' })
    .option('duration',   { alias: 't', type: 'number' })
    .option('audio',      { type: 'string' })
    .option('cursor',     { type: 'boolean' }),
  handler: async argv => {
    const { runRecordWindow } = await import('~/code/tool/node/record/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      windowId: argv.id as string,
      output: argv.output as string,
      framerate: argv.framerate as number | undefined,
      duration: argv.duration as number | undefined,
      audio: argv.audio as string | undefined,
      cursor: argv.cursor as boolean | undefined,
    }
    await runAction({
      action: 'record',
      input: input as unknown as Record<string, unknown>,
      run: () => runRecordWindow(input),
    })
  },
}
