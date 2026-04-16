import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * Action input for `task get duration <file>` -- reads the
 * duration of the first audio stream in `file` via ffprobe and
 * returns it in milliseconds (default), seconds, or formatted
 * `MM:SS.mmm`.
 *
 * Works for any container ffprobe understands (mp3, wav, flac,
 * ogg, opus, m4a, aac, mp4, mov, mkv, ...).
 */

const forms = buildSingleFileForms({
  name: 'get_duration',
  save: '~/code/form/action/get/duration',
  outputRequired: false,
  common: {
    /** Output unit. `ms` (default), `s`, or `clock` (`MM:SS.mmm`). */
    unit: {
      take: ['ms', 's', 'clock'],
      need: false,
      fall: 'ms',
    },
    /** Probe video stream instead of audio (`v:0` instead of `a:0`). */
    video: { like: 'boolean', need: false, fall: false },
  },
})

export const get_duration_node_input = forms.node_input
export const get_duration_node_remote_input =
  forms.node_remote_input
export const get_duration_node_external_input =
  forms.node_external_input
export const get_duration_node_client_input =
  forms.node_client_input
export const get_duration_node_local_external_input =
  forms.node_local_external_input
export const get_duration_node_local_internal_input =
  forms.node_local_internal_input
export const get_duration_node_local_input = forms.node_local_input
export const get_duration_node_output = forms.node_output
export const get_duration_command_input = forms.command_input
export const get_duration_browser_input = forms.browser_input
export const get_duration_browser_remote_input =
  forms.browser_remote_input
export const get_duration_browser_local_input =
  forms.browser_local_input
export const get_duration_browser_output = forms.browser_output
