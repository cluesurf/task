import { Form, List } from '@cluesurf/form'

/**
 * `tar`-compatible output formats. GNU/BSD tar natively handles
 * `.tar` plus the compressed siblings via a per-format flag
 * (`-z`, `-j`, `-J`, `--zstd`).
 */
export const tar_output_format: List = {
  form: 'list',
  save: '~/code/form/action/archive/tar',
  list: [
    'tar',
    'tar.gz',
    'tgz',
    'tar.bz2',
    'tbz2',
    'tar.xz',
    'txz',
    'tar.zst',
    'tzst',
  ],
}

/**
 * Action input for `tar`-backed archiving. Preserves permissions,
 * symlinks, ownership (unless `--no-preserve-*` flags are wired
 * later). `compressionLevel` tunes the underlying gzip / xz / zstd
 * compressor when applicable.
 */
export const archive_with_tar: Form = {
  form: 'form',
  save: '~/code/form/action/archive/tar',
  link: {
    input: {
      link: {
        path: { like: 'string' },
      },
    },
    output: {
      link: {
        format: { like: 'tar_output_format', name: { mark: 'O' } },
        file: {
          link: { path: { like: 'string' } },
        },
      },
    },
    compressionLevel: { like: 'natural_number', need: false },
    dereference: { like: 'boolean', need: false, fall: false },
    exclude: { like: 'string', list: true, need: false },
    changeDirectory: { like: 'string', need: false },
    preserveOwner: { like: 'boolean', need: false, fall: true },
    preservePermissions: { like: 'boolean', need: false, fall: true },
  },
}
