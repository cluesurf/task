/**
 * `task download video <url>` — wraps `yt-dlp` (1500+ sites:
 * YouTube, TikTok, Twitter/X, Instagram, Vimeo, SoundCloud,
 * Twitch, etc.). Today yt-dlp is the only backend; the per-tool
 * subdir layout leaves room for future alternatives (pytube,
 * gallery-dl) without churning the public CLI shape.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task download video',
  describe: 'Download a video (or audio-only) from any yt-dlp-supported site',
  options: [
    { long: 'output', short: 'o', describe: 'Output path / template' },
    { long: 'video-format', describe: 'yt-dlp format selector (e.g. "bv*+ba/b")' },
    { long: 'remux', describe: 'Remux container: mp4 / mkv / webm / mov' },
    { long: 'audio-only', describe: 'Strip the video stream (audio extraction)' },
    { long: 'audio-format', describe: 'mp3 / m4a / opus / wav / flac / best' },
    { long: 'embed-thumbnail', describe: 'Embed the cover thumbnail' },
    { long: 'embed-chapters', describe: 'Embed chapter markers' },
    { long: 'embed-metadata', describe: 'Embed title / artist / album metadata' },
    { long: 'subtitles', describe: 'Comma-separated subtitle languages (`en,es`)' },
    { long: 'playlist-start', describe: 'Playlist range start (1-indexed)' },
    { long: 'playlist-end', describe: 'Playlist range end (inclusive)' },
    { long: 'cookies', describe: 'Cookies file (Netscape format)' },
    { long: 'rate-limit', describe: 'Bandwidth cap (e.g. 2M, 500K)' },
    { long: 'skip-existing', describe: "Don't overwrite files already on disk" },
  ],
  examples: [
    { comment: 'standard YouTube grab', command: 'task download video https://youtu.be/dQw4w9WgXcQ' },
    {
      comment: 'audio-only mp3',
      command: 'task download video https://youtu.be/abc --audio-only --audio-format mp3',
    },
    {
      comment: 'pin format + embed metadata',
      command: 'task download video https://youtu.be/abc -f "bv*+ba/b[height<=1080]" --embed-thumbnail --embed-metadata',
    },
    {
      comment: 'first 5 of a playlist',
      command: 'task download video https://www.youtube.com/playlist?list=XYZ --playlist-end 5',
    },
  ],
})

export const downloadVideoConsole: CommandModule = {
  command: 'video <url>',
  describe: 'Download a video / audio off any yt-dlp-supported site',
  builder: y =>
    y
      .positional('url', { type: 'string', demandOption: true })
      .option('output', { alias: 'o', type: 'string' })
      .option('video-format', {
        type: 'string',
        describe: 'yt-dlp format selector (e.g. "bestvideo*+bestaudio/best")',
      })
      .option('remux', {
        type: 'string',
        choices: ['mp4', 'mkv', 'webm', 'mov'] as const,
      })
      .option('audio-only', { type: 'boolean', default: false })
      .option('audio-format', {
        type: 'string',
        choices: ['mp3', 'm4a', 'opus', 'wav', 'flac', 'best'] as const,
      })
      .option('embed-thumbnail', { type: 'boolean', default: false })
      .option('embed-chapters', { type: 'boolean', default: false })
      .option('embed-metadata', { type: 'boolean', default: false })
      .option('subtitles', { type: 'string' })
      .option('playlist-start', { type: 'number' })
      .option('playlist-end', { type: 'number' })
      .option('cookies', { type: 'string' })
      .option('rate-limit', { type: 'string' })
      .option('skip-existing', { type: 'boolean', default: false }),
  handler: async argv => {
    const { downloadVideoYtDlpNode } = await import('./yt-dlp/node')
    await downloadVideoYtDlpNode({
      url: argv.url as string,
      output: argv.output as string | undefined,
      format: argv['video-format'] as string | undefined,
      remux: argv.remux as 'mp4' | 'mkv' | 'webm' | 'mov' | undefined,
      audioOnly: argv['audio-only'] as boolean,
      audioFormat: argv['audio-format'] as
        | 'mp3' | 'm4a' | 'opus' | 'wav' | 'flac' | 'best'
        | undefined,
      embedThumbnail: argv['embed-thumbnail'] as boolean,
      embedChapters: argv['embed-chapters'] as boolean,
      embedMetadata: argv['embed-metadata'] as boolean,
      subtitles: argv.subtitles
        ? (argv.subtitles as string).split(',').map(s => s.trim())
        : undefined,
      playlistStart: argv['playlist-start'] as number | undefined,
      playlistEnd: argv['playlist-end'] as number | undefined,
      cookies: argv.cookies as string | undefined,
      rateLimit: argv['rate-limit'] as string | undefined,
      skipExisting: argv['skip-existing'] as boolean,
    })
  },
}
