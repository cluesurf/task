import { LocalPath } from '~/code/form/object/file'

export type CompressAudioCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  bitrate?: string
}
