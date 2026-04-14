export type Combine = {
  input: {
    file: {
      path: string
    }
  }
  audio: {
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
  audioCodec?: string
  audioBitrate?: string
  sampleRate?: number
  pixelFormat?: string
  tune?: string
}
