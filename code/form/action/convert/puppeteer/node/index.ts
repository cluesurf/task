import {
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerMarkdownInputFormat,
  PuppeteerOutputFormat,
  PuppeteerTxtInputFormat,
} from '~/code/form/object/puppeteer/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file/index'
import { TextStyle } from '~/code/form/action/convert/index'

export type ConvertHtmlWithPuppeteerNodeClientInput = {
  handle: 'client'
  input: {
    format: PuppeteerInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeInput =
  | ConvertHtmlWithPuppeteerNodeRemoteInput
  | ConvertHtmlWithPuppeteerNodeLocalExternalInput
  | ConvertHtmlWithPuppeteerNodeLocalInternalInput
export type ConvertHtmlWithPuppeteerNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeLocalInput = {
  input: {
    format: PuppeteerInputFormat
    file: LocalPath
  }
  output: {
    format: PuppeteerOutputFormat
    file: LocalPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PuppeteerInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertHtmlWithPuppeteerNodeOutput = {
  file: FilePath
}
export type ConvertHtmlWithPuppeteerNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertMarkdownWithPuppeteerNodeClientInput = {
  handle: 'client'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeInput =
  | ConvertMarkdownWithPuppeteerNodeRemoteInput
  | ConvertMarkdownWithPuppeteerNodeLocalExternalInput
  | ConvertMarkdownWithPuppeteerNodeLocalInternalInput
export type ConvertMarkdownWithPuppeteerNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeLocalInput = {
  input: {
    format: PuppeteerMarkdownInputFormat
    file: {
      content: ArrayBuffer
    }
  }
  output: {
    format: PuppeteerOutputFormat
    file: LocalPath
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertMarkdownWithPuppeteerNodeOutput = {
  file: FilePath
}
export type ConvertMarkdownWithPuppeteerNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    h1?: TextStyle
    h2?: TextStyle
    h3?: TextStyle
    h4?: TextStyle
    h5?: TextStyle
    h6?: TextStyle
    text?: TextStyle
    link?: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeClientInput = {
  handle: 'client'
  input: {
    format: PuppeteerTxtInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerTxtInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeInput =
  | ConvertTxtWithPuppeteerNodeRemoteInput
  | ConvertTxtWithPuppeteerNodeLocalExternalInput
  | ConvertTxtWithPuppeteerNodeLocalInternalInput
export type ConvertTxtWithPuppeteerNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PuppeteerTxtInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeLocalInput = {
  input: {
    format: PuppeteerTxtInputFormat
    file: {
      content: ArrayBuffer
    }
  }
  output: {
    format: PuppeteerOutputFormat
    file: LocalPath
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PuppeteerTxtInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text: TextStyle
  }
}
export type ConvertTxtWithPuppeteerNodeOutput = {
  file: FilePath
}
export type ConvertTxtWithPuppeteerNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerTxtInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
  style?: {
    margin?: {
      x?: number
      y?: number
    }
    text: TextStyle
  }
}
