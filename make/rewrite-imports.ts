/**
 * One-shot codemod: rewrite every import from the legacy barrel
 * paths (`~/code/form/{shared,node,browser}/{index,take,data}`)
 * to point at the per-module file that actually exports each
 * symbol.
 *
 * Before:
 *   import {
 *     ConvertArchiveNodeInput,
 *     ConvertArchiveNodeInputParser,
 *     ArchiveFormat,
 *   } from '~/code/form/node/take'
 *
 * After:
 *   import {
 *     ConvertArchiveNodeInput,
 *   } from '~/code/form/action/convert/archive/node'
 *   import { ConvertArchiveNodeInputParser } from '~/code/form/action/convert/archive/node/take'
 *   import { ArchiveFormat } from '~/code/form/object/archive'
 *
 * Keeps the Task class entrypoint's lazy-load discipline intact:
 * each call site pulls only the exact module it needs.
 */

import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(__dirname, '..')
const CODE = path.join(ROOT, 'code')
const FORM = path.join(CODE, 'form')

const LEGACY_PREFIXES = [
  '~/code/form/shared',
  '~/code/form/node',
  '~/code/form/browser',
]

type SymbolIndex = Map<string, string> // symbol name -> module specifier

async function main(): Promise<void> {
  const symbolIndex = await buildSymbolIndex()
  const targets = await findSourceFiles()

  let changed = 0
  for (const file of targets) {
    if (await rewriteFile({ file, symbolIndex })) {
      changed += 1
    }
  }
  console.log(`rewrote imports in ${changed} files`)
}

async function buildSymbolIndex(): Promise<SymbolIndex> {
  const index: SymbolIndex = new Map()
  await walk(FORM, async absPath => {
    if (!absPath.endsWith('.ts')) return
    const base = path.basename(absPath)
    if (base !== 'index.ts' && base !== 'take.ts') return

    const moduleSpec = toModuleSpec(absPath)
    const source = await fs.readFile(absPath, 'utf8')

    for (const name of extractExports(source)) {
      if (!index.has(name)) {
        index.set(name, moduleSpec)
      }
    }
  })
  return index
}

function toModuleSpec(absPath: string): string {
  const rel = path.relative(CODE, absPath).replace(/\\/g, '/')
  const trimmed = rel.replace(/\.ts$/, '').replace(/\/index$/, '')
  return `~/code/${trimmed}`
}

const EXPORT_PATTERNS: RegExp[] = [
  /^\s*export\s+type\s+([A-Za-z0-9_]+)\b/gm,
  /^\s*export\s+const\s+([A-Za-z0-9_]+)\b/gm,
  /^\s*export\s+function\s+([A-Za-z0-9_]+)\b/gm,
  /^\s*export\s+class\s+([A-Za-z0-9_]+)\b/gm,
  /^\s*export\s+interface\s+([A-Za-z0-9_]+)\b/gm,
  /^\s*export\s+enum\s+([A-Za-z0-9_]+)\b/gm,
]

function extractExports(source: string): string[] {
  const names = new Set<string>()
  for (const pattern of EXPORT_PATTERNS) {
    pattern.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(source)) !== null) {
      names.add(match[1]!)
    }
  }
  return [...names]
}

async function findSourceFiles(): Promise<string[]> {
  const files: string[] = []
  await walk(CODE, async absPath => {
    if (!absPath.endsWith('.ts')) return
    if (absPath.includes(`${path.sep}form${path.sep}`)) return
    files.push(absPath)
  })
  return files
}

async function rewriteFile({
  file,
  symbolIndex,
}: {
  file: string
  symbolIndex: SymbolIndex
}): Promise<boolean> {
  const original = await fs.readFile(file, 'utf8')
  if (!isLegacyImportPresent(original)) return false

  const next = transform({ source: original, symbolIndex, filePath: file })
  if (next === original) return false

  await fs.writeFile(file, next)
  return true
}

function isLegacyImportPresent(source: string): boolean {
  return LEGACY_PREFIXES.some(prefix => source.includes(prefix))
}

const IMPORT_PATTERN =
  /import\s+(type\s+)?\{([^}]+)\}\s+from\s+'(~\/code\/form\/(?:shared|node|browser)(?:\/[a-z]+)?)'\s*;?/g

function transform({
  source,
  symbolIndex,
  filePath,
}: {
  source: string
  symbolIndex: SymbolIndex
  filePath: string
}): string {
  return source.replace(IMPORT_PATTERN, (match, typeKeyword, body) => {
    const names = body
      .split(',')
      .map((part: string) => part.trim())
      .filter(Boolean)

    const byModule = new Map<string, string[]>()
    const unresolved: string[] = []
    for (const raw of names) {
      const name = stripAlias(raw).trim()
      const target = symbolIndex.get(name)
      if (!target) {
        unresolved.push(raw)
        continue
      }
      const bucket = byModule.get(target) ?? []
      bucket.push(raw)
      byModule.set(target, bucket)
    }

    if (unresolved.length === names.length) {
      return match
    }

    const prefix = typeKeyword ? 'import type ' : 'import '
    const lines: string[] = []
    for (const [moduleSpec, members] of Array.from(byModule).sort((a, b) =>
      a[0].localeCompare(b[0]),
    )) {
      const unique = Array.from(new Set(members)).sort()
      lines.push(
        `${prefix}{\n  ${unique.join(',\n  ')},\n} from '${moduleSpec}'`,
      )
    }

    if (unresolved.length > 0) {
      console.warn(
        `  [warn] ${path.relative(
          ROOT,
          filePath,
        )}: unresolved symbols left behind: ${unresolved.join(', ')}`,
      )
      const unique = Array.from(new Set(unresolved)).sort()
      lines.push(
        `${prefix}{\n  ${unique.join(',\n  ')},\n} from '${extractLegacyPath(
          match,
        )}' // TODO: legacy symbols not found in generated output`,
      )
    }

    return lines.join('\n')
  })
}

function stripAlias(raw: string): string {
  const [head] = raw.split(/\s+as\s+/)
  return head!
}

function extractLegacyPath(importStatement: string): string {
  const quoteMatch = importStatement.match(/'([^']+)'/)
  return quoteMatch?.[1] ?? ''
}

async function walk(
  dir: string,
  visit: (absPath: string) => Promise<void>,
): Promise<void> {
  let entries: Array<{ name: string; isDirectory(): boolean; isFile(): boolean }>
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(abs, visit)
    } else if (entry.isFile()) {
      await visit(abs)
    }
  }
}

void main()
