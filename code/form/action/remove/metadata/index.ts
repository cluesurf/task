export type RemoveMetadata = {
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
}
