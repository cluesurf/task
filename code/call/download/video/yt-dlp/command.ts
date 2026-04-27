/**
 * `yt-dlp` argv builder. Despite the name, yt-dlp handles 1500+
 * sites (YouTube, TikTok, Twitter/X, Instagram, Vimeo,
 * SoundCloud, Twitch VODs, etc.). The CLI exposes a thin
 * verb-flavored wrapper; ergonomic details (cookies, OAuth,
 * format-pinning) come through `extra`.
 */

export type DownloadVideoYtDlpCommandInput = {
  url: string
  /** Output path template (default: `%(title)s [%(id)s].%(ext)s`). */
  output?: string
  /** Format selector (default: `bestvideo*+bestaudio/best`). */
  format?: string
  /** Container preference for the merged file (mp4 / mkv / webm / mov). */
  remux?: 'mp4' | 'mkv' | 'webm' | 'mov'
  /** Audio-only extraction. Picks `audioFormat` when set. */
  audioOnly?: boolean
  audioFormat?: 'mp3' | 'm4a' | 'opus' | 'wav' | 'flac' | 'best'
  /** Embed thumbnail / chapters / metadata in the output container. */
  embedThumbnail?: boolean
  embedChapters?: boolean
  embedMetadata?: boolean
  /** Auto-download captions for the chosen language(s). */
  subtitles?: string[]
  /** Restrict to a playlist range (1-indexed, inclusive). */
  playlistStart?: number
  playlistEnd?: number
  /** Use a cookies file (Netscape format). */
  cookies?: string
  /** Limit download rate (e.g. `2M`, `500K`). */
  rateLimit?: string
  /** Skip files already on disk. */
  skipExisting?: boolean
  /** Extra raw args appended at the end. */
  extra?: string[]
}

export function buildCommandToDownloadVideoYtDlp(
  input: DownloadVideoYtDlpCommandInput,
): { bin: 'yt-dlp'; args: string[] } {
  if (!input.url) {
    throw new Error('download video yt-dlp: url is required')
  }
  const args: string[] = []

  if (input.output) args.push('-o', input.output)
  if (input.format) args.push('-f', input.format)
  if (input.remux) args.push('--remux-video', input.remux)

  if (input.audioOnly) {
    args.push('-x')
    if (input.audioFormat) args.push('--audio-format', input.audioFormat)
  }

  if (input.embedThumbnail) args.push('--embed-thumbnail')
  if (input.embedChapters) args.push('--embed-chapters')
  if (input.embedMetadata) args.push('--embed-metadata')

  if (input.subtitles && input.subtitles.length > 0) {
    args.push('--write-subs', '--sub-langs', input.subtitles.join(','))
  }

  if (input.playlistStart !== undefined) {
    args.push('--playlist-start', String(input.playlistStart))
  }
  if (input.playlistEnd !== undefined) {
    args.push('--playlist-end', String(input.playlistEnd))
  }
  if (input.cookies) args.push('--cookies', input.cookies)
  if (input.rateLimit) args.push('--limit-rate', input.rateLimit)
  if (input.skipExisting) args.push('--no-overwrites')
  if (input.extra) args.push(...input.extra)

  args.push(input.url)
  return { bin: 'yt-dlp', args }
}
