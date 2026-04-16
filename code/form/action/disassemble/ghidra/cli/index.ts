import { DisassembleGhidraProfile } from '~/code/form/action/disassemble/ghidra/shared'

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
  profile?: DisassembleGhidraProfile
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
