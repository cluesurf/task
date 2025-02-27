export type ConvertMp4ToGifWithFfmpeg = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
  fps: number
  width: number
  startTime: number | string
  endTime: number | string
  duration: number | string
}
