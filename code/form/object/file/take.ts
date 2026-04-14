import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

import { FileReaderEncoding } from '~/code/form/object/file'
import { FILE_READER_ENCODING } from '~/code/form/object/file/base'

export const FileContentParser = z.object({
  content: z.union([
    z.instanceof(ArrayBuffer),
    z.instanceof(Blob),
    z.string(),
  ]),
})

export type FileContentRecord = z.infer<typeof FileContentParser>

export const FileContentWithSha256Parser = z.object({
  sha256: z.string().refine(TEST('sha256', code.is_sha256.test)),
  content: z.union([
    z.instanceof(ArrayBuffer),
    z.instanceof(Blob),
    z.string(),
  ]),
})

export type FileContentWithSha256Record = z.infer<
  typeof FileContentWithSha256Parser
>

export const FileHasOutputContentParser = z.object({
  content: z.boolean(),
})

export type FileHasOutputContentRecord = z.infer<
  typeof FileHasOutputContentParser
>

export const FileInputPathParser = z.object({
  path: z.string(),
})

export type FileInputPathRecord = z.infer<typeof FileInputPathParser>

export const FileOutputPathParser = z.object({
  path: z.string(),
})

export type FileOutputPathRecord = z.infer<typeof FileOutputPathParser>

export const FilePathParser = z.object({
  path: z.string(),
})

export type FilePathRecord = z.infer<typeof FilePathParser>

export const FileReaderEncodingParser = z.enum(
  FILE_READER_ENCODING as readonly [string, ...string[]],
) as z.ZodType<FileReaderEncoding>

export const LocalInputPathParser = z.object({
  path: z.string().refine(TEST('path', code.is_local_path.test)),
})

export type LocalInputPathRecord = z.infer<typeof LocalInputPathParser>

export const LocalOutputPathParser = z.object({
  path: z.string().refine(TEST('path', code.is_local_path.test)),
})

export type LocalOutputPathRecord = z.infer<
  typeof LocalOutputPathParser
>

export const LocalPathParser = z.object({
  path: z.string().refine(TEST('path', code.is_local_path.test)),
})

export type LocalPathRecord = z.infer<typeof LocalPathParser>

export const RemoteInputPathParser = z.object({
  path: z.string().refine(TEST('path', code.is_remote_path.test)),
})

export type RemoteInputPathRecord = z.infer<
  typeof RemoteInputPathParser
>

export const RemoteOutputPathParser = z.object({
  path: z.string().refine(TEST('path', code.is_remote_path.test)),
})

export type RemoteOutputPathRecord = z.infer<
  typeof RemoteOutputPathParser
>

export const RemotePathParser = z.object({
  path: z.string().refine(TEST('path', code.is_remote_path.test)),
})

export type RemotePathRecord = z.infer<typeof RemotePathParser>
