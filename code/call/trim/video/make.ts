import { buildSingleFileForms } from '~/code/tool/shared/make'

const forms = buildSingleFileForms({
  name: 'trim_video',
  save: '~/code/form/action/trim/video',
  common: {
    start: { like: 'string', need: false, name: { mark: 's' }, note: 'Start offset (seconds or HH:MM:SS)' },
    end: { like: 'string', need: false, name: { mark: 'e' }, note: 'End offset (seconds or HH:MM:SS)' },
    duration: { like: 'string', need: false, name: { mark: 'd' }, note: 'Alternate to --end: length of the cut' },
    reencode: { like: 'boolean', need: false, note: 'Re-encode instead of stream copy (slower, frame-accurate)' },
  },
})

export const trim_video_node_input = forms.node_input
export const trim_video_node_remote_input = forms.node_remote_input
export const trim_video_node_external_input = forms.node_external_input
export const trim_video_node_client_input = forms.node_client_input
export const trim_video_node_local_external_input = forms.node_local_external_input
export const trim_video_node_local_internal_input = forms.node_local_internal_input
export const trim_video_node_local_input = forms.node_local_input
export const trim_video_node_output = forms.node_output
export const trim_video_command_input = forms.command_input
export const trim_video_browser_input = forms.browser_input
export const trim_video_browser_remote_input = forms.browser_remote_input
export const trim_video_browser_local_input = forms.browser_local_input
export const trim_video_browser_output = forms.browser_output
