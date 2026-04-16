export type SubsetFontCommandInput = {
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
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
