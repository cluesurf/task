import { LocalPath } from '~/code/form/object/file'
import {
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
} from '~/code/form/object/libre-office'

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
