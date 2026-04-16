import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * `task remove audio` -- strip the audio track out of a video
 * with ffmpeg's `-an`. Input video stays untouched; output is
 * written to an explicit `-o` path so the caller doesn't lose
 * the original by accident.
 */

const forms = buildSingleFileForms({
  name: 'remove_audio',
  save: '~/code/form/action/remove/audio',
})

export const remove_audio_node_input = forms.node_input
export const remove_audio_node_remote_input = forms.node_remote_input
export const remove_audio_node_external_input =
  forms.node_external_input
export const remove_audio_node_client_input = forms.node_client_input
export const remove_audio_node_local_external_input =
  forms.node_local_external_input
export const remove_audio_node_local_internal_input =
  forms.node_local_internal_input
export const remove_audio_node_local_input = forms.node_local_input
export const remove_audio_node_output = forms.node_output
export const remove_audio_command_input = forms.command_input
export const remove_audio_browser_input = forms.browser_input
export const remove_audio_browser_remote_input =
  forms.browser_remote_input
export const remove_audio_browser_local_input =
  forms.browser_local_input
export const remove_audio_browser_output = forms.browser_output
