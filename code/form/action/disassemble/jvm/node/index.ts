import { DisassembleJvmLevel } from '~/code/form/action/disassemble/jvm/shared'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type DisassembleJvmNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
export type DisassembleJvmNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
export type DisassembleJvmNodeInput =
  | DisassembleJvmNodeRemoteInput
  | DisassembleJvmNodeLocalExternalInput
  | DisassembleJvmNodeLocalInternalInput
export type DisassembleJvmNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
export type DisassembleJvmNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
export type DisassembleJvmNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
export type DisassembleJvmNodeOutput = {
  file: FilePath
}
export type DisassembleJvmNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}
