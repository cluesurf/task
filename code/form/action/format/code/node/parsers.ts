import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  FormatAssemblyNodeClientInput,
  FormatAssemblyNodeExternalInput,
  FormatAssemblyNodeInput,
  FormatAssemblyNodeLocalExternalInput,
  FormatAssemblyNodeLocalInput,
  FormatAssemblyNodeLocalInternalInput,
  FormatAssemblyNodeOutput,
  FormatAssemblyNodeRemoteInput,
  FormatCodeWithClangFormatNodeClientInput,
  FormatCodeWithClangFormatNodeExternalInput,
  FormatCodeWithClangFormatNodeInput,
  FormatCodeWithClangFormatNodeLocalExternalInput,
  FormatCodeWithClangFormatNodeLocalInput,
  FormatCodeWithClangFormatNodeLocalInternalInput,
  FormatCodeWithClangFormatNodeOutput,
  FormatCodeWithClangFormatNodeRemoteInput,
  FormatKotlinNodeClientInput,
  FormatKotlinNodeExternalInput,
  FormatKotlinNodeInput,
  FormatKotlinNodeLocalExternalInput,
  FormatKotlinNodeLocalInput,
  FormatKotlinNodeLocalInternalInput,
  FormatKotlinNodeOutput,
  FormatKotlinNodeRemoteInput,
  FormatPythonNodeClientInput,
  FormatPythonNodeExternalInput,
  FormatPythonNodeInput,
  FormatPythonNodeLocalExternalInput,
  FormatPythonNodeLocalInput,
  FormatPythonNodeLocalInternalInput,
  FormatPythonNodeOutput,
  FormatPythonNodeRemoteInput,
  FormatRustNodeClientInput,
  FormatRustNodeExternalInput,
  FormatRustNodeInput,
  FormatRustNodeLocalExternalInput,
  FormatRustNodeLocalInput,
  FormatRustNodeLocalInternalInput,
  FormatRustNodeOutput,
  FormatRustNodeRemoteInput,
  FormatSwiftNodeClientInput,
  FormatSwiftNodeExternalInput,
  FormatSwiftNodeInput,
  FormatSwiftNodeLocalExternalInput,
  FormatSwiftNodeLocalInput,
  FormatSwiftNodeLocalInternalInput,
  FormatSwiftNodeOutput,
  FormatSwiftNodeRemoteInput,
} from '~/code/form/action/format/code/node/index'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'
import { ClangStyleAllParser } from '~/code/form/object/clang-format/parsers'
import { ClangFormatParser } from '~/code/form/action/format/code/shared/parsers'

let FormatAssemblyNodeClientInputModel: z.ZodType<FormatAssemblyNodeClientInput>

export const FormatAssemblyNodeClientInputParser =
  (): z.ZodType<FormatAssemblyNodeClientInput> => {
    if (!FormatAssemblyNodeClientInputModel) {
      FormatAssemblyNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatAssemblyNodeClientInput>
    }
    return FormatAssemblyNodeClientInputModel!
  }

let FormatAssemblyNodeExternalInputModel: z.ZodType<FormatAssemblyNodeExternalInput>

export const FormatAssemblyNodeExternalInputParser =
  (): z.ZodType<FormatAssemblyNodeExternalInput> => {
    if (!FormatAssemblyNodeExternalInputModel) {
      FormatAssemblyNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatAssemblyNodeExternalInput>
    }
    return FormatAssemblyNodeExternalInputModel!
  }

let FormatAssemblyNodeInputModel: z.ZodType<FormatAssemblyNodeInput>

export const FormatAssemblyNodeInputParser =
  (): z.ZodType<FormatAssemblyNodeInput> => {
    if (!FormatAssemblyNodeInputModel) {
      FormatAssemblyNodeInputModel = z.union([
        z.lazy(() => FormatAssemblyNodeRemoteInputParser()),
        z.lazy(() => FormatAssemblyNodeLocalExternalInputParser()),
        z.lazy(() => FormatAssemblyNodeLocalInternalInputParser()),
      ])
    }
    return FormatAssemblyNodeInputModel!
  }

