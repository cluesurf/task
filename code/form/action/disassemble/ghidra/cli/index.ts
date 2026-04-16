import { LocalPath } from '~/code/form/object/file'

export type DisassembleGhidraCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
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
