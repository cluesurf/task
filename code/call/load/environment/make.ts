import { Form } from '@cluesurf/form'

/**
 * Action input for `task load environment` — upserts a `KEY=VALUE`
 * entry into a `.env`-style file. Mirrors the behaviour of
 * `deck/etch/scripts/env/set.sh`:
 *
 *   - file is created when missing
 *   - existing key is rewritten in place
 *   - missing key is appended
 *
 * `file` defaults to `.env` in the current working directory.
 */

export const load_environment: Form = {
  form: 'form',
  save: '~/code/form/action/load/environment',
  link: {
    key: { like: 'string', name: { mark: 'k' } },
    value: { like: 'string', name: { mark: 'v' } },
    file: { like: 'string', need: false, fall: '.env', name: { mark: 'f' } },
  },
}
