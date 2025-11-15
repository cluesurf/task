import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file/index'
import { ClangStyleAll } from '~/code/form/object/clang-format/index'
import { ClangFormat } from '~/code/form/action/format/code/shared/index'

export type FormatAssemblyNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatAssemblyNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatAssemblyNodeInput =
  | FormatAssemblyNodeRemoteInput
  | FormatAssemblyNodeLocalExternalInput
  | FormatAssemblyNodeLocalInternalInput
export type FormatAssemblyNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatAssemblyNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatAssemblyNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatAssemblyNodeOutput = {
  file: FilePath
}
export type FormatAssemblyNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatCodeWithClangFormatNodeClientInput = ClangStyleAll & {
  handle: 'client'
  format: ClangFormat
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatCodeWithClangFormatNodeExternalInput =
  ClangStyleAll & {
    handle: 'external'
    format: ClangFormat
    input: {
      file: RemoteInputPath | FileContentWithSha256
    }
    output: {}
  }
export type FormatCodeWithClangFormatNodeInput =
  | FormatCodeWithClangFormatNodeRemoteInput
  | FormatCodeWithClangFormatNodeLocalExternalInput
  | FormatCodeWithClangFormatNodeLocalInternalInput
export type FormatCodeWithClangFormatNodeLocalExternalInput =
  ClangStyleAll & {
    handle: 'external'
    format: ClangFormat
    input: {
      file: RemoteInputPath | FileContentWithSha256
    }
    output: {
      file?: LocalOutputPath
    }
    pathScope?: string
  }
export type FormatCodeWithClangFormatNodeLocalInput = ClangStyleAll & {
  format: ClangFormat
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatCodeWithClangFormatNodeLocalInternalInput =
  ClangStyleAll & {
    handle?: 'internal'
    format: ClangFormat
    input: {
      file: FileInputPath | FileContentWithSha256
    }
    output: {
      file?: LocalOutputPath
    }
    pathScope?: string
  }
export type FormatCodeWithClangFormatNodeOutput = ClangStyleAll & {
  file: FilePath
}
export type FormatCodeWithClangFormatNodeRemoteInput = ClangStyleAll & {
  handle: 'remote'
  format: ClangFormat
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatKotlinNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatKotlinNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatKotlinNodeInput =
  | FormatKotlinNodeRemoteInput
  | FormatKotlinNodeLocalExternalInput
  | FormatKotlinNodeLocalInternalInput
export type FormatKotlinNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatKotlinNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatKotlinNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatKotlinNodeOutput = {
  file: FilePath
}
export type FormatKotlinNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatPythonNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatPythonNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatPythonNodeInput =
  | FormatPythonNodeRemoteInput
  | FormatPythonNodeLocalExternalInput
  | FormatPythonNodeLocalInternalInput
export type FormatPythonNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatPythonNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatPythonNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatPythonNodeOutput = {
  file: FilePath
}
export type FormatPythonNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatRustNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatRustNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatRustNodeInput =
  | FormatRustNodeRemoteInput
  | FormatRustNodeLocalExternalInput
  | FormatRustNodeLocalInternalInput
export type FormatRustNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatRustNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatRustNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatRustNodeOutput = {
  file: FilePath
}
export type FormatRustNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatSwiftNodeClientInput = {
  handle: 'client'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatSwiftNodeExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {}
}
export type FormatSwiftNodeInput =
  | FormatSwiftNodeRemoteInput
  | FormatSwiftNodeLocalExternalInput
  | FormatSwiftNodeLocalInternalInput
export type FormatSwiftNodeLocalExternalInput = {
  handle: 'external'
  format: string
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatSwiftNodeLocalInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatSwiftNodeLocalInternalInput = {
  handle?: 'internal'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type FormatSwiftNodeOutput = {
  file: FilePath
}
export type FormatSwiftNodeRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
