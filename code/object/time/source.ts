import { Form, Hash, List } from '@termsurf/form'
import { getTimeZones } from '@vvo/tzdb'
import _ from 'lodash'

const TIME_ZONE_CONTENT = getTimeZones()

const TIME_ZONE_HASH = TIME_ZONE_CONTENT.reduce((m, x) => {
  m[x.name] = _.omit(x, [
    'rawFormat',
    'currentTimeOffsetInMinutes',
    'currentTimeFormat',
  ])
  return m
}, {})

const TIME_ZONE_ABBREVIATION = _.uniq(
  TIME_ZONE_CONTENT.filter(x => x.abbreviation).map(
    x => x.abbreviation,
  ),
)

const TIME_ZONE_ABBREVIATION_HASH = TIME_ZONE_ABBREVIATION.reduce(
  (m, x) => {
    const name = TIME_ZONE_CONTENT.filter(
      tz => tz.abbreviation === x,
    ).map(tz => tz.name)
    m[x] = { name }
    return m
  },
  {},
)

const TIME_ZONE_LOCATION = _.uniq(
  TIME_ZONE_CONTENT.filter(x => x.name).map(x => x.name),
)

export const time_zone_abbreviation: List = {
  form: 'list',
  list: TIME_ZONE_ABBREVIATION,
}

export const time_zone_location: List = {
  form: 'list',
  list: TIME_ZONE_LOCATION,
}

export const time_zone: List = {
  form: 'list',
  list: TIME_ZONE_ABBREVIATION.concat(TIME_ZONE_LOCATION),
}

export const time_zone_data: Form = {
  form: 'form',
  link: {
    name: { like: 'string' },
    alternativeName: { like: 'string' },
    group: { like: 'string', list: true },
    continentCode: { like: 'string' },
    continentName: { like: 'string' },
    countryName: { like: 'string' },
    countryCode: { like: 'string' },
    mainCities: { like: 'string', list: true },
    rawOffsetInMinutes: { like: 'integer' },
    abbreviation: { like: 'string' },
  },
}

export const time_zone_content: Hash = {
  form: 'hash',
  link: 'time_zone_location',
  bond: { like: 'time_zone_data' },
  hash: TIME_ZONE_HASH,
}

export const time_zone_abbreviation_data: Form = {
  form: 'form',
  link: {
    name: { like: 'string', list: true },
  },
}

export const time_zone_abbreviation_content: Hash = {
  form: 'hash',
  link: 'time_zone_abbreviation',
  bond: { like: 'time_zone_abbreviation_data' },
  hash: TIME_ZONE_ABBREVIATION_HASH,
}
