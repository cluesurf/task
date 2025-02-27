import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileWastBrowserInput,
  CompileWastBrowserLocalInput,
  CompileWastBrowserOutput,
  CompileWastBrowserRemoteInput,
} from '~/code/type/action/compile/code/wast/browser/index'
import {
  WastInputFormatParser,
  WastOutputFormatParser,
} from '~/code/type/action/compile/code/wast/shared/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let CompileWastBrowserInputModel: z.ZodType<CompileWastBrowserInput>

export const CompileWastBrowserInputParser =
  (): z.ZodType<CompileWastBrowserInput> => {
    if (!CompileWastBrowserInputModel) {
      CompileWastBrowserInputModel = z.union([
        z.lazy(() => CompileWastBrowserRemoteInputParser()),
        z.lazy(() => CompileWastBrowserLocalInputParser()),
      ])
    }
    return CompileWastBrowserInputModel!
  }

let CompileWastBrowserLocalInputModel: z.ZodType<CompileWastBrowserLocalInput>

export const CompileWastBrowserLocalInputParser =
  (): z.ZodType<CompileWastBrowserLocalInput> => {
    if (!CompileWastBrowserLocalInputModel) {
      CompileWastBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
        }),
      }) as z.ZodType<CompileWastBrowserLocalInput>
    }
    return CompileWastBrowserLocalInputModel!
  }

let CompileWastBrowserOutputModel: z.ZodType<CompileWastBrowserOutput>

export const CompileWastBrowserOutputParser =
  (): z.ZodType<CompileWastBrowserOutput> => {
    if (!CompileWastBrowserOutputModel) {
      CompileWastBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<CompileWastBrowserOutput>
    }
    return CompileWastBrowserOutputModel!
  }

let CompileWastBrowserRemoteInputModel: z.ZodType<CompileWastBrowserRemoteInput>

export const CompileWastBrowserRemoteInputParser =
  (): z.ZodType<CompileWastBrowserRemoteInput> => {
    if (!CompileWastBrowserRemoteInputModel) {
      CompileWastBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
        }),
      }) as z.ZodType<CompileWastBrowserRemoteInput>
    }
    return CompileWastBrowserRemoteInputModel!
  }
