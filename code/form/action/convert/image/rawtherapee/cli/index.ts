export type ConvertImageWithRawtherapeeCommandInput = {
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
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}
