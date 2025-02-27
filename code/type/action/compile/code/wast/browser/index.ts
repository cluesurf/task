import {
  WastInputFormat,
  WastOutputFormat,
} from '~/code/type/action/compile/code/wast/shared/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type CompileWastBrowserInput =
  | CompileWastBrowserRemoteInput
  | CompileWastBrowserLocalInput
export type CompileWastBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: WastInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: WastOutputFormat
  }
}
export type CompileWastBrowserOutput = {
  file: FileContent
}
export type CompileWastBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: WastInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: WastOutputFormat
  }
}
