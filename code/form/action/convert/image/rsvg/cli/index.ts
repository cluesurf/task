export type ConvertImageWithRsvgCommandInput = {
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
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}
