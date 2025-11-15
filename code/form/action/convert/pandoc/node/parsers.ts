import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertDocumentWithPandocNodeClientInput,
  ConvertDocumentWithPandocNodeExternalInput,
  ConvertDocumentWithPandocNodeInput,
  ConvertDocumentWithPandocNodeLocalExternalInput,
  ConvertDocumentWithPandocNodeLocalInput,
  ConvertDocumentWithPandocNodeLocalInternalInput,
  ConvertDocumentWithPandocNodeOutput,
  ConvertDocumentWithPandocNodeRemoteInput,
} from '~/code/form/action/convert/pandoc/node/index'
import {
  PandocInputFormatParser,
  PandocOutputFormatParser,
} from '~/code/form/object/pandoc/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'

let ConvertDocumentWithPandocNodeClientInputModel: z.ZodType<ConvertDocumentWithPandocNodeClientInput>

export const ConvertDocumentWithPandocNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeClientInput> => {
    if (!ConvertDocumentWithPandocNodeClientInputModel) {
      ConvertDocumentWithPandocNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithPandocNodeClientInput>
    }
    return ConvertDocumentWithPandocNodeClientInputModel!
  }

let ConvertDocumentWithPandocNodeExternalInputModel: z.ZodType<ConvertDocumentWithPandocNodeExternalInput>

export const ConvertDocumentWithPandocNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeExternalInput> => {
    if (!ConvertDocumentWithPandocNodeExternalInputModel) {
      ConvertDocumentWithPandocNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithPandocNodeExternalInput>
    }
    return ConvertDocumentWithPandocNodeExternalInputModel!
  }

let ConvertDocumentWithPandocNodeInputModel: z.ZodType<ConvertDocumentWithPandocNodeInput>

export const ConvertDocumentWithPandocNodeInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeInput> => {
    if (!ConvertDocumentWithPandocNodeInputModel) {
      ConvertDocumentWithPandocNodeInputModel = z.union([
        z.lazy(() => ConvertDocumentWithPandocNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertDocumentWithPandocNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithPandocNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithPandocNodeInputModel!
  }

let ConvertDocumentWithPandocNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithPandocNodeLocalExternalInput>

export const ConvertDocumentWithPandocNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeLocalExternalInput> => {
    if (!ConvertDocumentWithPandocNodeLocalExternalInputModel) {
      ConvertDocumentWithPandocNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeLocalExternalInput>
    }
    return ConvertDocumentWithPandocNodeLocalExternalInputModel!
  }

let ConvertDocumentWithPandocNodeLocalInputModel: z.ZodType<ConvertDocumentWithPandocNodeLocalInput>

export const ConvertDocumentWithPandocNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeLocalInput> => {
    if (!ConvertDocumentWithPandocNodeLocalInputModel) {
      ConvertDocumentWithPandocNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeLocalInput>
    }
    return ConvertDocumentWithPandocNodeLocalInputModel!
  }

let ConvertDocumentWithPandocNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithPandocNodeLocalInternalInput>

export const ConvertDocumentWithPandocNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeLocalInternalInput> => {
    if (!ConvertDocumentWithPandocNodeLocalInternalInputModel) {
      ConvertDocumentWithPandocNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeLocalInternalInput>
    }
    return ConvertDocumentWithPandocNodeLocalInternalInputModel!
  }

let ConvertDocumentWithPandocNodeOutputModel: z.ZodType<ConvertDocumentWithPandocNodeOutput>

export const ConvertDocumentWithPandocNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeOutput> => {
    if (!ConvertDocumentWithPandocNodeOutputModel) {
      ConvertDocumentWithPandocNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeOutput>
    }
    return ConvertDocumentWithPandocNodeOutputModel!
  }

let ConvertDocumentWithPandocNodeRemoteInputModel: z.ZodType<ConvertDocumentWithPandocNodeRemoteInput>

export const ConvertDocumentWithPandocNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithPandocNodeRemoteInput> => {
    if (!ConvertDocumentWithPandocNodeRemoteInputModel) {
      ConvertDocumentWithPandocNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocNodeRemoteInput>
    }
    return ConvertDocumentWithPandocNodeRemoteInputModel!
  }
