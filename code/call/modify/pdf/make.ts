import { buildSingleFileForms } from '~/code/tool/shared/base'

/**
 * Action input for `task modify file.pdf --order 3,1,2` /
 * `--remove 2,5`. Either flag (mutually exclusive) rewrites the
 * PDF page list. The rest of the file's content / metadata is
 * preserved by qpdf's copy.
 */

const forms = buildSingleFileForms({
  name: 'modify_pdf',
  save: '~/code/form/action/modify/pdf',
  common: {
    /** Comma-separated page list defining the NEW order. */
    order: { like: 'string', need: false },
    /** Comma-separated pages to remove. Mutually exclusive with `order`. */
    remove: { like: 'string', need: false },
  },
})

export const modify_pdf_node_input = forms.node_input
export const modify_pdf_node_remote_input = forms.node_remote_input
export const modify_pdf_node_external_input =
  forms.node_external_input
export const modify_pdf_node_client_input = forms.node_client_input
export const modify_pdf_node_local_external_input =
  forms.node_local_external_input
export const modify_pdf_node_local_internal_input =
  forms.node_local_internal_input
export const modify_pdf_node_local_input = forms.node_local_input
export const modify_pdf_node_output = forms.node_output
export const modify_pdf_command_input = forms.command_input
export const modify_pdf_browser_input = forms.browser_input
export const modify_pdf_browser_remote_input =
  forms.browser_remote_input
export const modify_pdf_browser_local_input =
  forms.browser_local_input
export const modify_pdf_browser_output = forms.browser_output
