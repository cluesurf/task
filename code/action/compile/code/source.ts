import { Form, List } from '@termsurf/form'
import { baseCommonCompile, buildCompileForms } from './tool/source.js'
import _ from 'lodash'

export const swift_input_format: List = {
  form: 'list',
  list: ['swift'],
}

const compile_swift_forms = buildCompileForms({
  name: 'compile_swift',
  i: 'swift_input_format',
  o: 'backend_compilation_output',
})

export const compile_swift_command_input =
  compile_swift_forms.command_input

export const compile_swift_node_input = compile_swift_forms.node_input

export const compile_swift_node_remote_input =
  compile_swift_forms.node_remote_input

export const compile_swift_node_external_input =
  compile_swift_forms.node_external_input

export const compile_swift_node_client_input =
  compile_swift_forms.node_client_input

export const compile_swift_node_local_external_input =
  compile_swift_forms.node_local_external_input

export const compile_swift_node_local_internal_input =
  compile_swift_forms.node_local_internal_input

export const compile_swift_node_local_input =
  compile_swift_forms.node_local_input

export const compile_swift_node_output = compile_swift_forms.node_output

export const compile_swift_browser_input =
  compile_swift_forms.browser_input

export const compile_swift_browser_remote_input =
  compile_swift_forms.browser_remote_input

export const compile_swift_browser_local_input =
  compile_swift_forms.browser_local_input

export const compile_swift_browser_output =
  compile_swift_forms.browser_output

export const c_input_format: List = {
  form: 'list',
  list: ['c'],
}

const compile_c_forms = buildCompileForms({
  name: 'compile_c',
  i: 'c_input_format',
  o: 'backend_compilation_output',
  common: {
    output: {
      link: {
        syntax: { like: 'assembly_syntax', need: false, fall: 'intel' },
        architecture: {
          like: 'llvm_architecture',
          need: false,
          fall: 'x86_64',
        },
      },
    },
    optimizationLevel: {
      like: 'llvm_optimization_level',
      fall: '0',
      need: false,
    },
    fastMath: { like: 'boolean', fall: false, need: false },
  },
})

export const compile_c_command_input = compile_c_forms.command_input

export const compile_c_node_input = compile_c_forms.node_input

export const compile_c_node_remote_input =
  compile_c_forms.node_remote_input

export const compile_c_node_external_input =
  compile_c_forms.node_external_input

export const compile_c_node_client_input =
  compile_c_forms.node_client_input

export const compile_c_node_local_external_input =
  compile_c_forms.node_local_external_input

export const compile_c_node_local_internal_input =
  compile_c_forms.node_local_internal_input

export const compile_c_node_local_input =
  compile_c_forms.node_local_input

export const compile_c_node_output = compile_c_forms.node_output

export const compile_c_browser_input = compile_c_forms.browser_input

export const compile_c_browser_remote_input =
  compile_c_forms.browser_remote_input

export const compile_c_browser_local_input =
  compile_c_forms.browser_local_input

export const compile_c_browser_output = compile_c_forms.browser_output

export const cpp_input_format: List = {
  form: 'list',
  list: ['cpp'],
}

const compile_cpp_forms = buildCompileForms({
  name: 'compile_cpp',
  i: 'cpp_input_format',
  o: 'backend_compilation_output',
  common: {
    output: {
      link: {
        architecture: {
          like: 'llvm_architecture',
          need: false,
          fall: 'x86_64',
        },
        syntax: { like: 'assembly_syntax', need: false, fall: 'intel' },
      },
    },
    optimizationLevel: {
      like: 'llvm_optimization_level',
      fall: '0',
      need: false,
    },
    fastMath: { like: 'boolean', fall: false, need: false },
  },
})

export const compile_cpp_command_input = compile_cpp_forms.command_input

export const compile_cpp_node_input = compile_cpp_forms.node_input

export const compile_cpp_node_remote_input =
  compile_cpp_forms.node_remote_input

export const compile_cpp_node_external_input =
  compile_cpp_forms.node_external_input

export const compile_cpp_node_client_input =
  compile_cpp_forms.node_client_input

export const compile_cpp_node_local_external_input =
  compile_cpp_forms.node_local_external_input

