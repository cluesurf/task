import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * `task remove metadata` -- strip every metadata tag. Routes by
 * extension to the tool that actually handles that container:
 *
 *   audio / video  ->  ffmpeg -map_metadata -1 -c copy
 *   everything     ->  exiftool -all= -overwrite_original
 */

const forms = buildSingleFileForms({
  name: 'remove_metadata',
  save: '~/code/form/action/remove/metadata',
  outputRequired: false,
})

export const remove_metadata_node_input = forms.node_input
export const remove_metadata_node_remote_input =
  forms.node_remote_input
export const remove_metadata_node_external_input =
  forms.node_external_input
export const remove_metadata_node_client_input =
  forms.node_client_input
export const remove_metadata_node_local_external_input =
  forms.node_local_external_input
export const remove_metadata_node_local_internal_input =
  forms.node_local_internal_input
export const remove_metadata_node_local_input = forms.node_local_input
export const remove_metadata_node_output = forms.node_output
export const remove_metadata_command_input = forms.command_input
export const remove_metadata_browser_input = forms.browser_input
export const remove_metadata_browser_remote_input =
  forms.browser_remote_input
export const remove_metadata_browser_local_input =
  forms.browser_local_input
export const remove_metadata_browser_output = forms.browser_output
