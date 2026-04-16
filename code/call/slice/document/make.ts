import { Form } from '@cluesurf/form'

export const slice_pdf_with_data: Form = {
  form: 'form',
  save: '~/code/form/action/slice/document/shared',
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
    startPage: { like: 'natural_number' },
    endPage: { like: 'natural_number' },
  },
}

export const slice_pdf: Form = {
  form: 'form',
  save: '~/code/form/action/slice/document/shared',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'i' } },
          },
        },
      },
    },
    startPage: { like: 'natural_number', name: { mark: 'S' } },
    endPage: { like: 'natural_number', name: { mark: 'E' } },
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
