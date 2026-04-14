import { buildConvertFormsWithOutputDirectory } from '~/code/tool/shared/base'

/**
 * Parquet ↔ JSONL (and other structured-data) folder-tree
 * converter. Walks an input directory, converts every file of
 * `input.format` to `output.format` via DuckDB, writing to a
 * mirror output directory.
 *
 * This file declares the form schemas. Running `pnpm make:type`
 * generates the corresponding TypeScript types and zod parsers
 * under `code/form/action/convert/parquet/`.
 */

const convert_parquet_forms = buildConvertFormsWithOutputDirectory(
  'convert_parquet',
  '~/code/form/action/convert/parquet',
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

export const convert_parquet_node_local_internal_input =
  convert_parquet_forms.node_local_internal_input

export const convert_parquet_node_local_input =
  convert_parquet_forms.node_local_input

export const convert_parquet_node_output =
  convert_parquet_forms.node_output

export const convert_parquet_browser_input =
  convert_parquet_forms.browser_input

export const convert_parquet_browser_remote_input =
  convert_parquet_forms.browser_remote_input

export const convert_parquet_browser_local_input =
  convert_parquet_forms.browser_local_input

export const convert_parquet_browser_output =
  convert_parquet_forms.browser_output
