import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import {
  CropPdfWithPdfCrop,
} from '~/code/form/action/convert/crop/document/shared'
import {
  CropPdfWithPdfCropParser,
} from '~/code/form/action/convert/crop/document/shared/take'
export async function cropPdfWithPdfCropNode(
  source: CropPdfWithPdfCrop,
) {
  const input = CropPdfWithPdfCropParser.parse(source)
  const command = getCommand('pdfcrop')

  if (input.margin != null) {
    command.link.push(`-margin`, String(input.margin))
  }

  command.link.push(input.input.file.path)
  command.link.push(input.output.file!.path)

  return buildCommandSequence(command)
}
