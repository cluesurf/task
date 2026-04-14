import { LocalPath } from '~/code/form/object/file'
import { PuppeteerLifeCycleEvent } from '~/code/form/object/puppeteer'

export type ConvertHtmlWithPuppeteerCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
