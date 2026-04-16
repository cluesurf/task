import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const DecryptFileNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileNodeClientInputRecord = z.infer<
  typeof DecryptFileNodeClientInputParser
>

export const DecryptFileNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileNodeExternalInputRecord = z.infer<
  typeof DecryptFileNodeExternalInputParser
>

export const DecryptFileNodeInputParser = z.union([
  z.lazy(() => DecryptFileNodeRemoteInputParser),
  z.lazy(() => DecryptFileNodeLocalExternalInputParser),
  z.lazy(() => DecryptFileNodeLocalInternalInputParser),
])

export type DecryptFileNodeInputRecord = z.infer<
  typeof DecryptFileNodeInputParser
>

export const DecryptFileNodeLocalExternalInputParser = z.object({
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
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileNodeLocalExternalInputRecord = z.infer<
  typeof DecryptFileNodeLocalExternalInputParser
>

export const DecryptFileNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileNodeLocalInputRecord = z.infer<
  typeof DecryptFileNodeLocalInputParser
>

export const DecryptFileNodeLocalInternalInputParser = z.object({
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
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileNodeLocalInternalInputRecord = z.infer<
  typeof DecryptFileNodeLocalInternalInputParser
>

export const DecryptFileNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type DecryptFileNodeOutputRecord = z.infer<
  typeof DecryptFileNodeOutputParser
>

export const DecryptFileNodeRemoteInputParser = z.object({
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
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileNodeRemoteInputRecord = z.infer<
  typeof DecryptFileNodeRemoteInputParser
>
