import { Form } from '@cluesurf/form'

/**
 * Action input for `task inspect file <path>` — reads a file and
 * prints a key/value table of metadata grouped by topic. Routes
 * by extension to a per-type extractor (pdf, image, audio, video,
 * font, ...).
 *
 * Pretty mode prints a vertically-aligned table; `-f text` strips
 * ANSI; `-f json` emits the structured `{ groups: [...] }`.
 */

export const inspect_file: Form = {
  form: 'form',
  save: '~/code/form/action/inspect/file',
  link: {
    input: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
  },
}
