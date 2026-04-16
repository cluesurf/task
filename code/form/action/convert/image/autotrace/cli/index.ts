export type ConvertImageWithAutotraceCommandInput = {
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
  colors?: number
  despeckleLevel?: number
}
