import { Form, List } from '@cluesurf/form'

/**
 * Formats `7z` can produce. Subset of `archive_format`. `7z` also
 * handles the pure-compression formats (`.gz`, `.bz2`, `.xz`, `.zst`)
 * against a single input file.
 */
export const sevenzip_output_format: List = {
  form: 'list',
  save: '~/code/form/action/archive/sevenzip',
  list: [
    '7z',
    'zip',
    'tar',
    'tar.gz',
    'tar.bz2',
    'tar.xz',
    'gz',
    'bz2',
    'xz',
    'zst',
  ],
}

/**
 * Action input for `7z`-backed archiving. `level` is 0–9 (0 =
 * store, 9 = ultra). `method` picks the compression algorithm.
 * `password` enables symmetric encryption (AES-256 for `.7z`).
 */
export const archive_with_sevenzip: Form = {
  form: 'form',
  save: '~/code/form/action/archive/sevenzip',
  link: {
    input: {
      link: {
        path: { like: 'string' },
      },
    },
    output: {
      link: {
        format: {
          like: 'sevenzip_output_format',
          name: { mark: 'O' },
        },
        file: {
          link: { path: { like: 'string' } },
        },
      },
    },
    level: { like: 'natural_number', need: false },
    method: {
      take: ['lzma2', 'lzma', 'bzip2', 'ppmd', 'deflate', 'copy'],
      need: false,
    },
    password: { like: 'string', need: false },
    encryptHeaders: { like: 'boolean', need: false, fall: false },
    solid: { like: 'boolean', need: false, fall: true },
    multithread: { like: 'natural_number', need: false },
    volumeSize: { like: 'string', need: false },
    exclude: { like: 'string', list: true, need: false },
  },
}
