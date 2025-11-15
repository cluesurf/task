import { Form, List } from '@cluesurf/form'

export const file_reader_encoding: List = {
  form: 'list',
  save: '~/code/form/object/file',
  list: [
    'utf-8',
    'ibm866',
    'iso-8859-2',
    'iso-8859-3',
    'iso-8859-4',
    'iso-8859-5',
    'iso-8859-6',
    'iso-8859-7',
    'iso-8859-8',
    'iso-8859-8-i',
    'iso-8859-10',
    'iso-8859-13',
    'iso-8859-14',
    'iso-8859-15',
    'iso-8859-16',
    'koi8-r',
    'koi8-u',
    'macintosh',
    'windows-874',
    'windows-1250',
    'windows-1251',
    'windows-1252',
    'windows-1253',
    'windows-1254',
    'windows-1255',
    'windows-1256',
    'windows-1257',
    'windows-1258',
    'x-mac-cyrillic',
  ],
}

export const file_input_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: { like: 'string', name: { mark: 'i' } },
  },
}

export const file_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: { like: 'string' },
  },
}

export const remote_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: { like: 'string', test: 'is_remote_path' },
  },
}

export const remote_input_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: {
      like: 'string',
      test: 'is_remote_path',
      name: { mark: 'i' },
    },
  },
}

export const remote_output_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: {
      like: 'string',
      test: 'is_remote_path',
      name: { mark: 'o' },
    },
  },
}

export const local_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: { like: 'string', test: 'is_local_path' },
  },
}

export const local_input_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: {
      like: 'string',
      test: 'is_local_path',
      name: { mark: 'i' },
    },
  },
}

export const local_output_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: {
      like: 'string',
      test: 'is_local_path',
      name: { mark: 'o' },
    },
  },
}

export const file_output_path: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    path: { like: 'string', name: { mark: 'o' } },
  },
}

export const file_content: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    content: {
      case: [
        { like: 'array_buffer' },
        { like: 'blob' },
        { like: 'string' },
      ],
    },
  },
}

export const file_content_with_sha256: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    sha256: { like: 'string', test: 'is_sha256' },
    content: {
      case: [
        { like: 'array_buffer' },
        { like: 'blob' },
        { like: 'string' },
      ],
    },
  },
}

export const file_has_output_content: Form = {
  form: 'form',
  save: '~/code/form/object/file',
  link: {
    content: { like: 'boolean' },
  },
}
