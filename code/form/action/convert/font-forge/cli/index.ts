import { FontFormat } from '~/code/form/object/font/index'
import { LocalPath } from '~/code/form/object/file/index'

export type ConvertFontWithFontForgeCommandInput = {
  input: {
    format: FontFormat
    file: LocalPath
  }
  output: {
    format: FontFormat
    file: LocalPath
  }
  pathScope?: string
}
