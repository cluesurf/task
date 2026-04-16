import { List } from '@cluesurf/form'
import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * Action input for `task pad` -- extends an audio file with
 * silence so its duration meets a target length. Common audio
 * containers all flow through ffmpeg, so the schema doesn't need
 * a `<thing>` segment.
 *
 * `to` is the target duration. Accepted shapes:
 *   - `MM:SS.mmm` (`3:00.000`)
 *   - `SS.mmm`    (`180.0`)
 *   - `SSs`       (`180s`)
 * If the input is already at least `to` long, the file is copied
 * through unchanged.
 */

export const audio_pad_format: List = {
  form: 'list',
  save: '~/code/form/object/audio',
  list: ['mp3', 'wav', 'flac', 'ogg', 'opus', 'm4a', 'aac'],
}

const forms = buildSingleFileForms({
  name: 'pad_audio',
  save: '~/code/form/action/pad/audio',
  common: {
    to: {
      like: 'string',
      need: true,
      note: 'Target duration (MM:SS.mmm or seconds)',
    },
    sampleRate: { like: 'natural_number', need: false },
    channels: { like: 'natural_number', need: false },
  },
})

export const pad_audio_node_input = forms.node_input
export const pad_audio_node_remote_input = forms.node_remote_input
export const pad_audio_node_external_input = forms.node_external_input
export const pad_audio_node_client_input = forms.node_client_input
export const pad_audio_node_local_external_input =
  forms.node_local_external_input
export const pad_audio_node_local_internal_input =
  forms.node_local_internal_input
export const pad_audio_node_local_input = forms.node_local_input
export const pad_audio_node_output = forms.node_output
export const pad_audio_command_input = forms.command_input
export const pad_audio_browser_input = forms.browser_input
export const pad_audio_browser_remote_input = forms.browser_remote_input
export const pad_audio_browser_local_input = forms.browser_local_input
export const pad_audio_browser_output = forms.browser_output
