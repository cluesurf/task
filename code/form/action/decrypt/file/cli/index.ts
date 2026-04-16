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
  tool?: string
  passphrase?: string
  identity?: string
  cipher?: string
}
