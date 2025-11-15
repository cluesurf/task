import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ResolveInputForSanitizeLocalExternal,
  ResolveInputForSanitizeLocalInternal,
  ResolveInputForSanitizeRemote,
  SanitizeApi,
} from '~/code/form/action/sanitize/code/shared/index'
import {
  FileContentParser,
  FilePathParser,
  LocalPathParser,
} from '~/code/form/object/file/parsers'

let ResolveInputForSanitizeLocalExternalModel: z.ZodType<ResolveInputForSanitizeLocalExternal>

export const ResolveInputForSanitizeLocalExternalParser =
  (): z.ZodType<ResolveInputForSanitizeLocalExternal> => {
    if (!ResolveInputForSanitizeLocalExternalModel) {
      ResolveInputForSanitizeLocalExternalModel = z.object({
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
      }) as z.ZodType<ResolveInputForSanitizeLocalExternal>
    }
    return ResolveInputForSanitizeLocalExternalModel!
  }

let ResolveInputForSanitizeLocalInternalModel: z.ZodType<ResolveInputForSanitizeLocalInternal>

export const ResolveInputForSanitizeLocalInternalParser =
  (): z.ZodType<ResolveInputForSanitizeLocalInternal> => {
    if (!ResolveInputForSanitizeLocalInternalModel) {
      ResolveInputForSanitizeLocalInternalModel = z.object({
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
      }) as z.ZodType<ResolveInputForSanitizeLocalInternal>
    }
    return ResolveInputForSanitizeLocalInternalModel!
  }

let ResolveInputForSanitizeRemoteModel: z.ZodType<ResolveInputForSanitizeRemote>

export const ResolveInputForSanitizeRemoteParser =
  (): z.ZodType<ResolveInputForSanitizeRemote> => {
    if (!ResolveInputForSanitizeRemoteModel) {
      ResolveInputForSanitizeRemoteModel = z.object({
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
      }) as z.ZodType<ResolveInputForSanitizeRemote>
    }
    return ResolveInputForSanitizeRemoteModel!
  }

let SanitizeApiModel: z.ZodType<SanitizeApi>

export const SanitizeApiParser = (): z.ZodType<SanitizeApi> => {
  if (!SanitizeApiModel) {
    SanitizeApiModel = z.object({
      input: z.object({
        format: z.string(),
      }),
    }) as z.ZodType<SanitizeApi>
  }
  return SanitizeApiModel!
}
