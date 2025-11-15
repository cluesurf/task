import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  FormatAssemblyBrowserInput,
  FormatAssemblyBrowserLocalInput,
  FormatAssemblyBrowserOutput,
  FormatAssemblyBrowserRemoteInput,
  FormatCodeWithClangFormatBrowserInput,
  FormatCodeWithClangFormatBrowserLocalInput,
  FormatCodeWithClangFormatBrowserOutput,
  FormatCodeWithClangFormatBrowserRemoteInput,
  FormatKotlinBrowserInput,
  FormatKotlinBrowserLocalInput,
  FormatKotlinBrowserOutput,
  FormatKotlinBrowserRemoteInput,
  FormatPythonBrowserInput,
  FormatPythonBrowserLocalInput,
  FormatPythonBrowserOutput,
  FormatPythonBrowserRemoteInput,
  FormatRustBrowserInput,
  FormatRustBrowserLocalInput,
  FormatRustBrowserOutput,
  FormatRustBrowserRemoteInput,
  FormatSwiftBrowserInput,
  FormatSwiftBrowserLocalInput,
  FormatSwiftBrowserOutput,
  FormatSwiftBrowserRemoteInput,
} from '~/code/form/action/format/code/browser/index'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'
import { ClangStyleAllParser } from '~/code/form/object/clang-format/parsers'
import { ClangFormatParser } from '~/code/form/action/format/code/shared/parsers'

let FormatAssemblyBrowserInputModel: z.ZodType<FormatAssemblyBrowserInput>

export const FormatAssemblyBrowserInputParser =
  (): z.ZodType<FormatAssemblyBrowserInput> => {
    if (!FormatAssemblyBrowserInputModel) {
      FormatAssemblyBrowserInputModel = z.union([
        z.lazy(() => FormatAssemblyBrowserRemoteInputParser()),
        z.lazy(() => FormatAssemblyBrowserLocalInputParser()),
      ])
    }
    return FormatAssemblyBrowserInputModel!
  }

let FormatAssemblyBrowserLocalInputModel: z.ZodType<FormatAssemblyBrowserLocalInput>

export const FormatAssemblyBrowserLocalInputParser =
  (): z.ZodType<FormatAssemblyBrowserLocalInput> => {
    if (!FormatAssemblyBrowserLocalInputModel) {
      FormatAssemblyBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatAssemblyBrowserLocalInput>
    }
    return FormatAssemblyBrowserLocalInputModel!
  }

let FormatAssemblyBrowserOutputModel: z.ZodType<FormatAssemblyBrowserOutput>

export const FormatAssemblyBrowserOutputParser =
  (): z.ZodType<FormatAssemblyBrowserOutput> => {
    if (!FormatAssemblyBrowserOutputModel) {
      FormatAssemblyBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatAssemblyBrowserOutput>
    }
    return FormatAssemblyBrowserOutputModel!
  }

let FormatAssemblyBrowserRemoteInputModel: z.ZodType<FormatAssemblyBrowserRemoteInput>

export const FormatAssemblyBrowserRemoteInputParser =
  (): z.ZodType<FormatAssemblyBrowserRemoteInput> => {
    if (!FormatAssemblyBrowserRemoteInputModel) {
      FormatAssemblyBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatAssemblyBrowserRemoteInput>
    }
    return FormatAssemblyBrowserRemoteInputModel!
  }

let FormatCodeWithClangFormatBrowserInputModel: z.ZodType<FormatCodeWithClangFormatBrowserInput>

export const FormatCodeWithClangFormatBrowserInputParser =
  (): z.ZodType<FormatCodeWithClangFormatBrowserInput> => {
    if (!FormatCodeWithClangFormatBrowserInputModel) {
      FormatCodeWithClangFormatBrowserInputModel = z.union([
        z.lazy(() =>
          FormatCodeWithClangFormatBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          FormatCodeWithClangFormatBrowserLocalInputParser(),
        ),
      ])
    }
    return FormatCodeWithClangFormatBrowserInputModel!
  }

let FormatCodeWithClangFormatBrowserLocalInputModel: z.ZodType<FormatCodeWithClangFormatBrowserLocalInput>

export const FormatCodeWithClangFormatBrowserLocalInputParser =
  (): z.ZodType<FormatCodeWithClangFormatBrowserLocalInput> => {
    if (!FormatCodeWithClangFormatBrowserLocalInputModel) {
      FormatCodeWithClangFormatBrowserLocalInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.optional(z.literal('local')),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatCodeWithClangFormatBrowserLocalInput>
    }
    return FormatCodeWithClangFormatBrowserLocalInputModel!
  }

