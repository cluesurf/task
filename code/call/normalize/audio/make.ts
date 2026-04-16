import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * `task normalize audio` -- run the file through ffmpeg's
 * `loudnorm` filter targeting EBU R128 defaults (-16 LUFS / -1
 * dB TP / 11 LU range). Overrides are flat flags so users with
 * specific targets don't need a custom filter string.
 */

const forms = buildSingleFileForms({
  name: 'normalize_audio',
  save: '~/code/form/action/normalize/audio',
  common: {
    target: {
      like: 'string',
      need: false,
      note: 'Integrated loudness target in LUFS (default -16)',
    },
    peak: {
      like: 'string',
      need: false,
      note: 'True-peak ceiling in dBTP (default -1)',
    },
    range: {
      like: 'string',
      need: false,
      note: 'Loudness range target in LU (default 11)',
    },
  },
})

export const normalize_audio_node_input = forms.node_input
export const normalize_audio_node_remote_input =
  forms.node_remote_input
export const normalize_audio_node_external_input =
  forms.node_external_input
export const normalize_audio_node_client_input =
  forms.node_client_input
export const normalize_audio_node_local_external_input =
  forms.node_local_external_input
export const normalize_audio_node_local_internal_input =
  forms.node_local_internal_input
export const normalize_audio_node_local_input = forms.node_local_input
export const normalize_audio_node_output = forms.node_output
export const normalize_audio_command_input = forms.command_input
export const normalize_audio_browser_input = forms.browser_input
export const normalize_audio_browser_remote_input =
  forms.browser_remote_input
export const normalize_audio_browser_local_input =
  forms.browser_local_input
export const normalize_audio_browser_output = forms.browser_output
