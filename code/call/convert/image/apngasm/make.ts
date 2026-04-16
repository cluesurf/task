import { buildSingleFileForms } from '~/code/tool/shared/base'

const convert_image_with_apngasm_forms = buildSingleFileForms({
  name: 'convert_image_with_apngasm',
  save: '~/code/form/action/convert/image/apngasm',
  common: {
    delay: {
      like: 'natural_number',
      need: false,
      note: 'Frame delay in 1/100s. Default 10 (= 10 fps).',
    },
    skipDuplicates: {
      like: 'boolean',
      need: false,
      note: 'Skip frames that are pixel-identical',
    },
  },
})

export const convert_image_with_apngasm_node_input =
  convert_image_with_apngasm_forms.node_input
export const convert_image_with_apngasm_node_remote_input =
  convert_image_with_apngasm_forms.node_remote_input
export const convert_image_with_apngasm_node_external_input =
  convert_image_with_apngasm_forms.node_external_input
export const convert_image_with_apngasm_node_client_input =
  convert_image_with_apngasm_forms.node_client_input
export const convert_image_with_apngasm_node_local_external_input =
  convert_image_with_apngasm_forms.node_local_external_input
export const convert_image_with_apngasm_node_local_internal_input =
  convert_image_with_apngasm_forms.node_local_internal_input
export const convert_image_with_apngasm_node_local_input =
  convert_image_with_apngasm_forms.node_local_input
export const convert_image_with_apngasm_node_output =
  convert_image_with_apngasm_forms.node_output
export const convert_image_with_apngasm_command_input =
  convert_image_with_apngasm_forms.command_input
export const convert_image_with_apngasm_browser_input =
  convert_image_with_apngasm_forms.browser_input
export const convert_image_with_apngasm_browser_remote_input =
  convert_image_with_apngasm_forms.browser_remote_input
export const convert_image_with_apngasm_browser_local_input =
  convert_image_with_apngasm_forms.browser_local_input
export const convert_image_with_apngasm_browser_output =
  convert_image_with_apngasm_forms.browser_output
