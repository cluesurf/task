import type { List } from '@cluesurf/form'
import { buildSingleFileForms } from '~/code/tool/shared/base'

export const encrypt_file_tool: List = {
  form: 'list',
  save: '~/code/form/action/encrypt/file/shared',
  list: ['age', 'openssl', 'gpg'],
}

const forms = buildSingleFileForms({
  name: 'encrypt_file',
  save: '~/code/form/action/encrypt/file',
  common: {
    tool: {
      like: 'encrypt_file_tool',
      need: false,
      note: 'Backend (default: inferred from output extension)',
    },
    passphrase: { like: 'string', need: false },
    recipients: { like: 'string', need: false, list: true },
    cipher: { like: 'string', need: false, note: 'OpenSSL cipher (default aes-256-cbc)' },
    armor: { like: 'boolean', need: false, note: 'GPG ASCII armor' },
  },
})

export const encrypt_file_node_input = forms.node_input
export const encrypt_file_node_remote_input = forms.node_remote_input
export const encrypt_file_node_external_input = forms.node_external_input
export const encrypt_file_node_client_input = forms.node_client_input
export const encrypt_file_node_local_external_input = forms.node_local_external_input
export const encrypt_file_node_local_internal_input = forms.node_local_internal_input
export const encrypt_file_node_local_input = forms.node_local_input
export const encrypt_file_node_output = forms.node_output
export const encrypt_file_command_input = forms.command_input
export const encrypt_file_browser_input = forms.browser_input
export const encrypt_file_browser_remote_input = forms.browser_remote_input
export const encrypt_file_browser_local_input = forms.browser_local_input
export const encrypt_file_browser_output = forms.browser_output
