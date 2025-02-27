import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertHtmlWithPuppeteerNodeClientInput,
  ConvertHtmlWithPuppeteerNodeExternalInput,
  ConvertHtmlWithPuppeteerNodeInput,
  ConvertHtmlWithPuppeteerNodeLocalExternalInput,
  ConvertHtmlWithPuppeteerNodeLocalInput,
  ConvertHtmlWithPuppeteerNodeLocalInternalInput,
  ConvertHtmlWithPuppeteerNodeOutput,
  ConvertHtmlWithPuppeteerNodeRemoteInput,
  ConvertMarkdownWithPuppeteerNodeClientInput,
  ConvertMarkdownWithPuppeteerNodeExternalInput,
  ConvertMarkdownWithPuppeteerNodeInput,
  ConvertMarkdownWithPuppeteerNodeLocalExternalInput,
  ConvertMarkdownWithPuppeteerNodeLocalInput,
  ConvertMarkdownWithPuppeteerNodeLocalInternalInput,
  ConvertMarkdownWithPuppeteerNodeOutput,
  ConvertMarkdownWithPuppeteerNodeRemoteInput,
  ConvertTxtWithPuppeteerNodeClientInput,
  ConvertTxtWithPuppeteerNodeExternalInput,
  ConvertTxtWithPuppeteerNodeInput,
  ConvertTxtWithPuppeteerNodeLocalExternalInput,
  ConvertTxtWithPuppeteerNodeLocalInput,
  ConvertTxtWithPuppeteerNodeLocalInternalInput,
  ConvertTxtWithPuppeteerNodeOutput,
  ConvertTxtWithPuppeteerNodeRemoteInput,
} from '~/code/type/action/convert/puppeteer/node/index'
import {
  PuppeteerInputFormatParser,
  PuppeteerLifeCycleEventParser,
  PuppeteerMarkdownInputFormatParser,
  PuppeteerOutputFormatParser,
  PuppeteerTxtInputFormatParser,
} from '~/code/type/object/puppeteer/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'
import { TextStyleParser } from '~/code/type/action/convert/parsers'

let ConvertHtmlWithPuppeteerNodeClientInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeClientInput>

export const ConvertHtmlWithPuppeteerNodeClientInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeClientInput> => {
    if (!ConvertHtmlWithPuppeteerNodeClientInputModel) {
      ConvertHtmlWithPuppeteerNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeClientInput>
    }
    return ConvertHtmlWithPuppeteerNodeClientInputModel!
  }

let ConvertHtmlWithPuppeteerNodeExternalInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeExternalInput>

export const ConvertHtmlWithPuppeteerNodeExternalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeExternalInput> => {
    if (!ConvertHtmlWithPuppeteerNodeExternalInputModel) {
      ConvertHtmlWithPuppeteerNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeExternalInput>
    }
    return ConvertHtmlWithPuppeteerNodeExternalInputModel!
  }

let ConvertHtmlWithPuppeteerNodeInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeInput>

export const ConvertHtmlWithPuppeteerNodeInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeInput> => {
    if (!ConvertHtmlWithPuppeteerNodeInputModel) {
      ConvertHtmlWithPuppeteerNodeInputModel = z.union([
        z.lazy(() => ConvertHtmlWithPuppeteerNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertHtmlWithPuppeteerNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertHtmlWithPuppeteerNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertHtmlWithPuppeteerNodeInputModel!
  }

let ConvertHtmlWithPuppeteerNodeLocalExternalInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeLocalExternalInput>

export const ConvertHtmlWithPuppeteerNodeLocalExternalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeLocalExternalInput> => {
    if (!ConvertHtmlWithPuppeteerNodeLocalExternalInputModel) {
      ConvertHtmlWithPuppeteerNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeLocalExternalInput>
    }
    return ConvertHtmlWithPuppeteerNodeLocalExternalInputModel!
  }

let ConvertHtmlWithPuppeteerNodeLocalInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInput>

export const ConvertHtmlWithPuppeteerNodeLocalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInput> => {
    if (!ConvertHtmlWithPuppeteerNodeLocalInputModel) {
      ConvertHtmlWithPuppeteerNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInput>
    }
    return ConvertHtmlWithPuppeteerNodeLocalInputModel!
  }

let ConvertHtmlWithPuppeteerNodeLocalInternalInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInternalInput>

export const ConvertHtmlWithPuppeteerNodeLocalInternalInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInternalInput> => {
    if (!ConvertHtmlWithPuppeteerNodeLocalInternalInputModel) {
      ConvertHtmlWithPuppeteerNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeLocalInternalInput>
    }
    return ConvertHtmlWithPuppeteerNodeLocalInternalInputModel!
  }

let ConvertHtmlWithPuppeteerNodeOutputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeOutput>

export const ConvertHtmlWithPuppeteerNodeOutputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeOutput> => {
    if (!ConvertHtmlWithPuppeteerNodeOutputModel) {
      ConvertHtmlWithPuppeteerNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeOutput>
    }
    return ConvertHtmlWithPuppeteerNodeOutputModel!
  }

let ConvertHtmlWithPuppeteerNodeRemoteInputModel: z.ZodType<ConvertHtmlWithPuppeteerNodeRemoteInput>

export const ConvertHtmlWithPuppeteerNodeRemoteInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerNodeRemoteInput> => {
    if (!ConvertHtmlWithPuppeteerNodeRemoteInputModel) {
      ConvertHtmlWithPuppeteerNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerNodeRemoteInput>
    }
    return ConvertHtmlWithPuppeteerNodeRemoteInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeClientInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeClientInput>

export const ConvertMarkdownWithPuppeteerNodeClientInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeClientInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeClientInputModel) {
      ConvertMarkdownWithPuppeteerNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            h1: z.optional(z.lazy(() => TextStyleParser())),
            h2: z.optional(z.lazy(() => TextStyleParser())),
            h3: z.optional(z.lazy(() => TextStyleParser())),
            h4: z.optional(z.lazy(() => TextStyleParser())),
            h5: z.optional(z.lazy(() => TextStyleParser())),
            h6: z.optional(z.lazy(() => TextStyleParser())),
            text: z.optional(z.lazy(() => TextStyleParser())),
            link: z.optional(z.lazy(() => TextStyleParser())),
          }),
        ),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeClientInput>
    }
    return ConvertMarkdownWithPuppeteerNodeClientInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeExternalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeExternalInput>

export const ConvertMarkdownWithPuppeteerNodeExternalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeExternalInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeExternalInputModel) {
      ConvertMarkdownWithPuppeteerNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            h1: z.optional(z.lazy(() => TextStyleParser())),
            h2: z.optional(z.lazy(() => TextStyleParser())),
            h3: z.optional(z.lazy(() => TextStyleParser())),
            h4: z.optional(z.lazy(() => TextStyleParser())),
            h5: z.optional(z.lazy(() => TextStyleParser())),
            h6: z.optional(z.lazy(() => TextStyleParser())),
            text: z.optional(z.lazy(() => TextStyleParser())),
            link: z.optional(z.lazy(() => TextStyleParser())),
          }),
        ),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeExternalInput>
    }
    return ConvertMarkdownWithPuppeteerNodeExternalInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeInput>

