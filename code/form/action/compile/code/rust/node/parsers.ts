import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  CompileRustNodeClientInput,
  CompileRustNodeExternalInput,
  CompileRustNodeInput,
  CompileRustNodeLocalExternalInput,
  CompileRustNodeLocalInput,
  CompileRustNodeLocalInternalInput,
  CompileRustNodeOutput,
  CompileRustNodeRemoteInput,
} from '~/code/form/action/compile/code/rust/node/index'
import {
  RustCompilerTargetParser,
  RustInputFormatParser,
  RustOutputFormatParser,
} from '~/code/form/object/rust/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'

let CompileRustNodeClientInputModel: z.ZodType<CompileRustNodeClientInput>

export const CompileRustNodeClientInputParser =
  (): z.ZodType<CompileRustNodeClientInput> => {
    if (!CompileRustNodeClientInputModel) {
      CompileRustNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeClientInput>
    }
    return CompileRustNodeClientInputModel!
  }

let CompileRustNodeExternalInputModel: z.ZodType<CompileRustNodeExternalInput>

export const CompileRustNodeExternalInputParser =
  (): z.ZodType<CompileRustNodeExternalInput> => {
    if (!CompileRustNodeExternalInputModel) {
      CompileRustNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeExternalInput>
    }
    return CompileRustNodeExternalInputModel!
  }

let CompileRustNodeInputModel: z.ZodType<CompileRustNodeInput>

export const CompileRustNodeInputParser =
  (): z.ZodType<CompileRustNodeInput> => {
    if (!CompileRustNodeInputModel) {
      CompileRustNodeInputModel = z.union([
        z.lazy(() => CompileRustNodeRemoteInputParser()),
        z.lazy(() => CompileRustNodeLocalExternalInputParser()),
        z.lazy(() => CompileRustNodeLocalInternalInputParser()),
      ])
    }
    return CompileRustNodeInputModel!
  }

let CompileRustNodeLocalExternalInputModel: z.ZodType<CompileRustNodeLocalExternalInput>

export const CompileRustNodeLocalExternalInputParser =
  (): z.ZodType<CompileRustNodeLocalExternalInput> => {
    if (!CompileRustNodeLocalExternalInputModel) {
      CompileRustNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeLocalExternalInput>
    }
    return CompileRustNodeLocalExternalInputModel!
  }

let CompileRustNodeLocalInputModel: z.ZodType<CompileRustNodeLocalInput>

export const CompileRustNodeLocalInputParser =
  (): z.ZodType<CompileRustNodeLocalInput> => {
    if (!CompileRustNodeLocalInputModel) {
      CompileRustNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeLocalInput>
    }
    return CompileRustNodeLocalInputModel!
  }

let CompileRustNodeLocalInternalInputModel: z.ZodType<CompileRustNodeLocalInternalInput>

export const CompileRustNodeLocalInternalInputParser =
  (): z.ZodType<CompileRustNodeLocalInternalInput> => {
    if (!CompileRustNodeLocalInternalInputModel) {
      CompileRustNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeLocalInternalInput>
    }
    return CompileRustNodeLocalInternalInputModel!
  }

let CompileRustNodeOutputModel: z.ZodType<CompileRustNodeOutput>

export const CompileRustNodeOutputParser =
  (): z.ZodType<CompileRustNodeOutput> => {
    if (!CompileRustNodeOutputModel) {
      CompileRustNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileRustNodeOutput>
    }
    return CompileRustNodeOutputModel!
  }

let CompileRustNodeRemoteInputModel: z.ZodType<CompileRustNodeRemoteInput>

export const CompileRustNodeRemoteInputParser =
  (): z.ZodType<CompileRustNodeRemoteInput> => {
    if (!CompileRustNodeRemoteInputModel) {
      CompileRustNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustNodeRemoteInput>
    }
    return CompileRustNodeRemoteInputModel!
  }
