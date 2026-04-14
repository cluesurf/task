export type FlipImage = {
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
  horizontal?: boolean
  vertical?: boolean
}
