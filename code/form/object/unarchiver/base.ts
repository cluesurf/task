import {
  UnarchiverFormat,
  UnarchiverFormatContent,
} from '~/code/form/object/unarchiver'

export const UNARCHIVER_FORMAT: ReadonlyArray<UnarchiverFormat> = [
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
]

export const UNARCHIVER_FORMAT_CONTENT: UnarchiverFormatContent = {
  zip: {
    head: 'Zip',
  },
  rar: {
    head: 'RAR',
  },
  '7z': {
    head: '7z',
  },
  tar: {
    head: 'Tar',
  },
  gzip: {
    head: 'Gzip',
  },
  bzip2: {
    head: 'Bzip2',
  },
  lzma: {
    head: 'LZMA',
  },
  cab: {
    head: 'CAB',
  },
  msi: {
    head: 'MSI',
  },
  nsis: {
    head: 'NSIS',
  },
  exe: {
    head: 'EXE',
  },
  iso: {
    head: 'ISO',
  },
}
