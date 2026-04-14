/**
 * Pure argv builders for the three-step `set metadata` workflow.
 * Pure functions — no execution. The runner in `./node.ts`
 * decides which sequences to skip when an input is absent.
 */

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export type SetMetadataInput = {
  input: string
  output: string
  cover?: string
  title?: string
  artist?: string
  album?: string
  albumArtist?: string
  composer?: string
  track?: string
  disc?: string
  genre?: string
  year?: string
  publisher?: string
  website?: string
  comment?: string
}

/**
 * Step 1 — ffmpeg writes ID3v2.3 + (optional) embedded cover
 * art. Always re-encoded to a fresh container at `output`; the
 * caller atomically renames if an in-place edit was requested.
 */
export function buildFfmpegMetadataCommand(input: SetMetadataInput) {
  const cmd = getCommand('ffmpeg')
  cmd.link.push('-nostdin', '-y', '-i', input.input)

  if (input.cover) {
    cmd.link.push('-i', input.cover, '-map', '0:a', '-map', '1:v')
    cmd.link.push('-c:a', 'copy', '-c:v', 'mjpeg')
  } else {
    cmd.link.push('-c:a', 'copy')
  }

  cmd.link.push('-id3v2_version', '3', '-write_id3v1', '1')

  pushMeta(cmd, 'title', input.title)
  pushMeta(cmd, 'artist', input.artist)
  pushMeta(cmd, 'album_artist', input.albumArtist ?? input.artist)
  pushMeta(cmd, 'composer', input.composer ?? input.artist)
  pushMeta(cmd, 'album', input.album)
  pushMeta(cmd, 'track', input.track)
  pushMeta(cmd, 'disc', input.disc)
  pushMeta(cmd, 'genre', input.genre)
  pushMeta(cmd, 'date', input.year)
  pushMeta(cmd, 'publisher', input.publisher)
  pushMeta(cmd, 'website', input.website)
  pushMeta(cmd, 'comment', input.comment)

  if (input.cover) {
    cmd.link.push(
      '-metadata:s:v',
      'title=Album cover',
      '-metadata:s:v',
      'comment=Cover (front)',
    )
  }

  cmd.link.push(input.output)
  return buildCommandSequence(cmd)
}

function pushMeta(
  cmd: { link: string[] },
  key: string,
  value: string | undefined,
) {
  if (value === undefined || value === '') return
  cmd.link.push('-metadata', `${key}=${value}`)
}

/**
 * Step 2 — id3v2 removes any pre-existing USLT (lyrics) frame.
 * Idempotent: invoking it on a file with no USLT is a no-op.
 */
export function buildId3v2RemoveLyricsCommand({
  input,
}: {
  input: string
}) {
  const cmd = getCommand('id3v2')
  cmd.link.push('--remove-frame', 'USLT', input)
  return buildCommandSequence(cmd)
}

/**
 * Step 3 — eyeD3 writes UTF-16 lyrics in a v2.3 USLT frame
 * (Apple Music compatibility).
 */
export function buildEyeD3LyricsCommand({
  input,
  lyricsFile,
  language = 'eng',
}: {
  input: string
  lyricsFile: string
  language?: string
}) {
  const cmd = getCommand('eyeD3')
  cmd.link.push(
    '--to-v2.3',
    '--encoding',
    'utf16',
    `--add-lyrics=${lyricsFile}::${language}`,
    input,
  )
  return buildCommandSequence(cmd)
}
