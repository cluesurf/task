/**
 * Input-sanitization helpers for `task` verbs that accept data
 * from untrusted callers (HTTP surface, queued jobs, anything
 * that isn't a human at their own terminal).
 *
 * The lightweight `test<Verb>Node` predicates in each verb's
 * `shared.ts` call these to reject inputs that could shell-escape,
 * break out of a working directory, or otherwise abuse the
 * binary being spawned.
 *
 * For schema-driven verbs the generated zod parsers already
 * cover this. Use these helpers in the spawn-based verbs
 * (`fetch`, `sync`, `disassemble/*`, `remove/*`, ...) that don't
 * yet have parsers.
 */

import path from 'node:path'

/** Characters we refuse to see inside a user-supplied string
 * before handing it to `spawn`. Backticks, `$()` expansion,
 * pipes, semicolons, newlines: all the shell-injection classics.
 * Arg vectors passed to `spawn` without a shell don't actually
 * evaluate these, but some of the tools we wrap (like `ffmpeg`
 * filtergraphs) do their own parsing and can be tricked — so
 * blocking at the input layer is defense in depth. */
const SHELL_UNSAFE = /[`$|;&\n\r\x00]/

/** Reasonable outer bound on a single string value. Real paths,
 * URLs, and flag values don't need more; longer inputs are almost
 * always an attempt to exhaust the process via argv. */
const MAX_STRING_LEN = 4096

export type SanitizeError = {
  ok: false
  reason: string
}
export type SanitizeOk<T> = {
  ok: true
  value: T
}
export type SanitizeResult<T> = SanitizeOk<T> | SanitizeError

export function sanitizeString(
  value: unknown,
  opts?: { allowEmpty?: boolean; field?: string },
): SanitizeResult<string> {
  const field = opts?.field ?? 'string'
  if (typeof value !== 'string') {
    return { ok: false, reason: `${field}: not a string` }
  }
  if (!opts?.allowEmpty && value.length === 0) {
    return { ok: false, reason: `${field}: empty` }
  }
  if (value.length > MAX_STRING_LEN) {
    return {
      ok: false,
      reason: `${field}: too long (${value.length} > ${MAX_STRING_LEN})`,
    }
  }
  if (SHELL_UNSAFE.test(value)) {
    return {
      ok: false,
      reason: `${field}: contains shell-unsafe characters`,
    }
  }
  return { ok: true, value }
}

/**
 * Local filesystem path. Rejects NUL bytes, shell metacharacters,
 * and (when `cwd` is supplied) any path that escapes the working
 * directory via `..` or symlink-style prefixes.
 */

export function sanitizePath(
  value: unknown,
  opts?: { cwd?: string; field?: string; allowAbsolute?: boolean },
): SanitizeResult<string> {
  const base = sanitizeString(value, { field: opts?.field ?? 'path' })
  if (!base.ok) return base
  const raw = base.value

  if (raw.includes('\x00')) {
    return { ok: false, reason: `${opts?.field ?? 'path'}: NUL byte` }
  }

  const absolute = path.isAbsolute(raw)
  if (absolute && opts?.allowAbsolute === false) {
    return {
      ok: false,
      reason: `${opts?.field ?? 'path'}: absolute paths not allowed`,
    }
  }

  if (opts?.cwd) {
    const resolved = path.resolve(opts.cwd, raw)
    const boundary = path.resolve(opts.cwd) + path.sep
    if (
      resolved !== path.resolve(opts.cwd) &&
      !resolved.startsWith(boundary)
    ) {
      return {
        ok: false,
        reason: `${opts?.field ?? 'path'}: escapes cwd`,
      }
    }
  }

  return { ok: true, value: raw }
}

/**
 * URL for a fetch-style verb. Accepts only the listed schemes.
 * Defaults to `http` / `https` / `ftp` — enough for the common
 * case, nothing that would let `file://` or `javascript:` slip
 * into a web-download flow.
 */

export function sanitizeUrl(
  value: unknown,
  opts?: { schemes?: string[]; field?: string },
): SanitizeResult<string> {
  const base = sanitizeString(value, { field: opts?.field ?? 'url' })
  if (!base.ok) return base
  const allowed = opts?.schemes ?? ['http', 'https', 'ftp']
  try {
    const parsed = new URL(base.value)
    const scheme = parsed.protocol.replace(/:$/, '')
    if (!allowed.includes(scheme)) {
      return {
        ok: false,
        reason: `${opts?.field ?? 'url'}: scheme "${scheme}" not in [${allowed.join(',')}]`,
      }
    }
    return { ok: true, value: base.value }
  } catch {
    return {
      ok: false,
      reason: `${opts?.field ?? 'url'}: not a valid URL`,
    }
  }
}

/** Integer in [lo, hi]. Rejects NaN / floats / non-numbers. */

export function sanitizeInt(
  value: unknown,
  opts: { lo: number; hi: number; field?: string },
): SanitizeResult<number> {
  const field = opts.field ?? 'integer'
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return { ok: false, reason: `${field}: not a finite number` }
  }
  if (!Number.isInteger(value)) {
    return { ok: false, reason: `${field}: not an integer` }
  }
  if (value < opts.lo || value > opts.hi) {
    return {
      ok: false,
      reason: `${field}: out of range [${opts.lo}, ${opts.hi}]`,
    }
  }
  return { ok: true, value }
}

