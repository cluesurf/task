import { ArchiveFormat, ArchiveTool } from '~/code/form/object/archive'

export type Archive = {
  tool?: ArchiveTool
  input: {
    path: string
  }
  output: {
    format: ArchiveFormat
    file: {
      path: string
    }
  }
}
