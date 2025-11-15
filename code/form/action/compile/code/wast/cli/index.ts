import {
  WastInputFormat,
  WastOutputFormat,
} from '~/code/form/action/compile/code/wast/shared/index'
import { LocalPath } from '~/code/form/object/file/index'

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
