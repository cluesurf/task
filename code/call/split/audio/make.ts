import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * `task split audio --segments silence` uses ffmpeg silencedetect
 * to find gaps and carve the input into one segment per gap. The
 * alternative shape is `--segments <seconds>` which produces
 * fixed-duration chunks.
 */

const forms = buildSingleFileForms({
  name: 'split_audio',
  save: '~/code/form/action/split/audio',
  outputRequired: false,
  common: {
    segments: {
      like: 'string',
      need: true,
      name: { mark: 's' },
      note: '`silence` or a fixed chunk length in seconds (e.g. `30`)',
    },
    silenceDb: {
      like: 'string',
      need: false,
      note: 'Noise floor for silencedetect (default -30dB)',
    },
    silenceDuration: {
      like: 'string',
      need: false,
      note: 'Minimum silence duration in seconds (default 0.5)',
    },
  },
})

export const split_audio_node_input = forms.node_input
export const split_audio_node_remote_input = forms.node_remote_input
export const split_audio_node_external_input =
  forms.node_external_input
export const split_audio_node_client_input = forms.node_client_input
export const split_audio_node_local_external_input =
  forms.node_local_external_input
export const split_audio_node_local_internal_input =
  forms.node_local_internal_input
export const split_audio_node_local_input = forms.node_local_input
export const split_audio_node_output = forms.node_output
export const split_audio_command_input = forms.command_input
export const split_audio_browser_input = forms.browser_input
export const split_audio_browser_remote_input =
  forms.browser_remote_input
export const split_audio_browser_local_input =
  forms.browser_local_input
export const split_audio_browser_output = forms.browser_output
