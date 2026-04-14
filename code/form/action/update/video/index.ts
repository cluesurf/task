export type UpdateVideo = {
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path?: string
    }
  }
  subtitles?: string
}