/** Bool, strictly. Accepts only `true` / `false`. */

export function sanitizeBool(
  value: unknown,
  opts?: { field?: string },
): SanitizeResult<boolean> {
  if (typeof value !== 'boolean') {
    return {
      ok: false,
      reason: `${opts?.field ?? 'bool'}: not a boolean`,
    }
  }
  return { ok: true, value }
}

export function sanitizeStringArray(
  value: unknown,
  opts?: { field?: string; maxItems?: number },
): SanitizeResult<string[]> {
  const field = opts?.field ?? 'array'
  if (!Array.isArray(value)) {
    return { ok: false, reason: `${field}: not an array` }
  }
  const max = opts?.maxItems ?? 1024
  if (value.length > max) {
    return {
      ok: false,
      reason: `${field}: too many items (${value.length} > ${max})`,
    }
  }
  const out: string[] = []
  for (let i = 0; i < value.length; i++) {
    const r = sanitizeString(value[i], { field: `${field}[${i}]` })
    if (!r.ok) return r
    out.push(r.value)
  }
  return { ok: true, value: out }
}

/** Throw a sanitized error when `result.ok` is `false`. Use from
 * verb entrypoints where the caller expects a hard failure rather
 * than a result tuple. */

export function unwrap<T>(
  result: SanitizeResult<T>,
  verb: string,
): T {
  if (!result.ok) throw new Error(`${verb}: ${result.reason}`)
  return result.value
}

/**
 * Common shape for single-file verbs: an input path, an optional
 * output path, and a bag of boolean / string / string-array
 * flags. Used by the `remove/*`, `disassemble/*`, and similar
 * lightweight verbs so each one doesn't re-implement a parser.
 *
 *   const input = parseSingleFileInput(source, 'remove password', {
 *     booleans: ['overwrite'],
 *     strings:  ['password'],
 *     arrays:   ['tag'],
 *   })
 */

export type SingleFileInput<
  B extends string = never,
  S extends string = never,
  A extends string = never,
> = {
  input: string
  output?: string
} & { [K in B]?: boolean } & { [K in S]?: string } & {
  [K in A]?: string[]
}

export type SingleFileSchema<
  B extends string,
  S extends string,
  A extends string,
> = {
  booleans?: readonly B[]
  strings?: readonly S[]
  arrays?: readonly A[]
}

export function parseSingleFileInput<
  B extends string,
  S extends string,
  A extends string,
>(
  source: unknown,
  verb: string,
  schema: SingleFileSchema<B, S, A>,
): SingleFileInput<B, S, A> {
  return unwrap(parseSingleFileInputLoose(source, schema), verb)
}

function parseSingleFileInputLoose<
  B extends string,
  S extends string,
  A extends string,
>(
  source: unknown,
  schema: SingleFileSchema<B, S, A>,
): SanitizeResult<SingleFileInput<B, S, A>> {
  if (source == null || typeof source !== 'object') {
    return { ok: false, reason: 'input: not an object' }
  }
  const raw = source as Record<string, unknown>

  const inPath = sanitizePath(raw.input, { field: 'input' })
  if (!inPath.ok) return inPath

  const out: Record<string, unknown> = { input: inPath.value }

  if (raw.output !== undefined) {
    const r = sanitizePath(raw.output, { field: 'output' })
    if (!r.ok) return r
    out.output = r.value
  }

  for (const field of schema.booleans ?? []) {
    if (raw[field] === undefined) continue
    const r = sanitizeBool(raw[field], { field })
    if (!r.ok) return r
    out[field] = r.value
  }
  for (const field of schema.strings ?? []) {
    if (raw[field] === undefined) continue
    const r = sanitizeString(raw[field], { field })
    if (!r.ok) return r
    out[field] = r.value
  }
  for (const field of schema.arrays ?? []) {
    if (raw[field] === undefined) continue
    const r = sanitizeStringArray(raw[field], { field })
    if (!r.ok) return r
    out[field] = r.value
  }

  return {
    ok: true,
    value: out as unknown as SingleFileInput<B, S, A>,
  }
}
