import { LocalPath } from '~/code/form/object/file'

export type EncryptFileCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  tool?: string
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
