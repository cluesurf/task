/**
 * `task split audio` — two modes:
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
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'
import { exec } from '~/code/tool/node/process'

export type SplitAudioNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}

export async function splitAudioNode(source: SplitAudioNodeInput) {
  const inputPath = source.input.file.path
  const explicitOut = source.output?.file?.path
  const outDir = explicitOut
    ? path.resolve(explicitOut).toLowerCase() ===
      path.resolve(inputPath).toLowerCase()
      ? path.dirname(inputPath)
      : explicitOut
    : path.dirname(inputPath)
  const stem = path.basename(inputPath, path.extname(inputPath))
  const ext = path.extname(inputPath)

  await fs.mkdir(outDir, { recursive: true })

  if (source.segments === 'silence') {
    const ranges = await detectSilenceRanges({
      input: inputPath,
      db: source.silenceDb ?? '-30',
      minDuration: source.silenceDuration ?? '0.5',
    })
    const parts: string[] = []
    for (let i = 0; i < ranges.length; i++) {
      const { start, end } = ranges[i]!
      const partPath = path.join(
        outDir,
        `${stem}.part-${String(i + 1).padStart(3, '0')}${ext}`,
      )
      const cmd = getCommand('ffmpeg')
      cmd.link.push(
        '-y',
        '-i',
        inputPath,
        '-ss',
        String(start),
        '-to',
        String(end),
        '-c',
        'copy',
        partPath,
      )
      await runCommandSequence(buildCommandSequence(cmd))
      parts.push(partPath)
    }
    return { parts, mode: 'silence' as const }
  }

  // Fixed duration. ffmpeg's segment muxer handles the cut points
  // with frame accuracy so we don't have to loop in JS.
  const chunkSeconds = Number(source.segments)
  if (!Number.isFinite(chunkSeconds) || chunkSeconds <= 0) {
    throw new Error(
      `split audio: --segments must be 'silence' or a positive number of seconds (got "${source.segments}")`,
    )
  }
  const pattern = path.join(outDir, `${stem}.part-%03d${ext}`)
  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    inputPath,
    '-f',
    'segment',
    '-segment_time',
    String(chunkSeconds),
    '-c',
    'copy',
    pattern,
  )
  await runCommandSequence(buildCommandSequence(cmd))

  // ffmpeg doesn't report the emitted filenames; list them by
  // walking the directory for the pattern we asked it to produce.
  const files = await fs.readdir(outDir)
  const rx = new RegExp(
    `^${escapeRegex(stem)}\\.part-\\d+${escapeRegex(ext)}$`,
  )
  const parts = files
    .filter(f => rx.test(f))
    .sort()
    .map(f => path.join(outDir, f))
  return { parts, mode: 'fixed' as const }
}

type SilenceRange = { start: number; end: number }

/**
 * Probe the file with ffmpeg's `silencedetect` filter and walk
 * the reported silence boundaries into non-silent `{start, end}`
 * ranges. ffmpeg writes the detector events to stderr, so we read
 * from there; the filter reports `silence_start: T` and
 * `silence_end: T | silence_duration: D` pairs.
 */
async function detectSilenceRanges(input: {
  input: string
  db: string
  minDuration: string
}): Promise<SilenceRange[]> {
  const filter = `silencedetect=noise=${input.db}dB:d=${input.minDuration}`
  const { stderr } = await exec([
    'ffmpeg',
    '-hide_banner',
    '-nostats',
    '-i',
    input.input,
    '-af',
    filter,
    '-f',
    'null',
    '-',
  ]).catch(err => {
    // ffmpeg exits 0 here but capture anyway in case of odd builds.
    if ('data' in (err as object)) {
      const d = (err as { data: { stderr?: string } }).data
      return { stdout: '', stderr: d.stderr ?? '' }
    }
    throw err
  })

  const silences: Array<{ start: number; end?: number }> = []
  let duration = 0
  for (const line of stderr.split('\n')) {
    const start = line.match(/silence_start:\s*([\d.]+)/)
    const end = line.match(/silence_end:\s*([\d.]+)/)
    const dur = line.match(/Duration:\s*(\d+):(\d+):([\d.]+)/)
    if (start) silences.push({ start: Number(start[1]) })
    else if (end && silences.length) {
      silences[silences.length - 1]!.end = Number(end[1])
    }
    if (dur) {
      duration =
        Number(dur[1]) * 3600 + Number(dur[2]) * 60 + Number(dur[3])
    }
  }

  // Invert: the non-silent ranges are what we actually want to
  // cut out. Start at 0, end at input duration, subtract every
  // silence window.
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

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
