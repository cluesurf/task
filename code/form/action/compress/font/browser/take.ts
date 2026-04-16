import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const CompressFontBrowserInputParser = z.union([
  z.lazy(() => CompressFontBrowserRemoteInputParser),
  z.lazy(() => CompressFontBrowserLocalInputParser),
])

export type CompressFontBrowserInputRecord = z.infer<
  typeof CompressFontBrowserInputParser
>

export const CompressFontBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type CompressFontBrowserLocalInputRecord = z.infer<
  typeof CompressFontBrowserLocalInputParser
>

export const CompressFontBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompressFontBrowserOutputRecord = z.infer<
  typeof CompressFontBrowserOutputParser
>

export const CompressFontBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type CompressFontBrowserRemoteInputRecord = z.infer<
  typeof CompressFontBrowserRemoteInputParser
>
