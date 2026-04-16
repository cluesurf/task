// ffmpeg as a convert/image backend for *animated* formats:
// gif <-> apng <-> webp <-> mp4. For non-animated stills use
// convert/image/imagemagick. For plain video conversion use
// convert/video/ffmpeg.

import type {
  ConvertImageWithFfmpegNodeInput,
  ConvertImageWithFfmpegNodeLocalInput,
} from '~/code/form/action/convert/image/ffmpeg/node'
import {
  ConvertImageWithFfmpegNodeInputParser,
  ConvertImageWithFfmpegNodeLocalInputParser,
  ConvertImageWithFfmpegNodeOutputParser,
} from '~/code/form/action/convert/image/ffmpeg/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithFfmpeg } from './command'

async function runLocal(input: ConvertImageWithFfmpegNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithFfmpeg({
    inputPath,
    outputPath,
    outputFormat: input.outputFormat,
    fps: input.fps,
    quality: input.quality,
    loop: input.loop,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [convertImageWithFfmpegNode, testConvertImageWithFfmpegNode] =
  createNodeHandler({
    parsers: {
      input: ConvertImageWithFfmpegNodeInputParser,
      local: ConvertImageWithFfmpegNodeLocalInputParser,
      output: ConvertImageWithFfmpegNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export default convertImageWithFfmpegNode
export { convertImageWithFfmpegNode, testConvertImageWithFfmpegNode }
export type { ConvertImageWithFfmpegNodeInput }
