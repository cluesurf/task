import { Form } from '@cluesurf/form'

export const archive: Form = {
  form: 'form',
  save: '~/code/form/action/archive',
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
  },
}
