import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithPotraceBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithPotraceBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithPotraceBrowserLocalInputParser),
])

export type ConvertImageWithPotraceBrowserInputRecord = z.infer<
  typeof ConvertImageWithPotraceBrowserInputParser
>

export const ConvertImageWithPotraceBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  outputFormat: z.optional(z.string()),
  threshold: z.optional(z.number()),
  turdsize: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithPotraceBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithPotraceBrowserLocalInputParser
>

export const ConvertImageWithPotraceBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithPotraceBrowserOutputRecord = z.infer<
  typeof ConvertImageWithPotraceBrowserOutputParser
>

export const ConvertImageWithPotraceBrowserRemoteInputParser = z.object(
  {
    handle: z.literal('remote'),
    input: z.object({
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    outputFormat: z.optional(z.string()),
    threshold: z.optional(z.number()),
    turdsize: z.optional(z.number().int().gte(0)),
  },
)

export type ConvertImageWithPotraceBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithPotraceBrowserRemoteInputParser
>
