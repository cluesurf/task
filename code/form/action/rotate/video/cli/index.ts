import { LocalPath } from '~/code/form/object/file'

export type RotateVideoCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  degree: string
}
