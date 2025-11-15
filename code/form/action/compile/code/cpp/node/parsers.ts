import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  CompileCppNodeClientInput,
  CompileCppNodeExternalInput,
  CompileCppNodeInput,
  CompileCppNodeLocalExternalInput,
  CompileCppNodeLocalInput,
  CompileCppNodeLocalInternalInput,
  CompileCppNodeOutput,
  CompileCppNodeRemoteInput,
} from '~/code/form/action/compile/code/cpp/node/index'
import { CppInputFormatParser } from '~/code/form/action/compile/code/cpp/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/form/object/llvm/parsers'
import { AssemblySyntaxParser } from '~/code/form/object/assembly/parsers'

let CompileCppNodeClientInputModel: z.ZodType<CompileCppNodeClientInput>

export const CompileCppNodeClientInputParser =
  (): z.ZodType<CompileCppNodeClientInput> => {
    if (!CompileCppNodeClientInputModel) {
      CompileCppNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeClientInput>
    }
    return CompileCppNodeClientInputModel!
  }

let CompileCppNodeExternalInputModel: z.ZodType<CompileCppNodeExternalInput>

export const CompileCppNodeExternalInputParser =
  (): z.ZodType<CompileCppNodeExternalInput> => {
    if (!CompileCppNodeExternalInputModel) {
      CompileCppNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeExternalInput>
    }
    return CompileCppNodeExternalInputModel!
  }

let CompileCppNodeInputModel: z.ZodType<CompileCppNodeInput>

export const CompileCppNodeInputParser =
  (): z.ZodType<CompileCppNodeInput> => {
    if (!CompileCppNodeInputModel) {
      CompileCppNodeInputModel = z.union([
        z.lazy(() => CompileCppNodeRemoteInputParser()),
        z.lazy(() => CompileCppNodeLocalExternalInputParser()),
        z.lazy(() => CompileCppNodeLocalInternalInputParser()),
      ])
    }
    return CompileCppNodeInputModel!
  }

let CompileCppNodeLocalExternalInputModel: z.ZodType<CompileCppNodeLocalExternalInput>

export const CompileCppNodeLocalExternalInputParser =
  (): z.ZodType<CompileCppNodeLocalExternalInput> => {
    if (!CompileCppNodeLocalExternalInputModel) {
      CompileCppNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeLocalExternalInput>
    }
    return CompileCppNodeLocalExternalInputModel!
  }

let CompileCppNodeLocalInputModel: z.ZodType<CompileCppNodeLocalInput>

export const CompileCppNodeLocalInputParser =
  (): z.ZodType<CompileCppNodeLocalInput> => {
    if (!CompileCppNodeLocalInputModel) {
      CompileCppNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeLocalInput>
    }
    return CompileCppNodeLocalInputModel!
  }

let CompileCppNodeLocalInternalInputModel: z.ZodType<CompileCppNodeLocalInternalInput>

export const CompileCppNodeLocalInternalInputParser =
  (): z.ZodType<CompileCppNodeLocalInternalInput> => {
    if (!CompileCppNodeLocalInternalInputModel) {
      CompileCppNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeLocalInternalInput>
    }
    return CompileCppNodeLocalInternalInputModel!
  }

let CompileCppNodeOutputModel: z.ZodType<CompileCppNodeOutput>

export const CompileCppNodeOutputParser =
  (): z.ZodType<CompileCppNodeOutput> => {
    if (!CompileCppNodeOutputModel) {
      CompileCppNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileCppNodeOutput>
    }
    return CompileCppNodeOutputModel!
  }

let CompileCppNodeRemoteInputModel: z.ZodType<CompileCppNodeRemoteInput>

export const CompileCppNodeRemoteInputParser =
  (): z.ZodType<CompileCppNodeRemoteInput> => {
    if (!CompileCppNodeRemoteInputModel) {
      CompileCppNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppNodeRemoteInput>
    }
    return CompileCppNodeRemoteInputModel!
  }
