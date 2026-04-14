export type DumpFont = {
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
  tables?: string
}
