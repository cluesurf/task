import { LocalPath } from '~/code/form/object/file'

export type SubsetFontCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
