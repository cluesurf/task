import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const EncryptFileBrowserInputParser = z.union([
  z.lazy(() => EncryptFileBrowserRemoteInputParser),
  z.lazy(() => EncryptFileBrowserLocalInputParser),
])

export type EncryptFileBrowserInputRecord = z.infer<
  typeof EncryptFileBrowserInputParser
>

export const EncryptFileBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileBrowserLocalInputRecord = z.infer<
  typeof EncryptFileBrowserLocalInputParser
>

export const EncryptFileBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type EncryptFileBrowserOutputRecord = z.infer<
  typeof EncryptFileBrowserOutputParser
>

export const EncryptFileBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileBrowserRemoteInputRecord = z.infer<
  typeof EncryptFileBrowserRemoteInputParser
>
