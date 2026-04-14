import { z } from 'zod'

import { HuggingFaceRepoTypeParser } from '~/code/form/object/hugging-face/take'

export const DownloadHuggingFaceCommandInputParser = z.object({
  repo: z.string(),
  repoType: z.optional(z.lazy(() => HuggingFaceRepoTypeParser)),
  directory: z.object({
    path: z.string(),
  }),
  include: z.optional(z.array(z.string())),
  exclude: z.optional(z.array(z.string())),
  revision: z.optional(z.string()),
  help: z.optional(z.boolean()),
})

export type DownloadHuggingFaceCommandInputRecord = z.infer<
  typeof DownloadHuggingFaceCommandInputParser
>
