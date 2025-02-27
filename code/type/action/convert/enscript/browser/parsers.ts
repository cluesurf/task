import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertDocumentWithEnscriptBrowserInput,
  ConvertDocumentWithEnscriptBrowserLocalInput,
  ConvertDocumentWithEnscriptBrowserOutput,
  ConvertDocumentWithEnscriptBrowserRemoteInput,
} from '~/code/type/action/convert/enscript/browser/index'
import {
  EnscriptInputFormatParser,
  EnscriptOutputFormatParser,
} from '~/code/type/object/enscript/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let ConvertDocumentWithEnscriptBrowserInputModel: z.ZodType<ConvertDocumentWithEnscriptBrowserInput>

export const ConvertDocumentWithEnscriptBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptBrowserInput> => {
    if (!ConvertDocumentWithEnscriptBrowserInputModel) {
      ConvertDocumentWithEnscriptBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithEnscriptBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithEnscriptBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithEnscriptBrowserInputModel!
  }

let ConvertDocumentWithEnscriptBrowserLocalInputModel: z.ZodType<ConvertDocumentWithEnscriptBrowserLocalInput>

export const ConvertDocumentWithEnscriptBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptBrowserLocalInput> => {
    if (!ConvertDocumentWithEnscriptBrowserLocalInputModel) {
      ConvertDocumentWithEnscriptBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithEnscriptBrowserLocalInput>
    }
    return ConvertDocumentWithEnscriptBrowserLocalInputModel!
  }

let ConvertDocumentWithEnscriptBrowserOutputModel: z.ZodType<ConvertDocumentWithEnscriptBrowserOutput>

export const ConvertDocumentWithEnscriptBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptBrowserOutput> => {
    if (!ConvertDocumentWithEnscriptBrowserOutputModel) {
      ConvertDocumentWithEnscriptBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithEnscriptBrowserOutput>
    }
    return ConvertDocumentWithEnscriptBrowserOutputModel!
  }

let ConvertDocumentWithEnscriptBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithEnscriptBrowserRemoteInput>

export const ConvertDocumentWithEnscriptBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptBrowserRemoteInput> => {
    if (!ConvertDocumentWithEnscriptBrowserRemoteInputModel) {
      ConvertDocumentWithEnscriptBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithEnscriptBrowserRemoteInput>
    }
    return ConvertDocumentWithEnscriptBrowserRemoteInputModel!
  }
