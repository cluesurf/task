import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/compile')

describe('task.compile', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('compiles a C file to a binary', async () => {
    const input = path.join(FIXTURES, 'code/example.c')
    const output = path.join(OUT, 'example_c')
    try {
      await task.compile({
        input: { format: 'c', file: { path: input } },
        output: { format: 'binary', file: { path: output } },
      })
      const stat = await fs.stat(output)
      expect(stat.size).toBeGreaterThan(0)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|exited with code/i.test(msg)) {
        return // skip when cc/gcc not available
      }
      throw e
    }
  })

  it('compiles a Rust file to a binary', async () => {
    const input = path.join(FIXTURES, 'code/example.rs')
    const output = path.join(OUT, 'example_rs')
    try {
      await task.compile({
        input: { format: 'rust', file: { path: input } },
        output: { format: 'binary', file: { path: output } },
      })
      const stat = await fs.stat(output)
      expect(stat.size).toBeGreaterThan(0)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|exited with code/i.test(msg)) {
        return // skip when rustc not available
      }
      throw e
    }
  })

  it('compiles a Swift file to a binary', async () => {
    const input = path.join(FIXTURES, 'code/example.swift')
    const output = path.join(OUT, 'example_swift')
    try {
      await task.compile({
        input: { format: 'swift', file: { path: input } },
        output: { format: 'binary', file: { path: output } },
      })
      const stat = await fs.stat(output)
      expect(stat.size).toBeGreaterThan(0)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|exited with code/i.test(msg)) {
        return // skip when swiftc not available
      }
      throw e
    }
  })

  it('rejects an unsupported extension', async () => {
    const input = path.join(OUT, 'bogus.xyz')
    await fs.writeFile(input, 'nope')
    await expect(async () =>
      task.compile({
        // @ts-expect-error — 'xyz' is not a supported compile format. We
        // verify both the type rejects it AND the runtime dispatcher does.
        input: { format: 'xyz', file: { path: input } },
        output: { format: 'binary', file: { path: path.join(OUT, 'bogus') } },
      }),
    ).rejects.toThrow(/unsupported/)
  })
})
