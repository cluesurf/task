/**
 * `task resize video` -- ffmpeg `scale` filter. Using `-2` for an
 * omitted dimension preserves aspect ratio while keeping the
 * kept dimension divisible by 2 (required by H.264).
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToResizeVideo } from './command'

export type ResizeVideoNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  width?: number
  height?: number
}

export async function resizeVideoNode(source: ResizeVideoNodeInput) {
  if (!source.width && !source.height) {
    throw new Error('resize video: pass --width and/or --height')
  }
  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)

  const command = buildCommandToResizeVideo({
    inputPath: source.input.file.path,
    outputPath,
    width: source.width,
    height: source.height,
  })
  await spawnAndWait({
    verb: 'resize video',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

export default resizeVideoNode
