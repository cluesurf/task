import { Form } from '@cluesurf/form'

export const validate_pdf_with_data: Form = {
  form: 'form',
  save: '~/code/form/action/validate/document/shared',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            data: { like: 'array_buffer' },
          },
        },
      },
    },
  },
}
