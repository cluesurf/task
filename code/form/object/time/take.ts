import { z } from 'zod'

import {
  TimeZone,
  TimeZoneAbbreviation,
  TimeZoneLocation,
} from '~/code/form/object/time'
import {
  TIME_ZONE,
  TIME_ZONE_ABBREVIATION,
  TIME_ZONE_LOCATION,
} from '~/code/form/object/time/base'

export const TimeZoneParser = z.enum(
  TIME_ZONE as readonly [string, ...string[]],
) as z.ZodType<TimeZone>

export const TimeZoneAbbreviationParser = z.enum(
  TIME_ZONE_ABBREVIATION as readonly [string, ...string[]],
) as z.ZodType<TimeZoneAbbreviation>

export const TimeZoneAbbreviationDataParser = z.object({
  name: z.array(z.string()),
})

export type TimeZoneAbbreviationDataRecord = z.infer<
  typeof TimeZoneAbbreviationDataParser
>

export const TimeZoneDataParser = z.object({
  name: z.string(),
  alternativeName: z.string(),
  group: z.array(z.string()),
  continentCode: z.string(),
  continentName: z.string(),
  countryName: z.string(),
  countryCode: z.string(),
  mainCities: z.array(z.string()),
  rawOffsetInMinutes: z.number().int(),
  abbreviation: z.string(),
})

export type TimeZoneDataRecord = z.infer<typeof TimeZoneDataParser>

export const TimeZoneLocationParser = z.enum(
  TIME_ZONE_LOCATION as readonly [string, ...string[]],
) as z.ZodType<TimeZoneLocation>
