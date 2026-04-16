import { buildSingleFileForms } from '~/code/tool/shared/make'

const forms = buildSingleFileForms({
  name: 'trim_image',
  save: '~/code/form/action/trim/image',
  common: {
    crop: {
      like: 'string',
      need: true,
      name: { mark: 'c' },
      note: 'Crop rectangle as "x,y,w,h" (pixels)',
    },
  },
})

export const trim_image_node_input = forms.node_input
export const trim_image_node_remote_input = forms.node_remote_input
export const trim_image_node_external_input = forms.node_external_input
export const trim_image_node_client_input = forms.node_client_input
export const trim_image_node_local_external_input = forms.node_local_external_input
export const trim_image_node_local_internal_input = forms.node_local_internal_input
export const trim_image_node_local_input = forms.node_local_input
export const trim_image_node_output = forms.node_output
export const trim_image_command_input = forms.command_input
export const trim_image_browser_input = forms.browser_input
export const trim_image_browser_remote_input = forms.browser_remote_input
export const trim_image_browser_local_input = forms.browser_local_input
export const trim_image_browser_output = forms.browser_output
