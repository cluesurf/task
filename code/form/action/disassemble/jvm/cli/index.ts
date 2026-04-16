import { DisassembleJvmLevel } from '~/code/form/action/disassemble/jvm/shared'

export type DisassembleJvmCommandInput = {
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
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
