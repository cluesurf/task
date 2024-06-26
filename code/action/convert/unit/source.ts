import { Form, Hash, List } from '@termsurf/form'
import convertUnits from 'convert-units'
import _ from 'lodash'

const convertedUnits = convertUnits()

const inputs = convertedUnits
  .possibilities()
  .filter(x => x !== 'krm')
  .map(key => {
    // fix bugs and cleanup
    let slug
    switch (key) {
      case 'cm2':
        slug = 'square-centimeter'
        break
      case 'F':
        slug = 'fahrenheit'
        break
      case 'C':
        slug = 'celsius'
        break
      case 'K':
        slug = 'kelvin'
        break
      case 'R':
        slug = 'rankine'
        break
      default:
        slug = _.kebabCase(convertedUnits.describe(key).singular)
        break
    }

    return {
      key,
      slug,
    }
  })

const inputMap = inputs.reduce((m, x) => {
  m[x.key] = x.slug
  return m
}, {})

export const unit: List = {
  form: 'list',
  list: inputs.map(x => x.slug),
}

export const unit_key: Form = {
  form: 'form',
  link: {
    key: { like: 'string' },
  },
}

export const unit_key_hash: Hash = {
  form: 'hash',
  link: 'unit',
  bond: { like: 'unit_key' },
  hash: inputs.reduce((m, x) => {
    m[x.slug] = {
      key: x.key,
    }
    return m
  }, {}),
}

