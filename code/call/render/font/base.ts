import { Form } from '@cluesurf/form'

/**
 * Action input for `task render font` — rasterize a text sample
 * through a font via HarfBuzz's `hb-view`. Output format is
 * inferred from the output extension (png, svg, pdf).
 */

export const render_font: Form = {
  form: 'form',
  save: '~/code/form/action/render/font',
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
          link: { path: { like: 'string', name: { mark: 'o' } } },
        },
      },
    },
    text: {
      like: 'string',
      need: true,
      name: { mark: 't' },
      note: 'Text sample to render',
    },
    fontSize: {
      like: 'natural_number',
      need: false,
      note: 'Font size in points (default: 128)',
    },
    features: {
      like: 'string',
      need: false,
      note: 'OpenType features, e.g. "+liga,-kern"',
    },
  },
}
