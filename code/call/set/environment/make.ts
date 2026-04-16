import { Form } from '@cluesurf/form'

/**
 * `task set environment` — upsert a `KEY=VALUE` entry in a
 * `.env`-style file.
 *
 * Three equivalent invocation shapes:
 *
 *   task set environment --key X --value Y
 *   task set environment X --value Y
 *   task set environment X Y
 *
 * The two positional forms fill `key` (and `value`) from yargs
 * positionals when `--key` / `--value` aren't explicit.
 */
export const set_environment: Form = {
  form: 'form',
  save: '~/code/form/action/set/environment',
  link: {
    key: { like: 'string', name: { mark: 'k' } },
    value: { like: 'string', name: { mark: 'v' } },
    file: { like: 'string', need: false, fall: '.env' },
  },
}
