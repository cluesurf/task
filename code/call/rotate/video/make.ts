import { buildSingleFileForms } from '~/code/tool/shared/make'

const forms = buildSingleFileForms({
  name: 'rotate_video',
  save: '~/code/form/action/rotate/video',
  common: {
    degree: {
      like: 'string',
      need: true,
      name: { mark: 'd' },
      note: 'Degrees clockwise: 90, 180, or 270',
    },
  },
})

export const rotate_video_node_input = forms.node_input
export const rotate_video_node_remote_input = forms.node_remote_input
export const rotate_video_node_external_input = forms.node_external_input
export const rotate_video_node_client_input = forms.node_client_input
export const rotate_video_node_local_external_input = forms.node_local_external_input
export const rotate_video_node_local_internal_input = forms.node_local_internal_input
export const rotate_video_node_local_input = forms.node_local_input
export const rotate_video_node_output = forms.node_output
export const rotate_video_command_input = forms.command_input
export const rotate_video_browser_input = forms.browser_input
export const rotate_video_browser_remote_input = forms.browser_remote_input
export const rotate_video_browser_local_input = forms.browser_local_input
export const rotate_video_browser_output = forms.browser_output
