import {
  EnscriptInputFormat,
  EnscriptOutputFormat,
} from '~/code/form/object/enscript'
import { LocalPath } from '~/code/form/object/file'

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
