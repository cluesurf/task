import {
  DisassembleRadareProfile,
  DisassembleRadareTool,
} from '~/code/form/action/disassemble/radare/shared'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type DisassembleRadareBrowserInput =
  | DisassembleRadareBrowserRemoteInput
  | DisassembleRadareBrowserLocalInput
export type DisassembleRadareBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
export type DisassembleRadareBrowserOutput = {
  file: FileContent
}
export type DisassembleRadareBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  tool?: DisassembleRadareTool
  script?: string
  profile?: DisassembleRadareProfile
  commands?: Array<string>
}
