import { ArchiveFormat } from '~/code/type/shared'
import { testConvertFileInputOutput } from '../shared'
import { getConfig } from '~/code/tool/shared/config'

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
