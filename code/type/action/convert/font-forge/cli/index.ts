import { FontFormat } from '~/code/type/object/font/index'
import { LocalPath } from '~/code/type/object/file/index'

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
