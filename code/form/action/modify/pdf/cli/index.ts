export type ModifyPdfCommandInput = {
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
  order?: string
  remove?: string
}
