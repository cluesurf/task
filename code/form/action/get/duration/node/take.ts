import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const GetDurationNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationNodeClientInputRecord = z.infer<
  typeof GetDurationNodeClientInputParser
>

export const GetDurationNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationNodeExternalInputRecord = z.infer<
  typeof GetDurationNodeExternalInputParser
>

export const GetDurationNodeInputParser = z.union([
  z.lazy(() => GetDurationNodeRemoteInputParser),
  z.lazy(() => GetDurationNodeLocalExternalInputParser),
  z.lazy(() => GetDurationNodeLocalInternalInputParser),
])

export type GetDurationNodeInputRecord = z.infer<
  typeof GetDurationNodeInputParser
>

export const GetDurationNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationNodeLocalExternalInputRecord = z.infer<
  typeof GetDurationNodeLocalExternalInputParser
>

export const GetDurationNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationNodeLocalInputRecord = z.infer<
  typeof GetDurationNodeLocalInputParser
>

export const GetDurationNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
  ),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationNodeLocalInternalInputRecord = z.infer<
  typeof GetDurationNodeLocalInternalInputParser
>

export const GetDurationNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type GetDurationNodeOutputRecord = z.infer<
  typeof GetDurationNodeOutputParser
>

export const GetDurationNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationNodeRemoteInputRecord = z.infer<
  typeof GetDurationNodeRemoteInputParser
>
