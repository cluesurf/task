import { ArchiveFormat } from '~/code/type/object/archive/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

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
