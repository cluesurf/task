import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { normalizeAudioConsole } from './audio/console'

registerGroupHelp({
  command: 'task normalize',
  describe: 'Normalize a media file (loudness, levels)',
  commands: [
    { name: 'audio', describe: 'Loudness-normalize an audio file (EBU R128)' },
  ],
})

export const normalizeConsole: CommandModule = {
  command: 'normalize <thing>',
  describe: 'Normalize a media file (loudness, levels)',
  builder: y =>
    y
      .command(normalizeAudioConsole)
      .demandCommand(1, 'Specify what to normalize'),
  handler: () => {},
}
