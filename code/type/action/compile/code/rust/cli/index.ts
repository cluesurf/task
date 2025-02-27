import {
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
} from '~/code/type/object/rust/index'
import { LocalPath } from '~/code/type/object/file/index'

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
