/**
 * `task remove exif` — surgical per-tag EXIF removal via exiftool.
 *
 * `task remove metadata` nukes every tag. This variant keeps the
 * rest of the metadata intact and only clears the tags you name.
 * Great for "drop GPS but keep camera settings" workflows.
 *
 * Tag names follow ExifTool's canonical form:
 *   `GPSLatitude`, `GPSLongitude`, `GPSAltitude`, `SerialNumber`,
 *   `OwnerName`, `Make`, `Model`, ... — any tag ExifTool knows.
 *
 * Quality-of-life presets:
 *   `--preset gps`     → every GPS:* tag
 *   `--preset device`  → Make / Model / SerialNumber / LensSerialNumber
 *   `--preset user`    → OwnerName / Creator / Artist / Copyright
 */

import fs from 'node:fs/promises'
import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import {
  buildCommandToRemoveExif,
  collectExifTags,
} from './command'
import {
  parseRemoveExifNode,
  testRemoveExifNode,
  type RemoveExifNodeInput,
  type RemoveExifNodeOutput,
} from './shared'

export type { RemoveExifNodeInput, RemoveExifNodeOutput }
export { testRemoveExifNode }

export async function removeExifNode(
  source: RemoveExifNodeInput,
): Promise<RemoveExifNodeOutput> {
  const src = parseRemoveExifNode(source)
  const tags = collectExifTags(src)
  if (tags.length === 0) {
    throw new Error(
      'remove exif: at least one --tag or --preset required. Use `task remove metadata` to strip all tags.',
    )
  }

  const out = src.overwrite
    ? src.input
    : (src.output ??
      siblingWithSuffix({ path: src.input, suffix: '.noexif' }))

  if (!src.overwrite) {
    await ensureParentDir(out)
    await fs.copyFile(src.input, out)
  }

  const command = buildCommandToRemoveExif({
    tags,
    outputPath: out,
  })
  await spawnAndWait({
    verb: 'remove exif',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: out } }
}
