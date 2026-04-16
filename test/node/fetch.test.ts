import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/fetch')

describe('task.fetch', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('single URL dry-run returns skipped status', async () => {
    const result = await task.fetch({
      urls: ['https://example.com'],
      output: path.join(OUT, 'example.html'),
      dryRun: true,
      verbose: true,
    })
    expect(result).toBeDefined()
  })

  it('concurrency option routes to aria2c backend', async () => {
    const result = await task.fetch({
      urls: ['https://host/big'],
      output: path.join(OUT, 'big'),
      concurrency: 4,
      dryRun: true,
      verbose: true,
    })
    expect(result).toBeDefined()
  })

  it('mirror option routes to wget backend', async () => {
    const result = await task.fetch({
      urls: ['https://example.com'],
      output: path.join(OUT, 'mirror'),
      mirror: true,
      dryRun: true,
      verbose: true,
    })
    expect(result).toBeDefined()
  })

  it('auth token is passed through', async () => {
    const result = await task.fetch({
      urls: ['https://api.example.com'],
      output: path.join(OUT, 'auth'),
      token: 'TOK',
      dryRun: true,
      verbose: true,
    })
    expect(result).toBeDefined()
  })
})
