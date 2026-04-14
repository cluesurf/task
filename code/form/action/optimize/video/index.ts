export type OptimizeVideo = {
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
  videoCodec?: string
  crf?: number
  preset?: string
  width?: number
  pixelFormat?: string
  audioCodec?: string
  audioBitrate?: string
  faststart?: boolean
  silent?: boolean
}
