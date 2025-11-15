import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  SanitizeHtmlBrowserInput,
  SanitizeHtmlBrowserLocalInput,
  SanitizeHtmlBrowserOutput,
  SanitizeHtmlBrowserRemoteInput,
} from '~/code/form/action/sanitize/code/browser/index'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'

let SanitizeHtmlBrowserInputModel: z.ZodType<SanitizeHtmlBrowserInput>

export const SanitizeHtmlBrowserInputParser =
  (): z.ZodType<SanitizeHtmlBrowserInput> => {
    if (!SanitizeHtmlBrowserInputModel) {
      SanitizeHtmlBrowserInputModel = z.union([
        z.lazy(() => SanitizeHtmlBrowserRemoteInputParser()),
        z.lazy(() => SanitizeHtmlBrowserLocalInputParser()),
      ])
    }
    return SanitizeHtmlBrowserInputModel!
  }

let SanitizeHtmlBrowserLocalInputModel: z.ZodType<SanitizeHtmlBrowserLocalInput>

export const SanitizeHtmlBrowserLocalInputParser =
  (): z.ZodType<SanitizeHtmlBrowserLocalInput> => {
    if (!SanitizeHtmlBrowserLocalInputModel) {
      SanitizeHtmlBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.string(),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
      }) as z.ZodType<SanitizeHtmlBrowserLocalInput>
    }
    return SanitizeHtmlBrowserLocalInputModel!
  }

let SanitizeHtmlBrowserOutputModel: z.ZodType<SanitizeHtmlBrowserOutput>

export const SanitizeHtmlBrowserOutputParser =
  (): z.ZodType<SanitizeHtmlBrowserOutput> => {
    if (!SanitizeHtmlBrowserOutputModel) {
      SanitizeHtmlBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<SanitizeHtmlBrowserOutput>
    }
    return SanitizeHtmlBrowserOutputModel!
  }

let SanitizeHtmlBrowserRemoteInputModel: z.ZodType<SanitizeHtmlBrowserRemoteInput>

export const SanitizeHtmlBrowserRemoteInputParser =
  (): z.ZodType<SanitizeHtmlBrowserRemoteInput> => {
    if (!SanitizeHtmlBrowserRemoteInputModel) {
      SanitizeHtmlBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
      }) as z.ZodType<SanitizeHtmlBrowserRemoteInput>
    }
    return SanitizeHtmlBrowserRemoteInputModel!
  }
