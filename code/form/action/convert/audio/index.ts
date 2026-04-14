export type ConvertAudio = {
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
  bitrate?: string
}
