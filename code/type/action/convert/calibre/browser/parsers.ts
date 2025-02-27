import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertDocumentWithCalibreBrowserInput,
  ConvertDocumentWithCalibreBrowserLocalInput,
  ConvertDocumentWithCalibreBrowserOutput,
  ConvertDocumentWithCalibreBrowserRemoteInput,
} from '~/code/type/action/convert/calibre/browser/index'
import {
  CalibreInputFormatParser,
  CalibreOutputFormatParser,
} from '~/code/type/object/calibre/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let ConvertDocumentWithCalibreBrowserInputModel: z.ZodType<ConvertDocumentWithCalibreBrowserInput>

export const ConvertDocumentWithCalibreBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreBrowserInput> => {
    if (!ConvertDocumentWithCalibreBrowserInputModel) {
      ConvertDocumentWithCalibreBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithCalibreBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithCalibreBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithCalibreBrowserInputModel!
  }

let ConvertDocumentWithCalibreBrowserLocalInputModel: z.ZodType<ConvertDocumentWithCalibreBrowserLocalInput>

export const ConvertDocumentWithCalibreBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreBrowserLocalInput> => {
    if (!ConvertDocumentWithCalibreBrowserLocalInputModel) {
      ConvertDocumentWithCalibreBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithCalibreBrowserLocalInput>
    }
    return ConvertDocumentWithCalibreBrowserLocalInputModel!
  }

let ConvertDocumentWithCalibreBrowserOutputModel: z.ZodType<ConvertDocumentWithCalibreBrowserOutput>

export const ConvertDocumentWithCalibreBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithCalibreBrowserOutput> => {
    if (!ConvertDocumentWithCalibreBrowserOutputModel) {
      ConvertDocumentWithCalibreBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithCalibreBrowserOutput>
    }
    return ConvertDocumentWithCalibreBrowserOutputModel!
  }

let ConvertDocumentWithCalibreBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithCalibreBrowserRemoteInput>

export const ConvertDocumentWithCalibreBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreBrowserRemoteInput> => {
    if (!ConvertDocumentWithCalibreBrowserRemoteInputModel) {
      ConvertDocumentWithCalibreBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithCalibreBrowserRemoteInput>
    }
    return ConvertDocumentWithCalibreBrowserRemoteInputModel!
  }
