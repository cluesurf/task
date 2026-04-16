import { LocalPath } from '~/code/form/object/file'

export type DisassembleJvmCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  level?: string
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
