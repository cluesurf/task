import { Form, List, Test } from '@cluesurf/form'

export const qr_code_error_correction_level: List = {
  form: 'list',
  save: '~/code/form/action/generate/qrcode/shared',
  list: ['L', 'M', 'Q', 'H'],
}

export const qr_code_format: List = {
  form: 'list',
  save: '~/code/form/action/generate/qrcode/shared',
  list: ['png', 'jpg', 'webp'],
}

export const generate_qr_code: Form = {
  form: 'form',
  save: '~/code/form/action/generate/qrcode/shared',
  link: {
    errorCorrectionLevel: { like: 'qr_code_error_correction_level' },
    format: { like: 'qr_code_format' },
    // type: 'image/png',
    // quality: 0.3,
    margin: { like: 'natural_number' },
    color: {
      need: false,
      link: {
        dark: { like: 'string', test: 'is_hex_color_8' },
        light: { like: 'string', test: 'is_hex_color_8' },
      },
    },
  },
}
