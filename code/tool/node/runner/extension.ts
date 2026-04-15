/**
 * Single-file build dispatch — `task build foo.c` infers the
 * compile target from the file extension and delegates to the
 * existing `compile <lang>` builders.
 *
 * Extension table mirrors `code/call/compile/code/<lang>/`:
 *   .c     → c (clang)
 *   .cpp/.cc/.cxx → cpp (clang++)
 *   .rs    → rust (rustc)
 *   .go    → go (go build)
 *   .swift → swift (swiftc)
 *   .hs    → haskell (ghc)
 *   .ml    → ocaml (ocamlopt)
 *   .nim   → nim
 *   .zig   → zig
 *   .ts    → tsc (type-check)
 *   .v     → coq (coqc)   ← NB: coq files use `.v`; not vlang
 *   .bend  → bend
 *   .wat   → wast (wat2wasm)
 */

import path from 'node:path'

export type FileLang =
  | 'c' | 'cpp' | 'rust' | 'go' | 'swift'
  | 'haskell' | 'ocaml' | 'nim' | 'zig' | 'tsc'
  | 'coq' | 'bend' | 'wast'

const TABLE: Record<string, FileLang> = {
  '.c':     'c',
  '.cpp':   'cpp',
  '.cc':    'cpp',
  '.cxx':   'cpp',
  '.h':     'c',
  '.hpp':   'cpp',
  '.rs':    'rust',
  '.go':    'go',
  '.swift': 'swift',
  '.hs':    'haskell',
  '.ml':    'ocaml',
  '.nim':   'nim',
  '.zig':   'zig',
  '.ts':    'tsc',
  '.tsx':   'tsc',
  '.v':     'coq',     // Coq Vernacular files. v-lang would conflict; users override via `--lang v`.
  '.bend':  'bend',
  '.wat':   'wast',
  '.wast':  'wast',
}

export function langFromFile(file: string): FileLang | undefined {
  return TABLE[path.extname(file).toLowerCase()]
}

/** Build the `task compile <lang>` argv for a single file. */
export function buildCompileArgv(
  lang: FileLang,
  file: string,
  output?: string,
): string[] {
  const args = [lang, file]
  if (output) args.push('-o', output)
  return args
}
