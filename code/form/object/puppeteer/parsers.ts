import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerLifeCycleEventData,
  PuppeteerMarkdownInputFormat,
  PuppeteerOutputFormat,
  PuppeteerTxtInputFormat,
} from '~/code/form/object/puppeteer/index'

let PuppeteerInputFormatModel: z.ZodType<PuppeteerInputFormat>

export const PuppeteerInputFormatParser = () => {
  if (!PuppeteerInputFormatModel) {
    PuppeteerInputFormatModel = z.enum(
      LOAD('puppeteer_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<PuppeteerInputFormat>
  }
  return PuppeteerInputFormatModel!
}

let PuppeteerLifeCycleEventModel: z.ZodType<PuppeteerLifeCycleEvent>

export const PuppeteerLifeCycleEventParser = () => {
  if (!PuppeteerLifeCycleEventModel) {
    PuppeteerLifeCycleEventModel = z.enum(
      LOAD('puppeteer_life_cycle_event') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PuppeteerLifeCycleEvent>
  }
  return PuppeteerLifeCycleEventModel!
}

let PuppeteerLifeCycleEventDataModel: z.ZodType<PuppeteerLifeCycleEventData>

export const PuppeteerLifeCycleEventDataParser =
  (): z.ZodType<PuppeteerLifeCycleEventData> => {
    if (!PuppeteerLifeCycleEventDataModel) {
      PuppeteerLifeCycleEventDataModel = z.object({
        note: z.string(),
      }) as z.ZodType<PuppeteerLifeCycleEventData>
    }
    return PuppeteerLifeCycleEventDataModel!
  }

let PuppeteerMarkdownInputFormatModel: z.ZodType<PuppeteerMarkdownInputFormat>

export const PuppeteerMarkdownInputFormatParser = () => {
  if (!PuppeteerMarkdownInputFormatModel) {
    PuppeteerMarkdownInputFormatModel = z.enum(
      LOAD('puppeteer_markdown_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PuppeteerMarkdownInputFormat>
  }
  return PuppeteerMarkdownInputFormatModel!
}

let PuppeteerOutputFormatModel: z.ZodType<PuppeteerOutputFormat>

export const PuppeteerOutputFormatParser = () => {
  if (!PuppeteerOutputFormatModel) {
    PuppeteerOutputFormatModel = z.enum(
      LOAD('puppeteer_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<PuppeteerOutputFormat>
  }
  return PuppeteerOutputFormatModel!
}

let PuppeteerTxtInputFormatModel: z.ZodType<PuppeteerTxtInputFormat>

export const PuppeteerTxtInputFormatParser = () => {
  if (!PuppeteerTxtInputFormatModel) {
    PuppeteerTxtInputFormatModel = z.enum(
      LOAD('puppeteer_txt_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PuppeteerTxtInputFormat>
  }
  return PuppeteerTxtInputFormatModel!
}
