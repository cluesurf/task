import { Form } from '@cluesurf/form'
import { buildSingleFileForms } from '~/code/tool/shared/make'

/**
 * `task inspect metadata <path>` -- shells out to exiftool and
 * renders every non-trivial tag. Covers EXIF / XMP / IPTC / ID3
 * / PDF info / plenty more.
 */

const forms = buildSingleFileForms({
  name: 'inspect_metadata',
  save: '~/code/form/action/inspect/metadata',
  outputRequired: false,
})

export const inspect_metadata_node_input = forms.node_input
export const inspect_metadata_node_remote_input =
  forms.node_remote_input
export const inspect_metadata_node_external_input =
  forms.node_external_input
export const inspect_metadata_node_client_input =
  forms.node_client_input
export const inspect_metadata_node_local_external_input =
  forms.node_local_external_input
export const inspect_metadata_node_local_internal_input =
  forms.node_local_internal_input
export const inspect_metadata_node_local_input =
  forms.node_local_input
export const inspect_metadata_node_output = forms.node_output
export const inspect_metadata_command_input = forms.command_input
export const inspect_metadata_browser_input = forms.browser_input
export const inspect_metadata_browser_remote_input =
  forms.browser_remote_input
export const inspect_metadata_browser_local_input =
  forms.browser_local_input
export const inspect_metadata_browser_output = forms.browser_output

export const inspect_metadata_from_image: Form = {
  form: 'form',
  save: '~/code/form/action/inspect/metadata/shared',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'i' } },
          },
        },
      },
    },
    copyright: { like: 'string', need: false },
    creator: { like: 'string', need: false },
    license: { like: 'string', need: false },
    keywords: { like: 'string', list: true, need: false },
    artist: { like: 'string', need: false },
    originalDate: { like: 'date', need: false },
    allDates: { like: 'date', need: false },
    creationDate: { like: 'date', need: false },
    title: { like: 'string', need: false },
    description: { like: 'string', need: false },
  },
}
