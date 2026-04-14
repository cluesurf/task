import { List } from '@cluesurf/form'

/**
 * Structured data interchange formats. Generates
 * `code/form/object/data/` via `pnpm make:type`.
 */

export const data_format: List = {
  form: 'list',
  save: '~/code/form/object/data',
  list: ['parquet', 'jsonl', 'json', 'csv'],
}
