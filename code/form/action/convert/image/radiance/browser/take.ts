import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithRadianceBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithRadianceBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithRadianceBrowserLocalInputParser),
])

export type ConvertImageWithRadianceBrowserInputRecord = z.infer<
  typeof ConvertImageWithRadianceBrowserInputParser
>

export const ConvertImageWithRadianceBrowserLocalInputParser = z.object(
  {
    handle: z.optional(z.literal('local')),
    input: z.object({
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    reverse: z.optional(z.boolean()),
  },
)

export type ConvertImageWithRadianceBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithRadianceBrowserLocalInputParser
>

export const ConvertImageWithRadianceBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithRadianceBrowserOutputRecord = z.infer<
  typeof ConvertImageWithRadianceBrowserOutputParser
>

export const ConvertImageWithRadianceBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    reverse: z.optional(z.boolean()),
  })

export type ConvertImageWithRadianceBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithRadianceBrowserRemoteInputParser
>
