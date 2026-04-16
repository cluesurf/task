import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithImg2WebpBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithImg2WebpBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithImg2WebpBrowserLocalInputParser),
])

export type ConvertImageWithImg2WebpBrowserInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpBrowserInputParser
>

export const ConvertImageWithImg2WebpBrowserLocalInputParser = z.object(
  {
    handle: z.optional(z.literal('local')),
    input: z.object({
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    quality: z.optional(z.number().int().gte(0)),
    lossless: z.optional(z.boolean()),
    delay: z.optional(z.number().int().gte(0)),
    loop: z.optional(z.number().int().gte(0)),
  },
)

export type ConvertImageWithImg2WebpBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpBrowserLocalInputParser
>

export const ConvertImageWithImg2WebpBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithImg2WebpBrowserOutputRecord = z.infer<
  typeof ConvertImageWithImg2WebpBrowserOutputParser
>

export const ConvertImageWithImg2WebpBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    quality: z.optional(z.number().int().gte(0)),
    lossless: z.optional(z.boolean()),
    delay: z.optional(z.number().int().gte(0)),
    loop: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithImg2WebpBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpBrowserRemoteInputParser
>
