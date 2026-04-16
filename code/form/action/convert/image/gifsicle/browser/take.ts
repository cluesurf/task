import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithGifsicleBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithGifsicleBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithGifsicleBrowserLocalInputParser),
])

export type ConvertImageWithGifsicleBrowserInputRecord = z.infer<
  typeof ConvertImageWithGifsicleBrowserInputParser
>

export const ConvertImageWithGifsicleBrowserLocalInputParser = z.object(
  {
    handle: z.optional(z.literal('local')),
    input: z.object({
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    optimize: z.optional(z.number().int().gte(0)),
    lossy: z.optional(z.number().int().gte(0)),
    resize: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
  },
)

export type ConvertImageWithGifsicleBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithGifsicleBrowserLocalInputParser
>

export const ConvertImageWithGifsicleBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithGifsicleBrowserOutputRecord = z.infer<
  typeof ConvertImageWithGifsicleBrowserOutputParser
>

export const ConvertImageWithGifsicleBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    optimize: z.optional(z.number().int().gte(0)),
    lossy: z.optional(z.number().int().gte(0)),
    resize: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithGifsicleBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithGifsicleBrowserRemoteInputParser
>
