import {
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
} from '~/code/form/object/rust/index'
import { LocalPath } from '~/code/form/object/file/index'

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
