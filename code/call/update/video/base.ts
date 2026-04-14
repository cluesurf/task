import { Form } from '@cluesurf/form'

/**
 * `task update video --subtitles subs.srt` — mux a subtitle track
 * into an existing video. ffmpeg maps the video/audio streams
 * from the input and the subtitle stream from the sidecar file.
 */
export const update_video: Form = {
  form: 'form',
  save: '~/code/form/action/update/video',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' }, need: false } } } } },
    subtitles: { like: 'string', need: false, name: { mark: 's' }, note: 'Path to a .srt / .vtt / .ass subtitle file' },
  },
}
