import { Form } from '@cluesurf/form'

export const extract_with_7z: Form = {
  form: 'form',
  save: '~/code/type/action/extract/archive/shared',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        path: { like: 'string' },
      },
    },
    output: {
      link: {
        format: { like: 'string', name: { mark: 'O' } },
        file: {
          link: { path: { like: 'string' } },
        },
      },
    },
  },
}

export const extract_with_unarchiver: Form = {
  form: 'form',
  save: '~/code/type/action/extract/archive/shared',
  link: {
    input: {
      link: {
        password: { like: 'string', need: false },
        format: { like: 'archive_format', name: { mark: 'I' } },
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    output: {
      link: {
        overwrite: {
          like: 'boolean',
          fall: false,
          need: false,
          name: { mark: 'w' },
        },
        directory: {
          link: {
            path: { like: 'string', name: { mark: 'o' } },
          },
        },
      },
    },
  },
}
