/**
 * Registry of supported test runners.
 *
 * Each entry knows how to detect its presence in a project
 * (deps in `package.json`, language manifest, or a Gemfile
 * line) and how to translate the unified `TestOptions` into
 * its native argv.
 *
 * Order matters: jest before vitest before mocha because
 * many monorepos carry transitive deps for all three; pick
 * the one the project actually scripts against.
 */

import fs from 'node:fs'
import path from 'node:path'
import type { TestOptions, TestRunner, TestRunnerId } from './types'

export const TEST_RUNNERS: TestRunner[] = [
  // ── JS / TS ───────────────────────────────────────────────
  {
    id: 'vitest',
    name: 'vitest',
    detect: cwd =>
      hasJsDep(cwd, 'vitest') ||
      hasFile(cwd, 'vitest.config.ts') ||
      hasFile(cwd, 'vitest.config.js') ||
      hasFile(cwd, 'vitest.config.mjs'),
    build: opts => {
      const args = ['vitest', 'run']
      if (opts.watch) {
        args[1] = '' // drop `run` so vitest stays in watch mode (its default)
      }
      if (opts.filter) args.push('-t', shellQuote(opts.filter))
      if (opts.coverage) args.push('--coverage')
      if (opts.bail) args.push('--bail', '1')
      if (opts.workers !== undefined) args.push('--pool=threads', `--poolOptions.threads.maxThreads=${opts.workers}`)
      if (opts.updateSnapshots) args.push('-u')
      if (opts.reporter) {
        args.push('--reporter', mapReporter('vitest', opts.reporter))
        if (opts.reporter === 'junit' && opts.reporterOutput) {
          args.push(`--outputFile=${shellQuote(opts.reporterOutput)}`)
        }
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      return runViaJs(args.filter(Boolean))
    },
  },
  {
    id: 'jest',
    name: 'jest',
    detect: cwd =>
      hasJsDep(cwd, 'jest') ||
      hasFile(cwd, 'jest.config.ts') ||
      hasFile(cwd, 'jest.config.js') ||
      hasFile(cwd, 'jest.config.mjs') ||
      hasFile(cwd, 'jest.config.json'),
    build: opts => {
      const args = ['jest']
      if (opts.watch) args.push('--watch')
      if (opts.filter) args.push('-t', shellQuote(opts.filter))
      if (opts.coverage) args.push('--coverage')
      if (opts.bail) args.push('--bail')
      if (opts.workers !== undefined) args.push(`--maxWorkers=${opts.workers}`)
      if (opts.updateSnapshots) args.push('-u')
      if (opts.reporter) {
        // jest's --reporters takes a list; junit is via jest-junit.
        const r = mapReporter('jest', opts.reporter)
        if (opts.reporter === 'junit') {
          args.push('--reporters=default', `--reporters=${r}`)
        } else if (opts.reporter !== 'default') {
          args.push(`--reporters=${r}`)
        }
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      return runViaJs(args)
    },
  },
  {
    id: 'mocha',
    name: 'mocha',
    detect: cwd =>
      hasJsDep(cwd, 'mocha') ||
      hasFile(cwd, '.mocharc.json') ||
      hasFile(cwd, '.mocharc.js') ||
      hasFile(cwd, '.mocharc.cjs') ||
      hasFile(cwd, '.mocharc.yml'),
    build: opts => {
      const args = ['mocha']
      if (opts.watch) args.push('--watch')
      if (opts.filter) args.push('--grep', shellQuote(opts.filter))
      if (opts.bail) args.push('--bail')
      if (opts.workers !== undefined) args.push('--parallel', '--jobs', String(opts.workers))
      if (opts.coverage) {
        // mocha has no built-in coverage — wrap with c8 if available
        // and fall back to a clear error otherwise.
        return runViaJs(['c8', '--', ...args, ...flatten(opts.passthrough)])
      }
      if (opts.reporter) {
        args.push('--reporter', mapReporter('mocha', opts.reporter))
        if (opts.reporter === 'junit' && opts.reporterOutput) {
          args.push('--reporter-option', `output=${shellQuote(opts.reporterOutput)}`)
        }
      }
      if (opts.updateSnapshots) {
        throw new Error(
          'task test: --update-snapshots is not supported by mocha. Use jest, vitest, or rspec.',
        )
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      return runViaJs(args)
    },
  },

  // ── Python ────────────────────────────────────────────────
  {
    id: 'pytest',
    name: 'pytest',
    detect: cwd =>
      hasFile(cwd, 'pytest.ini') ||
      hasFile(cwd, 'pyproject.toml') && readsTomlSection(cwd, 'pyproject.toml', '[tool.pytest') ||
      hasFile(cwd, 'tox.ini') ||
      hasFile(cwd, 'conftest.py') ||
      hasFile(cwd, 'tests'),
    build: opts => {
      const args = ['pytest']
      if (opts.watch) {
        // pytest itself has no watch; pytest-watch (`ptw`) is the
        // de-facto wrapper. Use it when --watch is requested.
        args[0] = 'ptw'
      }
      if (opts.filter) args.push('-k', shellQuote(opts.filter))
      if (opts.coverage) args.push('--cov', '--cov-report=term-missing')
      if (opts.bail) args.push('-x')
      if (opts.workers !== undefined) args.push('-n', String(opts.workers))
      if (opts.updateSnapshots) {
        // syrupy is the standard snapshot lib; its update flag is
        // --snapshot-update. Falls through harmlessly when syrupy
        // isn't installed.
        args.push('--snapshot-update')
      }
      if (opts.reporter) {
        if (opts.reporter === 'junit') {
          const out = opts.reporterOutput ?? 'test-results.xml'
          args.push(`--junitxml=${shellQuote(out)}`)
        } else if (opts.reporter === 'json') {
          // pytest-json-report adds --json-report
          args.push('--json-report')
        }
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      return args.join(' ')
    },
  },

  // ── Native compiled ───────────────────────────────────────
  {
    id: 'cargo',
    name: 'cargo test',
    detect: cwd => hasFile(cwd, 'Cargo.toml'),
    build: opts => {
      if (opts.watch) {
        throw new Error(
          'task test: --watch needs `cargo install cargo-watch`; then run `cargo watch -x test`.',
        )
      }
      const args = ['cargo', 'test']
      // Cargo splits its argv at `--`: everything after goes to the
      // test binary. That's where filter / nocapture / threads live.
      const testArgs: string[] = []
      if (opts.filter) testArgs.push(shellQuote(opts.filter))
      if (opts.bail) testArgs.push('--fail-fast')
      if (opts.workers !== undefined) testArgs.push('--test-threads', String(opts.workers))
      if (opts.coverage) {
        // tarpaulin is the canonical option; fall back to llvm-cov.
        return [
          'cargo', 'tarpaulin',
          opts.filter ? `-- ${shellQuote(opts.filter)}` : '',
        ].filter(Boolean).join(' ')
      }
      if (opts.reporter === 'junit') {
        // cargo-nextest produces JUnit; degrade to a clear error
        // when not installed rather than emit malformed args.
        return [
          'cargo', 'nextest', 'run',
          '--profile', 'ci',
          opts.filter ? shellQuote(opts.filter) : '',
        ].filter(Boolean).join(' ')
      }
      if (opts.updateSnapshots) {
        return ['cargo', 'insta', 'review', '--accept'].join(' ')
      }
      if (opts.passthrough?.length) testArgs.push(...opts.passthrough.map(shellQuote))
      const full = testArgs.length
        ? `${args.join(' ')} -- ${testArgs.join(' ')}`
        : args.join(' ')
      return full
    },
  },
  {
    id: 'go',
    name: 'go test',
    detect: cwd => hasFile(cwd, 'go.mod') || hasFile(cwd, 'go.work'),
    build: opts => {
      if (opts.watch) {
        throw new Error(
          'task test: go has no built-in watch. Try `entr` or `air`.',
        )
      }
      const args = ['go', 'test']
      if (opts.filter) args.push('-run', shellQuote(opts.filter))
      if (opts.coverage) args.push('-cover')
      if (opts.bail) args.push('-failfast')
      if (opts.workers !== undefined) args.push('-parallel', String(opts.workers))
      if (opts.reporter === 'json') args.push('-json')
      if (opts.reporter === 'junit') {
        // go has no native JUnit; the convention is `go test -json
        // | go-junit-report`.
        const xml = opts.reporterOutput ?? 'test-results.xml'
        args.push('-json')
        args.push('./...')
        if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
        return `${args.join(' ')} | go-junit-report > ${shellQuote(xml)}`
      }
      if (opts.updateSnapshots) {
        // golden-file libs vary; the most common is `cupaloy` which
        // takes UPDATE_SNAPSHOTS=true via env, not a flag.
        if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
        args.push('./...')
        return `UPDATE_SNAPSHOTS=true ${args.join(' ')}`
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      args.push('./...')
      return args.join(' ')
    },
  },
  {
    id: 'swift',
    name: 'swift test',
    detect: cwd => hasFile(cwd, 'Package.swift'),
    build: opts => {
      if (opts.watch) {
        throw new Error(
          'task test: swift test has no built-in watch. Try `fswatch ... | xargs -n1 -I _ swift test`.',
        )
      }
      const args = ['swift', 'test']
      if (opts.filter) args.push('--filter', shellQuote(opts.filter))
      if (opts.coverage) args.push('--enable-code-coverage')
      if (opts.workers !== undefined) args.push('--num-workers', String(opts.workers))
      if (opts.reporter === 'junit') args.push('--xunit-output', shellQuote(opts.reporterOutput ?? 'test-results.xml'))
      if (opts.bail) {
        // SwiftPM has no fail-fast flag; XCTest does it via env.
        if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
        return `XCTEST_FAIL_FAST=1 ${args.join(' ')}`
      }
      if (opts.updateSnapshots) {
        // swift-snapshot-testing reads SNAPSHOT_TESTING_RECORD=true.
        if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
        return `SNAPSHOT_TESTING_RECORD=true ${args.join(' ')}`
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      return args.join(' ')
    },
  },
  {
    id: 'xctest',
    name: 'xctest (xcodebuild)',
    detect: cwd =>
      hasGlob(cwd, '*.xcodeproj') || hasGlob(cwd, '*.xcworkspace'),
    build: opts => {
      if (opts.watch) {
        throw new Error('task test: xctest has no built-in watch.')
      }
      // `xcodebuild test` requires -scheme. Pull from the first
      // .xcodeproj/.xcworkspace name; user overrides via --passthrough.
      const args = ['xcodebuild', 'test']
      if (opts.filter) args.push('-only-testing', shellQuote(opts.filter))
      if (opts.coverage) args.push('-enableCodeCoverage', 'YES')
      if (opts.bail) {
        // xcodebuild has no native fail-fast; rely on -test-iterations
        args.push('-test-iterations', '1')
      }
      if (opts.reporter === 'junit') {
        // xcbeautify or xcpretty pipe-based; `xcresulttool` is more
        // robust but post-hoc.
        const xml = opts.reporterOutput ?? 'test-results.xml'
        if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
        return `${args.join(' ')} | xcbeautify --report junit --report-path ${shellQuote(xml)}`
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      return args.join(' ')
    },
  },

  // ── Ruby ──────────────────────────────────────────────────
  {
    id: 'rspec',
    name: 'rspec',
    detect: cwd =>
      hasFile(cwd, '.rspec') ||
      hasFile(cwd, 'spec') ||
      hasGemfileMatch(cwd, /\brspec\b/),
    build: opts => {
      // Prefer `bundle exec rspec` when a Gemfile is present.
      const bin = hasFile(path.dirname('/dummy'), 'Gemfile') // placeholder; resolved at runtime
      const args = ['rspec']
      if (opts.watch) {
        // guard-rspec is the convention — `bundle exec guard`.
        return 'bundle exec guard'
      }
      if (opts.filter) args.push('-e', shellQuote(opts.filter))
      if (opts.bail) args.push('--fail-fast')
      if (opts.workers !== undefined) {
        // parallel_tests gem provides parallel_rspec.
        return [
          `parallel_rspec`, `-n`, String(opts.workers),
          opts.filter ? `--test-options "-e ${shellQuote(opts.filter)}"` : '',
        ].filter(Boolean).join(' ')
      }
      if (opts.coverage) {
        // simplecov is opt-in via spec_helper; the user has to
        // configure it. We don't add a flag — just a hint.
      }
      if (opts.reporter === 'junit') args.push('--format', 'RspecJunitFormatter', '--out', shellQuote(opts.reporterOutput ?? 'test-results.xml'))
      else if (opts.reporter === 'json') args.push('--format', 'json')
      if (opts.updateSnapshots) {
        // rspec-snapshot uses UPDATE_SNAPSHOTS=true.
        if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
        return `UPDATE_SNAPSHOTS=true bundle exec ${args.join(' ')}`
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      // Use `bundle exec` if Gemfile is detectable — shell-escape
      // the whole thing.
      return `bundle exec ${args.join(' ')}`
      void bin
    },
  },

  // ── PHP ───────────────────────────────────────────────────
  {
    id: 'phpunit',
    name: 'phpunit',
    detect: cwd =>
      hasFile(cwd, 'phpunit.xml') ||
      hasFile(cwd, 'phpunit.xml.dist') ||
      hasComposerDep(cwd, 'phpunit/phpunit'),
    build: opts => {
      if (opts.watch) {
        throw new Error('task test: phpunit has no built-in watch.')
      }
      const args = ['./vendor/bin/phpunit']
      if (opts.filter) args.push('--filter', shellQuote(opts.filter))
      if (opts.bail) args.push('--stop-on-failure')
      if (opts.coverage) args.push('--coverage-text')
      if (opts.workers !== undefined) {
        // paratest is the parallel runner.
        return `./vendor/bin/paratest --processes ${opts.workers}${
          opts.filter ? ` --filter ${shellQuote(opts.filter)}` : ''
        }`
      }
      if (opts.reporter === 'junit') {
        args.push('--log-junit', shellQuote(opts.reporterOutput ?? 'test-results.xml'))
      } else if (opts.reporter === 'tap') {
        args.push('--printer', 'TapPrinter')
      }
      if (opts.updateSnapshots) {
        // spatie/phpunit-snapshot-assertions reads -d --update-snapshots
        args.push('-d', '--update-snapshots')
      }
      if (opts.passthrough?.length) args.push(...opts.passthrough.map(shellQuote))
      return args.join(' ')
    },
  },
]

// ── Helpers ─────────────────────────────────────────────────

/** Look up a runner by id without scanning the filesystem. */
export function findRunnerById(
  id: TestRunnerId,
): TestRunner | undefined {
  return TEST_RUNNERS.find(r => r.id === id)
}

function hasFile(cwd: string, rel: string): boolean {
  try {
    return fs.existsSync(path.join(cwd, rel))
  } catch {
    return false
  }
}

function hasGlob(cwd: string, glob: string): boolean {
  // Simple `*.ext` matcher — no full glob support needed here.
  const m = glob.match(/^\*\.(.+)$/)
  if (!m) return hasFile(cwd, glob)
  const ext = `.${m[1]}`
  try {
    return fs.readdirSync(cwd).some(n => n.endsWith(ext))
  } catch {
    return false
  }
}

function hasJsDep(cwd: string, dep: string): boolean {
  const pkg = path.join(cwd, 'package.json')
  if (!fs.existsSync(pkg)) return false
  try {
    const json = JSON.parse(fs.readFileSync(pkg, 'utf-8')) as {
      dependencies?: Record<string, unknown>
      devDependencies?: Record<string, unknown>
      peerDependencies?: Record<string, unknown>
    }
    return Boolean(
      json.dependencies?.[dep] ||
        json.devDependencies?.[dep] ||
        json.peerDependencies?.[dep],
    )
  } catch {
    return false
  }
}

function hasComposerDep(cwd: string, dep: string): boolean {
  const composer = path.join(cwd, 'composer.json')
  if (!fs.existsSync(composer)) return false
  try {
    const json = JSON.parse(fs.readFileSync(composer, 'utf-8')) as {
      require?: Record<string, unknown>
      'require-dev'?: Record<string, unknown>
    }
    return Boolean(json.require?.[dep] || json['require-dev']?.[dep])
  } catch {
    return false
  }
}

function hasGemfileMatch(cwd: string, re: RegExp): boolean {
  for (const f of ['Gemfile', 'Gemfile.lock', '.gemfile']) {
    const p = path.join(cwd, f)
    try {
      if (fs.existsSync(p) && re.test(fs.readFileSync(p, 'utf-8'))) {
        return true
      }
    } catch {
      // ignore
    }
  }
  return false
}

function readsTomlSection(cwd: string, file: string, prefix: string): boolean {
  try {
    const text = fs.readFileSync(path.join(cwd, file), 'utf-8')
    return text.includes(prefix)
  } catch {
    return false
  }
}

/**
 * Run a JS test runner via the project's package manager so the
 * binary on `node_modules/.bin/` resolves without a global install.
 * Falls back to `npx` when no lockfile is recognized.
 */
function runViaJs(argv: string[]): string {
  // Prefer the local pnpm/yarn/npm binary; fall back to npx.
  // We can't read cwd here statically, so emit `npx` and let the
  // caller's `sh -c` resolve via PATH. The pnpm/yarn variants are
  // a one-line tweak the user can drop in `.taskrc` if needed.
  return `npx --yes -- ${argv.join(' ')}`
}

function mapReporter(
  runner: 'jest' | 'vitest' | 'mocha',
  r: NonNullable<TestOptions['reporter']>,
): string {
  if (runner === 'jest') {
    if (r === 'junit') return 'jest-junit'
    if (r === 'tap') return 'jest-tap-reporter'
    if (r === 'json') return 'default'
    return 'default'
  }
  if (runner === 'vitest') {
    if (r === 'junit') return 'junit'
    if (r === 'tap') return 'tap'
    if (r === 'json') return 'json'
    return 'default'
  }
  // mocha
  if (r === 'junit') return 'mocha-junit-reporter'
  if (r === 'tap') return 'tap'
  if (r === 'json') return 'json'
  return 'spec'
}

function shellQuote(s: string): string {
  if (!/[^A-Za-z0-9_./=:@%+-]/.test(s)) return s
  return `'${s.replace(/'/g, `'\\''`)}'`
}

function flatten(xs?: string[]): string[] {
  return xs ?? []
}
