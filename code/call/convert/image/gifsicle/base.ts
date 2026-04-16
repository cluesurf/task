import { buildSingleFileForms } from '~/code/tool/shared/base'

const convert_image_with_gifsicle_forms = buildSingleFileForms({
  name: 'convert_image_with_gifsicle',
  save: '~/code/form/action/convert/image/gifsicle',
  common: {
    optimize: {
      like: 'natural_number',
      need: false,
      note: 'Optimization level 1-3',
    },
    lossy: {
      like: 'natural_number',
      need: false,
      note: 'Lossy quantization level (0 = lossless, 200 = most lossy)',
    },
    resize: {
      like: 'string',
      need: false,
      note: 'Resize output, e.g. 400x300 or _x300',
    },
    colors: {
      like: 'natural_number',
      need: false,
      note: 'Reduce palette to N colors (max 256)',
    },
  },
})

export const convert_image_with_gifsicle_node_input =
  convert_image_with_gifsicle_forms.node_input
export const convert_image_with_gifsicle_node_remote_input =
  convert_image_with_gifsicle_forms.node_remote_input
export const convert_image_with_gifsicle_node_external_input =
  convert_image_with_gifsicle_forms.node_external_input
export const convert_image_with_gifsicle_node_client_input =
  convert_image_with_gifsicle_forms.node_client_input
export const convert_image_with_gifsicle_node_local_external_input =
  convert_image_with_gifsicle_forms.node_local_external_input
export const convert_image_with_gifsicle_node_local_internal_input =
  convert_image_with_gifsicle_forms.node_local_internal_input
export const convert_image_with_gifsicle_node_local_input =
  convert_image_with_gifsicle_forms.node_local_input
export const convert_image_with_gifsicle_node_output =
  convert_image_with_gifsicle_forms.node_output
export const convert_image_with_gifsicle_command_input =
  convert_image_with_gifsicle_forms.command_input
export const convert_image_with_gifsicle_browser_input =
  convert_image_with_gifsicle_forms.browser_input
export const convert_image_with_gifsicle_browser_remote_input =
  convert_image_with_gifsicle_forms.browser_remote_input
export const convert_image_with_gifsicle_browser_local_input =
  convert_image_with_gifsicle_forms.browser_local_input
export const convert_image_with_gifsicle_browser_output =
  convert_image_with_gifsicle_forms.browser_output
