import { Form } from '@cluesurf/form'

export const compress_image: Form = {
  form: 'form',
  save: '~/code/form/action/compress/image',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' }, need: false } } } } },
    quality: { like: 'string', need: false, name: { mark: 'q' }, note: 'JPEG/WebP quality 1–100 (default 80)' },
  },
}
