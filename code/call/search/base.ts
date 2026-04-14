import { Form } from '@cluesurf/form'

/**
 * Action input for `task search` — unified front-end for ripgrep
 * (content) and fd (filenames). Same shape, the runner picks
 * which binary to invoke from the flag combo.
 *
 * Selection logic (in `./node.ts`):
 *
 *   - `--name`  → fd. The pattern matches filenames (or all
 *                 files in `path` when omitted).
 *   - else     → rg. The pattern matches file CONTENTS in `path`.
 *
 * `--type <ext>` filters by extension on either side; `--files`
 * lists matching paths only (rg `--files-with-matches`); `--count`
 * prints match counts; `--hidden` opts into hidden + ignored
 * files for both backends.
 */

export const search: Form = {
  form: 'form',
  save: '~/code/form/action/search',
  link: {
    /** Pattern. Optional only when `--name` lists every file. */
    pattern: { like: 'string', need: false },
    /** Search path. Defaults to `.`. */
    path: { like: 'string', need: false, fall: '.' },
    /** Switch to filename search (fd). Otherwise content search (rg). */
    name: { like: 'boolean', need: false, fall: false },
    /** Restrict to files of this extension (no leading dot). */
    type: { like: 'string', need: false },
    /** Print only matching paths (rg `--files-with-matches`). */
    files: { like: 'boolean', need: false, fall: false },
    /** Print match counts per file. */
    count: { like: 'boolean', need: false, fall: false },
    /** Include hidden + .gitignore'd files. */
    hidden: { like: 'boolean', need: false, fall: false },
    /** Case-insensitive matching. */
    ignoreCase: { like: 'boolean', need: false, fall: false },
    /** Treat the pattern as a literal string, not a regex. */
    fixed: { like: 'boolean', need: false, fall: false },
    /** Cap matches per file. */
    maxCount: { like: 'natural_number', need: false },
  },
}
