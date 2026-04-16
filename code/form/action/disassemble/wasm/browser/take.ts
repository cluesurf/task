import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const DisassembleWasmBrowserInputParser = z.union([
  z.lazy(() => DisassembleWasmBrowserRemoteInputParser),
  z.lazy(() => DisassembleWasmBrowserLocalInputParser),
])

export type DisassembleWasmBrowserInputRecord = z.infer<
  typeof DisassembleWasmBrowserInputParser
>

export const DisassembleWasmBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmBrowserLocalInputRecord = z.infer<
  typeof DisassembleWasmBrowserLocalInputParser
>

export const DisassembleWasmBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type DisassembleWasmBrowserOutputRecord = z.infer<
  typeof DisassembleWasmBrowserOutputParser
>

export const DisassembleWasmBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmBrowserRemoteInputRecord = z.infer<
  typeof DisassembleWasmBrowserRemoteInputParser
>
