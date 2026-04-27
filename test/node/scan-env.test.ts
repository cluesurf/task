import { describe, it, expect } from 'vitest'
import { buildCommandToScanEnv } from '~/code/call/scan/env/command'

// Pure-function tests on the argv builder. Running gitleaks /
// trufflehog against a real tree is exercised via the console
// suite when the binaries are present.

describe('scan env — argv builders', () => {
  describe('gitleaks', () => {
    it('builds a no-git working-tree scan by default', () => {
      const c = buildCommandToScanEnv({
        tool: 'gitleaks',
        path: './services',
      })
      expect(c.bin).toBe('gitleaks')
      expect(c.args).toContain('detect')
      expect(c.args).toContain('--source')
      expect(c.args).toContain('./services')
      expect(c.args).toContain('--no-git')
    })

    it('omits --no-git when scanning history', () => {
      const c = buildCommandToScanEnv({
        tool: 'gitleaks',
        path: '.',
        history: true,
      })
      expect(c.args).not.toContain('--no-git')
    })

    it('wires a JSON report path', () => {
      const c = buildCommandToScanEnv({
        tool: 'gitleaks',
        report: '/tmp/leaks.json',
      })
      expect(c.args).toContain('--report-path')
      expect(c.args).toContain('/tmp/leaks.json')
      expect(c.args).toContain('--report-format')
      expect(c.args).toContain('json')
    })
  })

  describe('trufflehog', () => {
    it('builds a filesystem scan against the working tree', () => {
      const c = buildCommandToScanEnv({
        tool: 'trufflehog',
        path: '.',
      })
      expect(c.bin).toBe('trufflehog')
      expect(c.args[0]).toBe('filesystem')
      expect(c.args).toContain('.')
      expect(c.args).toContain('--no-update')
      expect(c.args).toContain('--fail')
    })

    it('switches to git mode when history is requested', () => {
      const c = buildCommandToScanEnv({
        tool: 'trufflehog',
        path: '.',
        history: true,
      })
      expect(c.args[0]).toBe('git')
      expect(c.args[1]).toBe('file://.')
    })
  })
})
