/**
 * Pure argv builders for the three-step `set metadata` workflow.
 * Pure functions -- no execution. The runner in `./node.ts`
 * decides which sequences to skip when an input is absent.
 */

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
 * Step 1 -- ffmpeg writes ID3v2.3 + (optional) embedded cover
 * art. Always re-encoded to a fresh container at `output`; the
 * caller atomically renames if an in-place edit was requested.
 */
export function buildCommandToSetMetadataWithFfmpeg(
  input: SetMetadataInput,
): { bin: 'ffmpeg'; args: string[] } {
  const args: string[] = ['-nostdin', '-y', '-i', input.input]

  if (input.cover) {
    args.push('-i', input.cover, '-map', '0:a', '-map', '1:v')
    args.push('-c:a', 'copy', '-c:v', 'mjpeg')
  } else {
    args.push('-c:a', 'copy')
  }

  args.push('-id3v2_version', '3', '-write_id3v1', '1')

  pushMeta(args, 'title', input.title)
  pushMeta(args, 'artist', input.artist)
  pushMeta(args, 'album_artist', input.albumArtist ?? input.artist)
  pushMeta(args, 'composer', input.composer ?? input.artist)
  pushMeta(args, 'album', input.album)
  pushMeta(args, 'track', input.track)
  pushMeta(args, 'disc', input.disc)
  pushMeta(args, 'genre', input.genre)
  pushMeta(args, 'date', input.year)
  pushMeta(args, 'publisher', input.publisher)
  pushMeta(args, 'website', input.website)
  pushMeta(args, 'comment', input.comment)

  if (input.cover) {
    args.push(
      '-metadata:s:v',
      'title=Album cover',
      '-metadata:s:v',
      'comment=Cover (front)',
    )
  }

  args.push(input.output)
  return { bin: 'ffmpeg', args }
}

function pushMeta(
  args: string[],
  key: string,
  value: string | undefined,
) {
  if (value === undefined || value === '') return
  args.push('-metadata', `${key}=${value}`)
}

/**
 * Step 2 -- id3v2 removes any pre-existing USLT (lyrics) frame.
 * Idempotent: invoking it on a file with no USLT is a no-op.
 */
export function buildCommandToRemoveLyricsWithId3v2(input: {
  inputPath: string
}): { bin: 'id3v2'; args: string[] } {
  return { bin: 'id3v2', args: ['--remove-frame', 'USLT', input.inputPath] }
}

/**
 * Step 3 -- eyeD3 writes UTF-16 lyrics in a v2.3 USLT frame
 * (Apple Music compatibility).
 */
export function buildCommandToAddLyricsWithEyeD3(input: {
  inputPath: string
  lyricsFile: string
  language?: string
}): { bin: 'eyeD3'; args: string[] } {
  const lang = input.language ?? 'eng'
  const args = [
    '--to-v2.3',
    '--encoding',
    'utf16',
    `--add-lyrics=${input.lyricsFile}::${lang}`,
    input.inputPath,
  ]
  return { bin: 'eyeD3', args }
}
