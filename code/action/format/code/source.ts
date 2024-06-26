import { Form, List } from '@termsurf/form'
import { baseCommonFormat, buildFormatForms } from './tool/source.js'
import _ from 'lodash'

export const prettier_prose_wrap_option: List = {
  form: 'list',
  list: ['always', 'never', 'preserve'],
}

export const prettier_html_whitespace_sensitivity_option: List = {
  form: 'list',
  list: ['css', 'strict', 'ignore'],
}

export const prettier_xml_whitespace_sensitivity_option: List = {
  form: 'list',
  list: ['strict', 'preserve', 'ignore'],
}

export const prettier_xml_quote_attributes_option: List = {
  form: 'list',
  list: ['preserve', 'single', 'double'],
}

export const prettier_end_of_line_option: List = {
  form: 'list',
  list: ['lf', 'crlf', 'cr', 'auto'],
}

export const prettier_arrow_parens_option: List = {
  form: 'list',
  list: ['always', 'avoid'],
}

const prettier_common_option = {
  bracketSpacing: { like: 'boolean', fall: true, need: false },
  singleQuote: { like: 'boolean', fall: false, need: false },
  proseWrap: {
    like: 'prettier_prose_wrap_option',
    fall: 'preserve',
    need: false,
  },
  bracketSameLine: { like: 'boolean', fall: false, need: false },
  singleAttributePerLine: { like: 'boolean', fall: false, need: false },
}

export const format_html_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    bracketSameLine: prettier_common_option.bracketSameLine,
    htmlWhitespaceSensitivity: {
      like: 'prettier_html_whitespace_sensitivity_option',
      fall: 'css',
      need: false,
    },
    singleAttributePerLine:
      prettier_common_option.singleAttributePerLine,
    vueIndentScriptAndStyle: {
      like: 'boolean',
      fall: false,
      need: false,
    },
  },
}

export const format_graphql_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    bracketSpacing: prettier_common_option.bracketSpacing,
  },
}

export const format_css_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    singleQuote: prettier_common_option.singleQuote,
  },
}

export const format_yaml_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    bracketSpacing: prettier_common_option.bracketSpacing,
    singleQuote: prettier_common_option.singleQuote,
    proseWrap: prettier_common_option.proseWrap,
  },
}

export const format_xml_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    xmlSelfClosingSpace: { like: 'boolean', fall: true, need: false },
    indentationSize: { like: 'natural_number', fall: 2, need: false },
    xmlWhitespaceSensitivity: {
      like: 'prettier_xml_whitespace_sensitivity_option',
      fall: 'strict',
      need: false,
    },
    maxLineLength: { like: 'natural_number', fall: 80, need: false },
    xmlSortAttributesByKey: {
      like: 'boolean',
      fall: true,
      need: false,
    },
    xmlQuoteAttributes: {
      like: 'prettier_xml_quote_attributes_option',
      fall: 'preserve',
      need: false,
    },
  },
}

export const format_markdown_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    proseWrap: prettier_common_option.proseWrap,
    singleQuote: prettier_common_option.singleQuote,
  },
}

// https://nshipster.com/swift-format/#swift-format
export const prettier_plugin: List = {
  form: 'list',
  list: [
    'angular',
    'flow',
    'glimmer',
    'graphql',
    'html',
    'markdown',
    'meriyah',
    'postcss',
    'typescript',
    'yaml',
    // 'xml',
    // 'pug',
    // 'gherkin',
    // 'rust',
    // 'java',
    // 'nginx',
    // 'toml',
  ],
}

export const format_code_format: List = {
  form: 'list',
  list: prettier_plugin.list
    .slice(0)
    .concat(['python', 'swift', 'c', 'assembly', 'cpp', 'sql']),
}

export const format_code_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    format: { like: 'prettier_plugin' },
  },
}

export const format_rust_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    useTabs: { like: 'boolean', need: false },
    indentationSize: { like: 'natural_number', need: false },
    maxLineLength: { like: 'natural_number', need: false },
    endOfLine: { like: 'prettier_end_of_line_option', need: false },
  },
}

export const format_java_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    maxLineLength: { like: 'natural_number', need: false },
    indentationSize: { like: 'natural_number', need: false },
    useTabs: { like: 'boolean', need: false },
    trailingComma: { like: 'boolean', need: false },
  },
}

export const prettier_typescript_trailing_comma_option: List = {
  form: 'list',
  list: ['all', 'es5', 'none'],
}

export const format_typescript_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    jsxSingleQuote: { like: 'boolean', need: false },
    singleQuote: { like: 'boolean', need: false },
    semiColon: { like: 'boolean', need: false },
    indentationSize: { like: 'natural_number', need: false },
    maxLineLength: { like: 'natural_number', need: false },
    trailingComma: {
      like: 'prettier_typescript_trailing_comma_option',
      need: false,
    },
    bracketSpacing: { like: 'boolean', need: false },
    bracketSameLine: { like: 'boolean', need: false },
    arrowParentheses: {
      like: 'prettier_arrow_parens_option',
      need: false,
    },
    endOfLine: { like: 'prettier_end_of_line_option', need: false },
    singleAttributePerLine: { like: 'boolean', need: false },
  },
}

