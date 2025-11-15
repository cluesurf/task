import { Test } from 'tape'
import { convertFontWithFontForgeBrowser } from '~/code/call/convert/font/browser'
import { TTF_FONT } from './browser.data'

export default function testConvertFontWithFontForgeBrowser(
  test: Test['test'],
) {
  test('convert font with fontforge', async t => {
    const out = await convertFontWithFontForgeBrowser({
      handle: 'remote',
      input: {
        format: 'ttf',
        file: {
          sha256:
            '5a1805f995373201b26215615b9b7603d201ec2bfe96d901ab66eec059688475',
          content: TTF_FONT,
        },
      },
      output: { format: 'otf' },
    })
    t.assert(out.file.content instanceof Blob)
  })
}
