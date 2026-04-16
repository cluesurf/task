import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type DisassembleWasmBrowserInput =
  | DisassembleWasmBrowserRemoteInput
  | DisassembleWasmBrowserLocalInput
export type DisassembleWasmBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
export type DisassembleWasmBrowserOutput = {
  file: FileContent
}
export type DisassembleWasmBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
