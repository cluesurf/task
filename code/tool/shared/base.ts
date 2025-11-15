import { Form, FormLinkMesh } from '@cluesurf/form'
import _ from 'lodash'

// only allow uploads from browser to contain `content` or remote paths.
export const baseCommonConvert: FormLinkMesh = {
  pathScope: {
    like: 'string',
    need: false,
    note: `This is used from the UI to scope file paths to a specific folder.`,
  },
}

export function buildConvertForms(
  name: string,
  save: string,
  i: string,
  o: string,
  common: FormLinkMesh = {},
) {
  const node_input: Form = {
    form: 'form',
    save: `${save}/node`,
    case: [
      { like: `${name}_node_remote_input` },
      { like: `${name}_node_local_external_input` },
      { like: `${name}_node_local_internal_input` },
    ],
  }

  const node_remote_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['remote'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_client_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['client'] },
        input: {
          link: {
            format: { like: i },
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
            format: { like: o },
          },
        },
      },
      common,
    ),
  }

  // gets input from REST API
  const node_external_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['external'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
          },
        },
      },
      common,
    ),
  }

  const node_local_external_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['external'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  // is called from node.js directly.
  const node_local_internal_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['internal'], need: false },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_local_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        input: {
          link: {
            format: { like: i },
            file: { like: 'local_path' },
          },
        },
        output: {
          link: {
            format: { like: o },
            file: { like: 'local_path' },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const command_input: Form = {
    form: 'form',
    save: `${save}/cli`,
    link: _.merge(
      {
        input: {
          link: {
            format: { like: i },
            file: { like: 'local_path' },
          },
        },
        output: {
          link: {
            format: { like: o },
            file: { like: 'local_path' },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_output: Form = {
    form: 'form',
    save: `${save}/node`,
    link: {
      file: { like: 'file_path' },
    },
  }

  const browser_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    case: [
      { like: `${name}_browser_remote_input` },
      { like: `${name}_browser_local_input` },
    ],
  }

  const browser_remote_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    link: _.merge(
      {
        handle: { take: ['remote'] },
        input: {
          link: {
            format: { like: i },
            file: {
              like: 'file_content_with_sha256',
            },
          },
        },
        output: {
          link: {
            format: { like: o },
          },
        },
      },
      common,
    ),
  }

  const browser_local_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    link: _.merge(
      {
        handle: { take: ['local'], need: false },
        input: {
          link: {
            format: { like: i },
            file: {
              link: {
                content: { like: 'file_content' },
              },
            },
          },
        },
        output: {
          link: {
            format: { like: o },
          },
        },
      },
      common,
    ),
  }

  const browser_output: Form = {
    form: 'form',
    save: `${save}/browser`,
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

export function buildConvertFormsToStringContent(
  name: string,
  save: string,
  i: string,
  o: string,
  common: FormLinkMesh = {},
) {
  const node_input: Form = {
    form: 'form',
    save: `${save}/node`,
    case: [
      { like: `${name}_node_remote_input` },
      { like: `${name}_node_local_external_input` },
      { like: `${name}_node_local_internal_input` },
    ],
  }

  const node_remote_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['remote'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_client_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['client'] },
        input: {
          link: {
            format: { like: i },
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
            format: { like: o },
          },
        },
      },
      common,
    ),
  }

  // gets input from REST API
  const node_external_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['external'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
          },
        },
      },
      common,
    ),
  }

  const node_local_external_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['external'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  // is called from node.js directly.
  const node_local_internal_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['internal'], need: false },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
            file: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_local_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        input: {
          link: {
            format: { like: i },
            file: {
              link: {
                content: { like: 'array_buffer' },
              },
            },
          },
        },
        output: {
          link: {
            format: { like: o },
            file: { like: 'local_path' },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_output: Form = {
    form: 'form',
    save: `${save}/node`,
    link: {
      file: { like: 'file_path' },
    },
  }

  const browser_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    case: [
      { like: `${name}_browser_remote_input` },
      { like: `${name}_browser_local_input` },
    ],
  }

  const browser_remote_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    link: _.merge({
      handle: { take: ['remote'] },
      input: {
        link: {
          format: { like: i },
          file: {
            like: 'file_content_with_sha256',
          },
        },
      },
      output: {
        link: {
          format: { like: o },
        },
      },
      common,
    }),
  }

  const browser_local_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    link: _.merge({
      handle: { take: ['local'], need: false },
      input: {
        link: {
          format: { like: i },
          file: {
            link: {
              content: { like: 'file_content' },
            },
          },
        },
      },
      output: {
        link: {
          format: { like: o },
        },
      },
      common,
    }),
  }

  const browser_output: Form = {
    form: 'form',
    save: `${save}/browser`,
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
    browser_input,
    browser_remote_input,
    browser_local_input,
    browser_output,
  }
}

