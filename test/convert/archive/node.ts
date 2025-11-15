import { Test } from 'tape'
import { convertArchiveNode } from '~/code/call/convert/archive/node'
import fs from 'fs'

export default function testConvertArchiveNode(test: Test['test']) {
  test('convert tar to zip', async t => {
    await convertArchiveNode({
      input: {
        format: 'tar',
        file: { path: '../file/base/archive/tar/test.tar' },
      },
      output: {
        format: 'zip',
        file: { path: 'test/hold/test-tar.zip' },
      },
    })
    t.assert(fs.existsSync('test/hold/test-tar.zip'))
  })
}
