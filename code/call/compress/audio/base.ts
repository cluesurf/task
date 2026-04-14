import { Form } from '@cluesurf/form'

export const compress_audio: Form = {
  form: 'form',
  save: '~/code/form/action/compress/audio',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    bitrate: { like: 'string', need: false, name: { mark: 'b' }, note: 'Target bitrate, e.g. 128k, 192k (default 128k)' },
  },
}
