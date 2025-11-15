import { Form } from '@cluesurf/form'

export const crop_pdf_with_pdf_crop: Form = {
  form: 'form',
  save: '~/code/form/action/convert/crop/document/shared',
  link: {
    margin: {
      like: 'natural_number',
      need: false,
    },
    input: {
      link: {
        file: {
          link: {
            path: { like: 'string', name: { mark: 'i' } },
          },
        },
      },
    },
    output: {
      link: {
        file: {
          link: {
            path: { like: 'string', name: { mark: 'o' } },
          },
        },
      },
    },
  },
}
