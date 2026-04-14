import { LocalPath } from '~/code/form/object/file'
import {
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
} from '~/code/form/object/rust'

export type CompileRustCommandInput = {
  input: {
    format: RustInputFormat
    file: LocalPath
  }
  output: {
    format: RustOutputFormat
    file: LocalPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
