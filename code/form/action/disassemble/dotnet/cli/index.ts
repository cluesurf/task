export type DisassembleDotnetCommandInput = {
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
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
