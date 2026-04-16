import { Form } from '@cluesurf/form'
import { buildConvertFormsWithOutputDirectory } from '~/code/tool/shared/make'

/**
 * Parquet ↔ JSONL (and other structured-data) folder-tree
 * converter. Walks an input directory, converts every file of
 * `input.format` to `output.format` via DuckDB, writing to a
 * mirror output directory.
 *
 * The handler takes a *directory* on both ends and returns
 * per-file stats, so the default `buildConvertFormsWithOutputDirectory`
 * shape (file-in, file-out) is overridden for
 * `node_local_internal_input` and `node_output` below.
 *
 * Running `pnpm make:type` generates the corresponding
 * TypeScript types and zod parsers under
 * `code/form/action/convert/parquet/`.
 */

const SAVE = '~/code/form/action/convert/parquet'

const convert_parquet_forms = buildConvertFormsWithOutputDirectory(
  'convert_parquet',
  SAVE,
  'data_format',
  'data_format',
)

export const convert_parquet_command_input =
  convert_parquet_forms.command_input

export const convert_parquet_node_input =
  convert_parquet_forms.node_input

export const convert_parquet_node_remote_input =
  convert_parquet_forms.node_remote_input

export const convert_parquet_node_external_input =
  convert_parquet_forms.node_external_input

export const convert_parquet_node_client_input =
  convert_parquet_forms.node_client_input

export const convert_parquet_node_local_external_input =
  convert_parquet_forms.node_local_external_input

// Override: real handler walks a directory on both input AND
// output, not a single file → directory mirror.
export const convert_parquet_node_local_internal_input: Form = {
  form: 'form',
  save: `${SAVE}/node`,
  link: {
    handle: { take: ['internal'], need: false },
    input: {
      link: {
        format: { like: 'data_format', name: { mark: 'I' } },
        directory: { like: 'local_path' },
      },
    },
    output: {
      link: {
        format: { like: 'data_format', name: { mark: 'O' } },
        directory: { like: 'local_path' },
      },
    },
    merge: { like: 'boolean', need: false },
    pathScope: { like: 'string', need: false },
  },
}

export const convert_parquet_node_local_input =
  convert_parquet_forms.node_local_input

// Override: real handler returns per-file stats, not a single
// output file.
export const convert_parquet_node_output: Form = {
  form: 'form',
  save: `${SAVE}/node`,
  link: {
    converted: { like: 'natural_number' },
    skipped: { like: 'natural_number' },
    failed: { like: 'natural_number' },
  },
}

export const convert_parquet_browser_input =
  convert_parquet_forms.browser_input

export const convert_parquet_browser_remote_input =
  convert_parquet_forms.browser_remote_input

export const convert_parquet_browser_local_input =
  convert_parquet_forms.browser_local_input

export const convert_parquet_browser_output =
  convert_parquet_forms.browser_output
