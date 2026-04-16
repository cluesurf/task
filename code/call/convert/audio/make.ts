import { Form } from '@cluesurf/form'

/**
 * `task convert audio` — re-encode between audio formats with
 * ffmpeg. The output extension picks the codec; `--bitrate` is
 * an optional knob for lossy targets.
 */
export const convert_audio: Form = {
  form: 'form',
  save: '~/code/form/action/convert/audio',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    bitrate: { like: 'string', need: false, name: { mark: 'b' }, note: 'Target bitrate (e.g. 128k, 192k)' },
  },
}
