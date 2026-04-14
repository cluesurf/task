import { Form } from '@cluesurf/form'

export const flip_image: Form = {
  form: 'form',
  save: '~/code/form/action/flip/image',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    horizontal: { like: 'boolean', need: false, note: 'Flip left-to-right' },
    vertical: { like: 'boolean', need: false, note: 'Flip top-to-bottom' },
  },
}
