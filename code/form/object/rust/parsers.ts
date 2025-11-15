import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
} from '~/code/form/object/rust/index'

let RustCompilerTargetModel: z.ZodType<RustCompilerTarget>

export const RustCompilerTargetParser = () => {
  if (!RustCompilerTargetModel) {
    RustCompilerTargetModel = z.enum(
      LOAD('rust_compiler_target') as readonly [string, ...string[]],
    ) as z.ZodType<RustCompilerTarget>
  }
  return RustCompilerTargetModel!
}

let RustInputFormatModel: z.ZodType<RustInputFormat>

export const RustInputFormatParser = () => {
  if (!RustInputFormatModel) {
    RustInputFormatModel = z.enum(
      LOAD('rust_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<RustInputFormat>
  }
  return RustInputFormatModel!
}

let RustOutputFormatModel: z.ZodType<RustOutputFormat>

export const RustOutputFormatParser = () => {
  if (!RustOutputFormatModel) {
    RustOutputFormatModel = z.enum(
      LOAD('rust_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<RustOutputFormat>
  }
  return RustOutputFormatModel!
}
