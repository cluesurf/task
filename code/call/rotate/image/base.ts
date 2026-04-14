import { Form } from '@cluesurf/form'

export const rotate_image: Form = {
  form: 'form',
  save: '~/code/form/action/rotate/image',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    degree: {
      like: 'string',
      need: true,
      name: { mark: 'd' },
      note: 'Degrees clockwise (e.g. 90, 180, 270, 45)',
    },
  },
}
