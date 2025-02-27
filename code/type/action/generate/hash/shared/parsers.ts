import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ForgeMessageDigest,
  GenerateHash,
} from '~/code/type/action/generate/hash/shared/index'

let ForgeMessageDigestModel: z.ZodType<ForgeMessageDigest>

export const ForgeMessageDigestParser = () => {
  if (!ForgeMessageDigestModel) {
    ForgeMessageDigestModel = z.enum(
      LOAD('forge_message_digest') as readonly [string, ...string[]],
    ) as z.ZodType<ForgeMessageDigest>
  }
  return ForgeMessageDigestModel!
}

let GenerateHashModel: z.ZodType<GenerateHash>

export const GenerateHashParser = (): z.ZodType<GenerateHash> => {
  if (!GenerateHashModel) {
    GenerateHashModel = z.object({
      class: z.lazy(() => ForgeMessageDigestParser()),
      content: z.union([z.string(), z.instanceof(ArrayBuffer)]),
    }) as z.ZodType<GenerateHash>
  }
  return GenerateHashModel!
}
