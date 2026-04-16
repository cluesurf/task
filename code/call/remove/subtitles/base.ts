import { buildSingleFileForms } from '~/code/tool/shared/base'

const forms = buildSingleFileForms({
  name: 'remove_subtitles',
  save: '~/code/form/action/remove/subtitles',
})

export const remove_subtitles_node_input = forms.node_input
export const remove_subtitles_node_remote_input = forms.node_remote_input
export const remove_subtitles_node_external_input = forms.node_external_input
export const remove_subtitles_node_client_input = forms.node_client_input
export const remove_subtitles_node_local_external_input = forms.node_local_external_input
export const remove_subtitles_node_local_internal_input = forms.node_local_internal_input
export const remove_subtitles_node_local_input = forms.node_local_input
export const remove_subtitles_node_output = forms.node_output
export const remove_subtitles_command_input = forms.command_input
export const remove_subtitles_browser_input = forms.browser_input
export const remove_subtitles_browser_remote_input = forms.browser_remote_input
export const remove_subtitles_browser_local_input = forms.browser_local_input
export const remove_subtitles_browser_output = forms.browser_output
