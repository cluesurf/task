import { ArchiveFormat } from '~/code/type/object/archive/index'

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
