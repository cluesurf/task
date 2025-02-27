import { Form } from '@cluesurf/form'

export const check_file_type_using_magic_bytes: Form = {
  form: 'form',
  save: '~/code/type/action/check/file',
  link: {
    input: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}