export const format_sh_with_prettier: Form = {
  form: 'form',
  link: {
    code: { like: 'string' },
    keepComments: { like: 'boolean', need: false },
    stopAt: { like: 'string', need: false },
    variant: { like: 'string', need: false },
    indent: { like: 'natural_number', need: false },
    binaryNextLine: { like: 'boolean', need: false },
    switchCaseIndent: { like: 'boolean', need: false },
    spaceRedirects: { like: 'boolean', need: false },
    keepPadding: { like: 'boolean', need: false },
    minify: { like: 'boolean', need: false },
    functionNextLine: { like: 'boolean', need: false },
  },
}

const format_kotlin_forms = buildFormatForms({
  name: 'format_kotlin',
  i: 'string',
})

export const format_kotlin_node_input = format_kotlin_forms.node_input

export const format_kotlin_node_remote_input =
  format_kotlin_forms.node_remote_input

export const format_kotlin_node_external_input =
  format_kotlin_forms.node_external_input

export const format_kotlin_node_client_input =
  format_kotlin_forms.node_client_input

export const format_kotlin_node_local_external_input =
  format_kotlin_forms.node_local_external_input

export const format_kotlin_node_local_internal_input =
  format_kotlin_forms.node_local_internal_input

export const format_kotlin_node_local_input =
  format_kotlin_forms.node_local_input

export const format_kotlin_node_output = format_kotlin_forms.node_output

export const format_kotlin_command_input =
  format_kotlin_forms.command_input

export const format_kotlin_browser_input =
  format_kotlin_forms.browser_input

export const format_kotlin_browser_remote_input =
  format_kotlin_forms.browser_remote_input

export const format_kotlin_browser_local_input =
  format_kotlin_forms.browser_local_input

export const format_kotlin_browser_output =
  format_kotlin_forms.browser_output

const format_swift_forms = buildFormatForms({
  name: 'format_swift',
  i: 'string',
})

export const format_swift_node_input = format_swift_forms.node_input

export const format_swift_node_remote_input =
  format_swift_forms.node_remote_input

export const format_swift_node_external_input =
  format_swift_forms.node_external_input

export const format_swift_node_client_input =
  format_swift_forms.node_client_input

export const format_swift_node_local_external_input =
  format_swift_forms.node_local_external_input

export const format_swift_node_local_internal_input =
  format_swift_forms.node_local_internal_input

export const format_swift_node_local_input =
  format_swift_forms.node_local_input

export const format_swift_node_output = format_swift_forms.node_output

export const format_swift_command_input =
  format_swift_forms.command_input

export const format_swift_browser_input =
  format_swift_forms.browser_input

export const format_swift_browser_remote_input =
  format_swift_forms.browser_remote_input

export const format_swift_browser_local_input =
  format_swift_forms.browser_local_input

export const format_swift_browser_output =
  format_swift_forms.browser_output

const format_rust_forms = buildFormatForms({
  name: 'format_rust',
  i: 'string',
})

export const format_rust_node_input = format_rust_forms.node_input

export const format_rust_node_remote_input =
  format_rust_forms.node_remote_input

export const format_rust_node_external_input =
  format_rust_forms.node_external_input

export const format_rust_node_client_input =
  format_rust_forms.node_client_input

export const format_rust_node_local_external_input =
  format_rust_forms.node_local_external_input

export const format_rust_node_local_internal_input =
  format_rust_forms.node_local_internal_input

export const format_rust_node_local_input =
  format_rust_forms.node_local_input

export const format_rust_node_output = format_rust_forms.node_output

export const format_rust_command_input = format_rust_forms.command_input

export const format_rust_browser_input = format_rust_forms.browser_input

export const format_rust_browser_remote_input =
  format_rust_forms.browser_remote_input

export const format_rust_browser_local_input =
  format_rust_forms.browser_local_input

export const format_rust_browser_output =
  format_rust_forms.browser_output

const format_python_forms = buildFormatForms({
  name: 'format_python',
  i: 'string',
})

export const format_python_node_input = format_python_forms.node_input

export const format_python_node_remote_input =
  format_python_forms.node_remote_input

export const format_python_node_external_input =
  format_python_forms.node_external_input

export const format_python_node_client_input =
  format_python_forms.node_client_input

export const format_python_node_local_external_input =
  format_python_forms.node_local_external_input

export const format_python_node_local_internal_input =
  format_python_forms.node_local_internal_input

export const format_python_node_local_input =
  format_python_forms.node_local_input

export const format_python_node_output = format_python_forms.node_output

export const format_python_command_input =
  format_python_forms.command_input

export const format_python_browser_input =
  format_python_forms.browser_input

