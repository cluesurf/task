import { z } from 'zod'

import {
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
} from '~/code/form/object/rust'
import {
  RUST_COMPILER_TARGET,
  RUST_INPUT_FORMAT,
  RUST_OUTPUT_FORMAT,
} from '~/code/form/object/rust/base'

export const RustCompilerTargetParser = z.enum(
  RUST_COMPILER_TARGET as readonly [string, ...string[]],
) as z.ZodType<RustCompilerTarget>

export const RustInputFormatParser = z.enum(
  RUST_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<RustInputFormat>

export const RustOutputFormatParser = z.enum(
  RUST_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<RustOutputFormat>
