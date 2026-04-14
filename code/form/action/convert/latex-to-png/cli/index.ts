import {
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
} from '~/code/form/action/convert/latex-to-png/shared'
import { LocalPath } from '~/code/form/object/file'

export type ConvertLatexToPngCommandInput = {
  input: {
    format: ConvertLatexToPngInputFormat
    file: LocalPath
  }
  output: {
    format: ConvertLatexToPngOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
