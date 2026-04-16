import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * Action input for `task subset font` -- reduces a font to only
 * the glyphs needed for the given text or codepoint ranges. The
 * single biggest win for web-font delivery size.
 *
 * Backed by `pyftsubset` (fontTools).
 */

const forms = buildSingleFileForms({
  name: 'subset_font',
  save: '~/code/form/action/subset/font',
  common: {
    text: {
      like: 'string',
      need: false,
      name: { mark: 't' },
      note: 'Glyphs to keep, e.g. "Hello world"',
    },
    unicodes: {
      like: 'string',
      need: false,
      name: { mark: 'u' },
      note: 'Codepoints/ranges, e.g. "U+0020-007F,U+00A9"',
    },
    layoutFeatures: {
      like: 'string',
      need: false,
      note: 'Comma list of OpenType features to keep (default: common)',
    },
    flavor: {
      like: 'string',
      need: false,
      note: 'Output wrapper: `woff`, `woff2`, or unset for raw sfnt',
    },
  },
})

export const subset_font_node_input = forms.node_input
export const subset_font_node_remote_input = forms.node_remote_input
export const subset_font_node_external_input =
  forms.node_external_input
export const subset_font_node_client_input = forms.node_client_input
export const subset_font_node_local_external_input =
  forms.node_local_external_input
export const subset_font_node_local_internal_input =
  forms.node_local_internal_input
export const subset_font_node_local_input = forms.node_local_input
export const subset_font_node_output = forms.node_output
export const subset_font_command_input = forms.command_input
export const subset_font_browser_input = forms.browser_input
export const subset_font_browser_remote_input =
  forms.browser_remote_input
export const subset_font_browser_local_input =
  forms.browser_local_input
export const subset_font_browser_output = forms.browser_output
