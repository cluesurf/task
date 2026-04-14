/**
 * `task unpack <thing>` — pulls content out of a container. Covers
 * archives (tar / zip / etc.) and fonts (TTX / GSUB+GPOS source
 * export). PDF page extraction is a different mental model (you're
 * slicing, not unpacking the binary), so that lives under `task
 * slice document`.
 *
 * Reuses the existing archive + font consoles from `./extract/`
 * directly — same handlers, just a different verb.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { extractArchiveConsole } from '~/code/call/extract/archive/console'
import { extractFontConsole } from '~/code/call/extract/font/console'

registerGroupHelp({
  command: 'task unpack',
  describe: 'Pull content out of a container (archive, font source, ...)',
  commands: [
    { name: 'archive', describe: 'Extract files from an archive' },
    { name: 'font', describe: 'Extract TTX or GSUB / GPOS source from a font' },
  ],
})

export const unpackConsole: CommandModule = {
  command: 'unpack <thing>',
  describe: 'Pull content out of a container (archive, font source, ...)',
  builder: y =>
    y
      .command({ ...extractArchiveConsole, command: 'archive [file]' })
      .command({ ...extractFontConsole, command: 'font [file]' })
      .demandCommand(1, 'Specify what to unpack'),
  handler: () => {},
}
