import { LocalPath } from '~/code/form/object/file'

export type FlipImageCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  horizontal?: boolean
  vertical?: boolean
}
