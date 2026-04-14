/**
 * Tiny helpers for pulling string-typed values out of nested
 * input objects without crashing on missing intermediate keys.
 * Used by the logging layer to surface input/output formats and
 * paths in start/done lines.
 */

export function readPath(
  obj: Record<string, unknown>,
  path: string[],
): string | undefined {
  let cursor: unknown = obj
  for (const key of path) {
    if (cursor == null || typeof cursor !== 'object') return undefined
    cursor = (cursor as Record<string, unknown>)[key]
  }
  return typeof cursor === 'string' ? cursor : undefined
}

export function firstPath(
  obj: Record<string, unknown>,
  paths: string[][],
): string | undefined {
  for (const p of paths) {
    const v = readPath(obj, p)
    if (v) return v
  }
  return undefined
}
