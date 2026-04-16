import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * Action input for `task update font` -- compile a `.fea` file and
 * inject it into the font's GSUB / GPOS tables. Uses fontTools'
 * `feaLib.builder.addOpenTypeFeatures`.
 *
 * `--fea` is required. When `-o` is omitted the updated font is
 * written to a sibling `<stem>.updated.<ext>` so the input is
 * never clobbered by accident.
 */

const forms = buildSingleFileForms({
  name: 'update_font',
  save: '~/code/form/action/update/font',
  outputRequired: false,
  common: {
    fea: {
      like: 'string',
      need: true,
      name: { mark: 'F' },
      note: 'Path to a .fea feature file to apply',
    },
  },
})

export const update_font_node_input = forms.node_input
export const update_font_node_remote_input = forms.node_remote_input
export const update_font_node_external_input =
  forms.node_external_input
export const update_font_node_client_input = forms.node_client_input
export const update_font_node_local_external_input =
  forms.node_local_external_input
export const update_font_node_local_internal_input =
  forms.node_local_internal_input
export const update_font_node_local_input = forms.node_local_input
export const update_font_node_output = forms.node_output
export const update_font_command_input = forms.command_input
export const update_font_browser_input = forms.browser_input
export const update_font_browser_remote_input =
  forms.browser_remote_input
export const update_font_browser_local_input = forms.browser_local_input
export const update_font_browser_output = forms.browser_output
