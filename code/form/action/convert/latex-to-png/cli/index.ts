import { LocalPath } from '~/code/form/object/file'

export type ConvertLatexToPngCommandInput = {
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
