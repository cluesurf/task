import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'
import {
  RustCompilerTargetParser,
  RustInputFormatParser,
  RustOutputFormatParser,
} from '~/code/form/object/rust/take'

export const CompileRustBrowserInputParser = z.union([
  z.lazy(() => CompileRustBrowserRemoteInputParser),
  z.lazy(() => CompileRustBrowserLocalInputParser),
])

export type CompileRustBrowserInputRecord = z.infer<
  typeof CompileRustBrowserInputParser
>

export const CompileRustBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => RustInputFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => RustOutputFormatParser),
    optimize: z.optional(z.boolean()).default(false),
    target: z.optional(z.lazy(() => RustCompilerTargetParser)),
  }),
  explain: z.optional(z.boolean()).default(false),
})

export type CompileRustBrowserLocalInputRecord = z.infer<
  typeof CompileRustBrowserLocalInputParser
>

export const CompileRustBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompileRustBrowserOutputRecord = z.infer<
  typeof CompileRustBrowserOutputParser
>

export const CompileRustBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => RustInputFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => RustOutputFormatParser),
    optimize: z.optional(z.boolean()).default(false),
    target: z.optional(z.lazy(() => RustCompilerTargetParser)),
  }),
  explain: z.optional(z.boolean()).default(false),
})

export type CompileRustBrowserRemoteInputRecord = z.infer<
  typeof CompileRustBrowserRemoteInputParser
>
