import { buildConvertForms } from '../../../tool/shared/source.js'

// convert_image_with_image_magick_forms

const convert_image_with_image_magick_forms = buildConvertForms(
  'convert_image_with_image_magick',
  'image_magick_input_format',
  'image_magick_output_format',
  {
    colorCount: { like: 'natural_number', need: false },
    colorMatrix: {
      like: 'image_magic_color_matrix',
      test: 'test_image_magic_color_matrix',
      need: false,
    },
    colorSpace: { like: 'image_magick_color_space', need: false },
    compare: { like: 'boolean', need: false },
    compression: { like: 'image_magick_compression', need: false },
    density: { like: 'natural_number', need: false },
    quality: { like: 'natural_number', need: false },
  },
)

export const convert_image_with_image_magick_command_input =
  convert_image_with_image_magick_forms.command_input

export const convert_image_with_image_magick_node_input =
  convert_image_with_image_magick_forms.node_input

export const convert_image_with_image_magick_node_remote_input =
  convert_image_with_image_magick_forms.node_remote_input

export const convert_image_with_image_magick_node_external_input =
  convert_image_with_image_magick_forms.node_external_input

export const convert_image_with_image_magick_node_client_input =
  convert_image_with_image_magick_forms.node_client_input

export const convert_image_with_image_magick_node_local_external_input =
  convert_image_with_image_magick_forms.node_local_external_input

export const convert_image_with_image_magick_node_local_internal_input =
  convert_image_with_image_magick_forms.node_local_internal_input

export const convert_image_with_image_magick_node_local_input =
  convert_image_with_image_magick_forms.node_local_input

export const convert_image_with_image_magick_node_output =
  convert_image_with_image_magick_forms.node_output

export const convert_image_with_image_magick_browser_input =
  convert_image_with_image_magick_forms.browser_input

export const convert_image_with_image_magick_browser_remote_input =
  convert_image_with_image_magick_forms.browser_remote_input

export const convert_image_with_image_magick_browser_local_input =
  convert_image_with_image_magick_forms.browser_local_input

export const convert_image_with_image_magick_browser_output =
  convert_image_with_image_magick_forms.browser_output

// convert_image_with_inkscape_forms

const convert_image_with_inkscape_forms = buildConvertForms(
  'convert_image_with_inkscape',
  'string',
  'string',
)

export const convert_image_with_inkscape_command_input =
  convert_image_with_inkscape_forms.command_input

export const convert_image_with_inkscape_node_input =
  convert_image_with_inkscape_forms.node_input

export const convert_image_with_inkscape_node_remote_input =
  convert_image_with_inkscape_forms.node_remote_input

export const convert_image_with_inkscape_node_external_input =
  convert_image_with_inkscape_forms.node_external_input

export const convert_image_with_inkscape_node_client_input =
  convert_image_with_inkscape_forms.node_client_input

export const convert_image_with_inkscape_node_local_external_input =
  convert_image_with_inkscape_forms.node_local_external_input

export const convert_image_with_inkscape_node_local_internal_input =
  convert_image_with_inkscape_forms.node_local_internal_input

export const convert_image_with_inkscape_node_local_input =
  convert_image_with_inkscape_forms.node_local_input

export const convert_image_with_inkscape_node_output =
  convert_image_with_inkscape_forms.node_output

export const convert_image_with_inkscape_browser_input =
  convert_image_with_inkscape_forms.browser_input

export const convert_image_with_inkscape_browser_remote_input =
  convert_image_with_inkscape_forms.browser_remote_input

export const convert_image_with_inkscape_browser_local_input =
  convert_image_with_inkscape_forms.browser_local_input

export const convert_image_with_inkscape_browser_output =
  convert_image_with_inkscape_forms.browser_output
