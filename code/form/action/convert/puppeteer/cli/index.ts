import {
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerOutputFormat,
} from '~/code/form/object/puppeteer/index'
import { LocalPath } from '~/code/form/object/file/index'

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
