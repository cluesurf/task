export type UpdateImage = {
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
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
