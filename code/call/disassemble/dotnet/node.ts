/**
 * `task disassemble dotnet` — .NET assembly (`.dll` / `.exe`) → IL
 * via `ildasm`. Ships with the .NET SDK on all platforms.
 *
 * For newer toolchains `ildasm` is typically invoked via `dotnet
 * ildasm` — we fall back to that when the bare binary isn't on
 * PATH.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type DisassembleDotnetNodeInput = {
  input: string
  output?: string
  bytes?: boolean       // -bytes
  header?: boolean      // -header
  tokens?: boolean      // -tokens
  noBar?: boolean       // -nobar (quiet the progress bar)
}

export type DisassembleDotnetNodeOutput = { file: { path: string } }

export async function disassembleDotnetNode(
  src: DisassembleDotnetNodeInput,
): Promise<DisassembleDotnetNodeOutput> {
  const out =
    src.output ??
    src.input.replace(/\.(dll|exe)$/i, '') + '.il'
  await fs.mkdir(path.dirname(out), { recursive: true })

  const args: string[] = []
  args.push(src.input)
  args.push(`-out=${out}`)
  if (src.bytes) args.push('-bytes')
  if (src.header) args.push('-header')
  if (src.tokens) args.push('-tokens')
  if (src.noBar !== false) args.push('-nobar')

  try {
    await run('ildasm', args)
  } catch (err) {
    // Fallback: newer SDKs expose `dotnet ildasm` instead.
    if (/not found/.test(String(err))) {
      await run('dotnet', ['ildasm', ...args])
    } else {
      throw err
    }
  }
  return { file: { path: out } }
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', err => {
      reject(new Error(
        (err as NodeJS.ErrnoException).code === 'ENOENT'
          ? `disassemble dotnet: \`${cmd}\` not found. Install the .NET SDK.`
          : `disassemble dotnet: ${cmd} failed — ${err.message}`,
      ))
    })
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`disassemble dotnet: ${cmd} exited with code ${code}`))
    })
  })
}
