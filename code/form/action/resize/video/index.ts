export type ResizeVideo = {
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
  width?: number
  height?: number
}
