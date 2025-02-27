import { ArchiveFormat } from '~/code/type/object/archive/index'
import { LocalPath } from '~/code/type/object/file/index'

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
