import { LocalPath } from '~/code/type/object/file/index'

export type ConvertImageWithInkscapeCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file: LocalPath
  }
  pathScope?: string
}
