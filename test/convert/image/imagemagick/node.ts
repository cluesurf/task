import { Test } from 'tape'
import { convertImageWithImageMagickNode } from '~/code/call/convert/image/imagemagick/node'
import fs from 'fs'

export default function testConvertImageWithImageMagickNode(
  test: Test['test'],
) {
  test('convert cr2 to jpg', async t => {
    await convertImageWithImageMagickNode({
      input: {
        format: 'cr2',
        file: {
          path: '../file/base/image/trees.cr2',
        },
      },
      output: { format: 'jpg', file: { path: 'test/hold/trees.jpg' } },
    })
    t.assert(fs.existsSync('test/hold/trees.jpg'))
  })
}
