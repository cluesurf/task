/**
 * `task rotate video` — ffmpeg's `transpose` filter is the right
 * primitive for 90° increments; 180° is a chained transpose pair.
 * Free-angle rotations would need `rotate=angle` on a re-encoded
 * stream with padding, which this verb doesn't bother with —
 * users with that need can drop to a manual ffmpeg call.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type RotateVideoNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  degree: string
}

const FILTERS: Record<string, string> = {
  '90': 'transpose=1',
  '180': 'transpose=1,transpose=1',
  '270': 'transpose=2',
}

export async function rotateVideoNode(source: RotateVideoNodeInput) {
  const filter = FILTERS[String(source.degree)]
  if (!filter) {
    throw new Error(
      `rotate video: --degree must be 90, 180, or 270 (got "${source.degree}")`,
    )
  }

  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    source.input.file.path,
    '-vf',
    filter,
    outputPath,
  )
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
