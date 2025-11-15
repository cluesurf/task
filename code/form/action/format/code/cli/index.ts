import { LocalPath } from '~/code/form/object/file/index'
import { ClangFormat } from '~/code/form/action/format/code/shared/index'

export type FormatAssemblyCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatCodeWithClangFormatCommandInput = {
  format: ClangFormat
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
  style: {
    path: string
  }
}
export type FormatKotlinCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatPythonCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatRustCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatSwiftCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