let FormatCodeWithClangFormatBrowserOutputModel: z.ZodType<FormatCodeWithClangFormatBrowserOutput>

export const FormatCodeWithClangFormatBrowserOutputParser =
  (): z.ZodType<FormatCodeWithClangFormatBrowserOutput> => {
    if (!FormatCodeWithClangFormatBrowserOutputModel) {
      FormatCodeWithClangFormatBrowserOutputModel = (
        ClangStyleAllParser() as any
      ).extend({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatCodeWithClangFormatBrowserOutput>
    }
    return FormatCodeWithClangFormatBrowserOutputModel!
  }

let FormatCodeWithClangFormatBrowserRemoteInputModel: z.ZodType<FormatCodeWithClangFormatBrowserRemoteInput>

export const FormatCodeWithClangFormatBrowserRemoteInputParser =
  (): z.ZodType<FormatCodeWithClangFormatBrowserRemoteInput> => {
    if (!FormatCodeWithClangFormatBrowserRemoteInputModel) {
      FormatCodeWithClangFormatBrowserRemoteInputModel = (
        ClangStyleAllParser() as any
      ).extend({
        handle: z.literal('remote'),
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatCodeWithClangFormatBrowserRemoteInput>
    }
    return FormatCodeWithClangFormatBrowserRemoteInputModel!
  }

let FormatKotlinBrowserInputModel: z.ZodType<FormatKotlinBrowserInput>

export const FormatKotlinBrowserInputParser =
  (): z.ZodType<FormatKotlinBrowserInput> => {
    if (!FormatKotlinBrowserInputModel) {
      FormatKotlinBrowserInputModel = z.union([
        z.lazy(() => FormatKotlinBrowserRemoteInputParser()),
        z.lazy(() => FormatKotlinBrowserLocalInputParser()),
      ])
    }
    return FormatKotlinBrowserInputModel!
  }

let FormatKotlinBrowserLocalInputModel: z.ZodType<FormatKotlinBrowserLocalInput>

export const FormatKotlinBrowserLocalInputParser =
  (): z.ZodType<FormatKotlinBrowserLocalInput> => {
    if (!FormatKotlinBrowserLocalInputModel) {
      FormatKotlinBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatKotlinBrowserLocalInput>
    }
    return FormatKotlinBrowserLocalInputModel!
  }

let FormatKotlinBrowserOutputModel: z.ZodType<FormatKotlinBrowserOutput>

export const FormatKotlinBrowserOutputParser =
  (): z.ZodType<FormatKotlinBrowserOutput> => {
    if (!FormatKotlinBrowserOutputModel) {
      FormatKotlinBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatKotlinBrowserOutput>
    }
    return FormatKotlinBrowserOutputModel!
  }

let FormatKotlinBrowserRemoteInputModel: z.ZodType<FormatKotlinBrowserRemoteInput>

export const FormatKotlinBrowserRemoteInputParser =
  (): z.ZodType<FormatKotlinBrowserRemoteInput> => {
    if (!FormatKotlinBrowserRemoteInputModel) {
      FormatKotlinBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatKotlinBrowserRemoteInput>
    }
    return FormatKotlinBrowserRemoteInputModel!
  }

let FormatPythonBrowserInputModel: z.ZodType<FormatPythonBrowserInput>

export const FormatPythonBrowserInputParser =
  (): z.ZodType<FormatPythonBrowserInput> => {
    if (!FormatPythonBrowserInputModel) {
      FormatPythonBrowserInputModel = z.union([
        z.lazy(() => FormatPythonBrowserRemoteInputParser()),
        z.lazy(() => FormatPythonBrowserLocalInputParser()),
      ])
    }
    return FormatPythonBrowserInputModel!
  }

let FormatPythonBrowserLocalInputModel: z.ZodType<FormatPythonBrowserLocalInput>

export const FormatPythonBrowserLocalInputParser =
  (): z.ZodType<FormatPythonBrowserLocalInput> => {
    if (!FormatPythonBrowserLocalInputModel) {
      FormatPythonBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatPythonBrowserLocalInput>
    }
    return FormatPythonBrowserLocalInputModel!
  }

let FormatPythonBrowserOutputModel: z.ZodType<FormatPythonBrowserOutput>

export const FormatPythonBrowserOutputParser =
  (): z.ZodType<FormatPythonBrowserOutput> => {
    if (!FormatPythonBrowserOutputModel) {
      FormatPythonBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatPythonBrowserOutput>
    }
    return FormatPythonBrowserOutputModel!
  }

let FormatPythonBrowserRemoteInputModel: z.ZodType<FormatPythonBrowserRemoteInput>

export const FormatPythonBrowserRemoteInputParser =
  (): z.ZodType<FormatPythonBrowserRemoteInput> => {
    if (!FormatPythonBrowserRemoteInputModel) {
      FormatPythonBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatPythonBrowserRemoteInput>
    }
    return FormatPythonBrowserRemoteInputModel!
  }

let FormatRustBrowserInputModel: z.ZodType<FormatRustBrowserInput>

export const FormatRustBrowserInputParser =
  (): z.ZodType<FormatRustBrowserInput> => {
    if (!FormatRustBrowserInputModel) {
      FormatRustBrowserInputModel = z.union([
        z.lazy(() => FormatRustBrowserRemoteInputParser()),
        z.lazy(() => FormatRustBrowserLocalInputParser()),
      ])
    }
    return FormatRustBrowserInputModel!
  }

let FormatRustBrowserLocalInputModel: z.ZodType<FormatRustBrowserLocalInput>

export const FormatRustBrowserLocalInputParser =
  (): z.ZodType<FormatRustBrowserLocalInput> => {
    if (!FormatRustBrowserLocalInputModel) {
      FormatRustBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatRustBrowserLocalInput>
    }
    return FormatRustBrowserLocalInputModel!
  }

let FormatRustBrowserOutputModel: z.ZodType<FormatRustBrowserOutput>

export const FormatRustBrowserOutputParser =
  (): z.ZodType<FormatRustBrowserOutput> => {
    if (!FormatRustBrowserOutputModel) {
      FormatRustBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatRustBrowserOutput>
    }
    return FormatRustBrowserOutputModel!
  }

let FormatRustBrowserRemoteInputModel: z.ZodType<FormatRustBrowserRemoteInput>

export const FormatRustBrowserRemoteInputParser =
  (): z.ZodType<FormatRustBrowserRemoteInput> => {
    if (!FormatRustBrowserRemoteInputModel) {
      FormatRustBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatRustBrowserRemoteInput>
    }
    return FormatRustBrowserRemoteInputModel!
  }

let FormatSwiftBrowserInputModel: z.ZodType<FormatSwiftBrowserInput>

export const FormatSwiftBrowserInputParser =
  (): z.ZodType<FormatSwiftBrowserInput> => {
    if (!FormatSwiftBrowserInputModel) {
      FormatSwiftBrowserInputModel = z.union([
        z.lazy(() => FormatSwiftBrowserRemoteInputParser()),
        z.lazy(() => FormatSwiftBrowserLocalInputParser()),
      ])
    }
    return FormatSwiftBrowserInputModel!
  }

let FormatSwiftBrowserLocalInputModel: z.ZodType<FormatSwiftBrowserLocalInput>

export const FormatSwiftBrowserLocalInputParser =
  (): z.ZodType<FormatSwiftBrowserLocalInput> => {
    if (!FormatSwiftBrowserLocalInputModel) {
      FormatSwiftBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<FormatSwiftBrowserLocalInput>
    }
    return FormatSwiftBrowserLocalInputModel!
  }

let FormatSwiftBrowserOutputModel: z.ZodType<FormatSwiftBrowserOutput>

export const FormatSwiftBrowserOutputParser =
  (): z.ZodType<FormatSwiftBrowserOutput> => {
    if (!FormatSwiftBrowserOutputModel) {
      FormatSwiftBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<FormatSwiftBrowserOutput>
    }
    return FormatSwiftBrowserOutputModel!
  }

let FormatSwiftBrowserRemoteInputModel: z.ZodType<FormatSwiftBrowserRemoteInput>

export const FormatSwiftBrowserRemoteInputParser =
  (): z.ZodType<FormatSwiftBrowserRemoteInput> => {
    if (!FormatSwiftBrowserRemoteInputModel) {
      FormatSwiftBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        format: z.string(),
        input: z.object({
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<FormatSwiftBrowserRemoteInput>
    }
    return FormatSwiftBrowserRemoteInputModel!
  }
