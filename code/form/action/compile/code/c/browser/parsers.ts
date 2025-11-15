import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  CompileCBrowserInput,
  CompileCBrowserLocalInput,
  CompileCBrowserOutput,
  CompileCBrowserRemoteInput,
} from '~/code/form/action/compile/code/c/browser/index'
import { CInputFormatParser } from '~/code/form/action/compile/code/c/shared/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/form/object/llvm/parsers'
import { AssemblySyntaxParser } from '~/code/form/object/assembly/parsers'

let CompileCBrowserInputModel: z.ZodType<CompileCBrowserInput>

export const CompileCBrowserInputParser =
  (): z.ZodType<CompileCBrowserInput> => {
    if (!CompileCBrowserInputModel) {
      CompileCBrowserInputModel = z.union([
        z.lazy(() => CompileCBrowserRemoteInputParser()),
        z.lazy(() => CompileCBrowserLocalInputParser()),
      ])
    }
    return CompileCBrowserInputModel!
  }

let CompileCBrowserLocalInputModel: z.ZodType<CompileCBrowserLocalInput>

export const CompileCBrowserLocalInputParser =
  (): z.ZodType<CompileCBrowserLocalInput> => {
    if (!CompileCBrowserLocalInputModel) {
      CompileCBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
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
      }) as z.ZodType<CompileCBrowserLocalInput>
    }
    return CompileCBrowserLocalInputModel!
  }

let CompileCBrowserOutputModel: z.ZodType<CompileCBrowserOutput>

export const CompileCBrowserOutputParser =
  (): z.ZodType<CompileCBrowserOutput> => {
    if (!CompileCBrowserOutputModel) {
      CompileCBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileCBrowserOutput>
    }
    return CompileCBrowserOutputModel!
  }

let CompileCBrowserRemoteInputModel: z.ZodType<CompileCBrowserRemoteInput>

export const CompileCBrowserRemoteInputParser =
  (): z.ZodType<CompileCBrowserRemoteInput> => {
    if (!CompileCBrowserRemoteInputModel) {
      CompileCBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
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
      }) as z.ZodType<CompileCBrowserRemoteInput>
    }
    return CompileCBrowserRemoteInputModel!
  }
