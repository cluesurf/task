import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * `task update image` -- quick color / tonal tweaks via
 * ImageMagick: grayscale, brightness / contrast / saturation.
 * Every flag is optional; at least one must be passed.
 */

const forms = buildSingleFileForms({
  name: 'update_image',
  save: '~/code/form/action/update/image',
  outputRequired: false,
  common: {
    grayscale: {
      like: 'boolean',
      need: false,
      note: 'Convert to grayscale',
    },
    brightness: {
      like: 'string',
      need: false,
      note: 'Brightness adjust (e.g. +10, -20)',
    },
    contrast: {
      like: 'string',
      need: false,
      note: 'Contrast adjust (e.g. +10, -20)',
    },
    saturation: {
      like: 'string',
      need: false,
      note: 'Saturation adjust (e.g. +20)',
    },
  },
})

export const update_image_node_input = forms.node_input
export const update_image_node_remote_input = forms.node_remote_input
export const update_image_node_external_input =
  forms.node_external_input
export const update_image_node_client_input = forms.node_client_input
export const update_image_node_local_external_input =
  forms.node_local_external_input
export const update_image_node_local_internal_input =
  forms.node_local_internal_input
export const update_image_node_local_input = forms.node_local_input
export const update_image_node_output = forms.node_output
export const update_image_command_input = forms.command_input
export const update_image_browser_input = forms.browser_input
export const update_image_browser_remote_input =
  forms.browser_remote_input
export const update_image_browser_local_input =
  forms.browser_local_input
export const update_image_browser_output = forms.browser_output
