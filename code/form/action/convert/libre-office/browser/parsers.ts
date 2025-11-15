import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertDocumentWithLibreOfficeBrowserInput,
  ConvertDocumentWithLibreOfficeBrowserLocalInput,
  ConvertDocumentWithLibreOfficeBrowserOutput,
  ConvertDocumentWithLibreOfficeBrowserRemoteInput,
} from '~/code/form/action/convert/libre-office/browser/index'
import {
  LibreOfficeInputFormatParser,
  LibreOfficeOutputFormatParser,
} from '~/code/form/object/libre-office/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'

let ConvertDocumentWithLibreOfficeBrowserInputModel: z.ZodType<ConvertDocumentWithLibreOfficeBrowserInput>

export const ConvertDocumentWithLibreOfficeBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeBrowserInput> => {
    if (!ConvertDocumentWithLibreOfficeBrowserInputModel) {
      ConvertDocumentWithLibreOfficeBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithLibreOfficeBrowserInputModel!
  }

let ConvertDocumentWithLibreOfficeBrowserLocalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeBrowserLocalInput>

export const ConvertDocumentWithLibreOfficeBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeBrowserLocalInput> => {
    if (!ConvertDocumentWithLibreOfficeBrowserLocalInputModel) {
      ConvertDocumentWithLibreOfficeBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeBrowserLocalInput>
    }
    return ConvertDocumentWithLibreOfficeBrowserLocalInputModel!
  }

let ConvertDocumentWithLibreOfficeBrowserOutputModel: z.ZodType<ConvertDocumentWithLibreOfficeBrowserOutput>

export const ConvertDocumentWithLibreOfficeBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeBrowserOutput> => {
    if (!ConvertDocumentWithLibreOfficeBrowserOutputModel) {
      ConvertDocumentWithLibreOfficeBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeBrowserOutput>
    }
    return ConvertDocumentWithLibreOfficeBrowserOutputModel!
  }

let ConvertDocumentWithLibreOfficeBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithLibreOfficeBrowserRemoteInput>

export const ConvertDocumentWithLibreOfficeBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeBrowserRemoteInput> => {
    if (!ConvertDocumentWithLibreOfficeBrowserRemoteInputModel) {
      ConvertDocumentWithLibreOfficeBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeBrowserRemoteInput>
    }
    return ConvertDocumentWithLibreOfficeBrowserRemoteInputModel!
  }
