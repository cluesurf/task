import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileSwiftBrowserInput,
  CompileSwiftBrowserLocalInput,
  CompileSwiftBrowserOutput,
  CompileSwiftBrowserRemoteInput,
} from '~/code/type/action/compile/code/swift/browser/index'
import { SwiftInputFormatParser } from '~/code/type/action/compile/code/swift/shared/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'
import { BackendCompilationOutputParser } from '~/code/type/object/llvm/parsers'

let CompileSwiftBrowserInputModel: z.ZodType<CompileSwiftBrowserInput>

export const CompileSwiftBrowserInputParser =
  (): z.ZodType<CompileSwiftBrowserInput> => {
    if (!CompileSwiftBrowserInputModel) {
      CompileSwiftBrowserInputModel = z.union([
        z.lazy(() => CompileSwiftBrowserRemoteInputParser()),
        z.lazy(() => CompileSwiftBrowserLocalInputParser()),
      ])
    }
    return CompileSwiftBrowserInputModel!
  }

let CompileSwiftBrowserLocalInputModel: z.ZodType<CompileSwiftBrowserLocalInput>

export const CompileSwiftBrowserLocalInputParser =
  (): z.ZodType<CompileSwiftBrowserLocalInput> => {
    if (!CompileSwiftBrowserLocalInputModel) {
      CompileSwiftBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
        }),
      }) as z.ZodType<CompileSwiftBrowserLocalInput>
    }
    return CompileSwiftBrowserLocalInputModel!
  }

let CompileSwiftBrowserOutputModel: z.ZodType<CompileSwiftBrowserOutput>

export const CompileSwiftBrowserOutputParser =
  (): z.ZodType<CompileSwiftBrowserOutput> => {
    if (!CompileSwiftBrowserOutputModel) {
      CompileSwiftBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileSwiftBrowserOutput>
    }
    return CompileSwiftBrowserOutputModel!
  }

let CompileSwiftBrowserRemoteInputModel: z.ZodType<CompileSwiftBrowserRemoteInput>

export const CompileSwiftBrowserRemoteInputParser =
  (): z.ZodType<CompileSwiftBrowserRemoteInput> => {
    if (!CompileSwiftBrowserRemoteInputModel) {
      CompileSwiftBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
        }),
      }) as z.ZodType<CompileSwiftBrowserRemoteInput>
    }
    return CompileSwiftBrowserRemoteInputModel!
  }
