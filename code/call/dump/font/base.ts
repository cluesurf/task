import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * Action input for `task dump font` -- round-trips a font through
 * TTX (fontTools' XML representation). Direction is inferred from
 * the file extensions: `.ttf/.otf -> .ttx` dumps; `.ttx -> .ttf/.otf`
 * compiles. Anything else throws.
 */

const forms = buildSingleFileForms({
  name: 'dump_font',
  save: '~/code/form/action/dump/font',
  outputRequired: false,
  common: {
    tables: {
      like: 'string',
      need: false,
      name: { mark: 't' },
      note: 'Comma list of tables to dump, e.g. "name,head,OS/2"',
    },
  },
})

export const dump_font_node_input = forms.node_input
export const dump_font_node_remote_input = forms.node_remote_input
export const dump_font_node_external_input = forms.node_external_input
export const dump_font_node_client_input = forms.node_client_input
export const dump_font_node_local_external_input =
  forms.node_local_external_input
export const dump_font_node_local_internal_input =
  forms.node_local_internal_input
export const dump_font_node_local_input = forms.node_local_input
export const dump_font_node_output = forms.node_output
export const dump_font_command_input = forms.command_input
export const dump_font_browser_input = forms.browser_input
export const dump_font_browser_remote_input =
  forms.browser_remote_input
export const dump_font_browser_local_input = forms.browser_local_input
export const dump_font_browser_output = forms.browser_output
