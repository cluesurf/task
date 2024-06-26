import { Form, List } from '@termsurf/form'

export const convert_file_base: Form = {
  form: 'form',
  // leak: true,
  link: {
    tool: { like: 'string', need: false },
    remote: { like: 'boolean', need: false },
    async: { like: 'boolean', need: false, fall: false },
    input: {
      link: {
        format: { like: 'string' },
        file: {
          case: [{ like: 'file_content' }, { like: 'file_path' }],
        },
      },
    },
    output: {
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

export const convert_file_base_remote: Form = {
  form: 'form',
  // leak: true,
  link: {
    tool: { like: 'string', need: false },
    remote: { like: 'boolean', need: false },
    async: { like: 'boolean', need: false, fall: false },
    input: {
      link: {
        format: { like: 'string' },
        file: {
          case: [{ like: 'file_content' }, { like: 'file_path' }],
        },
      },
    },
    output: {
      link: {
        format: { like: 'string' },
      },
    },
  },
}

export const build_format_input_output: Form = {
  form: 'form',
  // leak: true,
  link: {
    tool: { like: 'string', need: false },
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

export const build_base_file_input: Form = {
  form: 'form',
  // leak: true,
  link: {
    tool: { like: 'string', need: false },
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

export const build_base_input_directory_or_file_output_file: Form = {
  form: 'form',
  // leak: true,
  link: {
    input: {
      link: {
        directory: {
          need: false,
          link: {
            path: { like: 'string' },
          },
        },
        file: {
          need: false,
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

export const build_base_input_file_output_directory: Form = {
  form: 'form',
  // leak: true,
  link: {
    output: {
      link: {
        directory: {
          link: {
            path: { like: 'string' },
          },
        },
      },
    },
    input: {
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

export const task: List = {
  form: 'list',
  list: [
    'decompress',
    'compress',
    'convert',
    'replace',
    'create',
    'remove',
    'rename',
    'update',
    'upload',
    'resize',
    'format',
    'split',
    'build',
    'slice',
    'read',
    'add',
    'verify',
    'inspect',
    'compile',
    'disassemble',
  ],
}

// https://github.com/muratgozel/regionist#readme

// const LanguageDetect = require('languagedetect');
// const lngDetector = new LanguageDetect();

// // OR
// // const lngDetector = new (require('languagedetect'));

// console.log(lngDetector.detect('This is a test.'));

// /*
//   [ [ 'english', 0.5969230769230769 ],
//   [ 'hungarian', 0.407948717948718 ],
//   [ 'latin', 0.39205128205128204 ],
//   [ 'french', 0.367948717948718 ],
//   [ 'portuguese', 0.3669230769230769 ],
//   [ 'estonian', 0.3507692307692307 ],
//   [ 'latvian', 0.2615384615384615 ],
//   [ 'spanish', 0.2597435897435898 ],
//   [ 'slovak', 0.25051282051282053 ],
//   [ 'dutch', 0.2482051282051282 ],
//   [ 'lithuanian', 0.2466666666666667 ],
//   ... ]
// */

// https://www.npmjs.com/package/which-lang
// https://www.npmjs.com/package/eld#languages
// https://www.npmjs.com/package/tinyld
// https://github.com/sindresorhus/binary-extensions/tree/main
// https://github.com/sindresorhus/text-extensions

// https://github.com/sweezyio/video-extensions-list/blob/master/video-extensions.json
// https://www.npmjs.com/package/dotparser
// cli argument formatter
// pegjs grammar parser
