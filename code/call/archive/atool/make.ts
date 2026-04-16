import { Form } from '@cluesurf/form'

/**
 * `atool`/`apack` delegates to whichever underlying tool matches
 * the target extension. Supports the full `archive_format` list
 * because it routes based on filename suffix.
 */
export const archive_with_atool: Form = {
  form: 'form',
  save: '~/code/form/action/archive/atool',
  link: {
    input: {
      link: {
        path: { like: 'string' },
      },
    },
    output: {
      link: {
        format: { like: 'archive_format', name: { mark: 'O' } },
        file: {
          link: { path: { like: 'string' } },
        },
      },
    },
    quiet: { like: 'boolean', need: false, fall: true },
    verbose: { like: 'boolean', need: false, fall: false },
    force: { like: 'boolean', need: false, fall: false },
  },
}
