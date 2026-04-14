import { LocalPath } from '~/code/form/object/file'
import {
  PandocInputFormat,
  PandocOutputFormat,
} from '~/code/form/object/pandoc'

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
