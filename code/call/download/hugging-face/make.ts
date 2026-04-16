import { Form } from '@cluesurf/form'

/**
 * Action forms for `task download hugging-face`. Schemas here
 * generate `code/form/action/download/hugging-face/*` via
 * `pnpm make:type`.
 */

const SAVE = '~/code/form/action/download/hugging-face'

export const download_hugging_face_command_input: Form = {
  form: 'form',
  save: `${SAVE}/cli`,
  link: {
    repo: { like: 'string' },
    repoType: { like: 'hugging_face_repo_type', need: false },
    directory: {
      link: { path: { like: 'string' } },
    },
    include: { like: 'string', list: true, need: false },
    exclude: { like: 'string', list: true, need: false },
    revision: { like: 'string', need: false },
    help: { like: 'boolean', need: false },
  },
}

export const download_hugging_face_node_input: Form = {
  form: 'form',
  save: `${SAVE}/node`,
  link: {
    repo: { like: 'string' },
    repoType: { like: 'hugging_face_repo_type', need: false },
    directory: {
      link: { path: { like: 'string' } },
    },
    include: { like: 'string', list: true, need: false },
    exclude: { like: 'string', list: true, need: false },
    revision: { like: 'string', need: false },
  },
}

export const download_hugging_face_node_output: Form = {
  form: 'form',
  save: `${SAVE}/node`,
  link: {
    directory: { like: 'string' },
  },
}
