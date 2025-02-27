import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertImageWithInkscapeNodeClientInput,
  ConvertImageWithInkscapeNodeExternalInput,
  ConvertImageWithInkscapeNodeInput,
  ConvertImageWithInkscapeNodeLocalExternalInput,
  ConvertImageWithInkscapeNodeLocalInput,
  ConvertImageWithInkscapeNodeLocalInternalInput,
  ConvertImageWithInkscapeNodeOutput,
  ConvertImageWithInkscapeNodeRemoteInput,
} from '~/code/type/action/convert/inkscape/node/index'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'

let ConvertImageWithInkscapeNodeClientInputModel: z.ZodType<ConvertImageWithInkscapeNodeClientInput>

export const ConvertImageWithInkscapeNodeClientInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeClientInput> => {
    if (!ConvertImageWithInkscapeNodeClientInputModel) {
      ConvertImageWithInkscapeNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertImageWithInkscapeNodeClientInput>
    }
    return ConvertImageWithInkscapeNodeClientInputModel!
  }

let ConvertImageWithInkscapeNodeExternalInputModel: z.ZodType<ConvertImageWithInkscapeNodeExternalInput>

export const ConvertImageWithInkscapeNodeExternalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeExternalInput> => {
    if (!ConvertImageWithInkscapeNodeExternalInputModel) {
      ConvertImageWithInkscapeNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertImageWithInkscapeNodeExternalInput>
    }
    return ConvertImageWithInkscapeNodeExternalInputModel!
  }

let ConvertImageWithInkscapeNodeInputModel: z.ZodType<ConvertImageWithInkscapeNodeInput>

export const ConvertImageWithInkscapeNodeInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeInput> => {
    if (!ConvertImageWithInkscapeNodeInputModel) {
      ConvertImageWithInkscapeNodeInputModel = z.union([
        z.lazy(() => ConvertImageWithInkscapeNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertImageWithInkscapeNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertImageWithInkscapeNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertImageWithInkscapeNodeInputModel!
  }

let ConvertImageWithInkscapeNodeLocalExternalInputModel: z.ZodType<ConvertImageWithInkscapeNodeLocalExternalInput>

export const ConvertImageWithInkscapeNodeLocalExternalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeLocalExternalInput> => {
    if (!ConvertImageWithInkscapeNodeLocalExternalInputModel) {
      ConvertImageWithInkscapeNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeLocalExternalInput>
    }
    return ConvertImageWithInkscapeNodeLocalExternalInputModel!
  }

let ConvertImageWithInkscapeNodeLocalInputModel: z.ZodType<ConvertImageWithInkscapeNodeLocalInput>

export const ConvertImageWithInkscapeNodeLocalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeLocalInput> => {
    if (!ConvertImageWithInkscapeNodeLocalInputModel) {
      ConvertImageWithInkscapeNodeLocalInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeLocalInput>
    }
    return ConvertImageWithInkscapeNodeLocalInputModel!
  }

let ConvertImageWithInkscapeNodeLocalInternalInputModel: z.ZodType<ConvertImageWithInkscapeNodeLocalInternalInput>

export const ConvertImageWithInkscapeNodeLocalInternalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeLocalInternalInput> => {
    if (!ConvertImageWithInkscapeNodeLocalInternalInputModel) {
      ConvertImageWithInkscapeNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeLocalInternalInput>
    }
    return ConvertImageWithInkscapeNodeLocalInternalInputModel!
  }

let ConvertImageWithInkscapeNodeOutputModel: z.ZodType<ConvertImageWithInkscapeNodeOutput>

export const ConvertImageWithInkscapeNodeOutputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeOutput> => {
    if (!ConvertImageWithInkscapeNodeOutputModel) {
      ConvertImageWithInkscapeNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeOutput>
    }
    return ConvertImageWithInkscapeNodeOutputModel!
  }

let ConvertImageWithInkscapeNodeRemoteInputModel: z.ZodType<ConvertImageWithInkscapeNodeRemoteInput>

export const ConvertImageWithInkscapeNodeRemoteInputParser =
  (): z.ZodType<ConvertImageWithInkscapeNodeRemoteInput> => {
    if (!ConvertImageWithInkscapeNodeRemoteInputModel) {
      ConvertImageWithInkscapeNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeNodeRemoteInput>
    }
    return ConvertImageWithInkscapeNodeRemoteInputModel!
  }
