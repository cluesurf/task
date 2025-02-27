import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertHtmlWithPuppeteerCommandInput } from '~/code/type/action/convert/puppeteer/cli/index'
import {
  PuppeteerInputFormatParser,
  PuppeteerLifeCycleEventParser,
  PuppeteerOutputFormatParser,
} from '~/code/type/object/puppeteer/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'

let ConvertHtmlWithPuppeteerCommandInputModel: z.ZodType<ConvertHtmlWithPuppeteerCommandInput>

export const ConvertHtmlWithPuppeteerCommandInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerCommandInput> => {
    if (!ConvertHtmlWithPuppeteerCommandInputModel) {
      ConvertHtmlWithPuppeteerCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerCommandInput>
    }
    return ConvertHtmlWithPuppeteerCommandInputModel!
  }
