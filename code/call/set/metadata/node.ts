/**
 * Embed audio metadata. Mirrors the
 * `deck/etch/scripts/audio/song-meta.sh` flow:
 *
 *   1. ffmpeg writes the base ID3v2.3 + (optional) cover art.
 *   2. id3v2 removes pre-existing USLT (lyrics) frames.
 *   3. eyeD3 writes UTF-16 lyrics for Apple Music compatibility.
 *
 * Steps 2 + 3 only run when `lyrics` is provided. ffmpeg always
 * runs (even if every metadata field is absent. The user got
 * us here intentionally; let them pass through with cover-only).
 *
 * Same path can be used for input + output: the function writes
 * to a tmp file then atomically renames over the input.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToAddLyricsWithEyeD3,
  buildCommandToRemoveLyricsWithId3v2,
  buildCommandToSetMetadataWithFfmpeg,
} from './command'

export type SetMetadataNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
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
  cover?: { file: { path: string } }
  lyrics?: { file: { path: string }; language?: string }
}

export type SetMetadataNodeOutput = {
  file: { path: string }
  steps: { ffmpeg: boolean; clearLyrics: boolean; addLyrics: boolean }
}

export async function setMetadataNode(
  source: SetMetadataNodeInput,
): Promise<SetMetadataNodeOutput> {
  const inputPath = source.input.file.path
  const outputPath = source.output.file.path

  const samePath = path.resolve(inputPath) === path.resolve(outputPath)
  const tmpOut = samePath
    ? path.join(
        os.tmpdir(),
        `set-meta.${process.pid}.${Date.now()}${path.extname(outputPath)}`,
      )
    : outputPath

  await ensureParentDir(tmpOut)

  const ffmpegCmd = buildCommandToSetMetadataWithFfmpeg({
    input: inputPath,
    output: tmpOut,
    cover: source.cover?.file.path,
    title: source.title,
    artist: source.artist,
    album: source.album,
    albumArtist: source.albumArtist,
    composer: source.composer,
    track: source.track,
    disc: source.disc,
    genre: source.genre,
    year: source.year,
    publisher: source.publisher,
    website: source.website,
    comment: source.comment,
  })
  await spawnAndWait({
    verb: 'set metadata',
    bin: ffmpegCmd.bin,
    args: ffmpegCmd.args,
  })

  if (samePath) {
    await fs.rename(tmpOut, outputPath)
  }

  let clearedLyrics = false
  let addedLyrics = false
  if (source.lyrics?.file?.path) {
    const clearCmd = buildCommandToRemoveLyricsWithId3v2({
      inputPath: outputPath,
    })
    await spawnAndWait({
      verb: 'set metadata (clear lyrics)',
      bin: clearCmd.bin,
      args: clearCmd.args,
    })
    clearedLyrics = true

    const lyricsCmd = buildCommandToAddLyricsWithEyeD3({
      inputPath: outputPath,
      lyricsFile: source.lyrics.file.path,
      language: source.lyrics.language ?? 'eng',
    })
    await spawnAndWait({
      verb: 'set metadata (add lyrics)',
      bin: lyricsCmd.bin,
      args: lyricsCmd.args,
    })
    addedLyrics = true
  }

  return {
    file: { path: outputPath },
    steps: {
      ffmpeg: true,
      clearLyrics: clearedLyrics,
      addLyrics: addedLyrics,
    },
  }
}

export default setMetadataNode
