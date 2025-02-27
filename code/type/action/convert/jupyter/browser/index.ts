import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type ConvertDocumentWithJupyterBrowserInput =
  | ConvertDocumentWithJupyterBrowserRemoteInput
  | ConvertDocumentWithJupyterBrowserLocalInput
export type ConvertDocumentWithJupyterBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: string
    file: {
      content: FileContent
    }
  }
  output: {
    format: string
  }
}
export type ConvertDocumentWithJupyterBrowserOutput = {
  file: FileContent
}
export type ConvertDocumentWithJupyterBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileContentWithSha256
  }
  output: {
    format: string
  }
}
