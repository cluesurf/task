import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * Action input for `task inspect file <path>` -- reads a file and
 * prints a key/value table of metadata grouped by topic. Routes
 * by extension to a per-type extractor (pdf, image, audio, video,
 * font, ...).
 *
 * Pretty mode prints a vertically-aligned table. `-f text` strips
 * ANSI. `-f json` emits the structured `{ groups: [...] }`.
 */

const forms = buildSingleFileForms({
  name: 'inspect_file',
  save: '~/code/form/action/inspect/file',
  outputRequired: false,
})

export const inspect_file_node_input = forms.node_input
export const inspect_file_node_remote_input =
  forms.node_remote_input
export const inspect_file_node_external_input =
  forms.node_external_input
export const inspect_file_node_client_input =
  forms.node_client_input
export const inspect_file_node_local_external_input =
  forms.node_local_external_input
export const inspect_file_node_local_internal_input =
  forms.node_local_internal_input
export const inspect_file_node_local_input = forms.node_local_input
export const inspect_file_node_output = forms.node_output
export const inspect_file_command_input = forms.command_input
export const inspect_file_browser_input = forms.browser_input
export const inspect_file_browser_remote_input =
  forms.browser_remote_input
export const inspect_file_browser_local_input =
  forms.browser_local_input
export const inspect_file_browser_output = forms.browser_output
