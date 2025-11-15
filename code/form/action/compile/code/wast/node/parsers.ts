import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  CompileWastNodeClientInput,
  CompileWastNodeExternalInput,
  CompileWastNodeInput,
  CompileWastNodeLocalExternalInput,
  CompileWastNodeLocalInput,
  CompileWastNodeLocalInternalInput,
  CompileWastNodeOutput,
  CompileWastNodeRemoteInput,
} from '~/code/form/action/compile/code/wast/node/index'
import {
  WastInputFormatParser,
  WastOutputFormatParser,
} from '~/code/form/action/compile/code/wast/shared/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'

let CompileWastNodeClientInputModel: z.ZodType<CompileWastNodeClientInput>

export const CompileWastNodeClientInputParser =
  (): z.ZodType<CompileWastNodeClientInput> => {
    if (!CompileWastNodeClientInputModel) {
      CompileWastNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
        }),
      }) as z.ZodType<CompileWastNodeClientInput>
    }
    return CompileWastNodeClientInputModel!
  }

let CompileWastNodeExternalInputModel: z.ZodType<CompileWastNodeExternalInput>

export const CompileWastNodeExternalInputParser =
  (): z.ZodType<CompileWastNodeExternalInput> => {
    if (!CompileWastNodeExternalInputModel) {
      CompileWastNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
        }),
      }) as z.ZodType<CompileWastNodeExternalInput>
    }
    return CompileWastNodeExternalInputModel!
  }

let CompileWastNodeInputModel: z.ZodType<CompileWastNodeInput>

export const CompileWastNodeInputParser =
  (): z.ZodType<CompileWastNodeInput> => {
    if (!CompileWastNodeInputModel) {
      CompileWastNodeInputModel = z.union([
        z.lazy(() => CompileWastNodeRemoteInputParser()),
        z.lazy(() => CompileWastNodeLocalExternalInputParser()),
        z.lazy(() => CompileWastNodeLocalInternalInputParser()),
      ])
    }
    return CompileWastNodeInputModel!
  }

let CompileWastNodeLocalExternalInputModel: z.ZodType<CompileWastNodeLocalExternalInput>

export const CompileWastNodeLocalExternalInputParser =
  (): z.ZodType<CompileWastNodeLocalExternalInput> => {
    if (!CompileWastNodeLocalExternalInputModel) {
      CompileWastNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastNodeLocalExternalInput>
    }
    return CompileWastNodeLocalExternalInputModel!
  }

let CompileWastNodeLocalInputModel: z.ZodType<CompileWastNodeLocalInput>

export const CompileWastNodeLocalInputParser =
  (): z.ZodType<CompileWastNodeLocalInput> => {
    if (!CompileWastNodeLocalInputModel) {
      CompileWastNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastNodeLocalInput>
    }
    return CompileWastNodeLocalInputModel!
  }

let CompileWastNodeLocalInternalInputModel: z.ZodType<CompileWastNodeLocalInternalInput>

export const CompileWastNodeLocalInternalInputParser =
  (): z.ZodType<CompileWastNodeLocalInternalInput> => {
    if (!CompileWastNodeLocalInternalInputModel) {
      CompileWastNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastNodeLocalInternalInput>
    }
    return CompileWastNodeLocalInternalInputModel!
  }

let CompileWastNodeOutputModel: z.ZodType<CompileWastNodeOutput>

export const CompileWastNodeOutputParser =
  (): z.ZodType<CompileWastNodeOutput> => {
    if (!CompileWastNodeOutputModel) {
      CompileWastNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileWastNodeOutput>
    }
    return CompileWastNodeOutputModel!
  }

let CompileWastNodeRemoteInputModel: z.ZodType<CompileWastNodeRemoteInput>

export const CompileWastNodeRemoteInputParser =
  (): z.ZodType<CompileWastNodeRemoteInput> => {
    if (!CompileWastNodeRemoteInputModel) {
      CompileWastNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastNodeRemoteInput>
    }
    return CompileWastNodeRemoteInputModel!
  }
