import { TimeZone } from '~/code/form/object/time/index'

export type ConvertTimeZone = {
  input: {
    date: string
  }
  output: {
    timezone: TimeZone
    format: string
  }
}
