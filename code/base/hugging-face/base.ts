import { List } from '@cluesurf/form'

/**
 * HuggingFace Hub repo-type enum. Generates
 * `code/form/object/hugging-face/` via `pnpm make:type`.
 */

export const hugging_face_repo_type: List = {
  form: 'list',
  save: '~/code/form/object/hugging-face',
  list: ['dataset', 'model', 'space'],
}
