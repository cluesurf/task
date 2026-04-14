import { z } from 'zod'

import {
  FileContentParser,
  FilePathParser,
  LocalPathParser,
} from '~/code/form/object/file/take'

export const ResolveInputForSanitizeLocalExternalParser = z.object({
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

export type ResolveInputForSanitizeLocalExternalRecord = z.infer<
  typeof ResolveInputForSanitizeLocalExternalParser
>

export const ResolveInputForSanitizeLocalInternalParser = z.object({
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

export type ResolveInputForSanitizeLocalInternalRecord = z.infer<
  typeof ResolveInputForSanitizeLocalInternalParser
>

export const ResolveInputForSanitizeRemoteParser = z.object({
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

export type ResolveInputForSanitizeRemoteRecord = z.infer<
  typeof ResolveInputForSanitizeRemoteParser
>

export const SanitizeApiParser = z.object({
  input: z.object({
    format: z.string(),
  }),
})

export type SanitizeApiRecord = z.infer<typeof SanitizeApiParser>
