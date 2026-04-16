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
  tool?: string
  script?: string
  profile?: string
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
  tool?: string
  script?: string
  profile?: string
  commands?: Array<string>
}
