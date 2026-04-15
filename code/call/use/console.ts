// `task use <key> <value>` — set persistent defaults that other
// verbs read when a flag is omitted.
//
//   task use platform cloudflare
//   task use zone example.com
//   task use tool r2
//   task use range 24h

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'

registerGroupHelp({
  command: 'task use',
  describe: 'Set persistent defaults (platform, zone, tool, range)',
  commands: [
    { name: 'platform', describe: 'Default --platform (e.g. cloudflare)' },
    { name: 'zone',     describe: 'Default --zone (hostname)' },
    { name: 'tool',     describe: 'Default --tool (e.g. r2)' },
    { name: 'range',    describe: 'Default --range (24h, 7d, ...)' },
  ],
})

function leaf(key: 'platform' | 'zone' | 'tool' | 'range'): CommandModule {
  return {
    command: `${key} <value>`,
    describe: `Set default ${key}`,
    builder: y => y.positional('value', { type: 'string', demandOption: true }),
    handler: async argv => {
      const { patchContext } = await import('~/code/tool/node/context')
      const next = await patchContext({ [key]: argv.value as string })
      console.log(`saved: ${key}=${next[key]}`)
    },
  }
}

export const useConsole: CommandModule = {
  command: 'use <thing> <value>',
  describe: 'Set persistent defaults',
  builder: y =>
    y
      .command(leaf('platform'))
      .command(leaf('zone'))
      .command(leaf('tool'))
      .command(leaf('range'))
      .demandCommand(1, 'Specify what to use (platform | zone | tool | range)'),
  handler: () => {},
}
