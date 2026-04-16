import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * `task update video --subtitles subs.srt` -- mux a subtitle track
 * into an existing video. ffmpeg maps the video/audio streams
 * from the input and the subtitle stream from the sidecar file.
 */

const forms = buildSingleFileForms({
  name: 'update_video',
  save: '~/code/form/action/update/video',
  common: {
    subtitles: {
      like: 'string',
      need: false,
      name: { mark: 's' },
      note: 'Path to a .srt / .vtt / .ass subtitle file',
    },
  },
})

export const update_video_node_input = forms.node_input
export const update_video_node_remote_input = forms.node_remote_input
export const update_video_node_external_input =
  forms.node_external_input
export const update_video_node_client_input = forms.node_client_input
export const update_video_node_local_external_input =
  forms.node_local_external_input
export const update_video_node_local_internal_input =
  forms.node_local_internal_input
export const update_video_node_local_input = forms.node_local_input
export const update_video_node_output = forms.node_output
export const update_video_command_input = forms.command_input
export const update_video_browser_input = forms.browser_input
export const update_video_browser_remote_input =
  forms.browser_remote_input
export const update_video_browser_local_input =
  forms.browser_local_input
export const update_video_browser_output = forms.browser_output
