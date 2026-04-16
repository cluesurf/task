import type { List } from '@cluesurf/form'
import { buildSingleFileForms } from '~/code/tool/shared/make'

export const disassemble_jvm_level: List = {
  form: 'list',
  save: '~/code/form/action/disassemble/jvm/shared',
  list: ['public', 'protected', 'package', 'private'],
}

const disassemble_jvm_forms = buildSingleFileForms({
  name: 'disassemble_jvm',
  save: '~/code/form/action/disassemble/jvm',
  outputRequired: false,
  common: {
    level: { like: 'disassemble_jvm_level', need: false },
    verbose: { like: 'boolean', need: false },
    constants: { like: 'boolean', need: false },
    lineNumbers: { like: 'boolean', need: false },
    classpath: { like: 'string', need: false },
    className: { like: 'string', need: false },
  },
})

export const disassemble_jvm_node_input =
  disassemble_jvm_forms.node_input
export const disassemble_jvm_node_remote_input =
  disassemble_jvm_forms.node_remote_input
export const disassemble_jvm_node_external_input =
  disassemble_jvm_forms.node_external_input
export const disassemble_jvm_node_client_input =
  disassemble_jvm_forms.node_client_input
export const disassemble_jvm_node_local_external_input =
  disassemble_jvm_forms.node_local_external_input
export const disassemble_jvm_node_local_internal_input =
  disassemble_jvm_forms.node_local_internal_input
export const disassemble_jvm_node_local_input =
  disassemble_jvm_forms.node_local_input
export const disassemble_jvm_node_output =
  disassemble_jvm_forms.node_output
export const disassemble_jvm_command_input =
  disassemble_jvm_forms.command_input
export const disassemble_jvm_browser_input =
  disassemble_jvm_forms.browser_input
export const disassemble_jvm_browser_remote_input =
  disassemble_jvm_forms.browser_remote_input
export const disassemble_jvm_browser_local_input =
  disassemble_jvm_forms.browser_local_input
export const disassemble_jvm_browser_output =
  disassemble_jvm_forms.browser_output
