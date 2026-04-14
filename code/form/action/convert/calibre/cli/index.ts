import {
  CalibreInputFormat,
  CalibreOutputFormat,
} from '~/code/form/object/calibre'
import { LocalPath } from '~/code/form/object/file'

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
