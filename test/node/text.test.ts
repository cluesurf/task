import { describe, it } from 'vitest'

// The Task class does not yet expose `inspect` (for eol detection)
// or `set` (for eol conversion) methods. Console tests
// (test/console/text.sh) cover:
//   - inspect lf: detect line ending style
//   - set eol crlf -> lf: convert CRLF to LF
//   - set eol lf -> crlf: convert LF to CRLF
// Once these methods are added to code/node.ts, implement the tests.

describe('task.text', () => {
  it.todo('detects LF line endings')
  it.todo('converts CRLF to LF')
  it.todo('converts LF to CRLF')
})
