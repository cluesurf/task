import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileCppBrowserInput,
  CompileCppBrowserLocalInput,
  CompileCppBrowserOutput,
  CompileCppBrowserRemoteInput,
} from '~/code/type/action/compile/code/cpp/browser/index'
import { CppInputFormatParser } from '~/code/type/action/compile/code/cpp/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/type/object/llvm/parsers'
import { AssemblySyntaxParser } from '~/code/type/object/assembly/parsers'

let CompileCppBrowserInputModel: z.ZodType<CompileCppBrowserInput>

export const CompileCppBrowserInputParser =
  (): z.ZodType<CompileCppBrowserInput> => {
    if (!CompileCppBrowserInputModel) {
      CompileCppBrowserInputModel = z.union([
        z.lazy(() => CompileCppBrowserRemoteInputParser()),
        z.lazy(() => CompileCppBrowserLocalInputParser()),
      ])
    }
    return CompileCppBrowserInputModel!
  }

let CompileCppBrowserLocalInputModel: z.ZodType<CompileCppBrowserLocalInput>

export const CompileCppBrowserLocalInputParser =
  (): z.ZodType<CompileCppBrowserLocalInput> => {
    if (!CompileCppBrowserLocalInputModel) {
      CompileCppBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
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
      }) as z.ZodType<CompileCppBrowserLocalInput>
    }
    return CompileCppBrowserLocalInputModel!
  }

let CompileCppBrowserOutputModel: z.ZodType<CompileCppBrowserOutput>

export const CompileCppBrowserOutputParser =
  (): z.ZodType<CompileCppBrowserOutput> => {
    if (!CompileCppBrowserOutputModel) {
      CompileCppBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileCppBrowserOutput>
    }
    return CompileCppBrowserOutputModel!
  }

let CompileCppBrowserRemoteInputModel: z.ZodType<CompileCppBrowserRemoteInput>

export const CompileCppBrowserRemoteInputParser =
  (): z.ZodType<CompileCppBrowserRemoteInput> => {
    if (!CompileCppBrowserRemoteInputModel) {
      CompileCppBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
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
      }) as z.ZodType<CompileCppBrowserRemoteInput>
    }
    return CompileCppBrowserRemoteInputModel!
  }
