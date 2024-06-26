import { Form, Hash, List } from '@termsurf/form'

export const unarchiver_format: List = {
  form: 'list',
  list: [
    'zip',
    'rar',
    '7z',
    'tar',
    'gzip',
    'bzip2',
    'lzma',
    'cab',
    'msi',
    'nsis',
    'exe',
    'iso',
  ],
}

export const unarchiver_format_data: Form = {
  form: 'form',
  link: {
    head: { like: 'string' },
  },
}

// https://github.com/ashang/unar/blob/master/README.md
export const unarchiver_format_content: Hash = {
  form: 'hash',
  file: 'unarchiver',
  link: 'unarchiver_format',
  bond: {
    like: 'unarchiver_format_data',
  },
  hash: {
    zip: { head: 'Zip' },
    rar: { head: 'RAR' },
    '7z': { head: '7z' },
    tar: { head: 'Tar' },
    gzip: { head: 'Gzip' },
    bzip2: { head: 'Bzip2' },
    lzma: { head: 'LZMA' },
    cab: { head: 'CAB' },
    msi: { head: 'MSI' },
    nsis: { head: 'NSIS' },
    exe: { head: 'EXE' },
    iso: { head: 'ISO' },
  },
}
