import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const DisassembleRadareBrowserInputParser = z.union([
  z.lazy(() => DisassembleRadareBrowserRemoteInputParser),
  z.lazy(() => DisassembleRadareBrowserLocalInputParser),
])

export type DisassembleRadareBrowserInputRecord = z.infer<
  typeof DisassembleRadareBrowserInputParser
>

export const DisassembleRadareBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  tool: z.optional(z.string()),
  script: z.optional(z.string()),
  profile: z.optional(z.string()),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareBrowserLocalInputRecord = z.infer<
  typeof DisassembleRadareBrowserLocalInputParser
>

export const DisassembleRadareBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type DisassembleRadareBrowserOutputRecord = z.infer<
  typeof DisassembleRadareBrowserOutputParser
>

export const DisassembleRadareBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  tool: z.optional(z.string()),
  script: z.optional(z.string()),
  profile: z.optional(z.string()),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareBrowserRemoteInputRecord = z.infer<
  typeof DisassembleRadareBrowserRemoteInputParser
>
