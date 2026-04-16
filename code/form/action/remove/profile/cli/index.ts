import { LocalPath } from '~/code/form/object/file'

export type RemoveProfileCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
}
