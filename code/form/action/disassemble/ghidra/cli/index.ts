export type DisassembleGhidraCommandInput = {
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
  profile?: string
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