export const format_python_browser_remote_input =
  format_python_forms.browser_remote_input

export const format_python_browser_local_input =
  format_python_forms.browser_local_input

export const format_python_browser_output =
  format_python_forms.browser_output

export const format_ruby: Form = {
  form: 'form',
  link: {
    format: { like: 'string', name: { mark: 'I' } },
    input: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
    output: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}

const format_assembly_forms = buildFormatForms({
  name: 'format_assembly',
  i: 'string',
})

export const format_assembly_node_input =
  format_assembly_forms.node_input

export const format_assembly_node_remote_input =
  format_assembly_forms.node_remote_input

export const format_assembly_node_external_input =
  format_assembly_forms.node_external_input

export const format_assembly_node_client_input =
  format_assembly_forms.node_client_input

export const format_assembly_node_local_external_input =
  format_assembly_forms.node_local_external_input

export const format_assembly_node_local_internal_input =
  format_assembly_forms.node_local_internal_input

export const format_assembly_node_local_input =
  format_assembly_forms.node_local_input

export const format_assembly_node_output =
  format_assembly_forms.node_output

export const format_assembly_command_input =
  format_assembly_forms.command_input

export const format_assembly_browser_input =
  format_assembly_forms.browser_input

export const format_assembly_browser_remote_input =
  format_assembly_forms.browser_remote_input

export const format_assembly_browser_local_input =
  format_assembly_forms.browser_local_input

export const format_assembly_browser_output =
  format_assembly_forms.browser_output

export const format_c: Form = {
  form: 'form',
  link: {
    format: { like: 'string', name: { mark: 'I' } },
    input: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
    output: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}

export const format_cpp: Form = {
  form: 'form',
  link: {
    format: { like: 'string', name: { mark: 'I' } },
    input: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
    output: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}

export const format_java: Form = {
  form: 'form',
  link: {
    format: { like: 'string', name: { mark: 'I' } },
    input: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
    output: {
      link: {
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}

export const clang_format: List = {
  form: 'list',
  list: ['c', 'cpp'],
}

const format_code_with_clang_format_forms = buildFormatForms({
  name: 'format_code_with_clang_format',
  i: 'clang_format',
  base: 'clang_style_all',
  common: {},
  commonCommand: {
    style: {
      link: {
        path: { like: 'string' },
      },
    },
  },
})

export const format_code_with_clang_format_node_input =
  format_code_with_clang_format_forms.node_input

export const format_code_with_clang_format_node_remote_input =
  format_code_with_clang_format_forms.node_remote_input

export const format_code_with_clang_format_node_external_input =
  format_code_with_clang_format_forms.node_external_input

export const format_code_with_clang_format_node_client_input =
  format_code_with_clang_format_forms.node_client_input

export const format_code_with_clang_format_node_local_external_input =
  format_code_with_clang_format_forms.node_local_external_input

export const format_code_with_clang_format_node_local_internal_input =
  format_code_with_clang_format_forms.node_local_internal_input

export const format_code_with_clang_format_node_local_input =
  format_code_with_clang_format_forms.node_local_input

export const format_code_with_clang_format_node_output =
  format_code_with_clang_format_forms.node_output

export const format_code_with_clang_format_command_input =
  format_code_with_clang_format_forms.command_input

export const format_code_with_clang_format_browser_input =
  format_code_with_clang_format_forms.browser_input

export const format_code_with_clang_format_browser_remote_input =
  format_code_with_clang_format_forms.browser_remote_input

export const format_code_with_clang_format_browser_local_input =
  format_code_with_clang_format_forms.browser_local_input

export const format_code_with_clang_format_browser_output =
  format_code_with_clang_format_forms.browser_output

export const format_sql_with_content: Form = {
  form: 'form',
  link: {
    format: { like: 'string', name: { mark: 'I' } },
    input: {
      link: {
        file: {
          link: {
            content: {
              case: [{ like: 'array_buffer' }, { like: 'string' }],
            },
          },
        },
      },
    },
  },
}

export const resolve_input_for_format_remote: Form = {
  form: 'form',
  link: _.merge(baseCommonFormat, {
    format: { like: 'string' },
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
          like: 'local_path',
          need: false,
        },
      },
    },
  }),
}

export const resolve_input_for_format_local_external: Form = {
  form: 'form',
  link: _.merge(baseCommonFormat, {
    format: { like: 'string' },
    input: {
      link: {
        file: {
          case: [
            { like: 'remote_path' },
            { like: 'file_content_with_sha256' },
          ],
        },
      },
    },
  }),
}

export const resolve_input_for_format_local_internal: Form = {
  form: 'form',
  link: _.merge(baseCommonFormat, {
    format: { like: 'string' },
    input: {
      link: {
        file: {
          case: [{ like: 'file_path' }, { like: 'file_content' }],
        },
      },
    },
  }),
}

export const format_api: Form = {
  form: 'form',
  link: {
    format: { like: 'string' },
  },
}
