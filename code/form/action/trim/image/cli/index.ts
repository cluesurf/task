import { LocalPath } from '~/code/form/object/file'

export type TrimImageCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  crop: string
}
