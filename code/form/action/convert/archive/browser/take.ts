import { z } from 'zod'

import { ArchiveFormatParser } from '~/code/form/object/archive/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertArchiveBrowserInputParser = z.union([
  z.lazy(() => ConvertArchiveBrowserRemoteInputParser),
  z.lazy(() => ConvertArchiveBrowserLocalInputParser),
])

export type ConvertArchiveBrowserInputRecord = z.infer<
  typeof ConvertArchiveBrowserInputParser
>

export const ConvertArchiveBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
  }),
})

export type ConvertArchiveBrowserLocalInputRecord = z.infer<
  typeof ConvertArchiveBrowserLocalInputParser
>

export const ConvertArchiveBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertArchiveBrowserOutputRecord = z.infer<
  typeof ConvertArchiveBrowserOutputParser
>

export const ConvertArchiveBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
  }),
})

export type ConvertArchiveBrowserRemoteInputRecord = z.infer<
  typeof ConvertArchiveBrowserRemoteInputParser
>
