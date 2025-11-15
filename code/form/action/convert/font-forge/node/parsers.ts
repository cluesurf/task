import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertFontWithFontForgeNodeClientInput,
  ConvertFontWithFontForgeNodeExternalInput,
  ConvertFontWithFontForgeNodeInput,
  ConvertFontWithFontForgeNodeLocalExternalInput,
  ConvertFontWithFontForgeNodeLocalInput,
  ConvertFontWithFontForgeNodeLocalInternalInput,
  ConvertFontWithFontForgeNodeOutput,
  ConvertFontWithFontForgeNodeRemoteInput,
} from '~/code/form/action/convert/font-forge/node/index'
import { FontFormatParser } from '~/code/form/object/font/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'

let ConvertFontWithFontForgeNodeClientInputModel: z.ZodType<ConvertFontWithFontForgeNodeClientInput>

export const ConvertFontWithFontForgeNodeClientInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeClientInput> => {
    if (!ConvertFontWithFontForgeNodeClientInputModel) {
      ConvertFontWithFontForgeNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
        }),
      }) as z.ZodType<ConvertFontWithFontForgeNodeClientInput>
    }
    return ConvertFontWithFontForgeNodeClientInputModel!
  }

let ConvertFontWithFontForgeNodeExternalInputModel: z.ZodType<ConvertFontWithFontForgeNodeExternalInput>

export const ConvertFontWithFontForgeNodeExternalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeExternalInput> => {
    if (!ConvertFontWithFontForgeNodeExternalInputModel) {
      ConvertFontWithFontForgeNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
        }),
      }) as z.ZodType<ConvertFontWithFontForgeNodeExternalInput>
    }
    return ConvertFontWithFontForgeNodeExternalInputModel!
  }

let ConvertFontWithFontForgeNodeInputModel: z.ZodType<ConvertFontWithFontForgeNodeInput>

export const ConvertFontWithFontForgeNodeInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeInput> => {
    if (!ConvertFontWithFontForgeNodeInputModel) {
      ConvertFontWithFontForgeNodeInputModel = z.union([
        z.lazy(() => ConvertFontWithFontForgeNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertFontWithFontForgeNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertFontWithFontForgeNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertFontWithFontForgeNodeInputModel!
  }

let ConvertFontWithFontForgeNodeLocalExternalInputModel: z.ZodType<ConvertFontWithFontForgeNodeLocalExternalInput>

export const ConvertFontWithFontForgeNodeLocalExternalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeLocalExternalInput> => {
    if (!ConvertFontWithFontForgeNodeLocalExternalInputModel) {
      ConvertFontWithFontForgeNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeLocalExternalInput>
    }
    return ConvertFontWithFontForgeNodeLocalExternalInputModel!
  }

let ConvertFontWithFontForgeNodeLocalInputModel: z.ZodType<ConvertFontWithFontForgeNodeLocalInput>

export const ConvertFontWithFontForgeNodeLocalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeLocalInput> => {
    if (!ConvertFontWithFontForgeNodeLocalInputModel) {
      ConvertFontWithFontForgeNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeLocalInput>
    }
    return ConvertFontWithFontForgeNodeLocalInputModel!
  }

let ConvertFontWithFontForgeNodeLocalInternalInputModel: z.ZodType<ConvertFontWithFontForgeNodeLocalInternalInput>

export const ConvertFontWithFontForgeNodeLocalInternalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeLocalInternalInput> => {
    if (!ConvertFontWithFontForgeNodeLocalInternalInputModel) {
      ConvertFontWithFontForgeNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeLocalInternalInput>
    }
    return ConvertFontWithFontForgeNodeLocalInternalInputModel!
  }

let ConvertFontWithFontForgeNodeOutputModel: z.ZodType<ConvertFontWithFontForgeNodeOutput>

export const ConvertFontWithFontForgeNodeOutputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeOutput> => {
    if (!ConvertFontWithFontForgeNodeOutputModel) {
      ConvertFontWithFontForgeNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeOutput>
    }
    return ConvertFontWithFontForgeNodeOutputModel!
  }

let ConvertFontWithFontForgeNodeRemoteInputModel: z.ZodType<ConvertFontWithFontForgeNodeRemoteInput>

export const ConvertFontWithFontForgeNodeRemoteInputParser =
  (): z.ZodType<ConvertFontWithFontForgeNodeRemoteInput> => {
    if (!ConvertFontWithFontForgeNodeRemoteInputModel) {
      ConvertFontWithFontForgeNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeNodeRemoteInput>
    }
    return ConvertFontWithFontForgeNodeRemoteInputModel!
  }
