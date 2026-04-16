import { LocalPath } from '~/code/form/object/file'

export type RemoveSubtitlesCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
}
