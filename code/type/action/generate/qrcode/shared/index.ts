export type GenerateQrCode = {
  errorCorrectionLevel: QrCodeErrorCorrectionLevel
  format: QrCodeFormat
  margin: number
  color?: {
    dark: string
    light: string
  }
}

export type QrCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

export type QrCodeFormat = 'png' | 'jpg' | 'webp'
