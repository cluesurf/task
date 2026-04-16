export type ConvertImageWithFfmpegCommandInput = {
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
  fps?: number
  quality?: number
  loop?: number
  outputFormat?: string
}
