import { buildSingleFileForms } from '~/code/tool/shared/make'

const convert_image_with_rsvg_forms = buildSingleFileForms({
  name: 'convert_image_with_rsvg',
  save: '~/code/form/action/convert/image/rsvg',
  common: {
    outputFormat: {
      like: 'string',
      need: false,
      note: 'Output format: png, pdf, ps, eps, or svg',
    },
    width: {
      like: 'natural_number',
      need: false,
      note: 'Output width in pixels',
    },
    height: {
      like: 'natural_number',
      need: false,
      note: 'Output height in pixels',
    },
    dpi: {
      like: 'natural_number',
      need: false,
      note: 'DPI for raster output. Default 96.',
    },
    background: {
      like: 'string',
      need: false,
      note: 'Background color (#fff, none, etc.)',
    },
  },
})

export const convert_image_with_rsvg_node_input =
  convert_image_with_rsvg_forms.node_input
export const convert_image_with_rsvg_node_remote_input =
  convert_image_with_rsvg_forms.node_remote_input
export const convert_image_with_rsvg_node_external_input =
  convert_image_with_rsvg_forms.node_external_input
export const convert_image_with_rsvg_node_client_input =
  convert_image_with_rsvg_forms.node_client_input
export const convert_image_with_rsvg_node_local_external_input =
  convert_image_with_rsvg_forms.node_local_external_input
export const convert_image_with_rsvg_node_local_internal_input =
  convert_image_with_rsvg_forms.node_local_internal_input
export const convert_image_with_rsvg_node_local_input =
  convert_image_with_rsvg_forms.node_local_input
export const convert_image_with_rsvg_node_output =
  convert_image_with_rsvg_forms.node_output
export const convert_image_with_rsvg_command_input =
  convert_image_with_rsvg_forms.command_input
export const convert_image_with_rsvg_browser_input =
  convert_image_with_rsvg_forms.browser_input
export const convert_image_with_rsvg_browser_remote_input =
  convert_image_with_rsvg_forms.browser_remote_input
export const convert_image_with_rsvg_browser_local_input =
  convert_image_with_rsvg_forms.browser_local_input
export const convert_image_with_rsvg_browser_output =
  convert_image_with_rsvg_forms.browser_output
