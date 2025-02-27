import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertArchiveBrowserInput,
  ConvertArchiveBrowserLocalInput,
  ConvertArchiveBrowserOutput,
  ConvertArchiveBrowserRemoteInput,
} from '~/code/type/action/convert/archive/browser/index'
import { ArchiveFormatParser } from '~/code/type/object/archive/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let ConvertArchiveBrowserInputModel: z.ZodType<ConvertArchiveBrowserInput>

export const ConvertArchiveBrowserInputParser =
  (): z.ZodType<ConvertArchiveBrowserInput> => {
    if (!ConvertArchiveBrowserInputModel) {
      ConvertArchiveBrowserInputModel = z.union([
        z.lazy(() => ConvertArchiveBrowserRemoteInputParser()),
        z.lazy(() => ConvertArchiveBrowserLocalInputParser()),
      ])
    }
    return ConvertArchiveBrowserInputModel!
  }

let ConvertArchiveBrowserLocalInputModel: z.ZodType<ConvertArchiveBrowserLocalInput>

export const ConvertArchiveBrowserLocalInputParser =
  (): z.ZodType<ConvertArchiveBrowserLocalInput> => {
    if (!ConvertArchiveBrowserLocalInputModel) {
      ConvertArchiveBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
        }),
      }) as z.ZodType<ConvertArchiveBrowserLocalInput>
    }
    return ConvertArchiveBrowserLocalInputModel!
  }

let ConvertArchiveBrowserOutputModel: z.ZodType<ConvertArchiveBrowserOutput>

export const ConvertArchiveBrowserOutputParser =
  (): z.ZodType<ConvertArchiveBrowserOutput> => {
    if (!ConvertArchiveBrowserOutputModel) {
      ConvertArchiveBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertArchiveBrowserOutput>
    }
    return ConvertArchiveBrowserOutputModel!
  }

let ConvertArchiveBrowserRemoteInputModel: z.ZodType<ConvertArchiveBrowserRemoteInput>

export const ConvertArchiveBrowserRemoteInputParser =
  (): z.ZodType<ConvertArchiveBrowserRemoteInput> => {
    if (!ConvertArchiveBrowserRemoteInputModel) {
      ConvertArchiveBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
        }),
      }) as z.ZodType<ConvertArchiveBrowserRemoteInput>
    }
    return ConvertArchiveBrowserRemoteInputModel!
  }
