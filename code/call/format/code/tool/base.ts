import { Form, FormLinkMesh } from '@cluesurf/form'
import _ from 'lodash'

// only allow uploads from browser to contain `content` or remote paths.
export const baseCommonFormat: FormLinkMesh = {
  pathScope: {
    like: 'string',
    need: false,
    note: `This is used from the UI to scope file paths to a specific folder.`,
  },
}

export function buildFormatForms({
  name,
  save,
  i,
  base,
  common = {},
  commonCommand = {},
}: {
  name: string
  save: string
  i: string
  base?: string
  common?: FormLinkMesh
  commonCommand?: FormLinkMesh
}) {
  const node_input: Form = {
    form: 'form',
    save: `${save}/node`,
    base,
    case: [
      { like: `${name}_node_remote_input` },
      { like: `${name}_node_local_external_input` },
      { like: `${name}_node_local_internal_input` },
    ],
  }

  const node_remote_input: Form = {
    form: 'form',
    save: `${save}/node`,
    base,
    link: _.merge(
      {
        handle: { take: ['remote'], name: { mark: 'H' } },
        format: { like: i, name: { mark: 'I' } },
        input: {
          link: {
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
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonFormat,
      common,
    ),
  }

  const node_client_input: Form = {
    form: 'form',
    save: `${save}/node`,
    base,
    link: _.merge(
      {
        handle: { take: ['client'], name: { mark: 'H' } },
        format: { like: i, name: { mark: 'I' } },
        input: {
          link: {
            file: {
              case: [
                { like: 'file_input_path' },
                { like: 'file_content_with_sha256' },
              ],
            },
          },
        },
        output: {
          link: {},
        },
      },
      common,
    ),
  }

  // gets input from REST API
  const node_external_input: Form = {
    form: 'form',
    save: `${save}/node`,
    base,
    link: _.merge(
      {
        handle: { take: ['external'], name: { mark: 'H' } },
        format: { like: i, name: { mark: 'I' } },
        input: {
          link: {
            file: {
              case: [
                { like: 'remote_input_path' },
                { like: 'file_content_with_sha256' },
              ],
            },
          },
        },
        output: {
          link: {},
        },
      },
      common,
    ),
  }

  const node_local_external_input: Form = {
    form: 'form',
    save: `${save}/node`,
    base,
    link: _.merge(
      {
        handle: { take: ['external'], name: { mark: 'H' } },
        format: { like: i, name: { mark: 'I' } },
        input: {
          link: {
            file: {
              case: [
                { like: 'remote_input_path' },
                { like: 'file_content_with_sha256' },
              ],
            },
          },
        },
        output: {
          link: {
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonFormat,
      common,
    ),
  }

  // is called from node.js directly.
  const node_local_internal_input: Form = {
    form: 'form',
    save: `${save}/node`,
    base,
    link: _.merge(
      {
        handle: { take: ['internal'], need: false },
        format: { like: i, name: { mark: 'I' } },
        input: {
          link: {
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
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonFormat,
      common,
    ),
  }

  const node_local_input: Form = {
    form: 'form',
    save: `${save}/node`,
    base,
    link: _.merge(
      {
        format: { like: i, name: { mark: 'I' } },
        input: {
          link: {
            file: { like: 'local_path' },
          },
        },
        output: {
          link: {
            file: { like: 'local_path' },
          },
        },
      },
      baseCommonFormat,
      common,
    ),
  }

  const command_input: Form = {
    form: 'form',
    save: `${save}/cli`,
    link: _.merge(
      {
        format: { like: i, name: { mark: 'I' } },
        input: {
          link: {
            file: { like: 'local_path' },
          },
        },
        output: {
          link: {
            file: { like: 'local_path' },
          },
        },
      },
      baseCommonFormat,
      commonCommand,
    ),
  }

  const node_output: Form = {
    form: 'form',
    save: `${save}/node`,
    base,
    link: {
      file: { like: 'file_path' },
    },
  }

  const browser_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    base,
    case: [
      { like: `${name}_browser_remote_input` },
      { like: `${name}_browser_local_input` },
    ],
  }

  const browser_remote_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    base,
    link: _.merge({
      handle: { take: ['remote'] },
      format: { like: i },
      input: {
        link: {
          file: {
            like: 'file_content_with_sha256',
          },
        },
      },
      common,
    }),
  }

  const browser_local_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    base,
    link: _.merge({
      handle: { take: ['local'], need: false },
      format: { like: i },
      input: {
        link: {
          file: {
            link: {
              content: { like: 'file_content' },
            },
          },
        },
      },
      common,
    }),
  }

  const browser_output: Form = {
    form: 'form',
    save: `${save}/browser`,
    base,
    link: {
      file: { like: 'file_content' },
    },
  }

  return {
    node_input,
    node_remote_input,
    node_external_input,
    node_client_input,
    node_local_external_input,
    node_local_internal_input,
    node_local_input,
    node_output,
    command_input,
    browser_input,
    browser_remote_input,
    browser_local_input,
    browser_output,
  }
}
