import { ArchiveFormat } from '~/code/type/shared/index.js'
import { testConvertFileInputOutput } from '../shared.js'
import { getConfig } from '~/code/tool/shared/config.js'

export function testConvertArchive(input: any) {
  if (!testConvertFileInputOutput(input)) {
    return false
  }

  const {
    input: { format: a },
    output: { format: b },
  } = input

  if (a === b) {
    return false
  }

  const ARCHIVE_FORMAT = getConfig('archive_format')

  if (!ARCHIVE_FORMAT.includes(a as ArchiveFormat)) {
    return false
  }
  if (!ARCHIVE_FORMAT.includes(b as ArchiveFormat)) {
    return false
  }
  return true
}
