import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileCNodeClientInput,
  CompileCNodeExternalInput,
  CompileCNodeInput,
  CompileCNodeLocalExternalInput,
  CompileCNodeLocalInput,
  CompileCNodeLocalInternalInput,
  CompileCNodeOutput,
  CompileCNodeRemoteInput,
} from '~/code/type/action/compile/code/c/node/index'
import { CInputFormatParser } from '~/code/type/action/compile/code/c/shared/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/type/object/llvm/parsers'
import { AssemblySyntaxParser } from '~/code/type/object/assembly/parsers'

let CompileCNodeClientInputModel: z.ZodType<CompileCNodeClientInput>

export const CompileCNodeClientInputParser =
  (): z.ZodType<CompileCNodeClientInput> => {
    if (!CompileCNodeClientInputModel) {
      CompileCNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeClientInput>
    }
    return CompileCNodeClientInputModel!
  }

let CompileCNodeExternalInputModel: z.ZodType<CompileCNodeExternalInput>

export const CompileCNodeExternalInputParser =
  (): z.ZodType<CompileCNodeExternalInput> => {
    if (!CompileCNodeExternalInputModel) {
      CompileCNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeExternalInput>
    }
    return CompileCNodeExternalInputModel!
  }

let CompileCNodeInputModel: z.ZodType<CompileCNodeInput>

export const CompileCNodeInputParser =
  (): z.ZodType<CompileCNodeInput> => {
    if (!CompileCNodeInputModel) {
      CompileCNodeInputModel = z.union([
        z.lazy(() => CompileCNodeRemoteInputParser()),
        z.lazy(() => CompileCNodeLocalExternalInputParser()),
        z.lazy(() => CompileCNodeLocalInternalInputParser()),
      ])
    }
    return CompileCNodeInputModel!
  }

let CompileCNodeLocalExternalInputModel: z.ZodType<CompileCNodeLocalExternalInput>

export const CompileCNodeLocalExternalInputParser =
  (): z.ZodType<CompileCNodeLocalExternalInput> => {
    if (!CompileCNodeLocalExternalInputModel) {
      CompileCNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeLocalExternalInput>
    }
    return CompileCNodeLocalExternalInputModel!
  }

let CompileCNodeLocalInputModel: z.ZodType<CompileCNodeLocalInput>

export const CompileCNodeLocalInputParser =
  (): z.ZodType<CompileCNodeLocalInput> => {
    if (!CompileCNodeLocalInputModel) {
      CompileCNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeLocalInput>
    }
    return CompileCNodeLocalInputModel!
  }

let CompileCNodeLocalInternalInputModel: z.ZodType<CompileCNodeLocalInternalInput>

export const CompileCNodeLocalInternalInputParser =
  (): z.ZodType<CompileCNodeLocalInternalInput> => {
    if (!CompileCNodeLocalInternalInputModel) {
      CompileCNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeLocalInternalInput>
    }
    return CompileCNodeLocalInternalInputModel!
  }

let CompileCNodeOutputModel: z.ZodType<CompileCNodeOutput>

export const CompileCNodeOutputParser =
  (): z.ZodType<CompileCNodeOutput> => {
    if (!CompileCNodeOutputModel) {
      CompileCNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileCNodeOutput>
    }
    return CompileCNodeOutputModel!
  }

let CompileCNodeRemoteInputModel: z.ZodType<CompileCNodeRemoteInput>

export const CompileCNodeRemoteInputParser =
  (): z.ZodType<CompileCNodeRemoteInput> => {
    if (!CompileCNodeRemoteInputModel) {
      CompileCNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCNodeRemoteInput>
    }
    return CompileCNodeRemoteInputModel!
  }
