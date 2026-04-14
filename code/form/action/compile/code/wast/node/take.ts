import { z } from 'zod'

import {
  WastInputFormatParser,
  WastOutputFormatParser,
} from '~/code/form/action/compile/code/wast/shared/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const CompileWastNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
  }),
})

export type CompileWastNodeClientInputRecord = z.infer<
  typeof CompileWastNodeClientInputParser
>

export const CompileWastNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
  }),
})

export type CompileWastNodeExternalInputRecord = z.infer<
  typeof CompileWastNodeExternalInputParser
>

export const CompileWastNodeInputParser = z.union([
  z.lazy(() => CompileWastNodeRemoteInputParser),
  z.lazy(() => CompileWastNodeLocalExternalInputParser),
  z.lazy(() => CompileWastNodeLocalInternalInputParser),
])

export type CompileWastNodeInputRecord = z.infer<
  typeof CompileWastNodeInputParser
>

export const CompileWastNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileWastNodeLocalExternalInputRecord = z.infer<
  typeof CompileWastNodeLocalExternalInputParser
>

export const CompileWastNodeLocalInputParser = z.object({
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileWastNodeLocalInputRecord = z.infer<
  typeof CompileWastNodeLocalInputParser
>

export const CompileWastNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileWastNodeLocalInternalInputRecord = z.infer<
  typeof CompileWastNodeLocalInternalInputParser
>

export const CompileWastNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompileWastNodeOutputRecord = z.infer<
  typeof CompileWastNodeOutputParser
>

export const CompileWastNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileWastNodeRemoteInputRecord = z.infer<
  typeof CompileWastNodeRemoteInputParser
>
