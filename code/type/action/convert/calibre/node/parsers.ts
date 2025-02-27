import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertDocumentWithCalibreNodeClientInput,
  ConvertDocumentWithCalibreNodeExternalInput,
  ConvertDocumentWithCalibreNodeInput,
  ConvertDocumentWithCalibreNodeLocalExternalInput,
  ConvertDocumentWithCalibreNodeLocalInput,
  ConvertDocumentWithCalibreNodeLocalInternalInput,
  ConvertDocumentWithCalibreNodeOutput,
  ConvertDocumentWithCalibreNodeRemoteInput,
} from '~/code/type/action/convert/calibre/node/index'
import {
  CalibreInputFormatParser,
  CalibreOutputFormatParser,
} from '~/code/type/object/calibre/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'

let ConvertDocumentWithCalibreNodeClientInputModel: z.ZodType<ConvertDocumentWithCalibreNodeClientInput>

export const ConvertDocumentWithCalibreNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeClientInput> => {
    if (!ConvertDocumentWithCalibreNodeClientInputModel) {
      ConvertDocumentWithCalibreNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeClientInput>
    }
    return ConvertDocumentWithCalibreNodeClientInputModel!
  }

let ConvertDocumentWithCalibreNodeExternalInputModel: z.ZodType<ConvertDocumentWithCalibreNodeExternalInput>

export const ConvertDocumentWithCalibreNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeExternalInput> => {
    if (!ConvertDocumentWithCalibreNodeExternalInputModel) {
      ConvertDocumentWithCalibreNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeExternalInput>
    }
    return ConvertDocumentWithCalibreNodeExternalInputModel!
  }

let ConvertDocumentWithCalibreNodeInputModel: z.ZodType<ConvertDocumentWithCalibreNodeInput>

export const ConvertDocumentWithCalibreNodeInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeInput> => {
    if (!ConvertDocumentWithCalibreNodeInputModel) {
      ConvertDocumentWithCalibreNodeInputModel = z.union([
        z.lazy(() => ConvertDocumentWithCalibreNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertDocumentWithCalibreNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithCalibreNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithCalibreNodeInputModel!
  }

let ConvertDocumentWithCalibreNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithCalibreNodeLocalExternalInput>

export const ConvertDocumentWithCalibreNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeLocalExternalInput> => {
    if (!ConvertDocumentWithCalibreNodeLocalExternalInputModel) {
      ConvertDocumentWithCalibreNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeLocalExternalInput>
    }
    return ConvertDocumentWithCalibreNodeLocalExternalInputModel!
  }

let ConvertDocumentWithCalibreNodeLocalInputModel: z.ZodType<ConvertDocumentWithCalibreNodeLocalInput>

export const ConvertDocumentWithCalibreNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeLocalInput> => {
    if (!ConvertDocumentWithCalibreNodeLocalInputModel) {
      ConvertDocumentWithCalibreNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeLocalInput>
    }
    return ConvertDocumentWithCalibreNodeLocalInputModel!
  }

let ConvertDocumentWithCalibreNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithCalibreNodeLocalInternalInput>

export const ConvertDocumentWithCalibreNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeLocalInternalInput> => {
    if (!ConvertDocumentWithCalibreNodeLocalInternalInputModel) {
      ConvertDocumentWithCalibreNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeLocalInternalInput>
    }
    return ConvertDocumentWithCalibreNodeLocalInternalInputModel!
  }

let ConvertDocumentWithCalibreNodeOutputModel: z.ZodType<ConvertDocumentWithCalibreNodeOutput>

export const ConvertDocumentWithCalibreNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeOutput> => {
    if (!ConvertDocumentWithCalibreNodeOutputModel) {
      ConvertDocumentWithCalibreNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeOutput>
    }
    return ConvertDocumentWithCalibreNodeOutputModel!
  }

let ConvertDocumentWithCalibreNodeRemoteInputModel: z.ZodType<ConvertDocumentWithCalibreNodeRemoteInput>

export const ConvertDocumentWithCalibreNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreNodeRemoteInput> => {
    if (!ConvertDocumentWithCalibreNodeRemoteInputModel) {
      ConvertDocumentWithCalibreNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreNodeRemoteInput>
    }
    return ConvertDocumentWithCalibreNodeRemoteInputModel!
  }
