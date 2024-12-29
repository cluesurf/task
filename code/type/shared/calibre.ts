import merge from 'lodash/merge.js'
import {
  CalibreFormatData,
  CalibreInputFormat,
  CalibreOutputFormat,
} from '~/code/type/shared/index.js'

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
