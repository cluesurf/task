/**
 * Yargs command group for `task set <thing>`.
 *
 *   - `task set metadata` — write ID3 / container metadata to an
 *     audio file (delegates to `./metadata/console`).
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { setEncodingConsole } from './encoding/console'
import { setEnvironmentConsole } from './environment/console'
import { setEolConsole } from './eol/console'
import { setMetadataConsole } from './metadata/console'
import { setServiceConsole } from './service/console'
import { setSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task set',
  describe: 'Write a property onto a target (metadata, encoding, eol, ssh, ...)',
  commands: [
    { name: 'encoding', describe: 'Re-encode a text file to a target character encoding' },
    { name: 'environment', describe: 'Upsert a KEY=VALUE entry in a .env-style file' },
    { name: 'eol', describe: 'Normalize line endings in a text file' },
    { name: 'metadata', describe: 'Write ID3 / container metadata to an audio file' },
    { name: 'service', describe: 'Enable / disable a system service on boot' },
    { name: 'ssh', describe: 'Patch fields on an existing SSH Host entry' },
  ],
})

export const setConsole: CommandModule = {
  command: 'set <thing>',
  describe: 'Write a property onto a target (metadata, encoding, eol, ssh, ...)',
  builder: y =>
    y
      .command(setEncodingConsole)
      .command(setEnvironmentConsole)
      .command(setEolConsole)
      .command(setMetadataConsole)
      .command(setServiceConsole)
      .command(setSshConsole)
      .demandCommand(1, 'Specify what to set'),
  handler: () => {},
}
