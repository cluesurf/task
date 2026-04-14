import { LocalPath } from '~/code/form/object/file'
import {
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerOutputFormat,
} from '~/code/form/object/puppeteer'

export type ConvertHtmlWithPuppeteerCommandInput = {
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
