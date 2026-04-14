/**
 * In-memory registry of every CLI command's metadata, populated
 * lazily by `buildActionCommand`. The custom help renderer in
 * `./help.ts` reads from here so we can produce a layout that
 * yargs's stock formatter can't.
 *
 * Key: leaf command name (`'archive'`, `'image'`, ...). When
 * leaves collide across verbs (e.g. `convert image` vs a future
 * `inspect image`), the entry is keyed under the full
 * space-separated path (`'convert image'`) instead — readers
 * fall back to the full path when the leaf alone is ambiguous.
 */

export type HelpEntryOption = {
  /** Long flag (kebab-case, no leading `--`). */
  long: string
  /** Optional one-letter short flag (no leading `-`). */
  short?: string
  /** Required at the CLI? */
  required?: boolean
  /** Single-line description from the schema. */
  describe?: string
  /** When the option is a discriminated `choices` set. */
  choices?: string[]
  /** When the option has a hard-coded default value. */
  default?: unknown
  /** Inferred primitive type (`string` / `boolean` / `number`). */
  type?: string
}

export type HelpExample = {
  /** Single comment line printed dim above the command. */
  comment?: string
  /** The actual `task ...` invocation. */
  command: string
}

/**
 * One entry in a verb-group's COMMANDS section. Used by parent
 * consoles like `task convert <thing>` to surface their child
 * subcommands inside the same custom layout.
 */
export type HelpCommand = {
  name: string
  describe: string
}

export type HelpEntry = {
  /** Full command path (`'task archive'`, `'task convert image'`). */
  command: string
  /** Top-level describe blurb. */
  describe: string
  /** Required options first, then everything else. */
  options: HelpEntryOption[]
  /** Sub-commands when this entry represents a verb group. */
  commands?: HelpCommand[]
  /** Optional EXAMPLE block printed under the options list. */
  examples?: HelpExample[]
}

const REGISTRY = new Map<string, HelpEntry>()

export function registerHelp(entry: HelpEntry): void {
  REGISTRY.set(entry.command, entry)
}

/**
 * Convenience for parent verb groups that have child subcommands
 * but no options of their own. Same custom layout — just the
 * `OPTIONS` block stays empty and a `COMMANDS` block lists the
 * child entries.
 */
export function registerGroupHelp(input: {
  command: string
  describe: string
  commands: HelpCommand[]
  examples?: HelpExample[]
}): void {
  REGISTRY.set(input.command, {
    command: input.command,
    describe: input.describe,
    options: [],
    commands: input.commands,
    examples: input.examples,
  })
}

export function findHelp(commandPath: string[]): HelpEntry | undefined {
  // Try the full path first, then peel trailing segments off (so a
  // user mistake like `task inspect ./file.pdf` still finds the
  // `task inspect` help), then peel from the front (so deeply
  // nested paths fall back to their leaf).
  for (let n = commandPath.length; n >= 1; n--) {
    const key = ['task', ...commandPath.slice(0, n)].join(' ')
    const entry = REGISTRY.get(key)
    if (entry) return entry
  }
  for (let i = 1; i < commandPath.length; i++) {
    const key = ['task', ...commandPath.slice(i)].join(' ')
    const entry = REGISTRY.get(key)
    if (entry) return entry
  }
  return undefined
}
