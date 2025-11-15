import { Test } from 'tape'
import { convertFontWithFontForgeNode } from '~/code/call/convert/font/node'
import fs from 'fs'

export default function testConvertFontWithFontForgeNode(
  test: Test['test'],
) {
  test('convert font with fontforge', async t => {
    await convertFontWithFontForgeNode({
      input: {
        format: 'ttf',
        file: { path: '../file/base/font/etch.ttf' },
      },
      output: { format: 'otf', file: { path: 'test/hold/etch.woff' } },
    })
    t.assert(fs.existsSync('test/hold/etch.woff'))
  })
}
