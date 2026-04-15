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
 *   - `html` / `markdown`: structured document output. Honored by
 *     verbs that opt in (currently: `scout username`); others fall
 *     through to `pretty`.
 */

export type LoggingStyle =
  | 'pretty'
  | 'text'
  | 'json'
  | 'json:pretty'
  | 'html'
  | 'markdown'

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
    case 'html':
      return 'html'
    case 'markdown':
    case 'md':
      return 'markdown'
    default:
      return 'pretty'
  }
}
