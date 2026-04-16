import { DisassembleGhidraProfile } from '~/code/form/action/disassemble/ghidra/shared'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type DisassembleGhidraNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  profile?: DisassembleGhidraProfile
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
export type DisassembleGhidraNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  profile?: DisassembleGhidraProfile
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
export type DisassembleGhidraNodeInput =
  | DisassembleGhidraNodeRemoteInput
  | DisassembleGhidraNodeLocalExternalInput
  | DisassembleGhidraNodeLocalInternalInput
export type DisassembleGhidraNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  profile?: DisassembleGhidraProfile
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
export type DisassembleGhidraNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
  profile?: DisassembleGhidraProfile
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
export type DisassembleGhidraNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
  profile?: DisassembleGhidraProfile
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
export type DisassembleGhidraNodeOutput = {
  file: FilePath
}
export type DisassembleGhidraNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  profile?: DisassembleGhidraProfile
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