export const conversion_unit_millimeter: List = {
  form: 'list',
  list: convertedUnits
    .from('mm')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_centimeter: List = {
  form: 'list',
  list: convertedUnits
    .from('cm')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_meter: List = {
  form: 'list',
  list: convertedUnits
    .from('m')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilometer: List = {
  form: 'list',
  list: convertedUnits
    .from('km')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_inch: List = {
  form: 'list',
  list: convertedUnits
    .from('in')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_yard: List = {
  form: 'list',
  list: convertedUnits
    .from('yd')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_us_survey_foot: List = {
  form: 'list',
  list: convertedUnits
    .from('ft-us')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_foot: List = {
  form: 'list',
  list: convertedUnits
    .from('ft')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_mile: List = {
  form: 'list',
  list: convertedUnits
    .from('mi')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_square_millimeter: List = {
  form: 'list',
  list: convertedUnits
    .from('mm2')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_square_centimeter: List = {
  form: 'list',
  list: convertedUnits
    .from('cm2')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_square_meter: List = {
  form: 'list',
  list: convertedUnits
    .from('m2')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_hectare: List = {
  form: 'list',
  list: convertedUnits
    .from('ha')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_square_kilometer: List = {
  form: 'list',
  list: convertedUnits
    .from('km2')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_square_inch: List = {
  form: 'list',
  list: convertedUnits
    .from('in2')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_square_yard: List = {
  form: 'list',
  list: convertedUnits
    .from('yd2')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_square_foot: List = {
  form: 'list',
  list: convertedUnits
    .from('ft2')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_acre: List = {
  form: 'list',
  list: convertedUnits
    .from('ac')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_square_mile: List = {
  form: 'list',
  list: convertedUnits
    .from('mi2')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_microgram: List = {
  form: 'list',
  list: convertedUnits
    .from('mcg')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_milligram: List = {
  form: 'list',
  list: convertedUnits
    .from('mg')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gram: List = {
  form: 'list',
  list: convertedUnits
    .from('g')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilogram: List = {
  form: 'list',
  list: convertedUnits
    .from('kg')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_metric_tonne: List = {
  form: 'list',
  list: convertedUnits
    .from('mt')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_ounce: List = {
  form: 'list',
  list: convertedUnits
    .from('oz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_pound: List = {
  form: 'list',
  list: convertedUnits
    .from('lb')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_ton: List = {
  form: 'list',
  list: convertedUnits
    .from('t')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_millimeter: List = {
  form: 'list',
  list: convertedUnits
    .from('mm3')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_centimeter: List = {
  form: 'list',
  list: convertedUnits
    .from('cm3')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_millilitre: List = {
  form: 'list',
  list: convertedUnits
    .from('ml')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_centilitre: List = {
  form: 'list',
  list: convertedUnits
    .from('cl')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_decilitre: List = {
  form: 'list',
  list: convertedUnits
    .from('dl')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_litre: List = {
  form: 'list',
  list: convertedUnits
    .from('l')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilolitre: List = {
  form: 'list',
  list: convertedUnits
    .from('kl')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_meter: List = {
  form: 'list',
  list: convertedUnits
    .from('m3')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_kilometer: List = {
  form: 'list',
  list: convertedUnits
    .from('km3')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_tesked: List = {
  form: 'list',
  list: convertedUnits
    .from('tsk')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_matsked: List = {
  form: 'list',
  list: convertedUnits
    .from('msk')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kaffekopp: List = {
  form: 'list',
  list: convertedUnits
    .from('kkp')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_glas: List = {
  form: 'list',
  list: convertedUnits
    .from('glas')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kanna: List = {
  form: 'list',
  list: convertedUnits
    .from('kanna')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_teaspoon: List = {
  form: 'list',
  list: convertedUnits
    .from('tsp')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_tablespoon: List = {
  form: 'list',
  list: convertedUnits
    .from('Tbs')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_inch: List = {
  form: 'list',
  list: convertedUnits
    .from('in3')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_fluid_ounce: List = {
  form: 'list',
  list: convertedUnits
    .from('fl-oz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cup: List = {
  form: 'list',
  list: convertedUnits
    .from('cup')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_pint: List = {
  form: 'list',
  list: convertedUnits
    .from('pnt')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_quart: List = {
  form: 'list',
  list: convertedUnits
    .from('qt')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gallon: List = {
  form: 'list',
  list: convertedUnits
    .from('gal')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_foot: List = {
  form: 'list',
  list: convertedUnits
    .from('ft3')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_yard: List = {
  form: 'list',
  list: convertedUnits
    .from('yd3')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_each: List = {
  form: 'list',
  list: convertedUnits
    .from('ea')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_dozen: List = {
  form: 'list',
  list: convertedUnits
    .from('dz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_celsius: List = {
  form: 'list',
  list: convertedUnits
    .from('C')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kelvin: List = {
  form: 'list',
  list: convertedUnits
    .from('K')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_fahrenheit: List = {
  form: 'list',
  list: convertedUnits
    .from('F')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_rankine: List = {
  form: 'list',
  list: convertedUnits
    .from('R')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_nanosecond: List = {
  form: 'list',
  list: convertedUnits
    .from('ns')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_microsecond: List = {
  form: 'list',
  list: convertedUnits
    .from('mu')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_millisecond: List = {
  form: 'list',
  list: convertedUnits
    .from('ms')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_second: List = {
  form: 'list',
  list: convertedUnits
    .from('s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_day: List = {
  form: 'list',
  list: convertedUnits
    .from('d')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_week: List = {
  form: 'list',
  list: convertedUnits
    .from('week')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_month: List = {
  form: 'list',
  list: convertedUnits
    .from('month')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_year: List = {
  form: 'list',
  list: convertedUnits
    .from('year')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_bit: List = {
  form: 'list',
  list: convertedUnits
    .from('b')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilobit: List = {
  form: 'list',
  list: convertedUnits
    .from('Kb')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megabit: List = {
  form: 'list',
  list: convertedUnits
    .from('Mb')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gigabit: List = {
  form: 'list',
  list: convertedUnits
    .from('Gb')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_terabit: List = {
  form: 'list',
  list: convertedUnits
    .from('Tb')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_byte: List = {
  form: 'list',
  list: convertedUnits
    .from('B')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilobyte: List = {
  form: 'list',
  list: convertedUnits
    .from('KB')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megabyte: List = {
  form: 'list',
  list: convertedUnits
    .from('MB')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gigabyte: List = {
  form: 'list',
  list: convertedUnits
    .from('GB')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_terabyte: List = {
  form: 'list',
  list: convertedUnits
    .from('TB')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_part_per_million: List = {
  form: 'list',
  list: convertedUnits
    .from('ppm')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_part_per_billion: List = {
  form: 'list',
  list: convertedUnits
    .from('ppb')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_part_per_trillion: List = {
  form: 'list',
  list: convertedUnits
    .from('ppt')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_part_per_quadrillion: List = {
  form: 'list',
  list: convertedUnits
    .from('ppq')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_metre_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('m/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilometre_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('km/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_mile_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('m/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_knot: List = {
  form: 'list',
  list: convertedUnits
    .from('knot')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_foot_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('ft/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_minute_per_kilometre: List = {
  form: 'list',
  list: convertedUnits
    .from('min/km')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_second_per_metre: List = {
  form: 'list',
  list: convertedUnits
    .from('s/m')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_minute_per_mile: List = {
  form: 'list',
  list: convertedUnits
    .from('min/mi')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_second_per_foot: List = {
  form: 'list',
  list: convertedUnits
    .from('s/ft')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_pascal: List = {
  form: 'list',
  list: convertedUnits
    .from('Pa')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilopascal: List = {
  form: 'list',
  list: convertedUnits
    .from('kPa')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megapascal: List = {
  form: 'list',
  list: convertedUnits
    .from('MPa')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_hectopascal: List = {
  form: 'list',
  list: convertedUnits
    .from('hPa')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_bar: List = {
  form: 'list',
  list: convertedUnits
    .from('bar')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_torr: List = {
  form: 'list',
  list: convertedUnits
    .from('torr')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_pound_per_square_inch: List = {
  form: 'list',
  list: convertedUnits
    .from('psi')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilopound_per_square_inch: List = {
  form: 'list',
  list: convertedUnits
    .from('ksi')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_ampere: List = {
  form: 'list',
  list: convertedUnits
    .from('A')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_milliampere: List = {
  form: 'list',
  list: convertedUnits
    .from('mA')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kiloampere: List = {
  form: 'list',
  list: convertedUnits
    .from('kA')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_volt: List = {
  form: 'list',
  list: convertedUnits
    .from('V')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_millivolt: List = {
  form: 'list',
  list: convertedUnits
    .from('mV')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilovolt: List = {
  form: 'list',
  list: convertedUnits
    .from('kV')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_watt: List = {
  form: 'list',
  list: convertedUnits
    .from('W')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_milliwatt: List = {
  form: 'list',
  list: convertedUnits
    .from('mW')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilowatt: List = {
  form: 'list',
  list: convertedUnits
    .from('kW')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megawatt: List = {
  form: 'list',
  list: convertedUnits
    .from('MW')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gigawatt: List = {
  form: 'list',
  list: convertedUnits
    .from('GW')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_volt_ampere_reactive: List = {
  form: 'list',
  list: convertedUnits
    .from('VAR')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_millivolt_ampere_reactive: List = {
  form: 'list',
  list: convertedUnits
    .from('mVAR')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilovolt_ampere_reactive: List = {
  form: 'list',
  list: convertedUnits
    .from('kVAR')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megavolt_ampere_reactive: List = {
  form: 'list',
  list: convertedUnits
    .from('MVAR')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gigavolt_ampere_reactive: List = {
  form: 'list',
  list: convertedUnits
    .from('GVAR')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_volt_ampere: List = {
  form: 'list',
  list: convertedUnits
    .from('VA')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_millivolt_ampere: List = {
  form: 'list',
  list: convertedUnits
    .from('mVA')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilovolt_ampere: List = {
  form: 'list',
  list: convertedUnits
    .from('kVA')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megavolt_ampere: List = {
  form: 'list',
  list: convertedUnits
    .from('MVA')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gigavolt_ampere: List = {
  form: 'list',
  list: convertedUnits
    .from('GVA')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_watt_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('Wh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_milliwatt_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('mWh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilowatt_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('kWh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megawatt_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('MWh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gigawatt_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('GWh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_joule: List = {
  form: 'list',
  list: convertedUnits
    .from('J')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilojoule: List = {
  form: 'list',
  list: convertedUnits
    .from('kJ')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_volt_ampere_reactive_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('VARh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_millivolt_ampere_reactive_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('mVARh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilovolt_ampere_reactive_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('kVARh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megavolt_ampere_reactive_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('MVARh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gigavolt_ampere_reactive_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('GVARh')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_millimeter_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('mm3/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_centimeter_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('cm3/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_millilitre_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('ml/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_centilitre_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('cl/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_decilitre_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('dl/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_litre_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('l/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_litre_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('l/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_litre_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('l/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilolitre_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('kl/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilolitre_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('kl/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilolitre_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('kl/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_meter_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('m3/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_meter_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('m3/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_meter_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('m3/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_kilometer_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('km3/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_teaspoon_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('tsp/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_tablespoon_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('Tbs/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_inch_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('in3/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_inch_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('in3/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_inch_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('in3/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_fluid_ounce_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('fl-oz/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_fluid_ounce_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('fl-oz/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_fluid_ounce_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('fl-oz/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cup_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('cup/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_pint_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('pnt/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_pint_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('pnt/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_pint_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('pnt/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_quart_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('qt/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gallon_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('gal/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gallon_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('gal/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gallon_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('gal/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_foot_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('ft3/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_foot_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('ft3/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_foot_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('ft3/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_yard_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('yd3/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_yard_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('yd3/min')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_cubic_yard_per_hour: List = {
  form: 'list',
  list: convertedUnits
    .from('yd3/h')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_lux: List = {
  form: 'list',
  list: convertedUnits
    .from('lx')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_foot_candle: List = {
  form: 'list',
  list: convertedUnits
    .from('ft-cd')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_millihertz: List = {
  form: 'list',
  list: convertedUnits
    .from('mHz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_hertz: List = {
  form: 'list',
  list: convertedUnits
    .from('Hz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_kilohertz: List = {
  form: 'list',
  list: convertedUnits
    .from('kHz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_megahertz: List = {
  form: 'list',
  list: convertedUnits
    .from('MHz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gigahertz: List = {
  form: 'list',
  list: convertedUnits
    .from('GHz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_terahertz: List = {
  form: 'list',
  list: convertedUnits
    .from('THz')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_rotation_per_minute: List = {
  form: 'list',
  list: convertedUnits
    .from('rpm')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_degree_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('deg/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_radian_per_second: List = {
  form: 'list',
  list: convertedUnits
    .from('rad/s')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_radian: List = {
  form: 'list',
  list: convertedUnits
    .from('rad')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_degree: List = {
  form: 'list',
  list: convertedUnits
    .from('deg')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_gradian: List = {
  form: 'list',
  list: convertedUnits
    .from('grad')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_arcminute: List = {
  form: 'list',
  list: convertedUnits
    .from('arcmin')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const conversion_unit_arcsecond: List = {
  form: 'list',
  list: convertedUnits
    .from('arcsec')
    .possibilities()
    .map(x => inputMap[x])
    .filter(x => x),
}

export const convert_millimeter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millimeter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_millimeter' },
      },
    },
  },
}

export const convert_centimeter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['centimeter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_centimeter' },
      },
    },
  },
}

export const convert_meter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['meter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_meter' },
      },
    },
  },
}

export const convert_kilometer: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilometer'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilometer' },
      },
    },
  },
}

export const convert_inch: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['inch'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_inch' },
      },
    },
  },
}

export const convert_yard: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['yard'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_yard' },
      },
    },
  },
}

export const convert_us_survey_foot: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['us-survey-foot'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_us_survey_foot' },
      },
    },
  },
}

export const convert_foot: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['foot'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_foot' },
      },
    },
  },
}

export const convert_mile: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['mile'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_mile' },
      },
    },
  },
}

export const convert_square_millimeter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['square-millimeter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_square_millimeter' },
      },
    },
  },
}

export const convert_square_centimeter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['square-centimeter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_square_centimeter' },
      },
    },
  },
}

export const convert_square_meter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['square-meter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_square_meter' },
      },
    },
  },
}

export const convert_hectare: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['hectare'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_hectare' },
      },
    },
  },
}

export const convert_square_kilometer: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['square-kilometer'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_square_kilometer' },
      },
    },
  },
}

export const convert_square_inch: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['square-inch'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_square_inch' },
      },
    },
  },
}

export const convert_square_yard: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['square-yard'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_square_yard' },
      },
    },
  },
}

export const convert_square_foot: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['square-foot'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_square_foot' },
      },
    },
  },
}

export const convert_acre: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['acre'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_acre' },
      },
    },
  },
}

export const convert_square_mile: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['square-mile'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_square_mile' },
      },
    },
  },
}

export const convert_microgram: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['microgram'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_microgram' },
      },
    },
  },
}

export const convert_milligram: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['milligram'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_milligram' },
      },
    },
  },
}

export const convert_gram: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gram'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gram' },
      },
    },
  },
}

export const convert_kilogram: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilogram'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilogram' },
      },
    },
  },
}

export const convert_metric_tonne: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['metric-tonne'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_metric_tonne' },
      },
    },
  },
}

export const convert_ounce: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['ounce'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_ounce' },
      },
    },
  },
}

export const convert_pound: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['pound'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_pound' },
      },
    },
  },
}

export const convert_ton: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['ton'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_ton' },
      },
    },
  },
}

export const convert_cubic_millimeter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-millimeter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_millimeter' },
      },
    },
  },
}

export const convert_cubic_centimeter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-centimeter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_centimeter' },
      },
    },
  },
}

export const convert_millilitre: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millilitre'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_millilitre' },
      },
    },
  },
}

export const convert_centilitre: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['centilitre'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_centilitre' },
      },
    },
  },
}

export const convert_decilitre: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['decilitre'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_decilitre' },
      },
    },
  },
}

export const convert_litre: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['litre'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_litre' },
      },
    },
  },
}

export const convert_kilolitre: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilolitre'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilolitre' },
      },
    },
  },
}

export const convert_cubic_meter: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-meter'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_meter' },
      },
    },
  },
}

export const convert_cubic_kilometer: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-kilometer'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_kilometer' },
      },
    },
  },
}

export const convert_tesked: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['tesked'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_tesked' },
      },
    },
  },
}

export const convert_matsked: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['matsked'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_matsked' },
      },
    },
  },
}

export const convert_kaffekopp: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kaffekopp'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kaffekopp' },
      },
    },
  },
}

export const convert_glas: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['glas'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_glas' },
      },
    },
  },
}

export const convert_kanna: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kanna'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kanna' },
      },
    },
  },
}

export const convert_teaspoon: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['teaspoon'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_teaspoon' },
      },
    },
  },
}