let FormatAssemblyNodeLocalExternalInputModel: z.ZodType<FormatAssemblyNodeLocalExternalInput>

export const FormatAssemblyNodeLocalExternalInputParser =
  (): z.ZodType<FormatAssemblyNodeLocalExternalInput> => {
    if (!FormatAssemblyNodeLocalExternalInputModel) {
      FormatAssemblyNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyNodeLocalExternalInput>
    }
    return FormatAssemblyNodeLocalExternalInputModel!
  }

let FormatAssemblyNodeLocalInputModel: z.ZodType<FormatAssemblyNodeLocalInput>

export const FormatAssemblyNodeLocalInputParser =
  (): z.ZodType<FormatAssemblyNodeLocalInput> => {
    if (!FormatAssemblyNodeLocalInputModel) {
      FormatAssemblyNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyNodeLocalInput>
    }
    return FormatAssemblyNodeLocalInputModel!
  }

let FormatAssemblyNodeLocalInternalInputModel: z.ZodType<FormatAssemblyNodeLocalInternalInput>

export const FormatAssemblyNodeLocalInternalInputParser =
  (): z.ZodType<FormatAssemblyNodeLocalInternalInput> => {
    if (!FormatAssemblyNodeLocalInternalInputModel) {
      FormatAssemblyNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyNodeLocalInternalInput>
    }
    return FormatAssemblyNodeLocalInternalInputModel!
  }

let FormatAssemblyNodeOutputModel: z.ZodType<FormatAssemblyNodeOutput>

export const FormatAssemblyNodeOutputParser =
  (): z.ZodType<FormatAssemblyNodeOutput> => {
    if (!FormatAssemblyNodeOutputModel) {
      FormatAssemblyNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatAssemblyNodeOutput>
    }
    return FormatAssemblyNodeOutputModel!
  }

let FormatAssemblyNodeRemoteInputModel: z.ZodType<FormatAssemblyNodeRemoteInput>

export const FormatAssemblyNodeRemoteInputParser =
  (): z.ZodType<FormatAssemblyNodeRemoteInput> => {
    if (!FormatAssemblyNodeRemoteInputModel) {
      FormatAssemblyNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyNodeRemoteInput>
    }
    return FormatAssemblyNodeRemoteInputModel!
  }

let FormatCodeWithClangFormatNodeClientInputModel: z.ZodType<FormatCodeWithClangFormatNodeClientInput>

export const FormatCodeWithClangFormatNodeClientInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeClientInput> => {
    if (!FormatCodeWithClangFormatNodeClientInputModel) {
      FormatCodeWithClangFormatNodeClientInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('client'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatCodeWithClangFormatNodeClientInput>
    }
    return FormatCodeWithClangFormatNodeClientInputModel!
  }

let FormatCodeWithClangFormatNodeExternalInputModel: z.ZodType<FormatCodeWithClangFormatNodeExternalInput>

export const FormatCodeWithClangFormatNodeExternalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeExternalInput> => {
    if (!FormatCodeWithClangFormatNodeExternalInputModel) {
      FormatCodeWithClangFormatNodeExternalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('external'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatCodeWithClangFormatNodeExternalInput>
    }
    return FormatCodeWithClangFormatNodeExternalInputModel!
  }

let FormatCodeWithClangFormatNodeInputModel: z.ZodType<FormatCodeWithClangFormatNodeInput>

export const FormatCodeWithClangFormatNodeInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeInput> => {
    if (!FormatCodeWithClangFormatNodeInputModel) {
      FormatCodeWithClangFormatNodeInputModel = z.union([
        z.lazy(() => FormatCodeWithClangFormatNodeRemoteInputParser()),
        z.lazy(() =>
          FormatCodeWithClangFormatNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          FormatCodeWithClangFormatNodeLocalInternalInputParser(),
        ),
      ])
    }
    return FormatCodeWithClangFormatNodeInputModel!
  }

let FormatCodeWithClangFormatNodeLocalExternalInputModel: z.ZodType<FormatCodeWithClangFormatNodeLocalExternalInput>

export const FormatCodeWithClangFormatNodeLocalExternalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeLocalExternalInput> => {
    if (!FormatCodeWithClangFormatNodeLocalExternalInputModel) {
      FormatCodeWithClangFormatNodeLocalExternalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('external'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeLocalExternalInput>
    }
    return FormatCodeWithClangFormatNodeLocalExternalInputModel!
  }

let FormatCodeWithClangFormatNodeLocalInputModel: z.ZodType<FormatCodeWithClangFormatNodeLocalInput>

export const FormatCodeWithClangFormatNodeLocalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeLocalInput> => {
    if (!FormatCodeWithClangFormatNodeLocalInputModel) {
      FormatCodeWithClangFormatNodeLocalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeLocalInput>
    }
    return FormatCodeWithClangFormatNodeLocalInputModel!
  }

let FormatCodeWithClangFormatNodeLocalInternalInputModel: z.ZodType<FormatCodeWithClangFormatNodeLocalInternalInput>

export const FormatCodeWithClangFormatNodeLocalInternalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeLocalInternalInput> => {
    if (!FormatCodeWithClangFormatNodeLocalInternalInputModel) {
      FormatCodeWithClangFormatNodeLocalInternalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.optional(z.literal('internal')),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeLocalInternalInput>
    }
    return FormatCodeWithClangFormatNodeLocalInternalInputModel!
  }

let FormatCodeWithClangFormatNodeOutputModel: z.ZodType<FormatCodeWithClangFormatNodeOutput>

export const FormatCodeWithClangFormatNodeOutputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeOutput> => {
    if (!FormatCodeWithClangFormatNodeOutputModel) {
      FormatCodeWithClangFormatNodeOutputModel = (
        ClangStyleAllParser() as any
      ).extend({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeOutput>
    }
    return FormatCodeWithClangFormatNodeOutputModel!
  }

let FormatCodeWithClangFormatNodeRemoteInputModel: z.ZodType<FormatCodeWithClangFormatNodeRemoteInput>

export const FormatCodeWithClangFormatNodeRemoteInputParser =
  (): z.ZodType<FormatCodeWithClangFormatNodeRemoteInput> => {
    if (!FormatCodeWithClangFormatNodeRemoteInputModel) {
      FormatCodeWithClangFormatNodeRemoteInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('remote'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatCodeWithClangFormatNodeRemoteInput>
    }
    return FormatCodeWithClangFormatNodeRemoteInputModel!
  }

let FormatKotlinNodeClientInputModel: z.ZodType<FormatKotlinNodeClientInput>

export const FormatKotlinNodeClientInputParser =
  (): z.ZodType<FormatKotlinNodeClientInput> => {
    if (!FormatKotlinNodeClientInputModel) {
      FormatKotlinNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatKotlinNodeClientInput>
    }
    return FormatKotlinNodeClientInputModel!
  }

let FormatKotlinNodeExternalInputModel: z.ZodType<FormatKotlinNodeExternalInput>

export const FormatKotlinNodeExternalInputParser =
  (): z.ZodType<FormatKotlinNodeExternalInput> => {
    if (!FormatKotlinNodeExternalInputModel) {
      FormatKotlinNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatKotlinNodeExternalInput>
    }
    return FormatKotlinNodeExternalInputModel!
  }

let FormatKotlinNodeInputModel: z.ZodType<FormatKotlinNodeInput>

export const FormatKotlinNodeInputParser =
  (): z.ZodType<FormatKotlinNodeInput> => {
    if (!FormatKotlinNodeInputModel) {
      FormatKotlinNodeInputModel = z.union([
        z.lazy(() => FormatKotlinNodeRemoteInputParser()),
        z.lazy(() => FormatKotlinNodeLocalExternalInputParser()),
        z.lazy(() => FormatKotlinNodeLocalInternalInputParser()),
      ])
    }
    return FormatKotlinNodeInputModel!
  }

let FormatKotlinNodeLocalExternalInputModel: z.ZodType<FormatKotlinNodeLocalExternalInput>

export const FormatKotlinNodeLocalExternalInputParser =
  (): z.ZodType<FormatKotlinNodeLocalExternalInput> => {
    if (!FormatKotlinNodeLocalExternalInputModel) {
      FormatKotlinNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinNodeLocalExternalInput>
    }
    return FormatKotlinNodeLocalExternalInputModel!
  }

let FormatKotlinNodeLocalInputModel: z.ZodType<FormatKotlinNodeLocalInput>

export const FormatKotlinNodeLocalInputParser =
  (): z.ZodType<FormatKotlinNodeLocalInput> => {
    if (!FormatKotlinNodeLocalInputModel) {
      FormatKotlinNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinNodeLocalInput>
    }
    return FormatKotlinNodeLocalInputModel!
  }

let FormatKotlinNodeLocalInternalInputModel: z.ZodType<FormatKotlinNodeLocalInternalInput>

export const FormatKotlinNodeLocalInternalInputParser =
  (): z.ZodType<FormatKotlinNodeLocalInternalInput> => {
    if (!FormatKotlinNodeLocalInternalInputModel) {
      FormatKotlinNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinNodeLocalInternalInput>
    }
    return FormatKotlinNodeLocalInternalInputModel!
  }

let FormatKotlinNodeOutputModel: z.ZodType<FormatKotlinNodeOutput>

export const FormatKotlinNodeOutputParser =
  (): z.ZodType<FormatKotlinNodeOutput> => {
    if (!FormatKotlinNodeOutputModel) {
      FormatKotlinNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatKotlinNodeOutput>
    }
    return FormatKotlinNodeOutputModel!
  }

let FormatKotlinNodeRemoteInputModel: z.ZodType<FormatKotlinNodeRemoteInput>

export const FormatKotlinNodeRemoteInputParser =
  (): z.ZodType<FormatKotlinNodeRemoteInput> => {
    if (!FormatKotlinNodeRemoteInputModel) {
      FormatKotlinNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinNodeRemoteInput>
    }
    return FormatKotlinNodeRemoteInputModel!
  }

let FormatPythonNodeClientInputModel: z.ZodType<FormatPythonNodeClientInput>

export const FormatPythonNodeClientInputParser =
  (): z.ZodType<FormatPythonNodeClientInput> => {
    if (!FormatPythonNodeClientInputModel) {
      FormatPythonNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatPythonNodeClientInput>
    }
    return FormatPythonNodeClientInputModel!
  }

let FormatPythonNodeExternalInputModel: z.ZodType<FormatPythonNodeExternalInput>

export const FormatPythonNodeExternalInputParser =
  (): z.ZodType<FormatPythonNodeExternalInput> => {
    if (!FormatPythonNodeExternalInputModel) {
      FormatPythonNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatPythonNodeExternalInput>
    }
    return FormatPythonNodeExternalInputModel!
  }

let FormatPythonNodeInputModel: z.ZodType<FormatPythonNodeInput>

export const FormatPythonNodeInputParser =
  (): z.ZodType<FormatPythonNodeInput> => {
    if (!FormatPythonNodeInputModel) {
      FormatPythonNodeInputModel = z.union([
        z.lazy(() => FormatPythonNodeRemoteInputParser()),
        z.lazy(() => FormatPythonNodeLocalExternalInputParser()),
        z.lazy(() => FormatPythonNodeLocalInternalInputParser()),
      ])
    }
    return FormatPythonNodeInputModel!
  }

let FormatPythonNodeLocalExternalInputModel: z.ZodType<FormatPythonNodeLocalExternalInput>

export const FormatPythonNodeLocalExternalInputParser =
  (): z.ZodType<FormatPythonNodeLocalExternalInput> => {
    if (!FormatPythonNodeLocalExternalInputModel) {
      FormatPythonNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonNodeLocalExternalInput>
    }
    return FormatPythonNodeLocalExternalInputModel!
  }

let FormatPythonNodeLocalInputModel: z.ZodType<FormatPythonNodeLocalInput>

export const FormatPythonNodeLocalInputParser =
  (): z.ZodType<FormatPythonNodeLocalInput> => {
    if (!FormatPythonNodeLocalInputModel) {
      FormatPythonNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonNodeLocalInput>
    }
    return FormatPythonNodeLocalInputModel!
  }

let FormatPythonNodeLocalInternalInputModel: z.ZodType<FormatPythonNodeLocalInternalInput>

export const FormatPythonNodeLocalInternalInputParser =
  (): z.ZodType<FormatPythonNodeLocalInternalInput> => {
    if (!FormatPythonNodeLocalInternalInputModel) {
      FormatPythonNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonNodeLocalInternalInput>
    }
    return FormatPythonNodeLocalInternalInputModel!
  }

let FormatPythonNodeOutputModel: z.ZodType<FormatPythonNodeOutput>

export const FormatPythonNodeOutputParser =
  (): z.ZodType<FormatPythonNodeOutput> => {
    if (!FormatPythonNodeOutputModel) {
      FormatPythonNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatPythonNodeOutput>
    }
    return FormatPythonNodeOutputModel!
  }

let FormatPythonNodeRemoteInputModel: z.ZodType<FormatPythonNodeRemoteInput>

export const FormatPythonNodeRemoteInputParser =
  (): z.ZodType<FormatPythonNodeRemoteInput> => {
    if (!FormatPythonNodeRemoteInputModel) {
      FormatPythonNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonNodeRemoteInput>
    }
    return FormatPythonNodeRemoteInputModel!
  }

let FormatRustNodeClientInputModel: z.ZodType<FormatRustNodeClientInput>

export const FormatRustNodeClientInputParser =
  (): z.ZodType<FormatRustNodeClientInput> => {
    if (!FormatRustNodeClientInputModel) {
      FormatRustNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatRustNodeClientInput>
    }
    return FormatRustNodeClientInputModel!
  }

let FormatRustNodeExternalInputModel: z.ZodType<FormatRustNodeExternalInput>

export const FormatRustNodeExternalInputParser =
  (): z.ZodType<FormatRustNodeExternalInput> => {
    if (!FormatRustNodeExternalInputModel) {
      FormatRustNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatRustNodeExternalInput>
    }
    return FormatRustNodeExternalInputModel!
  }

let FormatRustNodeInputModel: z.ZodType<FormatRustNodeInput>

export const FormatRustNodeInputParser =
  (): z.ZodType<FormatRustNodeInput> => {
    if (!FormatRustNodeInputModel) {
      FormatRustNodeInputModel = z.union([
        z.lazy(() => FormatRustNodeRemoteInputParser()),
        z.lazy(() => FormatRustNodeLocalExternalInputParser()),
        z.lazy(() => FormatRustNodeLocalInternalInputParser()),
      ])
    }
    return FormatRustNodeInputModel!
  }

let FormatRustNodeLocalExternalInputModel: z.ZodType<FormatRustNodeLocalExternalInput>

export const FormatRustNodeLocalExternalInputParser =
  (): z.ZodType<FormatRustNodeLocalExternalInput> => {
    if (!FormatRustNodeLocalExternalInputModel) {
      FormatRustNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustNodeLocalExternalInput>
    }
    return FormatRustNodeLocalExternalInputModel!
  }

let FormatRustNodeLocalInputModel: z.ZodType<FormatRustNodeLocalInput>

export const FormatRustNodeLocalInputParser =
  (): z.ZodType<FormatRustNodeLocalInput> => {
    if (!FormatRustNodeLocalInputModel) {
      FormatRustNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustNodeLocalInput>
    }
    return FormatRustNodeLocalInputModel!
  }

let FormatRustNodeLocalInternalInputModel: z.ZodType<FormatRustNodeLocalInternalInput>

export const FormatRustNodeLocalInternalInputParser =
  (): z.ZodType<FormatRustNodeLocalInternalInput> => {
    if (!FormatRustNodeLocalInternalInputModel) {
      FormatRustNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustNodeLocalInternalInput>
    }
    return FormatRustNodeLocalInternalInputModel!
  }

let FormatRustNodeOutputModel: z.ZodType<FormatRustNodeOutput>

export const FormatRustNodeOutputParser =
  (): z.ZodType<FormatRustNodeOutput> => {
    if (!FormatRustNodeOutputModel) {
      FormatRustNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatRustNodeOutput>
    }
    return FormatRustNodeOutputModel!
  }

let FormatRustNodeRemoteInputModel: z.ZodType<FormatRustNodeRemoteInput>

export const FormatRustNodeRemoteInputParser =
  (): z.ZodType<FormatRustNodeRemoteInput> => {
    if (!FormatRustNodeRemoteInputModel) {
      FormatRustNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustNodeRemoteInput>
    }
    return FormatRustNodeRemoteInputModel!
  }

let FormatSwiftNodeClientInputModel: z.ZodType<FormatSwiftNodeClientInput>

export const FormatSwiftNodeClientInputParser =
  (): z.ZodType<FormatSwiftNodeClientInput> => {
    if (!FormatSwiftNodeClientInputModel) {
      FormatSwiftNodeClientInputModel = z.object({
        handle: z.literal('client'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatSwiftNodeClientInput>
    }
    return FormatSwiftNodeClientInputModel!
  }

let FormatSwiftNodeExternalInputModel: z.ZodType<FormatSwiftNodeExternalInput>

export const FormatSwiftNodeExternalInputParser =
  (): z.ZodType<FormatSwiftNodeExternalInput> => {
    if (!FormatSwiftNodeExternalInputModel) {
      FormatSwiftNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({}),
      }) as z.ZodType<FormatSwiftNodeExternalInput>
    }
    return FormatSwiftNodeExternalInputModel!
  }

let FormatSwiftNodeInputModel: z.ZodType<FormatSwiftNodeInput>

export const FormatSwiftNodeInputParser =
  (): z.ZodType<FormatSwiftNodeInput> => {
    if (!FormatSwiftNodeInputModel) {
      FormatSwiftNodeInputModel = z.union([
        z.lazy(() => FormatSwiftNodeRemoteInputParser()),
        z.lazy(() => FormatSwiftNodeLocalExternalInputParser()),
        z.lazy(() => FormatSwiftNodeLocalInternalInputParser()),
      ])
    }
    return FormatSwiftNodeInputModel!
  }

let FormatSwiftNodeLocalExternalInputModel: z.ZodType<FormatSwiftNodeLocalExternalInput>

export const FormatSwiftNodeLocalExternalInputParser =
  (): z.ZodType<FormatSwiftNodeLocalExternalInput> => {
    if (!FormatSwiftNodeLocalExternalInputModel) {
      FormatSwiftNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftNodeLocalExternalInput>
    }
    return FormatSwiftNodeLocalExternalInputModel!
  }

let FormatSwiftNodeLocalInputModel: z.ZodType<FormatSwiftNodeLocalInput>

export const FormatSwiftNodeLocalInputParser =
  (): z.ZodType<FormatSwiftNodeLocalInput> => {
    if (!FormatSwiftNodeLocalInputModel) {
      FormatSwiftNodeLocalInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftNodeLocalInput>
    }
    return FormatSwiftNodeLocalInputModel!
  }

let FormatSwiftNodeLocalInternalInputModel: z.ZodType<FormatSwiftNodeLocalInternalInput>

export const FormatSwiftNodeLocalInternalInputParser =
  (): z.ZodType<FormatSwiftNodeLocalInternalInput> => {
    if (!FormatSwiftNodeLocalInternalInputModel) {
      FormatSwiftNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftNodeLocalInternalInput>
    }
    return FormatSwiftNodeLocalInternalInputModel!
  }

let FormatSwiftNodeOutputModel: z.ZodType<FormatSwiftNodeOutput>

export const FormatSwiftNodeOutputParser =
  (): z.ZodType<FormatSwiftNodeOutput> => {
    if (!FormatSwiftNodeOutputModel) {
      FormatSwiftNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<FormatSwiftNodeOutput>
    }
    return FormatSwiftNodeOutputModel!
  }

let FormatSwiftNodeRemoteInputModel: z.ZodType<FormatSwiftNodeRemoteInput>

export const FormatSwiftNodeRemoteInputParser =
  (): z.ZodType<FormatSwiftNodeRemoteInput> => {
    if (!FormatSwiftNodeRemoteInputModel) {
      FormatSwiftNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftNodeRemoteInput>
    }
    return FormatSwiftNodeRemoteInputModel!
  }
