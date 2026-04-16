export type FlipImageCommandInput = {
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
