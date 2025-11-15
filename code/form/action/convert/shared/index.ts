import {
  FileContent,
  FilePath,
  LocalPath,
} from '~/code/form/object/file/index'

export type ConvertApi = {
  input: {
    format: string
  }
  output: {
    format: string
  }
}
export type ResolveInputForConvertLocalExternal = {
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
export type ResolveInputForConvertLocalInternal = {
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
export type ResolveInputForConvertRemote = {
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
