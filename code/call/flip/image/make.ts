import { buildSingleFileForms } from '~/code/tool/shared/make'

const forms = buildSingleFileForms({
  name: 'flip_image',
  save: '~/code/form/action/flip/image',
  common: {
    horizontal: {
      like: 'boolean',
      need: false,
      note: 'Flip left-to-right',
    },
    vertical: {
      like: 'boolean',
      need: false,
      note: 'Flip top-to-bottom',
    },
  },
})

export const flip_image_node_input = forms.node_input
export const flip_image_node_remote_input = forms.node_remote_input
export const flip_image_node_external_input = forms.node_external_input
export const flip_image_node_client_input = forms.node_client_input
export const flip_image_node_local_external_input = forms.node_local_external_input
export const flip_image_node_local_internal_input = forms.node_local_internal_input
export const flip_image_node_local_input = forms.node_local_input
export const flip_image_node_output = forms.node_output
export const flip_image_command_input = forms.command_input
export const flip_image_browser_input = forms.browser_input
export const flip_image_browser_remote_input = forms.browser_remote_input
export const flip_image_browser_local_input = forms.browser_local_input
export const flip_image_browser_output = forms.browser_output
