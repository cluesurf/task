import { LocalPath } from '~/code/type/object/file/index'

export type ConvertDocumentWithJupyterCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file: LocalPath
  }
  pathScope?: string
}
