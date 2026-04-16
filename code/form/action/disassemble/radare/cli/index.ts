import {
  DisassembleRadareProfile,
  DisassembleRadareTool,
} from '~/code/form/action/disassemble/radare/shared'

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
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