export const compile_cpp_node_local_internal_input =
  compile_cpp_forms.node_local_internal_input

export const compile_cpp_node_local_input =
  compile_cpp_forms.node_local_input

export const compile_cpp_node_output = compile_cpp_forms.node_output

export const compile_cpp_browser_input = compile_cpp_forms.browser_input

export const compile_cpp_browser_remote_input =
  compile_cpp_forms.browser_remote_input

export const compile_cpp_browser_local_input =
  compile_cpp_forms.browser_local_input

export const compile_cpp_browser_output =
  compile_cpp_forms.browser_output

export const compile_llvm_ir_to_assembly: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
    output: {
      link: {
        syntax: { like: 'assembly_syntax', fall: 'intel', need: false },
        architecture: {
          like: 'llvm_architecture',
          fall: 'x86_64',
          need: false,
        },
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}

export const compile_java: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { like: 'string' },
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}

const compile_rust_forms = buildCompileForms({
  name: 'compile_rust',
  i: 'rust_input_format',
  o: 'rust_output_format',
  common: {
    output: {
      link: {
        optimize: { like: 'boolean', fall: false, need: false },
        target: { like: 'rust_compiler_target', need: false },
      },
    },
    explain: { like: 'boolean', fall: false, need: false },
  },
})

export const compile_rust_command_input =
  compile_rust_forms.command_input

export const compile_rust_node_input = compile_rust_forms.node_input

export const compile_rust_node_remote_input =
  compile_rust_forms.node_remote_input

export const compile_rust_node_external_input =
  compile_rust_forms.node_external_input

export const compile_rust_node_client_input =
  compile_rust_forms.node_client_input

export const compile_rust_node_local_external_input =
  compile_rust_forms.node_local_external_input

export const compile_rust_node_local_internal_input =
  compile_rust_forms.node_local_internal_input

export const compile_rust_node_local_input =
  compile_rust_forms.node_local_input

export const compile_rust_node_output = compile_rust_forms.node_output

export const compile_rust_browser_input =
  compile_rust_forms.browser_input

export const compile_rust_browser_remote_input =
  compile_rust_forms.browser_remote_input

export const compile_rust_browser_local_input =
  compile_rust_forms.browser_local_input

export const compile_rust_browser_output =
  compile_rust_forms.browser_output

export const wast_input_format: List = {
  form: 'list',
  list: ['wast'],
}

export const wast_output_format: List = {
  form: 'list',
  list: ['wasm'],
}

const compile_wast_forms = buildCompileForms({
  name: 'compile_wast',
  i: 'wast_input_format',
  o: 'wast_output_format',
})

export const compile_wast_command_input =
  compile_wast_forms.command_input

export const compile_wast_node_input = compile_wast_forms.node_input

export const compile_wast_node_remote_input =
  compile_wast_forms.node_remote_input

export const compile_wast_node_external_input =
  compile_wast_forms.node_external_input

export const compile_wast_node_client_input =
  compile_wast_forms.node_client_input

export const compile_wast_node_local_external_input =
  compile_wast_forms.node_local_external_input

export const compile_wast_node_local_internal_input =
  compile_wast_forms.node_local_internal_input

export const compile_wast_node_local_input =
  compile_wast_forms.node_local_input

export const compile_wast_node_output = compile_wast_forms.node_output

export const compile_wast_browser_input =
  compile_wast_forms.browser_input

export const compile_wast_browser_remote_input =
  compile_wast_forms.browser_remote_input

export const compile_wast_browser_local_input =
  compile_wast_forms.browser_local_input

export const compile_wast_browser_output =
  compile_wast_forms.browser_output

export const compile_llvm: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { like: 'string' },
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}

export const compile_asm: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { like: 'string' },
        file: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
  },
}

export const resolve_input_for_compile_remote: Form = {
  form: 'form',
  link: _.merge(baseCommonCompile, {
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

export const resolve_input_for_compile_local_external: Form = {
  form: 'form',
  link: _.merge(baseCommonCompile, {
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

export const resolve_input_for_compile_local_internal: Form = {
  form: 'form',
  link: _.merge(baseCommonCompile, {
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

export const compile_api: Form = {
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
