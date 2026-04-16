import { Form } from '@cluesurf/form'
import _ from 'lodash'
import { baseCommonConvert } from '~/code/tool/shared/base'

/**
 * Common CLI-level input shape for `task convert <thing>`. The
 * router in `code/call/convert/node.ts` reads `input.format` /
 * `output.format` and dispatches to the right backend; per-tool
 * options aren't surfaced here — pass `--tool <name>` to force a
 * specific backend, otherwise the format pair picks one.
 */
export const convert_command_input: Form = {
  form: 'form',
  save: '~/code/form/action/convert/shared',
  link: {
    tool: { like: 'string', need: false },
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    output: {
      link: {
        format: { like: 'string', name: { mark: 'O' } },
        file: {
          link: { path: { like: 'string', name: { mark: 'o' } } },
        },
      },
    },
  },
}

export const resolve_input_for_convert_remote: Form = {
  form: 'form',
  save: '~/code/form/action/convert/shared',
  link: _.merge(baseCommonConvert, {
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

export const resolve_input_for_convert_local_external: Form = {
  form: 'form',
  save: '~/code/form/action/convert/shared',
  link: _.merge(baseCommonConvert, {
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

export const resolve_input_for_convert_local_internal: Form = {
  form: 'form',
  save: '~/code/form/action/convert/shared',
  link: _.merge(baseCommonConvert, {
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

export const convert_api: Form = {
  form: 'form',
  save: '~/code/form/action/convert/shared',
  link: {
    input: {
      link: {
        format: { like: 'string' },
      },
    },
    output: {
      link: {
        format: { like: 'string' },
      },
    },
  },
}
