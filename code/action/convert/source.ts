import { Form } from '@termsurf/form'
import _ from 'lodash'
import { baseCommonConvert } from '~/code/tool/shared/source.js'

export const resolve_input_for_convert_remote: Form = {
  form: 'form',
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
