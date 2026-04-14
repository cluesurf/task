import { Form } from '@cluesurf/form'

/**
 * `task update image` — quick color / tonal tweaks via
 * ImageMagick: grayscale, brightness / contrast / saturation.
 * Every flag is optional; at least one must be passed.
 */
export const update_image: Form = {
  form: 'form',
  save: '~/code/form/action/update/image',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' }, need: false } } } } },
    grayscale: { like: 'boolean', need: false, note: 'Convert to grayscale' },
    brightness: { like: 'string', need: false, note: 'Brightness adjust (e.g. +10, -20)' },
    contrast: { like: 'string', need: false, note: 'Contrast adjust (e.g. +10, -20)' },
    saturation: { like: 'string', need: false, note: 'Saturation adjust (e.g. +20)' },
  },
}
