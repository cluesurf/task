import { ClangFormat } from '~/code/form/action/format/code/shared'
import { ClangStyleAll } from '~/code/form/object/clang-format'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type FormatAssemblyBrowserInput =
  | FormatAssemblyBrowserRemoteInput
  | FormatAssemblyBrowserLocalInput
export type FormatAssemblyBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatAssemblyBrowserOutput = {
  file: FileContent
}
export type FormatAssemblyBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type FormatCodeWithClangFormatBrowserInput =
  | FormatCodeWithClangFormatBrowserRemoteInput
  | FormatCodeWithClangFormatBrowserLocalInput
export type FormatCodeWithClangFormatBrowserLocalInput =
  ClangStyleAll & {
    handle?: 'local'
    format: ClangFormat
    input: {
      file: {
        content: FileContent
      }
    }
  }
export type FormatCodeWithClangFormatBrowserOutput = ClangStyleAll & {
  file: FileContent
}
export type FormatCodeWithClangFormatBrowserRemoteInput =
  ClangStyleAll & {
    handle: 'remote'
    format: ClangFormat
    input: {
      file: FileContentWithSha256
    }
  }
export type FormatKotlinBrowserInput =
  | FormatKotlinBrowserRemoteInput
  | FormatKotlinBrowserLocalInput
export type FormatKotlinBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatKotlinBrowserOutput = {
  file: FileContent
}
export type FormatKotlinBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type FormatPythonBrowserInput =
  | FormatPythonBrowserRemoteInput
  | FormatPythonBrowserLocalInput
export type FormatPythonBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatPythonBrowserOutput = {
  file: FileContent
}
export type FormatPythonBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type FormatRustBrowserInput =
  | FormatRustBrowserRemoteInput
  | FormatRustBrowserLocalInput
export type FormatRustBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatRustBrowserOutput = {
  file: FileContent
}
export type FormatRustBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
export type FormatSwiftBrowserInput =
  | FormatSwiftBrowserRemoteInput
  | FormatSwiftBrowserLocalInput
export type FormatSwiftBrowserLocalInput = {
  handle?: 'local'
  format: string
  input: {
    file: {
      content: FileContent
    }
  }
}
export type FormatSwiftBrowserOutput = {
  file: FileContent
}
export type FormatSwiftBrowserRemoteInput = {
  handle: 'remote'
  format: string
  input: {
    file: FileContentWithSha256
  }
}
