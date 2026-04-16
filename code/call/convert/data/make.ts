import { Form } from '@cluesurf/form'
import { buildConvertFormsWithOutputDirectory } from '~/code/tool/shared/make'

/**
 * Action forms for `task convert data` (folder-tree conversion
 * between parquet, jsonl, json, csv). The handler walks a
 * *directory* on both ends and returns per-file stats, so the
 * default `buildConvertFormsWithOutputDirectory` shape (file-in,
 * file-out) is overridden for `node_local_internal_input` and
 * `node_output` below.
 *
 * Running `pnpm make:type` generates types and parsers under
 * `code/form/action/convert/data/*`.
 */

const SAVE = '~/code/form/action/convert/data'

const convert_data_forms = buildConvertFormsWithOutputDirectory(
  'convert_data',
  SAVE,
  'data_format',
  'data_format',
)

export const convert_data_command_input =
  convert_data_forms.command_input

export const convert_data_node_input =
  convert_data_forms.node_input

export const convert_data_node_remote_input =
  convert_data_forms.node_remote_input

export const convert_data_node_external_input =
  convert_data_forms.node_external_input

export const convert_data_node_client_input =
  convert_data_forms.node_client_input

export const convert_data_node_local_external_input =
  convert_data_forms.node_local_external_input

// Override: real handler walks a directory on both input AND
// output. Also carries a `merge` flag for parquet → jsonl.
export const convert_data_node_local_internal_input: Form = {
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

export const convert_data_node_local_input =
  convert_data_forms.node_local_input

// Override: real handler returns per-file stats, not a single
// output file.
export const convert_data_node_output: Form = {
  form: 'form',
  save: `${SAVE}/node`,
  link: {
    converted: { like: 'natural_number' },
    skipped: { like: 'natural_number' },
    failed: { like: 'natural_number' },
  },
}

export const convert_data_browser_input =
  convert_data_forms.browser_input

export const convert_data_browser_remote_input =
  convert_data_forms.browser_remote_input

export const convert_data_browser_local_input =
  convert_data_forms.browser_local_input

export const convert_data_browser_output =
  convert_data_forms.browser_output
