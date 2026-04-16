import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * Action input for `task shape font` -- shape a string through a
 * font with HarfBuzz and print the resulting glyph sequence with
 * positions. The standard tool for debugging OpenType features,
 * ligatures, and script shaping.
 */

const forms = buildSingleFileForms({
  name: 'shape_font',
  save: '~/code/form/action/shape/font',
  outputRequired: false,
  common: {
    text: {
      like: 'string',
      need: true,
      name: { mark: 't' },
      note: 'Text to shape through the font',
    },
    features: {
      like: 'string',
      need: false,
      note: 'OpenType features, e.g. "+liga,-kern"',
    },
    script: {
      like: 'string',
      need: false,
      note: 'ISO 15924 script tag, e.g. "latn"',
    },
    language: {
      like: 'string',
      need: false,
      note: 'BCP 47 language tag, e.g. "en"',
    },
    direction: {
      like: 'string',
      need: false,
      note: 'ltr, rtl, ttb, or btt',
    },
  },
})

export const shape_font_node_input = forms.node_input
export const shape_font_node_remote_input = forms.node_remote_input
export const shape_font_node_external_input =
  forms.node_external_input
export const shape_font_node_client_input = forms.node_client_input
export const shape_font_node_local_external_input =
  forms.node_local_external_input
export const shape_font_node_local_internal_input =
  forms.node_local_internal_input
export const shape_font_node_local_input = forms.node_local_input
export const shape_font_node_output = forms.node_output
export const shape_font_command_input = forms.command_input
export const shape_font_browser_input = forms.browser_input
export const shape_font_browser_remote_input =
  forms.browser_remote_input
export const shape_font_browser_local_input =
  forms.browser_local_input
export const shape_font_browser_output = forms.browser_output
