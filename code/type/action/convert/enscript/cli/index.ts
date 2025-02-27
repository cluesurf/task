import {
  EnscriptInputFormat,
  EnscriptOutputFormat,
} from '~/code/type/object/enscript/index'
import { LocalPath } from '~/code/type/object/file/index'

export type ConvertDocumentWithEnscriptCommandInput = {
  input: {
    format: EnscriptInputFormat
    file: LocalPath
  }
  output: {
    format: EnscriptOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
