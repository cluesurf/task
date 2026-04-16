export type SplitAudioCommandInput = {
  input: {
    file: {
      path: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
