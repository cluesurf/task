import { Form } from '@cluesurf/form'

export const parse_ast: Form = {
  form: 'form',
  save: '~/code/form/action/parse/code/shared',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}
