import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'
import { FontFormatParser } from '~/code/form/object/font/take'

export const ConvertFontWithFontForgeBrowserInputParser = z.union([
  z.lazy(() => ConvertFontWithFontForgeBrowserRemoteInputParser),
  z.lazy(() => ConvertFontWithFontForgeBrowserLocalInputParser),
])

export type ConvertFontWithFontForgeBrowserInputRecord = z.infer<
  typeof ConvertFontWithFontForgeBrowserInputParser
>

export const ConvertFontWithFontForgeBrowserLocalInputParser = z.object(
  {
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => FontFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => FontFormatParser),
    }),
  },
)

export type ConvertFontWithFontForgeBrowserLocalInputRecord = z.infer<
  typeof ConvertFontWithFontForgeBrowserLocalInputParser
>

export const ConvertFontWithFontForgeBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertFontWithFontForgeBrowserOutputRecord = z.infer<
  typeof ConvertFontWithFontForgeBrowserOutputParser
>

export const ConvertFontWithFontForgeBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => FontFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => FontFormatParser),
    }),
  })

export type ConvertFontWithFontForgeBrowserRemoteInputRecord = z.infer<
  typeof ConvertFontWithFontForgeBrowserRemoteInputParser
>
