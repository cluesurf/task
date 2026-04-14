import { z } from 'zod'

import { DataFormatParser } from '~/code/form/object/data/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertParquetBrowserInputParser = z.union([
  z.lazy(() => ConvertParquetBrowserRemoteInputParser),
  z.lazy(() => ConvertParquetBrowserLocalInputParser),
])

export type ConvertParquetBrowserInputRecord = z.infer<
  typeof ConvertParquetBrowserInputParser
>

export const ConvertParquetBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => DataFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => DataFormatParser),
  }),
})

export type ConvertParquetBrowserLocalInputRecord = z.infer<
  typeof ConvertParquetBrowserLocalInputParser
>

export const ConvertParquetBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertParquetBrowserOutputRecord = z.infer<
  typeof ConvertParquetBrowserOutputParser
>

export const ConvertParquetBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => DataFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => DataFormatParser),
  }),
})

export type ConvertParquetBrowserRemoteInputRecord = z.infer<
  typeof ConvertParquetBrowserRemoteInputParser
>
