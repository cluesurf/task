export type PadAudioCommandInput = {
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
  to: string
  sampleRate?: number
  channels?: number
}
