import { LocalPath } from '~/code/form/object/file'

export type DisassembleRadareCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  tool?: string
  script?: string
  profile?: string
  commands?: Array<string>
}
