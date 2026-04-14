import { z } from 'zod'

import {
  ConversionUnitAcre,
  ConversionUnitAmpere,
  ConversionUnitArcminute,
  ConversionUnitArcsecond,
  ConversionUnitBar,
  ConversionUnitBit,
  ConversionUnitByte,
  ConversionUnitCelsius,
  ConversionUnitCentilitre,
  ConversionUnitCentilitrePerSecond,
  ConversionUnitCentimeter,
  ConversionUnitCubicCentimeter,
  ConversionUnitCubicCentimeterPerSecond,
  ConversionUnitCubicFoot,
  ConversionUnitCubicFootPerHour,
  ConversionUnitCubicFootPerMinute,
  ConversionUnitCubicFootPerSecond,
  ConversionUnitCubicInch,
  ConversionUnitCubicInchPerHour,
  ConversionUnitCubicInchPerMinute,
  ConversionUnitCubicInchPerSecond,
  ConversionUnitCubicKilometer,
  ConversionUnitCubicKilometerPerSecond,
  ConversionUnitCubicMeter,
  ConversionUnitCubicMeterPerHour,
  ConversionUnitCubicMeterPerMinute,
  ConversionUnitCubicMeterPerSecond,
  ConversionUnitCubicMillimeter,
  ConversionUnitCubicMillimeterPerSecond,
  ConversionUnitCubicYard,
  ConversionUnitCubicYardPerHour,
  ConversionUnitCubicYardPerMinute,
  ConversionUnitCubicYardPerSecond,
  ConversionUnitCup,
  ConversionUnitCupPerSecond,
  ConversionUnitDay,
  ConversionUnitDecilitre,
  ConversionUnitDecilitrePerSecond,
  ConversionUnitDegree,
  ConversionUnitDegreePerSecond,
  ConversionUnitDozen,
  ConversionUnitEach,
  ConversionUnitFahrenheit,
  ConversionUnitFluidOunce,
  ConversionUnitFluidOuncePerHour,
  ConversionUnitFluidOuncePerMinute,
  ConversionUnitFluidOuncePerSecond,
  ConversionUnitFoot,
  ConversionUnitFootCandle,
  ConversionUnitFootPerSecond,
  ConversionUnitGallon,
  ConversionUnitGallonPerHour,
  ConversionUnitGallonPerMinute,
  ConversionUnitGallonPerSecond,
  ConversionUnitGigabit,
  ConversionUnitGigabyte,
  ConversionUnitGigahertz,
  ConversionUnitGigavoltAmpere,
  ConversionUnitGigavoltAmpereReactive,
  ConversionUnitGigavoltAmpereReactiveHour,
  ConversionUnitGigawatt,
  ConversionUnitGigawattHour,
  ConversionUnitGlas,
  ConversionUnitGradian,
  ConversionUnitGram,
  ConversionUnitHectare,
  ConversionUnitHectopascal,
  ConversionUnitHertz,
  ConversionUnitHour,
  ConversionUnitInch,
  ConversionUnitJoule,
  ConversionUnitKaffekopp,
  ConversionUnitKanna,
  ConversionUnitKelvin,
  ConversionUnitKiloampere,
  ConversionUnitKilobit,
  ConversionUnitKilobyte,
  ConversionUnitKilogram,
  ConversionUnitKilohertz,
  ConversionUnitKilojoule,
  ConversionUnitKilolitre,
  ConversionUnitKilolitrePerHour,
  ConversionUnitKilolitrePerMinute,
  ConversionUnitKilolitrePerSecond,
  ConversionUnitKilometer,
  ConversionUnitKilometrePerHour,
  ConversionUnitKilopascal,
  ConversionUnitKilopoundPerSquareInch,
  ConversionUnitKilovolt,
  ConversionUnitKilovoltAmpere,
  ConversionUnitKilovoltAmpereReactive,
  ConversionUnitKilovoltAmpereReactiveHour,
  ConversionUnitKilowatt,
  ConversionUnitKilowattHour,
  ConversionUnitKnot,
  ConversionUnitLitre,
  ConversionUnitLitrePerHour,
  ConversionUnitLitrePerMinute,
  ConversionUnitLitrePerSecond,
  ConversionUnitLux,
  ConversionUnitMatsked,
  ConversionUnitMegabit,
  ConversionUnitMegabyte,
  ConversionUnitMegahertz,
  ConversionUnitMegapascal,
  ConversionUnitMegavoltAmpere,
  ConversionUnitMegavoltAmpereReactive,
  ConversionUnitMegavoltAmpereReactiveHour,
  ConversionUnitMegawatt,
  ConversionUnitMegawattHour,
  ConversionUnitMeter,
  ConversionUnitMetrePerSecond,
  ConversionUnitMetricTonne,
  ConversionUnitMicrogram,
  ConversionUnitMicrosecond,
  ConversionUnitMile,
  ConversionUnitMilePerHour,
  ConversionUnitMilliampere,
  ConversionUnitMilligram,
  ConversionUnitMillihertz,
  ConversionUnitMillilitre,
  ConversionUnitMillilitrePerSecond,
  ConversionUnitMillimeter,
  ConversionUnitMillisecond,
  ConversionUnitMillivolt,
  ConversionUnitMillivoltAmpere,
  ConversionUnitMillivoltAmpereReactive,
  ConversionUnitMillivoltAmpereReactiveHour,
  ConversionUnitMilliwatt,
  ConversionUnitMilliwattHour,
  ConversionUnitMinute,
  ConversionUnitMinutePerKilometre,
  ConversionUnitMinutePerMile,
  ConversionUnitMonth,
  ConversionUnitNanosecond,
  ConversionUnitOunce,
  ConversionUnitPartPerBillion,
  ConversionUnitPartPerMillion,
  ConversionUnitPartPerQuadrillion,
  ConversionUnitPartPerTrillion,
  ConversionUnitPascal,
  ConversionUnitPint,
  ConversionUnitPintPerHour,
  ConversionUnitPintPerMinute,
  ConversionUnitPintPerSecond,
  ConversionUnitPound,
  ConversionUnitPoundPerSquareInch,
  ConversionUnitQuart,
  ConversionUnitQuartPerSecond,
  ConversionUnitRadian,
  ConversionUnitRadianPerSecond,
  ConversionUnitRankine,
  ConversionUnitRotationPerMinute,
  ConversionUnitSecond,
  ConversionUnitSecondPerFoot,
  ConversionUnitSecondPerMetre,
  ConversionUnitSquareCentimeter,
  ConversionUnitSquareFoot,
  ConversionUnitSquareInch,
  ConversionUnitSquareKilometer,
  ConversionUnitSquareMeter,
  ConversionUnitSquareMile,
  ConversionUnitSquareMillimeter,
  ConversionUnitSquareYard,
  ConversionUnitTablespoon,
  ConversionUnitTablespoonPerSecond,
  ConversionUnitTeaspoon,
  ConversionUnitTeaspoonPerSecond,
  ConversionUnitTerabit,
  ConversionUnitTerabyte,
  ConversionUnitTerahertz,
  ConversionUnitTesked,
  ConversionUnitTon,
  ConversionUnitTorr,
  ConversionUnitUsSurveyFoot,
  ConversionUnitVolt,
  ConversionUnitVoltAmpere,
  ConversionUnitVoltAmpereReactive,
  ConversionUnitVoltAmpereReactiveHour,
  ConversionUnitWatt,
  ConversionUnitWattHour,
  ConversionUnitWeek,
  ConversionUnitYard,
  ConversionUnitYear,
  Unit,
} from '~/code/form/action/convert/unit'
import {
  CONVERSION_UNIT_ACRE,
  CONVERSION_UNIT_AMPERE,
  CONVERSION_UNIT_ARCMINUTE,
  CONVERSION_UNIT_ARCSECOND,
  CONVERSION_UNIT_BAR,
  CONVERSION_UNIT_BIT,
  CONVERSION_UNIT_BYTE,
  CONVERSION_UNIT_CELSIUS,
  CONVERSION_UNIT_CENTILITRE,
  CONVERSION_UNIT_CENTILITRE_PER_SECOND,
  CONVERSION_UNIT_CENTIMETER,
  CONVERSION_UNIT_CUBIC_CENTIMETER,
  CONVERSION_UNIT_CUBIC_CENTIMETER_PER_SECOND,
  CONVERSION_UNIT_CUBIC_FOOT,
  CONVERSION_UNIT_CUBIC_FOOT_PER_HOUR,
  CONVERSION_UNIT_CUBIC_FOOT_PER_MINUTE,
  CONVERSION_UNIT_CUBIC_FOOT_PER_SECOND,
  CONVERSION_UNIT_CUBIC_INCH,
  CONVERSION_UNIT_CUBIC_INCH_PER_HOUR,
  CONVERSION_UNIT_CUBIC_INCH_PER_MINUTE,
  CONVERSION_UNIT_CUBIC_INCH_PER_SECOND,
  CONVERSION_UNIT_CUBIC_KILOMETER,
  CONVERSION_UNIT_CUBIC_KILOMETER_PER_SECOND,
  CONVERSION_UNIT_CUBIC_METER,
  CONVERSION_UNIT_CUBIC_METER_PER_HOUR,
  CONVERSION_UNIT_CUBIC_METER_PER_MINUTE,
  CONVERSION_UNIT_CUBIC_METER_PER_SECOND,
  CONVERSION_UNIT_CUBIC_MILLIMETER,
  CONVERSION_UNIT_CUBIC_MILLIMETER_PER_SECOND,
  CONVERSION_UNIT_CUBIC_YARD,
  CONVERSION_UNIT_CUBIC_YARD_PER_HOUR,
  CONVERSION_UNIT_CUBIC_YARD_PER_MINUTE,
  CONVERSION_UNIT_CUBIC_YARD_PER_SECOND,
  CONVERSION_UNIT_CUP,
  CONVERSION_UNIT_CUP_PER_SECOND,
  CONVERSION_UNIT_DAY,
  CONVERSION_UNIT_DECILITRE,
  CONVERSION_UNIT_DECILITRE_PER_SECOND,
  CONVERSION_UNIT_DEGREE,
  CONVERSION_UNIT_DEGREE_PER_SECOND,
  CONVERSION_UNIT_DOZEN,
  CONVERSION_UNIT_EACH,
  CONVERSION_UNIT_FAHRENHEIT,
  CONVERSION_UNIT_FLUID_OUNCE,
  CONVERSION_UNIT_FLUID_OUNCE_PER_HOUR,
  CONVERSION_UNIT_FLUID_OUNCE_PER_MINUTE,
  CONVERSION_UNIT_FLUID_OUNCE_PER_SECOND,
  CONVERSION_UNIT_FOOT,
  CONVERSION_UNIT_FOOT_CANDLE,
  CONVERSION_UNIT_FOOT_PER_SECOND,
  CONVERSION_UNIT_GALLON,
  CONVERSION_UNIT_GALLON_PER_HOUR,
  CONVERSION_UNIT_GALLON_PER_MINUTE,
  CONVERSION_UNIT_GALLON_PER_SECOND,
  CONVERSION_UNIT_GIGABIT,
  CONVERSION_UNIT_GIGABYTE,
  CONVERSION_UNIT_GIGAHERTZ,
  CONVERSION_UNIT_GIGAVOLT_AMPERE,
  CONVERSION_UNIT_GIGAVOLT_AMPERE_REACTIVE,
  CONVERSION_UNIT_GIGAVOLT_AMPERE_REACTIVE_HOUR,
  CONVERSION_UNIT_GIGAWATT,
  CONVERSION_UNIT_GIGAWATT_HOUR,
  CONVERSION_UNIT_GLAS,
  CONVERSION_UNIT_GRADIAN,
  CONVERSION_UNIT_GRAM,
  CONVERSION_UNIT_HECTARE,
  CONVERSION_UNIT_HECTOPASCAL,
  CONVERSION_UNIT_HERTZ,
  CONVERSION_UNIT_HOUR,
  CONVERSION_UNIT_INCH,
  CONVERSION_UNIT_JOULE,
  CONVERSION_UNIT_KAFFEKOPP,
  CONVERSION_UNIT_KANNA,
  CONVERSION_UNIT_KELVIN,
  CONVERSION_UNIT_KILOAMPERE,
  CONVERSION_UNIT_KILOBIT,
  CONVERSION_UNIT_KILOBYTE,
  CONVERSION_UNIT_KILOGRAM,
  CONVERSION_UNIT_KILOHERTZ,
  CONVERSION_UNIT_KILOJOULE,
  CONVERSION_UNIT_KILOLITRE,
  CONVERSION_UNIT_KILOLITRE_PER_HOUR,
  CONVERSION_UNIT_KILOLITRE_PER_MINUTE,
  CONVERSION_UNIT_KILOLITRE_PER_SECOND,
  CONVERSION_UNIT_KILOMETER,
  CONVERSION_UNIT_KILOMETRE_PER_HOUR,
  CONVERSION_UNIT_KILOPASCAL,
  CONVERSION_UNIT_KILOPOUND_PER_SQUARE_INCH,
  CONVERSION_UNIT_KILOVOLT,
  CONVERSION_UNIT_KILOVOLT_AMPERE,
  CONVERSION_UNIT_KILOVOLT_AMPERE_REACTIVE,
  CONVERSION_UNIT_KILOVOLT_AMPERE_REACTIVE_HOUR,
  CONVERSION_UNIT_KILOWATT,
  CONVERSION_UNIT_KILOWATT_HOUR,
  CONVERSION_UNIT_KNOT,
  CONVERSION_UNIT_LITRE,
  CONVERSION_UNIT_LITRE_PER_HOUR,
  CONVERSION_UNIT_LITRE_PER_MINUTE,
  CONVERSION_UNIT_LITRE_PER_SECOND,
  CONVERSION_UNIT_LUX,
  CONVERSION_UNIT_MATSKED,
  CONVERSION_UNIT_MEGABIT,
  CONVERSION_UNIT_MEGABYTE,
  CONVERSION_UNIT_MEGAHERTZ,
  CONVERSION_UNIT_MEGAPASCAL,
  CONVERSION_UNIT_MEGAVOLT_AMPERE,
  CONVERSION_UNIT_MEGAVOLT_AMPERE_REACTIVE,
  CONVERSION_UNIT_MEGAVOLT_AMPERE_REACTIVE_HOUR,
  CONVERSION_UNIT_MEGAWATT,
  CONVERSION_UNIT_MEGAWATT_HOUR,
  CONVERSION_UNIT_METER,
  CONVERSION_UNIT_METRE_PER_SECOND,
  CONVERSION_UNIT_METRIC_TONNE,
  CONVERSION_UNIT_MICROGRAM,
  CONVERSION_UNIT_MICROSECOND,
  CONVERSION_UNIT_MILE,
  CONVERSION_UNIT_MILE_PER_HOUR,
  CONVERSION_UNIT_MILLIAMPERE,
  CONVERSION_UNIT_MILLIGRAM,
  CONVERSION_UNIT_MILLIHERTZ,
  CONVERSION_UNIT_MILLILITRE,
  CONVERSION_UNIT_MILLILITRE_PER_SECOND,
  CONVERSION_UNIT_MILLIMETER,
  CONVERSION_UNIT_MILLISECOND,
  CONVERSION_UNIT_MILLIVOLT,
  CONVERSION_UNIT_MILLIVOLT_AMPERE,
  CONVERSION_UNIT_MILLIVOLT_AMPERE_REACTIVE,
  CONVERSION_UNIT_MILLIVOLT_AMPERE_REACTIVE_HOUR,
  CONVERSION_UNIT_MILLIWATT,
  CONVERSION_UNIT_MILLIWATT_HOUR,
  CONVERSION_UNIT_MINUTE,
  CONVERSION_UNIT_MINUTE_PER_KILOMETRE,
  CONVERSION_UNIT_MINUTE_PER_MILE,
  CONVERSION_UNIT_MONTH,
  CONVERSION_UNIT_NANOSECOND,
  CONVERSION_UNIT_OUNCE,
  CONVERSION_UNIT_PART_PER_BILLION,
  CONVERSION_UNIT_PART_PER_MILLION,
  CONVERSION_UNIT_PART_PER_QUADRILLION,
  CONVERSION_UNIT_PART_PER_TRILLION,
  CONVERSION_UNIT_PASCAL,
  CONVERSION_UNIT_PINT,
  CONVERSION_UNIT_PINT_PER_HOUR,
  CONVERSION_UNIT_PINT_PER_MINUTE,
  CONVERSION_UNIT_PINT_PER_SECOND,
  CONVERSION_UNIT_POUND,
  CONVERSION_UNIT_POUND_PER_SQUARE_INCH,
  CONVERSION_UNIT_QUART,
  CONVERSION_UNIT_QUART_PER_SECOND,
  CONVERSION_UNIT_RADIAN,
  CONVERSION_UNIT_RADIAN_PER_SECOND,
  CONVERSION_UNIT_RANKINE,
  CONVERSION_UNIT_ROTATION_PER_MINUTE,
  CONVERSION_UNIT_SECOND,
  CONVERSION_UNIT_SECOND_PER_FOOT,
  CONVERSION_UNIT_SECOND_PER_METRE,
  CONVERSION_UNIT_SQUARE_CENTIMETER,
  CONVERSION_UNIT_SQUARE_FOOT,
  CONVERSION_UNIT_SQUARE_INCH,
  CONVERSION_UNIT_SQUARE_KILOMETER,
  CONVERSION_UNIT_SQUARE_METER,
  CONVERSION_UNIT_SQUARE_MILE,
  CONVERSION_UNIT_SQUARE_MILLIMETER,
  CONVERSION_UNIT_SQUARE_YARD,
  CONVERSION_UNIT_TABLESPOON,
  CONVERSION_UNIT_TABLESPOON_PER_SECOND,
  CONVERSION_UNIT_TEASPOON,
  CONVERSION_UNIT_TEASPOON_PER_SECOND,
  CONVERSION_UNIT_TERABIT,
  CONVERSION_UNIT_TERABYTE,
  CONVERSION_UNIT_TERAHERTZ,
  CONVERSION_UNIT_TESKED,
  CONVERSION_UNIT_TON,
  CONVERSION_UNIT_TORR,
  CONVERSION_UNIT_US_SURVEY_FOOT,
  CONVERSION_UNIT_VOLT,
  CONVERSION_UNIT_VOLT_AMPERE,
  CONVERSION_UNIT_VOLT_AMPERE_REACTIVE,
  CONVERSION_UNIT_VOLT_AMPERE_REACTIVE_HOUR,
  CONVERSION_UNIT_WATT,
  CONVERSION_UNIT_WATT_HOUR,
  CONVERSION_UNIT_WEEK,
  CONVERSION_UNIT_YARD,
  CONVERSION_UNIT_YEAR,
  UNIT,
} from '~/code/form/action/convert/unit/base'

