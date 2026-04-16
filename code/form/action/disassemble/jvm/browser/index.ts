import { DisassembleJvmLevel } from '~/code/form/action/disassemble/jvm/shared'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type DisassembleJvmBrowserInput =
  | DisassembleJvmBrowserRemoteInput
  | DisassembleJvmBrowserLocalInput
export type DisassembleJvmBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
export type DisassembleJvmBrowserOutput = {
  file: FileContent
}
export type DisassembleJvmBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
