import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileCliBase,
  ConvertCliBase,
  FormatCliBase,
  VerifyCliBase,
} from '~/code/type/cli/index'
import { CliLogFormatParser } from '~/code/type/object/cli-log/parsers'

let CompileCliBaseModel: z.ZodType<CompileCliBase>

export const CompileCliBaseParser = (): z.ZodType<CompileCliBase> => {
  if (!CompileCliBaseModel) {
    CompileCliBaseModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      help: z.optional(z.boolean()),
      log: z
        .optional(z.lazy(() => CliLogFormatParser()))
        .default('pretty'),
    }) as z.ZodType<CompileCliBase>
  }
  return CompileCliBaseModel!
}

let ConvertCliBaseModel: z.ZodType<ConvertCliBase>

export const ConvertCliBaseParser = (): z.ZodType<ConvertCliBase> => {
  if (!ConvertCliBaseModel) {
    ConvertCliBaseModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      help: z.optional(z.boolean()),
      log: z
        .optional(z.lazy(() => CliLogFormatParser()))
        .default('pretty'),
    }) as z.ZodType<ConvertCliBase>
  }
  return ConvertCliBaseModel!
}

let FormatCliBaseModel: z.ZodType<FormatCliBase>

export const FormatCliBaseParser = (): z.ZodType<FormatCliBase> => {
  if (!FormatCliBaseModel) {
    FormatCliBaseModel = z.object({
      format: z.string(),
      input: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
      help: z.optional(z.boolean()),
      log: z
        .optional(z.lazy(() => CliLogFormatParser()))
        .default('pretty'),
    }) as z.ZodType<FormatCliBase>
  }
  return FormatCliBaseModel!
}

let VerifyCliBaseModel: z.ZodType<VerifyCliBase>

export const VerifyCliBaseParser = (): z.ZodType<VerifyCliBase> => {
  if (!VerifyCliBaseModel) {
    VerifyCliBaseModel = z.object({
      format: z.string(),
      file: z.object({
        path: z.string(),
      }),
      help: z.optional(z.boolean()),
      log: z
        .optional(z.lazy(() => CliLogFormatParser()))
        .default('pretty'),
    }) as z.ZodType<VerifyCliBase>
  }
  return VerifyCliBaseModel!
}
