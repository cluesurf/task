import { Form } from '@cluesurf/form'

/**
 * Action input for `task get duration <file>` — reads the
 * duration of the first audio stream in `file` via ffprobe and
 * returns it in milliseconds (default), seconds, or formatted
 * `MM:SS.mmm`.
 *
 * Works for any container ffprobe understands (mp3, wav, flac,
 * ogg, opus, m4a, aac, mp4, mov, mkv, ...).
 */

export const get_duration: Form = {
  form: 'form',
  save: '~/code/form/action/get/duration',
  link: {
    file: {
      link: { path: { like: 'string', name: { mark: 'i' } } },
    },
    /** Output unit. `ms` (default), `s`, or `clock` (`MM:SS.mmm`). */
    unit: {
      take: ['ms', 's', 'clock'],
      need: false,
      fall: 'ms',
    },
    /** Probe video stream instead of audio (`v:0` instead of `a:0`). */
    video: { like: 'boolean', need: false, fall: false },
  },
}
