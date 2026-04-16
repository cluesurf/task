import { LocalPath } from '~/code/form/object/file'

export type DisassembleWasmCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
