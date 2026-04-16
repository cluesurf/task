export type CompressVideoCommandInput = {
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
  crf?: string
  preset?: string
}
