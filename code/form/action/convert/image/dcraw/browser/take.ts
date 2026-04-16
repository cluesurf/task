import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertImageWithDcrawBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithDcrawBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithDcrawBrowserLocalInputParser),
])

export type ConvertImageWithDcrawBrowserInputRecord = z.infer<
  typeof ConvertImageWithDcrawBrowserInputParser
>

export const ConvertImageWithDcrawBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  outputFormat: z.optional(z.string()),
  cameraWhiteBalance: z.optional(z.boolean()),
  srgb: z.optional(z.boolean()),
})

export type ConvertImageWithDcrawBrowserLocalInputRecord = z.infer<
  typeof ConvertImageWithDcrawBrowserLocalInputParser
>

export const ConvertImageWithDcrawBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithDcrawBrowserOutputRecord = z.infer<
  typeof ConvertImageWithDcrawBrowserOutputParser
>

export const ConvertImageWithDcrawBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  outputFormat: z.optional(z.string()),
  cameraWhiteBalance: z.optional(z.boolean()),
  srgb: z.optional(z.boolean()),
})

export type ConvertImageWithDcrawBrowserRemoteInputRecord = z.infer<
  typeof ConvertImageWithDcrawBrowserRemoteInputParser
>
