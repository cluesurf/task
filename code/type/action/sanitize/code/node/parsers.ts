import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  SanitizeHtmlCommandInput,
  SanitizeHtmlNodeClientInput,
  SanitizeHtmlNodeExternalInput,
  SanitizeHtmlNodeInput,
  SanitizeHtmlNodeLocalExternalInput,
  SanitizeHtmlNodeLocalInput,
  SanitizeHtmlNodeLocalInternalInput,
  SanitizeHtmlNodeOutput,
  SanitizeHtmlNodeRemoteInput,
} from '~/code/type/action/sanitize/code/node/index'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'

let SanitizeHtmlCommandInputModel: z.ZodType<SanitizeHtmlCommandInput>

export const SanitizeHtmlCommandInputParser =
  (): z.ZodType<SanitizeHtmlCommandInput> => {
    if (!SanitizeHtmlCommandInputModel) {
      SanitizeHtmlCommandInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlCommandInput>
    }
    return SanitizeHtmlCommandInputModel!
  }

let SanitizeHtmlNodeClientInputModel: z.ZodType<SanitizeHtmlNodeClientInput>

export const SanitizeHtmlNodeClientInputParser =
  (): z.ZodType<SanitizeHtmlNodeClientInput> => {
    if (!SanitizeHtmlNodeClientInputModel) {
      SanitizeHtmlNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
      }) as z.ZodType<SanitizeHtmlNodeClientInput>
    }
    return SanitizeHtmlNodeClientInputModel!
  }

let SanitizeHtmlNodeExternalInputModel: z.ZodType<SanitizeHtmlNodeExternalInput>

export const SanitizeHtmlNodeExternalInputParser =
  (): z.ZodType<SanitizeHtmlNodeExternalInput> => {
    if (!SanitizeHtmlNodeExternalInputModel) {
      SanitizeHtmlNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
      }) as z.ZodType<SanitizeHtmlNodeExternalInput>
    }
    return SanitizeHtmlNodeExternalInputModel!
  }

let SanitizeHtmlNodeInputModel: z.ZodType<SanitizeHtmlNodeInput>

export const SanitizeHtmlNodeInputParser =
  (): z.ZodType<SanitizeHtmlNodeInput> => {
    if (!SanitizeHtmlNodeInputModel) {
      SanitizeHtmlNodeInputModel = z.union([
        z.lazy(() => SanitizeHtmlNodeRemoteInputParser()),
        z.lazy(() => SanitizeHtmlNodeLocalExternalInputParser()),
        z.lazy(() => SanitizeHtmlNodeLocalInternalInputParser()),
      ])
    }
    return SanitizeHtmlNodeInputModel!
  }

let SanitizeHtmlNodeLocalExternalInputModel: z.ZodType<SanitizeHtmlNodeLocalExternalInput>

export const SanitizeHtmlNodeLocalExternalInputParser =
  (): z.ZodType<SanitizeHtmlNodeLocalExternalInput> => {
    if (!SanitizeHtmlNodeLocalExternalInputModel) {
      SanitizeHtmlNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlNodeLocalExternalInput>
    }
    return SanitizeHtmlNodeLocalExternalInputModel!
  }

let SanitizeHtmlNodeLocalInputModel: z.ZodType<SanitizeHtmlNodeLocalInput>

export const SanitizeHtmlNodeLocalInputParser =
  (): z.ZodType<SanitizeHtmlNodeLocalInput> => {
    if (!SanitizeHtmlNodeLocalInputModel) {
      SanitizeHtmlNodeLocalInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlNodeLocalInput>
    }
    return SanitizeHtmlNodeLocalInputModel!
  }

let SanitizeHtmlNodeLocalInternalInputModel: z.ZodType<SanitizeHtmlNodeLocalInternalInput>

export const SanitizeHtmlNodeLocalInternalInputParser =
  (): z.ZodType<SanitizeHtmlNodeLocalInternalInput> => {
    if (!SanitizeHtmlNodeLocalInternalInputModel) {
      SanitizeHtmlNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlNodeLocalInternalInput>
    }
    return SanitizeHtmlNodeLocalInternalInputModel!
  }

let SanitizeHtmlNodeOutputModel: z.ZodType<SanitizeHtmlNodeOutput>

export const SanitizeHtmlNodeOutputParser =
  (): z.ZodType<SanitizeHtmlNodeOutput> => {
    if (!SanitizeHtmlNodeOutputModel) {
      SanitizeHtmlNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<SanitizeHtmlNodeOutput>
    }
    return SanitizeHtmlNodeOutputModel!
  }

let SanitizeHtmlNodeRemoteInputModel: z.ZodType<SanitizeHtmlNodeRemoteInput>

export const SanitizeHtmlNodeRemoteInputParser =
  (): z.ZodType<SanitizeHtmlNodeRemoteInput> => {
    if (!SanitizeHtmlNodeRemoteInputModel) {
      SanitizeHtmlNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlNodeRemoteInput>
    }
    return SanitizeHtmlNodeRemoteInputModel!
  }
