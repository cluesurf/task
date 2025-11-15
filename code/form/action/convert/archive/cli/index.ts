import { ArchiveFormat } from '~/code/form/object/archive/index'
import { LocalPath } from '~/code/form/object/file/index'

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
