import { LocalPath } from '~/code/form/object/file'

export type ConvertImageWithInkscapeCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
}
