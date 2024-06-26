import merge from 'lodash/merge'
import {
  UnarchiverFormat,
  UnarchiverFormatData,
} from '~/code/type/shared/index'

export type UnarchiverFormatContentValue = UnarchiverFormatData

export type UnarchiverFormatContent = Record<
  UnarchiverFormat,
  UnarchiverFormatContentValue
>
