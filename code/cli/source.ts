import { Form } from '@termsurf/form'

const cli_base = {
  help: { like: 'boolean', need: false, name: { mark: 'h' } },
  log: {
    like: 'cli_log_format',
    fall: 'pretty',
    need: false,
    name: { mark: 'l' },
  },
}

export const compile_cli_base: Form = {
  form: 'form',
  // leak: true,
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
    output: {
      link: {
        format: { like: 'string', name: { mark: 'O' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'o' } },
          },
        },
      },
    },
    ...cli_base,
  },
}

export const convert_cli_base: Form = {
  form: 'form',
  // leak: true,
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
    output: {
      link: {
        format: { like: 'string', name: { mark: 'O' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'o' } },
          },
        },
      },
    },
    ...cli_base,
  },
}

export const format_cli_base: Form = {
  form: 'form',
  // leak: true,
  link: {
    format: { like: 'string', name: { mark: 'I' } },
    input: {
      link: {
        file: {
          link: {
            path: { like: 'string', name: { mark: 'i' } },
          },
        },
      },
    },
    output: {
      link: {
        file: {
          link: {
            path: { like: 'string', name: { mark: 'o' } },
          },
        },
      },
    },
    ...cli_base,
  },
}

export const verify_cli_base: Form = {
  form: 'form',
  // leak: true,
  link: {
    format: { like: 'string', name: { mark: 'I' } },
    file: {
      link: {
        path: { like: 'string', name: { mark: 'i' } },
      },
    },
    ...cli_base,
  },
}
