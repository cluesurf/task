/**
 * `task remove profile` — strip ICC color profile(s) from an image
 * via ImageMagick `mogrify +profile "*"`. Useful when a file has
 * an embedded profile that's confusing downstream renderers, or to
 * drop proprietary profiles before distribution.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type RemoveProfileNodeInput = {
  input: string
  output?: string
}

export type RemoveProfileNodeOutput = { file: { path: string } }

export async function removeProfileNode(
  src: RemoveProfileNodeInput,
): Promise<RemoveProfileNodeOutput> {
  const ext = path.extname(src.input)
  const out = src.output ?? src.input.slice(0, -ext.length) + '.noicc' + ext
  await fs.mkdir(path.dirname(out), { recursive: true })

  // `convert <in> +profile "*" <out>` — "*" matches every embedded
  // profile (ICC, IPTC, XMP). This only nukes profile chunks, not
  // general EXIF; use `task remove metadata` for that.
  await run('convert', [src.input, '+profile', '*', out])
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
      else reject(new Error(`remove profile: ${cmd} exited with code ${code}`))
    })
  })
}

function enoentHint(cmd: string, err: unknown, hint: string): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `remove profile: \`${cmd}\` not found. Install: ${hint}`
      : `remove profile: ${cmd} failed — ${(err as Error).message}`,
  )
}
