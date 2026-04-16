/**
 * `task split audio` -- two modes:
 *
 *   --segments silence   run ffmpeg's `silencedetect` filter, parse
 *                        the `silence_start` / `silence_end` pairs
 *                        from stderr, then emit one segment per
 *                        non-silent region.
 *   --segments <N>       fixed-length chunks of N seconds via
 *                        `ffmpeg -f segment`.
 *
 * Outputs land next to the input as `<stem>.part-001.<ext>`,
 * `<stem>.part-002.<ext>`, ... unless `-o <dir>` is given.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import type { SplitAudioNodeLocalInput } from '~/code/form/action/split/audio/node'
import {
  SplitAudioNodeInputParser,
  SplitAudioNodeLocalInputParser,
  SplitAudioNodeOutputParser,
} from '~/code/form/action/split/audio/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait, spawnAndCaptureStderr } from '~/code/tool/node/spawn'
import {
  buildSilenceDetectCommand,
  buildSplitAudioFixedCommand,
  buildSplitAudioSegmentCommand,
} from './command'

type SilenceRange = { start: number; end: number }

async function runLocal(input: SplitAudioNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output?.file?.path
  const outDir = outputPath
    ? path.resolve(outputPath).toLowerCase() ===
      path.resolve(inputPath).toLowerCase()
      ? path.dirname(inputPath)
      : outputPath
    : path.dirname(inputPath)
  const stem = path.basename(inputPath, path.extname(inputPath))
  const ext = path.extname(inputPath)

  await fs.mkdir(outDir, { recursive: true })

  if (input.segments === 'silence') {
    const ranges = await detectSilenceRanges({
      inputPath,
      db: input.silenceDb ?? '-30',
      minDuration: input.silenceDuration ?? '0.5',
    })
    const parts: string[] = []
    for (let i = 0; i < ranges.length; i++) {
      const { start, end } = ranges[i]!
      const partPath = path.join(
        outDir,
        `${stem}.part-${String(i + 1).padStart(3, '0')}${ext}`,
      )
      const command = buildSplitAudioSegmentCommand({
        inputPath,
        outputPath: partPath,
        start,
        end,
      })
      await spawnAndWait({
        verb: 'split audio',
        bin: command.bin,
        args: command.args,
      })
      parts.push(partPath)
    }
    return { file: { path: outDir } }
  }

  const chunkSeconds = Number(input.segments)
  if (!Number.isFinite(chunkSeconds) || chunkSeconds <= 0) {
    throw new Error(
      `split audio: --segments must be 'silence' or a positive number of seconds (got "${input.segments}")`,
    )
  }
  const pattern = path.join(outDir, `${stem}.part-%03d${ext}`)
  const command = buildSplitAudioFixedCommand({
    inputPath,
    pattern,
    chunkSeconds,
  })
  await spawnAndWait({
    verb: 'split audio',
    bin: command.bin,
    args: command.args,
  })

  return { file: { path: outDir } }
}

async function detectSilenceRanges(input: {
  inputPath: string
  db: string
  minDuration: string
}): Promise<SilenceRange[]> {
  const command = buildSilenceDetectCommand(input)
  // ffmpeg writes silencedetect events to stderr. Use
  // spawnAndCaptureStderr which tolerates non-zero exit.
  const stderr = await spawnAndCaptureStderr({
    verb: 'split audio',
    bin: command.bin,
    args: command.args,
  })

  const silences: Array<{ start: number; end?: number }> = []
  let duration = 0
  for (const line of stderr.split('\n')) {
    const startMatch = line.match(/silence_start:\s*([\d.]+)/)
    const endMatch = line.match(/silence_end:\s*([\d.]+)/)
    const dur = line.match(/Duration:\s*(\d+):(\d+):([\d.]+)/)
    if (startMatch) silences.push({ start: Number(startMatch[1]) })
    else if (endMatch && silences.length) {
      silences[silences.length - 1]!.end = Number(endMatch[1])
    }
    if (dur) {
      duration =
        Number(dur[1]) * 3600 + Number(dur[2]) * 60 + Number(dur[3])
    }
  }

  const ranges: SilenceRange[] = []
  let cursor = 0
  for (const s of silences) {
    if (s.start > cursor + 0.05) {
      ranges.push({ start: cursor, end: s.start })
    }
    if (s.end !== undefined) cursor = s.end
  }
  if (duration > cursor + 0.05) {
    ranges.push({ start: cursor, end: duration })
  }
  return ranges
}

const [splitAudioNode, testSplitAudioNode] = createNodeHandler({
  parsers: {
    input: SplitAudioNodeInputParser,
    local: SplitAudioNodeLocalInputParser,
    output: SplitAudioNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default splitAudioNode
export { splitAudioNode, testSplitAudioNode }
