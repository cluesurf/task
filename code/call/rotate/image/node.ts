import fs from 'node:fs/promises'
import path from 'node:path'
import { ensureParentDir } from '~/code/tool/node/file'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type RotateImageNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  degree: string
}

export async function rotateImageNode(source: RotateImageNodeInput) {
  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)

  const cmd = getCommand('convert')
  cmd.link.push(
    source.input.file.path,
    '-rotate',
    String(source.degree),
    outputPath,
  )
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
