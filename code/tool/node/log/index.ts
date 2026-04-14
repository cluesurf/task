/**
 * CLI logging surface.
 *
 *   - `style.ts` — `setLoggingStyle` / `getLoggingStyle` /
 *     `resolveLoggingStyle`. Single global mode flag.
 *   - `run.ts` — `runAction({ action, input, run })`. Wraps every
 *     CLI handler invocation in the active mode.
 *   - `render.ts` — pure start/done line renderers.
 *   - `verb.ts` — present/past tense verb tables.
 *   - `json.ts` — `emitJson` for `json` / `json:pretty` mode.
 *   - `help.ts` — `prettifyYargsHelp`, called by `code/console.ts`
 *     to tint yargs's `--help` and missing-arg output.
 *   - `path.ts` — small helpers for safely reading nested input
 *     fields.
 *
 * The programmatic `Task` class never imports from this folder —
 * `ora` / `chalk` / `tint` only load when the CLI runs.
 */

export {
  setLoggingStyle,
  getLoggingStyle,
  resolveLoggingStyle,
  type LoggingStyle,
} from './style'
export { runAction, type RunActionInput } from './run'
export {
  renderHelpFor,
  prettifyYargsHelp,
} from './help'
export {
  registerHelp,
  registerGroupHelp,
  type HelpEntry,
  type HelpEntryOption,
  type HelpCommand,
  type HelpExample,
} from './registry'
export {
  CliError,
  renderCliError,
  printCliError,
} from './error'
export {
  setTrace,
  getTrace,
  isExplaining,
  type TraceMode,
} from './trace'
