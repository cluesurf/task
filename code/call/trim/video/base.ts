import { Form } from '@cluesurf/form'

export const trim_video: Form = {
  form: 'form',
  save: '~/code/form/action/trim/video',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    start: { like: 'string', need: false, name: { mark: 's' }, note: 'Start offset (seconds or HH:MM:SS)' },
    end: { like: 'string', need: false, name: { mark: 'e' }, note: 'End offset (seconds or HH:MM:SS)' },
    duration: { like: 'string', need: false, name: { mark: 'd' }, note: 'Alternate to --end: length of the cut' },
    reencode: { like: 'boolean', need: false, note: 'Re-encode instead of stream copy (slower, frame-accurate)' },
  },
}
