/**
 * `task remove transparency` — flatten alpha into a solid
 * background via ImageMagick `-background <color> -alpha remove`.
 * Default background is white, which matches how most legacy
 * viewers composite PNGs without alpha support.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type RemoveTransparencyNodeInput = {
  input: string
  output?: string
  background?: string
}

export type RemoveTransparencyNodeOutput = { file: { path: string } }

export async function removeTransparencyNode(
  src: RemoveTransparencyNodeInput,
): Promise<RemoveTransparencyNodeOutput> {
  const ext = path.extname(src.input)
  const out = src.output ?? src.input.slice(0, -ext.length) + '.flat' + ext
  await fs.mkdir(path.dirname(out), { recursive: true })

  const bg = src.background ?? 'white'
  await run('convert', [
    src.input,
    '-background', bg,
    '-alpha', 'remove',
    '-alpha', 'off',
    out,
  ])
  return { file: { path: out } }
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', err =>
      reject(enoentHint(cmd, err, 'brew install imagemagick  or  apt install imagemagick')),
    )
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`remove transparency: ${cmd} exited with code ${code}`))
    })
  })
}

function enoentHint(cmd: string, err: unknown, hint: string): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `remove transparency: \`${cmd}\` not found. Install: ${hint}`
      : `remove transparency: ${cmd} failed — ${(err as Error).message}`,
  )
}
