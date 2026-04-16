import { z } from 'zod'

import {
  DisassembleRadareProfileParser,
  DisassembleRadareToolParser,
} from '~/code/form/action/disassemble/radare/shared/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const DisassembleRadareNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tool: z.optional(z.lazy(() => DisassembleRadareToolParser)),
  script: z.optional(z.string()),
  profile: z.optional(z.lazy(() => DisassembleRadareProfileParser)),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareNodeClientInputRecord = z.infer<
  typeof DisassembleRadareNodeClientInputParser
>

export const DisassembleRadareNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  tool: z.optional(z.lazy(() => DisassembleRadareToolParser)),
  script: z.optional(z.string()),
  profile: z.optional(z.lazy(() => DisassembleRadareProfileParser)),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareNodeExternalInputRecord = z.infer<
  typeof DisassembleRadareNodeExternalInputParser
>

export const DisassembleRadareNodeInputParser = z.union([
  z.lazy(() => DisassembleRadareNodeRemoteInputParser),
  z.lazy(() => DisassembleRadareNodeLocalExternalInputParser),
  z.lazy(() => DisassembleRadareNodeLocalInternalInputParser),
])

export type DisassembleRadareNodeInputRecord = z.infer<
  typeof DisassembleRadareNodeInputParser
>

export const DisassembleRadareNodeLocalExternalInputParser = z.object({
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
  tool: z.optional(z.lazy(() => DisassembleRadareToolParser)),
  script: z.optional(z.string()),
  profile: z.optional(z.lazy(() => DisassembleRadareProfileParser)),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareNodeLocalExternalInputRecord = z.infer<
  typeof DisassembleRadareNodeLocalExternalInputParser
>

export const DisassembleRadareNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
  tool: z.optional(z.lazy(() => DisassembleRadareToolParser)),
  script: z.optional(z.string()),
  profile: z.optional(z.lazy(() => DisassembleRadareProfileParser)),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareNodeLocalInputRecord = z.infer<
  typeof DisassembleRadareNodeLocalInputParser
>

export const DisassembleRadareNodeLocalInternalInputParser = z.object({
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
  tool: z.optional(z.lazy(() => DisassembleRadareToolParser)),
  script: z.optional(z.string()),
  profile: z.optional(z.lazy(() => DisassembleRadareProfileParser)),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareNodeLocalInternalInputRecord = z.infer<
  typeof DisassembleRadareNodeLocalInternalInputParser
>

export const DisassembleRadareNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type DisassembleRadareNodeOutputRecord = z.infer<
  typeof DisassembleRadareNodeOutputParser
>

export const DisassembleRadareNodeRemoteInputParser = z.object({
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
  tool: z.optional(z.lazy(() => DisassembleRadareToolParser)),
  script: z.optional(z.string()),
  profile: z.optional(z.lazy(() => DisassembleRadareProfileParser)),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareNodeRemoteInputRecord = z.infer<
  typeof DisassembleRadareNodeRemoteInputParser
>
