/**
 * Yargs command group for `task convert <thing>`.
 *
 * Each concrete convert-target exports its own `CommandModule`
 * at `./<thing>/console.ts`; this file collects them under the
 * `convert` verb.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { convertArchiveConsole } from './archive/console'
import { convertAudioConsole } from './audio/console'
import { convertDataConsole } from './data/console'
import { convertDocumentConsole } from './document/console'
import { convertFontConsole } from './font/console'
import { convertImageConsole } from './image/console'
import { convertTimeConsole } from './time/console'
import { convertUnitConsole } from './unit/console'
import { convertVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task convert',
  describe: 'Convert between formats',
  commands: [
    { name: 'archive', describe: 'Convert between archive formats (tar, zip, ...)' },
    { name: 'audio', describe: 'Convert between audio formats (mp3, wav, flac, ogg, ...)' },
    { name: 'data', describe: 'Convert between data formats (csv, json, parquet, ...)' },
    { name: 'document', describe: 'Convert between document formats (docx, pdf, md, ...)' },
    { name: 'font', describe: 'Convert between font formats (ttf, otf, woff2, ...)' },
    { name: 'image', describe: 'Convert between image formats (png, jpg, webp, ...)' },
    { name: 'time', describe: 'Convert timestamps between formats and zones' },
    { name: 'unit', describe: 'Convert between units of measure' },
    { name: 'video', describe: 'Convert between video formats (mp4, webm, mov, ...)' },
  ],
})

export const convertConsole: CommandModule = {
  command: 'convert <thing>',
  describe: 'Convert between formats',
  builder: y =>
    y
      .command(convertArchiveConsole)
      .command(convertAudioConsole)
      .command(convertDataConsole)
      .command(convertDocumentConsole)
      .command(convertFontConsole)
      .command(convertImageConsole)
      .command(convertTimeConsole)
      .command(convertUnitConsole)
      .command(convertVideoConsole)
      .demandCommand(1, 'Specify what to convert'),
  handler: () => {},
}
