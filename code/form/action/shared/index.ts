import { FileContent, FilePath } from '~/code/form/object/file/index'

export type BuildBaseFileInput = {
  tool?: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type BuildBaseInputDirectoryOrFileOutputFile = {
  input: {
    directory?: {
      path: string
    }
    file?: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type BuildBaseInputFileOutputDirectory = {
  output: {
    directory: {
      path: string
    }
  }
  input: {
    file: {
      path: string
    }
  }
}
export type BuildFormatInputOutput = {
  tool?: string
  input: {
    format: string
  }
  output: {
    format: string
  }
}
export type ConvertFileBase = {
  tool?: string
  remote?: boolean
  async?: boolean
  input: {
    format: string
    file: FileContent | FilePath
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
}
export type ConvertFileBaseRemote = {
  tool?: string
  remote?: boolean
  async?: boolean
  input: {
    format: string
    file: FileContent | FilePath
  }
  output: {
    format: string
  }
}

export type Task =
  | 'decompress'
  | 'compress'
  | 'convert'
  | 'replace'
  | 'create'
  | 'remove'
  | 'rename'
  | 'update'
  | 'upload'
  | 'resize'
  | 'format'
  | 'split'
  | 'build'
  | 'slice'
  | 'read'
  | 'add'
  | 'verify'
  | 'inspect'
  | 'compile'
  | 'disassemble'
