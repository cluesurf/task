import { describe, it, expect } from 'vitest'
import {
  buildCommandToProfileCpuSamply,
} from '~/code/call/profile/cpu/samply/command'
import {
  buildCommandToProfileCpuZerox,
} from '~/code/call/profile/cpu/zerox/command'
import {
  buildCommandToProfileCpuClinic,
} from '~/code/call/profile/cpu/clinic/command'

// Pure-function tests on the argv builders — running samply / 0x /
// clinic in CI requires the binaries on PATH and live workloads,
// which is too heavy for unit tests. The four-branch dispatcher in
// `profile/cpu/console.ts` is exercised by the console suite.

describe('profile cpu — argv builders', () => {
  describe('samply', () => {
    it('records a fresh command', () => {
      const c = buildCommandToProfileCpuSamply({
        command: ['./target/release/parse'],
        rate: 999,
        noOpen: true,
      })
      expect(c.bin).toBe('samply')
      expect(c.args).toContain('record')
      expect(c.args).toContain('--rate')
      expect(c.args).toContain('999')
      expect(c.args).toContain('--no-open')
      expect(c.args).toContain('--')
      expect(c.args).toContain('./target/release/parse')
    })

    it('attaches to a running pid', () => {
      const c = buildCommandToProfileCpuSamply({ pid: 4242 })
      expect(c.args).toEqual(['record', '--pid', '4242'])
    })

    it('throws on empty input', () => {
      expect(() => buildCommandToProfileCpuSamply({})).toThrow(/pid or command/)
    })
  })

  describe('0x', () => {
    it('forwards command + output', () => {
      const c = buildCommandToProfileCpuZerox({
        command: ['node', 'server.js'],
        outputDir: '/tmp/0x-out',
        quiet: true,
      })
      expect(c.bin).toBe('0x')
      expect(c.args).toContain('-o')
      expect(c.args).toContain('/tmp/0x-out')
      expect(c.args).toContain('-q')
      expect(c.args).toContain('--')
      expect(c.args).toContain('node')
      expect(c.args).toContain('server.js')
    })

    it('throws when no command', () => {
      expect(() => buildCommandToProfileCpuZerox({ command: [] })).toThrow(/command/)
    })
  })

  describe('clinic', () => {
    it('defaults to flame', () => {
      const c = buildCommandToProfileCpuClinic({ command: ['node', 'app.js'] })
      expect(c.bin).toBe('clinic')
      expect(c.args[0]).toBe('flame')
      expect(c.args).toContain('--')
      expect(c.args).toContain('node')
      expect(c.args).toContain('app.js')
    })

    it('honors a custom subtool', () => {
      const c = buildCommandToProfileCpuClinic({
        command: ['node', 'app.js'],
        tool: 'doctor',
      })
      expect(c.args[0]).toBe('doctor')
    })
  })
})
