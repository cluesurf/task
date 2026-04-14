/**
 * `task remove metadata` — strip every metadata tag. Routes by
 * extension to the tool that actually handles that container:
 *
 *   audio / video  →  ffmpeg -map_metadata -1 -c copy
 *                     (MP3, WAV, FLAC, OGG, M4A, MP4, MOV, MKV,
 *                     WEBM — exiftool refuses to write most of
 *                     these)
 *   everything     →  exiftool -all= -overwrite_original
 *                     (images, PDFs, and the rest — the path
 *                     exiftool was written for)
 *
 * ffmpeg won't read-and-write the same path, so in-place mode
 * goes through a sibling tmp file and renames on success.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type RemoveMetadataNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
}

const FFMPEG_EXTS = new Set([
  '.mp3', '.wav', '.flac', '.ogg', '.opus', '.m4a', '.aac',
  '.mp4', '.mov', '.mkv', '.webm', '.avi', '.m4v',
])

export async function removeMetadataNode(source: RemoveMetadataNodeInput) {
  const inputPath = source.input.file.path
  const outputPath = source.output?.file?.path ?? inputPath
  const inPlace = path.resolve(inputPath) === path.resolve(outputPath)
  const ext = path.extname(outputPath).toLowerCase()

  if (FFMPEG_EXTS.has(ext)) {
    // ffmpeg refuses to read and write the same path. For an
    // in-place edit, write to a tmp file and rename over the
    // input on success; for explicit -o, write straight there.
    const target = inPlace
      ? path.join(
          os.tmpdir(),
          `remove-metadata.${process.pid}.${Date.now()}${ext}`,
        )
      : outputPath
    if (!inPlace) {
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
    }
    const cmd = getCommand('ffmpeg')
    cmd.link.push(
      '-y',
      '-i',
      inputPath,
      '-map_metadata',
      '-1',
      '-c',
      'copy',
      target,
    )
    await runCommandSequence(buildCommandSequence(cmd))
    if (inPlace) await fs.rename(target, inputPath)
    return { file: { path: outputPath } }
  }

  // Images, PDFs, and everything else — exiftool handles in-place
  // natively via `-overwrite_original`.
  if (!inPlace) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.copyFile(inputPath, outputPath)
  }
  const cmd = getCommand('exiftool')
  cmd.link.push('-all=', '-overwrite_original', outputPath)
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
