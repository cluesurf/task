import {
  FileContent,
  FilePath,
  LocalPath,
} from '~/code/form/object/file/index'

export type ResolveInputForSanitizeLocalExternal = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForSanitizeLocalInternal = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForSanitizeRemote = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type SanitizeApi = {
  input: {
    format: string
  }
}
