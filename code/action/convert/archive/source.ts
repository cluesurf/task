import { Form } from '@termsurf/form'
import { buildConvertForms } from '~/code/tool/shared/source.js'

const convert_archive_forms = buildConvertForms(
  'convert_archive',
  'archive_format',
  'archive_format',
)

export const convert_archive_command_input =
  convert_archive_forms.command_input

export const convert_archive_node_input =
  convert_archive_forms.node_input

export const convert_archive_node_remote_input =
  convert_archive_forms.node_remote_input

export const convert_archive_node_external_input =
  convert_archive_forms.node_external_input

export const convert_archive_node_client_input =
  convert_archive_forms.node_client_input

export const convert_archive_node_local_external_input =
  convert_archive_forms.node_local_external_input

export const convert_archive_node_local_internal_input =
  convert_archive_forms.node_local_internal_input

export const convert_archive_node_local_input =
  convert_archive_forms.node_local_input

export const convert_archive_node_output =
  convert_archive_forms.node_output

export const convert_archive_browser_input =
  convert_archive_forms.browser_input

export const convert_archive_browser_remote_input =
  convert_archive_forms.browser_remote_input

export const convert_archive_browser_local_input =
  convert_archive_forms.browser_local_input

export const convert_archive_browser_output =
  convert_archive_forms.browser_output
