import {
  VerifyImageWithImageMagick,
} from '~/code/form/action/verify/image/shared'
import {
  ImageMagickFormat,
} from '~/code/form/object/imagemagick'
import { buildCommandToVerifyImageWithImageMagick } from './command'
import { testVerifyImageWithImageMagick } from './shared'
import { spawnAndCapture } from '~/code/tool/node/spawn'
import { getConfig } from '~/code/tool/shared/config'
import snakeCase from 'lodash/snakeCase'

const IMAGEMAGICK_FORMAT_VARIANT_NAME: Record<string, Array<string>> = {
  jpeg: ['jpg'],
  jpg: ['jpeg'],
}

async function verifyImageWithImageMagickNode(
  input: VerifyImageWithImageMagick,
) {
  const { bin, args } = buildCommandToVerifyImageWithImageMagick(input)
  const stdout = await spawnAndCapture({ verb: 'verify', bin, args })
  const pattern = /^([^\s]+)\s+(\w+)/i
  stdout.match(pattern)
  const data = {
    format: snakeCase(RegExp.$2) as ImageMagickFormat,
  }
  const IMAGE_MAGICK_FORMAT = getConfig('image_magick_format')
  if (
    IMAGE_MAGICK_FORMAT.includes(data.format) &&
    isFormatMatch(data.format, input.format)
  ) {
    return true
  }
  return false
}

function isFormatMatch(a: string, b: string) {
  if (a === b) {
    return true
  }
  const v = IMAGEMAGICK_FORMAT_VARIANT_NAME[a]
  if (v) {
    for (const x of v) {
      if (x === b) {
        return true
      }
    }
  }
  return false
}

export function testVerifyImageWithImageMagickNode(
  source,
): source is VerifyImageWithImageMagick {
  if (!testVerifyImageWithImageMagick(source)) {
    return false
  }

  return true
}

export default verifyImageWithImageMagickNode
export { verifyImageWithImageMagickNode }
