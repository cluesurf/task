import { buildSingleFileForms } from '~/code/tool/shared/make'

const disassemble_wasm_forms = buildSingleFileForms({
  name: 'disassemble_wasm',
  save: '~/code/form/action/disassemble/wasm',
  outputRequired: false,
  common: {
    folding: { like: 'boolean', need: false },
    inline: { like: 'boolean', need: false },
    noDebugNames: { like: 'boolean', need: false },
  },
})

export const disassemble_wasm_node_input =
  disassemble_wasm_forms.node_input
export const disassemble_wasm_node_remote_input =
  disassemble_wasm_forms.node_remote_input
export const disassemble_wasm_node_external_input =
  disassemble_wasm_forms.node_external_input
export const disassemble_wasm_node_client_input =
  disassemble_wasm_forms.node_client_input
export const disassemble_wasm_node_local_external_input =
  disassemble_wasm_forms.node_local_external_input
export const disassemble_wasm_node_local_internal_input =
  disassemble_wasm_forms.node_local_internal_input
export const disassemble_wasm_node_local_input =
  disassemble_wasm_forms.node_local_input
export const disassemble_wasm_node_output =
  disassemble_wasm_forms.node_output
export const disassemble_wasm_command_input =
  disassemble_wasm_forms.command_input
export const disassemble_wasm_browser_input =
  disassemble_wasm_forms.browser_input
export const disassemble_wasm_browser_remote_input =
  disassemble_wasm_forms.browser_remote_input
export const disassemble_wasm_browser_local_input =
  disassemble_wasm_forms.browser_local_input
export const disassemble_wasm_browser_output =
  disassemble_wasm_forms.browser_output
