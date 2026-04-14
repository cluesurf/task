import { LocalPath } from '~/code/form/object/file'

export type ConvertLatexWithPdfLatexCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    directory: LocalPath
    file?: LocalPath
  }
  pathScope?: string
}
