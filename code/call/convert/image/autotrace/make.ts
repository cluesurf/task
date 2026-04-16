import { buildSingleFileForms } from '~/code/tool/shared/make'

const convert_image_with_autotrace_forms = buildSingleFileForms({
  name: 'convert_image_with_autotrace',
  save: '~/code/form/action/convert/image/autotrace',
  common: {
    outputFormat: {
      like: 'string',
      need: false,
      note: 'Output format: svg, eps, dxf, or pdf',
    },
    colors: {
      like: 'natural_number',
      need: false,
      note: 'Number of colors to reduce to before tracing',
    },
    despeckleLevel: {
      like: 'natural_number',
      need: false,
      note: 'Despeckle level',
    },
  },
})

export const convert_image_with_autotrace_node_input =
  convert_image_with_autotrace_forms.node_input
export const convert_image_with_autotrace_node_remote_input =
  convert_image_with_autotrace_forms.node_remote_input
export const convert_image_with_autotrace_node_external_input =
  convert_image_with_autotrace_forms.node_external_input
export const convert_image_with_autotrace_node_client_input =
  convert_image_with_autotrace_forms.node_client_input
export const convert_image_with_autotrace_node_local_external_input =
  convert_image_with_autotrace_forms.node_local_external_input
export const convert_image_with_autotrace_node_local_internal_input =
  convert_image_with_autotrace_forms.node_local_internal_input
export const convert_image_with_autotrace_node_local_input =
  convert_image_with_autotrace_forms.node_local_input
export const convert_image_with_autotrace_node_output =
  convert_image_with_autotrace_forms.node_output
export const convert_image_with_autotrace_command_input =
  convert_image_with_autotrace_forms.command_input
export const convert_image_with_autotrace_browser_input =
  convert_image_with_autotrace_forms.browser_input
export const convert_image_with_autotrace_browser_remote_input =
  convert_image_with_autotrace_forms.browser_remote_input
export const convert_image_with_autotrace_browser_local_input =
  convert_image_with_autotrace_forms.browser_local_input
export const convert_image_with_autotrace_browser_output =
  convert_image_with_autotrace_forms.browser_output
