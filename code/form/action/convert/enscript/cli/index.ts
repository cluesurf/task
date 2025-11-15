import {
  EnscriptInputFormat,
  EnscriptOutputFormat,
} from '~/code/form/object/enscript/index'
import { LocalPath } from '~/code/form/object/file/index'

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
