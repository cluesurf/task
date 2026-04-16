import { buildSingleFileForms } from '~/code/tool/shared/make'

const forms = buildSingleFileForms({
  name: 'remove_profile',
  save: '~/code/form/action/remove/profile',
})

export const remove_profile_node_input = forms.node_input
export const remove_profile_node_remote_input = forms.node_remote_input
export const remove_profile_node_external_input = forms.node_external_input
export const remove_profile_node_client_input = forms.node_client_input
export const remove_profile_node_local_external_input = forms.node_local_external_input
export const remove_profile_node_local_internal_input = forms.node_local_internal_input
export const remove_profile_node_local_input = forms.node_local_input
export const remove_profile_node_output = forms.node_output
export const remove_profile_command_input = forms.command_input
export const remove_profile_browser_input = forms.browser_input
export const remove_profile_browser_remote_input = forms.browser_remote_input
export const remove_profile_browser_local_input = forms.browser_local_input
export const remove_profile_browser_output = forms.browser_output
