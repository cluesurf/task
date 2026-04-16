import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * Action input for `task compress font`. Turns a TTF/OTF into a
 * WOFF2 wrapper via `woff2_compress`. The best single-step web
 * optimization short of also subsetting.
 */

const forms = buildSingleFileForms({
  name: 'compress_font',
  save: '~/code/form/action/compress/font',
  outputRequired: false,
})

export const compress_font_node_input = forms.node_input
export const compress_font_node_remote_input = forms.node_remote_input
export const compress_font_node_external_input =
  forms.node_external_input
export const compress_font_node_client_input = forms.node_client_input
export const compress_font_node_local_external_input =
  forms.node_local_external_input
export const compress_font_node_local_internal_input =
  forms.node_local_internal_input
export const compress_font_node_local_input = forms.node_local_input
export const compress_font_node_output = forms.node_output
export const compress_font_command_input = forms.command_input
export const compress_font_browser_input = forms.browser_input
export const compress_font_browser_remote_input =
  forms.browser_remote_input
export const compress_font_browser_local_input = forms.browser_local_input
export const compress_font_browser_output = forms.browser_output
