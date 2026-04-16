import { LocalPath } from '~/code/form/object/file'

export type CompressImageCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  quality?: string
}
