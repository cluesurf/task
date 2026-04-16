export type ConvertImageWithDcrawCommandInput = {
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
  cameraWhiteBalance?: boolean
  srgb?: boolean
}
