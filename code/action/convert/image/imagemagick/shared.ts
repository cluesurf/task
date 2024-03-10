import {
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
} from '~/code/type/shared'
import { testConvertFileInputOutput } from '../../shared'
import { getConfig } from '~/code/tool/shared/config'

export function testConvertImageWithImageMagick(input: any) {
  if (!testConvertFileInputOutput(input)) {
    return false
  }

  const {
    input: { format: a },
    output: { format: b },
  } = input

  if (a === b) {
    return false
  }
  const IMAGE_MAGICK_INPUT_FORMAT = getConfig(
    'image-magick-input-format',
  )
  const IMAGE_MAGICK_OUTPUT_FORMAT = getConfig(
    'image-magick-output-format',
  )
  if (
    !IMAGE_MAGICK_INPUT_FORMAT.includes(a as ImageMagickInputFormat)
  ) {
    return false
  }
  if (
    !IMAGE_MAGICK_OUTPUT_FORMAT.includes(b as ImageMagickOutputFormat)
  ) {
    return false
  }
  return true
}
