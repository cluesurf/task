import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const DisassembleJvmNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmNodeClientInputRecord = z.infer<
  typeof DisassembleJvmNodeClientInputParser
>

export const DisassembleJvmNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmNodeExternalInputRecord = z.infer<
  typeof DisassembleJvmNodeExternalInputParser
>

export const DisassembleJvmNodeInputParser = z.union([
  z.lazy(() => DisassembleJvmNodeRemoteInputParser),
  z.lazy(() => DisassembleJvmNodeLocalExternalInputParser),
  z.lazy(() => DisassembleJvmNodeLocalInternalInputParser),
])

export type DisassembleJvmNodeInputRecord = z.infer<
  typeof DisassembleJvmNodeInputParser
>

export const DisassembleJvmNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmNodeLocalExternalInputRecord = z.infer<
  typeof DisassembleJvmNodeLocalExternalInputParser
>

export const DisassembleJvmNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmNodeLocalInputRecord = z.infer<
  typeof DisassembleJvmNodeLocalInputParser
>

export const DisassembleJvmNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
  ),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmNodeLocalInternalInputRecord = z.infer<
  typeof DisassembleJvmNodeLocalInternalInputParser
>

export const DisassembleJvmNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type DisassembleJvmNodeOutputRecord = z.infer<
  typeof DisassembleJvmNodeOutputParser
>

export const DisassembleJvmNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmNodeRemoteInputRecord = z.infer<
  typeof DisassembleJvmNodeRemoteInputParser
>
