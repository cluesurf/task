export type NormalizeAudioCommandInput = {
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
  target?: string
  peak?: string
  range?: string
}
