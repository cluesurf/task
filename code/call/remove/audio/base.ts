import { Form } from '@cluesurf/form'

/**
 * `task remove audio` — strip the audio track out of a video
 * with ffmpeg's `-an`. Input video stays untouched; output is
 * written to an explicit `-o` path so the caller doesn't lose
 * the original by accident.
 */
export const remove_audio: Form = {
  form: 'form',
  save: '~/code/form/action/remove/audio',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
  },
}
