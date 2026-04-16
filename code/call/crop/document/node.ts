import {
  CropPdfWithPdfCrop,
} from '~/code/form/action/convert/crop/document/shared'
import {
  CropPdfWithPdfCropParser,
} from '~/code/form/action/convert/crop/document/shared/take'
import { spawnAndWait } from '~/code/tool/node/spawn'

async function cropPdfWithPdfCropNode(
  source: CropPdfWithPdfCrop,
) {
  const input = CropPdfWithPdfCropParser.parse(source)
  const args: string[] = []

  if (input.margin != null) {
    args.push('-margin', String(input.margin))
  }

  args.push(input.input.file.path)
  args.push(input.output.file!.path)

  await spawnAndWait({
    verb: 'crop document',
    bin: 'pdfcrop',
    args,
  })

  return { file: { path: input.output.file!.path } }
}

export default cropPdfWithPdfCropNode
export { cropPdfWithPdfCropNode }
