import { LocalPath } from '~/code/form/object/file'

export type RemovePasswordCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  password?: string
}
