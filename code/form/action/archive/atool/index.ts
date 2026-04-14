import { ArchiveFormat } from '~/code/form/object/archive'

export type ArchiveWithAtool = {
  input: {
    path: string
  }
  output: {
    format: ArchiveFormat
    file: {
      path: string
    }
  }
  quiet?: boolean
  verbose?: boolean
  force?: boolean
}
