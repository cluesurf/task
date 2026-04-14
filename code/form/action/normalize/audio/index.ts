export type NormalizeAudio = {
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
