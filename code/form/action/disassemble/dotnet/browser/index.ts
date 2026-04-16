import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type DisassembleDotnetBrowserInput =
  | DisassembleDotnetBrowserRemoteInput
  | DisassembleDotnetBrowserLocalInput
export type DisassembleDotnetBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
export type DisassembleDotnetBrowserOutput = {
  file: FileContent
}
export type DisassembleDotnetBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
