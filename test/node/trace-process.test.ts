import { describe, it, expect } from 'vitest'
import os from 'node:os'
import {
  buildCommandToTraceProcessStrace,
} from '~/code/call/trace/process/strace/command'
import {
  buildCommandToTraceProcessDtruss,
} from '~/code/call/trace/process/dtruss/command'
import {
  buildCommandToTraceProcessProcmon,
} from '~/code/call/trace/process/procmon/command'

// Pure-function tests on the argv builders. The actual handlers
// shell out to strace / dtruss / procmon and require root or
// privileged perms — exercise those in CI sandboxes only.

describe('trace process — argv builders', () => {
  describe('strace', () => {
    it('attaches to a pid in summary mode', () => {
      const c = buildCommandToTraceProcessStrace({
        pid: 42,
        summary: true,
      })
      expect(c.bin).toBe('strace')
      expect(c.args).toEqual(['-c', '-p', '42'])
    })

    it('launches a command with follow + syscall filter', () => {
      const c = buildCommandToTraceProcessStrace({
        command: ['ls', '/tmp'],
        follow: true,
        syscalls: 'open,read,write',
      })
      expect(c.bin).toBe('strace')
      expect(c.args).toEqual([
        '-f',
        '-e', 'trace=open,read,write',
        '--', 'ls', '/tmp',
      ])
    })

    it('throws when neither pid nor command is given', () => {
      expect(() => buildCommandToTraceProcessStrace({})).toThrow(/pid or command/)
    })
  })

  describe('dtruss', () => {
    it('wraps with sudo and attaches to a pid', () => {
      const c = buildCommandToTraceProcessDtruss({ pid: 42 })
      expect(c.bin).toBe('sudo')
      expect(c.args).toEqual(['dtruss', '-p', '42'])
    })

    it('forwards a command with elapsed + match filter', () => {
      const c = buildCommandToTraceProcessDtruss({
        command: ['ls'],
        elapsed: true,
        match: 'open*',
      })
      expect(c.bin).toBe('sudo')
      expect(c.args).toContain('-e')
      expect(c.args).toContain('-t')
      expect(c.args).toContain('open*')
    })
  })

  describe('procmon', () => {
    it('builds a capture command with a backing file', () => {
      const c = buildCommandToTraceProcessProcmon({
        command: ['notepad.exe'],
        capture: 'C:\\tmp\\trace.pml',
        duration: 30,
      })
      expect(c.bin).toBe('procmon')
      expect(c.args).toContain('/AcceptEula')
      expect(c.args).toContain('/BackingFile')
      expect(c.args).toContain('C:\\tmp\\trace.pml')
      expect(c.args).toContain('/RunTime')
      expect(c.args).toContain('30')
    })
  })

  it('platform sniff (sanity)', () => {
    const platform = os.platform()
    expect(['linux', 'darwin', 'win32', 'aix', 'freebsd', 'openbsd', 'sunos'])
      .toContain(platform)
  })
})
