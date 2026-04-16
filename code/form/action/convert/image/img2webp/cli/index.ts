export type ConvertImageWithImg2WebpCommandInput = {
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
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}
