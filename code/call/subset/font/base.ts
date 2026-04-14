import { Form } from '@cluesurf/form'

/**
 * Action input for `task subset font` — reduces a font to only
 * the glyphs needed for the given text or codepoint ranges. The
 * single biggest win for web-font delivery size.
 *
 * Backed by `pyftsubset` (fontTools).
 */

export const subset_font: Form = {
  form: 'form',
  save: '~/code/form/action/subset/font',
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
      need: false,
      name: { mark: 't' },
      note: 'Glyphs to keep, e.g. "Hello world"',
    },
    unicodes: {
      like: 'string',
      need: false,
      name: { mark: 'u' },
      note: 'Codepoints/ranges, e.g. "U+0020-007F,U+00A9"',
    },
    layoutFeatures: {
      like: 'string',
      need: false,
      note: 'Comma list of OpenType features to keep (default: common)',
    },
    flavor: {
      like: 'string',
      need: false,
      note: 'Output wrapper: `woff`, `woff2`, or unset for raw sfnt',
    },
  },
}