export const ConversionUnitAcreParser = z.enum(
  CONVERSION_UNIT_ACRE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitAcre>

export const ConversionUnitAmpereParser = z.enum(
  CONVERSION_UNIT_AMPERE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitAmpere>

export const ConversionUnitArcminuteParser = z.enum(
  CONVERSION_UNIT_ARCMINUTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitArcminute>

export const ConversionUnitArcsecondParser = z.enum(
  CONVERSION_UNIT_ARCSECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitArcsecond>

export const ConversionUnitBarParser = z.enum(
  CONVERSION_UNIT_BAR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitBar>

export const ConversionUnitBitParser = z.enum(
  CONVERSION_UNIT_BIT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitBit>

export const ConversionUnitByteParser = z.enum(
  CONVERSION_UNIT_BYTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitByte>

export const ConversionUnitCelsiusParser = z.enum(
  CONVERSION_UNIT_CELSIUS as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCelsius>

export const ConversionUnitCentilitreParser = z.enum(
  CONVERSION_UNIT_CENTILITRE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCentilitre>

export const ConversionUnitCentilitrePerSecondParser = z.enum(
  CONVERSION_UNIT_CENTILITRE_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCentilitrePerSecond>

export const ConversionUnitCentimeterParser = z.enum(
  CONVERSION_UNIT_CENTIMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCentimeter>

export const ConversionUnitCubicCentimeterParser = z.enum(
  CONVERSION_UNIT_CUBIC_CENTIMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicCentimeter>

export const ConversionUnitCubicCentimeterPerSecondParser = z.enum(
  CONVERSION_UNIT_CUBIC_CENTIMETER_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicCentimeterPerSecond>

export const ConversionUnitCubicFootParser = z.enum(
  CONVERSION_UNIT_CUBIC_FOOT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicFoot>

export const ConversionUnitCubicFootPerHourParser = z.enum(
  CONVERSION_UNIT_CUBIC_FOOT_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicFootPerHour>

export const ConversionUnitCubicFootPerMinuteParser = z.enum(
  CONVERSION_UNIT_CUBIC_FOOT_PER_MINUTE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicFootPerMinute>

export const ConversionUnitCubicFootPerSecondParser = z.enum(
  CONVERSION_UNIT_CUBIC_FOOT_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicFootPerSecond>

export const ConversionUnitCubicInchParser = z.enum(
  CONVERSION_UNIT_CUBIC_INCH as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicInch>

export const ConversionUnitCubicInchPerHourParser = z.enum(
  CONVERSION_UNIT_CUBIC_INCH_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicInchPerHour>

export const ConversionUnitCubicInchPerMinuteParser = z.enum(
  CONVERSION_UNIT_CUBIC_INCH_PER_MINUTE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicInchPerMinute>

export const ConversionUnitCubicInchPerSecondParser = z.enum(
  CONVERSION_UNIT_CUBIC_INCH_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicInchPerSecond>

export const ConversionUnitCubicKilometerParser = z.enum(
  CONVERSION_UNIT_CUBIC_KILOMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicKilometer>

export const ConversionUnitCubicKilometerPerSecondParser = z.enum(
  CONVERSION_UNIT_CUBIC_KILOMETER_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicKilometerPerSecond>

export const ConversionUnitCubicMeterParser = z.enum(
  CONVERSION_UNIT_CUBIC_METER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicMeter>

export const ConversionUnitCubicMeterPerHourParser = z.enum(
  CONVERSION_UNIT_CUBIC_METER_PER_HOUR as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicMeterPerHour>

export const ConversionUnitCubicMeterPerMinuteParser = z.enum(
  CONVERSION_UNIT_CUBIC_METER_PER_MINUTE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicMeterPerMinute>

export const ConversionUnitCubicMeterPerSecondParser = z.enum(
  CONVERSION_UNIT_CUBIC_METER_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicMeterPerSecond>

export const ConversionUnitCubicMillimeterParser = z.enum(
  CONVERSION_UNIT_CUBIC_MILLIMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicMillimeter>

export const ConversionUnitCubicMillimeterPerSecondParser = z.enum(
  CONVERSION_UNIT_CUBIC_MILLIMETER_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicMillimeterPerSecond>

export const ConversionUnitCubicYardParser = z.enum(
  CONVERSION_UNIT_CUBIC_YARD as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicYard>

export const ConversionUnitCubicYardPerHourParser = z.enum(
  CONVERSION_UNIT_CUBIC_YARD_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCubicYardPerHour>

export const ConversionUnitCubicYardPerMinuteParser = z.enum(
  CONVERSION_UNIT_CUBIC_YARD_PER_MINUTE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicYardPerMinute>

export const ConversionUnitCubicYardPerSecondParser = z.enum(
  CONVERSION_UNIT_CUBIC_YARD_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitCubicYardPerSecond>

export const ConversionUnitCupParser = z.enum(
  CONVERSION_UNIT_CUP as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCup>

export const ConversionUnitCupPerSecondParser = z.enum(
  CONVERSION_UNIT_CUP_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitCupPerSecond>

export const ConversionUnitDayParser = z.enum(
  CONVERSION_UNIT_DAY as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitDay>

export const ConversionUnitDecilitreParser = z.enum(
  CONVERSION_UNIT_DECILITRE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitDecilitre>

export const ConversionUnitDecilitrePerSecondParser = z.enum(
  CONVERSION_UNIT_DECILITRE_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitDecilitrePerSecond>

export const ConversionUnitDegreeParser = z.enum(
  CONVERSION_UNIT_DEGREE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitDegree>

export const ConversionUnitDegreePerSecondParser = z.enum(
  CONVERSION_UNIT_DEGREE_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitDegreePerSecond>

export const ConversionUnitDozenParser = z.enum(
  CONVERSION_UNIT_DOZEN as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitDozen>

export const ConversionUnitEachParser = z.enum(
  CONVERSION_UNIT_EACH as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitEach>

export const ConversionUnitFahrenheitParser = z.enum(
  CONVERSION_UNIT_FAHRENHEIT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitFahrenheit>

export const ConversionUnitFluidOunceParser = z.enum(
  CONVERSION_UNIT_FLUID_OUNCE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitFluidOunce>

export const ConversionUnitFluidOuncePerHourParser = z.enum(
  CONVERSION_UNIT_FLUID_OUNCE_PER_HOUR as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitFluidOuncePerHour>

export const ConversionUnitFluidOuncePerMinuteParser = z.enum(
  CONVERSION_UNIT_FLUID_OUNCE_PER_MINUTE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitFluidOuncePerMinute>

export const ConversionUnitFluidOuncePerSecondParser = z.enum(
  CONVERSION_UNIT_FLUID_OUNCE_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitFluidOuncePerSecond>

export const ConversionUnitFootParser = z.enum(
  CONVERSION_UNIT_FOOT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitFoot>

export const ConversionUnitFootCandleParser = z.enum(
  CONVERSION_UNIT_FOOT_CANDLE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitFootCandle>

export const ConversionUnitFootPerSecondParser = z.enum(
  CONVERSION_UNIT_FOOT_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitFootPerSecond>

export const ConversionUnitGallonParser = z.enum(
  CONVERSION_UNIT_GALLON as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGallon>

export const ConversionUnitGallonPerHourParser = z.enum(
  CONVERSION_UNIT_GALLON_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGallonPerHour>

export const ConversionUnitGallonPerMinuteParser = z.enum(
  CONVERSION_UNIT_GALLON_PER_MINUTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGallonPerMinute>

export const ConversionUnitGallonPerSecondParser = z.enum(
  CONVERSION_UNIT_GALLON_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGallonPerSecond>

export const ConversionUnitGigabitParser = z.enum(
  CONVERSION_UNIT_GIGABIT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGigabit>

export const ConversionUnitGigabyteParser = z.enum(
  CONVERSION_UNIT_GIGABYTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGigabyte>

export const ConversionUnitGigahertzParser = z.enum(
  CONVERSION_UNIT_GIGAHERTZ as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGigahertz>

export const ConversionUnitGigavoltAmpereParser = z.enum(
  CONVERSION_UNIT_GIGAVOLT_AMPERE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGigavoltAmpere>

export const ConversionUnitGigavoltAmpereReactiveParser = z.enum(
  CONVERSION_UNIT_GIGAVOLT_AMPERE_REACTIVE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitGigavoltAmpereReactive>

export const ConversionUnitGigavoltAmpereReactiveHourParser = z.enum(
  CONVERSION_UNIT_GIGAVOLT_AMPERE_REACTIVE_HOUR as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitGigavoltAmpereReactiveHour>

export const ConversionUnitGigawattParser = z.enum(
  CONVERSION_UNIT_GIGAWATT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGigawatt>

export const ConversionUnitGigawattHourParser = z.enum(
  CONVERSION_UNIT_GIGAWATT_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGigawattHour>

export const ConversionUnitGlasParser = z.enum(
  CONVERSION_UNIT_GLAS as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGlas>

export const ConversionUnitGradianParser = z.enum(
  CONVERSION_UNIT_GRADIAN as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGradian>

export const ConversionUnitGramParser = z.enum(
  CONVERSION_UNIT_GRAM as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitGram>

export const ConversionUnitHectareParser = z.enum(
  CONVERSION_UNIT_HECTARE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitHectare>

export const ConversionUnitHectopascalParser = z.enum(
  CONVERSION_UNIT_HECTOPASCAL as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitHectopascal>

export const ConversionUnitHertzParser = z.enum(
  CONVERSION_UNIT_HERTZ as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitHertz>

export const ConversionUnitHourParser = z.enum(
  CONVERSION_UNIT_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitHour>

export const ConversionUnitInchParser = z.enum(
  CONVERSION_UNIT_INCH as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitInch>

export const ConversionUnitJouleParser = z.enum(
  CONVERSION_UNIT_JOULE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitJoule>

export const ConversionUnitKaffekoppParser = z.enum(
  CONVERSION_UNIT_KAFFEKOPP as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKaffekopp>

export const ConversionUnitKannaParser = z.enum(
  CONVERSION_UNIT_KANNA as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKanna>

export const ConversionUnitKelvinParser = z.enum(
  CONVERSION_UNIT_KELVIN as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKelvin>

export const ConversionUnitKiloampereParser = z.enum(
  CONVERSION_UNIT_KILOAMPERE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKiloampere>

export const ConversionUnitKilobitParser = z.enum(
  CONVERSION_UNIT_KILOBIT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilobit>

export const ConversionUnitKilobyteParser = z.enum(
  CONVERSION_UNIT_KILOBYTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilobyte>

export const ConversionUnitKilogramParser = z.enum(
  CONVERSION_UNIT_KILOGRAM as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilogram>

export const ConversionUnitKilohertzParser = z.enum(
  CONVERSION_UNIT_KILOHERTZ as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilohertz>

export const ConversionUnitKilojouleParser = z.enum(
  CONVERSION_UNIT_KILOJOULE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilojoule>

export const ConversionUnitKilolitreParser = z.enum(
  CONVERSION_UNIT_KILOLITRE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilolitre>

export const ConversionUnitKilolitrePerHourParser = z.enum(
  CONVERSION_UNIT_KILOLITRE_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilolitrePerHour>

export const ConversionUnitKilolitrePerMinuteParser = z.enum(
  CONVERSION_UNIT_KILOLITRE_PER_MINUTE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitKilolitrePerMinute>

export const ConversionUnitKilolitrePerSecondParser = z.enum(
  CONVERSION_UNIT_KILOLITRE_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitKilolitrePerSecond>

export const ConversionUnitKilometerParser = z.enum(
  CONVERSION_UNIT_KILOMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilometer>

export const ConversionUnitKilometrePerHourParser = z.enum(
  CONVERSION_UNIT_KILOMETRE_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilometrePerHour>

export const ConversionUnitKilopascalParser = z.enum(
  CONVERSION_UNIT_KILOPASCAL as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilopascal>

export const ConversionUnitKilopoundPerSquareInchParser = z.enum(
  CONVERSION_UNIT_KILOPOUND_PER_SQUARE_INCH as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitKilopoundPerSquareInch>

export const ConversionUnitKilovoltParser = z.enum(
  CONVERSION_UNIT_KILOVOLT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilovolt>

export const ConversionUnitKilovoltAmpereParser = z.enum(
  CONVERSION_UNIT_KILOVOLT_AMPERE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilovoltAmpere>

export const ConversionUnitKilovoltAmpereReactiveParser = z.enum(
  CONVERSION_UNIT_KILOVOLT_AMPERE_REACTIVE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitKilovoltAmpereReactive>

export const ConversionUnitKilovoltAmpereReactiveHourParser = z.enum(
  CONVERSION_UNIT_KILOVOLT_AMPERE_REACTIVE_HOUR as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitKilovoltAmpereReactiveHour>

export const ConversionUnitKilowattParser = z.enum(
  CONVERSION_UNIT_KILOWATT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilowatt>

export const ConversionUnitKilowattHourParser = z.enum(
  CONVERSION_UNIT_KILOWATT_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKilowattHour>

export const ConversionUnitKnotParser = z.enum(
  CONVERSION_UNIT_KNOT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitKnot>

export const ConversionUnitLitreParser = z.enum(
  CONVERSION_UNIT_LITRE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitLitre>

export const ConversionUnitLitrePerHourParser = z.enum(
  CONVERSION_UNIT_LITRE_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitLitrePerHour>

export const ConversionUnitLitrePerMinuteParser = z.enum(
  CONVERSION_UNIT_LITRE_PER_MINUTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitLitrePerMinute>

export const ConversionUnitLitrePerSecondParser = z.enum(
  CONVERSION_UNIT_LITRE_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitLitrePerSecond>

export const ConversionUnitLuxParser = z.enum(
  CONVERSION_UNIT_LUX as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitLux>

export const ConversionUnitMatskedParser = z.enum(
  CONVERSION_UNIT_MATSKED as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMatsked>

export const ConversionUnitMegabitParser = z.enum(
  CONVERSION_UNIT_MEGABIT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMegabit>

export const ConversionUnitMegabyteParser = z.enum(
  CONVERSION_UNIT_MEGABYTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMegabyte>

export const ConversionUnitMegahertzParser = z.enum(
  CONVERSION_UNIT_MEGAHERTZ as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMegahertz>

export const ConversionUnitMegapascalParser = z.enum(
  CONVERSION_UNIT_MEGAPASCAL as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMegapascal>

export const ConversionUnitMegavoltAmpereParser = z.enum(
  CONVERSION_UNIT_MEGAVOLT_AMPERE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMegavoltAmpere>

export const ConversionUnitMegavoltAmpereReactiveParser = z.enum(
  CONVERSION_UNIT_MEGAVOLT_AMPERE_REACTIVE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitMegavoltAmpereReactive>

export const ConversionUnitMegavoltAmpereReactiveHourParser = z.enum(
  CONVERSION_UNIT_MEGAVOLT_AMPERE_REACTIVE_HOUR as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitMegavoltAmpereReactiveHour>

export const ConversionUnitMegawattParser = z.enum(
  CONVERSION_UNIT_MEGAWATT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMegawatt>

export const ConversionUnitMegawattHourParser = z.enum(
  CONVERSION_UNIT_MEGAWATT_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMegawattHour>

export const ConversionUnitMeterParser = z.enum(
  CONVERSION_UNIT_METER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMeter>

export const ConversionUnitMetrePerSecondParser = z.enum(
  CONVERSION_UNIT_METRE_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMetrePerSecond>

export const ConversionUnitMetricTonneParser = z.enum(
  CONVERSION_UNIT_METRIC_TONNE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMetricTonne>

export const ConversionUnitMicrogramParser = z.enum(
  CONVERSION_UNIT_MICROGRAM as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMicrogram>

export const ConversionUnitMicrosecondParser = z.enum(
  CONVERSION_UNIT_MICROSECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMicrosecond>

export const ConversionUnitMileParser = z.enum(
  CONVERSION_UNIT_MILE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMile>

export const ConversionUnitMilePerHourParser = z.enum(
  CONVERSION_UNIT_MILE_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMilePerHour>

export const ConversionUnitMilliampereParser = z.enum(
  CONVERSION_UNIT_MILLIAMPERE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMilliampere>

export const ConversionUnitMilligramParser = z.enum(
  CONVERSION_UNIT_MILLIGRAM as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMilligram>

export const ConversionUnitMillihertzParser = z.enum(
  CONVERSION_UNIT_MILLIHERTZ as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMillihertz>

export const ConversionUnitMillilitreParser = z.enum(
  CONVERSION_UNIT_MILLILITRE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMillilitre>

export const ConversionUnitMillilitrePerSecondParser = z.enum(
  CONVERSION_UNIT_MILLILITRE_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitMillilitrePerSecond>

export const ConversionUnitMillimeterParser = z.enum(
  CONVERSION_UNIT_MILLIMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMillimeter>

export const ConversionUnitMillisecondParser = z.enum(
  CONVERSION_UNIT_MILLISECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMillisecond>

export const ConversionUnitMillivoltParser = z.enum(
  CONVERSION_UNIT_MILLIVOLT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMillivolt>

export const ConversionUnitMillivoltAmpereParser = z.enum(
  CONVERSION_UNIT_MILLIVOLT_AMPERE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMillivoltAmpere>

export const ConversionUnitMillivoltAmpereReactiveParser = z.enum(
  CONVERSION_UNIT_MILLIVOLT_AMPERE_REACTIVE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitMillivoltAmpereReactive>

export const ConversionUnitMillivoltAmpereReactiveHourParser = z.enum(
  CONVERSION_UNIT_MILLIVOLT_AMPERE_REACTIVE_HOUR as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitMillivoltAmpereReactiveHour>

export const ConversionUnitMilliwattParser = z.enum(
  CONVERSION_UNIT_MILLIWATT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMilliwatt>

export const ConversionUnitMilliwattHourParser = z.enum(
  CONVERSION_UNIT_MILLIWATT_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMilliwattHour>

export const ConversionUnitMinuteParser = z.enum(
  CONVERSION_UNIT_MINUTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMinute>

export const ConversionUnitMinutePerKilometreParser = z.enum(
  CONVERSION_UNIT_MINUTE_PER_KILOMETRE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitMinutePerKilometre>

export const ConversionUnitMinutePerMileParser = z.enum(
  CONVERSION_UNIT_MINUTE_PER_MILE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMinutePerMile>

export const ConversionUnitMonthParser = z.enum(
  CONVERSION_UNIT_MONTH as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitMonth>

export const ConversionUnitNanosecondParser = z.enum(
  CONVERSION_UNIT_NANOSECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitNanosecond>

export const ConversionUnitOunceParser = z.enum(
  CONVERSION_UNIT_OUNCE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitOunce>

export const ConversionUnitPartPerBillionParser = z.enum(
  CONVERSION_UNIT_PART_PER_BILLION as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPartPerBillion>

export const ConversionUnitPartPerMillionParser = z.enum(
  CONVERSION_UNIT_PART_PER_MILLION as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPartPerMillion>

export const ConversionUnitPartPerQuadrillionParser = z.enum(
  CONVERSION_UNIT_PART_PER_QUADRILLION as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitPartPerQuadrillion>

export const ConversionUnitPartPerTrillionParser = z.enum(
  CONVERSION_UNIT_PART_PER_TRILLION as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPartPerTrillion>

export const ConversionUnitPascalParser = z.enum(
  CONVERSION_UNIT_PASCAL as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPascal>

export const ConversionUnitPintParser = z.enum(
  CONVERSION_UNIT_PINT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPint>

export const ConversionUnitPintPerHourParser = z.enum(
  CONVERSION_UNIT_PINT_PER_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPintPerHour>

export const ConversionUnitPintPerMinuteParser = z.enum(
  CONVERSION_UNIT_PINT_PER_MINUTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPintPerMinute>

export const ConversionUnitPintPerSecondParser = z.enum(
  CONVERSION_UNIT_PINT_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPintPerSecond>

export const ConversionUnitPoundParser = z.enum(
  CONVERSION_UNIT_POUND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitPound>

export const ConversionUnitPoundPerSquareInchParser = z.enum(
  CONVERSION_UNIT_POUND_PER_SQUARE_INCH as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitPoundPerSquareInch>

export const ConversionUnitQuartParser = z.enum(
  CONVERSION_UNIT_QUART as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitQuart>

export const ConversionUnitQuartPerSecondParser = z.enum(
  CONVERSION_UNIT_QUART_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitQuartPerSecond>

export const ConversionUnitRadianParser = z.enum(
  CONVERSION_UNIT_RADIAN as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitRadian>

export const ConversionUnitRadianPerSecondParser = z.enum(
  CONVERSION_UNIT_RADIAN_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitRadianPerSecond>

export const ConversionUnitRankineParser = z.enum(
  CONVERSION_UNIT_RANKINE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitRankine>

export const ConversionUnitRotationPerMinuteParser = z.enum(
  CONVERSION_UNIT_ROTATION_PER_MINUTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitRotationPerMinute>

export const ConversionUnitSecondParser = z.enum(
  CONVERSION_UNIT_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSecond>

export const ConversionUnitSecondPerFootParser = z.enum(
  CONVERSION_UNIT_SECOND_PER_FOOT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSecondPerFoot>

export const ConversionUnitSecondPerMetreParser = z.enum(
  CONVERSION_UNIT_SECOND_PER_METRE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSecondPerMetre>

export const ConversionUnitSquareCentimeterParser = z.enum(
  CONVERSION_UNIT_SQUARE_CENTIMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSquareCentimeter>

export const ConversionUnitSquareFootParser = z.enum(
  CONVERSION_UNIT_SQUARE_FOOT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSquareFoot>

export const ConversionUnitSquareInchParser = z.enum(
  CONVERSION_UNIT_SQUARE_INCH as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSquareInch>

export const ConversionUnitSquareKilometerParser = z.enum(
  CONVERSION_UNIT_SQUARE_KILOMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSquareKilometer>

export const ConversionUnitSquareMeterParser = z.enum(
  CONVERSION_UNIT_SQUARE_METER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSquareMeter>

export const ConversionUnitSquareMileParser = z.enum(
  CONVERSION_UNIT_SQUARE_MILE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSquareMile>

export const ConversionUnitSquareMillimeterParser = z.enum(
  CONVERSION_UNIT_SQUARE_MILLIMETER as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSquareMillimeter>

export const ConversionUnitSquareYardParser = z.enum(
  CONVERSION_UNIT_SQUARE_YARD as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitSquareYard>

export const ConversionUnitTablespoonParser = z.enum(
  CONVERSION_UNIT_TABLESPOON as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTablespoon>

export const ConversionUnitTablespoonPerSecondParser = z.enum(
  CONVERSION_UNIT_TABLESPOON_PER_SECOND as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitTablespoonPerSecond>

export const ConversionUnitTeaspoonParser = z.enum(
  CONVERSION_UNIT_TEASPOON as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTeaspoon>

export const ConversionUnitTeaspoonPerSecondParser = z.enum(
  CONVERSION_UNIT_TEASPOON_PER_SECOND as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTeaspoonPerSecond>

export const ConversionUnitTerabitParser = z.enum(
  CONVERSION_UNIT_TERABIT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTerabit>

export const ConversionUnitTerabyteParser = z.enum(
  CONVERSION_UNIT_TERABYTE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTerabyte>

export const ConversionUnitTerahertzParser = z.enum(
  CONVERSION_UNIT_TERAHERTZ as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTerahertz>

export const ConversionUnitTeskedParser = z.enum(
  CONVERSION_UNIT_TESKED as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTesked>

export const ConversionUnitTonParser = z.enum(
  CONVERSION_UNIT_TON as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTon>

export const ConversionUnitTorrParser = z.enum(
  CONVERSION_UNIT_TORR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitTorr>

export const ConversionUnitUsSurveyFootParser = z.enum(
  CONVERSION_UNIT_US_SURVEY_FOOT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitUsSurveyFoot>

export const ConversionUnitVoltParser = z.enum(
  CONVERSION_UNIT_VOLT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitVolt>

export const ConversionUnitVoltAmpereParser = z.enum(
  CONVERSION_UNIT_VOLT_AMPERE as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitVoltAmpere>

export const ConversionUnitVoltAmpereReactiveParser = z.enum(
  CONVERSION_UNIT_VOLT_AMPERE_REACTIVE as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitVoltAmpereReactive>

export const ConversionUnitVoltAmpereReactiveHourParser = z.enum(
  CONVERSION_UNIT_VOLT_AMPERE_REACTIVE_HOUR as readonly [
    string,
    ...string[],
  ],
) as z.ZodType<ConversionUnitVoltAmpereReactiveHour>

export const ConversionUnitWattParser = z.enum(
  CONVERSION_UNIT_WATT as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitWatt>

export const ConversionUnitWattHourParser = z.enum(
  CONVERSION_UNIT_WATT_HOUR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitWattHour>

export const ConversionUnitWeekParser = z.enum(
  CONVERSION_UNIT_WEEK as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitWeek>

export const ConversionUnitYardParser = z.enum(
  CONVERSION_UNIT_YARD as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitYard>

export const ConversionUnitYearParser = z.enum(
  CONVERSION_UNIT_YEAR as readonly [string, ...string[]],
) as z.ZodType<ConversionUnitYear>

export const ConvertAcreParser = z.object({
  input: z.object({
    format: z.literal('acre'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitAcreParser),
  }),
})

export type ConvertAcreRecord = z.infer<typeof ConvertAcreParser>

export const ConvertAmpereParser = z.object({
  input: z.object({
    format: z.literal('ampere'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitAmpereParser),
  }),
})

export type ConvertAmpereRecord = z.infer<typeof ConvertAmpereParser>

export const ConvertArcminuteParser = z.object({
  input: z.object({
    format: z.literal('arcminute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitArcminuteParser),
  }),
})

export type ConvertArcminuteRecord = z.infer<
  typeof ConvertArcminuteParser
>

export const ConvertArcsecondParser = z.object({
  input: z.object({
    format: z.literal('arcsecond'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitArcsecondParser),
  }),
})

export type ConvertArcsecondRecord = z.infer<
  typeof ConvertArcsecondParser
>

export const ConvertBarParser = z.object({
  input: z.object({
    format: z.literal('bar'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitBarParser),
  }),
})

export type ConvertBarRecord = z.infer<typeof ConvertBarParser>

export const ConvertBitParser = z.object({
  input: z.object({
    format: z.literal('bit'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitBitParser),
  }),
})

export type ConvertBitRecord = z.infer<typeof ConvertBitParser>

export const ConvertByteParser = z.object({
  input: z.object({
    format: z.literal('byte'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitByteParser),
  }),
})

export type ConvertByteRecord = z.infer<typeof ConvertByteParser>

export const ConvertCelsiusParser = z.object({
  input: z.object({
    format: z.literal('celsius'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCelsiusParser),
  }),
})

export type ConvertCelsiusRecord = z.infer<typeof ConvertCelsiusParser>

export const ConvertCentilitreParser = z.object({
  input: z.object({
    format: z.literal('centilitre'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCentilitreParser),
  }),
})

export type ConvertCentilitreRecord = z.infer<
  typeof ConvertCentilitreParser
>

export const ConvertCentilitrePerSecondParser = z.object({
  input: z.object({
    format: z.literal('centilitre-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCentilitrePerSecondParser),
  }),
})

export type ConvertCentilitrePerSecondRecord = z.infer<
  typeof ConvertCentilitrePerSecondParser
>

export const ConvertCentimeterParser = z.object({
  input: z.object({
    format: z.literal('centimeter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCentimeterParser),
  }),
})

export type ConvertCentimeterRecord = z.infer<
  typeof ConvertCentimeterParser
>

export const ConvertCubicCentimeterParser = z.object({
  input: z.object({
    format: z.literal('cubic-centimeter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicCentimeterParser),
  }),
})

export type ConvertCubicCentimeterRecord = z.infer<
  typeof ConvertCubicCentimeterParser
>

export const ConvertCubicCentimeterPerSecondParser = z.object({
  input: z.object({
    format: z.literal('cubic-centimeter-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicCentimeterPerSecondParser),
  }),
})

export type ConvertCubicCentimeterPerSecondRecord = z.infer<
  typeof ConvertCubicCentimeterPerSecondParser
>

export const ConvertCubicFootParser = z.object({
  input: z.object({
    format: z.literal('cubic-foot'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicFootParser),
  }),
})

export type ConvertCubicFootRecord = z.infer<
  typeof ConvertCubicFootParser
>

export const ConvertCubicFootPerHourParser = z.object({
  input: z.object({
    format: z.literal('cubic-foot-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicFootPerHourParser),
  }),
})

export type ConvertCubicFootPerHourRecord = z.infer<
  typeof ConvertCubicFootPerHourParser
>

export const ConvertCubicFootPerMinuteParser = z.object({
  input: z.object({
    format: z.literal('cubic-foot-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicFootPerMinuteParser),
  }),
})

export type ConvertCubicFootPerMinuteRecord = z.infer<
  typeof ConvertCubicFootPerMinuteParser
>

export const ConvertCubicFootPerSecondParser = z.object({
  input: z.object({
    format: z.literal('cubic-foot-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicFootPerSecondParser),
  }),
})

export type ConvertCubicFootPerSecondRecord = z.infer<
  typeof ConvertCubicFootPerSecondParser
>

export const ConvertCubicInchParser = z.object({
  input: z.object({
    format: z.literal('cubic-inch'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicInchParser),
  }),
})

export type ConvertCubicInchRecord = z.infer<
  typeof ConvertCubicInchParser
>

export const ConvertCubicInchPerHourParser = z.object({
  input: z.object({
    format: z.literal('cubic-inch-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicInchPerHourParser),
  }),
})

export type ConvertCubicInchPerHourRecord = z.infer<
  typeof ConvertCubicInchPerHourParser
>

export const ConvertCubicInchPerMinuteParser = z.object({
  input: z.object({
    format: z.literal('cubic-inch-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicInchPerMinuteParser),
  }),
})

export type ConvertCubicInchPerMinuteRecord = z.infer<
  typeof ConvertCubicInchPerMinuteParser
>

export const ConvertCubicInchPerSecondParser = z.object({
  input: z.object({
    format: z.literal('cubic-inch-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicInchPerSecondParser),
  }),
})

export type ConvertCubicInchPerSecondRecord = z.infer<
  typeof ConvertCubicInchPerSecondParser
>

export const ConvertCubicKilometerParser = z.object({
  input: z.object({
    format: z.literal('cubic-kilometer'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicKilometerParser),
  }),
})

export type ConvertCubicKilometerRecord = z.infer<
  typeof ConvertCubicKilometerParser
>

export const ConvertCubicKilometerPerSecondParser = z.object({
  input: z.object({
    format: z.literal('cubic-kilometer-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicKilometerPerSecondParser),
  }),
})

export type ConvertCubicKilometerPerSecondRecord = z.infer<
  typeof ConvertCubicKilometerPerSecondParser
>

export const ConvertCubicMeterParser = z.object({
  input: z.object({
    format: z.literal('cubic-meter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicMeterParser),
  }),
})

export type ConvertCubicMeterRecord = z.infer<
  typeof ConvertCubicMeterParser
>

export const ConvertCubicMeterPerHourParser = z.object({
  input: z.object({
    format: z.literal('cubic-meter-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicMeterPerHourParser),
  }),
})

export type ConvertCubicMeterPerHourRecord = z.infer<
  typeof ConvertCubicMeterPerHourParser
>

export const ConvertCubicMeterPerMinuteParser = z.object({
  input: z.object({
    format: z.literal('cubic-meter-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicMeterPerMinuteParser),
  }),
})

export type ConvertCubicMeterPerMinuteRecord = z.infer<
  typeof ConvertCubicMeterPerMinuteParser
>

export const ConvertCubicMeterPerSecondParser = z.object({
  input: z.object({
    format: z.literal('cubic-meter-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicMeterPerSecondParser),
  }),
})

export type ConvertCubicMeterPerSecondRecord = z.infer<
  typeof ConvertCubicMeterPerSecondParser
>

export const ConvertCubicMillimeterParser = z.object({
  input: z.object({
    format: z.literal('cubic-millimeter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicMillimeterParser),
  }),
})

export type ConvertCubicMillimeterRecord = z.infer<
  typeof ConvertCubicMillimeterParser
>

export const ConvertCubicMillimeterPerSecondParser = z.object({
  input: z.object({
    format: z.literal('cubic-millimeter-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicMillimeterPerSecondParser),
  }),
})

export type ConvertCubicMillimeterPerSecondRecord = z.infer<
  typeof ConvertCubicMillimeterPerSecondParser
>

export const ConvertCubicYardParser = z.object({
  input: z.object({
    format: z.literal('cubic-yard'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicYardParser),
  }),
})

export type ConvertCubicYardRecord = z.infer<
  typeof ConvertCubicYardParser
>

export const ConvertCubicYardPerHourParser = z.object({
  input: z.object({
    format: z.literal('cubic-yard-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicYardPerHourParser),
  }),
})

export type ConvertCubicYardPerHourRecord = z.infer<
  typeof ConvertCubicYardPerHourParser
>

export const ConvertCubicYardPerMinuteParser = z.object({
  input: z.object({
    format: z.literal('cubic-yard-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicYardPerMinuteParser),
  }),
})

export type ConvertCubicYardPerMinuteRecord = z.infer<
  typeof ConvertCubicYardPerMinuteParser
>

export const ConvertCubicYardPerSecondParser = z.object({
  input: z.object({
    format: z.literal('cubic-yard-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCubicYardPerSecondParser),
  }),
})

export type ConvertCubicYardPerSecondRecord = z.infer<
  typeof ConvertCubicYardPerSecondParser
>

export const ConvertCupParser = z.object({
  input: z.object({
    format: z.literal('cup'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCupParser),
  }),
})

export type ConvertCupRecord = z.infer<typeof ConvertCupParser>

export const ConvertCupPerSecondParser = z.object({
  input: z.object({
    format: z.literal('cup-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitCupPerSecondParser),
  }),
})

export type ConvertCupPerSecondRecord = z.infer<
  typeof ConvertCupPerSecondParser
>

export const ConvertDayParser = z.object({
  input: z.object({
    format: z.literal('day'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitDayParser),
  }),
})

export type ConvertDayRecord = z.infer<typeof ConvertDayParser>

export const ConvertDecilitreParser = z.object({
  input: z.object({
    format: z.literal('decilitre'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitDecilitreParser),
  }),
})

export type ConvertDecilitreRecord = z.infer<
  typeof ConvertDecilitreParser
>

export const ConvertDecilitrePerSecondParser = z.object({
  input: z.object({
    format: z.literal('decilitre-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitDecilitrePerSecondParser),
  }),
})

export type ConvertDecilitrePerSecondRecord = z.infer<
  typeof ConvertDecilitrePerSecondParser
>

export const ConvertDegreeParser = z.object({
  input: z.object({
    format: z.literal('degree'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitDegreeParser),
  }),
})

export type ConvertDegreeRecord = z.infer<typeof ConvertDegreeParser>

export const ConvertDegreePerSecondParser = z.object({
  input: z.object({
    format: z.literal('degree-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitDegreePerSecondParser),
  }),
})

export type ConvertDegreePerSecondRecord = z.infer<
  typeof ConvertDegreePerSecondParser
>

export const ConvertDozenParser = z.object({
  input: z.object({
    format: z.literal('dozen'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitDozenParser),
  }),
})

export type ConvertDozenRecord = z.infer<typeof ConvertDozenParser>

export const ConvertEachParser = z.object({
  input: z.object({
    format: z.literal('each'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitEachParser),
  }),
})

export type ConvertEachRecord = z.infer<typeof ConvertEachParser>

export const ConvertFahrenheitParser = z.object({
  input: z.object({
    format: z.literal('fahrenheit'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitFahrenheitParser),
  }),
})

export type ConvertFahrenheitRecord = z.infer<
  typeof ConvertFahrenheitParser
>

export const ConvertFluidOunceParser = z.object({
  input: z.object({
    format: z.literal('fluid-ounce'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitFluidOunceParser),
  }),
})

export type ConvertFluidOunceRecord = z.infer<
  typeof ConvertFluidOunceParser
>

export const ConvertFluidOuncePerHourParser = z.object({
  input: z.object({
    format: z.literal('fluid-ounce-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitFluidOuncePerHourParser),
  }),
})

export type ConvertFluidOuncePerHourRecord = z.infer<
  typeof ConvertFluidOuncePerHourParser
>

export const ConvertFluidOuncePerMinuteParser = z.object({
  input: z.object({
    format: z.literal('fluid-ounce-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitFluidOuncePerMinuteParser),
  }),
})

export type ConvertFluidOuncePerMinuteRecord = z.infer<
  typeof ConvertFluidOuncePerMinuteParser
>

export const ConvertFluidOuncePerSecondParser = z.object({
  input: z.object({
    format: z.literal('fluid-ounce-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitFluidOuncePerSecondParser),
  }),
})

export type ConvertFluidOuncePerSecondRecord = z.infer<
  typeof ConvertFluidOuncePerSecondParser
>

export const ConvertFootParser = z.object({
  input: z.object({
    format: z.literal('foot'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitFootParser),
  }),
})

export type ConvertFootRecord = z.infer<typeof ConvertFootParser>

export const ConvertFootCandleParser = z.object({
  input: z.object({
    format: z.literal('foot-candle'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitFootCandleParser),
  }),
})

export type ConvertFootCandleRecord = z.infer<
  typeof ConvertFootCandleParser
>

export const ConvertFootPerSecondParser = z.object({
  input: z.object({
    format: z.literal('foot-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitFootPerSecondParser),
  }),
})

export type ConvertFootPerSecondRecord = z.infer<
  typeof ConvertFootPerSecondParser
>

export const ConvertGallonParser = z.object({
  input: z.object({
    format: z.literal('gallon'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGallonParser),
  }),
})

export type ConvertGallonRecord = z.infer<typeof ConvertGallonParser>

export const ConvertGallonPerHourParser = z.object({
  input: z.object({
    format: z.literal('gallon-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGallonPerHourParser),
  }),
})

export type ConvertGallonPerHourRecord = z.infer<
  typeof ConvertGallonPerHourParser
>

export const ConvertGallonPerMinuteParser = z.object({
  input: z.object({
    format: z.literal('gallon-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGallonPerMinuteParser),
  }),
})

export type ConvertGallonPerMinuteRecord = z.infer<
  typeof ConvertGallonPerMinuteParser
>

export const ConvertGallonPerSecondParser = z.object({
  input: z.object({
    format: z.literal('gallon-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGallonPerSecondParser),
  }),
})

export type ConvertGallonPerSecondRecord = z.infer<
  typeof ConvertGallonPerSecondParser
>

export const ConvertGigabitParser = z.object({
  input: z.object({
    format: z.literal('gigabit'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGigabitParser),
  }),
})

export type ConvertGigabitRecord = z.infer<typeof ConvertGigabitParser>

export const ConvertGigabyteParser = z.object({
  input: z.object({
    format: z.literal('gigabyte'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGigabyteParser),
  }),
})

export type ConvertGigabyteRecord = z.infer<
  typeof ConvertGigabyteParser
>

export const ConvertGigahertzParser = z.object({
  input: z.object({
    format: z.literal('gigahertz'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGigahertzParser),
  }),
})

export type ConvertGigahertzRecord = z.infer<
  typeof ConvertGigahertzParser
>

export const ConvertGigavoltAmpereParser = z.object({
  input: z.object({
    format: z.literal('gigavolt-ampere'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGigavoltAmpereParser),
  }),
})

export type ConvertGigavoltAmpereRecord = z.infer<
  typeof ConvertGigavoltAmpereParser
>

export const ConvertGigavoltAmpereReactiveParser = z.object({
  input: z.object({
    format: z.literal('gigavolt-ampere-reactive'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGigavoltAmpereReactiveParser),
  }),
})

export type ConvertGigavoltAmpereReactiveRecord = z.infer<
  typeof ConvertGigavoltAmpereReactiveParser
>

export const ConvertGigavoltAmpereReactiveHourParser = z.object({
  input: z.object({
    format: z.literal('gigavolt-ampere-reactive-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(
      () => ConversionUnitGigavoltAmpereReactiveHourParser,
    ),
  }),
})

export type ConvertGigavoltAmpereReactiveHourRecord = z.infer<
  typeof ConvertGigavoltAmpereReactiveHourParser
>

export const ConvertGigawattParser = z.object({
  input: z.object({
    format: z.literal('gigawatt'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGigawattParser),
  }),
})

export type ConvertGigawattRecord = z.infer<
  typeof ConvertGigawattParser
>

export const ConvertGigawattHourParser = z.object({
  input: z.object({
    format: z.literal('gigawatt-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGigawattHourParser),
  }),
})

export type ConvertGigawattHourRecord = z.infer<
  typeof ConvertGigawattHourParser
>

export const ConvertGlasParser = z.object({
  input: z.object({
    format: z.literal('glas'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGlasParser),
  }),
})

export type ConvertGlasRecord = z.infer<typeof ConvertGlasParser>

export const ConvertGradianParser = z.object({
  input: z.object({
    format: z.literal('gradian'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGradianParser),
  }),
})

export type ConvertGradianRecord = z.infer<typeof ConvertGradianParser>

export const ConvertGramParser = z.object({
  input: z.object({
    format: z.literal('gram'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitGramParser),
  }),
})

export type ConvertGramRecord = z.infer<typeof ConvertGramParser>

export const ConvertHectareParser = z.object({
  input: z.object({
    format: z.literal('hectare'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitHectareParser),
  }),
})

export type ConvertHectareRecord = z.infer<typeof ConvertHectareParser>

export const ConvertHectopascalParser = z.object({
  input: z.object({
    format: z.literal('hectopascal'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitHectopascalParser),
  }),
})

export type ConvertHectopascalRecord = z.infer<
  typeof ConvertHectopascalParser
>

export const ConvertHertzParser = z.object({
  input: z.object({
    format: z.literal('hertz'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitHertzParser),
  }),
})

export type ConvertHertzRecord = z.infer<typeof ConvertHertzParser>

export const ConvertHourParser = z.object({
  input: z.object({
    format: z.literal('hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitHourParser),
  }),
})

export type ConvertHourRecord = z.infer<typeof ConvertHourParser>

export const ConvertInchParser = z.object({
  input: z.object({
    format: z.literal('inch'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitInchParser),
  }),
})

export type ConvertInchRecord = z.infer<typeof ConvertInchParser>

export const ConvertJouleParser = z.object({
  input: z.object({
    format: z.literal('joule'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitJouleParser),
  }),
})

export type ConvertJouleRecord = z.infer<typeof ConvertJouleParser>

export const ConvertKaffekoppParser = z.object({
  input: z.object({
    format: z.literal('kaffekopp'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKaffekoppParser),
  }),
})

export type ConvertKaffekoppRecord = z.infer<
  typeof ConvertKaffekoppParser
>

export const ConvertKannaParser = z.object({
  input: z.object({
    format: z.literal('kanna'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKannaParser),
  }),
})

export type ConvertKannaRecord = z.infer<typeof ConvertKannaParser>

export const ConvertKelvinParser = z.object({
  input: z.object({
    format: z.literal('kelvin'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKelvinParser),
  }),
})

export type ConvertKelvinRecord = z.infer<typeof ConvertKelvinParser>

export const ConvertKiloampereParser = z.object({
  input: z.object({
    format: z.literal('kiloampere'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKiloampereParser),
  }),
})

export type ConvertKiloampereRecord = z.infer<
  typeof ConvertKiloampereParser
>

export const ConvertKilobitParser = z.object({
  input: z.object({
    format: z.literal('kilobit'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilobitParser),
  }),
})

export type ConvertKilobitRecord = z.infer<typeof ConvertKilobitParser>

export const ConvertKilobyteParser = z.object({
  input: z.object({
    format: z.literal('kilobyte'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilobyteParser),
  }),
})

export type ConvertKilobyteRecord = z.infer<
  typeof ConvertKilobyteParser
>

export const ConvertKilogramParser = z.object({
  input: z.object({
    format: z.literal('kilogram'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilogramParser),
  }),
})

export type ConvertKilogramRecord = z.infer<
  typeof ConvertKilogramParser
>

export const ConvertKilohertzParser = z.object({
  input: z.object({
    format: z.literal('kilohertz'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilohertzParser),
  }),
})

export type ConvertKilohertzRecord = z.infer<
  typeof ConvertKilohertzParser
>

export const ConvertKilojouleParser = z.object({
  input: z.object({
    format: z.literal('kilojoule'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilojouleParser),
  }),
})

export type ConvertKilojouleRecord = z.infer<
  typeof ConvertKilojouleParser
>

export const ConvertKilolitreParser = z.object({
  input: z.object({
    format: z.literal('kilolitre'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilolitreParser),
  }),
})

export type ConvertKilolitreRecord = z.infer<
  typeof ConvertKilolitreParser
>

export const ConvertKilolitrePerHourParser = z.object({
  input: z.object({
    format: z.literal('kilolitre-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilolitrePerHourParser),
  }),
})

export type ConvertKilolitrePerHourRecord = z.infer<
  typeof ConvertKilolitrePerHourParser
>

export const ConvertKilolitrePerMinuteParser = z.object({
  input: z.object({
    format: z.literal('kilolitre-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilolitrePerMinuteParser),
  }),
})

export type ConvertKilolitrePerMinuteRecord = z.infer<
  typeof ConvertKilolitrePerMinuteParser
>

export const ConvertKilolitrePerSecondParser = z.object({
  input: z.object({
    format: z.literal('kilolitre-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilolitrePerSecondParser),
  }),
})

export type ConvertKilolitrePerSecondRecord = z.infer<
  typeof ConvertKilolitrePerSecondParser
>

export const ConvertKilometerParser = z.object({
  input: z.object({
    format: z.literal('kilometer'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilometerParser),
  }),
})

export type ConvertKilometerRecord = z.infer<
  typeof ConvertKilometerParser
>

export const ConvertKilometrePerHourParser = z.object({
  input: z.object({
    format: z.literal('kilometre-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilometrePerHourParser),
  }),
})

export type ConvertKilometrePerHourRecord = z.infer<
  typeof ConvertKilometrePerHourParser
>

export const ConvertKilopascalParser = z.object({
  input: z.object({
    format: z.literal('kilopascal'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilopascalParser),
  }),
})

export type ConvertKilopascalRecord = z.infer<
  typeof ConvertKilopascalParser
>

export const ConvertKilopoundPerSquareInchParser = z.object({
  input: z.object({
    format: z.literal('kilopound-per-square-inch'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilopoundPerSquareInchParser),
  }),
})

export type ConvertKilopoundPerSquareInchRecord = z.infer<
  typeof ConvertKilopoundPerSquareInchParser
>

export const ConvertKilovoltParser = z.object({
  input: z.object({
    format: z.literal('kilovolt'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilovoltParser),
  }),
})

export type ConvertKilovoltRecord = z.infer<
  typeof ConvertKilovoltParser
>

export const ConvertKilovoltAmpereParser = z.object({
  input: z.object({
    format: z.literal('kilovolt-ampere'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilovoltAmpereParser),
  }),
})

export type ConvertKilovoltAmpereRecord = z.infer<
  typeof ConvertKilovoltAmpereParser
>

export const ConvertKilovoltAmpereReactiveParser = z.object({
  input: z.object({
    format: z.literal('kilovolt-ampere-reactive'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilovoltAmpereReactiveParser),
  }),
})

export type ConvertKilovoltAmpereReactiveRecord = z.infer<
  typeof ConvertKilovoltAmpereReactiveParser
>

export const ConvertKilovoltAmpereReactiveHourParser = z.object({
  input: z.object({
    format: z.literal('kilovolt-ampere-reactive-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(
      () => ConversionUnitKilovoltAmpereReactiveHourParser,
    ),
  }),
})

export type ConvertKilovoltAmpereReactiveHourRecord = z.infer<
  typeof ConvertKilovoltAmpereReactiveHourParser
>

export const ConvertKilowattParser = z.object({
  input: z.object({
    format: z.literal('kilowatt'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilowattParser),
  }),
})

export type ConvertKilowattRecord = z.infer<
  typeof ConvertKilowattParser
>

export const ConvertKilowattHourParser = z.object({
  input: z.object({
    format: z.literal('kilowatt-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKilowattHourParser),
  }),
})

export type ConvertKilowattHourRecord = z.infer<
  typeof ConvertKilowattHourParser
>

export const ConvertKnotParser = z.object({
  input: z.object({
    format: z.literal('knot'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitKnotParser),
  }),
})

export type ConvertKnotRecord = z.infer<typeof ConvertKnotParser>

export const ConvertLitreParser = z.object({
  input: z.object({
    format: z.literal('litre'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitLitreParser),
  }),
})

export type ConvertLitreRecord = z.infer<typeof ConvertLitreParser>

export const ConvertLitrePerHourParser = z.object({
  input: z.object({
    format: z.literal('litre-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitLitrePerHourParser),
  }),
})

export type ConvertLitrePerHourRecord = z.infer<
  typeof ConvertLitrePerHourParser
>

export const ConvertLitrePerMinuteParser = z.object({
  input: z.object({
    format: z.literal('litre-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitLitrePerMinuteParser),
  }),
})

export type ConvertLitrePerMinuteRecord = z.infer<
  typeof ConvertLitrePerMinuteParser
>

export const ConvertLitrePerSecondParser = z.object({
  input: z.object({
    format: z.literal('litre-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitLitrePerSecondParser),
  }),
})

export type ConvertLitrePerSecondRecord = z.infer<
  typeof ConvertLitrePerSecondParser
>

export const ConvertLuxParser = z.object({
  input: z.object({
    format: z.literal('lux'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitLuxParser),
  }),
})

export type ConvertLuxRecord = z.infer<typeof ConvertLuxParser>

export const ConvertMatskedParser = z.object({
  input: z.object({
    format: z.literal('matsked'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMatskedParser),
  }),
})

export type ConvertMatskedRecord = z.infer<typeof ConvertMatskedParser>

export const ConvertMegabitParser = z.object({
  input: z.object({
    format: z.literal('megabit'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMegabitParser),
  }),
})

export type ConvertMegabitRecord = z.infer<typeof ConvertMegabitParser>

export const ConvertMegabyteParser = z.object({
  input: z.object({
    format: z.literal('megabyte'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMegabyteParser),
  }),
})

export type ConvertMegabyteRecord = z.infer<
  typeof ConvertMegabyteParser
>

export const ConvertMegahertzParser = z.object({
  input: z.object({
    format: z.literal('megahertz'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMegahertzParser),
  }),
})

export type ConvertMegahertzRecord = z.infer<
  typeof ConvertMegahertzParser
>

export const ConvertMegapascalParser = z.object({
  input: z.object({
    format: z.literal('megapascal'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMegapascalParser),
  }),
})

export type ConvertMegapascalRecord = z.infer<
  typeof ConvertMegapascalParser
>

export const ConvertMegavoltAmpereParser = z.object({
  input: z.object({
    format: z.literal('megavolt-ampere'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMegavoltAmpereParser),
  }),
})

export type ConvertMegavoltAmpereRecord = z.infer<
  typeof ConvertMegavoltAmpereParser
>

export const ConvertMegavoltAmpereReactiveParser = z.object({
  input: z.object({
    format: z.literal('megavolt-ampere-reactive'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMegavoltAmpereReactiveParser),
  }),
})

export type ConvertMegavoltAmpereReactiveRecord = z.infer<
  typeof ConvertMegavoltAmpereReactiveParser
>

export const ConvertMegavoltAmpereReactiveHourParser = z.object({
  input: z.object({
    format: z.literal('megavolt-ampere-reactive-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(
      () => ConversionUnitMegavoltAmpereReactiveHourParser,
    ),
  }),
})

export type ConvertMegavoltAmpereReactiveHourRecord = z.infer<
  typeof ConvertMegavoltAmpereReactiveHourParser
>

export const ConvertMegawattParser = z.object({
  input: z.object({
    format: z.literal('megawatt'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMegawattParser),
  }),
})

export type ConvertMegawattRecord = z.infer<
  typeof ConvertMegawattParser
>

export const ConvertMegawattHourParser = z.object({
  input: z.object({
    format: z.literal('megawatt-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMegawattHourParser),
  }),
})

export type ConvertMegawattHourRecord = z.infer<
  typeof ConvertMegawattHourParser
>

export const ConvertMeterParser = z.object({
  input: z.object({
    format: z.literal('meter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMeterParser),
  }),
})

export type ConvertMeterRecord = z.infer<typeof ConvertMeterParser>

export const ConvertMetrePerSecondParser = z.object({
  input: z.object({
    format: z.literal('metre-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMetrePerSecondParser),
  }),
})

export type ConvertMetrePerSecondRecord = z.infer<
  typeof ConvertMetrePerSecondParser
>

export const ConvertMetricTonneParser = z.object({
  input: z.object({
    format: z.literal('metric-tonne'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMetricTonneParser),
  }),
})

export type ConvertMetricTonneRecord = z.infer<
  typeof ConvertMetricTonneParser
>

export const ConvertMicrogramParser = z.object({
  input: z.object({
    format: z.literal('microgram'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMicrogramParser),
  }),
})

export type ConvertMicrogramRecord = z.infer<
  typeof ConvertMicrogramParser
>

export const ConvertMicrosecondParser = z.object({
  input: z.object({
    format: z.literal('microsecond'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMicrosecondParser),
  }),
})

export type ConvertMicrosecondRecord = z.infer<
  typeof ConvertMicrosecondParser
>

export const ConvertMileParser = z.object({
  input: z.object({
    format: z.literal('mile'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMileParser),
  }),
})

export type ConvertMileRecord = z.infer<typeof ConvertMileParser>

export const ConvertMilePerHourParser = z.object({
  input: z.object({
    format: z.literal('mile-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMilePerHourParser),
  }),
})

export type ConvertMilePerHourRecord = z.infer<
  typeof ConvertMilePerHourParser
>

export const ConvertMilliampereParser = z.object({
  input: z.object({
    format: z.literal('milliampere'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMilliampereParser),
  }),
})

export type ConvertMilliampereRecord = z.infer<
  typeof ConvertMilliampereParser
>

export const ConvertMilligramParser = z.object({
  input: z.object({
    format: z.literal('milligram'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMilligramParser),
  }),
})

export type ConvertMilligramRecord = z.infer<
  typeof ConvertMilligramParser
>

export const ConvertMillihertzParser = z.object({
  input: z.object({
    format: z.literal('millihertz'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMillihertzParser),
  }),
})

export type ConvertMillihertzRecord = z.infer<
  typeof ConvertMillihertzParser
>

export const ConvertMillilitreParser = z.object({
  input: z.object({
    format: z.literal('millilitre'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMillilitreParser),
  }),
})

export type ConvertMillilitreRecord = z.infer<
  typeof ConvertMillilitreParser
>

export const ConvertMillilitrePerSecondParser = z.object({
  input: z.object({
    format: z.literal('millilitre-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMillilitrePerSecondParser),
  }),
})

export type ConvertMillilitrePerSecondRecord = z.infer<
  typeof ConvertMillilitrePerSecondParser
>

export const ConvertMillimeterParser = z.object({
  input: z.object({
    format: z.literal('millimeter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMillimeterParser),
  }),
})

export type ConvertMillimeterRecord = z.infer<
  typeof ConvertMillimeterParser
>

export const ConvertMillisecondParser = z.object({
  input: z.object({
    format: z.literal('millisecond'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMillisecondParser),
  }),
})

export type ConvertMillisecondRecord = z.infer<
  typeof ConvertMillisecondParser
>

export const ConvertMillivoltParser = z.object({
  input: z.object({
    format: z.literal('millivolt'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMillivoltParser),
  }),
})

export type ConvertMillivoltRecord = z.infer<
  typeof ConvertMillivoltParser
>

export const ConvertMillivoltAmpereParser = z.object({
  input: z.object({
    format: z.literal('millivolt-ampere'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMillivoltAmpereParser),
  }),
})

export type ConvertMillivoltAmpereRecord = z.infer<
  typeof ConvertMillivoltAmpereParser
>

export const ConvertMillivoltAmpereReactiveParser = z.object({
  input: z.object({
    format: z.literal('millivolt-ampere-reactive'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMillivoltAmpereReactiveParser),
  }),
})

export type ConvertMillivoltAmpereReactiveRecord = z.infer<
  typeof ConvertMillivoltAmpereReactiveParser
>

export const ConvertMillivoltAmpereReactiveHourParser = z.object({
  input: z.object({
    format: z.literal('millivolt-ampere-reactive-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(
      () => ConversionUnitMillivoltAmpereReactiveHourParser,
    ),
  }),
})

export type ConvertMillivoltAmpereReactiveHourRecord = z.infer<
  typeof ConvertMillivoltAmpereReactiveHourParser
>

export const ConvertMilliwattParser = z.object({
  input: z.object({
    format: z.literal('milliwatt'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMilliwattParser),
  }),
})

export type ConvertMilliwattRecord = z.infer<
  typeof ConvertMilliwattParser
>

export const ConvertMilliwattHourParser = z.object({
  input: z.object({
    format: z.literal('milliwatt-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMilliwattHourParser),
  }),
})

export type ConvertMilliwattHourRecord = z.infer<
  typeof ConvertMilliwattHourParser
>

export const ConvertMinuteParser = z.object({
  input: z.object({
    format: z.literal('minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMinuteParser),
  }),
})

export type ConvertMinuteRecord = z.infer<typeof ConvertMinuteParser>

export const ConvertMinutePerKilometreParser = z.object({
  input: z.object({
    format: z.literal('minute-per-kilometre'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMinutePerKilometreParser),
  }),
})

export type ConvertMinutePerKilometreRecord = z.infer<
  typeof ConvertMinutePerKilometreParser
>

export const ConvertMinutePerMileParser = z.object({
  input: z.object({
    format: z.literal('minute-per-mile'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMinutePerMileParser),
  }),
})

export type ConvertMinutePerMileRecord = z.infer<
  typeof ConvertMinutePerMileParser
>

export const ConvertMonthParser = z.object({
  input: z.object({
    format: z.literal('month'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitMonthParser),
  }),
})

export type ConvertMonthRecord = z.infer<typeof ConvertMonthParser>

export const ConvertNanosecondParser = z.object({
  input: z.object({
    format: z.literal('nanosecond'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitNanosecondParser),
  }),
})

export type ConvertNanosecondRecord = z.infer<
  typeof ConvertNanosecondParser
>

export const ConvertOunceParser = z.object({
  input: z.object({
    format: z.literal('ounce'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitOunceParser),
  }),
})

export type ConvertOunceRecord = z.infer<typeof ConvertOunceParser>

export const ConvertPartPerBillionParser = z.object({
  input: z.object({
    format: z.literal('part-per-billion'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPartPerBillionParser),
  }),
})

export type ConvertPartPerBillionRecord = z.infer<
  typeof ConvertPartPerBillionParser
>

export const ConvertPartPerMillionParser = z.object({
  input: z.object({
    format: z.literal('part-per-million'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPartPerMillionParser),
  }),
})

export type ConvertPartPerMillionRecord = z.infer<
  typeof ConvertPartPerMillionParser
>

export const ConvertPartPerQuadrillionParser = z.object({
  input: z.object({
    format: z.literal('part-per-quadrillion'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPartPerQuadrillionParser),
  }),
})

export type ConvertPartPerQuadrillionRecord = z.infer<
  typeof ConvertPartPerQuadrillionParser
>

export const ConvertPartPerTrillionParser = z.object({
  input: z.object({
    format: z.literal('part-per-trillion'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPartPerTrillionParser),
  }),
})

export type ConvertPartPerTrillionRecord = z.infer<
  typeof ConvertPartPerTrillionParser
>

export const ConvertPascalParser = z.object({
  input: z.object({
    format: z.literal('pascal'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPascalParser),
  }),
})

export type ConvertPascalRecord = z.infer<typeof ConvertPascalParser>

export const ConvertPintParser = z.object({
  input: z.object({
    format: z.literal('pint'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPintParser),
  }),
})

export type ConvertPintRecord = z.infer<typeof ConvertPintParser>

export const ConvertPintPerHourParser = z.object({
  input: z.object({
    format: z.literal('pint-per-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPintPerHourParser),
  }),
})

export type ConvertPintPerHourRecord = z.infer<
  typeof ConvertPintPerHourParser
>

export const ConvertPintPerMinuteParser = z.object({
  input: z.object({
    format: z.literal('pint-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPintPerMinuteParser),
  }),
})

export type ConvertPintPerMinuteRecord = z.infer<
  typeof ConvertPintPerMinuteParser
>

export const ConvertPintPerSecondParser = z.object({
  input: z.object({
    format: z.literal('pint-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPintPerSecondParser),
  }),
})

export type ConvertPintPerSecondRecord = z.infer<
  typeof ConvertPintPerSecondParser
>

export const ConvertPoundParser = z.object({
  input: z.object({
    format: z.literal('pound'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPoundParser),
  }),
})

export type ConvertPoundRecord = z.infer<typeof ConvertPoundParser>

export const ConvertPoundPerSquareInchParser = z.object({
  input: z.object({
    format: z.literal('pound-per-square-inch'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitPoundPerSquareInchParser),
  }),
})

export type ConvertPoundPerSquareInchRecord = z.infer<
  typeof ConvertPoundPerSquareInchParser
>

export const ConvertQuartParser = z.object({
  input: z.object({
    format: z.literal('quart'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitQuartParser),
  }),
})

export type ConvertQuartRecord = z.infer<typeof ConvertQuartParser>

export const ConvertQuartPerSecondParser = z.object({
  input: z.object({
    format: z.literal('quart-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitQuartPerSecondParser),
  }),
})

export type ConvertQuartPerSecondRecord = z.infer<
  typeof ConvertQuartPerSecondParser
>

export const ConvertRadianParser = z.object({
  input: z.object({
    format: z.literal('radian'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitRadianParser),
  }),
})

export type ConvertRadianRecord = z.infer<typeof ConvertRadianParser>

export const ConvertRadianPerSecondParser = z.object({
  input: z.object({
    format: z.literal('radian-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitRadianPerSecondParser),
  }),
})

export type ConvertRadianPerSecondRecord = z.infer<
  typeof ConvertRadianPerSecondParser
>

export const ConvertRankineParser = z.object({
  input: z.object({
    format: z.literal('rankine'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitRankineParser),
  }),
})

export type ConvertRankineRecord = z.infer<typeof ConvertRankineParser>

export const ConvertRotationPerMinuteParser = z.object({
  input: z.object({
    format: z.literal('rotation-per-minute'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitRotationPerMinuteParser),
  }),
})

export type ConvertRotationPerMinuteRecord = z.infer<
  typeof ConvertRotationPerMinuteParser
>

export const ConvertSecondParser = z.object({
  input: z.object({
    format: z.literal('second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSecondParser),
  }),
})

export type ConvertSecondRecord = z.infer<typeof ConvertSecondParser>

export const ConvertSecondPerFootParser = z.object({
  input: z.object({
    format: z.literal('second-per-foot'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSecondPerFootParser),
  }),
})

export type ConvertSecondPerFootRecord = z.infer<
  typeof ConvertSecondPerFootParser
>

export const ConvertSecondPerMetreParser = z.object({
  input: z.object({
    format: z.literal('second-per-metre'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSecondPerMetreParser),
  }),
})

export type ConvertSecondPerMetreRecord = z.infer<
  typeof ConvertSecondPerMetreParser
>

export const ConvertSquareCentimeterParser = z.object({
  input: z.object({
    format: z.literal('square-centimeter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSquareCentimeterParser),
  }),
})

export type ConvertSquareCentimeterRecord = z.infer<
  typeof ConvertSquareCentimeterParser
>

export const ConvertSquareFootParser = z.object({
  input: z.object({
    format: z.literal('square-foot'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSquareFootParser),
  }),
})

export type ConvertSquareFootRecord = z.infer<
  typeof ConvertSquareFootParser
>

export const ConvertSquareInchParser = z.object({
  input: z.object({
    format: z.literal('square-inch'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSquareInchParser),
  }),
})

export type ConvertSquareInchRecord = z.infer<
  typeof ConvertSquareInchParser
>

export const ConvertSquareKilometerParser = z.object({
  input: z.object({
    format: z.literal('square-kilometer'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSquareKilometerParser),
  }),
})

export type ConvertSquareKilometerRecord = z.infer<
  typeof ConvertSquareKilometerParser
>

export const ConvertSquareMeterParser = z.object({
  input: z.object({
    format: z.literal('square-meter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSquareMeterParser),
  }),
})

export type ConvertSquareMeterRecord = z.infer<
  typeof ConvertSquareMeterParser
>

export const ConvertSquareMileParser = z.object({
  input: z.object({
    format: z.literal('square-mile'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSquareMileParser),
  }),
})

export type ConvertSquareMileRecord = z.infer<
  typeof ConvertSquareMileParser
>

export const ConvertSquareMillimeterParser = z.object({
  input: z.object({
    format: z.literal('square-millimeter'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSquareMillimeterParser),
  }),
})

export type ConvertSquareMillimeterRecord = z.infer<
  typeof ConvertSquareMillimeterParser
>

export const ConvertSquareYardParser = z.object({
  input: z.object({
    format: z.literal('square-yard'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitSquareYardParser),
  }),
})

export type ConvertSquareYardRecord = z.infer<
  typeof ConvertSquareYardParser
>

export const ConvertTablespoonParser = z.object({
  input: z.object({
    format: z.literal('tablespoon'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTablespoonParser),
  }),
})

export type ConvertTablespoonRecord = z.infer<
  typeof ConvertTablespoonParser
>

export const ConvertTablespoonPerSecondParser = z.object({
  input: z.object({
    format: z.literal('tablespoon-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTablespoonPerSecondParser),
  }),
})

export type ConvertTablespoonPerSecondRecord = z.infer<
  typeof ConvertTablespoonPerSecondParser
>

export const ConvertTeaspoonParser = z.object({
  input: z.object({
    format: z.literal('teaspoon'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTeaspoonParser),
  }),
})

export type ConvertTeaspoonRecord = z.infer<
  typeof ConvertTeaspoonParser
>

export const ConvertTeaspoonPerSecondParser = z.object({
  input: z.object({
    format: z.literal('teaspoon-per-second'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTeaspoonPerSecondParser),
  }),
})

export type ConvertTeaspoonPerSecondRecord = z.infer<
  typeof ConvertTeaspoonPerSecondParser
>

export const ConvertTerabitParser = z.object({
  input: z.object({
    format: z.literal('terabit'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTerabitParser),
  }),
})

export type ConvertTerabitRecord = z.infer<typeof ConvertTerabitParser>

export const ConvertTerabyteParser = z.object({
  input: z.object({
    format: z.literal('terabyte'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTerabyteParser),
  }),
})

export type ConvertTerabyteRecord = z.infer<
  typeof ConvertTerabyteParser
>

export const ConvertTerahertzParser = z.object({
  input: z.object({
    format: z.literal('terahertz'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTerahertzParser),
  }),
})

export type ConvertTerahertzRecord = z.infer<
  typeof ConvertTerahertzParser
>

export const ConvertTeskedParser = z.object({
  input: z.object({
    format: z.literal('tesked'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTeskedParser),
  }),
})

export type ConvertTeskedRecord = z.infer<typeof ConvertTeskedParser>

export const ConvertTonParser = z.object({
  input: z.object({
    format: z.literal('ton'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTonParser),
  }),
})

export type ConvertTonRecord = z.infer<typeof ConvertTonParser>

export const ConvertTorrParser = z.object({
  input: z.object({
    format: z.literal('torr'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitTorrParser),
  }),
})

export type ConvertTorrRecord = z.infer<typeof ConvertTorrParser>

export const ConvertUnitParser = z.object({
  input: z.object({
    format: z.lazy(() => UnitParser),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => UnitParser),
  }),
})

export type ConvertUnitRecord = z.infer<typeof ConvertUnitParser>

export const ConvertUsSurveyFootParser = z.object({
  input: z.object({
    format: z.literal('us-survey-foot'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitUsSurveyFootParser),
  }),
})

export type ConvertUsSurveyFootRecord = z.infer<
  typeof ConvertUsSurveyFootParser
>

export const ConvertVoltParser = z.object({
  input: z.object({
    format: z.literal('volt'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitVoltParser),
  }),
})

export type ConvertVoltRecord = z.infer<typeof ConvertVoltParser>

export const ConvertVoltAmpereParser = z.object({
  input: z.object({
    format: z.literal('volt-ampere'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitVoltAmpereParser),
  }),
})

export type ConvertVoltAmpereRecord = z.infer<
  typeof ConvertVoltAmpereParser
>

export const ConvertVoltAmpereReactiveParser = z.object({
  input: z.object({
    format: z.literal('volt-ampere-reactive'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitVoltAmpereReactiveParser),
  }),
})

export type ConvertVoltAmpereReactiveRecord = z.infer<
  typeof ConvertVoltAmpereReactiveParser
>

export const ConvertVoltAmpereReactiveHourParser = z.object({
  input: z.object({
    format: z.literal('volt-ampere-reactive-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitVoltAmpereReactiveHourParser),
  }),
})

export type ConvertVoltAmpereReactiveHourRecord = z.infer<
  typeof ConvertVoltAmpereReactiveHourParser
>

export const ConvertWattParser = z.object({
  input: z.object({
    format: z.literal('watt'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitWattParser),
  }),
})

export type ConvertWattRecord = z.infer<typeof ConvertWattParser>

export const ConvertWattHourParser = z.object({
  input: z.object({
    format: z.literal('watt-hour'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitWattHourParser),
  }),
})

export type ConvertWattHourRecord = z.infer<
  typeof ConvertWattHourParser
>

export const ConvertWeekParser = z.object({
  input: z.object({
    format: z.literal('week'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitWeekParser),
  }),
})

export type ConvertWeekRecord = z.infer<typeof ConvertWeekParser>

export const ConvertYardParser = z.object({
  input: z.object({
    format: z.literal('yard'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitYardParser),
  }),
})

export type ConvertYardRecord = z.infer<typeof ConvertYardParser>

export const ConvertYearParser = z.object({
  input: z.object({
    format: z.literal('year'),
    value: z.number(),
  }),
  output: z.object({
    format: z.lazy(() => ConversionUnitYearParser),
  }),
})

export type ConvertYearRecord = z.infer<typeof ConvertYearParser>

export const UnitParser = z.enum(
  UNIT as readonly [string, ...string[]],
) as z.ZodType<Unit>

export const UnitKeyParser = z.object({
  key: z.string(),
})

export type UnitKeyRecord = z.infer<typeof UnitKeyParser>
