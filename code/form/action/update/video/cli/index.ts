import { LocalPath } from '~/code/form/object/file'

export type UpdateVideoCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  subtitles?: string
}
