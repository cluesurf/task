import { LocalPath } from '~/code/form/object/file'

export type UpdateFontCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  fea: string
}
