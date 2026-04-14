import { z } from 'zod'

import {
  FileContentParser,
  FilePathParser,
  LocalPathParser,
} from '~/code/form/object/file/take'

export const ConvertApiParser = z.object({
  input: z.object({
    format: z.string(),
  }),
  output: z.object({
    format: z.string(),
  }),
})

export type ConvertApiRecord = z.infer<typeof ConvertApiParser>

export const ConvertCommandInputParser = z.object({
  tool: z.optional(z.string()),
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type ConvertCommandInputRecord = z.infer<
  typeof ConvertCommandInputParser
>

export const ResolveInputForConvertLocalExternalParser = z.object({
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

export type ResolveInputForConvertLocalExternalRecord = z.infer<
  typeof ResolveInputForConvertLocalExternalParser
>

export const ResolveInputForConvertLocalInternalParser = z.object({
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

export type ResolveInputForConvertLocalInternalRecord = z.infer<
  typeof ResolveInputForConvertLocalInternalParser
>

export const ResolveInputForConvertRemoteParser = z.object({
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

export type ResolveInputForConvertRemoteRecord = z.infer<
  typeof ResolveInputForConvertRemoteParser
>
