import { Form } from '@cluesurf/form'

export const remove_image_metadata: Form = {
  form: 'form',
  save: '~/code/form/action/remove/metadata/shared',
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
  },
}
