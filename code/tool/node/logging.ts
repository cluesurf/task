/**
 * @deprecated The legacy logging module has been split into
 * dedicated files under `code/tool/node/log/`:
 *
 *   - `runAction`, `setLoggingStyle`, `getLoggingStyle`, `resolveLoggingStyle`
 *     → `code/tool/node/log/index.ts`
 *   - `prettifyYargsHelp`, `renderHelpFor`
 *     → `code/tool/node/log/help.ts` (now driven by the registry-based
 *       custom renderer; the old `[string]/[boolean]/[choices: ...]`
 *       regex pass is gone — every help path is synthesized into a
 *       `HelpEntry` and rendered with the new layout)
 *   - `registerHelp`, `registerGroupHelp`
 *     → `code/tool/node/log/registry.ts`
 *
 * Re-exporting here for any external import path that hasn't moved
 * yet. New code should import from `~/code/tool/node/log` directly.
 */

export {
  getLoggingStyle,
  prettifyYargsHelp,
  renderHelpFor,
  resolveLoggingStyle,
  runAction,
  setLoggingStyle,
} from './log'
export {
  registerGroupHelp,
  registerHelp,
} from './log/registry'
export type {
  HelpCommand,
  HelpEntry,
  HelpEntryOption,
  HelpExample,
} from './log/registry'
