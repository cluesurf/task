import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'
import {
  RustCompilerTargetParser,
  RustInputFormatParser,
  RustOutputFormatParser,
} from '~/code/form/object/rust/take'

export const CompileRustCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => RustInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => RustOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
    optimize: z.optional(z.boolean()).default(false),
    target: z.optional(z.lazy(() => RustCompilerTargetParser)),
  }),
  pathScope: z.optional(z.string()),
  explain: z.optional(z.boolean()).default(false),
})

export type CompileRustCommandInputRecord = z.infer<
  typeof CompileRustCommandInputParser
>
