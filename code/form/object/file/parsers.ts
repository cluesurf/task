import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  FileContent,
  FileContentWithSha256,
  FileHasOutputContent,
  FileInputPath,
  FileOutputPath,
  FilePath,
  FileReaderEncoding,
  LocalInputPath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
  RemoteOutputPath,
  RemotePath,
} from '~/code/form/object/file/index'

let FileContentModel: z.ZodType<FileContent>

export const FileContentParser = (): z.ZodType<FileContent> => {
  if (!FileContentModel) {
    FileContentModel = z.object({
      content: z.union([
        z.instanceof(ArrayBuffer),
        z.instanceof(Blob),
        z.string(),
      ]),
    }) as z.ZodType<FileContent>
  }
  return FileContentModel!
}

let FileContentWithSha256Model: z.ZodType<FileContentWithSha256>

export const FileContentWithSha256Parser =
  (): z.ZodType<FileContentWithSha256> => {
    if (!FileContentWithSha256Model) {
      FileContentWithSha256Model = z.object({
        sha256: z.string().refine(TEST('sha256', code.is_sha256.test)),
        content: z.union([
          z.instanceof(ArrayBuffer),
          z.instanceof(Blob),
          z.string(),
        ]),
      }) as z.ZodType<FileContentWithSha256>
    }
    return FileContentWithSha256Model!
  }

let FileHasOutputContentModel: z.ZodType<FileHasOutputContent>

export const FileHasOutputContentParser =
  (): z.ZodType<FileHasOutputContent> => {
    if (!FileHasOutputContentModel) {
      FileHasOutputContentModel = z.object({
        content: z.boolean(),
      }) as z.ZodType<FileHasOutputContent>
    }
    return FileHasOutputContentModel!
  }

let FileInputPathModel: z.ZodType<FileInputPath>

export const FileInputPathParser = (): z.ZodType<FileInputPath> => {
  if (!FileInputPathModel) {
    FileInputPathModel = z.object({
      path: z.string(),
    }) as z.ZodType<FileInputPath>
  }
  return FileInputPathModel!
}

let FileOutputPathModel: z.ZodType<FileOutputPath>

export const FileOutputPathParser = (): z.ZodType<FileOutputPath> => {
  if (!FileOutputPathModel) {
    FileOutputPathModel = z.object({
      path: z.string(),
    }) as z.ZodType<FileOutputPath>
  }
  return FileOutputPathModel!
}

let FilePathModel: z.ZodType<FilePath>

export const FilePathParser = (): z.ZodType<FilePath> => {
  if (!FilePathModel) {
    FilePathModel = z.object({
      path: z.string(),
    }) as z.ZodType<FilePath>
  }
  return FilePathModel!
}

let FileReaderEncodingModel: z.ZodType<FileReaderEncoding>

export const FileReaderEncodingParser = () => {
  if (!FileReaderEncodingModel) {
    FileReaderEncodingModel = z.enum(
      LOAD('file_reader_encoding') as readonly [string, ...string[]],
    ) as z.ZodType<FileReaderEncoding>
  }
  return FileReaderEncodingModel!
}

let LocalInputPathModel: z.ZodType<LocalInputPath>

export const LocalInputPathParser = (): z.ZodType<LocalInputPath> => {
  if (!LocalInputPathModel) {
    LocalInputPathModel = z.object({
      path: z.string().refine(TEST('path', code.is_local_path.test)),
    }) as z.ZodType<LocalInputPath>
  }
  return LocalInputPathModel!
}

let LocalOutputPathModel: z.ZodType<LocalOutputPath>

export const LocalOutputPathParser = (): z.ZodType<LocalOutputPath> => {
  if (!LocalOutputPathModel) {
    LocalOutputPathModel = z.object({
      path: z.string().refine(TEST('path', code.is_local_path.test)),
    }) as z.ZodType<LocalOutputPath>
  }
  return LocalOutputPathModel!
}

let LocalPathModel: z.ZodType<LocalPath>

export const LocalPathParser = (): z.ZodType<LocalPath> => {
  if (!LocalPathModel) {
    LocalPathModel = z.object({
      path: z.string().refine(TEST('path', code.is_local_path.test)),
    }) as z.ZodType<LocalPath>
  }
  return LocalPathModel!
}

let RemoteInputPathModel: z.ZodType<RemoteInputPath>

export const RemoteInputPathParser = (): z.ZodType<RemoteInputPath> => {
  if (!RemoteInputPathModel) {
    RemoteInputPathModel = z.object({
      path: z.string().refine(TEST('path', code.is_remote_path.test)),
    }) as z.ZodType<RemoteInputPath>
  }
  return RemoteInputPathModel!
}

let RemoteOutputPathModel: z.ZodType<RemoteOutputPath>

export const RemoteOutputPathParser =
  (): z.ZodType<RemoteOutputPath> => {
    if (!RemoteOutputPathModel) {
      RemoteOutputPathModel = z.object({
        path: z.string().refine(TEST('path', code.is_remote_path.test)),
      }) as z.ZodType<RemoteOutputPath>
    }
    return RemoteOutputPathModel!
  }

let RemotePathModel: z.ZodType<RemotePath>

export const RemotePathParser = (): z.ZodType<RemotePath> => {
  if (!RemotePathModel) {
    RemotePathModel = z.object({
      path: z.string().refine(TEST('path', code.is_remote_path.test)),
    }) as z.ZodType<RemotePath>
  }
  return RemotePathModel!
}
