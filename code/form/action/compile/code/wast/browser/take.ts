import { z } from 'zod'

import {
  WastInputFormatParser,
  WastOutputFormatParser,
} from '~/code/form/action/compile/code/wast/shared/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const CompileWastBrowserInputParser = z.union([
  z.lazy(() => CompileWastBrowserRemoteInputParser),
  z.lazy(() => CompileWastBrowserLocalInputParser),
])

export type CompileWastBrowserInputRecord = z.infer<
  typeof CompileWastBrowserInputParser
>

export const CompileWastBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
  }),
})

export type CompileWastBrowserLocalInputRecord = z.infer<
  typeof CompileWastBrowserLocalInputParser
>

export const CompileWastBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompileWastBrowserOutputRecord = z.infer<
  typeof CompileWastBrowserOutputParser
>

export const CompileWastBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
  }),
})

export type CompileWastBrowserRemoteInputRecord = z.infer<
  typeof CompileWastBrowserRemoteInputParser
>
