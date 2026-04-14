import { z } from 'zod'

import { TextStyleParser } from '~/code/form/action/convert/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'
import {
  PuppeteerInputFormatParser,
  PuppeteerLifeCycleEventParser,
  PuppeteerMarkdownInputFormatParser,
  PuppeteerOutputFormatParser,
  PuppeteerTxtInputFormatParser,
} from '~/code/form/object/puppeteer/take'

export const ConvertHtmlWithPuppeteerNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => PuppeteerInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
  }),
  viewport: z.object({
    width: z.optional(z.number().int().gte(0)),
    height: z.optional(z.number().int().gte(0)),
  }),
  proxy: z.optional(z.string()),
  waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
})

export type ConvertHtmlWithPuppeteerNodeClientInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerNodeClientInputParser
>

export const ConvertHtmlWithPuppeteerNodeExternalInputParser = z.object(
  {
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => PuppeteerInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
    }),
    viewport: z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  },
)

export type ConvertHtmlWithPuppeteerNodeExternalInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerNodeExternalInputParser
>

export const ConvertHtmlWithPuppeteerNodeInputParser = z.union([
  z.lazy(() => ConvertHtmlWithPuppeteerNodeRemoteInputParser),
  z.lazy(() => ConvertHtmlWithPuppeteerNodeLocalExternalInputParser),
  z.lazy(() => ConvertHtmlWithPuppeteerNodeLocalInternalInputParser),
])

export type ConvertHtmlWithPuppeteerNodeInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerNodeInputParser
>

export const ConvertHtmlWithPuppeteerNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => PuppeteerInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
    viewport: z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  })

export type ConvertHtmlWithPuppeteerNodeLocalExternalInputRecord =
  z.infer<typeof ConvertHtmlWithPuppeteerNodeLocalExternalInputParser>

export const ConvertHtmlWithPuppeteerNodeLocalInputParser = z.object({
  input: z.object({
    format: z.lazy(() => PuppeteerInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
  viewport: z.object({
    width: z.optional(z.number().int().gte(0)),
    height: z.optional(z.number().int().gte(0)),
  }),
  proxy: z.optional(z.string()),
  waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
})

export type ConvertHtmlWithPuppeteerNodeLocalInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerNodeLocalInputParser
>

export const ConvertHtmlWithPuppeteerNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.lazy(() => PuppeteerInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
    viewport: z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  })

export type ConvertHtmlWithPuppeteerNodeLocalInternalInputRecord =
  z.infer<typeof ConvertHtmlWithPuppeteerNodeLocalInternalInputParser>

export const ConvertHtmlWithPuppeteerNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertHtmlWithPuppeteerNodeOutputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerNodeOutputParser
>

export const ConvertHtmlWithPuppeteerNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => PuppeteerInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
  viewport: z.object({
    width: z.optional(z.number().int().gte(0)),
    height: z.optional(z.number().int().gte(0)),
  }),
  proxy: z.optional(z.string()),
  waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
})

export type ConvertHtmlWithPuppeteerNodeRemoteInputRecord = z.infer<
  typeof ConvertHtmlWithPuppeteerNodeRemoteInputParser
>

