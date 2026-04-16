import { buildSingleFileForms } from '~/code/tool/shared/base'

const convert_image_with_ffmpeg_forms = buildSingleFileForms({
  name: 'convert_image_with_ffmpeg',
  save: '~/code/form/action/convert/image/ffmpeg',
  common: {
    fps: { like: 'natural_number', need: false, note: 'Target framerate' },
    quality: {
      like: 'natural_number',
      need: false,
      note: 'Quality 1-100 (interpreted per output format)',
    },
    loop: {
      like: 'natural_number',
      need: false,
      note: 'Loop count (0 = infinite) for gif/apng/webp',
    },
    outputFormat: { like: 'string', need: false, note: 'Output format override' },
  },
})

export const convert_image_with_ffmpeg_node_input =
  convert_image_with_ffmpeg_forms.node_input
export const convert_image_with_ffmpeg_node_remote_input =
  convert_image_with_ffmpeg_forms.node_remote_input
export const convert_image_with_ffmpeg_node_external_input =
  convert_image_with_ffmpeg_forms.node_external_input
export const convert_image_with_ffmpeg_node_client_input =
  convert_image_with_ffmpeg_forms.node_client_input
export const convert_image_with_ffmpeg_node_local_external_input =
  convert_image_with_ffmpeg_forms.node_local_external_input
export const convert_image_with_ffmpeg_node_local_internal_input =
  convert_image_with_ffmpeg_forms.node_local_internal_input
export const convert_image_with_ffmpeg_node_local_input =
  convert_image_with_ffmpeg_forms.node_local_input
export const convert_image_with_ffmpeg_node_output =
  convert_image_with_ffmpeg_forms.node_output
export const convert_image_with_ffmpeg_command_input =
  convert_image_with_ffmpeg_forms.command_input
export const convert_image_with_ffmpeg_browser_input =
  convert_image_with_ffmpeg_forms.browser_input
export const convert_image_with_ffmpeg_browser_remote_input =
  convert_image_with_ffmpeg_forms.browser_remote_input
export const convert_image_with_ffmpeg_browser_local_input =
  convert_image_with_ffmpeg_forms.browser_local_input
export const convert_image_with_ffmpeg_browser_output =
  convert_image_with_ffmpeg_forms.browser_output
