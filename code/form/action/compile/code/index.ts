import {
  FileContent,
  FilePath,
  LocalPath,
} from '~/code/form/object/file/index'

export type CompileApi = {
  input: {
    format: string
  }
  output: {
    format: string
  }
}
export type ResolveInputForCompileLocalExternal = {
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
export type ResolveInputForCompileLocalInternal = {
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
export type ResolveInputForCompileRemote = {
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
