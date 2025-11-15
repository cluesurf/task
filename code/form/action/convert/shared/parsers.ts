import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertApi,
  ResolveInputForConvertLocalExternal,
  ResolveInputForConvertLocalInternal,
  ResolveInputForConvertRemote,
} from '~/code/form/action/convert/shared/index'
import {
  FileContentParser,
  FilePathParser,
  LocalPathParser,
} from '~/code/form/object/file/parsers'

let ConvertApiModel: z.ZodType<ConvertApi>

export const ConvertApiParser = (): z.ZodType<ConvertApi> => {
  if (!ConvertApiModel) {
    ConvertApiModel = z.object({
      input: z.object({
        format: z.string(),
      }),
      output: z.object({
        format: z.string(),
      }),
    }) as z.ZodType<ConvertApi>
  }
  return ConvertApiModel!
}

let ResolveInputForConvertLocalExternalModel: z.ZodType<ResolveInputForConvertLocalExternal>

export const ResolveInputForConvertLocalExternalParser =
  (): z.ZodType<ResolveInputForConvertLocalExternal> => {
    if (!ResolveInputForConvertLocalExternalModel) {
      ResolveInputForConvertLocalExternalModel = z.object({
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
      }) as z.ZodType<ResolveInputForConvertLocalExternal>
    }
    return ResolveInputForConvertLocalExternalModel!
  }

let ResolveInputForConvertLocalInternalModel: z.ZodType<ResolveInputForConvertLocalInternal>

export const ResolveInputForConvertLocalInternalParser =
  (): z.ZodType<ResolveInputForConvertLocalInternal> => {
    if (!ResolveInputForConvertLocalInternalModel) {
      ResolveInputForConvertLocalInternalModel = z.object({
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
      }) as z.ZodType<ResolveInputForConvertLocalInternal>
    }
    return ResolveInputForConvertLocalInternalModel!
  }

let ResolveInputForConvertRemoteModel: z.ZodType<ResolveInputForConvertRemote>

export const ResolveInputForConvertRemoteParser =
  (): z.ZodType<ResolveInputForConvertRemote> => {
    if (!ResolveInputForConvertRemoteModel) {
      ResolveInputForConvertRemoteModel = z.object({
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
      }) as z.ZodType<ResolveInputForConvertRemote>
    }
    return ResolveInputForConvertRemoteModel!
  }
