export type DisassembleRadareCommandInput = {
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
  tool?: string
  script?: string
  profile?: string
  commands?: Array<string>
}
