import { Form } from '@cluesurf/form'

/**
 * `task split audio --segments silence` — ffmpeg silencedetect
 * finds gaps, we carve the input into one segment per gap. The
 * alternative shape is `--segments <seconds>` which produces
 * fixed-duration chunks.
 */
export const split_audio: Form = {
  form: 'form',
  save: '~/code/form/action/split/audio',
  link: {
    input: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    output: {
      link: {
        file: {
          link: {
            path: { like: 'string', name: { mark: 'o' }, need: false },
          },
        },
      },
    },
    segments: {
      like: 'string',
      need: true,
      name: { mark: 's' },
      note: '`silence` or a fixed chunk length in seconds (e.g. `30`)',
    },
    silenceDb: {
      like: 'string',
      need: false,
      note: 'Noise floor for silencedetect (default -30dB)',
    },
    silenceDuration: {
      like: 'string',
      need: false,
      note: 'Minimum silence duration in seconds (default 0.5)',
    },
  },
}
