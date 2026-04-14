import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'
import {
  PuppeteerInputFormatParser,
  PuppeteerLifeCycleEventParser,
  PuppeteerMarkdownInputFormatParser,
  PuppeteerOutputFormatParser,
  PuppeteerTxtInputFormatParser,
} from '~/code/form/object/puppeteer/take'

export const ConvertHtmlWithPuppeteerBrowserInputParser = z.union([
  z.lazy(() => ConvertHtmlWithPuppeteerBrowserRemoteInputParser),
  z.lazy(() => ConvertHtmlWithPuppeteerBrowserLocalInputParser),
])

export type ConvertHtmlWithPuppeteerBrowserInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerBrowserInputParser
>

export const ConvertHtmlWithPuppeteerBrowserLocalInputParser = z.object(
  {
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => PuppeteerInputFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
    }),
    viewport: z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  },
)

export type ConvertHtmlWithPuppeteerBrowserLocalInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerBrowserLocalInputParser
>

export const ConvertHtmlWithPuppeteerBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertHtmlWithPuppeteerBrowserOutputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerBrowserOutputParser
>

export const ConvertHtmlWithPuppeteerBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => PuppeteerInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
    }),
    viewport: z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  })

export type ConvertHtmlWithPuppeteerBrowserRemoteInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerBrowserRemoteInputParser
>

export const ConvertMarkdownWithPuppeteerBrowserInputParser = z.union([
  z.lazy(() => ConvertMarkdownWithPuppeteerBrowserRemoteInputParser),
  z.lazy(() => ConvertMarkdownWithPuppeteerBrowserLocalInputParser),
])

export type ConvertMarkdownWithPuppeteerBrowserInputRecord = z.infer<
  typeof ConvertMarkdownWithPuppeteerBrowserInputParser
>

export const ConvertMarkdownWithPuppeteerBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => PuppeteerMarkdownInputFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
    }),
  })

export type ConvertMarkdownWithPuppeteerBrowserLocalInputRecord =
  z.infer<typeof ConvertMarkdownWithPuppeteerBrowserLocalInputParser>

export const ConvertMarkdownWithPuppeteerBrowserOutputParser = z.object(
  {
    file: z.lazy(() => FileContentParser),
  },
)

export type ConvertMarkdownWithPuppeteerBrowserOutputRecord = z.infer<
  typeof ConvertMarkdownWithPuppeteerBrowserOutputParser
>

export const ConvertMarkdownWithPuppeteerBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => PuppeteerMarkdownInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
    }),
  })

export type ConvertMarkdownWithPuppeteerBrowserRemoteInputRecord =
  z.infer<typeof ConvertMarkdownWithPuppeteerBrowserRemoteInputParser>

export const ConvertTxtWithPuppeteerBrowserInputParser = z.union([
  z.lazy(() => ConvertTxtWithPuppeteerBrowserRemoteInputParser),
  z.lazy(() => ConvertTxtWithPuppeteerBrowserLocalInputParser),
])

export type ConvertTxtWithPuppeteerBrowserInputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerBrowserInputParser
>

export const ConvertTxtWithPuppeteerBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => PuppeteerTxtInputFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
  }),
})

export type ConvertTxtWithPuppeteerBrowserLocalInputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerBrowserLocalInputParser
>

export const ConvertTxtWithPuppeteerBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertTxtWithPuppeteerBrowserOutputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerBrowserOutputParser
>

export const ConvertTxtWithPuppeteerBrowserRemoteInputParser = z.object(
  {
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => PuppeteerTxtInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
    }),
  },
)

export type ConvertTxtWithPuppeteerBrowserRemoteInputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerBrowserRemoteInputParser
>
