import { Form } from '@cluesurf/form'

/**
 * Action input for `task extract font` — pulls feature sources
 * out of a font for editing. Two shapes:
 *
 *   --format ttx    — full fontTools XML (round-trippable)
 *   --format fea    — just the GSUB/GPOS tables as XML, handy
 *                     as a diff target when tweaking features.
 *                     True `.fea` decompilation isn't in stock
 *                     fontTools, so this is the closest stable
 *                     export that still captures the rules.
 */

export const extract_font: Form = {
  form: 'form',
  save: '~/code/form/action/extract/font',
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
    // Named `as` (not `format`) to avoid colliding with the
    // global `--format` output-style flag. Short alias is still
    // `-O` per the output-format convention.
    as: {
      like: 'string',
      need: false,
      name: { mark: 'O' },
      note: '`ttx` (full) or `fea` (GSUB/GPOS only). Default: ttx.',
    },
  },
}
