import { LocalPath } from '~/code/form/object/file'

export type CompressVideoCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  crf?: string
  preset?: string
}
