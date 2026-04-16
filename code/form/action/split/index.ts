export type Split = {
  input: {
    file: {
      path: string
    }
  }
  output?: {
    file: {
      path?: string
    }
  }
  pages: string
}
