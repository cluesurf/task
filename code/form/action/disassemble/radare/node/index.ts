import {
  DisassembleRadareProfile,
  DisassembleRadareTool,
} from '~/code/form/action/disassemble/radare/shared'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type DisassembleRadareNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
export type DisassembleRadareNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
export type DisassembleRadareNodeInput =
  | DisassembleRadareNodeRemoteInput
  | DisassembleRadareNodeLocalExternalInput
  | DisassembleRadareNodeLocalInternalInput
export type DisassembleRadareNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
export type DisassembleRadareNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
export type DisassembleRadareNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
export type DisassembleRadareNodeOutput = {
  file: FilePath
}
export type DisassembleRadareNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
