import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * Action input for `task render font` -- rasterize a text sample
 * through a font via HarfBuzz's `hb-view`. Output format is
 * inferred from the output extension (png, svg, pdf).
 */

const forms = buildSingleFileForms({
  name: 'render_font',
  save: '~/code/form/action/render/font',
  common: {
    text: {
      like: 'string',
      need: true,
      name: { mark: 't' },
      note: 'Text sample to render',
    },
    fontSize: {
      like: 'natural_number',
      need: false,
      note: 'Font size in points (default: 128)',
    },
    features: {
      like: 'string',
      need: false,
      note: 'OpenType features, e.g. "+liga,-kern"',
    },
  },
})

export const render_font_node_input = forms.node_input
export const render_font_node_remote_input = forms.node_remote_input
export const render_font_node_external_input =
  forms.node_external_input
export const render_font_node_client_input = forms.node_client_input
export const render_font_node_local_external_input =
  forms.node_local_external_input
export const render_font_node_local_internal_input =
  forms.node_local_internal_input
export const render_font_node_local_input = forms.node_local_input
export const render_font_node_output = forms.node_output
export const render_font_command_input = forms.command_input
export const render_font_browser_input = forms.browser_input
export const render_font_browser_remote_input =
  forms.browser_remote_input
export const render_font_browser_local_input =
  forms.browser_local_input
export const render_font_browser_output = forms.browser_output
