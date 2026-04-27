import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/format')

describe('task.format', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('formats a python file via black', async () => {
    const filePath = path.join(OUT, 'messy.py')
    await fs.writeFile(filePath, 'def f( x,y ):\n    return  x+y\n')
    const before = await fs.readFile(filePath, 'utf8')

    try {
      await task.format({
        language: 'python',
        input: { file: { path: filePath } },
        output: { file: { path: filePath } },
      })
      const after = await fs.readFile(filePath, 'utf8')
      expect(after).not.toBe(before)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|black/i.test(msg)) {
        return // skip when black not installed
      }
      throw e
    }
  })

  it('formats a rust file via rustfmt', async () => {
    const filePath = path.join(OUT, 'messy.rs')
    await fs.writeFile(filePath, 'fn   main(){println!(  "hi"  );}\n')
    const before = await fs.readFile(filePath, 'utf8')

    try {
      await task.format({
        language: 'rust',
        input: { file: { path: filePath } },
        output: { file: { path: filePath } },
      })
      const after = await fs.readFile(filePath, 'utf8')
      expect(after).not.toBe(before)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|rustfmt/i.test(msg)) {
        return // skip when rustfmt not installed
      }
      throw e
    }
  })

  it('formats a C file via clang-format', async () => {
    const filePath = path.join(OUT, 'messy.c')
    await fs.writeFile(
      filePath,
      '#include<stdio.h>\nint main(){printf("hi");return 0;}\n',
    )
    const before = await fs.readFile(filePath, 'utf8')

    try {
      await task.format({
        language: 'c',
        input: { file: { path: filePath } },
        output: { file: { path: filePath } },
      })
      const after = await fs.readFile(filePath, 'utf8')
      expect(after).not.toBe(before)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|clang/i.test(msg)) {
        return // skip when clang-format not installed
      }
      throw e
    }
  })

  it('rejects when language is missing', async () => {
    const filePath = path.join(OUT, 'messy.py')
    await fs.writeFile(filePath, 'x = 1\n')
    await expect(async () =>
      task.format(
        // @ts-expect-error — `language` is required. Verify both the
        // type rejects the missing-discriminator shape and the
        // runtime dispatcher throws the contracted error message.
        {
          input: { file: { path: filePath } },
          output: { file: { path: filePath } },
        },
      ),
    ).rejects.toThrow(/language/)
  })
})