export function buildConvertFormsWithOutputDirectory(
  name: string,
  save: string,
  i: string,
  o: string,
  common: FormLinkMesh = {},
) {
  const node_input: Form = {
    form: 'form',
    save: `${save}/node`,
    case: [
      { like: `${name}_node_remote_input` },
      { like: `${name}_node_local_external_input` },
      { like: `${name}_node_local_internal_input` },
    ],
  }

  const node_remote_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['remote'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
            directory: { like: 'local_output_path', need: false },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_client_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['client'] },
        input: {
          link: {
            format: { like: i },
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
            format: { like: o },
          },
        },
      },
      common,
    ),
  }

  // gets input from REST API
  const node_external_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['external'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
          },
        },
      },
      common,
    ),
  }

  const node_local_external_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['external'] },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
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
            format: { like: o, name: { mark: 'O' } },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  // is called from node.js directly.
  const node_local_internal_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        handle: { take: ['internal'], need: false },
        input: {
          link: {
            format: { like: i, name: { mark: 'I' } },
            file: {
              case: [
                { like: 'file_input_path' },
                { like: 'file_content' },
              ],
            },
          },
        },
        output: {
          link: {
            format: { like: o, name: { mark: 'O' } },
            directory: {
              like: 'local_output_path',
              need: false,
            },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_local_input: Form = {
    form: 'form',
    save: `${save}/node`,
    link: _.merge(
      {
        input: {
          link: {
            format: { like: i },
            file: { like: 'local_path' },
          },
        },
        output: {
          link: {
            format: { like: o },
            directory: { like: 'local_path' },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const command_input: Form = {
    form: 'form',
    save: `${save}/cli`,
    link: _.merge(
      {
        input: {
          link: {
            format: { like: i },
            file: { like: 'local_path' },
          },
        },
        output: {
          link: {
            format: { like: o },
            directory: { like: 'local_path' },
          },
        },
      },
      baseCommonConvert,
      common,
    ),
  }

  const node_output: Form = {
    form: 'form',
    save: `${save}/node`,
    link: {
      file: { like: 'file_path' },
    },
  }

  const browser_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    case: [
      { like: `${name}_browser_remote_input` },
      { like: `${name}_browser_local_input` },
    ],
  }

  const browser_remote_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    link: _.merge({
      handle: { take: ['remote'] },
      input: {
        link: {
          format: { like: i },
          file: {
            like: 'file_content_with_sha256',
          },
        },
      },
      output: {
        link: {
          format: { like: o },
        },
      },
      common,
    }),
  }

  const browser_local_input: Form = {
    form: 'form',
    save: `${save}/browser`,
    link: _.merge({
      handle: { take: ['local'], need: false },
      input: {
        link: {
          format: { like: i },
          file: {
            link: {
              content: { like: 'file_content' },
            },
          },
        },
      },
      output: {
        link: {
          format: { like: o },
        },
      },
      common,
    }),
  }

  const browser_output: Form = {
    form: 'form',
    save: `${save}/browser`,
    link: {
      file: { like: 'file_content' },
    },
  }

  return {
    node_input,
    node_remote_input,
    node_client_input,
    node_external_input,
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
