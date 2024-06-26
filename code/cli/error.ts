import Kink, { KinkList } from '@termsurf/kink'
import { makeBaseKinkText, makeKinkText } from '@termsurf/kink-text'
import { logWithSpace } from '~/code/tool/shared/logger.js'

export function logError(kink) {
  if (kink instanceof KinkList) {
    if (kink.list.length === 1) {
      const k = kink.list[0]
      if (k) {
        Kink.saveFill(k)
        logWithSpace(makeKinkText(k))
      }
    } else {
      logWithSpace(makeKinkText(kink))
      kink.list.forEach(kink => {
        Kink.saveFill(kink)
        logWithSpace(makeKinkText(kink))
      })
    }
  } else if (kink instanceof Kink) {
    Kink.saveFill(kink)
    logWithSpace(makeKinkText(kink))
  } else if (kink instanceof Error) {
    logWithSpace(makeBaseKinkText(kink))
  } else {
    logWithSpace(kink)
  }
}
