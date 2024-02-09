import QRCode from 'qrcode'
import { GenerateQrCode, GenerateQrCodeModel } from '~/code/type'
import mimeType from 'mime-types'

export async function generateQrCode(source: GenerateQrCode) {
  const input = GenerateQrCodeModel.parse(source)
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
