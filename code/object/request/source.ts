import { Form, List } from '@termsurf/form'

export const command_name: List = {
  form: 'list',
  list: [
    'ffmpeg',
    'black',
    'asmfmt',
    'ktfmt',
    'convert',
    'pandoc',
    'java',
    'clang++',
    'clang',
    'llc',
    'clang-format',
    'swift-format',
    'swiftc',
    'fontforge',
    'mogrify',
    '7z',
    'inkscape',
    'unar',
    'rar',
    'pdflatex',
    'objdump',
    'rustc',
    'rustfmt',
    'rubocop',
    'shfmt',
    'zip',
    'tar',
    'exiftool',
    'ebook-convert',
    'soffice',
    'jupyter',
    'docx2pdf',
    'unoconv',
    'gifsicle',
    'patool',
    'identify',
    'perltidy',
    'pdfcrop',
  ],
}

export const command_key: List = {
  form: 'list',
  list: command_name.list.slice(0),
}

export const command: Form = {
  form: 'form',
  link: {
    name: { like: 'command_name' },
    key: { like: 'command_key' },
    link: { like: 'string', list: true },
  },
}

export const command_sequence: Form = {
  form: 'form',
  link: {
    call: { like: 'command', list: true },
  },
}

export const request: Form = {
  form: 'form',
  link: {
    path: { like: 'string' },
    body: { like: 'json' },
  },
}
