import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/sync')
const SRC = path.join(OUT, 'src')
const DST = path.join(OUT, 'dst')

describe('task.sync', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.rm(OUT, { recursive: true, force: true })
    await fs.mkdir(SRC, { recursive: true })
    await fs.writeFile(path.join(SRC, 'a.txt'), 'hi\n')
    await fs.writeFile(path.join(SRC, 'b.txt'), 'bye\n')
  })

  it('local rsync mirror copies files', async () => {
    await task.sync({
      source: `${SRC}/`,
      destination: `${DST}/`,
    })
    const a = await fs.readFile(path.join(DST, 'a.txt'), 'utf8')
    const b = await fs.readFile(path.join(DST, 'b.txt'), 'utf8')
    expect(a).toBe('hi\n')
    expect(b).toBe('bye\n')
  })

  it('delete mode prunes removed files', async () => {
    await fs.rm(path.join(SRC, 'b.txt'))
    await task.sync({
      source: `${SRC}/`,
      destination: `${DST}/`,
      delete: true,
    })
    const exists = await fs
      .stat(path.join(DST, 'b.txt'))
      .then(() => true)
      .catch(() => false)
    expect(exists).toBe(false)
  })

  it('dry-run does not throw', async () => {
    await expect(
      task.sync({
        source: `${SRC}/`,
        destination: `${DST}/`,
        dryRun: true,
      }),
    ).resolves.toBeDefined()
  })
})
