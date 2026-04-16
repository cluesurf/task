import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * `task remove invisible` -- strip zero-width / BOM / invisible
 * Unicode characters from a text file. Pure Node.js, no binary
 * spawn.
 */

const forms = buildSingleFileForms({
  name: 'remove_invisible',
  save: '~/code/form/action/remove/invisible',
  outputRequired: false,
})

export const remove_invisible_node_input = forms.node_input
export const remove_invisible_node_remote_input =
  forms.node_remote_input
export const remove_invisible_node_external_input =
  forms.node_external_input
export const remove_invisible_node_client_input =
  forms.node_client_input
export const remove_invisible_node_local_external_input =
  forms.node_local_external_input
export const remove_invisible_node_local_internal_input =
  forms.node_local_internal_input
export const remove_invisible_node_local_input = forms.node_local_input
export const remove_invisible_node_output = forms.node_output
export const remove_invisible_command_input = forms.command_input
export const remove_invisible_browser_input = forms.browser_input
export const remove_invisible_browser_remote_input =
  forms.browser_remote_input
export const remove_invisible_browser_local_input =
  forms.browser_local_input
export const remove_invisible_browser_output = forms.browser_output
