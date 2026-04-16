import { LocalPath } from '~/code/form/object/file'

export type DecryptFileCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
