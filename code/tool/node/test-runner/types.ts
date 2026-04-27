/**
 * Unified test-runner driver. One vocabulary across jest,
 * vitest, mocha, pytest, cargo test, go test, swift test,
 * xctest, rspec, phpunit. The user passes shared flags
 * (`--filter`, `--watch`, `--coverage`, `--reporter`,
 * `--bail`, `--workers`, `--update-snapshots`); the
 * registry translates them to the runner's native argv.
 *
 * Why not just use `task test code` (the project-verb
 * runner)? That picks one command per ecosystem
 * (`pnpm test`, `pytest`, `cargo test`). It can't tell
 * jest apart from vitest, and its `--filter` is opaque.
 * This driver inspects the project to choose the actual
 * test framework, then maps unified flags onto its
 * specific CLI surface.
 */

export type TestRunnerId =
  | 'jest'
  | 'vitest'
  | 'mocha'
  | 'pytest'
  | 'cargo'
  | 'go'
  | 'swift'
  | 'xctest'
  | 'rspec'
  | 'phpunit'

export type TestReporter = 'default' | 'junit' | 'tap' | 'json'

/** Cross-runner option vocabulary. Every field is optional —
 * unset means "leave the runner's default behavior alone". */
export type TestOptions = {
  /** Filter test names by substring or regex (per-runner semantics). */
  filter?: string
  /** Re-run on file change. Some runners (cargo, swift, xctest)
   * have no built-in watch; those throw a clear error. */
  watch?: boolean
  /** Collect coverage. Each runner has its own coverage tool —
   * we wire the canonical one (jest/vitest built-in, pytest
   * `--cov`, cargo `tarpaulin` if installed, etc.). */
  coverage?: boolean
  /** Output format. `junit` exports JUnit XML to a default
   * sidecar file the CI pipeline can pick up. */
  reporter?: TestReporter
  /** File path the reporter writes to (when applicable). */
  reporterOutput?: string
  /** Stop on first failure. */
  bail?: boolean
  /** Parallel worker count. */
  workers?: number
  /** Update snapshot fixtures (jest, vitest, rspec via
   * `--snapshot-update`-equivalent flags). */
  updateSnapshots?: boolean
  /** Print the resolved command without running it. */
  dryRun?: boolean
  /** Print the resolved command before running it. */
  explain?: boolean
  /** Extra positional arguments forwarded after the unified
   * flags get translated. Use for runner-specific flags
   * we haven't lifted into the unified vocabulary. */
  passthrough?: string[]
}

export type TestPlan = {
  runner: TestRunnerId
  /** Display name (`pytest (uv run)`, `jest (npx)`, ...). */
  name: string
  /** The shell command to spawn, ready for `sh -c`. */
  command: string
}

export type TestRunner = {
  id: TestRunnerId
  name: string
  /** Detection: returns true if this runner is what the project
   * uses. First match in the registry wins, so order matters. */
  detect: (cwd: string) => boolean
  /** Build the shell command for this runner from the unified
   * options. Throw a `Error` with a clear message if a flag is
   * unsupported for this runner. */
  build: (opts: TestOptions) => string
}
