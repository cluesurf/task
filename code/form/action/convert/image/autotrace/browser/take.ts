import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithAutotraceBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithAutotraceBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithAutotraceBrowserLocalInputParser),
])

export type ConvertImageWithAutotraceBrowserInputRecord = z.infer<
  typeof ConvertImageWithAutotraceBrowserInputParser
>

export const ConvertImageWithAutotraceBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    outputFormat: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
    despeckleLevel: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithAutotraceBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithAutotraceBrowserLocalInputParser
>

export const ConvertImageWithAutotraceBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithAutotraceBrowserOutputRecord = z.infer<
  typeof ConvertImageWithAutotraceBrowserOutputParser
>

export const ConvertImageWithAutotraceBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    outputFormat: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
    despeckleLevel: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithAutotraceBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithAutotraceBrowserRemoteInputParser
>
