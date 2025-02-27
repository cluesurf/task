import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileRustBrowserInput,
  CompileRustBrowserLocalInput,
  CompileRustBrowserOutput,
  CompileRustBrowserRemoteInput,
} from '~/code/type/action/compile/code/rust/browser/index'
import {
  RustCompilerTargetParser,
  RustInputFormatParser,
  RustOutputFormatParser,
} from '~/code/type/object/rust/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let CompileRustBrowserInputModel: z.ZodType<CompileRustBrowserInput>

export const CompileRustBrowserInputParser =
  (): z.ZodType<CompileRustBrowserInput> => {
    if (!CompileRustBrowserInputModel) {
      CompileRustBrowserInputModel = z.union([
        z.lazy(() => CompileRustBrowserRemoteInputParser()),
        z.lazy(() => CompileRustBrowserLocalInputParser()),
      ])
    }
    return CompileRustBrowserInputModel!
  }

let CompileRustBrowserLocalInputModel: z.ZodType<CompileRustBrowserLocalInput>

export const CompileRustBrowserLocalInputParser =
  (): z.ZodType<CompileRustBrowserLocalInput> => {
    if (!CompileRustBrowserLocalInputModel) {
      CompileRustBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustBrowserLocalInput>
    }
    return CompileRustBrowserLocalInputModel!
  }

let CompileRustBrowserOutputModel: z.ZodType<CompileRustBrowserOutput>

export const CompileRustBrowserOutputParser =
  (): z.ZodType<CompileRustBrowserOutput> => {
    if (!CompileRustBrowserOutputModel) {
      CompileRustBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileRustBrowserOutput>
    }
    return CompileRustBrowserOutputModel!
  }

let CompileRustBrowserRemoteInputModel: z.ZodType<CompileRustBrowserRemoteInput>

export const CompileRustBrowserRemoteInputParser =
  (): z.ZodType<CompileRustBrowserRemoteInput> => {
    if (!CompileRustBrowserRemoteInputModel) {
      CompileRustBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustBrowserRemoteInput>
    }
    return CompileRustBrowserRemoteInputModel!
  }
