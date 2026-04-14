import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const SanitizeHtmlCommandInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type SanitizeHtmlCommandInputRecord = z.infer<
  typeof SanitizeHtmlCommandInputParser
>

export const SanitizeHtmlNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.string(),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type SanitizeHtmlNodeClientInputRecord = z.infer<
  typeof SanitizeHtmlNodeClientInputParser
>

export const SanitizeHtmlNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.string(),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type SanitizeHtmlNodeExternalInputRecord = z.infer<
  typeof SanitizeHtmlNodeExternalInputParser
>

export const SanitizeHtmlNodeInputParser = z.union([
  z.lazy(() => SanitizeHtmlNodeRemoteInputParser),
  z.lazy(() => SanitizeHtmlNodeLocalExternalInputParser),
  z.lazy(() => SanitizeHtmlNodeLocalInternalInputParser),
])

export type SanitizeHtmlNodeInputRecord = z.infer<
  typeof SanitizeHtmlNodeInputParser
>

export const SanitizeHtmlNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.string(),
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

export type SanitizeHtmlNodeLocalExternalInputRecord = z.infer<
  typeof SanitizeHtmlNodeLocalExternalInputParser
>

export const SanitizeHtmlNodeLocalInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type SanitizeHtmlNodeLocalInputRecord = z.infer<
  typeof SanitizeHtmlNodeLocalInputParser
>

export const SanitizeHtmlNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.string(),
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

export type SanitizeHtmlNodeLocalInternalInputRecord = z.infer<
  typeof SanitizeHtmlNodeLocalInternalInputParser
>

export const SanitizeHtmlNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type SanitizeHtmlNodeOutputRecord = z.infer<
  typeof SanitizeHtmlNodeOutputParser
>

export const SanitizeHtmlNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.string(),
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

export type SanitizeHtmlNodeRemoteInputRecord = z.infer<
  typeof SanitizeHtmlNodeRemoteInputParser
>
