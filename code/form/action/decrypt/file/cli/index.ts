import { DecryptFileTool } from '~/code/form/action/decrypt/file/shared'

export type DecryptFileCommandInput = {
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
  tool?: DecryptFileTool
  passphrase?: string
  identity?: string
  cipher?: string
}
