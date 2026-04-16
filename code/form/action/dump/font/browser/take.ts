import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const DumpFontBrowserInputParser = z.union([
  z.lazy(() => DumpFontBrowserRemoteInputParser),
  z.lazy(() => DumpFontBrowserLocalInputParser),
])

export type DumpFontBrowserInputRecord = z.infer<
  typeof DumpFontBrowserInputParser
>

export const DumpFontBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  tables: z.optional(z.string()),
})

export type DumpFontBrowserLocalInputRecord = z.infer<
  typeof DumpFontBrowserLocalInputParser
>

export const DumpFontBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type DumpFontBrowserOutputRecord = z.infer<
  typeof DumpFontBrowserOutputParser
>

export const DumpFontBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  tables: z.optional(z.string()),
})

export type DumpFontBrowserRemoteInputRecord = z.infer<
  typeof DumpFontBrowserRemoteInputParser
>
