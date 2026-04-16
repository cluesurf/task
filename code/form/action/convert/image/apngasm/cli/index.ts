export type ConvertImageWithApngasmCommandInput = {
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
  delay?: number
  skipDuplicates?: boolean
}
