/**
 * Post-tsc bundle hygiene. Run via `pnpm tsx make/sync.ts` from
 * the `make` script after tsc + tsc-alias finish:
 *
 *   1. Copy the source `package.json` into `host/`, overriding
 *      `type` to `commonjs` so Node interprets the compiled
 *      bundle correctly (CJS imports tolerate directory paths
 *      and bare-specifier sub-paths that ESM-strict mode rejects).
 *   2. Mirror runtime data files (`*.json`) from `code/` into
 *      `host/code/`. tsc never copies non-`.ts` resources, so
 *      anything the runtime loads from disk (the help-screen
 *      example sampler, format catalogs, schema fixtures, etc.)
 *      vanishes from the published artifact without this step.
 */

import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(__dirname, '..')

// 1. host/package.json

{
  const src = path.join(root, 'package.json')
  const dst = path.join(root, 'host', 'package.json')
  const pkg = JSON.parse(fs.readFileSync(src, 'utf8')) as Record<string, unknown>
  pkg.type = 'commonjs'
  fs.mkdirSync(path.dirname(dst), { recursive: true })
  fs.writeFileSync(dst, JSON.stringify(pkg, null, 2) + '\n')
}

// 2. mirror code/**/*.json → host/code/**/*.json

const codeRoot = path.join(root, 'code')
const hostCode = path.join(root, 'host', 'code')
let copied = 0

walk(codeRoot, src => {
  if (!src.endsWith('.json')) return
  const rel = path.relative(codeRoot, src)
  const dst = path.join(hostCode, rel)
  fs.mkdirSync(path.dirname(dst), { recursive: true })
  fs.copyFileSync(src, dst)
  copied++
})

console.log(`sync: mirrored ${copied} JSON files into host/code/`)

function walk(dir: string, onFile: (abs: string) => void): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, onFile)
    else if (entry.isFile()) onFile(full)
  }
}
