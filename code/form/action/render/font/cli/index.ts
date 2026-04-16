import { LocalPath } from '~/code/form/object/file'

export type RenderFontCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  text: string
  fontSize?: number
  features?: string
}
