/**
 * `task remove password` — strip an owner / user password from a
 * PDF via `qpdf --decrypt`. Needs the current password if the PDF
 * has a user password; owner-only protection decrypts without one.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type RemovePasswordNodeInput = {
  input: string
  output?: string
  password?: string
}

export type RemovePasswordNodeOutput = { file: { path: string } }

export async function removePasswordNode(
  src: RemovePasswordNodeInput,
): Promise<RemovePasswordNodeOutput> {
  const ext = path.extname(src.input)
  const out = src.output ?? src.input.slice(0, -ext.length) + '.unlocked' + ext
  await fs.mkdir(path.dirname(out), { recursive: true })

  const args: string[] = ['--decrypt']
  if (src.password) args.push(`--password=${src.password}`)
  args.push(src.input, out)

  await run('qpdf', args)
  return { file: { path: out } }
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', err =>
      reject(enoentHint(cmd, err, 'brew install qpdf  or  apt install qpdf')),
    )
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`remove password: qpdf exited with code ${code}`))
    })
  })
}

function enoentHint(cmd: string, err: unknown, hint: string): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `remove password: \`${cmd}\` not found. Install: ${hint}`
      : `remove password: ${cmd} failed — ${(err as Error).message}`,
  )
}
