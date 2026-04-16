import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const DisassembleJvmBrowserInputParser = z.union([
  z.lazy(() => DisassembleJvmBrowserRemoteInputParser),
  z.lazy(() => DisassembleJvmBrowserLocalInputParser),
])

export type DisassembleJvmBrowserInputRecord = z.infer<
  typeof DisassembleJvmBrowserInputParser
>

export const DisassembleJvmBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmBrowserLocalInputRecord = z.infer<
  typeof DisassembleJvmBrowserLocalInputParser
>

export const DisassembleJvmBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type DisassembleJvmBrowserOutputRecord = z.infer<
  typeof DisassembleJvmBrowserOutputParser
>

export const DisassembleJvmBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmBrowserRemoteInputRecord = z.infer<
  typeof DisassembleJvmBrowserRemoteInputParser
>
