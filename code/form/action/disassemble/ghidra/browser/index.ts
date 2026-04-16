import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type DisassembleGhidraBrowserInput =
  | DisassembleGhidraBrowserRemoteInput
  | DisassembleGhidraBrowserLocalInput
export type DisassembleGhidraBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  profile?: string
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
export type DisassembleGhidraBrowserOutput = {
  file: FileContent
}
export type DisassembleGhidraBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  profile?: string
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}
