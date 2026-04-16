import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type DumpFontBrowserInput =
  | DumpFontBrowserRemoteInput
  | DumpFontBrowserLocalInput
export type DumpFontBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  tables?: string
}
export type DumpFontBrowserOutput = {
  file: FileContent
}
export type DumpFontBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  tables?: string
}
