import { Form } from '@termsurf/form'
import {
  baseCommonSanitize,
  buildSanitizeForms,
} from './tool/source.js'
import _ from 'lodash'

const sanitize_html_forms = buildSanitizeForms({
  name: 'sanitize_html',
  i: 'string',
  o: 'string',
})

export const sanitize_html_command_input =
  sanitize_html_forms.command_input

export const sanitize_html_node_input = sanitize_html_forms.node_input

export const sanitize_html_node_remote_input =
  sanitize_html_forms.node_remote_input

export const sanitize_html_node_external_input =
  sanitize_html_forms.node_external_input

export const sanitize_html_node_client_input =
  sanitize_html_forms.node_client_input

export const sanitize_html_node_local_external_input =
  sanitize_html_forms.node_local_external_input

export const sanitize_html_node_local_internal_input =
  sanitize_html_forms.node_local_internal_input

export const sanitize_html_node_local_input =
  sanitize_html_forms.node_local_input

export const sanitize_html_node_output = sanitize_html_forms.node_output

export const sanitize_html_browser_input =
  sanitize_html_forms.browser_input

export const sanitize_html_browser_remote_input =
  sanitize_html_forms.browser_remote_input

export const sanitize_html_browser_local_input =
  sanitize_html_forms.browser_local_input

export const sanitize_html_browser_output =
  sanitize_html_forms.browser_output

export const sanitize_api: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { like: 'string' },
      },
    },
  },
}

export const resolve_input_for_sanitize_remote: Form = {
  form: 'form',
  link: _.merge(baseCommonSanitize, {
    input: {
      link: {
        format: { like: 'string' },
        file: {
          case: [
            { like: 'file_input_path' },
            { like: 'file_content_with_sha256' },
          ],
        },
      },
    },
    output: {
      link: {
        format: { like: 'string' },
        file: {
          like: 'local_path',
          need: false,
        },
      },
    },
  }),
}

export const resolve_input_for_sanitize_local_external: Form = {
  form: 'form',
  link: _.merge(baseCommonSanitize, {
    input: {
      link: {
        format: { like: 'string' },
        file: {
          case: [
            { like: 'remote_path' },
            { like: 'file_content_with_sha256' },
          ],
        },
      },
    },
    output: {
      link: {
        format: { like: 'string' },
      },
    },
  }),
}

export const resolve_input_for_sanitize_local_internal: Form = {
  form: 'form',
  link: _.merge(baseCommonSanitize, {
    input: {
      link: {
        format: { like: 'string' },
        file: {
          case: [{ like: 'file_path' }, { like: 'file_content' }],
        },
      },
    },
    output: {
      link: {
        format: { like: 'string' },
      },
    },
  }),
}
