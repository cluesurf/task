import { ArchiveFormat } from '~/code/form/object/archive/index'

export type Archive = {
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
