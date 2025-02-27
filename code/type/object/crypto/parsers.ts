import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  Cipher,
  CipherData,
  GenerateMurmurHash,
} from '~/code/type/object/crypto/index'

let CipherModel: z.ZodType<Cipher>

export const CipherParser = () => {
  if (!CipherModel) {
    CipherModel = z.enum(
      LOAD('cipher') as readonly [string, ...string[]],
    ) as z.ZodType<Cipher>
  }
  return CipherModel!
}

let CipherDataModel: z.ZodType<CipherData>

export const CipherDataParser = (): z.ZodType<CipherData> => {
  if (!CipherDataModel) {
    CipherDataModel = z.object({
      head: z.string(),
    }) as z.ZodType<CipherData>
  }
  return CipherDataModel!
}

let GenerateMurmurHashModel: z.ZodType<GenerateMurmurHash>

export const GenerateMurmurHashParser =
  (): z.ZodType<GenerateMurmurHash> => {
    if (!GenerateMurmurHashModel) {
      GenerateMurmurHashModel = z.object({
        input: z.string(),
        seed: z.number().int(),
        version: z.optional(z.string()).default('3'),
      }) as z.ZodType<GenerateMurmurHash>
    }
    return GenerateMurmurHashModel!
  }
