import { Form } from '@cluesurf/form'

export const verify_image_with_image_magick: Form = {
  form: 'form',
  save: '~/code/form/action/verify/image/shared',
  link: {
    format: { like: 'image_magick_format', name: { mark: 'I' } },
    file: {
      link: {
        path: { like: 'string', name: { mark: 'i' } },
      },
    },
  },
}
