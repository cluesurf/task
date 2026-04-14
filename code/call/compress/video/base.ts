import { Form } from '@cluesurf/form'

/**
 * `task compress video` — re-encode at a given H.264 CRF. Lower
 * CRF is higher quality (and larger file); 23 is the ffmpeg
 * default, 28 is the sweet spot for web delivery.
 */
export const compress_video: Form = {
  form: 'form',
  save: '~/code/form/action/compress/video',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    crf: { like: 'string', need: false, note: 'H.264 CRF, 0 (lossless) – 51 (worst). Default 28.' },
    preset: { like: 'string', need: false, note: 'x264 preset (ultrafast…veryslow). Default medium.' },
  },
}