export const convert_tablespoon: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['tablespoon'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_tablespoon' },
      },
    },
  },
}

export const convert_cubic_inch: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-inch'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_inch' },
      },
    },
  },
}

export const convert_fluid_ounce: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['fluid-ounce'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_fluid_ounce' },
      },
    },
  },
}

export const convert_cup: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cup'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cup' },
      },
    },
  },
}

export const convert_pint: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['pint'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_pint' },
      },
    },
  },
}

export const convert_quart: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['quart'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_quart' },
      },
    },
  },
}

export const convert_gallon: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gallon'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gallon' },
      },
    },
  },
}

export const convert_cubic_foot: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-foot'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_foot' },
      },
    },
  },
}

export const convert_cubic_yard: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-yard'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_yard' },
      },
    },
  },
}

export const convert_each: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['each'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_each' },
      },
    },
  },
}

export const convert_dozen: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['dozen'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_dozen' },
      },
    },
  },
}

export const convert_celsius: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['celsius'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_celsius' },
      },
    },
  },
}

export const convert_kelvin: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kelvin'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kelvin' },
      },
    },
  },
}

export const convert_fahrenheit: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['fahrenheit'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_fahrenheit' },
      },
    },
  },
}

export const convert_rankine: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['rankine'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_rankine' },
      },
    },
  },
}

