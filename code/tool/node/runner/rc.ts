/**
 * `.taskrc` escape hatch. When inference picks the wrong
 * ecosystem (or the right one but the wrong command), the user
 * drops a one-line override in `.taskrc` at the repo root.
 *
 * Format: YAML or JSON, only the seven task verbs as keys.
 * Unknown keys are ignored silently so users can leave comments
 * under `notes:` or similar without the parser complaining.
 *
 *   # .taskrc
 *   build: cargo build --release
 *   test:  cargo test --all-features
 *   run:   cargo run --bin server
 *
 * Merged *over* the inferred defaults — missing keys still fall
 * through to the registry.
 */

import fs from 'node:fs'
import path from 'node:path'
import type { TaskVerb } from './types'

const CANDIDATES = ['.taskrc', '.taskrc.yml', '.taskrc.yaml', '.taskrc.json']
const KNOWN_VERBS: TaskVerb[] = ['build', 'test', 'run', 'lint', 'format', 'install', 'clean']

export function loadRc(cwd: string): Partial<Record<TaskVerb, string>> {
  for (const name of CANDIDATES) {
    const full = path.join(cwd, name)
    if (fs.existsSync(full)) {
      const text = fs.readFileSync(full, 'utf-8')
      return name.endsWith('.json') ? parseJson(text) : parseKv(text)
    }
  }
  return {}
}

/**
 * Minimal `key: value` parser that handles the common YAML shape
 * without pulling in a YAML dep. Quotes are stripped; `#`
 * comments (to end of line) are dropped; empty lines ignored.
 * If the user needs full YAML they can save as `.taskrc.json`.
 */
function parseKv(raw: string): Partial<Record<TaskVerb, string>> {
  const out: Partial<Record<TaskVerb, string>> = {}
  for (const rawLine of raw.split('\n')) {
    const line = stripComment(rawLine).trim()
    if (!line) continue
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/)
    if (!m) continue
    const [, key, valRaw] = m
    if (!(KNOWN_VERBS as string[]).includes(key!)) continue
    const val = unquote(valRaw!.trim())
    if (val) out[key as TaskVerb] = val
  }
  return out
}

function stripComment(line: string): string {
  // Respect `#` only when it's not inside quotes. Crude but OK for
  // `.taskrc` where values are shell commands that rarely quote.
  let inside: '"' | "'" | null = null
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inside) {
      if (ch === inside) inside = null
      continue
    }
    if (ch === '"' || ch === "'") { inside = ch; continue }
    if (ch === '#') return line.slice(0, i)
  }
  return line
}

function unquote(s: string): string {
  if (s.length >= 2 && ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'")))) {
    return s.slice(1, -1)
  }
  return s
}

function parseJson(raw: string): Partial<Record<TaskVerb, string>> {
  try {
    const obj = JSON.parse(raw) as Record<string, unknown>
    const out: Partial<Record<TaskVerb, string>> = {}
    for (const v of KNOWN_VERBS) {
      if (typeof obj[v] === 'string') out[v] = obj[v] as string
    }
    return out
  } catch {
    return {}
  }
}
