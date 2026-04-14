export type ExtractFont = {
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
  as?: string
}
