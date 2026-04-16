import { buildSingleFileForms } from '~/code/tool/shared/base'

const convert_image_with_rawtherapee_forms = buildSingleFileForms({
  name: 'convert_image_with_rawtherapee',
  save: '~/code/form/action/convert/image/rawtherapee',
  common: {
    profile: {
      like: 'string',
      need: false,
      note: 'Path to a .pp3 profile',
    },
    jpegQuality: {
      like: 'natural_number',
      need: false,
      note: 'JPEG quality 1-100',
    },
    tiffCompression: {
      like: 'string',
      need: false,
      note: 'TIFF compression: none, lzw, or zip',
    },
  },
})

export const convert_image_with_rawtherapee_node_input =
  convert_image_with_rawtherapee_forms.node_input
export const convert_image_with_rawtherapee_node_remote_input =
  convert_image_with_rawtherapee_forms.node_remote_input
export const convert_image_with_rawtherapee_node_external_input =
  convert_image_with_rawtherapee_forms.node_external_input
export const convert_image_with_rawtherapee_node_client_input =
  convert_image_with_rawtherapee_forms.node_client_input
export const convert_image_with_rawtherapee_node_local_external_input =
  convert_image_with_rawtherapee_forms.node_local_external_input
export const convert_image_with_rawtherapee_node_local_internal_input =
  convert_image_with_rawtherapee_forms.node_local_internal_input
export const convert_image_with_rawtherapee_node_local_input =
  convert_image_with_rawtherapee_forms.node_local_input
export const convert_image_with_rawtherapee_node_output =
  convert_image_with_rawtherapee_forms.node_output
export const convert_image_with_rawtherapee_command_input =
  convert_image_with_rawtherapee_forms.command_input
export const convert_image_with_rawtherapee_browser_input =
  convert_image_with_rawtherapee_forms.browser_input
export const convert_image_with_rawtherapee_browser_remote_input =
  convert_image_with_rawtherapee_forms.browser_remote_input
export const convert_image_with_rawtherapee_browser_local_input =
  convert_image_with_rawtherapee_forms.browser_local_input
export const convert_image_with_rawtherapee_browser_output =
  convert_image_with_rawtherapee_forms.browser_output
