import { buildSingleFileForms } from '~/code/tool/shared/make'

const convert_image_with_potrace_forms = buildSingleFileForms({
  name: 'convert_image_with_potrace',
  save: '~/code/form/action/convert/image/potrace',
  common: {
    outputFormat: {
      like: 'string',
      need: false,
      note: 'Output format: svg, eps, or ps',
    },
    threshold: {
      like: 'decimal',
      need: false,
      note: 'Black-level threshold for the input bitmap (0.0-1.0)',
    },
    turdsize: {
      like: 'natural_number',
      need: false,
      note: 'Speckle size filter',
    },
  },
})

export const convert_image_with_potrace_node_input =
  convert_image_with_potrace_forms.node_input
export const convert_image_with_potrace_node_remote_input =
  convert_image_with_potrace_forms.node_remote_input
export const convert_image_with_potrace_node_external_input =
  convert_image_with_potrace_forms.node_external_input
export const convert_image_with_potrace_node_client_input =
  convert_image_with_potrace_forms.node_client_input
export const convert_image_with_potrace_node_local_external_input =
  convert_image_with_potrace_forms.node_local_external_input
export const convert_image_with_potrace_node_local_internal_input =
  convert_image_with_potrace_forms.node_local_internal_input
export const convert_image_with_potrace_node_local_input =
  convert_image_with_potrace_forms.node_local_input
export const convert_image_with_potrace_node_output =
  convert_image_with_potrace_forms.node_output
export const convert_image_with_potrace_command_input =
  convert_image_with_potrace_forms.command_input
export const convert_image_with_potrace_browser_input =
  convert_image_with_potrace_forms.browser_input
export const convert_image_with_potrace_browser_remote_input =
  convert_image_with_potrace_forms.browser_remote_input
export const convert_image_with_potrace_browser_local_input =
  convert_image_with_potrace_forms.browser_local_input
export const convert_image_with_potrace_browser_output =
  convert_image_with_potrace_forms.browser_output
