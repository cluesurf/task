import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertLatexWithPdfLatexNodeClientInput,
  ConvertLatexWithPdfLatexNodeExternalInput,
  ConvertLatexWithPdfLatexNodeInput,
  ConvertLatexWithPdfLatexNodeLocalExternalInput,
  ConvertLatexWithPdfLatexNodeLocalInput,
  ConvertLatexWithPdfLatexNodeLocalInternalInput,
  ConvertLatexWithPdfLatexNodeOutput,
  ConvertLatexWithPdfLatexNodeRemoteInput,
} from '~/code/form/action/convert/pdf-latex/node/index'
import {
  PdfLatexInputFormatParser,
  PdfLatexOutputFormatParser,
} from '~/code/form/action/convert/pdf-latex/shared/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'

let ConvertLatexWithPdfLatexNodeClientInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeClientInput>

export const ConvertLatexWithPdfLatexNodeClientInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeClientInput> => {
    if (!ConvertLatexWithPdfLatexNodeClientInputModel) {
      ConvertLatexWithPdfLatexNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeClientInput>
    }
    return ConvertLatexWithPdfLatexNodeClientInputModel!
  }

let ConvertLatexWithPdfLatexNodeExternalInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeExternalInput>

export const ConvertLatexWithPdfLatexNodeExternalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeExternalInput> => {
    if (!ConvertLatexWithPdfLatexNodeExternalInputModel) {
      ConvertLatexWithPdfLatexNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeExternalInput>
    }
    return ConvertLatexWithPdfLatexNodeExternalInputModel!
  }

let ConvertLatexWithPdfLatexNodeInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeInput>

export const ConvertLatexWithPdfLatexNodeInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeInput> => {
    if (!ConvertLatexWithPdfLatexNodeInputModel) {
      ConvertLatexWithPdfLatexNodeInputModel = z.union([
        z.lazy(() => ConvertLatexWithPdfLatexNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertLatexWithPdfLatexNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertLatexWithPdfLatexNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertLatexWithPdfLatexNodeInputModel!
  }

let ConvertLatexWithPdfLatexNodeLocalExternalInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeLocalExternalInput>

export const ConvertLatexWithPdfLatexNodeLocalExternalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeLocalExternalInput> => {
    if (!ConvertLatexWithPdfLatexNodeLocalExternalInputModel) {
      ConvertLatexWithPdfLatexNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeLocalExternalInput>
    }
    return ConvertLatexWithPdfLatexNodeLocalExternalInputModel!
  }

let ConvertLatexWithPdfLatexNodeLocalInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeLocalInput>

export const ConvertLatexWithPdfLatexNodeLocalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeLocalInput> => {
    if (!ConvertLatexWithPdfLatexNodeLocalInputModel) {
      ConvertLatexWithPdfLatexNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
          directory: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeLocalInput>
    }
    return ConvertLatexWithPdfLatexNodeLocalInputModel!
  }

let ConvertLatexWithPdfLatexNodeLocalInternalInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeLocalInternalInput>

export const ConvertLatexWithPdfLatexNodeLocalInternalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeLocalInternalInput> => {
    if (!ConvertLatexWithPdfLatexNodeLocalInternalInputModel) {
      ConvertLatexWithPdfLatexNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
          directory: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeLocalInternalInput>
    }
    return ConvertLatexWithPdfLatexNodeLocalInternalInputModel!
  }

let ConvertLatexWithPdfLatexNodeOutputModel: z.ZodType<ConvertLatexWithPdfLatexNodeOutput>

export const ConvertLatexWithPdfLatexNodeOutputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeOutput> => {
    if (!ConvertLatexWithPdfLatexNodeOutputModel) {
      ConvertLatexWithPdfLatexNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeOutput>
    }
    return ConvertLatexWithPdfLatexNodeOutputModel!
  }

let ConvertLatexWithPdfLatexNodeRemoteInputModel: z.ZodType<ConvertLatexWithPdfLatexNodeRemoteInput>

export const ConvertLatexWithPdfLatexNodeRemoteInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexNodeRemoteInput> => {
    if (!ConvertLatexWithPdfLatexNodeRemoteInputModel) {
      ConvertLatexWithPdfLatexNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
          directory: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexNodeRemoteInput>
    }
    return ConvertLatexWithPdfLatexNodeRemoteInputModel!
  }
