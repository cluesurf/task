import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CompileLlvmIrToAssembly } from '~/code/type/action/compile/code/llvm-ir/index'
import { AssemblySyntaxParser } from '~/code/type/object/assembly/parsers'
import { LlvmArchitectureParser } from '~/code/type/object/llvm/parsers'

let CompileLlvmIrToAssemblyModel: z.ZodType<CompileLlvmIrToAssembly>

export const CompileLlvmIrToAssemblyParser =
  (): z.ZodType<CompileLlvmIrToAssembly> => {
    if (!CompileLlvmIrToAssemblyModel) {
      CompileLlvmIrToAssemblyModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<CompileLlvmIrToAssembly>
    }
    return CompileLlvmIrToAssemblyModel!
  }
