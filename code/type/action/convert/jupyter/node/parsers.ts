import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertDocumentWithJupyterNodeClientInput,
  ConvertDocumentWithJupyterNodeExternalInput,
  ConvertDocumentWithJupyterNodeInput,
  ConvertDocumentWithJupyterNodeLocalExternalInput,
  ConvertDocumentWithJupyterNodeLocalInput,
  ConvertDocumentWithJupyterNodeLocalInternalInput,
  ConvertDocumentWithJupyterNodeOutput,
  ConvertDocumentWithJupyterNodeRemoteInput,
} from '~/code/type/action/convert/jupyter/node/index'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'

let ConvertDocumentWithJupyterNodeClientInputModel: z.ZodType<ConvertDocumentWithJupyterNodeClientInput>

export const ConvertDocumentWithJupyterNodeClientInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeClientInput> => {
    if (!ConvertDocumentWithJupyterNodeClientInputModel) {
      ConvertDocumentWithJupyterNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeClientInput>
    }
    return ConvertDocumentWithJupyterNodeClientInputModel!
  }

let ConvertDocumentWithJupyterNodeExternalInputModel: z.ZodType<ConvertDocumentWithJupyterNodeExternalInput>

export const ConvertDocumentWithJupyterNodeExternalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeExternalInput> => {
    if (!ConvertDocumentWithJupyterNodeExternalInputModel) {
      ConvertDocumentWithJupyterNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeExternalInput>
    }
    return ConvertDocumentWithJupyterNodeExternalInputModel!
  }

let ConvertDocumentWithJupyterNodeInputModel: z.ZodType<ConvertDocumentWithJupyterNodeInput>

export const ConvertDocumentWithJupyterNodeInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeInput> => {
    if (!ConvertDocumentWithJupyterNodeInputModel) {
      ConvertDocumentWithJupyterNodeInputModel = z.union([
        z.lazy(() => ConvertDocumentWithJupyterNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertDocumentWithJupyterNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertDocumentWithJupyterNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertDocumentWithJupyterNodeInputModel!
  }

let ConvertDocumentWithJupyterNodeLocalExternalInputModel: z.ZodType<ConvertDocumentWithJupyterNodeLocalExternalInput>

export const ConvertDocumentWithJupyterNodeLocalExternalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeLocalExternalInput> => {
    if (!ConvertDocumentWithJupyterNodeLocalExternalInputModel) {
      ConvertDocumentWithJupyterNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeLocalExternalInput>
    }
    return ConvertDocumentWithJupyterNodeLocalExternalInputModel!
  }

let ConvertDocumentWithJupyterNodeLocalInputModel: z.ZodType<ConvertDocumentWithJupyterNodeLocalInput>

export const ConvertDocumentWithJupyterNodeLocalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeLocalInput> => {
    if (!ConvertDocumentWithJupyterNodeLocalInputModel) {
      ConvertDocumentWithJupyterNodeLocalInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeLocalInput>
    }
    return ConvertDocumentWithJupyterNodeLocalInputModel!
  }

let ConvertDocumentWithJupyterNodeLocalInternalInputModel: z.ZodType<ConvertDocumentWithJupyterNodeLocalInternalInput>

export const ConvertDocumentWithJupyterNodeLocalInternalInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeLocalInternalInput> => {
    if (!ConvertDocumentWithJupyterNodeLocalInternalInputModel) {
      ConvertDocumentWithJupyterNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeLocalInternalInput>
    }
    return ConvertDocumentWithJupyterNodeLocalInternalInputModel!
  }

let ConvertDocumentWithJupyterNodeOutputModel: z.ZodType<ConvertDocumentWithJupyterNodeOutput>

export const ConvertDocumentWithJupyterNodeOutputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeOutput> => {
    if (!ConvertDocumentWithJupyterNodeOutputModel) {
      ConvertDocumentWithJupyterNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeOutput>
    }
    return ConvertDocumentWithJupyterNodeOutputModel!
  }

let ConvertDocumentWithJupyterNodeRemoteInputModel: z.ZodType<ConvertDocumentWithJupyterNodeRemoteInput>

export const ConvertDocumentWithJupyterNodeRemoteInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterNodeRemoteInput> => {
    if (!ConvertDocumentWithJupyterNodeRemoteInputModel) {
      ConvertDocumentWithJupyterNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterNodeRemoteInput>
    }
    return ConvertDocumentWithJupyterNodeRemoteInputModel!
  }
