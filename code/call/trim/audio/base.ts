import { Form } from '@cluesurf/form'

/**
 * `task trim audio` — extract a time range from an audio file
 * with ffmpeg. Uses `-ss` / `-to` which accept either seconds or
 * `HH:MM:SS(.ms)` strings.
 */
export const trim_audio: Form = {
  form: 'form',
  save: '~/code/form/action/trim/audio',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    start: { like: 'string', need: false, name: { mark: 's' }, note: 'Start offset (seconds or HH:MM:SS)' },
    end: { like: 'string', need: false, name: { mark: 'e' }, note: 'End offset (seconds or HH:MM:SS)' },
    duration: { like: 'string', need: false, name: { mark: 'd' }, note: 'Alternate to --end: length of the cut' },
  },
}
