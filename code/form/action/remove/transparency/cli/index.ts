import { LocalPath } from '~/code/form/object/file'

export type RemoveTransparencyCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  background?: string
}
