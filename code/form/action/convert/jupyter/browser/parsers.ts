import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertDocumentWithJupyterBrowserInput,
  ConvertDocumentWithJupyterBrowserLocalInput,
  ConvertDocumentWithJupyterBrowserOutput,
  ConvertDocumentWithJupyterBrowserRemoteInput,
} from '~/code/form/action/convert/jupyter/browser/index'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'

let ConvertDocumentWithJupyterBrowserInputModel: z.ZodType<ConvertDocumentWithJupyterBrowserInput>

export const ConvertDocumentWithJupyterBrowserInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterBrowserInput> => {
    if (!ConvertDocumentWithJupyterBrowserInputModel) {
      ConvertDocumentWithJupyterBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertDocumentWithJupyterBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithJupyterBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithJupyterBrowserInputModel!
  }

let ConvertDocumentWithJupyterBrowserLocalInputModel: z.ZodType<ConvertDocumentWithJupyterBrowserLocalInput>

export const ConvertDocumentWithJupyterBrowserLocalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterBrowserLocalInput> => {
    if (!ConvertDocumentWithJupyterBrowserLocalInputModel) {
      ConvertDocumentWithJupyterBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.string(),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertDocumentWithJupyterBrowserLocalInput>
    }
    return ConvertDocumentWithJupyterBrowserLocalInputModel!
  }

let ConvertDocumentWithJupyterBrowserOutputModel: z.ZodType<ConvertDocumentWithJupyterBrowserOutput>

export const ConvertDocumentWithJupyterBrowserOutputParser =
  (): z.ZodType<ConvertDocumentWithJupyterBrowserOutput> => {
    if (!ConvertDocumentWithJupyterBrowserOutputModel) {
      ConvertDocumentWithJupyterBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertDocumentWithJupyterBrowserOutput>
    }
    return ConvertDocumentWithJupyterBrowserOutputModel!
  }

let ConvertDocumentWithJupyterBrowserRemoteInputModel: z.ZodType<ConvertDocumentWithJupyterBrowserRemoteInput>

export const ConvertDocumentWithJupyterBrowserRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterBrowserRemoteInput> => {
    if (!ConvertDocumentWithJupyterBrowserRemoteInputModel) {
      ConvertDocumentWithJupyterBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertDocumentWithJupyterBrowserRemoteInput>
    }
    return ConvertDocumentWithJupyterBrowserRemoteInputModel!
  }
