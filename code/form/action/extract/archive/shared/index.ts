import { ArchiveFormat } from '~/code/form/object/archive'

export type ExtractWith7Z = {
  input: {
    format: string
    path: string
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
}
export type ExtractWithUnarchiver = {
  input: {
    password?: string
    format: ArchiveFormat
    file: {
      path: string
    }
  }
  output: {
    overwrite?: boolean
    directory: {
      path: string
    }
  }
}
