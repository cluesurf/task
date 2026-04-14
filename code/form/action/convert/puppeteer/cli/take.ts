import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'
import { PuppeteerLifeCycleEventParser } from '~/code/form/object/puppeteer/take'

export const ConvertHtmlWithPuppeteerCommandInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.string(),
    file: z.optional(z.lazy(() => LocalPathParser)),
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
