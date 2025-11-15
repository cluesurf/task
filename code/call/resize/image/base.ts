// https://github.com/dlemstra/magick-wasm/tree/dcd3709394b90ea18fd03c50caa6694f2be92a99/src/enums

import { Form } from '@cluesurf/form'

export const replace_image_color_with_image_magick: Form = {
  form: 'form',
  save: '~/code/form/action/resize/image/shared',
  link: {
    inputPath: { like: 'string' },
    outputPath: { like: 'string' },
    startColor: { like: 'string' },
    endColor: { like: 'string' },
    fuzz: { like: 'decimal' },
  },
}

export const resize_image_with_image_magick: Form = {
  form: 'form',
  save: '~/code/form/action/resize/image/shared',
  link: {
    inputPath: { like: 'string' },
    outputPath: { like: 'string' },
    width: { like: 'integer' },
    height: { like: 'integer' },
    stretch: { like: 'boolean' },
    gravity: { like: 'image_magick_gravity' },
  },
}

export const write_metadata_to_image: Form = {
  form: 'form',
  save: '~/code/form/action/resize/image/shared',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'i' } },
          },
        },
      },
    },
    copyright: { like: 'string', need: false },
    creator: { like: 'string', need: false },
    license: { like: 'string', need: false },
    keywords: { like: 'string', list: true, need: false },
    artist: { like: 'string', need: false },
    originalDate: { like: 'date', need: false },
    allDates: { like: 'date', need: false },
    creationDate: { like: 'date', need: false },
    title: { like: 'string', need: false },
    description: { like: 'string', need: false },
  },
}
