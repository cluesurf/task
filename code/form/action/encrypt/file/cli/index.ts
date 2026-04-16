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
  tool?: string
  passphrase?: string
  recipients?: Array<string>
  cipher?: string
  armor?: boolean
}
