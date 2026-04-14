import { ArchiveFormat } from '~/code/form/object/archive'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertArchiveBrowserInput =
  | ConvertArchiveBrowserRemoteInput
  | ConvertArchiveBrowserLocalInput
export type ConvertArchiveBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: ArchiveFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: ArchiveFormat
  }
}
export type ConvertArchiveBrowserOutput = {
  file: FileContent
}
export type ConvertArchiveBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: ArchiveFormat
    file: FileContentWithSha256
  }
  output: {
    format: ArchiveFormat
  }
}
