/**
 * `task disassemble wasm` — WebAssembly binary (`.wasm`) → text
 * format (`.wat`) via `wasm2wat` from the WABT toolkit.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type DisassembleWasmNodeInput = {
  input: string
  output?: string
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}

export type DisassembleWasmNodeOutput = { file: { path: string } }

export async function disassembleWasmNode(
  src: DisassembleWasmNodeInput,
): Promise<DisassembleWasmNodeOutput> {
  const out =
    src.output ??
    src.input.replace(/\.wasm$/i, '') + '.wat'
  await fs.mkdir(path.dirname(out), { recursive: true })

  const args: string[] = [src.input, '-o', out]
  if (src.folding) args.push('--fold-exprs')
  if (src.inline) args.push('--inline-exports', '--inline-imports')
  if (src.noDebugNames) args.push('--no-debug-names')

  await run('wasm2wat', args)
  return { file: { path: out } }
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', err => {
      reject(new Error(
        (err as NodeJS.ErrnoException).code === 'ENOENT'
          ? `disassemble wasm: \`${cmd}\` not found. Install via \`brew install wabt\` (macOS), \`apt install wabt\` (Debian), or \`choco install wabt\` (Windows).`
          : `disassemble wasm: ${cmd} failed — ${err.message}`,
      ))
    })
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`disassemble wasm: wasm2wat exited with code ${code}`))
    })
  })
}
