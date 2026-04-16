import { EncryptFileTool } from '~/code/form/action/encrypt/file/shared'

export type EncryptFileCommandInput = {
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
  tool?: EncryptFileTool
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