export const ConvertMarkdownWithPuppeteerNodeInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeInputModel) {
      ConvertMarkdownWithPuppeteerNodeInputModel = z.union([
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerNodeRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertMarkdownWithPuppeteerNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertMarkdownWithPuppeteerNodeInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeLocalExternalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalExternalInput>

export const ConvertMarkdownWithPuppeteerNodeLocalExternalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalExternalInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeLocalExternalInputModel) {
      ConvertMarkdownWithPuppeteerNodeLocalExternalInputModel =
        z.object({
          handle: z.literal('external'),
          input: z.object({
            format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
            file: z.union([
              z.lazy(() => RemoteInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => PuppeteerOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
          viewport: z.optional(
            z.object({
              width: z.optional(z.number().int().gte(0)),
              height: z.optional(z.number().int().gte(0)),
            }),
          ),
          proxy: z.optional(z.string()),
          waitUntil: z.optional(
            z.lazy(() => PuppeteerLifeCycleEventParser()),
          ),
          style: z.optional(
            z.object({
              margin: z.optional(
                z.object({
                  x: z.optional(z.number().int().gte(0)),
                  y: z.optional(z.number().int().gte(0)),
                }),
              ),
              h1: z.optional(z.lazy(() => TextStyleParser())),
              h2: z.optional(z.lazy(() => TextStyleParser())),
              h3: z.optional(z.lazy(() => TextStyleParser())),
              h4: z.optional(z.lazy(() => TextStyleParser())),
              h5: z.optional(z.lazy(() => TextStyleParser())),
              h6: z.optional(z.lazy(() => TextStyleParser())),
              text: z.optional(z.lazy(() => TextStyleParser())),
              link: z.optional(z.lazy(() => TextStyleParser())),
            }),
          ),
        }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalExternalInput>
    }
    return ConvertMarkdownWithPuppeteerNodeLocalExternalInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeLocalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInput>

export const ConvertMarkdownWithPuppeteerNodeLocalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeLocalInputModel) {
      ConvertMarkdownWithPuppeteerNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.object({
            content: z.instanceof(ArrayBuffer),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            h1: z.optional(z.lazy(() => TextStyleParser())),
            h2: z.optional(z.lazy(() => TextStyleParser())),
            h3: z.optional(z.lazy(() => TextStyleParser())),
            h4: z.optional(z.lazy(() => TextStyleParser())),
            h5: z.optional(z.lazy(() => TextStyleParser())),
            h6: z.optional(z.lazy(() => TextStyleParser())),
            text: z.optional(z.lazy(() => TextStyleParser())),
            link: z.optional(z.lazy(() => TextStyleParser())),
          }),
        ),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInput>
    }
    return ConvertMarkdownWithPuppeteerNodeLocalInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeLocalInternalInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInternalInput>

export const ConvertMarkdownWithPuppeteerNodeLocalInternalInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInternalInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeLocalInternalInputModel) {
      ConvertMarkdownWithPuppeteerNodeLocalInternalInputModel =
        z.object({
          handle: z.optional(z.literal('internal')),
          input: z.object({
            format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
            file: z.union([
              z.lazy(() => FileInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => PuppeteerOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
          }),
          pathScope: z.optional(z.string()),
          viewport: z.optional(
            z.object({
              width: z.optional(z.number().int().gte(0)),
              height: z.optional(z.number().int().gte(0)),
            }),
          ),
          proxy: z.optional(z.string()),
          waitUntil: z.optional(
            z.lazy(() => PuppeteerLifeCycleEventParser()),
          ),
          style: z.optional(
            z.object({
              margin: z.optional(
                z.object({
                  x: z.optional(z.number().int().gte(0)),
                  y: z.optional(z.number().int().gte(0)),
                }),
              ),
              h1: z.optional(z.lazy(() => TextStyleParser())),
              h2: z.optional(z.lazy(() => TextStyleParser())),
              h3: z.optional(z.lazy(() => TextStyleParser())),
              h4: z.optional(z.lazy(() => TextStyleParser())),
              h5: z.optional(z.lazy(() => TextStyleParser())),
              h6: z.optional(z.lazy(() => TextStyleParser())),
              text: z.optional(z.lazy(() => TextStyleParser())),
              link: z.optional(z.lazy(() => TextStyleParser())),
            }),
          ),
        }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeLocalInternalInput>
    }
    return ConvertMarkdownWithPuppeteerNodeLocalInternalInputModel!
  }

let ConvertMarkdownWithPuppeteerNodeOutputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeOutput>

export const ConvertMarkdownWithPuppeteerNodeOutputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeOutput> => {
    if (!ConvertMarkdownWithPuppeteerNodeOutputModel) {
      ConvertMarkdownWithPuppeteerNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeOutput>
    }
    return ConvertMarkdownWithPuppeteerNodeOutputModel!
  }

let ConvertMarkdownWithPuppeteerNodeRemoteInputModel: z.ZodType<ConvertMarkdownWithPuppeteerNodeRemoteInput>

export const ConvertMarkdownWithPuppeteerNodeRemoteInputParser =
  (): z.ZodType<ConvertMarkdownWithPuppeteerNodeRemoteInput> => {
    if (!ConvertMarkdownWithPuppeteerNodeRemoteInputModel) {
      ConvertMarkdownWithPuppeteerNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerMarkdownInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            h1: z.optional(z.lazy(() => TextStyleParser())),
            h2: z.optional(z.lazy(() => TextStyleParser())),
            h3: z.optional(z.lazy(() => TextStyleParser())),
            h4: z.optional(z.lazy(() => TextStyleParser())),
            h5: z.optional(z.lazy(() => TextStyleParser())),
            h6: z.optional(z.lazy(() => TextStyleParser())),
            text: z.optional(z.lazy(() => TextStyleParser())),
            link: z.optional(z.lazy(() => TextStyleParser())),
          }),
        ),
      }) as z.ZodType<ConvertMarkdownWithPuppeteerNodeRemoteInput>
    }
    return ConvertMarkdownWithPuppeteerNodeRemoteInputModel!
  }

let ConvertTxtWithPuppeteerNodeClientInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeClientInput>

export const ConvertTxtWithPuppeteerNodeClientInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeClientInput> => {
    if (!ConvertTxtWithPuppeteerNodeClientInputModel) {
      ConvertTxtWithPuppeteerNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeClientInput>
    }
    return ConvertTxtWithPuppeteerNodeClientInputModel!
  }

let ConvertTxtWithPuppeteerNodeExternalInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeExternalInput>

export const ConvertTxtWithPuppeteerNodeExternalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeExternalInput> => {
    if (!ConvertTxtWithPuppeteerNodeExternalInputModel) {
      ConvertTxtWithPuppeteerNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
        }),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeExternalInput>
    }
    return ConvertTxtWithPuppeteerNodeExternalInputModel!
  }

let ConvertTxtWithPuppeteerNodeInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeInput>

export const ConvertTxtWithPuppeteerNodeInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeInput> => {
    if (!ConvertTxtWithPuppeteerNodeInputModel) {
      ConvertTxtWithPuppeteerNodeInputModel = z.union([
        z.lazy(() => ConvertTxtWithPuppeteerNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertTxtWithPuppeteerNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertTxtWithPuppeteerNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertTxtWithPuppeteerNodeInputModel!
  }

let ConvertTxtWithPuppeteerNodeLocalExternalInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeLocalExternalInput>

export const ConvertTxtWithPuppeteerNodeLocalExternalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeLocalExternalInput> => {
    if (!ConvertTxtWithPuppeteerNodeLocalExternalInputModel) {
      ConvertTxtWithPuppeteerNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeLocalExternalInput>
    }
    return ConvertTxtWithPuppeteerNodeLocalExternalInputModel!
  }

let ConvertTxtWithPuppeteerNodeLocalInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeLocalInput>

export const ConvertTxtWithPuppeteerNodeLocalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeLocalInput> => {
    if (!ConvertTxtWithPuppeteerNodeLocalInputModel) {
      ConvertTxtWithPuppeteerNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.object({
            content: z.instanceof(ArrayBuffer),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeLocalInput>
    }
    return ConvertTxtWithPuppeteerNodeLocalInputModel!
  }

let ConvertTxtWithPuppeteerNodeLocalInternalInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeLocalInternalInput>

export const ConvertTxtWithPuppeteerNodeLocalInternalInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeLocalInternalInput> => {
    if (!ConvertTxtWithPuppeteerNodeLocalInternalInputModel) {
      ConvertTxtWithPuppeteerNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeLocalInternalInput>
    }
    return ConvertTxtWithPuppeteerNodeLocalInternalInputModel!
  }

let ConvertTxtWithPuppeteerNodeOutputModel: z.ZodType<ConvertTxtWithPuppeteerNodeOutput>

export const ConvertTxtWithPuppeteerNodeOutputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeOutput> => {
    if (!ConvertTxtWithPuppeteerNodeOutputModel) {
      ConvertTxtWithPuppeteerNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeOutput>
    }
    return ConvertTxtWithPuppeteerNodeOutputModel!
  }

let ConvertTxtWithPuppeteerNodeRemoteInputModel: z.ZodType<ConvertTxtWithPuppeteerNodeRemoteInput>

export const ConvertTxtWithPuppeteerNodeRemoteInputParser =
  (): z.ZodType<ConvertTxtWithPuppeteerNodeRemoteInput> => {
    if (!ConvertTxtWithPuppeteerNodeRemoteInputModel) {
      ConvertTxtWithPuppeteerNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PuppeteerTxtInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.optional(
          z.object({
            width: z.optional(z.number().int().gte(0)),
            height: z.optional(z.number().int().gte(0)),
          }),
        ),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
        style: z.optional(
          z.object({
            margin: z.optional(
              z.object({
                x: z.optional(z.number().int().gte(0)),
                y: z.optional(z.number().int().gte(0)),
              }),
            ),
            text: z.lazy(() => TextStyleParser()),
          }),
        ),
      }) as z.ZodType<ConvertTxtWithPuppeteerNodeRemoteInput>
    }
    return ConvertTxtWithPuppeteerNodeRemoteInputModel!
  }
