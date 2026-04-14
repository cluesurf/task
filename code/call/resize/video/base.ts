import { Form } from '@cluesurf/form'

export const resize_video: Form = {
  form: 'form',
  save: '~/code/form/action/resize/video',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    width: { like: 'natural_number', need: false, name: { mark: 'w' }, note: 'Target width (preserves aspect if height omitted)' },
    // `-h` is reserved globally for `--help`; pass `--height` in
    // full. Width keeps `-w` since it's the more common knob.
    height: { like: 'natural_number', need: false, note: 'Target height' },
  },
}
