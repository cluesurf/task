import {
  WastInputFormat,
  WastOutputFormat,
} from '~/code/form/action/compile/code/wast/shared'
import { LocalPath } from '~/code/form/object/file'

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
