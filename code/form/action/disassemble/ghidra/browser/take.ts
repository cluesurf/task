import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const DisassembleGhidraBrowserInputParser = z.union([
  z.lazy(() => DisassembleGhidraBrowserRemoteInputParser),
  z.lazy(() => DisassembleGhidraBrowserLocalInputParser),
])

export type DisassembleGhidraBrowserInputRecord = z.infer<
  typeof DisassembleGhidraBrowserInputParser
>

export const DisassembleGhidraBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
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

export type DisassembleGhidraBrowserLocalInputRecord = z.infer<
  typeof DisassembleGhidraBrowserLocalInputParser
>

export const DisassembleGhidraBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type DisassembleGhidraBrowserOutputRecord = z.infer<
  typeof DisassembleGhidraBrowserOutputParser
>

export const DisassembleGhidraBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
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

export type DisassembleGhidraBrowserRemoteInputRecord = z.infer<
  typeof DisassembleGhidraBrowserRemoteInputParser
>
