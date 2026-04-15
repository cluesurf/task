/**
 * Compile runner. Pure command builders live in
 * `~/code/tool/shared/compile/command`; this file shells them out.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import type { CompileCommand, CompileOptions } from '~/code/tool/shared/compile/command'

export type { CompileCommand, CompileOptions, EmitKind, OptLevel } from '~/code/tool/shared/compile/command'

export async function runCompile(cmd: CompileCommand): Promise<void> {
  // Make sure the output dir exists so compilers don't choke on
  // ENOENT for paths like `dist/out`.
  const outFlag = cmd.args.findIndex(a => a === '-o' || a === '--out-dir' || a.startsWith('-femit-bin='))
  if (outFlag >= 0) {
    const next = cmd.args[outFlag]!.startsWith('-femit-bin=')
      ? cmd.args[outFlag]!.slice('-femit-bin='.length)
      : cmd.args[outFlag + 1]
    if (next) await fs.mkdir(path.dirname(next), { recursive: true })
  }

  await new Promise<void>((resolve, reject) => {
    const env = cmd.env ? { ...process.env, ...cmd.env } : process.env
    const child = spawn(cmd.bin, cmd.args, { env, stdio: 'inherit' })
    child.on('error', err => reject(makeErr(cmd, err)))
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`compile: ${cmd.bin} exited with code ${code}`))
    })
  })
}

function makeErr(cmd: CompileCommand, err: unknown): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `compile: \`${cmd.bin}\` not found. Install: ${cmd.install}`
      : `compile: ${cmd.bin} failed — ${(err as Error).message}`,
  )
}

/** Generate a node handler for one compile builder. Used by the
 * thin per-language consoles to share boilerplate. */
export function makeCompileNode(
  buildCommand: (o: CompileOptions) => CompileCommand,
) {
  return async (input: CompileOptions) => {
    const cmd = buildCommand(input)
    await runCompile(cmd)
    return { bin: cmd.bin, output: input.output }
  }
}
