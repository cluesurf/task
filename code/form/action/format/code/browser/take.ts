import { z } from 'zod'

import { ClangFormatParser } from '~/code/form/action/format/code/shared/take'
import { ClangStyleAllParser } from '~/code/form/object/clang-format/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const FormatAssemblyBrowserInputParser = z.union([
  z.lazy(() => FormatAssemblyBrowserRemoteInputParser),
  z.lazy(() => FormatAssemblyBrowserLocalInputParser),
])

export type FormatAssemblyBrowserInputRecord = z.infer<
  typeof FormatAssemblyBrowserInputParser
>

export const FormatAssemblyBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  format: z.string(),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type FormatAssemblyBrowserLocalInputRecord = z.infer<
  typeof FormatAssemblyBrowserLocalInputParser
>

export const FormatAssemblyBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type FormatAssemblyBrowserOutputRecord = z.infer<
  typeof FormatAssemblyBrowserOutputParser
>

export const FormatAssemblyBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type FormatAssemblyBrowserRemoteInputRecord = z.infer<
  typeof FormatAssemblyBrowserRemoteInputParser
>

export const FormatCodeWithClangFormatBrowserInputParser = z.union([
  z.lazy(() => FormatCodeWithClangFormatBrowserRemoteInputParser),
  z.lazy(() => FormatCodeWithClangFormatBrowserLocalInputParser),
])

export type FormatCodeWithClangFormatBrowserInputRecord = z.infer<
  typeof FormatCodeWithClangFormatBrowserInputParser
>

export const FormatCodeWithClangFormatBrowserLocalInputParser = (
  ClangStyleAllParser() as any
).extend({
  handle: z.optional(z.literal('local')),
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type FormatCodeWithClangFormatBrowserLocalInputRecord = z.infer<
  typeof FormatCodeWithClangFormatBrowserLocalInputParser
>

export const FormatCodeWithClangFormatBrowserOutputParser = (
  ClangStyleAllParser() as any
).extend({
  file: z.lazy(() => FileContentParser),
})

export type FormatCodeWithClangFormatBrowserOutputRecord = z.infer<
  typeof FormatCodeWithClangFormatBrowserOutputParser
>

export const FormatCodeWithClangFormatBrowserRemoteInputParser = (
  ClangStyleAllParser() as any
).extend({
  handle: z.literal('remote'),
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type FormatCodeWithClangFormatBrowserRemoteInputRecord = z.infer<
  typeof FormatCodeWithClangFormatBrowserRemoteInputParser
>

export const FormatKotlinBrowserInputParser = z.union([
  z.lazy(() => FormatKotlinBrowserRemoteInputParser),
  z.lazy(() => FormatKotlinBrowserLocalInputParser),
])

export type FormatKotlinBrowserInputRecord = z.infer<
  typeof FormatKotlinBrowserInputParser
>

export const FormatKotlinBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  format: z.string(),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type FormatKotlinBrowserLocalInputRecord = z.infer<
  typeof FormatKotlinBrowserLocalInputParser
>

export const FormatKotlinBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type FormatKotlinBrowserOutputRecord = z.infer<
  typeof FormatKotlinBrowserOutputParser
>

export const FormatKotlinBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type FormatKotlinBrowserRemoteInputRecord = z.infer<
  typeof FormatKotlinBrowserRemoteInputParser
>

export const FormatPythonBrowserInputParser = z.union([
  z.lazy(() => FormatPythonBrowserRemoteInputParser),
  z.lazy(() => FormatPythonBrowserLocalInputParser),
])

export type FormatPythonBrowserInputRecord = z.infer<
  typeof FormatPythonBrowserInputParser
>

export const FormatPythonBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  format: z.string(),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type FormatPythonBrowserLocalInputRecord = z.infer<
  typeof FormatPythonBrowserLocalInputParser
>

export const FormatPythonBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type FormatPythonBrowserOutputRecord = z.infer<
  typeof FormatPythonBrowserOutputParser
>

export const FormatPythonBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type FormatPythonBrowserRemoteInputRecord = z.infer<
  typeof FormatPythonBrowserRemoteInputParser
>

export const FormatRustBrowserInputParser = z.union([
  z.lazy(() => FormatRustBrowserRemoteInputParser),
  z.lazy(() => FormatRustBrowserLocalInputParser),
])

export type FormatRustBrowserInputRecord = z.infer<
  typeof FormatRustBrowserInputParser
>

export const FormatRustBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  format: z.string(),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type FormatRustBrowserLocalInputRecord = z.infer<
  typeof FormatRustBrowserLocalInputParser
>

export const FormatRustBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type FormatRustBrowserOutputRecord = z.infer<
  typeof FormatRustBrowserOutputParser
>

export const FormatRustBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type FormatRustBrowserRemoteInputRecord = z.infer<
  typeof FormatRustBrowserRemoteInputParser
>

export const FormatSwiftBrowserInputParser = z.union([
  z.lazy(() => FormatSwiftBrowserRemoteInputParser),
  z.lazy(() => FormatSwiftBrowserLocalInputParser),
])

export type FormatSwiftBrowserInputRecord = z.infer<
  typeof FormatSwiftBrowserInputParser
>

export const FormatSwiftBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  format: z.string(),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type FormatSwiftBrowserLocalInputRecord = z.infer<
  typeof FormatSwiftBrowserLocalInputParser
>

export const FormatSwiftBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type FormatSwiftBrowserOutputRecord = z.infer<
  typeof FormatSwiftBrowserOutputParser
>

export const FormatSwiftBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type FormatSwiftBrowserRemoteInputRecord = z.infer<
  typeof FormatSwiftBrowserRemoteInputParser
>
