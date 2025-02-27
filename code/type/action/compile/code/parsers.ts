import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileApi,
  ResolveInputForCompileLocalExternal,
  ResolveInputForCompileLocalInternal,
  ResolveInputForCompileRemote,
} from '~/code/type/action/compile/code/index'
import {
  FileContentParser,
  FilePathParser,
  LocalPathParser,
} from '~/code/type/object/file/parsers'

let CompileApiModel: z.ZodType<CompileApi>

export const CompileApiParser = (): z.ZodType<CompileApi> => {
  if (!CompileApiModel) {
    CompileApiModel = z.object({
      input: z.object({
        format: z.string(),
      }),
      output: z.object({
        format: z.string(),
      }),
    }) as z.ZodType<CompileApi>
  }
  return CompileApiModel!
}

let ResolveInputForCompileLocalExternalModel: z.ZodType<ResolveInputForCompileLocalExternal>

export const ResolveInputForCompileLocalExternalParser =
  (): z.ZodType<ResolveInputForCompileLocalExternal> => {
    if (!ResolveInputForCompileLocalExternalModel) {
      ResolveInputForCompileLocalExternalModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForCompileLocalExternal>
    }
    return ResolveInputForCompileLocalExternalModel!
  }

let ResolveInputForCompileLocalInternalModel: z.ZodType<ResolveInputForCompileLocalInternal>

export const ResolveInputForCompileLocalInternalParser =
  (): z.ZodType<ResolveInputForCompileLocalInternal> => {
    if (!ResolveInputForCompileLocalInternalModel) {
      ResolveInputForCompileLocalInternalModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForCompileLocalInternal>
    }
    return ResolveInputForCompileLocalInternalModel!
  }

let ResolveInputForCompileRemoteModel: z.ZodType<ResolveInputForCompileRemote>

export const ResolveInputForCompileRemoteParser =
  (): z.ZodType<ResolveInputForCompileRemote> => {
    if (!ResolveInputForCompileRemoteModel) {
      ResolveInputForCompileRemoteModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForCompileRemote>
    }
    return ResolveInputForCompileRemoteModel!
  }
