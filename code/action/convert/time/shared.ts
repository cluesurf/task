import {
  ConvertTimeZone,
  ConvertTimeZoneParser,
} from '~/code/type/shared/parser'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// https://gist.github.com/iambibhas/e88d69f97818a2a35492#file-timezones-csv-L6

dayjs.extend(utc)
dayjs.extend(timezone)

export function convertTimeZone(source: ConvertTimeZone) {
  const input = ConvertTimeZoneParser().parse(source)
  return dayjs(input.input.date)
    .tz(input.output.timezone)
    .format(input.output.format)
}
