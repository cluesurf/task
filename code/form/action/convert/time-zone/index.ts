import { TimeZone } from '~/code/form/object/time'

export type ConvertTimeZone = {
  input: {
    date: string
  }
  output: {
    timezone: TimeZone
    format: string
  }
}
