import type { List } from '@cluesurf/form'
import { buildSingleFileForms } from '~/code/tool/shared/make'

export const disassemble_ghidra_profile: List = {
  form: 'list',
  save: '~/code/form/action/disassemble/ghidra/shared',
  list: ['functions', 'calls', 'imports', 'exports', 'strings'],
}

const disassemble_ghidra_forms = buildSingleFileForms({
  name: 'disassemble_ghidra',
  save: '~/code/form/action/disassemble/ghidra',
  outputRequired: false,
  common: {
    profile: { like: 'disassemble_ghidra_profile', need: false },
    script: { like: 'string', need: false },
    ghidraHome: { like: 'string', need: false },
    projectDir: { like: 'string', need: false },
    projectName: { like: 'string', need: false },
    keepProject: { like: 'boolean', need: false },
    verbose: { like: 'boolean', need: false },
    quiet: { like: 'boolean', need: false },
  },
})

export const disassemble_ghidra_node_input =
  disassemble_ghidra_forms.node_input
export const disassemble_ghidra_node_remote_input =
  disassemble_ghidra_forms.node_remote_input
export const disassemble_ghidra_node_external_input =
  disassemble_ghidra_forms.node_external_input
export const disassemble_ghidra_node_client_input =
  disassemble_ghidra_forms.node_client_input
export const disassemble_ghidra_node_local_external_input =
  disassemble_ghidra_forms.node_local_external_input
export const disassemble_ghidra_node_local_internal_input =
  disassemble_ghidra_forms.node_local_internal_input
export const disassemble_ghidra_node_local_input =
  disassemble_ghidra_forms.node_local_input
export const disassemble_ghidra_node_output =
  disassemble_ghidra_forms.node_output
export const disassemble_ghidra_command_input =
  disassemble_ghidra_forms.command_input
export const disassemble_ghidra_browser_input =
  disassemble_ghidra_forms.browser_input
export const disassemble_ghidra_browser_remote_input =
  disassemble_ghidra_forms.browser_remote_input
export const disassemble_ghidra_browser_local_input =
  disassemble_ghidra_forms.browser_local_input
export const disassemble_ghidra_browser_output =
  disassemble_ghidra_forms.browser_output
