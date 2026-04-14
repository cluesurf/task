/**
 * `task remove subtitles` — drop every subtitle stream from a
 * video container via `ffmpeg -sn`. `-c copy` preserves the video
 * and audio bitstreams so there's no re-encode (fast + lossless).
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type RemoveSubtitlesNodeInput = {
  input: string
  output?: string
}

export type RemoveSubtitlesNodeOutput = { file: { path: string } }

export async function removeSubtitlesNode(
  src: RemoveSubtitlesNodeInput,
): Promise<RemoveSubtitlesNodeOutput> {
  const out = src.output ?? siblingWithSuffix(src.input, '.nosub')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await run('ffmpeg', ['-y', '-i', src.input, '-c', 'copy', '-sn', out])
  return { file: { path: out } }
}

function siblingWithSuffix(p: string, suffix: string): string {
  const ext = path.extname(p)
  return p.slice(0, -ext.length) + suffix + ext
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', err => reject(enoentHint(cmd, err, 'brew install ffmpeg')))
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`remove subtitles: ffmpeg exited with code ${code}`))
    })
  })
}

function enoentHint(cmd: string, err: unknown, hint: string): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `remove subtitles: \`${cmd}\` not found. Install: ${hint}`
      : `remove subtitles: ${cmd} failed — ${(err as Error).message}`,
  )
}
