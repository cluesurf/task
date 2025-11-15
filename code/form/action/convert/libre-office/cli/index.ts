import {
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
} from '~/code/form/object/libre-office/index'
import { LocalPath } from '~/code/form/object/file/index'

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
