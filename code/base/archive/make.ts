import { List } from '@cluesurf/form'

/**
 * Canonical output formats for `task.archive(...)`. Covers the
 * union of what zip, rar, 7z, tar (with its compression backends),
 * atool, and patool can produce. Per-tool helpers further narrow
 * this list to the subset each tool actually supports.
 */
export const archive_format: List = {
  form: 'list',
  save: '~/code/form/object/archive',
  list: [
    'zip',
    'rar',
    '7z',
    'tar',
    'tar.gz',
    'tar.bz2',
    'tar.xz',
    'tar.zst',
    'tgz',
    'tbz2',
    'txz',
    'tzst',
    'gz',
    'bz2',
    'xz',
    'zst',
  ],
}

/** Archive-or-extract tool identifier, used as a `tool` override. */
export const archive_tool: List = {
  form: 'list',
  save: '~/code/form/object/archive',
  list: ['zip', 'rar', '7z', 'tar', 'unar', 'atool', 'patool'],
}
