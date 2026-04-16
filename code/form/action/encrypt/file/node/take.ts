import { z } from 'zod'

import { EncryptFileToolParser } from '~/code/form/action/encrypt/file/shared/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const EncryptFileNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tool: z.optional(z.lazy(() => EncryptFileToolParser)),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileNodeClientInputRecord = z.infer<
  typeof EncryptFileNodeClientInputParser
>

export const EncryptFileNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tool: z.optional(z.lazy(() => EncryptFileToolParser)),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileNodeExternalInputRecord = z.infer<
  typeof EncryptFileNodeExternalInputParser
>

export const EncryptFileNodeInputParser = z.union([
  z.lazy(() => EncryptFileNodeRemoteInputParser),
  z.lazy(() => EncryptFileNodeLocalExternalInputParser),
  z.lazy(() => EncryptFileNodeLocalInternalInputParser),
])

export type EncryptFileNodeInputRecord = z.infer<
  typeof EncryptFileNodeInputParser
>

export const EncryptFileNodeLocalExternalInputParser = z.object({
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
  tool: z.optional(z.lazy(() => EncryptFileToolParser)),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileNodeLocalExternalInputRecord = z.infer<
  typeof EncryptFileNodeLocalExternalInputParser
>

export const EncryptFileNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  tool: z.optional(z.lazy(() => EncryptFileToolParser)),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileNodeLocalInputRecord = z.infer<
  typeof EncryptFileNodeLocalInputParser
>

export const EncryptFileNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.lazy(() => LocalOutputPathParser),
  }),
  tool: z.optional(z.lazy(() => EncryptFileToolParser)),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileNodeLocalInternalInputRecord = z.infer<
  typeof EncryptFileNodeLocalInternalInputParser
>

export const EncryptFileNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type EncryptFileNodeOutputRecord = z.infer<
  typeof EncryptFileNodeOutputParser
>

export const EncryptFileNodeRemoteInputParser = z.object({
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
  tool: z.optional(z.lazy(() => EncryptFileToolParser)),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileNodeRemoteInputRecord = z.infer<
  typeof EncryptFileNodeRemoteInputParser
>
