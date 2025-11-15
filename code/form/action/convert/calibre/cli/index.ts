import {
  CalibreInputFormat,
  CalibreOutputFormat,
} from '~/code/form/object/calibre/index'
import { LocalPath } from '~/code/form/object/file/index'

export type ConvertDocumentWithCalibreCommandInput = {
  input: {
    format: CalibreInputFormat
    file: LocalPath
  }
  output: {
    format: CalibreOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
