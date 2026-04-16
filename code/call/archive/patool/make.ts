import { Form } from '@cluesurf/form'

/**
 * `patool` is a Python wrapper that routes to the best-available
 * tool per format (7z, tar, zip, rar, ...). Same full-format
 * coverage as `atool`.
 */
export const archive_with_patool: Form = {
  form: 'form',
  save: '~/code/form/action/archive/patool',
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
    verbose: { like: 'boolean', need: false, fall: false },
    nonInteractive: { like: 'boolean', need: false, fall: true },
  },
}
