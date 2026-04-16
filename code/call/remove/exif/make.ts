import { buildSingleFileForms } from '~/code/tool/shared/make'

const forms = buildSingleFileForms({
  name: 'remove_exif',
  save: '~/code/form/action/remove/exif',
  outputRequired: false,
  common: {
    tag: {
      like: 'string',
      list: true,
      need: false,
      note: 'ExifTool tag names to strip',
    },
    preset: {
      like: 'string',
      list: true,
      need: false,
      note: 'Preset groups: gps, device, user',
    },
    overwrite: {
      like: 'boolean',
      need: false,
      note: 'Edit the input file in place',
    },
  },
})

export const remove_exif_node_input = forms.node_input
export const remove_exif_node_remote_input = forms.node_remote_input
export const remove_exif_node_external_input = forms.node_external_input
export const remove_exif_node_client_input = forms.node_client_input
export const remove_exif_node_local_external_input =
  forms.node_local_external_input
export const remove_exif_node_local_internal_input =
  forms.node_local_internal_input
export const remove_exif_node_local_input = forms.node_local_input
export const remove_exif_node_output = forms.node_output
export const remove_exif_command_input = forms.command_input
export const remove_exif_browser_input = forms.browser_input
export const remove_exif_browser_remote_input =
  forms.browser_remote_input
export const remove_exif_browser_local_input = forms.browser_local_input
export const remove_exif_browser_output = forms.browser_output
