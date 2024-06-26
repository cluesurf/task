import QRCode from 'qrcode'
import {
  GenerateQrCode,
  GenerateQrCodeParser,
} from '~/code/type/shared/parser.js'
import mimeType from 'mime-types'

export async function generateQrCode(source: GenerateQrCode) {
  const input = GenerateQrCodeParser().parse(source)
  const opts: any = {}
  if (input.errorCorrectionLevel) {
    opts.errorCorrectionLevel = input.errorCorrectionLevel
  }
  if (input.format) {
    opts.type = mimeType.lookup(`.${input.format}`)
  }
  if (input.margin) {
    opts.margin = input.margin
  }
  if (input.color) {
    opts.color = input.color
  }

  return await QRCode.toDataURL('text', opts)
}
