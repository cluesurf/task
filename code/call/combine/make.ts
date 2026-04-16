import { Form } from '@cluesurf/form'

/**
 * Action input for `task combine` — fuses a still image and an
 * audio track into a single video file, looping the image for
 * the audio's duration. Inspired by
 * `deck/etch/scripts/utilities/image-audio.sh`, with extra
 * robustness:
 *
 *   - even-dimension scale filter so libx264 accepts any source
 *     image size (it requires `mod 2`)
 *   - configurable bitrate / sample-rate / video container
 *
 * Defaults match the etch script (h264 + aac @ 256kbps + 48kHz).
 */

export const combine: Form = {
  form: 'form',
  save: '~/code/form/action/combine',
  link: {
    input: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    audio: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'a' } } },
        },
      },
    },
    output: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'o' } } },
        },
      },
    },
    videoCodec: { like: 'string', need: false, fall: 'libx264' },
    audioCodec: { like: 'string', need: false, fall: 'aac' },
    audioBitrate: { like: 'string', need: false, fall: '256k' },
    sampleRate: { like: 'natural_number', need: false, fall: 48000 },
    pixelFormat: { like: 'string', need: false, fall: 'yuv420p' },
    tune: { like: 'string', need: false, fall: 'stillimage' },
  },
}
