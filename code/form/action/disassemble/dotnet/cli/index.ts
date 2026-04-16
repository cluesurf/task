import { LocalPath } from '~/code/form/object/file'

export type DisassembleDotnetCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
