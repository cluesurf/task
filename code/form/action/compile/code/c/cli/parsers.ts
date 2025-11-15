import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CompileCCommandInput } from '~/code/form/action/compile/code/c/cli/index'
import { CInputFormatParser } from '~/code/form/action/compile/code/c/shared/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/form/object/llvm/parsers'
import { AssemblySyntaxParser } from '~/code/form/object/assembly/parsers'

let CompileCCommandInputModel: z.ZodType<CompileCCommandInput>

export const CompileCCommandInputParser =
  (): z.ZodType<CompileCCommandInput> => {
    if (!CompileCCommandInputModel) {
      CompileCCommandInputModel = z.object({
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
      }) as z.ZodType<CompileCCommandInput>
    }
    return CompileCCommandInputModel!
  }
