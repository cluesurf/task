import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithInkscapeBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithInkscapeBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithInkscapeBrowserLocalInputParser),
])

export type ConvertImageWithInkscapeBrowserInputRecord = z.infer<
  typeof ConvertImageWithInkscapeBrowserInputParser
>

export const ConvertImageWithInkscapeBrowserLocalInputParser = z.object(
  {
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.string(),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.string(),
    }),
  },
)

export type ConvertImageWithInkscapeBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithInkscapeBrowserLocalInputParser
>

export const ConvertImageWithInkscapeBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithInkscapeBrowserOutputRecord = z.infer<
  typeof ConvertImageWithInkscapeBrowserOutputParser
>

export const ConvertImageWithInkscapeBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.string(),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.string(),
    }),
  })

export type ConvertImageWithInkscapeBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithInkscapeBrowserRemoteInputParser
>
