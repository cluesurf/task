import { LocalPath } from '~/code/form/object/file'
import { FontFormat } from '~/code/form/object/font'

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
