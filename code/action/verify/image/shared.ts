import { getConfig } from '~/code/tool/shared/config.js'
import { ImageMagickFormat } from '~/code/type/shared/index.js'
import { testVerify } from '../shared.js'

export function testVerifyImageWithImageMagick(source) {
  if (!testVerify(source)) {
    return false
  }

  const { format: format } = source

  const IMAGE_MAGICK_FORMAT = getConfig('image_magick_format')

  if (!IMAGE_MAGICK_FORMAT.includes(format as ImageMagickFormat)) {
    return false
  }

  return true
}
