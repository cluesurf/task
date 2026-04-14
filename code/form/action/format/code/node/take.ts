import { z } from 'zod'

import { ClangFormatParser } from '~/code/form/action/format/code/shared/take'
import { ClangStyleAllParser } from '~/code/form/object/clang-format/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const FormatAssemblyNodeClientInputParser = z.object({
  handle: z.literal('client'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatAssemblyNodeClientInputRecord = z.infer<
  typeof FormatAssemblyNodeClientInputParser
>

export const FormatAssemblyNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatAssemblyNodeExternalInputRecord = z.infer<
  typeof FormatAssemblyNodeExternalInputParser
>

export const FormatAssemblyNodeInputParser = z.union([
  z.lazy(() => FormatAssemblyNodeRemoteInputParser),
  z.lazy(() => FormatAssemblyNodeLocalExternalInputParser),
  z.lazy(() => FormatAssemblyNodeLocalInternalInputParser),
])

export type FormatAssemblyNodeInputRecord = z.infer<
  typeof FormatAssemblyNodeInputParser
>

export const FormatAssemblyNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatAssemblyNodeLocalExternalInputRecord = z.infer<
  typeof FormatAssemblyNodeLocalExternalInputParser
>

export const FormatAssemblyNodeLocalInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatAssemblyNodeLocalInputRecord = z.infer<
  typeof FormatAssemblyNodeLocalInputParser
>

export const FormatAssemblyNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatAssemblyNodeLocalInternalInputRecord = z.infer<
  typeof FormatAssemblyNodeLocalInternalInputParser
>

export const FormatAssemblyNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type FormatAssemblyNodeOutputRecord = z.infer<
  typeof FormatAssemblyNodeOutputParser
>

export const FormatAssemblyNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatAssemblyNodeRemoteInputRecord = z.infer<
  typeof FormatAssemblyNodeRemoteInputParser
>

export const FormatCodeWithClangFormatNodeClientInputParser = (
  ClangStyleAllParser() as any
).extend({
  handle: z.literal('client'),
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatCodeWithClangFormatNodeClientInputRecord = z.infer<
  typeof FormatCodeWithClangFormatNodeClientInputParser
>

export const FormatCodeWithClangFormatNodeExternalInputParser = (
  ClangStyleAllParser() as any
).extend({
  handle: z.literal('external'),
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatCodeWithClangFormatNodeExternalInputRecord = z.infer<
  typeof FormatCodeWithClangFormatNodeExternalInputParser
>

export const FormatCodeWithClangFormatNodeInputParser = z.union([
  z.lazy(() => FormatCodeWithClangFormatNodeRemoteInputParser),
  z.lazy(() => FormatCodeWithClangFormatNodeLocalExternalInputParser),
  z.lazy(() => FormatCodeWithClangFormatNodeLocalInternalInputParser),
])

export type FormatCodeWithClangFormatNodeInputRecord = z.infer<
  typeof FormatCodeWithClangFormatNodeInputParser
>

export const FormatCodeWithClangFormatNodeLocalExternalInputParser = (
  ClangStyleAllParser() as any
).extend({
  handle: z.literal('external'),
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatCodeWithClangFormatNodeLocalExternalInputRecord =
  z.infer<typeof FormatCodeWithClangFormatNodeLocalExternalInputParser>

export const FormatCodeWithClangFormatNodeLocalInputParser = (
  ClangStyleAllParser() as any
).extend({
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatCodeWithClangFormatNodeLocalInputRecord = z.infer<
  typeof FormatCodeWithClangFormatNodeLocalInputParser
>

export const FormatCodeWithClangFormatNodeLocalInternalInputParser = (
  ClangStyleAllParser() as any
).extend({
  handle: z.optional(z.literal('internal')),
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatCodeWithClangFormatNodeLocalInternalInputRecord =
  z.infer<typeof FormatCodeWithClangFormatNodeLocalInternalInputParser>

export const FormatCodeWithClangFormatNodeOutputParser = (
  ClangStyleAllParser() as any
).extend({
  file: z.lazy(() => FilePathParser),
})

export type FormatCodeWithClangFormatNodeOutputRecord = z.infer<
  typeof FormatCodeWithClangFormatNodeOutputParser
>

export const FormatCodeWithClangFormatNodeRemoteInputParser = (
  ClangStyleAllParser() as any
).extend({
  handle: z.literal('remote'),
  format: z.lazy(() => ClangFormatParser),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatCodeWithClangFormatNodeRemoteInputRecord = z.infer<
  typeof FormatCodeWithClangFormatNodeRemoteInputParser
>

export const FormatKotlinNodeClientInputParser = z.object({
  handle: z.literal('client'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatKotlinNodeClientInputRecord = z.infer<
  typeof FormatKotlinNodeClientInputParser
>

export const FormatKotlinNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatKotlinNodeExternalInputRecord = z.infer<
  typeof FormatKotlinNodeExternalInputParser
>

export const FormatKotlinNodeInputParser = z.union([
  z.lazy(() => FormatKotlinNodeRemoteInputParser),
  z.lazy(() => FormatKotlinNodeLocalExternalInputParser),
  z.lazy(() => FormatKotlinNodeLocalInternalInputParser),
])

export type FormatKotlinNodeInputRecord = z.infer<
  typeof FormatKotlinNodeInputParser
>

export const FormatKotlinNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatKotlinNodeLocalExternalInputRecord = z.infer<
  typeof FormatKotlinNodeLocalExternalInputParser
>

export const FormatKotlinNodeLocalInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatKotlinNodeLocalInputRecord = z.infer<
  typeof FormatKotlinNodeLocalInputParser
>

export const FormatKotlinNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatKotlinNodeLocalInternalInputRecord = z.infer<
  typeof FormatKotlinNodeLocalInternalInputParser
>

export const FormatKotlinNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type FormatKotlinNodeOutputRecord = z.infer<
  typeof FormatKotlinNodeOutputParser
>

export const FormatKotlinNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatKotlinNodeRemoteInputRecord = z.infer<
  typeof FormatKotlinNodeRemoteInputParser
>

export const FormatPythonNodeClientInputParser = z.object({
  handle: z.literal('client'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatPythonNodeClientInputRecord = z.infer<
  typeof FormatPythonNodeClientInputParser
>

export const FormatPythonNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatPythonNodeExternalInputRecord = z.infer<
  typeof FormatPythonNodeExternalInputParser
>

export const FormatPythonNodeInputParser = z.union([
  z.lazy(() => FormatPythonNodeRemoteInputParser),
  z.lazy(() => FormatPythonNodeLocalExternalInputParser),
  z.lazy(() => FormatPythonNodeLocalInternalInputParser),
])

export type FormatPythonNodeInputRecord = z.infer<
  typeof FormatPythonNodeInputParser
>

export const FormatPythonNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatPythonNodeLocalExternalInputRecord = z.infer<
  typeof FormatPythonNodeLocalExternalInputParser
>

export const FormatPythonNodeLocalInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatPythonNodeLocalInputRecord = z.infer<
  typeof FormatPythonNodeLocalInputParser
>

export const FormatPythonNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatPythonNodeLocalInternalInputRecord = z.infer<
  typeof FormatPythonNodeLocalInternalInputParser
>

export const FormatPythonNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type FormatPythonNodeOutputRecord = z.infer<
  typeof FormatPythonNodeOutputParser
>

export const FormatPythonNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatPythonNodeRemoteInputRecord = z.infer<
  typeof FormatPythonNodeRemoteInputParser
>

export const FormatRustNodeClientInputParser = z.object({
  handle: z.literal('client'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatRustNodeClientInputRecord = z.infer<
  typeof FormatRustNodeClientInputParser
>

export const FormatRustNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatRustNodeExternalInputRecord = z.infer<
  typeof FormatRustNodeExternalInputParser
>

export const FormatRustNodeInputParser = z.union([
  z.lazy(() => FormatRustNodeRemoteInputParser),
  z.lazy(() => FormatRustNodeLocalExternalInputParser),
  z.lazy(() => FormatRustNodeLocalInternalInputParser),
])

export type FormatRustNodeInputRecord = z.infer<
  typeof FormatRustNodeInputParser
>

export const FormatRustNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatRustNodeLocalExternalInputRecord = z.infer<
  typeof FormatRustNodeLocalExternalInputParser
>

export const FormatRustNodeLocalInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatRustNodeLocalInputRecord = z.infer<
  typeof FormatRustNodeLocalInputParser
>

export const FormatRustNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatRustNodeLocalInternalInputRecord = z.infer<
  typeof FormatRustNodeLocalInternalInputParser
>

export const FormatRustNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type FormatRustNodeOutputRecord = z.infer<
  typeof FormatRustNodeOutputParser
>

export const FormatRustNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatRustNodeRemoteInputRecord = z.infer<
  typeof FormatRustNodeRemoteInputParser
>

export const FormatSwiftNodeClientInputParser = z.object({
  handle: z.literal('client'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatSwiftNodeClientInputRecord = z.infer<
  typeof FormatSwiftNodeClientInputParser
>

export const FormatSwiftNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({}),
})

export type FormatSwiftNodeExternalInputRecord = z.infer<
  typeof FormatSwiftNodeExternalInputParser
>

export const FormatSwiftNodeInputParser = z.union([
  z.lazy(() => FormatSwiftNodeRemoteInputParser),
  z.lazy(() => FormatSwiftNodeLocalExternalInputParser),
  z.lazy(() => FormatSwiftNodeLocalInternalInputParser),
])

export type FormatSwiftNodeInputRecord = z.infer<
  typeof FormatSwiftNodeInputParser
>

export const FormatSwiftNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatSwiftNodeLocalExternalInputRecord = z.infer<
  typeof FormatSwiftNodeLocalExternalInputParser
>

export const FormatSwiftNodeLocalInputParser = z.object({
  format: z.string(),
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatSwiftNodeLocalInputRecord = z.infer<
  typeof FormatSwiftNodeLocalInputParser
>

export const FormatSwiftNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatSwiftNodeLocalInternalInputRecord = z.infer<
  typeof FormatSwiftNodeLocalInternalInputParser
>

export const FormatSwiftNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type FormatSwiftNodeOutputRecord = z.infer<
  typeof FormatSwiftNodeOutputParser
>

export const FormatSwiftNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  format: z.string(),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type FormatSwiftNodeRemoteInputRecord = z.infer<
  typeof FormatSwiftNodeRemoteInputParser
>
