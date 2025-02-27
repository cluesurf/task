import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertArchiveNodeClientInput,
  ConvertArchiveNodeExternalInput,
  ConvertArchiveNodeInput,
  ConvertArchiveNodeLocalExternalInput,
  ConvertArchiveNodeLocalInput,
  ConvertArchiveNodeLocalInternalInput,
  ConvertArchiveNodeOutput,
  ConvertArchiveNodeRemoteInput,
} from '~/code/type/action/convert/archive/node/index'
import { ArchiveFormatParser } from '~/code/type/object/archive/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'

let ConvertArchiveNodeClientInputModel: z.ZodType<ConvertArchiveNodeClientInput>

export const ConvertArchiveNodeClientInputParser =
  (): z.ZodType<ConvertArchiveNodeClientInput> => {
    if (!ConvertArchiveNodeClientInputModel) {
      ConvertArchiveNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
        }),
      }) as z.ZodType<ConvertArchiveNodeClientInput>
    }
    return ConvertArchiveNodeClientInputModel!
  }

let ConvertArchiveNodeExternalInputModel: z.ZodType<ConvertArchiveNodeExternalInput>

export const ConvertArchiveNodeExternalInputParser =
  (): z.ZodType<ConvertArchiveNodeExternalInput> => {
    if (!ConvertArchiveNodeExternalInputModel) {
      ConvertArchiveNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
        }),
      }) as z.ZodType<ConvertArchiveNodeExternalInput>
    }
    return ConvertArchiveNodeExternalInputModel!
  }

let ConvertArchiveNodeInputModel: z.ZodType<ConvertArchiveNodeInput>

export const ConvertArchiveNodeInputParser =
  (): z.ZodType<ConvertArchiveNodeInput> => {
    if (!ConvertArchiveNodeInputModel) {
      ConvertArchiveNodeInputModel = z.union([
        z.lazy(() => ConvertArchiveNodeRemoteInputParser()),
        z.lazy(() => ConvertArchiveNodeLocalExternalInputParser()),
        z.lazy(() => ConvertArchiveNodeLocalInternalInputParser()),
      ])
    }
    return ConvertArchiveNodeInputModel!
  }

let ConvertArchiveNodeLocalExternalInputModel: z.ZodType<ConvertArchiveNodeLocalExternalInput>

export const ConvertArchiveNodeLocalExternalInputParser =
  (): z.ZodType<ConvertArchiveNodeLocalExternalInput> => {
    if (!ConvertArchiveNodeLocalExternalInputModel) {
      ConvertArchiveNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveNodeLocalExternalInput>
    }
    return ConvertArchiveNodeLocalExternalInputModel!
  }

let ConvertArchiveNodeLocalInputModel: z.ZodType<ConvertArchiveNodeLocalInput>

export const ConvertArchiveNodeLocalInputParser =
  (): z.ZodType<ConvertArchiveNodeLocalInput> => {
    if (!ConvertArchiveNodeLocalInputModel) {
      ConvertArchiveNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveNodeLocalInput>
    }
    return ConvertArchiveNodeLocalInputModel!
  }

let ConvertArchiveNodeLocalInternalInputModel: z.ZodType<ConvertArchiveNodeLocalInternalInput>

export const ConvertArchiveNodeLocalInternalInputParser =
  (): z.ZodType<ConvertArchiveNodeLocalInternalInput> => {
    if (!ConvertArchiveNodeLocalInternalInputModel) {
      ConvertArchiveNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveNodeLocalInternalInput>
    }
    return ConvertArchiveNodeLocalInternalInputModel!
  }

let ConvertArchiveNodeOutputModel: z.ZodType<ConvertArchiveNodeOutput>

export const ConvertArchiveNodeOutputParser =
  (): z.ZodType<ConvertArchiveNodeOutput> => {
    if (!ConvertArchiveNodeOutputModel) {
      ConvertArchiveNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertArchiveNodeOutput>
    }
    return ConvertArchiveNodeOutputModel!
  }

let ConvertArchiveNodeRemoteInputModel: z.ZodType<ConvertArchiveNodeRemoteInput>

export const ConvertArchiveNodeRemoteInputParser =
  (): z.ZodType<ConvertArchiveNodeRemoteInput> => {
    if (!ConvertArchiveNodeRemoteInputModel) {
      ConvertArchiveNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveNodeRemoteInput>
    }
    return ConvertArchiveNodeRemoteInputModel!
  }
