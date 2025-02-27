import {
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
} from '~/code/type/object/libre-office/index'
import { LocalPath } from '~/code/type/object/file/index'

export type ConvertDocumentWithLibreOfficeCommandInput = {
  input: {
    format: LibreOfficeInputFormat
    file: LocalPath
  }
  output: {
    format: LibreOfficeOutputFormat
    directory: LocalPath
  }
  pathScope?: string
}
