import { LocalPath } from '~/code/form/object/file'

export type DumpFontCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  tables?: string
}
