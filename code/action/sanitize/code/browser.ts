import { SanitizeHtmlBrowserInput } from '~/code/type/browser'
import { sanitizeHtmlBrowser } from './html/browser'
import { testSanitize } from './shared'

export type SanitizeOutput = {
  file: {
    content: Blob
  }
}

export async function sanitize(
  source: SanitizeHtmlBrowserInput,
): Promise<SanitizeOutput>
export async function sanitize(source) {
  if (testSanitize(source)) {
    const input = source as any
    switch (source.input.format) {
      case 'html':
        return await sanitizeHtmlBrowser(input)
    }
  }
}
