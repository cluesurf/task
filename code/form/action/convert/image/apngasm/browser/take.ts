import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithApngasmBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithApngasmBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithApngasmBrowserLocalInputParser),
])

export type ConvertImageWithApngasmBrowserInputRecord = z.infer<
  typeof ConvertImageWithApngasmBrowserInputParser
>

export const ConvertImageWithApngasmBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  delay: z.optional(z.number().int().gte(0)),
  skipDuplicates: z.optional(z.boolean()),
})

export type ConvertImageWithApngasmBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithApngasmBrowserLocalInputParser
>

export const ConvertImageWithApngasmBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithApngasmBrowserOutputRecord = z.infer<
  typeof ConvertImageWithApngasmBrowserOutputParser
>

export const ConvertImageWithApngasmBrowserRemoteInputParser = z.object(
  {
    handle: z.literal('remote'),
    input: z.object({
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    delay: z.optional(z.number().int().gte(0)),
    skipDuplicates: z.optional(z.boolean()),
  },
)

export type ConvertImageWithApngasmBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithApngasmBrowserRemoteInputParser
>
