import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task record screen',
  describe: 'Record the screen via ffmpeg (mp4 / webm / gif)',
  options: [
    { long: 'output',    short: 'o', describe: 'Output file (.mp4 / .webm / .gif)' },
    { long: 'display',               describe: 'Display id ("1" mac, ":0.0" linux, "desktop" win)' },
    { long: 'framerate', short: 'r', describe: 'Frames per second (default ffmpeg picks)' },
    { long: 'duration',  short: 't', describe: 'Stop after N seconds (Ctrl-C otherwise)' },
    { long: 'audio',                 describe: 'Audio device id (mac avfoundation)' },
    { long: 'cursor',                describe: 'Capture cursor (default true)' },
  ],
  examples: [
    { comment: 'mp4 until Ctrl-C', command: 'task record screen -o demo.mp4' },
    { comment: '15s gif',          command: 'task record screen -o demo.gif -t 15 -r 15' },
    { comment: 'with system audio (mac)', command: 'task record screen -o demo.mp4 --audio 0' },
  ],
})

export const recordScreenConsole: CommandModule = {
  command: 'screen',
  describe: 'Record the screen (mp4 / webm / gif)',
  builder: y => y
    .option('output',    { alias: 'o', type: 'string', demandOption: true })
    .option('display',   { type: 'string' })
    .option('framerate', { alias: 'r', type: 'number' })
    .option('duration',  { alias: 't', type: 'number' })
    .option('audio',     { type: 'string' })
    .option('cursor',    { type: 'boolean' }),
  handler: async argv => {
    const { runRecordScreen } = await import('~/code/tool/node/record/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      output: argv.output as string,
      display: argv.display as string | undefined,
      framerate: argv.framerate as number | undefined,
      duration: argv.duration as number | undefined,
      audio: argv.audio as string | undefined,
      cursor: argv.cursor as boolean | undefined,
    }
    await runAction({
      action: 'record',
      input: input as unknown as Record<string, unknown>,
      run: () => runRecordScreen(input),
    })
  },
}
