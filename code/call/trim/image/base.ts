import { Form } from '@cluesurf/form'

/**
 * `task trim image` — crop a rectangle out of an image via
 * ImageMagick's `-crop WxH+X+Y`. The `--crop` shorthand accepts
 * `x,y,w,h` so callers can paste from UI tools without worrying
 * about geometry strings.
 */
export const trim_image: Form = {
  form: 'form',
  save: '~/code/form/action/trim/image',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    crop: {
      like: 'string',
      need: true,
      name: { mark: 'c' },
      note: 'Crop rectangle as "x,y,w,h" (pixels)',
    },
  },
}