export const convert_nanosecond: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['nanosecond'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_nanosecond' },
      },
    },
  },
}

export const convert_microsecond: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['microsecond'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_microsecond' },
      },
    },
  },
}

export const convert_millisecond: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millisecond'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_millisecond' },
      },
    },
  },
}

export const convert_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_second' },
      },
    },
  },
}

export const convert_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_minute' },
      },
    },
  },
}

export const convert_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_hour' },
      },
    },
  },
}

export const convert_day: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['day'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_day' },
      },
    },
  },
}

export const convert_week: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['week'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_week' },
      },
    },
  },
}

export const convert_month: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['month'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_month' },
      },
    },
  },
}

export const convert_year: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['year'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_year' },
      },
    },
  },
}

export const convert_bit: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['bit'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_bit' },
      },
    },
  },
}

export const convert_kilobit: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilobit'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilobit' },
      },
    },
  },
}

export const convert_megabit: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megabit'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_megabit' },
      },
    },
  },
}

export const convert_gigabit: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gigabit'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gigabit' },
      },
    },
  },
}

export const convert_terabit: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['terabit'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_terabit' },
      },
    },
  },
}

export const convert_byte: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['byte'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_byte' },
      },
    },
  },
}

export const convert_kilobyte: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilobyte'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilobyte' },
      },
    },
  },
}

