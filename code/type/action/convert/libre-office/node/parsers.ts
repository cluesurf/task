import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertDocumentWithLibreOfficeNodeClientInput,
  ConvertDocumentWithLibreOfficeNodeExternalInput,
  ConvertDocumentWithLibreOfficeNodeInput,
  ConvertDocumentWithLibreOfficeNodeLocalExternalInput,
  ConvertDocumentWithLibreOfficeNodeLocalInput,
  ConvertDocumentWithLibreOfficeNodeLocalInternalInput,
  ConvertDocumentWithLibreOfficeNodeOutput,
  ConvertDocumentWithLibreOfficeNodeRemoteInput,
} from '~/code/type/action/convert/libre-office/node/index'
import {
  LibreOfficeInputFormatParser,
  LibreOfficeOutputFormatParser,
} from '~/code/type/object/libre-office/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'

let ConvertDocumentWithLibreOfficeNodeClientInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeClientInput>

export const ConvertDocumentWithLibreOfficeNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeClientInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeClientInputModel) {
      ConvertDocumentWithLibreOfficeNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeClientInput>
    }
    return ConvertDocumentWithLibreOfficeNodeClientInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeExternalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeExternalInput>

export const ConvertDocumentWithLibreOfficeNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeExternalInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeExternalInputModel) {
      ConvertDocumentWithLibreOfficeNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeExternalInput>
    }
    return ConvertDocumentWithLibreOfficeNodeExternalInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeInput>

export const ConvertDocumentWithLibreOfficeNodeInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeInputModel) {
      ConvertDocumentWithLibreOfficeNodeInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeNodeRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithLibreOfficeNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithLibreOfficeNodeInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalExternalInput>

export const ConvertDocumentWithLibreOfficeNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalExternalInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeLocalExternalInputModel) {
      ConvertDocumentWithLibreOfficeNodeLocalExternalInputModel =
        z.object({
          handle: z.literal('external'),
          input: z.object({
            format: z.lazy(() => LibreOfficeInputFormatParser()),
            file: z.union([
              z.lazy(() => RemoteInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => LibreOfficeOutputFormatParser()),
          }),
          pathScope: z.optional(z.string()),
        }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalExternalInput>
    }
    return ConvertDocumentWithLibreOfficeNodeLocalExternalInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeLocalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInput>

export const ConvertDocumentWithLibreOfficeNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeLocalInputModel) {
      ConvertDocumentWithLibreOfficeNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
          directory: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInput>
    }
    return ConvertDocumentWithLibreOfficeNodeLocalInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInternalInput>

export const ConvertDocumentWithLibreOfficeNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInternalInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeLocalInternalInputModel) {
      ConvertDocumentWithLibreOfficeNodeLocalInternalInputModel =
        z.object({
          handle: z.optional(z.literal('internal')),
          input: z.object({
            format: z.lazy(() => LibreOfficeInputFormatParser()),
            file: z.union([
              z.lazy(() => FileInputPathParser()),
              z.lazy(() => FileContentParser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => LibreOfficeOutputFormatParser()),
            directory: z.optional(
              z.lazy(() => LocalOutputPathParser()),
            ),
          }),
          pathScope: z.optional(z.string()),
        }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeLocalInternalInput>
    }
    return ConvertDocumentWithLibreOfficeNodeLocalInternalInputModel!
  }

let ConvertDocumentWithLibreOfficeNodeOutputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeOutput>

export const ConvertDocumentWithLibreOfficeNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeOutput> => {
    if (!ConvertDocumentWithLibreOfficeNodeOutputModel) {
      ConvertDocumentWithLibreOfficeNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeOutput>
    }
    return ConvertDocumentWithLibreOfficeNodeOutputModel!
  }

let ConvertDocumentWithLibreOfficeNodeRemoteInputModel: z.ZodType<ConvertDocumentWithLibreOfficeNodeRemoteInput>

export const ConvertDocumentWithLibreOfficeNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeNodeRemoteInput> => {
    if (!ConvertDocumentWithLibreOfficeNodeRemoteInputModel) {
      ConvertDocumentWithLibreOfficeNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
          directory: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeNodeRemoteInput>
    }
    return ConvertDocumentWithLibreOfficeNodeRemoteInputModel!
  }
