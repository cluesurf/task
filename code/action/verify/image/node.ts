import {
  ImageMagickFormat,
  VerifyImageWithImageMagick,
} from '~/code/type/node/parser'
import { buildCommandToVerifyImageWithImageMagick } from './command'
import { testVerifyImageWithImageMagick } from './shared'
import { runCommandSequence } from '~/code/tool/node/command'
import { getConfig } from '~/code/tool/shared/config'

const IMAGEMAGICK_FORMAT_VARIANT_NAME: Record<string, Array<string>> = {
  jpeg: ['jpg'],
  jpg: ['jpeg'],
}

export async function verifyImageWithImageMagickNode(
  input: VerifyImageWithImageMagick,
) {
  const sequence = buildCommandToVerifyImageWithImageMagick(input)
  const data = (await runCommandSequence(sequence)) as unknown as {
    format: ImageMagickFormat
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
