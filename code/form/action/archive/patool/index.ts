import { ArchiveFormat } from '~/code/form/object/archive'

export type ArchiveWithPatool = {
  input: {
    path: string
  }
  output: {
    format: ArchiveFormat
    file: {
      path: string
    }
  }
  verbose?: boolean
  nonInteractive?: boolean
}
