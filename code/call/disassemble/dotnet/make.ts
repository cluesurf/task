import { buildSingleFileForms } from '~/code/tool/shared/make'

const disassemble_dotnet_forms = buildSingleFileForms({
  name: 'disassemble_dotnet',
  save: '~/code/form/action/disassemble/dotnet',
  outputRequired: false,
  common: {
    bytes: { like: 'boolean', need: false },
    header: { like: 'boolean', need: false },
    tokens: { like: 'boolean', need: false },
    noBar: { like: 'boolean', need: false },
  },
})

export const disassemble_dotnet_node_input =
  disassemble_dotnet_forms.node_input
export const disassemble_dotnet_node_remote_input =
  disassemble_dotnet_forms.node_remote_input
export const disassemble_dotnet_node_external_input =
  disassemble_dotnet_forms.node_external_input
export const disassemble_dotnet_node_client_input =
  disassemble_dotnet_forms.node_client_input
export const disassemble_dotnet_node_local_external_input =
  disassemble_dotnet_forms.node_local_external_input
export const disassemble_dotnet_node_local_internal_input =
  disassemble_dotnet_forms.node_local_internal_input
export const disassemble_dotnet_node_local_input =
  disassemble_dotnet_forms.node_local_input
export const disassemble_dotnet_node_output =
  disassemble_dotnet_forms.node_output
export const disassemble_dotnet_command_input =
  disassemble_dotnet_forms.command_input
export const disassemble_dotnet_browser_input =
  disassemble_dotnet_forms.browser_input
export const disassemble_dotnet_browser_remote_input =
  disassemble_dotnet_forms.browser_remote_input
export const disassemble_dotnet_browser_local_input =
  disassemble_dotnet_forms.browser_local_input
export const disassemble_dotnet_browser_output =
  disassemble_dotnet_forms.browser_output
