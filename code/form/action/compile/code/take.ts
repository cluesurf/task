import { z } from 'zod'

import {
  FileContentParser,
  FilePathParser,
  LocalPathParser,
} from '~/code/form/object/file/take'

export const CompileApiParser = z.object({
  input: z.object({
    format: z.string(),
  }),
  output: z.object({
    format: z.string(),
  }),
})

export type CompileApiRecord = z.infer<typeof CompileApiParser>

export const ResolveInputForCompileLocalExternalParser = z.object({
  pathScope: z.optional(z.string()),
  input: z.object({
    format: z.string(),
    file: z.union([
      z.lazy(() => FilePathParser),
      z.lazy(() => FileContentParser),
    ]),
  }),
  output: z.object({
    format: z.string(),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
})

export type ResolveInputForCompileLocalExternalRecord = z.infer<
  typeof ResolveInputForCompileLocalExternalParser
>

export const ResolveInputForCompileLocalInternalParser = z.object({
  pathScope: z.optional(z.string()),
  input: z.object({
    format: z.string(),
    file: z.union([
      z.lazy(() => FilePathParser),
      z.lazy(() => FileContentParser),
    ]),
  }),
  output: z.object({
    format: z.string(),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
})

export type ResolveInputForCompileLocalInternalRecord = z.infer<
  typeof ResolveInputForCompileLocalInternalParser
>

export const ResolveInputForCompileRemoteParser = z.object({
  pathScope: z.optional(z.string()),
  input: z.object({
    format: z.string(),
    file: z.union([
      z.lazy(() => FilePathParser),
      z.lazy(() => FileContentParser),
    ]),
  }),
  output: z.object({
    format: z.string(),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
})

export type ResolveInputForCompileRemoteRecord = z.infer<
  typeof ResolveInputForCompileRemoteParser
>
