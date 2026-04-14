import { z } from 'zod'

import { ClangFormatParser } from '~/code/form/action/format/code/shared/take'
import { LocalPathParser } from '~/code/form/object/file/take'

export const FormatAssemblyCommandInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatAssemblyCommandInputRecord = z.infer<
  typeof FormatAssemblyCommandInputParser
>

export const FormatCodeWithClangFormatCommandInputParser = z.object({
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
  style: z.object({
    path: z.string(),
  }),
})

export type FormatCodeWithClangFormatCommandInputRecord = z.infer<
  typeof FormatCodeWithClangFormatCommandInputParser
>

export const FormatKotlinCommandInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatKotlinCommandInputRecord = z.infer<
  typeof FormatKotlinCommandInputParser
>

export const FormatPythonCommandInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatPythonCommandInputRecord = z.infer<
  typeof FormatPythonCommandInputParser
>

export const FormatRustCommandInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatRustCommandInputRecord = z.infer<
  typeof FormatRustCommandInputParser
>

export const FormatSwiftCommandInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatSwiftCommandInputRecord = z.infer<
  typeof FormatSwiftCommandInputParser
>
