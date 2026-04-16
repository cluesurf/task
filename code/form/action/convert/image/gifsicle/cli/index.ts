export type ConvertImageWithGifsicleCommandInput = {
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
  optimize?: number
  lossy?: number
  resize?: string
  colors?: number
}
