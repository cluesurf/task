import { buildSingleFileForms } from '~/code/tool/shared/base'

const convert_image_with_img2webp_forms = buildSingleFileForms({
  name: 'convert_image_with_img2webp',
  save: '~/code/form/action/convert/image/img2webp',
  common: {
    quality: {
      like: 'natural_number',
      need: false,
      note: 'Quality 0-100. Ignored when lossless.',
    },
    lossless: {
      like: 'boolean',
      need: false,
      note: 'Use lossless codec',
    },
    delay: {
      like: 'natural_number',
      need: false,
      note: 'Frame delay in milliseconds',
    },
    loop: {
      like: 'natural_number',
      need: false,
      note: 'Loop count (0 = infinite)',
    },
  },
})

export const convert_image_with_img2webp_node_input =
  convert_image_with_img2webp_forms.node_input
export const convert_image_with_img2webp_node_remote_input =
  convert_image_with_img2webp_forms.node_remote_input
export const convert_image_with_img2webp_node_external_input =
  convert_image_with_img2webp_forms.node_external_input
export const convert_image_with_img2webp_node_client_input =
  convert_image_with_img2webp_forms.node_client_input
export const convert_image_with_img2webp_node_local_external_input =
  convert_image_with_img2webp_forms.node_local_external_input
export const convert_image_with_img2webp_node_local_internal_input =
  convert_image_with_img2webp_forms.node_local_internal_input
export const convert_image_with_img2webp_node_local_input =
  convert_image_with_img2webp_forms.node_local_input
export const convert_image_with_img2webp_node_output =
  convert_image_with_img2webp_forms.node_output
export const convert_image_with_img2webp_command_input =
  convert_image_with_img2webp_forms.command_input
export const convert_image_with_img2webp_browser_input =
  convert_image_with_img2webp_forms.browser_input
export const convert_image_with_img2webp_browser_remote_input =
  convert_image_with_img2webp_forms.browser_remote_input
export const convert_image_with_img2webp_browser_local_input =
  convert_image_with_img2webp_forms.browser_local_input
export const convert_image_with_img2webp_browser_output =
  convert_image_with_img2webp_forms.browser_output