export const convert_megabyte: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megabyte'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_megabyte' },
      },
    },
  },
}

export const convert_gigabyte: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gigabyte'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gigabyte' },
      },
    },
  },
}

export const convert_terabyte: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['terabyte'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_terabyte' },
      },
    },
  },
}

export const convert_part_per_million: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['part-per-million'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_part_per_million' },
      },
    },
  },
}

export const convert_part_per_billion: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['part-per-billion'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_part_per_billion' },
      },
    },
  },
}

export const convert_part_per_trillion: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['part-per-trillion'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_part_per_trillion' },
      },
    },
  },
}

export const convert_part_per_quadrillion: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['part-per-quadrillion'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_part_per_quadrillion' },
      },
    },
  },
}

export const convert_metre_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['metre-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_metre_per_second' },
      },
    },
  },
}

export const convert_kilometre_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilometre-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilometre_per_hour' },
      },
    },
  },
}

export const convert_mile_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['mile-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_mile_per_hour' },
      },
    },
  },
}

export const convert_knot: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['knot'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_knot' },
      },
    },
  },
}

export const convert_foot_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['foot-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_foot_per_second' },
      },
    },
  },
}

export const convert_minute_per_kilometre: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['minute-per-kilometre'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_minute_per_kilometre' },
      },
    },
  },
}

