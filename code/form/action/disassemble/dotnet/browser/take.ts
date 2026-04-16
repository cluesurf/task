import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const DisassembleDotnetBrowserInputParser = z.union([
  z.lazy(() => DisassembleDotnetBrowserRemoteInputParser),
  z.lazy(() => DisassembleDotnetBrowserLocalInputParser),
])

export type DisassembleDotnetBrowserInputRecord = z.infer<
  typeof DisassembleDotnetBrowserInputParser
>

export const DisassembleDotnetBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetBrowserLocalInputRecord = z.infer<
  typeof DisassembleDotnetBrowserLocalInputParser
>

export const DisassembleDotnetBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type DisassembleDotnetBrowserOutputRecord = z.infer<
  typeof DisassembleDotnetBrowserOutputParser
>

export const DisassembleDotnetBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetBrowserRemoteInputRecord = z.infer<
  typeof DisassembleDotnetBrowserRemoteInputParser
>
