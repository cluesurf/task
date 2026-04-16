import { buildSingleFileForms } from '~/code/tool/shared/make'

const convert_image_with_dcraw_forms = buildSingleFileForms({
  name: 'convert_image_with_dcraw',
  save: '~/code/form/action/convert/image/dcraw',
  common: {
    outputFormat: {
      like: 'string',
      need: false,
      note: 'Output format: tiff or ppm',
    },
    cameraWhiteBalance: {
      like: 'boolean',
      need: false,
      note: 'Use camera white balance. Default true.',
    },
    srgb: {
      like: 'boolean',
      need: false,
      note: 'Apply sRGB output gamma. Default true.',
    },
  },
})

export const convert_image_with_dcraw_node_input =
  convert_image_with_dcraw_forms.node_input
export const convert_image_with_dcraw_node_remote_input =
  convert_image_with_dcraw_forms.node_remote_input
export const convert_image_with_dcraw_node_external_input =
  convert_image_with_dcraw_forms.node_external_input
export const convert_image_with_dcraw_node_client_input =
  convert_image_with_dcraw_forms.node_client_input
export const convert_image_with_dcraw_node_local_external_input =
  convert_image_with_dcraw_forms.node_local_external_input
export const convert_image_with_dcraw_node_local_internal_input =
  convert_image_with_dcraw_forms.node_local_internal_input
export const convert_image_with_dcraw_node_local_input =
  convert_image_with_dcraw_forms.node_local_input
export const convert_image_with_dcraw_node_output =
  convert_image_with_dcraw_forms.node_output
export const convert_image_with_dcraw_command_input =
  convert_image_with_dcraw_forms.command_input
export const convert_image_with_dcraw_browser_input =
  convert_image_with_dcraw_forms.browser_input
export const convert_image_with_dcraw_browser_remote_input =
  convert_image_with_dcraw_forms.browser_remote_input
export const convert_image_with_dcraw_browser_local_input =
  convert_image_with_dcraw_forms.browser_local_input
export const convert_image_with_dcraw_browser_output =
  convert_image_with_dcraw_forms.browser_output
