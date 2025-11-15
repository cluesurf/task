import { Test } from 'tape'
import { convertArchiveBrowser } from '~/code/call/convert/archive/browser'
import { TEST_TAR } from './browser.data'

export default function testConvertArchiveBrowser(test: Test['test']) {
  test('convert tar to zip', async t => {
    const out = await convertArchiveBrowser({
      handle: 'remote',
      input: {
        format: 'tar',
        file: {
          sha256:
            'bc8e1271a9ee88fdd09df396763df031e15f7af7906074a0dc83d908085f7fed',
          content: TEST_TAR,
        },
      },
      output: {
        format: 'zip',
      },
    })
    t.assert(out.file.content instanceof Blob)
  })
}
