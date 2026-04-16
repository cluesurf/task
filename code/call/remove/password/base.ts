import { buildSingleFileForms } from '~/code/tool/shared/base'

const remove_password_forms = buildSingleFileForms({
  name: 'remove_password',
  save: '~/code/form/action/remove/password',
  common: {
    password: { like: 'string', need: false, note: 'PDF password' },
  },
})

export const remove_password_node_input =
  remove_password_forms.node_input
export const remove_password_node_remote_input =
  remove_password_forms.node_remote_input
export const remove_password_node_external_input =
  remove_password_forms.node_external_input
export const remove_password_node_client_input =
  remove_password_forms.node_client_input
export const remove_password_node_local_external_input =
  remove_password_forms.node_local_external_input
export const remove_password_node_local_internal_input =
  remove_password_forms.node_local_internal_input
export const remove_password_node_local_input =
  remove_password_forms.node_local_input
export const remove_password_node_output =
  remove_password_forms.node_output
export const remove_password_command_input =
  remove_password_forms.command_input
export const remove_password_browser_input =
  remove_password_forms.browser_input
export const remove_password_browser_remote_input =
  remove_password_forms.browser_remote_input
export const remove_password_browser_local_input =
  remove_password_forms.browser_local_input
export const remove_password_browser_output =
  remove_password_forms.browser_output
