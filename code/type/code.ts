import { Make, Test } from '@termsurf/form'
import { FFMPEG_TIME_PATTERN } from './bond.js'
import { ImageMagicColorMatrix } from '~/code/type/shared/index.js'
import capitalize from 'lodash/capitalize'
import snakeCase from 'lodash/snakeCase'
import { RefinementCtx, z } from 'zod'
import { replaceFileExtension } from '~/code/tool/shared/screen.js'
import { getPathType } from '../tool/shared/file.js'

export const transform_input_output_file: Make = {
  form: 'make',
  make: (v: Record<string, any>, ctx: RefinementCtx) => {
    if (!v.output.file.path) {
      if (!v.output.format) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Must specify a an output file path or format.`,
          path: ['output', 'file'],
        })
      } else {
        v.output.file.path = replaceFileExtension(
          v.input.file.path as string,
          `.${v.output.format}`,
        )
      }
    }

    return v
  },
}

export const validate_input_file_path_or_content: Make = {
  form: 'make',
  make: (v: Record<string, any>, ctx: RefinementCtx) => {
    if (!v.input.file.path) {
      if (!v.input.file.content) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Must specify either input file path or content.`,
          path: ['input', 'file'],
        })
      }
    }

    return v
  },
}

export const is_sha256: Test = {
  form: 'test',
  test: (bond: string, name: string) =>
    Boolean(bond.match(/^[abcdef0123456789]{64}$/i)) ||
    `${name} is not a valid SHA256 hash.`,
}

export const is_remote_path: Test = {
  form: 'test',
  test: (bond: string, name: string) =>
    getPathType(bond) !== 'file-uri' ||
    `${name} not a valid remote URI.`,
}

export const is_local_path: Test = {
  form: 'test',
  test: (bond: string, name: string) =>
    getPathType(bond) === 'file-uri' ||
    `${name} not a valid local URI.`,
}

export const is_hex_color_8: Test = {
  form: 'test',
  test: (bond: string, name: string) =>
    Boolean(
      bond.match(/^[abcdef0123456789]{8}$/i) ||
        bond.match(/^[abcdef0123456789]{6}$/i) ||
        `${name} is not a valid hex code.`,
    ),
}

export const is_hex_color_6: Test = {
  form: 'test',
  test: (bond: string, name: string) =>
    Boolean(bond.match(/^[abcdef0123456789]{6}$/i)) ||
    `${name} is not a valid hex code.`,
}

export const test_time_string: Test = {
  form: 'test',
  test: (bond: string, name: string) =>
    !!bond.match(FFMPEG_TIME_PATTERN) ||
    `${name} has an invalid format.`,
}

export const test_time_integer: Test = {
  form: 'test',
  test: (bond: number, name: string) =>
    (Number.isInteger(bond) && bond > 0 && bond < 60) ||
    `${name} has an invalid format.`,
}

export const test_image_magic_color_matrix: Test = {
  form: 'test',
  test: (bond: ImageMagicColorMatrix, name: string) => {
    if (bond.row < 3 || bond.row > 6) {
      return `Color matrix can only have between 3 and 6 rows.`
    }
    if (bond.column < 3 || bond.column > 6) {
      return `Color matrix can only have between 3 and 6 columns.`
    }

    const total = bond.row * bond.column

    if (bond.value.length !== total) {
      return `Color matrix has incorrect number of blocks, needs ${total}.`
    }

    return true
  },
}

export const hex_color: Test = {
  form: 'test',
  test: (bond: string, name: string) => {
    if (!bond.match(/#[abcdef0-9]{6}/i)) {
      const prop = capitalize(snakeCase(name)).replace(/_/g, ' ')
      return `${prop} must be a hex string like '#ff0000'.`
    }
    return true
  },
}
