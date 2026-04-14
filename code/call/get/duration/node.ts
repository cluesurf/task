/**
 * `task get duration <file>` — ffprobe wrapper that returns the
 * duration of the file's first audio (or video) stream.
 *
 * The CLI spinner consumes the structured return; the formatted
 * value is also written to stdout so shell pipelines work
 * cleanly:
 *
 *   ms=$(task get duration song.mp3)
 *   formatted=$(task get duration song.mp3 --unit clock)
 */

import { exec } from '~/code/tool/node/process'
import { getCommand } from '~/code/tool/shared/command'

export type GetDurationNodeInput = {
  file: { path: string }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}

export type GetDurationNodeOutput = {
  file: { path: string }
  durationMs: number
  formatted: string
  unit: 'ms' | 's' | 'clock'
}

export async function getDurationNode(
  source: GetDurationNodeInput,
): Promise<GetDurationNodeOutput> {
  const stream = source.video ? 'v:0' : 'a:0'
  const cmd = getCommand('ffprobe')
  cmd.link.push(
    '-v',
    'quiet',
    '-select_streams',
    stream,
    '-show_entries',
    'stream=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    source.file.path,
  )
  const { stdout } = await exec(cmd.link)
  const seconds = Number.parseFloat(stdout.trim())
  if (!Number.isFinite(seconds)) {
    throw new Error(
      `ffprobe returned no duration for "${source.file.path}" — ` +
        `is it a valid ${source.video ? 'video' : 'audio'} file?`,
    )
  }

  const durationMs = Math.round(seconds * 1000)
  const unit = source.unit ?? 'ms'
  const formatted = formatDuration(durationMs, unit)

  // Print the formatted value on its own line for shell consumers.
  process.stdout.write(formatted + '\n')

  return {
    file: { path: source.file.path },
    durationMs,
    formatted,
    unit,
  }
}

function formatDuration(
  ms: number,
  unit: 'ms' | 's' | 'clock',
): string {
  switch (unit) {
    case 'ms':
      return String(ms)
    case 's':
      return (ms / 1000).toFixed(3)
    case 'clock': {
      const totalSeconds = Math.floor(ms / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60
      const millis = ms % 1000
      return (
        `${minutes}:` +
        `${String(seconds).padStart(2, '0')}.` +
        `${String(millis).padStart(3, '0')}`
      )
    }
  }
}
