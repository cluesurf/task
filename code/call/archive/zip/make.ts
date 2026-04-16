import { Form, List } from '@cluesurf/form'

/** `zip` produces only `.zip`. */
export const zip_output_format: List = {
  form: 'list',
  save: '~/code/form/action/archive/zip',
  list: ['zip'],
}

/**
 * Action input for `zip`-backed archiving. Paths are collected into
 * a single `.zip`. `level` is 0–9 (0 = store, 9 = max DEFLATE).
 */
export const archive_with_zip: Form = {
  form: 'form',
  save: '~/code/form/action/archive/zip',
  link: {
    input: {
      link: {
        path: { like: 'string' },
      },
    },
    output: {
      link: {
        format: { like: 'zip_output_format', name: { mark: 'O' } },
        file: {
          link: { path: { like: 'string' } },
        },
      },
    },
    level: { like: 'natural_number', need: false },
    password: { like: 'string', need: false },
    encryption: {
      take: ['zip-2.0', 'aes-128', 'aes-256'],
      need: false,
    },
    exclude: { like: 'string', list: true, need: false },
    recursive: { like: 'boolean', need: false, fall: true },
    junkPaths: { like: 'boolean', need: false, fall: false },
    splitSize: { like: 'string', need: false },
  },
}
