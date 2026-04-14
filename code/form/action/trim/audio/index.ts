export type TrimAudio = {
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
  start?: string
  end?: string
  duration?: string
}
