import merge from 'lodash/merge'
import {
  CalibreFormatData,
  CalibreInputFormat,
  CalibreOutputFormat,
} from '~/code/type/shared/index'

export type CalibreInputFormatContentValue = CalibreFormatData

export type CalibreInputFormatContent = Record<
  CalibreInputFormat,
  CalibreInputFormatContentValue
>
export type CalibreOutputFormatContentValue = CalibreFormatData

export type CalibreOutputFormatContent = Record<
  CalibreOutputFormat,
  CalibreOutputFormatContentValue
>
