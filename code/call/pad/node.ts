/**
 * Pad an audio file with trailing silence so its duration meets
 * a target. Workflow:
 *
 *   1. ffprobe the input to read its current duration.
 *   2. If already >= target, ffmpeg-copy through to the output.
 *   3. Otherwise, ffmpeg-concat with `anullsrc` of the missing
 *      tail and re-encode with the codec matched to the output
 *      extension.
 *
 * Inspired by `deck/etch/scripts/audio/song-length.sh`. The
 * shape supports every common audio container; ffmpeg picks the
 * encoder from the output extension.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { exec } from '~/code/tool/node/process'
import { runCommandSequence } from '~/code/tool/node/command'
import {
  buildCopyAudioCommand,
  buildFfprobeDurationCommand,
  buildPadAudioCommand,
  parseDurationMs,
} from './command'

export type PadInput = {
  input: { file: { path: string }; format?: string }
  output: { file: { path: string }; format?: string }
  to: string
  sampleRate?: number
  channels?: number
}

export type PadOutput = {
  file: { path: string }
  durationMsBefore: number
  durationMsAfter: number
  padded: boolean
}

export async function padNode(source: PadInput): Promise<PadOutput> {
  const inputPath = source.input.file.path
  const outputPath = source.output.file.path
  const targetMs = parseDurationMs(source.to)

  const currentMs = await probeDurationMs(inputPath)

  if (currentMs >= targetMs) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    if (path.resolve(inputPath) !== path.resolve(outputPath)) {
      await runCommandSequence(
        buildCopyAudioCommand({ input: inputPath, output: outputPath }),
      )
    }
    return {
      file: { path: outputPath },
      durationMsBefore: currentMs,
      durationMsAfter: currentMs,
      padded: false,
    }
  }

  const padMs = targetMs - currentMs
  const padSeconds = padMs / 1000

  // ffmpeg refuses to overwrite an in-place input. When the
  // caller passes the same path for input and output, route
  // through a tmp file and rename.
  const samePath = path.resolve(inputPath) === path.resolve(outputPath)
  const tmpOut = samePath
    ? path.join(
        os.tmpdir(),
        `pad.${process.pid}.${Date.now()}${path.extname(outputPath)}`,
      )
    : outputPath

  await fs.mkdir(path.dirname(tmpOut), { recursive: true })

  await runCommandSequence(
    buildPadAudioCommand({
      input: inputPath,
      output: tmpOut,
      padSeconds,
      sampleRate: source.sampleRate,
      channels: source.channels,
    }),
  )

  if (samePath) {
    await fs.rename(tmpOut, outputPath)
  }

  return {
    file: { path: outputPath },
    durationMsBefore: currentMs,
    durationMsAfter: targetMs,
    padded: true,
  }
}

async function probeDurationMs(input: string): Promise<number> {
  const sequence = buildFfprobeDurationCommand(input)
  const cmd = sequence.call[0]!
  const { stdout } = await exec(cmd.link)
  const seconds = Number.parseFloat(stdout.trim())
  if (!Number.isFinite(seconds)) {
    throw new Error(
      `ffprobe returned no duration for "${input}" — is it a valid audio file?`,
    )
  }
  return Math.round(seconds * 1000)
}
