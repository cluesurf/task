/**
 * `task pad` -- pad an audio file with trailing silence so its
 * duration meets a target. Workflow:
 *
 *   1. ffprobe the input to read its current duration.
 *   2. If already >= target, ffmpeg-copy through to the output.
 *   3. Otherwise, ffmpeg-concat with `anullsrc` of the missing
 *      tail and re-encode with the codec matched to the output
 *      extension.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import type { PadAudioNodeLocalInput } from '~/code/form/action/pad/audio/node'
import {
  PadAudioNodeInputParser,
  PadAudioNodeLocalInputParser,
  PadAudioNodeOutputParser,
} from '~/code/form/action/pad/audio/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait, spawnAndCapture } from '~/code/tool/node/spawn'
import {
  buildCopyAudioCommand,
  buildFfprobeDurationCommand,
  buildPadAudioCommand,
  parseDurationMs,
} from './command'

async function runLocal(input: PadAudioNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const targetMs = parseDurationMs(input.to)

  const currentMs = await probeDurationMs(inputPath)

  if (currentMs >= targetMs) {
    await ensureParentDir(outputPath)
    if (path.resolve(inputPath) !== path.resolve(outputPath)) {
      const command = buildCopyAudioCommand({
        input: inputPath,
        output: outputPath,
      })
      await spawnAndWait({
        verb: 'pad',
        bin: command.bin,
        args: command.args,
      })
    }
    return { file: { path: outputPath } }
  }

  const padMs = targetMs - currentMs
  const padSeconds = padMs / 1000

  const samePath = path.resolve(inputPath) === path.resolve(outputPath)
  const tmpOut = samePath
    ? path.join(
        os.tmpdir(),
        `pad.${process.pid}.${Date.now()}${path.extname(outputPath)}`,
      )
    : outputPath

  await ensureParentDir(tmpOut)

  const command = buildPadAudioCommand({
    input: inputPath,
    output: tmpOut,
    padSeconds,
    sampleRate: input.sampleRate,
    channels: input.channels,
  })
  await spawnAndWait({
    verb: 'pad',
    bin: command.bin,
    args: command.args,
  })

  if (samePath) {
    await fs.rename(tmpOut, outputPath)
  }

  return { file: { path: outputPath } }
}

async function probeDurationMs(inputPath: string): Promise<number> {
  const command = buildFfprobeDurationCommand(inputPath)
  const stdout = await spawnAndCapture({
    verb: 'pad',
    bin: command.bin,
    args: command.args,
  })
  const seconds = Number.parseFloat(stdout.trim())
  if (!Number.isFinite(seconds)) {
    throw new Error(
      `ffprobe returned no duration for "${inputPath}" -- is it a valid audio file?`,
    )
  }
  return Math.round(seconds * 1000)
}

const [padNode, testPadNode] = createNodeHandler({
  parsers: {
    input: PadAudioNodeInputParser,
    local: PadAudioNodeLocalInputParser,
    output: PadAudioNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default padNode
export { padNode, testPadNode }
