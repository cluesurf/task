import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertDocumentWithEnscriptNodeClientInput,
  ConvertDocumentWithEnscriptNodeExternalInput,
  ConvertDocumentWithEnscriptNodeInput,
  ConvertDocumentWithEnscriptNodeLocalExternalInput,
  ConvertDocumentWithEnscriptNodeLocalInput,
  ConvertDocumentWithEnscriptNodeLocalInternalInput,
  ConvertDocumentWithEnscriptNodeOutput,
  ConvertDocumentWithEnscriptNodeRemoteInput,
} from '~/code/type/action/convert/enscript/node/index'
import {
  EnscriptInputFormatParser,
  EnscriptOutputFormatParser,
} from '~/code/type/object/enscript/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'

let ConvertDocumentWithEnscriptNodeClientInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeClientInput>

export const ConvertDocumentWithEnscriptNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeClientInput> => {
    if (!ConvertDocumentWithEnscriptNodeClientInputModel) {
      ConvertDocumentWithEnscriptNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeClientInput>
    }
    return ConvertDocumentWithEnscriptNodeClientInputModel!
  }

let ConvertDocumentWithEnscriptNodeExternalInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeExternalInput>

export const ConvertDocumentWithEnscriptNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeExternalInput> => {
    if (!ConvertDocumentWithEnscriptNodeExternalInputModel) {
      ConvertDocumentWithEnscriptNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeExternalInput>
    }
    return ConvertDocumentWithEnscriptNodeExternalInputModel!
  }

let ConvertDocumentWithEnscriptNodeInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeInput>

export const ConvertDocumentWithEnscriptNodeInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeInput> => {
    if (!ConvertDocumentWithEnscriptNodeInputModel) {
      ConvertDocumentWithEnscriptNodeInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithEnscriptNodeRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithEnscriptNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithEnscriptNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithEnscriptNodeInputModel!
  }

let ConvertDocumentWithEnscriptNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeLocalExternalInput>

export const ConvertDocumentWithEnscriptNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeLocalExternalInput> => {
    if (!ConvertDocumentWithEnscriptNodeLocalExternalInputModel) {
      ConvertDocumentWithEnscriptNodeLocalExternalInputModel = z.object(
        {
          handle: z.literal('external'),
          input: z.object({
            format: z.lazy(() => EnscriptInputFormatParser()),
            file: z.union([
              z.lazy(() => RemoteInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => EnscriptOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
        },
      ) as z.ZodType<ConvertDocumentWithEnscriptNodeLocalExternalInput>
    }
    return ConvertDocumentWithEnscriptNodeLocalExternalInputModel!
  }

let ConvertDocumentWithEnscriptNodeLocalInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeLocalInput>

export const ConvertDocumentWithEnscriptNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeLocalInput> => {
    if (!ConvertDocumentWithEnscriptNodeLocalInputModel) {
      ConvertDocumentWithEnscriptNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeLocalInput>
    }
    return ConvertDocumentWithEnscriptNodeLocalInputModel!
  }

let ConvertDocumentWithEnscriptNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeLocalInternalInput>

export const ConvertDocumentWithEnscriptNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeLocalInternalInput> => {
    if (!ConvertDocumentWithEnscriptNodeLocalInternalInputModel) {
      ConvertDocumentWithEnscriptNodeLocalInternalInputModel = z.object(
        {
          handle: z.optional(z.literal('internal')),
          input: z.object({
            format: z.lazy(() => EnscriptInputFormatParser()),
            file: z.union([
              z.lazy(() => FileInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => EnscriptOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
        },
      ) as z.ZodType<ConvertDocumentWithEnscriptNodeLocalInternalInput>
    }
    return ConvertDocumentWithEnscriptNodeLocalInternalInputModel!
  }

let ConvertDocumentWithEnscriptNodeOutputModel: z.ZodType<ConvertDocumentWithEnscriptNodeOutput>

export const ConvertDocumentWithEnscriptNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeOutput> => {
    if (!ConvertDocumentWithEnscriptNodeOutputModel) {
      ConvertDocumentWithEnscriptNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeOutput>
    }
    return ConvertDocumentWithEnscriptNodeOutputModel!
  }

let ConvertDocumentWithEnscriptNodeRemoteInputModel: z.ZodType<ConvertDocumentWithEnscriptNodeRemoteInput>

export const ConvertDocumentWithEnscriptNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptNodeRemoteInput> => {
    if (!ConvertDocumentWithEnscriptNodeRemoteInputModel) {
      ConvertDocumentWithEnscriptNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithEnscriptNodeRemoteInput>
    }
    return ConvertDocumentWithEnscriptNodeRemoteInputModel!
  }
