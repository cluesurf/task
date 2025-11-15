import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  BuildCommandToOptimizeGifWithGifsicle,
  Flip,
  GifsicleOptimizeOption,
} from '~/code/form/action/optimize/image/shared/index'

let BuildCommandToOptimizeGifWithGifsicleModel: z.ZodType<BuildCommandToOptimizeGifWithGifsicle>

export const BuildCommandToOptimizeGifWithGifsicleParser =
  (): z.ZodType<BuildCommandToOptimizeGifWithGifsicle> => {
    if (!BuildCommandToOptimizeGifWithGifsicleModel) {
      BuildCommandToOptimizeGifWithGifsicleModel = z.object({
        lossy: z.optional(z.number().int().gte(0)),
        background: z.optional(z.string()),
        left: z.optional(z.number().int()),
        right: z.optional(z.number().int()),
        top: z.optional(z.number().int()),
        bottom: z.optional(z.number().int()),
        flip: z.optional(z.lazy(() => FlipParser())),
        transparent: z.optional(z.string()),
        optimize: z.optional(
          z.lazy(() => GifsicleOptimizeOptionParser()),
        ),
        scale: z.optional(z.number()),
        output: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<BuildCommandToOptimizeGifWithGifsicle>
    }
    return BuildCommandToOptimizeGifWithGifsicleModel!
  }

let FlipModel: z.ZodType<Flip>

export const FlipParser = () => {
  if (!FlipModel) {
    FlipModel = z.enum(
      LOAD('flip') as readonly [string, ...string[]],
    ) as z.ZodType<Flip>
  }
  return FlipModel!
}

let GifsicleOptimizeOptionModel: z.ZodType<GifsicleOptimizeOption>

export const GifsicleOptimizeOptionParser = () => {
  if (!GifsicleOptimizeOptionModel) {
    GifsicleOptimizeOptionModel = z.enum(
      LOAD('gifsicle_optimize_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<GifsicleOptimizeOption>
  }
  return GifsicleOptimizeOptionModel!
}
