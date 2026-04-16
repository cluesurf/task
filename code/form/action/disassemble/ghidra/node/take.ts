import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const DisassembleGhidraNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  profile: z.optional(z.string()),
  script: z.optional(z.string()),
  ghidraHome: z.optional(z.string()),
  projectDir: z.optional(z.string()),
  projectName: z.optional(z.string()),
  keepProject: z.optional(z.boolean()),
  verbose: z.optional(z.boolean()),
  quiet: z.optional(z.boolean()),
})

export type DisassembleGhidraNodeClientInputRecord = z.infer<
  typeof DisassembleGhidraNodeClientInputParser
>

export const DisassembleGhidraNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  profile: z.optional(z.string()),
  script: z.optional(z.string()),
  ghidraHome: z.optional(z.string()),
  projectDir: z.optional(z.string()),
  projectName: z.optional(z.string()),
  keepProject: z.optional(z.boolean()),
  verbose: z.optional(z.boolean()),
  quiet: z.optional(z.boolean()),
})

export type DisassembleGhidraNodeExternalInputRecord = z.infer<
  typeof DisassembleGhidraNodeExternalInputParser
>

export const DisassembleGhidraNodeInputParser = z.union([
  z.lazy(() => DisassembleGhidraNodeRemoteInputParser),
  z.lazy(() => DisassembleGhidraNodeLocalExternalInputParser),
  z.lazy(() => DisassembleGhidraNodeLocalInternalInputParser),
])

export type DisassembleGhidraNodeInputRecord = z.infer<
  typeof DisassembleGhidraNodeInputParser
>

export const DisassembleGhidraNodeLocalExternalInputParser = z.object({
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
  profile: z.optional(z.string()),
  script: z.optional(z.string()),
  ghidraHome: z.optional(z.string()),
  projectDir: z.optional(z.string()),
  projectName: z.optional(z.string()),
  keepProject: z.optional(z.boolean()),
  verbose: z.optional(z.boolean()),
  quiet: z.optional(z.boolean()),
})

export type DisassembleGhidraNodeLocalExternalInputRecord = z.infer<
  typeof DisassembleGhidraNodeLocalExternalInputParser
>

export const DisassembleGhidraNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  profile: z.optional(z.string()),
  script: z.optional(z.string()),
  ghidraHome: z.optional(z.string()),
  projectDir: z.optional(z.string()),
  projectName: z.optional(z.string()),
  keepProject: z.optional(z.boolean()),
  verbose: z.optional(z.boolean()),
  quiet: z.optional(z.boolean()),
})

export type DisassembleGhidraNodeLocalInputRecord = z.infer<
  typeof DisassembleGhidraNodeLocalInputParser
>

export const DisassembleGhidraNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  profile: z.optional(z.string()),
  script: z.optional(z.string()),
  ghidraHome: z.optional(z.string()),
  projectDir: z.optional(z.string()),
  projectName: z.optional(z.string()),
  keepProject: z.optional(z.boolean()),
  verbose: z.optional(z.boolean()),
  quiet: z.optional(z.boolean()),
})

export type DisassembleGhidraNodeLocalInternalInputRecord = z.infer<
  typeof DisassembleGhidraNodeLocalInternalInputParser
>

export const DisassembleGhidraNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type DisassembleGhidraNodeOutputRecord = z.infer<
  typeof DisassembleGhidraNodeOutputParser
>

export const DisassembleGhidraNodeRemoteInputParser = z.object({
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
  profile: z.optional(z.string()),
  script: z.optional(z.string()),
  ghidraHome: z.optional(z.string()),
  projectDir: z.optional(z.string()),
  projectName: z.optional(z.string()),
  keepProject: z.optional(z.boolean()),
  verbose: z.optional(z.boolean()),
  quiet: z.optional(z.boolean()),
})

export type DisassembleGhidraNodeRemoteInputRecord = z.infer<
  typeof DisassembleGhidraNodeRemoteInputParser
>
