export type DisassembleWasmCommandInput = {
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
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
