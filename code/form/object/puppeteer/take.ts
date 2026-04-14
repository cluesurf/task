import { z } from 'zod'

import {
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerMarkdownInputFormat,
  PuppeteerOutputFormat,
  PuppeteerTxtInputFormat,
} from '~/code/form/object/puppeteer'
import {
  PUPPETEER_INPUT_FORMAT,
  PUPPETEER_LIFE_CYCLE_EVENT,
  PUPPETEER_MARKDOWN_INPUT_FORMAT,
  PUPPETEER_OUTPUT_FORMAT,
  PUPPETEER_TXT_INPUT_FORMAT,
} from '~/code/form/object/puppeteer/base'

export const PuppeteerInputFormatParser = z.enum(
  PUPPETEER_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PuppeteerInputFormat>

export const PuppeteerLifeCycleEventParser = z.enum(
  PUPPETEER_LIFE_CYCLE_EVENT as readonly [string, ...string[]],
) as z.ZodType<PuppeteerLifeCycleEvent>

export const PuppeteerLifeCycleEventDataParser = z.object({
  note: z.string(),
})

export type PuppeteerLifeCycleEventDataRecord = z.infer<
  typeof PuppeteerLifeCycleEventDataParser
>

export const PuppeteerMarkdownInputFormatParser = z.enum(
  PUPPETEER_MARKDOWN_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PuppeteerMarkdownInputFormat>

export const PuppeteerOutputFormatParser = z.enum(
  PUPPETEER_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PuppeteerOutputFormat>

export const PuppeteerTxtInputFormatParser = z.enum(
  PUPPETEER_TXT_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PuppeteerTxtInputFormat>
