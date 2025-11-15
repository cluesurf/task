import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertHtmlWithPuppeteerBrowserInput,
  ConvertHtmlWithPuppeteerBrowserLocalInput,
  ConvertHtmlWithPuppeteerBrowserOutput,
  ConvertHtmlWithPuppeteerBrowserRemoteInput,
  ConvertMarkdownWithPuppeteerBrowserInput,
  ConvertMarkdownWithPuppeteerBrowserLocalInput,
  ConvertMarkdownWithPuppeteerBrowserOutput,
  ConvertMarkdownWithPuppeteerBrowserRemoteInput,
  ConvertTxtWithPuppeteerBrowserInput,
  ConvertTxtWithPuppeteerBrowserLocalInput,
  ConvertTxtWithPuppeteerBrowserOutput,
  ConvertTxtWithPuppeteerBrowserRemoteInput,
} from '~/code/form/action/convert/puppeteer/browser/index'
import {
  PuppeteerInputFormatParser,
  PuppeteerLifeCycleEventParser,
  PuppeteerMarkdownInputFormatParser,
  PuppeteerOutputFormatParser,
  PuppeteerTxtInputFormatParser,
} from '~/code/form/object/puppeteer/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'

let ConvertHtmlWithPuppeteerBrowserInputModel: z.ZodType<ConvertHtmlWithPuppeteerBrowserInput>

export const ConvertHtmlWithPuppeteerBrowserInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerBrowserInput> => {
    if (!ConvertHtmlWithPuppeteerBrowserInputModel) {
      ConvertHtmlWithPuppeteerBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertHtmlWithPuppeteerBrowserRemoteInputParser(),
        ),
        z.lazy(() => ConvertHtmlWithPuppeteerBrowserLocalInputParser()),
      ])
    }
    return ConvertHtmlWithPuppeteerBrowserInputModel!
  }

let ConvertHtmlWithPuppeteerBrowserLocalInputModel: z.ZodType<ConvertHtmlWithPuppeteerBrowserLocalInput>

export const ConvertHtmlWithPuppeteerBrowserLocalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerBrowserLocalInput> => {
    if (!ConvertHtmlWithPuppeteerBrowserLocalInputModel) {
      ConvertHtmlWithPuppeteerBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerBrowserLocalInput>
    }
    return ConvertHtmlWithPuppeteerBrowserLocalInputModel!
  }

let ConvertHtmlWithPuppeteerBrowserOutputModel: z.ZodType<ConvertHtmlWithPuppeteerBrowserOutput>

export const ConvertHtmlWithPuppeteerBrowserOutputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerBrowserOutput> => {
    if (!ConvertHtmlWithPuppeteerBrowserOutputModel) {
      ConvertHtmlWithPuppeteerBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertHtmlWithPuppeteerBrowserOutput>
    }
    return ConvertHtmlWithPuppeteerBrowserOutputModel!
  }

let ConvertHtmlWithPuppeteerBrowserRemoteInputModel: z.ZodType<ConvertHtmlWithPuppeteerBrowserRemoteInput>

export const ConvertHtmlWithPuppeteerBrowserRemoteInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerBrowserRemoteInput> => {
    if (!ConvertHtmlWithPuppeteerBrowserRemoteInputModel) {
      ConvertHtmlWithPuppeteerBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerBrowserRemoteInput>
    }
    return ConvertHtmlWithPuppeteerBrowserRemoteInputModel!
  }

let ConvertMarkdownWithPuppeteerBrowserInputModel: z.ZodType<ConvertMarkdownWithPuppeteerBrowserInput>

export const ConvertMarkdownWithPuppeteerBrowserInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerBrowserInput> => {
    if (!ConvertMarkdownWithPuppeteerBrowserInputModel) {
      ConvertMarkdownWithPuppeteerBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertMarkdownWithPuppeteerBrowserInputModel!
  }

let ConvertMarkdownWithPuppeteerBrowserLocalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerBrowserLocalInput>

export const ConvertMarkdownWithPuppeteerBrowserLocalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerBrowserLocalInput> => {
    if (!ConvertMarkdownWithPuppeteerBrowserLocalInputModel) {
      ConvertMarkdownWithPuppeteerBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerBrowserLocalInput>
    }
    return ConvertMarkdownWithPuppeteerBrowserLocalInputModel!
  }

let ConvertMarkdownWithPuppeteerBrowserOutputModel: z.ZodType<ConvertMarkdownWithPuppeteerBrowserOutput>

export const ConvertMarkdownWithPuppeteerBrowserOutputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerBrowserOutput> => {
    if (!ConvertMarkdownWithPuppeteerBrowserOutputModel) {
      ConvertMarkdownWithPuppeteerBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerBrowserOutput>
    }
    return ConvertMarkdownWithPuppeteerBrowserOutputModel!
  }

let ConvertMarkdownWithPuppeteerBrowserRemoteInputModel: z.ZodType<ConvertMarkdownWithPuppeteerBrowserRemoteInput>

export const ConvertMarkdownWithPuppeteerBrowserRemoteInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerBrowserRemoteInput> => {
    if (!ConvertMarkdownWithPuppeteerBrowserRemoteInputModel) {
      ConvertMarkdownWithPuppeteerBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerBrowserRemoteInput>
    }
    return ConvertMarkdownWithPuppeteerBrowserRemoteInputModel!
  }

let ConvertTxtWithPuppeteerBrowserInputModel: z.ZodType<ConvertTxtWithPuppeteerBrowserInput>

export const ConvertTxtWithPuppeteerBrowserInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerBrowserInput> => {
    if (!ConvertTxtWithPuppeteerBrowserInputModel) {
      ConvertTxtWithPuppeteerBrowserInputModel = z.union([
        z.lazy(() => ConvertTxtWithPuppeteerBrowserRemoteInputParser()),
        z.lazy(() => ConvertTxtWithPuppeteerBrowserLocalInputParser()),
      ])
    }
    return ConvertTxtWithPuppeteerBrowserInputModel!
  }

let ConvertTxtWithPuppeteerBrowserLocalInputModel: z.ZodType<ConvertTxtWithPuppeteerBrowserLocalInput>

export const ConvertTxtWithPuppeteerBrowserLocalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerBrowserLocalInput> => {
    if (!ConvertTxtWithPuppeteerBrowserLocalInputModel) {
      ConvertTxtWithPuppeteerBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertTxtWithPuppeteerBrowserLocalInput>
    }
    return ConvertTxtWithPuppeteerBrowserLocalInputModel!
  }

let ConvertTxtWithPuppeteerBrowserOutputModel: z.ZodType<ConvertTxtWithPuppeteerBrowserOutput>

export const ConvertTxtWithPuppeteerBrowserOutputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerBrowserOutput> => {
    if (!ConvertTxtWithPuppeteerBrowserOutputModel) {
      ConvertTxtWithPuppeteerBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertTxtWithPuppeteerBrowserOutput>
    }
    return ConvertTxtWithPuppeteerBrowserOutputModel!
  }

let ConvertTxtWithPuppeteerBrowserRemoteInputModel: z.ZodType<ConvertTxtWithPuppeteerBrowserRemoteInput>

export const ConvertTxtWithPuppeteerBrowserRemoteInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerBrowserRemoteInput> => {
    if (!ConvertTxtWithPuppeteerBrowserRemoteInputModel) {
      ConvertTxtWithPuppeteerBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertTxtWithPuppeteerBrowserRemoteInput>
    }
    return ConvertTxtWithPuppeteerBrowserRemoteInputModel!
  }
