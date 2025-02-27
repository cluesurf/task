import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertDocumentWithPandocBrowserInput,
  ConvertDocumentWithPandocBrowserLocalInput,
  ConvertDocumentWithPandocBrowserOutput,
  ConvertDocumentWithPandocBrowserRemoteInput,
} from '~/code/type/action/convert/pandoc/browser/index'
import {
  PandocInputFormatParser,
  PandocOutputFormatParser,
} from '~/code/type/object/pandoc/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let ConvertDocumentWithPandocBrowserInputModel: z.ZodType<ConvertDocumentWithPandocBrowserInput>

export const ConvertDocumentWithPandocBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithPandocBrowserInput> => {
    if (!ConvertDocumentWithPandocBrowserInputModel) {
      ConvertDocumentWithPandocBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithPandocBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithPandocBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithPandocBrowserInputModel!
  }

let ConvertDocumentWithPandocBrowserLocalInputModel: z.ZodType<ConvertDocumentWithPandocBrowserLocalInput>

export const ConvertDocumentWithPandocBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocBrowserLocalInput> => {
    if (!ConvertDocumentWithPandocBrowserLocalInputModel) {
      ConvertDocumentWithPandocBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithPandocBrowserLocalInput>
    }
    return ConvertDocumentWithPandocBrowserLocalInputModel!
  }

let ConvertDocumentWithPandocBrowserOutputModel: z.ZodType<ConvertDocumentWithPandocBrowserOutput>

export const ConvertDocumentWithPandocBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithPandocBrowserOutput> => {
    if (!ConvertDocumentWithPandocBrowserOutputModel) {
      ConvertDocumentWithPandocBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithPandocBrowserOutput>
    }
    return ConvertDocumentWithPandocBrowserOutputModel!
  }

let ConvertDocumentWithPandocBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithPandocBrowserRemoteInput>

export const ConvertDocumentWithPandocBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithPandocBrowserRemoteInput> => {
    if (!ConvertDocumentWithPandocBrowserRemoteInputModel) {
      ConvertDocumentWithPandocBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithPandocBrowserRemoteInput>
    }
    return ConvertDocumentWithPandocBrowserRemoteInputModel!
  }
