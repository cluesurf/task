import { Form } from '@cluesurf/form'

export const rotate_video: Form = {
  form: 'form',
  save: '~/code/form/action/rotate/video',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    degree: {
      like: 'string',
      need: true,
      name: { mark: 'd' },
      note: 'Degrees clockwise: 90, 180, or 270',
    },
  },
}
