import { Form, List } from '@cluesurf/form'

/**
 * Action input for `task pad` — extends an audio file with
 * silence so its duration meets a target length. Common audio
 * containers all flow through ffmpeg, so the schema doesn't need
 * a `<thing>` segment.
 *
 * `to` is the target duration. Accepted shapes:
 *   - `MM:SS.mmm` (`3:00.000`)
 *   - `SS.mmm`    (`180.0`)
 *   - `SSs`       (`180s`)
 * If the input is already at least `to` long, the file is copied
 * through unchanged.
 */

export const audio_pad_format: List = {
  form: 'list',
  save: '~/code/form/object/audio',
  list: ['mp3', 'wav', 'flac', 'ogg', 'opus', 'm4a', 'aac'],
}

export const pad: Form = {
  form: 'form',
  save: '~/code/form/action/pad',
  link: {
    input: {
      link: {
        format: { like: 'audio_pad_format', name: { mark: 'I' }, need: false },
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    output: {
      link: {
        format: { like: 'audio_pad_format', name: { mark: 'O' }, need: false },
        file: {
          link: { path: { like: 'string', name: { mark: 'o' } } },
        },
      },
    },
    to: { like: 'string', need: true, note: 'Target duration (MM:SS.mmm or seconds)' },
    sampleRate: { like: 'natural_number', need: false },
    channels: { like: 'natural_number', need: false },
  },
}
