import { LocalPath } from '~/code/form/object/file'

export type NormalizeAudioCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  target?: string
  peak?: string
  range?: string
}
