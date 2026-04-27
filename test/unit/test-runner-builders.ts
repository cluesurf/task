/**
 * Unit asserts for every test-runner planner. No test binary
 * required — checks the pure command string each runner builds
 * from the unified `TestOptions`.
 *
 * Invoked from `test/console/test-code.sh`.
 */

import { planUnifiedTest } from '~/code/tool/node/test-runner/run'
import type { TestRunnerId } from '~/code/tool/node/test-runner/types'

let failures = 0

function assert(label: string, cond: unknown, detail?: string): void {
  if (cond) {
    process.stdout.write(`  ✓ ${label}\n`)
  } else {
    failures++
    process.stdout.write(`  ✗ ${label}${detail ? ` — ${detail}` : ''}\n`)
  }
}

function plan(id: TestRunnerId, opts: Record<string, unknown> = {}): string {
  return planUnifiedTest({
    cwd: '/tmp',
    runner: id,
    ...opts,
  } as never).command
}

// ── jest ─────────────────────────────────────────────────────
{
  const c = plan('jest', { filter: 'login', coverage: true, bail: true })
  assert('jest: filter via -t',           c.includes(' -t login'), c)
  assert('jest: --coverage',              c.includes('--coverage'), c)
  assert('jest: --bail',                  c.includes('--bail'), c)
  const r = plan('jest', { reporter: 'junit', reporterOutput: 'r.xml' })
  assert('jest: junit reporter',          r.includes('jest-junit'), r)
}

// ── vitest ───────────────────────────────────────────────────
{
  const c = plan('vitest', { filter: 'foo', workers: 2, updateSnapshots: true })
  assert('vitest: filter via -t',         c.includes(' -t foo'), c)
  assert('vitest: workers via threads',   c.includes('maxThreads=2'), c)
  assert('vitest: -u for snapshots',      c.includes(' -u'), c)
  const r = plan('vitest', { reporter: 'junit', reporterOutput: 'out.xml' })
  assert('vitest: --reporter junit',      r.includes('--reporter junit'), r)
  assert('vitest: outputFile',            r.includes('outputFile=out.xml'), r)
}

// ── mocha ────────────────────────────────────────────────────
{
  const c = plan('mocha', { filter: 'pattern', bail: true, workers: 4 })
  assert('mocha: --grep filter',          c.includes("--grep 'pattern'") || c.includes('--grep pattern'), c)
  assert('mocha: --bail',                 c.includes('--bail'), c)
  assert('mocha: --parallel + --jobs N',  c.includes('--parallel') && c.includes('--jobs 4'), c)
  const r = plan('mocha', { reporter: 'junit', reporterOutput: 'r.xml' })
  assert('mocha: junit reporter',         r.includes('mocha-junit-reporter'), r)
}

// ── pytest ───────────────────────────────────────────────────
{
  const c = plan('pytest', {
    filter: 'k1 or k2',
    coverage: true,
    bail: true,
    workers: 4,
  })
  assert('pytest: -k filter',             c.includes("-k 'k1 or k2'"), c)
  assert('pytest: --cov',                 c.includes('--cov'), c)
  assert('pytest: -x bail',               c.includes(' -x'), c)
  assert('pytest: -n workers',            c.includes('-n 4'), c)
  const r = plan('pytest', { reporter: 'junit', reporterOutput: 'r.xml' })
  assert('pytest: --junitxml',            r.includes('--junitxml=r.xml'), r)
}

// ── cargo test ───────────────────────────────────────────────
{
  const c = plan('cargo', { filter: 'mod::nested', bail: true, workers: 1 })
  assert('cargo: filter after --',        c.includes(' -- ') && c.includes('mod::nested'), c)
  assert('cargo: --fail-fast',            c.includes('--fail-fast'), c)
  assert('cargo: --test-threads',         c.includes('--test-threads 1'), c)
  const cov = plan('cargo', { coverage: true })
  assert('cargo: tarpaulin for coverage', cov.includes('cargo tarpaulin'), cov)
  const j = plan('cargo', { reporter: 'junit', filter: 'foo' })
  assert('cargo: nextest for junit',      j.includes('cargo nextest run'), j)
  const u = plan('cargo', { updateSnapshots: true })
  assert('cargo: insta accept',           u.includes('cargo insta review --accept'), u)
}

