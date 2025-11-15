export type PuppeteerInputFormat = 'html'

export type PuppeteerLifeCycleEvent =
  | 'load'
  | 'domcontentloaded'
  | 'networkidle0'
  | 'networkidle2'
export type PuppeteerLifeCycleEventContentValue =
  PuppeteerLifeCycleEventData

export type PuppeteerLifeCycleEventContent = Record<
  PuppeteerLifeCycleEvent,
  PuppeteerLifeCycleEventContentValue
>
export type PuppeteerLifeCycleEventData = {
  note: string
}

export type PuppeteerMarkdownInputFormat = 'md'

export type PuppeteerOutputFormat = 'pdf' | 'png'

export type PuppeteerTxtInputFormat = 'txt'
