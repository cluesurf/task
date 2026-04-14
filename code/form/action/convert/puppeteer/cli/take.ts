import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'
import {
  PuppeteerInputFormatParser,
  PuppeteerLifeCycleEventParser,
  PuppeteerOutputFormatParser,
} from '~/code/form/object/puppeteer/take'

export const ConvertHtmlWithPuppeteerCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => PuppeteerInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
  viewport: z.object({
    width: z.optional(z.number().int().gte(0)),
    height: z.optional(z.number().int().gte(0)),
  }),
  proxy: z.optional(z.string()),
  waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
})

export type ConvertHtmlWithPuppeteerCommandInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerCommandInputParser
>
