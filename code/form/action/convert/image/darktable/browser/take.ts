import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithDarktableBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithDarktableBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithDarktableBrowserLocalInputParser),
])

export type ConvertImageWithDarktableBrowserInputRecord = z.infer<
  typeof ConvertImageWithDarktableBrowserInputParser
>

export const ConvertImageWithDarktableBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    xmp: z.optional(z.string()),
    highQuality: z.optional(z.boolean()),
    upscale: z.optional(z.boolean()),
  })

export type ConvertImageWithDarktableBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithDarktableBrowserLocalInputParser
>

export const ConvertImageWithDarktableBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithDarktableBrowserOutputRecord = z.infer<
  typeof ConvertImageWithDarktableBrowserOutputParser
>

export const ConvertImageWithDarktableBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    xmp: z.optional(z.string()),
    highQuality: z.optional(z.boolean()),
    upscale: z.optional(z.boolean()),
  })

export type ConvertImageWithDarktableBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithDarktableBrowserRemoteInputParser
>
