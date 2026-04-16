import { buildSingleFileForms } from '~/code/tool/shared/base'

const forms = buildSingleFileForms({
  name: 'compress_audio',
  save: '~/code/form/action/compress/audio',
  common: {
    bitrate: {
      like: 'string',
      need: false,
      name: { mark: 'b' },
      note: 'Target bitrate, e.g. 128k, 192k (default 128k)',
    },
  },
})

export const compress_audio_node_input = forms.node_input
export const compress_audio_node_remote_input = forms.node_remote_input
export const compress_audio_node_external_input = forms.node_external_input
export const compress_audio_node_client_input = forms.node_client_input
export const compress_audio_node_local_external_input =
  forms.node_local_external_input
export const compress_audio_node_local_internal_input =
  forms.node_local_internal_input
export const compress_audio_node_local_input = forms.node_local_input
export const compress_audio_node_output = forms.node_output
export const compress_audio_command_input = forms.command_input
export const compress_audio_browser_input = forms.browser_input
export const compress_audio_browser_remote_input =
  forms.browser_remote_input
export const compress_audio_browser_local_input = forms.browser_local_input
export const compress_audio_browser_output = forms.browser_output
