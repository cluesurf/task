import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertLatexToPngNodeClientInput,
  ConvertLatexToPngNodeExternalInput,
  ConvertLatexToPngNodeInput,
  ConvertLatexToPngNodeLocalExternalInput,
  ConvertLatexToPngNodeLocalInput,
  ConvertLatexToPngNodeLocalInternalInput,
  ConvertLatexToPngNodeOutput,
  ConvertLatexToPngNodeRemoteInput,
} from '~/code/form/action/convert/latex-to-png/node/index'
import {
  ConvertLatexToPngInputFormatParser,
  ConvertLatexToPngOutputFormatParser,
} from '~/code/form/action/convert/latex-to-png/shared/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'

let ConvertLatexToPngNodeClientInputModel: z.ZodType<ConvertLatexToPngNodeClientInput>

export const ConvertLatexToPngNodeClientInputParser =
  (): z.ZodType<ConvertLatexToPngNodeClientInput> => {
    if (!ConvertLatexToPngNodeClientInputModel) {
      ConvertLatexToPngNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexToPngNodeClientInput>
    }
    return ConvertLatexToPngNodeClientInputModel!
  }

let ConvertLatexToPngNodeExternalInputModel: z.ZodType<ConvertLatexToPngNodeExternalInput>

export const ConvertLatexToPngNodeExternalInputParser =
  (): z.ZodType<ConvertLatexToPngNodeExternalInput> => {
    if (!ConvertLatexToPngNodeExternalInputModel) {
      ConvertLatexToPngNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexToPngNodeExternalInput>
    }
    return ConvertLatexToPngNodeExternalInputModel!
  }

let ConvertLatexToPngNodeInputModel: z.ZodType<ConvertLatexToPngNodeInput>

export const ConvertLatexToPngNodeInputParser =
  (): z.ZodType<ConvertLatexToPngNodeInput> => {
    if (!ConvertLatexToPngNodeInputModel) {
      ConvertLatexToPngNodeInputModel = z.union([
        z.lazy(() => ConvertLatexToPngNodeRemoteInputParser()),
        z.lazy(() => ConvertLatexToPngNodeLocalExternalInputParser()),
        z.lazy(() => ConvertLatexToPngNodeLocalInternalInputParser()),
      ])
    }
    return ConvertLatexToPngNodeInputModel!
  }

let ConvertLatexToPngNodeLocalExternalInputModel: z.ZodType<ConvertLatexToPngNodeLocalExternalInput>

export const ConvertLatexToPngNodeLocalExternalInputParser =
  (): z.ZodType<ConvertLatexToPngNodeLocalExternalInput> => {
    if (!ConvertLatexToPngNodeLocalExternalInputModel) {
      ConvertLatexToPngNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngNodeLocalExternalInput>
    }
    return ConvertLatexToPngNodeLocalExternalInputModel!
  }

let ConvertLatexToPngNodeLocalInputModel: z.ZodType<ConvertLatexToPngNodeLocalInput>

export const ConvertLatexToPngNodeLocalInputParser =
  (): z.ZodType<ConvertLatexToPngNodeLocalInput> => {
    if (!ConvertLatexToPngNodeLocalInputModel) {
      ConvertLatexToPngNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngNodeLocalInput>
    }
    return ConvertLatexToPngNodeLocalInputModel!
  }

let ConvertLatexToPngNodeLocalInternalInputModel: z.ZodType<ConvertLatexToPngNodeLocalInternalInput>

export const ConvertLatexToPngNodeLocalInternalInputParser =
  (): z.ZodType<ConvertLatexToPngNodeLocalInternalInput> => {
    if (!ConvertLatexToPngNodeLocalInternalInputModel) {
      ConvertLatexToPngNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngNodeLocalInternalInput>
    }
    return ConvertLatexToPngNodeLocalInternalInputModel!
  }

let ConvertLatexToPngNodeOutputModel: z.ZodType<ConvertLatexToPngNodeOutput>

export const ConvertLatexToPngNodeOutputParser =
  (): z.ZodType<ConvertLatexToPngNodeOutput> => {
    if (!ConvertLatexToPngNodeOutputModel) {
      ConvertLatexToPngNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertLatexToPngNodeOutput>
    }
    return ConvertLatexToPngNodeOutputModel!
  }

let ConvertLatexToPngNodeRemoteInputModel: z.ZodType<ConvertLatexToPngNodeRemoteInput>

export const ConvertLatexToPngNodeRemoteInputParser =
  (): z.ZodType<ConvertLatexToPngNodeRemoteInput> => {
    if (!ConvertLatexToPngNodeRemoteInputModel) {
      ConvertLatexToPngNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngNodeRemoteInput>
    }
    return ConvertLatexToPngNodeRemoteInputModel!
  }
