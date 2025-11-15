import {
  PandocInputFormat,
  PandocOutputFormat,
} from '~/code/form/object/pandoc/index'
import { LocalPath } from '~/code/form/object/file/index'

export type ConvertDocumentWithPandocCommandInput = {
  input: {
    format: PandocInputFormat
    file: LocalPath
  }
  output: {
    format: PandocOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
