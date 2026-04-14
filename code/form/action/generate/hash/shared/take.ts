import { z } from 'zod'

import { ForgeMessageDigest } from '~/code/form/action/generate/hash/shared'
import { FORGE_MESSAGE_DIGEST } from '~/code/form/action/generate/hash/shared/base'

export const ForgeMessageDigestParser = z.enum(
  FORGE_MESSAGE_DIGEST as readonly [string, ...string[]],
) as z.ZodType<ForgeMessageDigest>

export const GenerateHashParser = z.object({
  class: z.lazy(() => ForgeMessageDigestParser),
  content: z.union([z.string(), z.instanceof(ArrayBuffer)]),
})

export type GenerateHashRecord = z.infer<typeof GenerateHashParser>