export const ConvertMarkdownWithPuppeteerNodeClientInputParser =
  z.object({
    handle: z.literal('client'),
    input: z.object({
      format: z.lazy(() => PuppeteerMarkdownInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
    }),
    viewport: z.optional(
      z.object({
        width: z.optional(z.number().int().gte(0)),
        height: z.optional(z.number().int().gte(0)),
      }),
    ),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
    style: z.optional(
      z.object({
        margin: z.optional(
          z.object({
            x: z.optional(z.number().int().gte(0)),
            y: z.optional(z.number().int().gte(0)),
          }),
        ),
        h1: z.optional(z.lazy(() => TextStyleParser)),
        h2: z.optional(z.lazy(() => TextStyleParser)),
        h3: z.optional(z.lazy(() => TextStyleParser)),
        h4: z.optional(z.lazy(() => TextStyleParser)),
        h5: z.optional(z.lazy(() => TextStyleParser)),
        h6: z.optional(z.lazy(() => TextStyleParser)),
        text: z.optional(z.lazy(() => TextStyleParser)),
        link: z.optional(z.lazy(() => TextStyleParser)),
      }),
    ),
  })

export type ConvertMarkdownWithPuppeteerNodeClientInputRecord = z.infer<
  typeof ConvertMarkdownWithPuppeteerNodeClientInputParser
>

export const ConvertMarkdownWithPuppeteerNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => PuppeteerMarkdownInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
    }),
    viewport: z.optional(
      z.object({
        width: z.optional(z.number().int().gte(0)),
        height: z.optional(z.number().int().gte(0)),
      }),
    ),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
    style: z.optional(
      z.object({
        margin: z.optional(
          z.object({
            x: z.optional(z.number().int().gte(0)),
            y: z.optional(z.number().int().gte(0)),
          }),
        ),
        h1: z.optional(z.lazy(() => TextStyleParser)),
        h2: z.optional(z.lazy(() => TextStyleParser)),
        h3: z.optional(z.lazy(() => TextStyleParser)),
        h4: z.optional(z.lazy(() => TextStyleParser)),
        h5: z.optional(z.lazy(() => TextStyleParser)),
        h6: z.optional(z.lazy(() => TextStyleParser)),
        text: z.optional(z.lazy(() => TextStyleParser)),
        link: z.optional(z.lazy(() => TextStyleParser)),
      }),
    ),
  })

export type ConvertMarkdownWithPuppeteerNodeExternalInputRecord =
  z.infer<typeof ConvertMarkdownWithPuppeteerNodeExternalInputParser>

export const ConvertMarkdownWithPuppeteerNodeInputParser = z.union([
  z.lazy(() => ConvertMarkdownWithPuppeteerNodeRemoteInputParser),
  z.lazy(
    () => ConvertMarkdownWithPuppeteerNodeLocalExternalInputParser,
  ),
  z.lazy(
    () => ConvertMarkdownWithPuppeteerNodeLocalInternalInputParser,
  ),
])

export type ConvertMarkdownWithPuppeteerNodeInputRecord = z.infer<
  typeof ConvertMarkdownWithPuppeteerNodeInputParser
>

export const ConvertMarkdownWithPuppeteerNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => PuppeteerMarkdownInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
    viewport: z.optional(
      z.object({
        width: z.optional(z.number().int().gte(0)),
        height: z.optional(z.number().int().gte(0)),
      }),
    ),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
    style: z.optional(
      z.object({
        margin: z.optional(
          z.object({
            x: z.optional(z.number().int().gte(0)),
            y: z.optional(z.number().int().gte(0)),
          }),
        ),
        h1: z.optional(z.lazy(() => TextStyleParser)),
        h2: z.optional(z.lazy(() => TextStyleParser)),
        h3: z.optional(z.lazy(() => TextStyleParser)),
        h4: z.optional(z.lazy(() => TextStyleParser)),
        h5: z.optional(z.lazy(() => TextStyleParser)),
        h6: z.optional(z.lazy(() => TextStyleParser)),
        text: z.optional(z.lazy(() => TextStyleParser)),
        link: z.optional(z.lazy(() => TextStyleParser)),
      }),
    ),
  })

export type ConvertMarkdownWithPuppeteerNodeLocalExternalInputRecord =
  z.infer<
    typeof ConvertMarkdownWithPuppeteerNodeLocalExternalInputParser
  >

export const ConvertMarkdownWithPuppeteerNodeLocalInputParser =
  z.object({
    input: z.object({
      format: z.lazy(() => PuppeteerMarkdownInputFormatParser),
      file: z.object({
        content: z.instanceof(ArrayBuffer),
      }),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
      file: z.lazy(() => LocalPathParser),
    }),
    pathScope: z.optional(z.string()),
    viewport: z.optional(
      z.object({
        width: z.optional(z.number().int().gte(0)),
        height: z.optional(z.number().int().gte(0)),
      }),
    ),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
    style: z.optional(
      z.object({
        margin: z.optional(
          z.object({
            x: z.optional(z.number().int().gte(0)),
            y: z.optional(z.number().int().gte(0)),
          }),
        ),
        h1: z.optional(z.lazy(() => TextStyleParser)),
        h2: z.optional(z.lazy(() => TextStyleParser)),
        h3: z.optional(z.lazy(() => TextStyleParser)),
        h4: z.optional(z.lazy(() => TextStyleParser)),
        h5: z.optional(z.lazy(() => TextStyleParser)),
        h6: z.optional(z.lazy(() => TextStyleParser)),
        text: z.optional(z.lazy(() => TextStyleParser)),
        link: z.optional(z.lazy(() => TextStyleParser)),
      }),
    ),
  })

