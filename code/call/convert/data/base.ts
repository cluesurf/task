import { buildConvertFormsWithOutputDirectory } from '~/code/tool/shared/base'

/**
 * Action forms for `task convert data` (folder-tree
 * conversion between parquet, jsonl, json, csv). Uses the
 * output-directory variant since the output is a folder, not
 * a single file. Schemas here generate
 * `code/form/action/convert/data/*` via `pnpm make:type`.
 */

const convert_data_forms = buildConvertFormsWithOutputDirectory(
  'convert_data',
  '~/code/form/action/convert/data',
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

export const convert_data_node_local_internal_input =
  convert_data_forms.node_local_internal_input

export const convert_data_node_local_input =
  convert_data_forms.node_local_input

export const convert_data_node_output =
  convert_data_forms.node_output

export const convert_data_browser_input =
  convert_data_forms.browser_input

export const convert_data_browser_remote_input =
  convert_data_forms.browser_remote_input

export const convert_data_browser_local_input =
  convert_data_forms.browser_local_input

export const convert_data_browser_output =
  convert_data_forms.browser_output
