import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithRawtherapeeBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithRawtherapeeBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithRawtherapeeBrowserLocalInputParser),
])

export type ConvertImageWithRawtherapeeBrowserInputRecord = z.infer<
  typeof ConvertImageWithRawtherapeeBrowserInputParser
>

export const ConvertImageWithRawtherapeeBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    profile: z.optional(z.string()),
    jpegQuality: z.optional(z.number().int().gte(0)),
    tiffCompression: z.optional(z.string()),
  })

export type ConvertImageWithRawtherapeeBrowserLocalInputRecord =
  z.infer<typeof ConvertImageWithRawtherapeeBrowserLocalInputParser>

export const ConvertImageWithRawtherapeeBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithRawtherapeeBrowserOutputRecord = z.infer<
  typeof ConvertImageWithRawtherapeeBrowserOutputParser
>

export const ConvertImageWithRawtherapeeBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    profile: z.optional(z.string()),
    jpegQuality: z.optional(z.number().int().gte(0)),
    tiffCompression: z.optional(z.string()),
  })

export type ConvertImageWithRawtherapeeBrowserRemoteInputRecord =
  z.infer<typeof ConvertImageWithRawtherapeeBrowserRemoteInputParser>
