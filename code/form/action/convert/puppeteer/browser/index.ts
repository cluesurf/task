import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'
import {
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerMarkdownInputFormat,
  PuppeteerOutputFormat,
  PuppeteerTxtInputFormat,
} from '~/code/form/object/puppeteer'

export type ConvertHtmlWithPuppeteerBrowserInput =
  | ConvertHtmlWithPuppeteerBrowserRemoteInput
  | ConvertHtmlWithPuppeteerBrowserLocalInput
export type ConvertHtmlWithPuppeteerBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PuppeteerInputFormat
    file: {
      content: FileContent
    }
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
export type ConvertHtmlWithPuppeteerBrowserOutput = {
  file: FileContent
}
export type ConvertHtmlWithPuppeteerBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerInputFormat
    file: FileContentWithSha256
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
export type ConvertMarkdownWithPuppeteerBrowserInput =
  | ConvertMarkdownWithPuppeteerBrowserRemoteInput
  | ConvertMarkdownWithPuppeteerBrowserLocalInput
export type ConvertMarkdownWithPuppeteerBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PuppeteerOutputFormat
  }
}
export type ConvertMarkdownWithPuppeteerBrowserOutput = {
  file: FileContent
}
export type ConvertMarkdownWithPuppeteerBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerMarkdownInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
}
export type ConvertTxtWithPuppeteerBrowserInput =
  | ConvertTxtWithPuppeteerBrowserRemoteInput
  | ConvertTxtWithPuppeteerBrowserLocalInput
export type ConvertTxtWithPuppeteerBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PuppeteerTxtInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PuppeteerOutputFormat
  }
}
export type ConvertTxtWithPuppeteerBrowserOutput = {
  file: FileContent
}
export type ConvertTxtWithPuppeteerBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PuppeteerTxtInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PuppeteerOutputFormat
  }
}
