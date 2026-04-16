import { LocalPath } from '~/code/form/object/file'

export type CompressFontCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
}
