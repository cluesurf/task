import {
  ConvertImageWithImageMagickCommandInput,
} from '~/code/form/action/convert/imagemagick/cli'
import {
  ConvertImageWithInkscapeCommandInput,
} from '~/code/form/action/convert/inkscape/cli'
import { resolvePathRelativeToScope } from '~/code/tool/shared/file'
import { getConfig } from '~/code/tool/shared/config'

// export function BatchProcessImages() {
//   const cmd = [
//     `mogrify`,
//     `-format`,
//     `jpg`,
//     `-path`,
//     `./new_folder`,
//     `*.png`,
//   ]
//   return [cmd]
// }

export function buildCommandToConvertImageWithImageMagick(
  input: ConvertImageWithImageMagickCommandInput,
): { bin: string; args: string[] } {
  const ip = resolvePathRelativeToScope(
    input.input.file.path,
    input.pathScope,
  )
  const op = resolvePathRelativeToScope(
    input.output.file!.path,
    input.pathScope,
  )

  const bin = 'convert'
  const args: string[] = []

  const inputPath = ip.match(/\.cr2$/i) ? `cr2:${ip}` : ip

  args.push(inputPath)

  if (input.compare) {
    args.push(`-compare`)
  }

  if (input.colorMatrix) {
    args.push(
      `-color-matrix`,
      `${input.colorMatrix.row}x${
        input.colorMatrix.column
      }: ${input.colorMatrix.value.join(' ')}`,
    )
  }

  if (input.colorSpace) {
    const IMAGE_MAGICK_COLOR_SPACE_CONTENT = getConfig(
      'image_magick_color_space_content',
    )
    args.push(
      `-colorspace`,
      IMAGE_MAGICK_COLOR_SPACE_CONTENT[input.colorSpace].head,
    )
  }

  if (input.compression) {
    const IMAGE_MAGICK_COMPRESSION_CONTENT = getConfig(
      'image_magick_compression_content',
    )
    args.push(
      `-compress`,
      IMAGE_MAGICK_COMPRESSION_CONTENT[input.compression]
        .head as string,
    )
  }
  if (input.colorCount) {
    args.push(`-colors`, String(input.colorCount))
  }

  if (input.density) {
    args.push(`-density`, String(input.density))
  }

  if (input.quality) {
    args.push(`-quality`, String(input.quality))
  }

  args.push(op)

  // const cmd = [
  //   `magick`,
  //   `-size`,
  //   `320x85`,
  //   `canvas:none`,
  //   `-font`,
  //   `Bookman-DemiItalic`,
  //   `-pointsize`,
  //   `72`,
  //   `-draw`,
  //   `"text`,
  //   `25,60`,
  //   `\'Magick\'"`,
  //   `-channel`,
  //   `RGBA`,
  //   `-blur`,
  //   `0x6`,
  //   `-fill`,
  //   `darkred`,
  //   `-stroke`,
  //   `magenta`,
  //   `-draw`,
  //   `"text`,
  //   `20,55`,
  //   `\'Magick\'"`,
  //   `fuzzy-magick.png`,
  // ]
  return { bin, args }
}

// export async function replaceImageColorWithImageMagick(
//   input: ReplaceImageColorWithImageMagick,
// ) {
//   let cmd = getCommand(`convert`)
//   cmd.link.push(`"${inputPath}"`)
//   if (fuzz) {
//     cmd.link.push(`-fuzz`, `${fuzz}%`)
//   }
//   cmd.link.push(`-fill`, `"${endColor}"`, `-opaque`, `"${startColor}"`)
//   cmd.link.push(`"${outputPath}"`)

//   return [cmd]
// }

// export async function ResizeImageWithImageMagick(source) {
//   const { inputPath, outputPath, width, height, stretch, gravity } =
//     ResizeImageWithImageMagickParser.parse(source)

//   let scale: string = ''
//   if (width) {
//     if (height) {
//       scale += `${width}x${height}`
//     } else {
//       scale += `${width}x`
//     }
//   } else {
//     scale += `x${height}`
//   }
//   let resize = `${scale}${stretch ? '!' : ''}`
//   const cmd = [`convert`, `"${inputPath}"`, `-resize`, `${resize}`]
//   if (gravity) {
//     cmd.push(`-gravity`, `${gravity}`)
//   }
//   cmd.push(`"${outputPath}"`)

//   return [cmd]
// }

export async function buildCommandToConvertImageWithInkscape(
  input: ConvertImageWithInkscapeCommandInput,
): Promise<{ bin: string; args: string[] }> {
  const inputPath = resolvePathRelativeToScope(
    input.input.file.path,
    input.pathScope,
  )
  const outputPath = resolvePathRelativeToScope(
    input.output.file!.path,
    input.pathScope,
  )

  const bin = 'inkscape'
  const args: string[] = [
    inputPath,
    `-${process.platform === 'darwin' ? 'o' : 'l'}`,
    outputPath,
  ]

  return { bin, args }
}
