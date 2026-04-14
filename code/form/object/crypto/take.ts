import { z } from 'zod'

import { Cipher } from '~/code/form/object/crypto'
import { CIPHER } from '~/code/form/object/crypto/base'

export const CipherParser = z.enum(
  CIPHER as readonly [string, ...string[]],
) as z.ZodType<Cipher>

export const CipherDataParser = z.object({
  head: z.string(),
})

export type CipherDataRecord = z.infer<typeof CipherDataParser>

export const GenerateMurmurHashParser = z.object({
  input: z.string(),
  seed: z.number().int(),
  version: z.optional(z.string()).default('3'),
})

export type GenerateMurmurHashRecord = z.infer<
  typeof GenerateMurmurHashParser
>
