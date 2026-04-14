export type CompressImage = {
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
  quality?: string
}
