import { LocalPath } from '~/code/form/object/file'

export type ShapeFontCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
