import { Form } from '@cluesurf/form'

/**
 * Action input for `task update font` — compile a `.fea` file and
 * inject it into the font's GSUB / GPOS tables. Uses fontTools'
 * `feaLib.builder.addOpenTypeFeatures`.
 *
 * `--fea` is required. When `-o` is omitted the updated font is
 * written to a sibling `<stem>.updated.<ext>` so the input is
 * never clobbered by accident.
 */

export const update_font: Form = {
  form: 'form',
  save: '~/code/form/action/update/font',
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
    fea: {
      like: 'string',
      need: true,
      name: { mark: 'F' },
      note: 'Path to a .fea feature file to apply',
    },
  },
}
