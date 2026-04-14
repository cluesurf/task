import { ArchiveFormat } from '~/code/form/object/archive'
import { LocalPath } from '~/code/form/object/file'

export type ConvertArchiveCommandInput = {
  input: {
    format: ArchiveFormat
    file: LocalPath
  }
  output: {
    format: ArchiveFormat
    file: LocalPath
  }
  pathScope?: string
}
