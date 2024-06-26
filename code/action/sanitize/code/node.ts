import { SanitizeHtmlNodeInput } from '~/code/type/node'
import { sanitizeHtmlNode } from './html/node'
import { testSanitize } from './shared'

export type SanitizeOutput = {
  file: {
    path: string
  }
}

export async function sanitize(
  source: SanitizeHtmlNodeInput,
): Promise<SanitizeOutput>
export async function sanitize(source) {
  if (testSanitize(source)) {
    const input = source as any
    switch (source.input.format) {
      case 'html':
        return await sanitizeHtmlNode(input)
    }
  }
}
