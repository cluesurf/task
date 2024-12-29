import merge from 'lodash/merge.js'
import {
  UnarchiverFormat,
  UnarchiverFormatData,
} from '~/code/type/shared/index.js'

export type UnarchiverFormatContentValue = UnarchiverFormatData

export type UnarchiverFormatContent = Record<
  UnarchiverFormat,
  UnarchiverFormatContentValue
>
