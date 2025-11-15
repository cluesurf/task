import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  TimeZone,
  TimeZoneAbbreviation,
  TimeZoneAbbreviationData,
  TimeZoneData,
  TimeZoneLocation,
} from '~/code/form/object/time/index'

let TimeZoneModel: z.ZodType<TimeZone>

export const TimeZoneParser = () => {
  if (!TimeZoneModel) {
    TimeZoneModel = z.enum(
      LOAD('time_zone') as readonly [string, ...string[]],
    ) as z.ZodType<TimeZone>
  }
  return TimeZoneModel!
}

let TimeZoneAbbreviationModel: z.ZodType<TimeZoneAbbreviation>

export const TimeZoneAbbreviationParser = () => {
  if (!TimeZoneAbbreviationModel) {
    TimeZoneAbbreviationModel = z.enum(
      LOAD('time_zone_abbreviation') as readonly [string, ...string[]],
    ) as z.ZodType<TimeZoneAbbreviation>
  }
  return TimeZoneAbbreviationModel!
}

let TimeZoneAbbreviationDataModel: z.ZodType<TimeZoneAbbreviationData>

export const TimeZoneAbbreviationDataParser =
  (): z.ZodType<TimeZoneAbbreviationData> => {
    if (!TimeZoneAbbreviationDataModel) {
      TimeZoneAbbreviationDataModel = z.object({
        name: z.array(z.string()),
      }) as z.ZodType<TimeZoneAbbreviationData>
    }
    return TimeZoneAbbreviationDataModel!
  }

let TimeZoneDataModel: z.ZodType<TimeZoneData>

export const TimeZoneDataParser = (): z.ZodType<TimeZoneData> => {
  if (!TimeZoneDataModel) {
    TimeZoneDataModel = z.object({
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
    }) as z.ZodType<TimeZoneData>
  }
  return TimeZoneDataModel!
}

let TimeZoneLocationModel: z.ZodType<TimeZoneLocation>

export const TimeZoneLocationParser = () => {
  if (!TimeZoneLocationModel) {
    TimeZoneLocationModel = z.enum(
      LOAD('time_zone_location') as readonly [string, ...string[]],
    ) as z.ZodType<TimeZoneLocation>
  }
  return TimeZoneLocationModel!
}
