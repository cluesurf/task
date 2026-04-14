import { z } from 'zod'

import { Task } from '~/code/form/action/shared'
import { TASK } from '~/code/form/action/shared/base'
import {
  FileContentParser,
  FilePathParser,
} from '~/code/form/object/file/take'

export const BuildBaseFileInputParser = z.object({
  tool: z.optional(z.string()),
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
})

export type BuildBaseFileInputRecord = z.infer<
  typeof BuildBaseFileInputParser
>

export const BuildBaseInputDirectoryOrFileOutputFileParser = z.object({
  input: z.object({
    directory: z.optional(
      z.object({
        path: z.string(),
      }),
    ),
    file: z.optional(
      z.object({
        path: z.string(),
      }),
    ),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type BuildBaseInputDirectoryOrFileOutputFileRecord = z.infer<
  typeof BuildBaseInputDirectoryOrFileOutputFileParser
>

export const BuildBaseInputFileOutputDirectoryParser = z.object({
  output: z.object({
    directory: z.object({
      path: z.string(),
    }),
  }),
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type BuildBaseInputFileOutputDirectoryRecord = z.infer<
  typeof BuildBaseInputFileOutputDirectoryParser
>

export const BuildFormatInputOutputParser = z.object({
  tool: z.optional(z.string()),
  input: z.object({
    format: z.string(),
  }),
  output: z.object({
    format: z.string(),
  }),
})

export type BuildFormatInputOutputRecord = z.infer<
  typeof BuildFormatInputOutputParser
>

export const ConvertFileBaseParser = z.object({
  tool: z.optional(z.string()),
  remote: z.optional(z.boolean()),
  async: z.optional(z.boolean()).default(false),
  input: z.object({
    format: z.string(),
    file: z.union([
      z.lazy(() => FileContentParser),
      z.lazy(() => FilePathParser),
    ]),
  }),
  output: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type ConvertFileBaseRecord = z.infer<
  typeof ConvertFileBaseParser
>

export const ConvertFileBaseRemoteParser = z.object({
  tool: z.optional(z.string()),
  remote: z.optional(z.boolean()),
  async: z.optional(z.boolean()).default(false),
  input: z.object({
    format: z.string(),
    file: z.union([
      z.lazy(() => FileContentParser),
      z.lazy(() => FilePathParser),
    ]),
  }),
  output: z.object({
    format: z.string(),
  }),
})

export type ConvertFileBaseRemoteRecord = z.infer<
  typeof ConvertFileBaseRemoteParser
>

export const TaskParser = z.enum(
  TASK as readonly [string, ...string[]],
) as z.ZodType<Task>
