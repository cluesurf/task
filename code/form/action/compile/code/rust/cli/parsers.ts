import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CompileRustCommandInput } from '~/code/form/action/compile/code/rust/cli/index'
import {
  RustCompilerTargetParser,
  RustInputFormatParser,
  RustOutputFormatParser,
} from '~/code/form/object/rust/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

let CompileRustCommandInputModel: z.ZodType<CompileRustCommandInput>

export const CompileRustCommandInputParser =
  (): z.ZodType<CompileRustCommandInput> => {
    if (!CompileRustCommandInputModel) {
      CompileRustCommandInputModel = z.object({
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
      }) as z.ZodType<CompileRustCommandInput>
    }
    return CompileRustCommandInputModel!
  }