export type ConvertMarkdownWithPuppeteerNodeLocalInputRecord = z.infer<
  typeof ConvertMarkdownWithPuppeteerNodeLocalInputParser
>

export const ConvertMarkdownWithPuppeteerNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.lazy(() => PuppeteerMarkdownInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
    viewport: z.optional(
      z.object({
        width: z.optional(z.number().int().gte(0)),
        height: z.optional(z.number().int().gte(0)),
      }),
    ),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
    style: z.optional(
      z.object({
        margin: z.optional(
          z.object({
            x: z.optional(z.number().int().gte(0)),
            y: z.optional(z.number().int().gte(0)),
          }),
        ),
        h1: z.optional(z.lazy(() => TextStyleParser)),
        h2: z.optional(z.lazy(() => TextStyleParser)),
        h3: z.optional(z.lazy(() => TextStyleParser)),
        h4: z.optional(z.lazy(() => TextStyleParser)),
        h5: z.optional(z.lazy(() => TextStyleParser)),
        h6: z.optional(z.lazy(() => TextStyleParser)),
        text: z.optional(z.lazy(() => TextStyleParser)),
        link: z.optional(z.lazy(() => TextStyleParser)),
      }),
    ),
  })

export type ConvertMarkdownWithPuppeteerNodeLocalInternalInputRecord =
  z.infer<
    typeof ConvertMarkdownWithPuppeteerNodeLocalInternalInputParser
  >

export const ConvertMarkdownWithPuppeteerNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertMarkdownWithPuppeteerNodeOutputRecord = z.infer<
  typeof ConvertMarkdownWithPuppeteerNodeOutputParser
>

export const ConvertMarkdownWithPuppeteerNodeRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => PuppeteerMarkdownInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
    viewport: z.optional(
      z.object({
        width: z.optional(z.number().int().gte(0)),
        height: z.optional(z.number().int().gte(0)),
      }),
    ),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
    style: z.optional(
      z.object({
        margin: z.optional(
          z.object({
            x: z.optional(z.number().int().gte(0)),
            y: z.optional(z.number().int().gte(0)),
          }),
        ),
        h1: z.optional(z.lazy(() => TextStyleParser)),
        h2: z.optional(z.lazy(() => TextStyleParser)),
        h3: z.optional(z.lazy(() => TextStyleParser)),
        h4: z.optional(z.lazy(() => TextStyleParser)),
        h5: z.optional(z.lazy(() => TextStyleParser)),
        h6: z.optional(z.lazy(() => TextStyleParser)),
        text: z.optional(z.lazy(() => TextStyleParser)),
        link: z.optional(z.lazy(() => TextStyleParser)),
      }),
    ),
  })

export type ConvertMarkdownWithPuppeteerNodeRemoteInputRecord = z.infer<
  typeof ConvertMarkdownWithPuppeteerNodeRemoteInputParser
>

export const ConvertTxtWithPuppeteerNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => PuppeteerTxtInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
  }),
  viewport: z.optional(
    z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
  ),
  proxy: z.optional(z.string()),
  waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  style: z.optional(
    z.object({
      margin: z.optional(
        z.object({
          x: z.optional(z.number().int().gte(0)),
          y: z.optional(z.number().int().gte(0)),
        }),
      ),
      text: z.lazy(() => TextStyleParser),
    }),
  ),
})

export type ConvertTxtWithPuppeteerNodeClientInputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerNodeClientInputParser
>

export const ConvertTxtWithPuppeteerNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => PuppeteerTxtInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
  }),
  viewport: z.optional(
    z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
  ),
  proxy: z.optional(z.string()),
  waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  style: z.optional(
    z.object({
      margin: z.optional(
        z.object({
          x: z.optional(z.number().int().gte(0)),
          y: z.optional(z.number().int().gte(0)),
        }),
      ),
      text: z.lazy(() => TextStyleParser),
    }),
  ),
})

export type ConvertTxtWithPuppeteerNodeExternalInputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerNodeExternalInputParser
>

export const ConvertTxtWithPuppeteerNodeInputParser = z.union([
  z.lazy(() => ConvertTxtWithPuppeteerNodeRemoteInputParser),
  z.lazy(() => ConvertTxtWithPuppeteerNodeLocalExternalInputParser),
  z.lazy(() => ConvertTxtWithPuppeteerNodeLocalInternalInputParser),
])

export type ConvertTxtWithPuppeteerNodeInputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerNodeInputParser
>

export const ConvertTxtWithPuppeteerNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => PuppeteerTxtInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
    viewport: z.optional(
      z.object({
        width: z.optional(z.number().int().gte(0)),
        height: z.optional(z.number().int().gte(0)),
      }),
    ),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
    style: z.optional(
      z.object({
        margin: z.optional(
          z.object({
            x: z.optional(z.number().int().gte(0)),
            y: z.optional(z.number().int().gte(0)),
          }),
        ),
        text: z.lazy(() => TextStyleParser),
      }),
    ),
  })

export type ConvertTxtWithPuppeteerNodeLocalExternalInputRecord =
  z.infer<typeof ConvertTxtWithPuppeteerNodeLocalExternalInputParser>

export const ConvertTxtWithPuppeteerNodeLocalInputParser = z.object({
  input: z.object({
    format: z.lazy(() => PuppeteerTxtInputFormatParser),
    file: z.object({
      content: z.instanceof(ArrayBuffer),
    }),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
  viewport: z.optional(
    z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
  ),
  proxy: z.optional(z.string()),
  waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  style: z.optional(
    z.object({
      margin: z.optional(
        z.object({
          x: z.optional(z.number().int().gte(0)),
          y: z.optional(z.number().int().gte(0)),
        }),
      ),
      text: z.lazy(() => TextStyleParser),
    }),
  ),
})

export type ConvertTxtWithPuppeteerNodeLocalInputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerNodeLocalInputParser
>

export const ConvertTxtWithPuppeteerNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.lazy(() => PuppeteerTxtInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PuppeteerOutputFormatParser),
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    pathScope: z.optional(z.string()),
    viewport: z.optional(
      z.object({
        width: z.optional(z.number().int().gte(0)),
        height: z.optional(z.number().int().gte(0)),
      }),
    ),
    proxy: z.optional(z.string()),
    waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
    style: z.optional(
      z.object({
        margin: z.optional(
          z.object({
            x: z.optional(z.number().int().gte(0)),
            y: z.optional(z.number().int().gte(0)),
          }),
        ),
        text: z.lazy(() => TextStyleParser),
      }),
    ),
  })

export type ConvertTxtWithPuppeteerNodeLocalInternalInputRecord =
  z.infer<typeof ConvertTxtWithPuppeteerNodeLocalInternalInputParser>

export const ConvertTxtWithPuppeteerNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertTxtWithPuppeteerNodeOutputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerNodeOutputParser
>

export const ConvertTxtWithPuppeteerNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => PuppeteerTxtInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => PuppeteerOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
  viewport: z.optional(
    z.object({
      width: z.optional(z.number().int().gte(0)),
      height: z.optional(z.number().int().gte(0)),
    }),
  ),
  proxy: z.optional(z.string()),
  waitUntil: z.optional(z.lazy(() => PuppeteerLifeCycleEventParser)),
  style: z.optional(
    z.object({
      margin: z.optional(
        z.object({
          x: z.optional(z.number().int().gte(0)),
          y: z.optional(z.number().int().gte(0)),
        }),
      ),
      text: z.lazy(() => TextStyleParser),
    }),
  ),
})

export type ConvertTxtWithPuppeteerNodeRemoteInputRecord = z.infer<
  typeof ConvertTxtWithPuppeteerNodeRemoteInputParser
>