export const convert_second_per_metre: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['second-per-metre'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_second_per_metre' },
      },
    },
  },
}

export const convert_minute_per_mile: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['minute-per-mile'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_minute_per_mile' },
      },
    },
  },
}

export const convert_second_per_foot: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['second-per-foot'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_second_per_foot' },
      },
    },
  },
}

export const convert_pascal: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['pascal'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_pascal' },
      },
    },
  },
}

export const convert_kilopascal: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilopascal'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilopascal' },
      },
    },
  },
}

export const convert_megapascal: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megapascal'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_megapascal' },
      },
    },
  },
}

export const convert_hectopascal: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['hectopascal'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_hectopascal' },
      },
    },
  },
}

export const convert_bar: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['bar'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_bar' },
      },
    },
  },
}

export const convert_torr: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['torr'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_torr' },
      },
    },
  },
}

export const convert_pound_per_square_inch: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['pound-per-square-inch'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_pound_per_square_inch' },
      },
    },
  },
}

export const convert_kilopound_per_square_inch: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilopound-per-square-inch'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilopound_per_square_inch' },
      },
    },
  },
}

export const convert_ampere: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['ampere'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_ampere' },
      },
    },
  },
}

export const convert_milliampere: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['milliampere'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_milliampere' },
      },
    },
  },
}

export const convert_kiloampere: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kiloampere'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kiloampere' },
      },
    },
  },
}

export const convert_volt: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['volt'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_volt' },
      },
    },
  },
}

export const convert_millivolt: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millivolt'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_millivolt' },
      },
    },
  },
}

export const convert_kilovolt: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilovolt'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilovolt' },
      },
    },
  },
}

export const convert_watt: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['watt'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_watt' },
      },
    },
  },
}

export const convert_milliwatt: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['milliwatt'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_milliwatt' },
      },
    },
  },
}

export const convert_kilowatt: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilowatt'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilowatt' },
      },
    },
  },
}

export const convert_megawatt: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megawatt'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_megawatt' },
      },
    },
  },
}

export const convert_gigawatt: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gigawatt'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gigawatt' },
      },
    },
  },
}

export const convert_volt_ampere_reactive: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['volt-ampere-reactive'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_volt_ampere_reactive' },
      },
    },
  },
}

export const convert_millivolt_ampere_reactive: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millivolt-ampere-reactive'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_millivolt_ampere_reactive' },
      },
    },
  },
}

