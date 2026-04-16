import { buildSingleFileForms } from '~/code/tool/shared/base'

const convert_image_with_darktable_forms = buildSingleFileForms({
  name: 'convert_image_with_darktable',
  save: '~/code/form/action/convert/image/darktable',
  common: {
    xmp: {
      like: 'string',
      need: false,
      note: 'Optional XMP sidecar with develop parameters',
    },
    highQuality: {
      like: 'boolean',
      need: false,
      note: 'High-quality resampling (slower)',
    },
    upscale: {
      like: 'boolean',
      need: false,
      note: 'Upscale output beyond the input pixel dimensions',
    },
  },
})

export const convert_image_with_darktable_node_input =
  convert_image_with_darktable_forms.node_input
export const convert_image_with_darktable_node_remote_input =
  convert_image_with_darktable_forms.node_remote_input
export const convert_image_with_darktable_node_external_input =
  convert_image_with_darktable_forms.node_external_input
export const convert_image_with_darktable_node_client_input =
  convert_image_with_darktable_forms.node_client_input
export const convert_image_with_darktable_node_local_external_input =
  convert_image_with_darktable_forms.node_local_external_input
export const convert_image_with_darktable_node_local_internal_input =
  convert_image_with_darktable_forms.node_local_internal_input
export const convert_image_with_darktable_node_local_input =
  convert_image_with_darktable_forms.node_local_input
export const convert_image_with_darktable_node_output =
  convert_image_with_darktable_forms.node_output
export const convert_image_with_darktable_command_input =
  convert_image_with_darktable_forms.command_input
export const convert_image_with_darktable_browser_input =
  convert_image_with_darktable_forms.browser_input
export const convert_image_with_darktable_browser_remote_input =
  convert_image_with_darktable_forms.browser_remote_input
export const convert_image_with_darktable_browser_local_input =
  convert_image_with_darktable_forms.browser_local_input
export const convert_image_with_darktable_browser_output =
  convert_image_with_darktable_forms.browser_output
