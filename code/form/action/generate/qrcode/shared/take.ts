import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

import {
  QrCodeErrorCorrectionLevel,
  QrCodeFormat,
} from '~/code/form/action/generate/qrcode/shared'
import {
  QR_CODE_ERROR_CORRECTION_LEVEL,
  QR_CODE_FORMAT,
} from '~/code/form/action/generate/qrcode/shared/base'

export const GenerateQrCodeParser = z.object({
  errorCorrectionLevel: z.lazy(() => QrCodeErrorCorrectionLevelParser),
  format: z.lazy(() => QrCodeFormatParser),
  margin: z.number().int().gte(0),
  color: z.optional(
    z.object({
      dark: z.string().refine(TEST('dark', code.is_hex_color_8.test)),
      light: z.string().refine(TEST('light', code.is_hex_color_8.test)),
    }),
  ),
})

export type GenerateQrCodeRecord = z.infer<typeof GenerateQrCodeParser>

export const QrCodeErrorCorrectionLevelParser = z.enum(
  QR_CODE_ERROR_CORRECTION_LEVEL as readonly [string, ...string[]],
) as z.ZodType<QrCodeErrorCorrectionLevel>

export const QrCodeFormatParser = z.enum(
  QR_CODE_FORMAT as readonly [string, ...string[]],
) as z.ZodType<QrCodeFormat>
