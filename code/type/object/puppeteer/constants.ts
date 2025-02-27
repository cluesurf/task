import {
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerLifeCycleEventContent,
  PuppeteerMarkdownInputFormat,
  PuppeteerOutputFormat,
  PuppeteerTxtInputFormat,
} from '~/code/type/object/puppeteer/index'

export const PUPPETEER_INPUT_FORMAT: ReadonlyArray<PuppeteerInputFormat> =
  ['html']
export const PUPPETEER_LIFE_CYCLE_EVENT: ReadonlyArray<PuppeteerLifeCycleEvent> =
  ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']

export const PUPPETEER_LIFE_CYCLE_EVENT_CONTENT: PuppeteerLifeCycleEventContent =
  {
    load: {
      note: "Waits for the 'load' event.",
    },
    domcontentloaded: {
      note: "Waits for the 'DOMContentLoaded' event.",
    },
    networkidle0: {
      note: 'Waits till there are no more than 0 network connections for at least 500 ms.',
    },
    networkidle2: {
      note: 'Waits till there are no more than 2 network connections for at least 500 ms.',
    },
  }
export const PUPPETEER_MARKDOWN_INPUT_FORMAT: ReadonlyArray<PuppeteerMarkdownInputFormat> =
  ['md']
export const PUPPETEER_OUTPUT_FORMAT: ReadonlyArray<PuppeteerOutputFormat> =
  ['pdf', 'png']
export const PUPPETEER_TXT_INPUT_FORMAT: ReadonlyArray<PuppeteerTxtInputFormat> =
  ['txt']
