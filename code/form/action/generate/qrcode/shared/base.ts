import {
  QrCodeErrorCorrectionLevel,
  QrCodeFormat,
} from '~/code/form/action/generate/qrcode/shared'

export const QR_CODE_ERROR_CORRECTION_LEVEL: ReadonlyArray<QrCodeErrorCorrectionLevel> =
  ['L', 'M', 'Q', 'H']
export const QR_CODE_FORMAT: ReadonlyArray<QrCodeFormat> = [
  'png',
  'jpg',
  'webp',
]