// ── go test ──────────────────────────────────────────────────
{
  const c = plan('go', { filter: 'TestFoo', coverage: true, workers: 4, bail: true })
  assert('go: -run filter',               c.includes('-run TestFoo'), c)
  assert('go: -cover',                    c.includes('-cover'), c)
  assert('go: -parallel N',               c.includes('-parallel 4'), c)
  assert('go: -failfast',                 c.includes('-failfast'), c)
  assert('go: ./... at end',              c.endsWith('./...'), c)
  const j = plan('go', { reporter: 'junit', reporterOutput: 'r.xml' })
  assert('go: junit via go-junit-report', j.includes('go-junit-report > r.xml'), j)
  const u = plan('go', { updateSnapshots: true })
  assert('go: UPDATE_SNAPSHOTS env',      u.startsWith('UPDATE_SNAPSHOTS=true'), u)
}

// ── swift test ───────────────────────────────────────────────
{
  const c = plan('swift', {
    filter: 'AppTests/login',
    coverage: true,
    workers: 2,
  })
  assert('swift: --filter',               c.includes('--filter AppTests/login'), c)
  assert('swift: --enable-code-coverage', c.includes('--enable-code-coverage'), c)
  assert('swift: --num-workers',          c.includes('--num-workers 2'), c)
  const j = plan('swift', { reporter: 'junit', reporterOutput: 'out.xml' })
  assert('swift: --xunit-output',         j.includes('--xunit-output out.xml'), j)
  const b = plan('swift', { bail: true })
  assert('swift: bail via env',           b.startsWith('XCTEST_FAIL_FAST=1'), b)
  const u = plan('swift', { updateSnapshots: true })
  assert('swift: snapshot record env',    u.startsWith('SNAPSHOT_TESTING_RECORD=true'), u)
}

// ── xctest ───────────────────────────────────────────────────
{
  const c = plan('xctest', { filter: 'AppTests/login', coverage: true })
  assert('xctest: -only-testing',         c.includes('-only-testing AppTests/login'), c)
  assert('xctest: -enableCodeCoverage',   c.includes('-enableCodeCoverage YES'), c)
  const j = plan('xctest', { reporter: 'junit', reporterOutput: 'r.xml' })
  assert('xctest: pipes to xcbeautify',   j.includes('| xcbeautify'), j)
}

// ── rspec ────────────────────────────────────────────────────
{
  const c = plan('rspec', { filter: 'logs in', bail: true })
  assert('rspec: bundle exec wrapper',    c.startsWith('bundle exec rspec'), c)
  assert('rspec: -e filter',              c.includes("-e 'logs in'"), c)
  assert('rspec: --fail-fast',            c.includes('--fail-fast'), c)
  const w = plan('rspec', { workers: 4 })
  assert('rspec: parallel_rspec for -n',  w.includes('parallel_rspec -n 4'), w)
  const j = plan('rspec', { reporter: 'junit', reporterOutput: 'r.xml' })
  assert('rspec: junit formatter',        j.includes('RspecJunitFormatter'), j)
}

// ── phpunit ──────────────────────────────────────────────────
{
  const c = plan('phpunit', { filter: 'LoginTest', coverage: true, bail: true })
  assert('phpunit: vendor/bin/phpunit',   c.startsWith('./vendor/bin/phpunit'), c)
  assert('phpunit: --filter',             c.includes('--filter LoginTest'), c)
  assert('phpunit: --stop-on-failure',    c.includes('--stop-on-failure'), c)
  assert('phpunit: --coverage-text',      c.includes('--coverage-text'), c)
  const w = plan('phpunit', { workers: 8 })
  assert('phpunit: paratest for -n',      w.includes('./vendor/bin/paratest --processes 8'), w)
  const j = plan('phpunit', { reporter: 'junit', reporterOutput: 'r.xml' })
  assert('phpunit: --log-junit',          j.includes('--log-junit r.xml'), j)
}

// ── unsupported flag combos ──────────────────────────────────
{
  let threw = false
  try {
    plan('mocha', { updateSnapshots: true })
  } catch (e) {
    threw = /not supported/i.test(String(e))
  }
  assert('mocha: rejects --update-snapshots', threw)

  threw = false
  try {
    plan('cargo', { watch: true })
  } catch (e) {
    threw = /watch|cargo-watch/i.test(String(e))
  }
  assert('cargo: rejects --watch with hint', threw)

  threw = false
  try {
    plan('go', { watch: true })
  } catch (e) {
    threw = /watch/i.test(String(e))
  }
  assert('go: rejects --watch with hint',  threw)

  threw = false
  try {
    plan('phpunit', { watch: true })
  } catch (e) {
    threw = /watch/i.test(String(e))
  }
  assert('phpunit: rejects --watch',        threw)
}

if (failures > 0) {
  process.stdout.write(`\n  ${failures} assertion(s) failed\n`)
  process.exit(1)
}
process.stdout.write('\n  all builder asserts pass\n')
