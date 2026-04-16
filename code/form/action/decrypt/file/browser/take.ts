import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const DecryptFileBrowserInputParser = z.union([
  z.lazy(() => DecryptFileBrowserRemoteInputParser),
  z.lazy(() => DecryptFileBrowserLocalInputParser),
])

export type DecryptFileBrowserInputRecord = z.infer<
  typeof DecryptFileBrowserInputParser
>

export const DecryptFileBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileBrowserLocalInputRecord = z.infer<
  typeof DecryptFileBrowserLocalInputParser
>

export const DecryptFileBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type DecryptFileBrowserOutputRecord = z.infer<
  typeof DecryptFileBrowserOutputParser
>

export const DecryptFileBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileBrowserRemoteInputRecord = z.infer<
  typeof DecryptFileBrowserRemoteInputParser
>
