import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { updateFontConsole } from './font/console'
import { updateImageConsole } from './image/console'
import { updateVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task update',
  describe: 'Apply an edit to a file (compile FEA, tonal tweaks, add subtitles, ...)',
  commands: [
    { name: 'font', describe: 'Compile a .fea file into a font\'s GSUB/GPOS tables' },
    { name: 'image', describe: 'Apply color / tonal tweaks to an image' },
    { name: 'video', describe: 'Mux a subtitle track into a video' },
  ],
})

export const updateConsole: CommandModule = {
  command: 'update <thing>',
  describe: 'Apply an edit to a file (compile FEA, tonal tweaks, add subtitles, ...)',
  builder: y =>
    y
      .command(updateFontConsole)
      .command(updateImageConsole)
      .command(updateVideoConsole)
      .demandCommand(1, 'Specify what to update'),
  handler: () => {},
}
