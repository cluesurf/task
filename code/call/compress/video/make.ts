import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * `task compress video` -- re-encode at a given H.264 CRF. Lower
 * CRF is higher quality (and larger file). 23 is the ffmpeg
 * default, 28 is the sweet spot for web delivery.
 */

const forms = buildSingleFileForms({
  name: 'compress_video',
  save: '~/code/form/action/compress/video',
  common: {
    crf: {
      like: 'string',
      need: false,
      note: 'H.264 CRF, 0 (lossless) to 51 (worst). Default 28.',
    },
    preset: {
      like: 'string',
      need: false,
      note: 'x264 preset (ultrafast to veryslow). Default medium.',
    },
  },
})

export const compress_video_node_input = forms.node_input
export const compress_video_node_remote_input = forms.node_remote_input
export const compress_video_node_external_input =
  forms.node_external_input
export const compress_video_node_client_input = forms.node_client_input
export const compress_video_node_local_external_input =
  forms.node_local_external_input
export const compress_video_node_local_internal_input =
  forms.node_local_internal_input
export const compress_video_node_local_input = forms.node_local_input
export const compress_video_node_output = forms.node_output
export const compress_video_command_input = forms.command_input
export const compress_video_browser_input = forms.browser_input
export const compress_video_browser_remote_input =
  forms.browser_remote_input
export const compress_video_browser_local_input =
  forms.browser_local_input
export const compress_video_browser_output = forms.browser_output
