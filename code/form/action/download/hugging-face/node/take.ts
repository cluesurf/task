import { z } from 'zod'

import { HuggingFaceRepoTypeParser } from '~/code/form/object/hugging-face/take'

export const DownloadHuggingFaceNodeInputParser = z.object({
  repo: z.string(),
  repoType: z.optional(z.lazy(() => HuggingFaceRepoTypeParser)),
  directory: z.object({
    path: z.string(),
  }),
  include: z.optional(z.array(z.string())),
  exclude: z.optional(z.array(z.string())),
  revision: z.optional(z.string()),
})

export type DownloadHuggingFaceNodeInputRecord = z.infer<
  typeof DownloadHuggingFaceNodeInputParser
>

export const DownloadHuggingFaceNodeOutputParser = z.object({
  directory: z.string(),
})

export type DownloadHuggingFaceNodeOutputRecord = z.infer<
  typeof DownloadHuggingFaceNodeOutputParser
>
