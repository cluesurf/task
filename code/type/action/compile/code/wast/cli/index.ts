import {
  WastInputFormat,
  WastOutputFormat,
} from '~/code/type/action/compile/code/wast/shared/index'
import { LocalPath } from '~/code/type/object/file/index'

export type CompileWastCommandInput = {
  input: {
    format: WastInputFormat
    file: LocalPath
  }
  output: {
    format: WastOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
