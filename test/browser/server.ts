/**
 * Hack-it-together fastify host that implements the REST
 * surface every browser handler expects:
 *
 *   POST /v2/<verb>!/<...segments>
 *     Multipart upload of any nested fields the browser
 *     handler serialized (e.g. `input[file][content]`,
 *     `input[file][sha256]`, `output[format]`). Path
 *     segments come from the per-verb URL convention
 *     (`/convert!/png/jpg`, `/compile!/c`, `/format!/python`,
 *     ...) and are merged back into the reconstructed
 *     input under conventional locations.
 *
 *   GET  /v2/work/:id
 *     Returns the cached Work envelope. Browser handlers
 *     poll this until `status === 'complete'`, then `fetch`
 *     `output.file.path`.
 *
 *   GET  /v2/files/:id
 *     Streams the produced file back.
 *
 * Verbs end in `!` to mark them as actions (vs the
 * noun-shaped `/work/:id`, `/files/:id` reads).
 *
 * The dispatcher is fully generic — adding a new browser
 * verb does NOT require a new route here. The verb name
 * from the URL maps onto `task[verb]`; the multipart
 * fields rebuild the input object; an output `file.path`
 * field, if returned, becomes a fetchable `/v2/files/:id`.
 *
 * Run standalone:    pnpm tsx test/browser/server.ts
 * Run from playwright: configured as `webServer` in
 *                     `test/browser/playwright.config.ts`
 */

import Fastify, { FastifyInstance, FastifyRequest } from 'fastify'
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
  output?: unknown
}

const WORK = new Map<string, Work>()
const FILE = new Map<string, string>()

const WORK_DIR = path.join(os.tmpdir(), `task-browser-test-${process.pid}`)
const ROOT = path.resolve(__dirname, '..', '..')
const DIST = path.resolve(ROOT, 'host')
const PAGE = path.join(__dirname, 'page.html')

/** Each verb says how to merge URL segments into the reconstructed input and what output extension to use. */
type VerbHook = {
  /** Inject URL segments into the input object before dispatching. */
  prepare?: (input: Record<string, unknown>, segments: string[]) => void
  /** Default extension for the produced output file (used when caller didn't specify). */
  outputExt?: (input: Record<string, unknown>, segments: string[]) => string
  /** Method on Task to call. Defaults to the verb name. */
  method?: string
}

const VERB_HOOKS: Record<string, VerbHook> = {
  convert: {
    prepare: (input, [inFmt, outFmt]) => {
      ensureObject(input, 'input').format = inFmt
      ensureObject(input, 'output').format = outFmt
    },
    outputExt: (_i, [, outFmt]) => outFmt ?? 'bin',
  },
  compile: {
    prepare: (input, [language]) => {
      ensureObject(input, 'input').format = language
    },
    outputExt: (_i, [language]) => language ?? 'bin',
  },
  format: {
    prepare: (input, [language]) => {
      ;(input as { format?: string }).format = language
    },
    outputExt: (_i, [language]) => language ?? 'txt',
  },
  sanitize: {
    prepare: (input, [language]) => {
      ;(input as { format?: string }).format = language
    },
    outputExt: () => 'html',
  },
}

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

  app.post('/v2/:verb/*', dispatchVerb)
  app.post('/v2/:verb', dispatchVerb)

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

async function dispatchVerb(
  req: FastifyRequest<{ Params: { verb: string; '*'?: string } }>,
  reply: { code: (n: number) => { send: (b: unknown) => void }; send: (b: unknown) => void },
) {
  const verbWithBang = req.params.verb
  if (!verbWithBang.endsWith('!')) {
    return reply.code(404).send({ error: 'verbs must end in !' })
  }
  const verb = verbWithBang.slice(0, -1)
  const segments = (req.params['*'] ?? '').split('/').filter(Boolean)
  const hook = VERB_HOOKS[verb] ?? {}
  const method = hook.method ?? verb

  const { fields, filePath } = await drainMultipart(req)
  const input: Record<string, unknown> = { ...fields }
  hook.prepare?.(input, segments)

  if (filePath) {
    ensureObject(ensureObject(input, 'input'), 'file').path = filePath
  }

  const ext = hook.outputExt?.(input, segments) ?? 'bin'
  const outPath = path.join(WORK_DIR, `${randomUUID()}.${ext}`)
  ensureObject(ensureObject(input, 'output'), 'file').path = outPath

  const task = new Task() as unknown as Record<string, (i: unknown) => Promise<unknown>>
  if (typeof task[method] !== 'function') {
    return reply.code(400).send({ error: `unknown verb ${verb}` })
  }

  let result: unknown
  try {
    result = await task[method]!(input)
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
  const producedPath =
    pickPath(result) ?? (await exists(outPath) ? outPath : undefined)

  const output = producedPath
    ? { file: { path: `/v2/files/${id}` } }
    : (result as object | undefined) ?? {}

  if (producedPath) FILE.set(id, producedPath)
  const work: Work = { id, status: 'complete', output }
  WORK.set(id, work)
  reply.send(work)
}

async function drainMultipart(req: FastifyRequest): Promise<{
  fields: Record<string, unknown>
  filePath?: string
}> {
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

  // The browser's `input[file][content]` becomes the uploaded file —
  // strip the placeholder so the file path field doesn't get clobbered.
  if (filePath) {
    const inp = fields.input as Record<string, unknown> | undefined
    if (inp && typeof inp === 'object' && 'file' in inp) {
      const file = inp.file as Record<string, unknown> | undefined
      if (file && typeof file === 'object') delete file.content
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
  const segments = key.replace(/\]/g, '').split('[').filter(Boolean)
  let cur: Record<string, unknown> = target
  for (let i = 0; i < segments.length - 1; i++) {
    const k = segments[i]!
    if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {}
    cur = cur[k] as Record<string, unknown>
  }
  cur[segments[segments.length - 1]!] = value
}

function ensureObject(
  target: Record<string, unknown>,
  key: string,
): Record<string, unknown> {
  const cur = target[key]
  if (cur && typeof cur === 'object') return cur as Record<string, unknown>
  const next: Record<string, unknown> = {}
  target[key] = next
  return next
}

function pickPath(result: unknown): string | undefined {
  if (!result || typeof result !== 'object') return undefined
  const r = result as { file?: { path?: unknown }; output?: { file?: { path?: unknown } } }
  const p = r.file?.path ?? r.output?.file?.path
  return typeof p === 'string' ? p : undefined
}

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
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
