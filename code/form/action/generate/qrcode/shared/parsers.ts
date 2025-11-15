import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  GenerateQrCode,
  QrCodeErrorCorrectionLevel,
  QrCodeFormat,
} from '~/code/form/action/generate/qrcode/shared/index'

let GenerateQrCodeModel: z.ZodType<GenerateQrCode>

export const GenerateQrCodeParser = (): z.ZodType<GenerateQrCode> => {
  if (!GenerateQrCodeModel) {
    GenerateQrCodeModel = z.object({
      errorCorrectionLevel: z.lazy(() =>
        QrCodeErrorCorrectionLevelParser(),
      ),
      format: z.lazy(() => QrCodeFormatParser()),
      margin: z.number().int().gte(0),
      color: z.optional(
        z.object({
          dark: z
            .string()
            .refine(TEST('dark', code.is_hex_color_8.test)),
          light: z
            .string()
            .refine(TEST('light', code.is_hex_color_8.test)),
        }),
      ),
    }) as z.ZodType<GenerateQrCode>
  }
  return GenerateQrCodeModel!
}

let QrCodeErrorCorrectionLevelModel: z.ZodType<QrCodeErrorCorrectionLevel>

export const QrCodeErrorCorrectionLevelParser = () => {
  if (!QrCodeErrorCorrectionLevelModel) {
    QrCodeErrorCorrectionLevelModel = z.enum(
      LOAD('qr_code_error_correction_level') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<QrCodeErrorCorrectionLevel>
  }
  return QrCodeErrorCorrectionLevelModel!
}

let QrCodeFormatModel: z.ZodType<QrCodeFormat>

export const QrCodeFormatParser = () => {
  if (!QrCodeFormatModel) {
    QrCodeFormatModel = z.enum(
      LOAD('qr_code_format') as readonly [string, ...string[]],
    ) as z.ZodType<QrCodeFormat>
  }
  return QrCodeFormatModel!
}
