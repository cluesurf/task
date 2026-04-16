export type ShapeFontCommandInput = {
  input: {
    file: {
      path: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
