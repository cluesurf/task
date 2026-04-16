import { LocalPath } from '~/code/form/object/file'

export type RotateImageCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  degree: string
}
