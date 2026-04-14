import { Form, List } from '@cluesurf/form'

/** `rar` produces only `.rar`. */
export const rar_output_format: List = {
  form: 'list',
  save: '~/code/form/action/archive/rar',
  list: ['rar'],
}

/**
 * Action input for `rar`-backed archiving. The `rar` CLI is
 * proprietary and not installed on macOS by default; prefer `7z`
 * or `patool` if rar output isn't strictly required.
 */
export const archive_with_rar: Form = {
  form: 'form',
  save: '~/code/form/action/archive/rar',
  link: {
    input: {
      link: {
        path: { like: 'string' },
      },
    },
    output: {
      link: {
        format: { like: 'rar_output_format', name: { mark: 'O' } },
        file: {
          link: { path: { like: 'string' } },
        },
      },
    },
    level: { like: 'natural_number', need: false },
    password: { like: 'string', need: false },
    solid: { like: 'boolean', need: false, fall: false },
    recovery: { like: 'natural_number', need: false },
    exclude: { like: 'string', list: true, need: false },
    recursive: { like: 'boolean', need: false, fall: true },
    volumeSize: { like: 'string', need: false },
  },
}
