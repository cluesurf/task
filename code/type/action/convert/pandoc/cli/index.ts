import {
  PandocInputFormat,
  PandocOutputFormat,
} from '~/code/type/object/pandoc/index'
import { LocalPath } from '~/code/type/object/file/index'

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
