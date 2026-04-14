export type RenderFont = {
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
  text: string
  fontSize?: number
  features?: string
}
