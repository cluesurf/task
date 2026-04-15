/**
 * Zero-config multi-language build runner. See
 * `note/idea/zero-config-build-runner.md` for the design.
 *
 * A "verb" is an action a user asks for (`build`, `test`, ...).
 * An "ecosystem" is a language/toolchain bundle detected from
 * marker files (`package.json`, `Cargo.toml`, ...). Each
 * ecosystem declares which verb maps to which native command.
 */

export type TaskVerb =
  | 'build'
  | 'test'
  | 'run'
  | 'lint'
  | 'format'
  | 'install'
  | 'clean'

export type Marker =
  | { form: 'file'; path: string }
  | { form: 'any';  paths: string[] }
  | { form: 'all';  paths: string[] }
  | { form: 'contains'; path: string; pattern: RegExp }

export type Ecosystem = {
  id: string
  name: string
  /** Ordered marker predicates. All must match for the ecosystem
   * to be considered detected. Ecosystems with more-specific
   * markers (lockfiles) sort before less-specific siblings
   * (bare manifests). First match wins. */
  markers: Marker[]
  /** Native command per verb. Missing = "ecosystem doesn't have
   * one"; the runner falls through to `.taskrc` or errors. */
  commands: Partial<Record<TaskVerb, string>>
}

/** The resolved plan for a single verb: { command, source }. */
export type Plan = {
  verb: TaskVerb
  ecosystem: string
  command: string
  /** Where the command came from — `registry` (ecosystem default)
   * or `rc` (user override via `.taskrc`). */
  source: 'registry' | 'rc'
}
