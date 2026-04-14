import { z } from 'zod'

import {
  Flip,
  GifsicleOptimizeOption,
} from '~/code/form/action/optimize/image/shared'
import {
  FLIP,
  GIFSICLE_OPTIMIZE_OPTION,
} from '~/code/form/action/optimize/image/shared/base'

export const BuildCommandToOptimizeGifWithGifsicleParser = z.object({
  lossy: z.optional(z.number().int().gte(0)),
  background: z.optional(z.string()),
  left: z.optional(z.number().int()),
  right: z.optional(z.number().int()),
  top: z.optional(z.number().int()),
  bottom: z.optional(z.number().int()),
  flip: z.optional(z.lazy(() => FlipParser)),
  transparent: z.optional(z.string()),
  optimize: z.optional(z.lazy(() => GifsicleOptimizeOptionParser)),
  scale: z.optional(z.number()),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type BuildCommandToOptimizeGifWithGifsicleRecord = z.infer<
  typeof BuildCommandToOptimizeGifWithGifsicleParser
>

export const FlipParser = z.enum(
  FLIP as readonly [string, ...string[]],
) as z.ZodType<Flip>

export const GifsicleOptimizeOptionParser = z.enum(
  GIFSICLE_OPTIMIZE_OPTION as readonly [string, ...string[]],
) as z.ZodType<GifsicleOptimizeOption>
