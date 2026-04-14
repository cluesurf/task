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
import path from 'node:path'
import { spawn } from 'node:child_process'

export type RemoveExifPreset = 'gps' | 'device' | 'user'

export type RemoveExifNodeInput = {
  input: string
  output?: string
  tag?: string[]
  preset?: RemoveExifPreset[]
  overwrite?: boolean
}

export type RemoveExifNodeOutput = { file: { path: string } }

const PRESET_TAGS: Record<RemoveExifPreset, string[]> = {
  gps:    ['GPS:all'],
  device: ['Make', 'Model', 'SerialNumber', 'LensSerialNumber', 'InternalSerialNumber'],
  user:   ['OwnerName', 'Creator', 'Artist', 'Copyright', 'By-line'],
}

export async function removeExifNode(
  src: RemoveExifNodeInput,
): Promise<RemoveExifNodeOutput> {
  const tags = [
    ...(src.tag ?? []),
    ...(src.preset ?? []).flatMap(p => PRESET_TAGS[p]),
  ]
  if (tags.length === 0) {
    throw new Error(
      'remove exif: at least one --tag or --preset required. Use `task remove metadata` to strip all tags.',
    )
  }

  const out = src.overwrite
    ? src.input
    : src.output ?? siblingWithSuffix(src.input, '.noexif')

  if (!src.overwrite) {
    await fs.mkdir(path.dirname(out), { recursive: true })
    await fs.copyFile(src.input, out)
  }

  const args: string[] = ['-overwrite_original']
  for (const tag of tags) args.push(`-${tag}=`)
  args.push(out)

  await run('exiftool', args)
  return { file: { path: out } }
}

function siblingWithSuffix(p: string, suffix: string): string {
  const ext = path.extname(p)
  return p.slice(0, -ext.length) + suffix + ext
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', err =>
      reject(enoentHint(cmd, err, 'brew install exiftool  or  apt install libimage-exiftool-perl')),
    )
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`remove exif: exiftool exited with code ${code}`))
    })
  })
}

function enoentHint(cmd: string, err: unknown, hint: string): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `remove exif: \`${cmd}\` not found. Install: ${hint}`
      : `remove exif: ${cmd} failed — ${(err as Error).message}`,
  )
}
