/**
 * Tiny utilities shared across lightweight `code/call/<verb>/<thing>/`
 * implementations. Each helper here replaces a pattern that was
 * copy-pasted across ≥ 5 files:
 *
 *   - `shellQuote`       — was duplicated in every verb's `node.ts`
 *                          that prints a "command it would run"
 *                          before spawning.
 *   - `makeTestGuard`    — factory. Every `shared.ts` used to
 *                          write the same 5-line
 *                          `try { parse(); return true } catch { return false }`.
 *   - `siblingWithSuffix`— default output path = `<in>.<suffix>.<ext>`;
 *                          same 3 lines in every file.
 *   - `defaultOutput`    — `src.output ?? siblingWithSuffix(...)`
 *                          wrapped so `src.output` stays the single
 *                          read.
 *
 * These stay in `shared/` because they're pure and need to run in
 * Node and browser surfaces alike.
 */

import path from 'node:path'

/** Quote a shell token with single quotes when it contains any
 * character a shell would split, expand, or interpret. Used when
 * formatting a printable command line for logs. `spawn` itself
 * doesn't go through a shell so quoting is cosmetic. */

export function shellQuote(s: string): string {
  return /[\s"'$`\\]/.test(s)
    ? `'${s.replace(/'/g, `'\\''`)}'`
    : s
}

export function formatShellCommand(input: {
  bin: string
  args: string[]
}): string {
  return `${input.bin} ${input.args.map(shellQuote).join(' ')}`
}

/** Wrap a `parse<Verb>Node(input): <Verb>NodeInput` function into
 * the matching `test<Verb>Node(input): input is <Verb>NodeInput`
 * predicate. Avoids rewriting the try/catch in every `shared.ts`. */

export function makeTestGuard<T>(
  parse: (input: unknown) => T,
): (input: unknown) => input is T {
  return (input: unknown): input is T => {
    try {
      parse(input)
      return true
    } catch {
      return false
    }
  }
}

/** `/a/b/c.wasm` + `.wat` → `/a/b/c.wat`
 *  `/a/b/c.pdf` + `.unlocked` → `/a/b/c.unlocked.pdf`
 *
 * When `replaceExt` is provided the old extension is dropped and
 * the suffix is used as the new one. Otherwise the suffix is
 * inserted before the existing extension. */

export function siblingWithSuffix(input: {
  path: string
  suffix: string
  replaceExt?: boolean
}): string {
  const ext = path.extname(input.path)
  const stem = ext
    ? input.path.slice(0, -ext.length)
    : input.path
  if (input.replaceExt) return stem + input.suffix
  return stem + input.suffix + ext
}
