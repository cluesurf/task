import {
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
} from '~/code/type/action/convert/latex-to-png/shared/index'
import { LocalPath } from '~/code/type/object/file/index'

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
