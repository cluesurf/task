import {
  CalibreInputFormat,
  CalibreOutputFormat,
} from '~/code/type/object/calibre/index'
import { LocalPath } from '~/code/type/object/file/index'

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
