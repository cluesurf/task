import { describe, it } from 'vitest'

// The Task class does not yet expose an `inspect` method.
// Console tests (test/console/inspect.sh) cover: pdf, image, audio,
// video, font, and plain-text inspection. Once `task.inspect()` is
// added to code/node.ts, these tests should be implemented.

describe('task.inspect', () => {
  it.todo('inspects pdf and returns page count')
  it.todo('inspects image and returns dimensions')
  it.todo('inspects audio and returns codec/duration')
  it.todo('inspects video and returns dimensions')
  it.todo('inspects font and returns family name')
  it.todo('inspects plain text and returns mime type and eol style')
})
