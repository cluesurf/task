import { buildSingleFileForms } from '~/code/tool/shared/base'

const convert_image_with_radiance_forms = buildSingleFileForms({
  name: 'convert_image_with_radiance',
  save: '~/code/form/action/convert/image/radiance',
  common: {
    reverse: {
      like: 'boolean',
      need: false,
      note: 'Reverse direction (TIFF -> HDR). Auto-detected from extensions.',
    },
  },
})

export const convert_image_with_radiance_node_input =
  convert_image_with_radiance_forms.node_input
export const convert_image_with_radiance_node_remote_input =
  convert_image_with_radiance_forms.node_remote_input
export const convert_image_with_radiance_node_external_input =
  convert_image_with_radiance_forms.node_external_input
export const convert_image_with_radiance_node_client_input =
  convert_image_with_radiance_forms.node_client_input
export const convert_image_with_radiance_node_local_external_input =
  convert_image_with_radiance_forms.node_local_external_input
export const convert_image_with_radiance_node_local_internal_input =
  convert_image_with_radiance_forms.node_local_internal_input
export const convert_image_with_radiance_node_local_input =
  convert_image_with_radiance_forms.node_local_input
export const convert_image_with_radiance_node_output =
  convert_image_with_radiance_forms.node_output
export const convert_image_with_radiance_command_input =
  convert_image_with_radiance_forms.command_input
export const convert_image_with_radiance_browser_input =
  convert_image_with_radiance_forms.browser_input
export const convert_image_with_radiance_browser_remote_input =
  convert_image_with_radiance_forms.browser_remote_input
export const convert_image_with_radiance_browser_local_input =
  convert_image_with_radiance_forms.browser_local_input
export const convert_image_with_radiance_browser_output =
  convert_image_with_radiance_forms.browser_output
