import { LocalPath } from '~/code/form/object/file'

export type TrimAudioCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  start?: string
  end?: string
  duration?: string
}
