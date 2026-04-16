export type ConvertImageWithPotraceCommandInput = {
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
  threshold?: number
  turdsize?: number
}
