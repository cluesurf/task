/**
 * JSON output for the `json` / `json:pretty` logging modes.
 * Every key is recursively snake_cased so consumers in
 * snake-style ecosystems (Python, SQL, Ruby) can parse without
 * per-field renaming.
 */

import snakeCase from 'lodash/snakeCase'
import { getLoggingStyle } from './style'

export function emitJson(payload: Record<string, unknown>): void {
  const spaced = getLoggingStyle() === 'json:pretty'
  process.stdout.write(
    JSON.stringify(toSnakeKeys(payload), null, spaced ? 2 : 0) + '\n',
  )
}

function toSnakeKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(toSnakeKeys)
  }
  if (
    value &&
    typeof value === 'object' &&
    value.constructor === Object
  ) {
    const out: Record<string, unknown> = {}
    for (const [key, v] of Object.entries(
      value as Record<string, unknown>,
    )) {
      out[snakeCase(key)] = toSnakeKeys(v)
    }
    return out
  }
  return value
}
