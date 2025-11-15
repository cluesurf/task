import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CompileCppCommandInput } from '~/code/form/action/compile/code/cpp/cli/index'
import { CppInputFormatParser } from '~/code/form/action/compile/code/cpp/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/form/object/llvm/parsers'
import { AssemblySyntaxParser } from '~/code/form/object/assembly/parsers'

let CompileCppCommandInputModel: z.ZodType<CompileCppCommandInput>

export const CompileCppCommandInputParser =
  (): z.ZodType<CompileCppCommandInput> => {
    if (!CompileCppCommandInputModel) {
      CompileCppCommandInputModel = z.object({
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
      }) as z.ZodType<CompileCppCommandInput>
    }
    return CompileCppCommandInputModel!
  }
