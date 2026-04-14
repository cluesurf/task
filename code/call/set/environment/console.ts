/**
 * `task set environment` — hand-written CommandModule instead of
 * `buildActionCommand` because it accepts TWO positionals
 * (`<key>` and `<value>`) which the generic schema → yargs path
 * doesn't model. Everything else — help registration, runAction
 * wrapping — is wired here explicitly to match the rest of the
 * CLI's style.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task set environment',
  describe: 'Upsert a KEY=VALUE entry in a .env-style file',
  options: [
    { long: 'key', short: 'k', required: true, describe: 'Env variable name' },
    { long: 'value', short: 'v', required: true, describe: 'Env variable value' },
    { long: 'file', describe: 'Target .env file (default: ./.env)' },
  ],
  examples: [
    { comment: 'flag form', command: 'task set environment --key DATABASE_URL --value postgres://localhost/app' },
    { comment: 'one positional (key)', command: 'task set environment API_KEY --value sk-...' },
    { comment: 'two positionals (key + value)', command: 'task set environment API_KEY sk-... --file .env.production' },
  ],
})

export const setEnvironmentConsole: CommandModule = {
  command: 'environment [key] [value]',
  describe: 'Upsert a KEY=VALUE entry in a .env-style file',
  builder: y =>
    y
      .positional('key', { type: 'string', describe: 'Env variable name' })
      .positional('value', { type: 'string', describe: 'Env variable value' })
      // `-f` is globally reserved for `--format`. Use the long
      // form only for the target file.
      .option('file', { type: 'string', default: '.env' })
      .option('k', { alias: 'key-flag', type: 'string', hidden: true, describe: 'Alias for the <key> positional' })
      .option('v', { alias: 'value-flag', type: 'string', hidden: true, describe: 'Alias for the <value> positional' }),
  handler: async argv => {
    // Accept either `<key> <value>` positionals or `-k/--key` + `-v/--value` flags.
    // yargs's positionals in `key` / `value` collide with same-named options,
    // so we read from both sides and prefer the positional when present.
    const key =
      (argv.key as string | undefined) ??
      (argv.k as string | undefined) ??
      (argv['key-flag'] as string | undefined)
    const value =
      (argv.value as string | undefined) ??
      (argv.v as string | undefined) ??
      (argv['value-flag'] as string | undefined)
    if (!key) {
      throw new Error('set environment: missing key. Pass `<key>` or `-k`.')
    }
    if (!value) {
      throw new Error('set environment: missing value. Pass `<value>` or `-v`.')
    }
    const file = (argv.file as string | undefined) ?? '.env'
    const { setEnvironmentNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    await runAction({
      action: 'set',
      input: { key, value, file },
      run: () => setEnvironmentNode({ key, value, file }),
    })
  },
}
