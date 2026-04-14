/**
 * Single source of truth for the active CLI output style.
 *
 * The CLI middleware in `code/console.ts` calls `setLoggingStyle`
 * once after parsing `--format` / `-f`; everything downstream
 * (`runAction`, `prettifyYargsHelp`, JSON emit) reads the current
 * style via `getLoggingStyle`.
 *
 *   - `pretty` (default): ora spinner + ANSI-colored status lines.
 *   - `text`: plain ASCII — no ANSI, no animation.
 *   - `json` / `json:pretty`: one JSON object per action on stdout.
 */

export type LoggingStyle = 'pretty' | 'text' | 'json' | 'json:pretty'

let STYLE: LoggingStyle = 'pretty'

export function setLoggingStyle(style: LoggingStyle): void {
  STYLE = style
}

export function getLoggingStyle(): LoggingStyle {
  return STYLE
}

/** Coerce a `--format` argv value to a valid `LoggingStyle`. */
export function resolveLoggingStyle(value: unknown): LoggingStyle {
  switch (value) {
    case 'text':
    case 'plain':
      return 'text'
    case 'json':
      return 'json'
    case 'json:pretty':
      return 'json:pretty'
    default:
      return 'pretty'
  }
}