export const convert_kilovolt_ampere_reactive: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilovolt-ampere-reactive'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilovolt_ampere_reactive' },
      },
    },
  },
}

export const convert_megavolt_ampere_reactive: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megavolt-ampere-reactive'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_megavolt_ampere_reactive' },
      },
    },
  },
}

export const convert_gigavolt_ampere_reactive: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gigavolt-ampere-reactive'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gigavolt_ampere_reactive' },
      },
    },
  },
}

export const convert_volt_ampere: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['volt-ampere'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_volt_ampere' },
      },
    },
  },
}

export const convert_millivolt_ampere: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millivolt-ampere'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_millivolt_ampere' },
      },
    },
  },
}

export const convert_kilovolt_ampere: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilovolt-ampere'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilovolt_ampere' },
      },
    },
  },
}

export const convert_megavolt_ampere: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megavolt-ampere'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_megavolt_ampere' },
      },
    },
  },
}

export const convert_gigavolt_ampere: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gigavolt-ampere'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gigavolt_ampere' },
      },
    },
  },
}

export const convert_watt_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['watt-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_watt_hour' },
      },
    },
  },
}

export const convert_milliwatt_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['milliwatt-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_milliwatt_hour' },
      },
    },
  },
}

export const convert_kilowatt_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilowatt-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilowatt_hour' },
      },
    },
  },
}

export const convert_megawatt_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megawatt-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_megawatt_hour' },
      },
    },
  },
}

export const convert_gigawatt_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gigawatt-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gigawatt_hour' },
      },
    },
  },
}

export const convert_joule: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['joule'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_joule' },
      },
    },
  },
}

export const convert_kilojoule: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilojoule'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilojoule' },
      },
    },
  },
}

export const convert_volt_ampere_reactive_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['volt-ampere-reactive-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_volt_ampere_reactive_hour' },
      },
    },
  },
}

export const convert_millivolt_ampere_reactive_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millivolt-ampere-reactive-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: {
          like: 'conversion_unit_millivolt_ampere_reactive_hour',
        },
      },
    },
  },
}

export const convert_kilovolt_ampere_reactive_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilovolt-ampere-reactive-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: {
          like: 'conversion_unit_kilovolt_ampere_reactive_hour',
        },
      },
    },
  },
}

export const convert_megavolt_ampere_reactive_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megavolt-ampere-reactive-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: {
          like: 'conversion_unit_megavolt_ampere_reactive_hour',
        },
      },
    },
  },
}

export const convert_gigavolt_ampere_reactive_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gigavolt-ampere-reactive-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: {
          like: 'conversion_unit_gigavolt_ampere_reactive_hour',
        },
      },
    },
  },
}

export const convert_cubic_millimeter_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-millimeter-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_millimeter_per_second' },
      },
    },
  },
}

export const convert_cubic_centimeter_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-centimeter-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_centimeter_per_second' },
      },
    },
  },
}

export const convert_millilitre_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millilitre-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_millilitre_per_second' },
      },
    },
  },
}

export const convert_centilitre_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['centilitre-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_centilitre_per_second' },
      },
    },
  },
}

export const convert_decilitre_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['decilitre-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_decilitre_per_second' },
      },
    },
  },
}

export const convert_litre_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['litre-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_litre_per_second' },
      },
    },
  },
}

export const convert_litre_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['litre-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_litre_per_minute' },
      },
    },
  },
}

export const convert_litre_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['litre-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_litre_per_hour' },
      },
    },
  },
}

export const convert_kilolitre_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilolitre-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilolitre_per_second' },
      },
    },
  },
}

export const convert_kilolitre_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilolitre-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilolitre_per_minute' },
      },
    },
  },
}

export const convert_kilolitre_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilolitre-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilolitre_per_hour' },
      },
    },
  },
}

export const convert_cubic_meter_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-meter-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_meter_per_second' },
      },
    },
  },
}

export const convert_cubic_meter_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-meter-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_meter_per_minute' },
      },
    },
  },
}

export const convert_cubic_meter_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-meter-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_meter_per_hour' },
      },
    },
  },
}

export const convert_cubic_kilometer_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-kilometer-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_kilometer_per_second' },
      },
    },
  },
}

