import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'
import {
  RustCompilerTargetParser,
  RustInputFormatParser,
  RustOutputFormatParser,
} from '~/code/form/object/rust/take'

export const CompileRustNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => RustInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => RustOutputFormatParser),
    optimize: z.optional(z.boolean()).default(false),
    target: z.optional(z.lazy(() => RustCompilerTargetParser)),
  }),
  explain: z.optional(z.boolean()).default(false),
})

export type CompileRustNodeClientInputRecord = z.infer<
  typeof CompileRustNodeClientInputParser
>

export const CompileRustNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => RustInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => RustOutputFormatParser),
    optimize: z.optional(z.boolean()).default(false),
    target: z.optional(z.lazy(() => RustCompilerTargetParser)),
  }),
  explain: z.optional(z.boolean()).default(false),
})

export type CompileRustNodeExternalInputRecord = z.infer<
  typeof CompileRustNodeExternalInputParser
>

export const CompileRustNodeInputParser = z.union([
  z.lazy(() => CompileRustNodeRemoteInputParser),
  z.lazy(() => CompileRustNodeLocalExternalInputParser),
  z.lazy(() => CompileRustNodeLocalInternalInputParser),
])

export type CompileRustNodeInputRecord = z.infer<
  typeof CompileRustNodeInputParser
>

export const CompileRustNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => RustInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => RustOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
    optimize: z.optional(z.boolean()).default(false),
    target: z.optional(z.lazy(() => RustCompilerTargetParser)),
  }),
  pathScope: z.optional(z.string()),
  explain: z.optional(z.boolean()).default(false),
})

export type CompileRustNodeLocalExternalInputRecord = z.infer<
  typeof CompileRustNodeLocalExternalInputParser
>

export const CompileRustNodeLocalInputParser = z.object({
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

export type CompileRustNodeLocalInputRecord = z.infer<
  typeof CompileRustNodeLocalInputParser
>

export const CompileRustNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.lazy(() => RustInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => RustOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
    optimize: z.optional(z.boolean()).default(false),
    target: z.optional(z.lazy(() => RustCompilerTargetParser)),
  }),
  pathScope: z.optional(z.string()),
  explain: z.optional(z.boolean()).default(false),
})

export type CompileRustNodeLocalInternalInputRecord = z.infer<
  typeof CompileRustNodeLocalInternalInputParser
>

export const CompileRustNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompileRustNodeOutputRecord = z.infer<
  typeof CompileRustNodeOutputParser
>

export const CompileRustNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => RustInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => RustOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
    optimize: z.optional(z.boolean()).default(false),
    target: z.optional(z.lazy(() => RustCompilerTargetParser)),
  }),
  pathScope: z.optional(z.string()),
  explain: z.optional(z.boolean()).default(false),
})

export type CompileRustNodeRemoteInputRecord = z.infer<
  typeof CompileRustNodeRemoteInputParser
>
