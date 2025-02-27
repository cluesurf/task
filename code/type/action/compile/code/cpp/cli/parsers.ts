import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CompileCppCommandInput } from '~/code/type/action/compile/code/cpp/cli/index'
import { CppInputFormatParser } from '~/code/type/action/compile/code/cpp/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/type/object/llvm/parsers'
import { AssemblySyntaxParser } from '~/code/type/object/assembly/parsers'

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
