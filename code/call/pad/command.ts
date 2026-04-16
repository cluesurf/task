/**
 * Pure argv builders for `task pad`.
 *
 * `ffprobe` reports current duration. `ffmpeg` mixes the input
 * with `anullsrc` for the missing tail and re-encodes with the
 * codec that matches the output extension.
 *
 * No execution here. The runner in `./node.ts` invokes via
 * `spawnAndWait` / `spawnAndCapture`.
 */

const CODEC_BY_EXT: Record<string, string> = {
  mp3: 'libmp3lame',
  wav: 'pcm_s16le',
  flac: 'flac',
  ogg: 'libvorbis',
  opus: 'libopus',
  m4a: 'aac',
  aac: 'aac',
}

/** ffprobe: report stream-0 duration in seconds (float). */
export function buildFfprobeDurationCommand(
  input: string,
): { bin: 'ffprobe'; args: string[] } {
  return {
    bin: 'ffprobe',
    args: [
      '-v',
      'quiet',
      '-select_streams',
      'a:0',
      '-show_entries',
      'stream=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      input,
    ],
  }
}

export type BuildPadAudioInput = {
  input: string
  output: string
  /** Seconds of silence to append. */
  padSeconds: number
  sampleRate?: number
  channels?: number
}

/**
 * ffmpeg: concat the input with `anullsrc` of `padSeconds` and
 * write to `output`. Codec inferred from output extension.
 */
export function buildPadAudioCommand({
  input,
  output,
  padSeconds,
  sampleRate = 48000,
  channels = 2,
}: BuildPadAudioInput): { bin: 'ffmpeg'; args: string[] } {
  const ext = output.split('.').pop()?.toLowerCase() ?? 'mp3'
  const codec = CODEC_BY_EXT[ext] ?? 'libmp3lame'
  const layout = channels === 1 ? 'mono' : 'stereo'

  return {
    bin: 'ffmpeg',
    args: [
      '-nostdin',
      '-y',
      '-i',
      input,
      '-f',
      'lavfi',
      '-t',
      padSeconds.toFixed(3),
      '-i',
      `anullsrc=r=${sampleRate}:cl=${layout}`,
      '-filter_complex',
      '[0:a][1:a]concat=n=2:v=0:a=1',
      '-c:a',
      codec,
      output,
    ],
  }
}

/**
 * ffmpeg: straight passthrough copy when the input is already at
 * least `to` long. Avoids re-encoding loss.
 */
export function buildCopyAudioCommand({
  input,
  output,
}: {
  input: string
  output: string
}): { bin: 'ffmpeg'; args: string[] } {
  return {
    bin: 'ffmpeg',
    args: ['-nostdin', '-y', '-i', input, '-c', 'copy', output],
  }
}

/**
 * Parse a duration string into milliseconds. Accepts:
 *   `MM:SS.mmm`   ->  M*60000 + S*1000 + ms
 *   `SS.mmm`      ->  S*1000 + ms
 *   `Ns`          ->  N*1000  (`s` suffix optional)
 */
export function parseDurationMs(raw: string): number {
  const trimmed = raw.trim().replace(/s$/i, '')
  const colon = trimmed.match(/^(\d+):([0-5]\d)(?:\.(\d{1,3}))?$/)
  if (colon) {
    const [, mm, ss, ms] = colon
    return (
      Number(mm) * 60000 +
      Number(ss) * 1000 +
      (ms ? Number(ms.padEnd(3, '0')) : 0)
    )
  }
  const seconds = Number(trimmed)
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.round(seconds * 1000)
  }
  throw new Error(
    `Invalid duration "${raw}" -- use MM:SS.mmm, seconds, or Ns`,
  )
}
