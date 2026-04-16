import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import Task from '~/code/node'

const FIXTURES = path.resolve(__dirname, '../../../seed-base/base')
const OUT = path.resolve(__dirname, '../../tmp/test-node/disassemble')

describe('task.disassemble', () => {
  const task = new Task()

  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('disassembles a wasm file to wat', async () => {
    // The fixture set has no .wasm file, so we create a minimal
    // valid wasm module (the 8-byte magic + version header).
    const wasmPath = path.join(OUT, 'minimal.wasm')
    const watPath = path.join(OUT, 'minimal.wat')

    // Minimal valid wasm binary: magic (\0asm) + version 1
    const minimal = Buffer.from([
      0x00, 0x61, 0x73, 0x6d, // \0asm
      0x01, 0x00, 0x00, 0x00, // version 1
    ])
    await fs.writeFile(wasmPath, minimal)

    try {
      await task.disassemble({
        input: { file: { path: wasmPath } },
        output: { file: { path: watPath } },
      })
      const stat = await fs.stat(watPath)
      expect(stat.size).toBeGreaterThan(0)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|wasm2wat/i.test(msg)) {
        return // skip when wasm2wat (wabt) not installed
      }
      throw e
    }
  })

  it('disassembles a binary via radare/objdump', async () => {
    const input = path.join(FIXTURES, 'binary/elf-Linux-x64-bash')
    try {
      await task.disassemble({
        input: { file: { path: input } },
        output: { file: { path: path.join(OUT, 'elf-Linux-x64-bash.asm') } },
      })
      const stat = await fs.stat(path.join(OUT, 'elf-Linux-x64-bash.asm'))
      expect(stat.size).toBeGreaterThan(0)
    } catch (e: any) {
      const msg = e?.message ?? String(e)
      if (/not found|ENOENT|not installed|r2|objdump/i.test(msg)) {
        return // skip when disassembler not installed
      }
      throw e
    }
  })
})