export const convert_teaspoon_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['teaspoon-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_teaspoon_per_second' },
      },
    },
  },
}

export const convert_tablespoon_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['tablespoon-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_tablespoon_per_second' },
      },
    },
  },
}

export const convert_cubic_inch_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-inch-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_inch_per_second' },
      },
    },
  },
}

export const convert_cubic_inch_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-inch-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_inch_per_minute' },
      },
    },
  },
}

export const convert_cubic_inch_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-inch-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_inch_per_hour' },
      },
    },
  },
}

export const convert_fluid_ounce_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['fluid-ounce-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_fluid_ounce_per_second' },
      },
    },
  },
}

export const convert_fluid_ounce_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['fluid-ounce-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_fluid_ounce_per_minute' },
      },
    },
  },
}

export const convert_fluid_ounce_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['fluid-ounce-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_fluid_ounce_per_hour' },
      },
    },
  },
}

export const convert_cup_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cup-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cup_per_second' },
      },
    },
  },
}

export const convert_pint_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['pint-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_pint_per_second' },
      },
    },
  },
}

export const convert_pint_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['pint-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_pint_per_minute' },
      },
    },
  },
}

export const convert_pint_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['pint-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_pint_per_hour' },
      },
    },
  },
}

export const convert_quart_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['quart-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_quart_per_second' },
      },
    },
  },
}

export const convert_gallon_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gallon-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gallon_per_second' },
      },
    },
  },
}

export const convert_gallon_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gallon-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gallon_per_minute' },
      },
    },
  },
}

export const convert_gallon_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gallon-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gallon_per_hour' },
      },
    },
  },
}

export const convert_cubic_foot_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-foot-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_foot_per_second' },
      },
    },
  },
}

export const convert_cubic_foot_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-foot-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_foot_per_minute' },
      },
    },
  },
}

export const convert_cubic_foot_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-foot-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_foot_per_hour' },
      },
    },
  },
}

export const convert_cubic_yard_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-yard-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_yard_per_second' },
      },
    },
  },
}

export const convert_cubic_yard_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-yard-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_yard_per_minute' },
      },
    },
  },
}

export const convert_cubic_yard_per_hour: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['cubic-yard-per-hour'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_cubic_yard_per_hour' },
      },
    },
  },
}

export const convert_lux: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['lux'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_lux' },
      },
    },
  },
}

export const convert_foot_candle: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['foot-candle'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_foot_candle' },
      },
    },
  },
}

export const convert_millihertz: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['millihertz'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_millihertz' },
      },
    },
  },
}

export const convert_hertz: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['hertz'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_hertz' },
      },
    },
  },
}

export const convert_kilohertz: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['kilohertz'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_kilohertz' },
      },
    },
  },
}

export const convert_megahertz: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['megahertz'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_megahertz' },
      },
    },
  },
}

export const convert_gigahertz: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gigahertz'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gigahertz' },
      },
    },
  },
}

export const convert_terahertz: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['terahertz'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_terahertz' },
      },
    },
  },
}

export const convert_rotation_per_minute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['rotation-per-minute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_rotation_per_minute' },
      },
    },
  },
}

export const convert_degree_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['degree-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_degree_per_second' },
      },
    },
  },
}

export const convert_radian_per_second: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['radian-per-second'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_radian_per_second' },
      },
    },
  },
}

export const convert_radian: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['radian'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_radian' },
      },
    },
  },
}

export const convert_degree: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['degree'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_degree' },
      },
    },
  },
}

export const convert_gradian: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['gradian'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_gradian' },
      },
    },
  },
}

export const convert_arcminute: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['arcminute'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_arcminute' },
      },
    },
  },
}

export const convert_arcsecond: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { take: ['arcsecond'] },
        value: { like: 'decimal' },
      },
    },
    output: {
      link: {
        format: { like: 'conversion_unit_arcsecond' },
      },
    },
  },
}

export const convert_unit: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { like: 'unit', name: { mark: 'I' } },
        value: { like: 'decimal', name: { mark: 'i' } },
      },
    },
    output: {
      link: {
        format: { like: 'unit', name: { mark: 'O' } },
      },
    },
  },
}
