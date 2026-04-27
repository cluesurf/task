/**
 * Hack-it-together fastify host that implements the REST
 * surface the browser handlers expect:
 *
 *   POST /v2/<verb>!/<inputFormat>/<outputFormat>
 *     Multipart upload of `input[file][content]` (and any
 *     other form fields the browser handler serialized).
 *     Runs the matching Node implementation, stores the
 *     result in a tmp dir, and returns a Work envelope.
 *     Verbs end in `!` to mark them as actions (vs the
 *     noun-shaped `/work/:id`, `/files/:id` reads).
 *
 *   GET  /v2/work/:id
 *     Returns the cached Work envelope. Browser handlers
 *     poll this until `status === 'complete'`, then `fetch`
 *     `output.file.path`.
 *
 *   GET  /v2/files/:id
 *     Streams the converted file back.
 *
 * This is the canonical reference for any host that wants
 * to back `task.surf`-style requests. Production deployments
 * implement the same three endpoints; the tests just point
 * the browser `Task` at this fastify instance instead.
 *
 * Run standalone:    pnpm tsx test/browser/server.ts
 * Run from playwright: configured as `webServer` in
 *                     `test/browser/playwright.config.ts`
 */

import Fastify, { FastifyInstance } from 'fastify'
import multipart, { MultipartFile } from '@fastify/multipart'
import cors from '@fastify/cors'
import staticPlugin from '@fastify/static'
import path from 'node:path'
import fs from 'node:fs/promises'
import os from 'node:os'
import { randomUUID } from 'node:crypto'
import Task from '~/code/node'

type Work = {
  id: string
  status: 'queued' | 'complete' | 'error'
  output?: {
    file?: { path: string }
    code?: number
    note?: string
  }
}

const WORK = new Map<string, Work>()
const FILE = new Map<string, string>()

const WORK_DIR = path.join(os.tmpdir(), `task-browser-test-${process.pid}`)
const ROOT = path.resolve(__dirname, '..', '..')
const DIST = path.resolve(ROOT, 'host')
const PAGE = path.join(__dirname, 'page.html')

export async function buildServer(): Promise<FastifyInstance> {
  await fs.mkdir(WORK_DIR, { recursive: true })

  const app = Fastify({ logger: false })

  await app.register(cors, { origin: true })
  await app.register(multipart, {
    limits: { fileSize: 200 * 1024 * 1024 },
  })
  await app.register(staticPlugin, {
    root: DIST,
    prefix: '/host/',
    decorateReply: false,
  })

  app.get('/', async (_req, reply) => {
    const html = await fs.readFile(PAGE, 'utf8')
    reply.type('text/html').send(html)
  })

  app.post('/v2/convert!/:in/:out', async (req, reply) => {
    const { in: inputFormat, out: outputFormat } = req.params as {
      in: string
      out: string
    }

    const { fields, filePath } = await drainMultipart(req)
    if (!filePath) {
      return reply.code(400).send({ error: 'missing file' })
    }

    const outPath = path.join(
      WORK_DIR,
      `${randomUUID()}.${outputFormat}`,
    )

    const task = new Task()
    try {
      await task.convert({
        ...stripFileFields(fields),
        input: { format: inputFormat as never, file: { path: filePath } },
        output: {
          format: outputFormat as never,
          file: { path: outPath },
        },
      } as never)
    } catch (err) {
      const id = randomUUID()
      const work: Work = {
        id,
        status: 'error',
        output: {
          code: 500,
          note: err instanceof Error ? err.message : String(err),
        },
      }
      WORK.set(id, work)
      return reply.send(work)
    }

    const id = randomUUID()
    FILE.set(id, outPath)
    const work: Work = {
      id,
      status: 'complete',
      output: { file: { path: `/v2/files/${id}` } },
    }
    WORK.set(id, work)
    reply.send(work)
  })

  app.get('/v2/work/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const work = WORK.get(id)
    if (!work) return reply.code(404).send({ error: 'unknown work id' })
    reply.send(work)
  })

  app.get('/v2/files/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const fp = FILE.get(id)
    if (!fp) return reply.code(404).send({ error: 'unknown file id' })
    const buf = await fs.readFile(fp)
    reply
      .header('content-type', 'application/octet-stream')
      .header('content-length', String(buf.byteLength))
      .send(buf)
  })

  return app
}

async function drainMultipart(req: {
  parts: () => AsyncIterableIterator<MultipartFile | { type: 'field'; fieldname: string; value: string }>
}): Promise<{ fields: Record<string, unknown>; filePath?: string }> {
  const fields: Record<string, unknown> = {}
  let filePath: string | undefined

  for await (const part of req.parts()) {
    if ((part as MultipartFile).file) {
      const file = part as MultipartFile
      const dest = path.join(
        WORK_DIR,
        `${randomUUID()}-${path.basename(file.filename ?? 'upload')}`,
      )
      const out = (await import('node:fs')).createWriteStream(dest)
      await new Promise<void>((res, rej) => {
        file.file.pipe(out)
        file.file.on('end', () => res())
        file.file.on('error', rej)
        out.on('error', rej)
      })
      filePath = dest
    } else {
      const f = part as { fieldname: string; value: string }
      assignNested(fields, f.fieldname, f.value)
    }
  }

  return { fields, filePath }
}

/** object-to-formdata uses bracket notation: `input[file][sha256]`. Reconstruct the nested object. */
function assignNested(
  target: Record<string, unknown>,
  key: string,
  value: string,
) {
  const path = key
    .replace(/\]/g, '')
    .split('[')
    .filter(Boolean)
  let cur: Record<string, unknown> = target
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i]!
    if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {}
    cur = cur[k] as Record<string, unknown>
  }
  cur[path[path.length - 1]!] = value
}

/** The browser sends the file content under `input[file][content]`; the Node side wants `input.file.path`. */
function stripFileFields(fields: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...fields }
  if (out.input && typeof out.input === 'object') {
    const input = { ...(out.input as Record<string, unknown>) }
    delete input.file
    out.input = input
  }
  if (out.output && typeof out.output === 'object') {
    const output = { ...(out.output as Record<string, unknown>) }
    delete output.file
    out.output = output
  }
  return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 4010)
  buildServer()
    .then(app => app.listen({ port, host: '127.0.0.1' }))
    .then(addr => {
      // eslint-disable-next-line no-console
      console.log(`task test server listening on ${addr}`)
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
      process.exit(1)
    })
}
