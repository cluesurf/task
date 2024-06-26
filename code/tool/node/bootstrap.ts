import {
  ARCHIVE_FORMAT,
  ASSEMBLY_SYNTAX,
  BACKEND_COMPILATION_OUTPUT,
  C_INPUT_FORMAT,
  CALIBRE_INPUT_FORMAT,
  CALIBRE_INPUT_PROFILE,
  CALIBRE_OUTPUT_FORMAT,
  CALIBRE_OUTPUT_PROFILE,
  CALL_HANDLE,
  CIPHER,
  CLANG_FORMAT,
  CLI_LOG_FORMAT,
  COMMAND_KEY,
  COMMAND_NAME,
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
  CONVERT_LATEX_TO_PNG_INPUT_FORMAT,
  CONVERT_LATEX_TO_PNG_OUTPUT_FORMAT,
  CPP_INPUT_FORMAT,
  ENSCRIPT_INPUT_FORMAT,
  ENSCRIPT_OUTPUT_FORMAT,
  FFMPEG_CODEC_AUDIO,
  FFMPEG_CODEC_SUBTITLE,
  FFMPEG_CODEC_VIDEO,
  FFMPEG_DECODER_AUDIO,
  FFMPEG_DECODER_SUBTITLE,
  FFMPEG_DECODER_VIDEO,
  FFMPEG_ENCODER_AUDIO,
  FFMPEG_ENCODER_SUBTITLE,
  FFMPEG_ENCODER_VIDEO,
  FFMPEG_FORMAT,
  FFMPEG_STRICT_OPTION,
  FILE_READER_ENCODING,
  FLIP,
  FONT_FORMAT,
  FORGE_MESSAGE_DIGEST,
  FORMAT_CODE_FORMAT,
  GIFSICLE_OPTIMIZE_OPTION,
  IMAGE_MAGICK_CHANNEL,
  IMAGE_MAGICK_COLOR_SPACE,
  IMAGE_MAGICK_COMPRESSION,
  IMAGE_MAGICK_FORMAT,
  IMAGE_MAGICK_GRAVITY,
  IMAGE_MAGICK_INPUT_FORMAT,
  IMAGE_MAGICK_OUTPUT_FORMAT,
  INKSCAPE_EXPORT_FORMAT,
  INKSCAPE_IMPORT_FORMAT,
  LIBRE_OFFICE_INPUT_FORMAT,
  LIBRE_OFFICE_OUTPUT_FORMAT,
  LLVM_ARCHITECTURE,
  LLVM_CPU,
  LLVM_FEATURE,
  LLVM_OPTIMIZATION_LEVEL,
  OBJDUMP_DEMANGLE_STYLE,
  OBJDUMP_HIDE_OPTION,
  OBJDUMP_SHOW_OPTION,
  PANDOC_INPUT_FORMAT,
  PANDOC_OUTPUT_FORMAT,
  PATOOL_FORMAT,
  PDF_LATEX_INPUT_FORMAT,
  PDF_LATEX_OUTPUT_FORMAT,
  PLEASANT_ADJECTIVE,
  PLEASANT_NOUN,
  PRETTIER_ARROW_PARENS_OPTION,
  PRETTIER_END_OF_LINE_OPTION,
  PRETTIER_HTML_WHITESPACE_SENSITIVITY_OPTION,
  PRETTIER_PLUGIN,
  PRETTIER_PROSE_WRAP_OPTION,
  PRETTIER_TYPESCRIPT_TRAILING_COMMA_OPTION,
  PRETTIER_XML_QUOTE_ATTRIBUTES_OPTION,
  PRETTIER_XML_WHITESPACE_SENSITIVITY_OPTION,
  PUPPETEER_INPUT_FORMAT,
  PUPPETEER_LIFE_CYCLE_EVENT,
  PUPPETEER_MARKDOWN_INPUT_FORMAT,
  PUPPETEER_OUTPUT_FORMAT,
  PUPPETEER_TXT_INPUT_FORMAT,
  QR_CODE_ERROR_CORRECTION_LEVEL,
  QR_CODE_FORMAT,
  RUST_COMPILER_TARGET,
  RUST_INPUT_FORMAT,
  RUST_OUTPUT_FORMAT,
  SHARED_GEMATRIA_LANGUAGE,
  SWIFT_INPUT_FORMAT,
  SYMBOL_SET,
  TASK,
  TIME_ZONE,
  TIME_ZONE_ABBREVIATION,
  TIME_ZONE_LOCATION,
  UNARCHIVER_FORMAT,
  UNIT,
  WAST_INPUT_FORMAT,
  WAST_OUTPUT_FORMAT,
  WORD_SET,
} from '~/code/type/node/data'
import { configure } from '~/code/tool/shared/config'

configure('archive_format', ARCHIVE_FORMAT)
configure('assembly_syntax', ASSEMBLY_SYNTAX)
configure('backend_compilation_output', BACKEND_COMPILATION_OUTPUT)
configure('c_input_format', C_INPUT_FORMAT)
configure('calibre_input_format', CALIBRE_INPUT_FORMAT)
configure('calibre_input_profile', CALIBRE_INPUT_PROFILE)
configure('calibre_output_format', CALIBRE_OUTPUT_FORMAT)
configure('calibre_output_profile', CALIBRE_OUTPUT_PROFILE)
configure('call_handle', CALL_HANDLE)
configure('cipher', CIPHER)
configure('clang_format', CLANG_FORMAT)
configure('cli_log_format', CLI_LOG_FORMAT)
configure('command_key', COMMAND_KEY)
configure('command_name', COMMAND_NAME)
configure('conversion_unit_acre', CONVERSION_UNIT_ACRE)
configure('conversion_unit_ampere', CONVERSION_UNIT_AMPERE)
configure('conversion_unit_arcminute', CONVERSION_UNIT_ARCMINUTE)
configure('conversion_unit_arcsecond', CONVERSION_UNIT_ARCSECOND)
configure('conversion_unit_bar', CONVERSION_UNIT_BAR)
configure('conversion_unit_bit', CONVERSION_UNIT_BIT)
configure('conversion_unit_byte', CONVERSION_UNIT_BYTE)
configure('conversion_unit_celsius', CONVERSION_UNIT_CELSIUS)
configure('conversion_unit_centilitre', CONVERSION_UNIT_CENTILITRE)
configure(
  'conversion_unit_centilitre_per_second',
  CONVERSION_UNIT_CENTILITRE_PER_SECOND,
)
configure('conversion_unit_centimeter', CONVERSION_UNIT_CENTIMETER)
configure(
  'conversion_unit_cubic_centimeter',
  CONVERSION_UNIT_CUBIC_CENTIMETER,
)
configure(
  'conversion_unit_cubic_centimeter_per_second',
  CONVERSION_UNIT_CUBIC_CENTIMETER_PER_SECOND,
)
configure('conversion_unit_cubic_foot', CONVERSION_UNIT_CUBIC_FOOT)
configure(
  'conversion_unit_cubic_foot_per_hour',
  CONVERSION_UNIT_CUBIC_FOOT_PER_HOUR,
)
configure(
  'conversion_unit_cubic_foot_per_minute',
  CONVERSION_UNIT_CUBIC_FOOT_PER_MINUTE,
)
configure(
  'conversion_unit_cubic_foot_per_second',
  CONVERSION_UNIT_CUBIC_FOOT_PER_SECOND,
)
configure('conversion_unit_cubic_inch', CONVERSION_UNIT_CUBIC_INCH)
configure(
  'conversion_unit_cubic_inch_per_hour',
  CONVERSION_UNIT_CUBIC_INCH_PER_HOUR,
)
configure(
  'conversion_unit_cubic_inch_per_minute',
  CONVERSION_UNIT_CUBIC_INCH_PER_MINUTE,
)
configure(
  'conversion_unit_cubic_inch_per_second',
  CONVERSION_UNIT_CUBIC_INCH_PER_SECOND,
)
configure(
  'conversion_unit_cubic_kilometer',
  CONVERSION_UNIT_CUBIC_KILOMETER,
)
configure(
  'conversion_unit_cubic_kilometer_per_second',
  CONVERSION_UNIT_CUBIC_KILOMETER_PER_SECOND,
)
configure('conversion_unit_cubic_meter', CONVERSION_UNIT_CUBIC_METER)
configure(
  'conversion_unit_cubic_meter_per_hour',
  CONVERSION_UNIT_CUBIC_METER_PER_HOUR,
)
configure(
  'conversion_unit_cubic_meter_per_minute',
  CONVERSION_UNIT_CUBIC_METER_PER_MINUTE,
)
configure(
  'conversion_unit_cubic_meter_per_second',
  CONVERSION_UNIT_CUBIC_METER_PER_SECOND,
)
configure(
  'conversion_unit_cubic_millimeter',
  CONVERSION_UNIT_CUBIC_MILLIMETER,
)
configure(
  'conversion_unit_cubic_millimeter_per_second',
  CONVERSION_UNIT_CUBIC_MILLIMETER_PER_SECOND,
)
configure('conversion_unit_cubic_yard', CONVERSION_UNIT_CUBIC_YARD)
configure(
  'conversion_unit_cubic_yard_per_hour',
  CONVERSION_UNIT_CUBIC_YARD_PER_HOUR,
)
configure(
  'conversion_unit_cubic_yard_per_minute',
  CONVERSION_UNIT_CUBIC_YARD_PER_MINUTE,
)
configure(
  'conversion_unit_cubic_yard_per_second',
  CONVERSION_UNIT_CUBIC_YARD_PER_SECOND,
)
configure('conversion_unit_cup', CONVERSION_UNIT_CUP)
configure(
  'conversion_unit_cup_per_second',
  CONVERSION_UNIT_CUP_PER_SECOND,
)
configure('conversion_unit_day', CONVERSION_UNIT_DAY)
configure('conversion_unit_decilitre', CONVERSION_UNIT_DECILITRE)
configure(
  'conversion_unit_decilitre_per_second',
  CONVERSION_UNIT_DECILITRE_PER_SECOND,
)
configure('conversion_unit_degree', CONVERSION_UNIT_DEGREE)
configure(
  'conversion_unit_degree_per_second',
  CONVERSION_UNIT_DEGREE_PER_SECOND,
)
configure('conversion_unit_dozen', CONVERSION_UNIT_DOZEN)
configure('conversion_unit_each', CONVERSION_UNIT_EACH)
configure('conversion_unit_fahrenheit', CONVERSION_UNIT_FAHRENHEIT)
configure('conversion_unit_fluid_ounce', CONVERSION_UNIT_FLUID_OUNCE)
configure(
  'conversion_unit_fluid_ounce_per_hour',
  CONVERSION_UNIT_FLUID_OUNCE_PER_HOUR,
)
configure(
  'conversion_unit_fluid_ounce_per_minute',
  CONVERSION_UNIT_FLUID_OUNCE_PER_MINUTE,
)
configure(
  'conversion_unit_fluid_ounce_per_second',
  CONVERSION_UNIT_FLUID_OUNCE_PER_SECOND,
)
configure('conversion_unit_foot', CONVERSION_UNIT_FOOT)
configure('conversion_unit_foot_candle', CONVERSION_UNIT_FOOT_CANDLE)
configure(
  'conversion_unit_foot_per_second',
  CONVERSION_UNIT_FOOT_PER_SECOND,
)
configure('conversion_unit_gallon', CONVERSION_UNIT_GALLON)
configure(
  'conversion_unit_gallon_per_hour',
  CONVERSION_UNIT_GALLON_PER_HOUR,
)
configure(
  'conversion_unit_gallon_per_minute',
  CONVERSION_UNIT_GALLON_PER_MINUTE,
)
configure(
  'conversion_unit_gallon_per_second',
  CONVERSION_UNIT_GALLON_PER_SECOND,
)
configure('conversion_unit_gigabit', CONVERSION_UNIT_GIGABIT)
configure('conversion_unit_gigabyte', CONVERSION_UNIT_GIGABYTE)
configure('conversion_unit_gigahertz', CONVERSION_UNIT_GIGAHERTZ)
configure(
  'conversion_unit_gigavolt_ampere',
  CONVERSION_UNIT_GIGAVOLT_AMPERE,
)
configure(
  'conversion_unit_gigavolt_ampere_reactive',
  CONVERSION_UNIT_GIGAVOLT_AMPERE_REACTIVE,
)
configure(
  'conversion_unit_gigavolt_ampere_reactive_hour',
  CONVERSION_UNIT_GIGAVOLT_AMPERE_REACTIVE_HOUR,
)
configure('conversion_unit_gigawatt', CONVERSION_UNIT_GIGAWATT)
configure(
  'conversion_unit_gigawatt_hour',
  CONVERSION_UNIT_GIGAWATT_HOUR,
)
configure('conversion_unit_glas', CONVERSION_UNIT_GLAS)
configure('conversion_unit_gradian', CONVERSION_UNIT_GRADIAN)
configure('conversion_unit_gram', CONVERSION_UNIT_GRAM)
configure('conversion_unit_hectare', CONVERSION_UNIT_HECTARE)
configure('conversion_unit_hectopascal', CONVERSION_UNIT_HECTOPASCAL)
configure('conversion_unit_hertz', CONVERSION_UNIT_HERTZ)
configure('conversion_unit_hour', CONVERSION_UNIT_HOUR)
configure('conversion_unit_inch', CONVERSION_UNIT_INCH)
configure('conversion_unit_joule', CONVERSION_UNIT_JOULE)
configure('conversion_unit_kaffekopp', CONVERSION_UNIT_KAFFEKOPP)
configure('conversion_unit_kanna', CONVERSION_UNIT_KANNA)
configure('conversion_unit_kelvin', CONVERSION_UNIT_KELVIN)
configure('conversion_unit_kiloampere', CONVERSION_UNIT_KILOAMPERE)
configure('conversion_unit_kilobit', CONVERSION_UNIT_KILOBIT)
configure('conversion_unit_kilobyte', CONVERSION_UNIT_KILOBYTE)
configure('conversion_unit_kilogram', CONVERSION_UNIT_KILOGRAM)
configure('conversion_unit_kilohertz', CONVERSION_UNIT_KILOHERTZ)
configure('conversion_unit_kilojoule', CONVERSION_UNIT_KILOJOULE)
configure('conversion_unit_kilolitre', CONVERSION_UNIT_KILOLITRE)
configure(
  'conversion_unit_kilolitre_per_hour',
  CONVERSION_UNIT_KILOLITRE_PER_HOUR,
)
configure(
  'conversion_unit_kilolitre_per_minute',
  CONVERSION_UNIT_KILOLITRE_PER_MINUTE,
)
configure(
  'conversion_unit_kilolitre_per_second',
  CONVERSION_UNIT_KILOLITRE_PER_SECOND,
)
configure('conversion_unit_kilometer', CONVERSION_UNIT_KILOMETER)
configure(
  'conversion_unit_kilometre_per_hour',
  CONVERSION_UNIT_KILOMETRE_PER_HOUR,
)
configure('conversion_unit_kilopascal', CONVERSION_UNIT_KILOPASCAL)
configure(
  'conversion_unit_kilopound_per_square_inch',
  CONVERSION_UNIT_KILOPOUND_PER_SQUARE_INCH,
)
configure('conversion_unit_kilovolt', CONVERSION_UNIT_KILOVOLT)
configure(
  'conversion_unit_kilovolt_ampere',
  CONVERSION_UNIT_KILOVOLT_AMPERE,
)
configure(
  'conversion_unit_kilovolt_ampere_reactive',
  CONVERSION_UNIT_KILOVOLT_AMPERE_REACTIVE,
)
configure(
  'conversion_unit_kilovolt_ampere_reactive_hour',
  CONVERSION_UNIT_KILOVOLT_AMPERE_REACTIVE_HOUR,
)
configure('conversion_unit_kilowatt', CONVERSION_UNIT_KILOWATT)
configure(
  'conversion_unit_kilowatt_hour',
  CONVERSION_UNIT_KILOWATT_HOUR,
)
configure('conversion_unit_knot', CONVERSION_UNIT_KNOT)
configure('conversion_unit_litre', CONVERSION_UNIT_LITRE)
configure(
  'conversion_unit_litre_per_hour',
  CONVERSION_UNIT_LITRE_PER_HOUR,
)
configure(
  'conversion_unit_litre_per_minute',
  CONVERSION_UNIT_LITRE_PER_MINUTE,
)
configure(
  'conversion_unit_litre_per_second',
  CONVERSION_UNIT_LITRE_PER_SECOND,
)
configure('conversion_unit_lux', CONVERSION_UNIT_LUX)
configure('conversion_unit_matsked', CONVERSION_UNIT_MATSKED)
configure('conversion_unit_megabit', CONVERSION_UNIT_MEGABIT)
configure('conversion_unit_megabyte', CONVERSION_UNIT_MEGABYTE)
configure('conversion_unit_megahertz', CONVERSION_UNIT_MEGAHERTZ)
configure('conversion_unit_megapascal', CONVERSION_UNIT_MEGAPASCAL)
configure(
  'conversion_unit_megavolt_ampere',
  CONVERSION_UNIT_MEGAVOLT_AMPERE,
)
configure(
  'conversion_unit_megavolt_ampere_reactive',
  CONVERSION_UNIT_MEGAVOLT_AMPERE_REACTIVE,
)
configure(
  'conversion_unit_megavolt_ampere_reactive_hour',
  CONVERSION_UNIT_MEGAVOLT_AMPERE_REACTIVE_HOUR,
)
configure('conversion_unit_megawatt', CONVERSION_UNIT_MEGAWATT)
configure(
  'conversion_unit_megawatt_hour',
  CONVERSION_UNIT_MEGAWATT_HOUR,
)
configure('conversion_unit_meter', CONVERSION_UNIT_METER)
configure(
  'conversion_unit_metre_per_second',
  CONVERSION_UNIT_METRE_PER_SECOND,
)
configure('conversion_unit_metric_tonne', CONVERSION_UNIT_METRIC_TONNE)
configure('conversion_unit_microgram', CONVERSION_UNIT_MICROGRAM)
configure('conversion_unit_microsecond', CONVERSION_UNIT_MICROSECOND)
configure('conversion_unit_mile', CONVERSION_UNIT_MILE)
configure(
  'conversion_unit_mile_per_hour',
  CONVERSION_UNIT_MILE_PER_HOUR,
)
configure('conversion_unit_milliampere', CONVERSION_UNIT_MILLIAMPERE)
configure('conversion_unit_milligram', CONVERSION_UNIT_MILLIGRAM)
configure('conversion_unit_millihertz', CONVERSION_UNIT_MILLIHERTZ)
configure('conversion_unit_millilitre', CONVERSION_UNIT_MILLILITRE)
configure(
  'conversion_unit_millilitre_per_second',
  CONVERSION_UNIT_MILLILITRE_PER_SECOND,
)
configure('conversion_unit_millimeter', CONVERSION_UNIT_MILLIMETER)
configure('conversion_unit_millisecond', CONVERSION_UNIT_MILLISECOND)
configure('conversion_unit_millivolt', CONVERSION_UNIT_MILLIVOLT)
configure(
  'conversion_unit_millivolt_ampere',
  CONVERSION_UNIT_MILLIVOLT_AMPERE,
)
configure(
  'conversion_unit_millivolt_ampere_reactive',
  CONVERSION_UNIT_MILLIVOLT_AMPERE_REACTIVE,
)
configure(
  'conversion_unit_millivolt_ampere_reactive_hour',
  CONVERSION_UNIT_MILLIVOLT_AMPERE_REACTIVE_HOUR,
)
configure('conversion_unit_milliwatt', CONVERSION_UNIT_MILLIWATT)
configure(
  'conversion_unit_milliwatt_hour',
  CONVERSION_UNIT_MILLIWATT_HOUR,
)
configure('conversion_unit_minute', CONVERSION_UNIT_MINUTE)
configure(
  'conversion_unit_minute_per_kilometre',
  CONVERSION_UNIT_MINUTE_PER_KILOMETRE,
)
configure(
  'conversion_unit_minute_per_mile',
  CONVERSION_UNIT_MINUTE_PER_MILE,
)
configure('conversion_unit_month', CONVERSION_UNIT_MONTH)
configure('conversion_unit_nanosecond', CONVERSION_UNIT_NANOSECOND)
configure('conversion_unit_ounce', CONVERSION_UNIT_OUNCE)
configure(
  'conversion_unit_part_per_billion',
  CONVERSION_UNIT_PART_PER_BILLION,
)
configure(
  'conversion_unit_part_per_million',
  CONVERSION_UNIT_PART_PER_MILLION,
)
configure(
  'conversion_unit_part_per_quadrillion',
  CONVERSION_UNIT_PART_PER_QUADRILLION,
)
configure(
  'conversion_unit_part_per_trillion',
  CONVERSION_UNIT_PART_PER_TRILLION,
)
configure('conversion_unit_pascal', CONVERSION_UNIT_PASCAL)
configure('conversion_unit_pint', CONVERSION_UNIT_PINT)
configure(
  'conversion_unit_pint_per_hour',
  CONVERSION_UNIT_PINT_PER_HOUR,
)
configure(
  'conversion_unit_pint_per_minute',
  CONVERSION_UNIT_PINT_PER_MINUTE,
)
configure(
  'conversion_unit_pint_per_second',
  CONVERSION_UNIT_PINT_PER_SECOND,
)
configure('conversion_unit_pound', CONVERSION_UNIT_POUND)
configure(
  'conversion_unit_pound_per_square_inch',
  CONVERSION_UNIT_POUND_PER_SQUARE_INCH,
)
configure('conversion_unit_quart', CONVERSION_UNIT_QUART)
configure(
  'conversion_unit_quart_per_second',
  CONVERSION_UNIT_QUART_PER_SECOND,
)
configure('conversion_unit_radian', CONVERSION_UNIT_RADIAN)
configure(
  'conversion_unit_radian_per_second',
  CONVERSION_UNIT_RADIAN_PER_SECOND,
)
configure('conversion_unit_rankine', CONVERSION_UNIT_RANKINE)
configure(
  'conversion_unit_rotation_per_minute',
  CONVERSION_UNIT_ROTATION_PER_MINUTE,
)
configure('conversion_unit_second', CONVERSION_UNIT_SECOND)
configure(
  'conversion_unit_second_per_foot',
  CONVERSION_UNIT_SECOND_PER_FOOT,
)
configure(
  'conversion_unit_second_per_metre',
  CONVERSION_UNIT_SECOND_PER_METRE,
)
configure(
  'conversion_unit_square_centimeter',
  CONVERSION_UNIT_SQUARE_CENTIMETER,
)
configure('conversion_unit_square_foot', CONVERSION_UNIT_SQUARE_FOOT)
configure('conversion_unit_square_inch', CONVERSION_UNIT_SQUARE_INCH)
configure(
  'conversion_unit_square_kilometer',
  CONVERSION_UNIT_SQUARE_KILOMETER,
)
configure('conversion_unit_square_meter', CONVERSION_UNIT_SQUARE_METER)
configure('conversion_unit_square_mile', CONVERSION_UNIT_SQUARE_MILE)
configure(
  'conversion_unit_square_millimeter',
  CONVERSION_UNIT_SQUARE_MILLIMETER,
)
configure('conversion_unit_square_yard', CONVERSION_UNIT_SQUARE_YARD)
configure('conversion_unit_tablespoon', CONVERSION_UNIT_TABLESPOON)
configure(
  'conversion_unit_tablespoon_per_second',
  CONVERSION_UNIT_TABLESPOON_PER_SECOND,
)
configure('conversion_unit_teaspoon', CONVERSION_UNIT_TEASPOON)
configure(
  'conversion_unit_teaspoon_per_second',
  CONVERSION_UNIT_TEASPOON_PER_SECOND,
)
configure('conversion_unit_terabit', CONVERSION_UNIT_TERABIT)
configure('conversion_unit_terabyte', CONVERSION_UNIT_TERABYTE)
configure('conversion_unit_terahertz', CONVERSION_UNIT_TERAHERTZ)
configure('conversion_unit_tesked', CONVERSION_UNIT_TESKED)
configure('conversion_unit_ton', CONVERSION_UNIT_TON)
configure('conversion_unit_torr', CONVERSION_UNIT_TORR)
configure(
  'conversion_unit_us_survey_foot',
  CONVERSION_UNIT_US_SURVEY_FOOT,
)
configure('conversion_unit_volt', CONVERSION_UNIT_VOLT)
configure('conversion_unit_volt_ampere', CONVERSION_UNIT_VOLT_AMPERE)
configure(
  'conversion_unit_volt_ampere_reactive',
  CONVERSION_UNIT_VOLT_AMPERE_REACTIVE,
)
configure(
  'conversion_unit_volt_ampere_reactive_hour',
  CONVERSION_UNIT_VOLT_AMPERE_REACTIVE_HOUR,
)
configure('conversion_unit_watt', CONVERSION_UNIT_WATT)
configure('conversion_unit_watt_hour', CONVERSION_UNIT_WATT_HOUR)
configure('conversion_unit_week', CONVERSION_UNIT_WEEK)
configure('conversion_unit_yard', CONVERSION_UNIT_YARD)
configure('conversion_unit_year', CONVERSION_UNIT_YEAR)
configure(
  'convert_latex_to_png_input_format',
  CONVERT_LATEX_TO_PNG_INPUT_FORMAT,
)
configure(
  'convert_latex_to_png_output_format',
  CONVERT_LATEX_TO_PNG_OUTPUT_FORMAT,
)
configure('cpp_input_format', CPP_INPUT_FORMAT)
configure('enscript_input_format', ENSCRIPT_INPUT_FORMAT)
configure('enscript_output_format', ENSCRIPT_OUTPUT_FORMAT)
configure('ffmpeg_codec_audio', FFMPEG_CODEC_AUDIO)
configure('ffmpeg_codec_subtitle', FFMPEG_CODEC_SUBTITLE)
configure('ffmpeg_codec_video', FFMPEG_CODEC_VIDEO)
configure('ffmpeg_decoder_audio', FFMPEG_DECODER_AUDIO)
configure('ffmpeg_decoder_subtitle', FFMPEG_DECODER_SUBTITLE)
configure('ffmpeg_decoder_video', FFMPEG_DECODER_VIDEO)
configure('ffmpeg_encoder_audio', FFMPEG_ENCODER_AUDIO)
configure('ffmpeg_encoder_subtitle', FFMPEG_ENCODER_SUBTITLE)
configure('ffmpeg_encoder_video', FFMPEG_ENCODER_VIDEO)
configure('ffmpeg_format', FFMPEG_FORMAT)
configure('ffmpeg_strict_option', FFMPEG_STRICT_OPTION)
configure('file_reader_encoding', FILE_READER_ENCODING)
configure('flip', FLIP)
configure('font_format', FONT_FORMAT)
configure('forge_message_digest', FORGE_MESSAGE_DIGEST)
configure('format_code_format', FORMAT_CODE_FORMAT)
configure('gifsicle_optimize_option', GIFSICLE_OPTIMIZE_OPTION)
configure('image_magick_channel', IMAGE_MAGICK_CHANNEL)
configure('image_magick_color_space', IMAGE_MAGICK_COLOR_SPACE)
configure('image_magick_compression', IMAGE_MAGICK_COMPRESSION)
configure('image_magick_format', IMAGE_MAGICK_FORMAT)
configure('image_magick_gravity', IMAGE_MAGICK_GRAVITY)
configure('image_magick_input_format', IMAGE_MAGICK_INPUT_FORMAT)
configure('image_magick_output_format', IMAGE_MAGICK_OUTPUT_FORMAT)
configure('inkscape_export_format', INKSCAPE_EXPORT_FORMAT)
configure('inkscape_import_format', INKSCAPE_IMPORT_FORMAT)
configure('libre_office_input_format', LIBRE_OFFICE_INPUT_FORMAT)
configure('libre_office_output_format', LIBRE_OFFICE_OUTPUT_FORMAT)
configure('llvm_architecture', LLVM_ARCHITECTURE)
configure('llvm_cpu', LLVM_CPU)
configure('llvm_feature', LLVM_FEATURE)
configure('llvm_optimization_level', LLVM_OPTIMIZATION_LEVEL)
configure('objdump_demangle_style', OBJDUMP_DEMANGLE_STYLE)
configure('objdump_hide_option', OBJDUMP_HIDE_OPTION)
configure('objdump_show_option', OBJDUMP_SHOW_OPTION)
configure('pandoc_input_format', PANDOC_INPUT_FORMAT)
configure('pandoc_output_format', PANDOC_OUTPUT_FORMAT)
configure('patool_format', PATOOL_FORMAT)
configure('pdf_latex_input_format', PDF_LATEX_INPUT_FORMAT)
configure('pdf_latex_output_format', PDF_LATEX_OUTPUT_FORMAT)
configure('pleasant_adjective', PLEASANT_ADJECTIVE)
configure('pleasant_noun', PLEASANT_NOUN)
configure('prettier_arrow_parens_option', PRETTIER_ARROW_PARENS_OPTION)
configure('prettier_end_of_line_option', PRETTIER_END_OF_LINE_OPTION)
configure(
  'prettier_html_whitespace_sensitivity_option',
  PRETTIER_HTML_WHITESPACE_SENSITIVITY_OPTION,
)
configure('prettier_plugin', PRETTIER_PLUGIN)
configure('prettier_prose_wrap_option', PRETTIER_PROSE_WRAP_OPTION)
configure(
  'prettier_typescript_trailing_comma_option',
  PRETTIER_TYPESCRIPT_TRAILING_COMMA_OPTION,
)
configure(
  'prettier_xml_quote_attributes_option',
  PRETTIER_XML_QUOTE_ATTRIBUTES_OPTION,
)
configure(
  'prettier_xml_whitespace_sensitivity_option',
  PRETTIER_XML_WHITESPACE_SENSITIVITY_OPTION,
)
configure('puppeteer_input_format', PUPPETEER_INPUT_FORMAT)
configure('puppeteer_life_cycle_event', PUPPETEER_LIFE_CYCLE_EVENT)
configure(
  'puppeteer_markdown_input_format',
  PUPPETEER_MARKDOWN_INPUT_FORMAT,
)
configure('puppeteer_output_format', PUPPETEER_OUTPUT_FORMAT)
configure('puppeteer_txt_input_format', PUPPETEER_TXT_INPUT_FORMAT)
configure(
  'qr_code_error_correction_level',
  QR_CODE_ERROR_CORRECTION_LEVEL,
)
configure('qr_code_format', QR_CODE_FORMAT)
configure('rust_compiler_target', RUST_COMPILER_TARGET)
configure('rust_input_format', RUST_INPUT_FORMAT)
configure('rust_output_format', RUST_OUTPUT_FORMAT)
configure('shared_gematria_language', SHARED_GEMATRIA_LANGUAGE)
configure('swift_input_format', SWIFT_INPUT_FORMAT)
configure('symbol_set', SYMBOL_SET)
configure('task', TASK)
configure('time_zone', TIME_ZONE)
configure('time_zone_abbreviation', TIME_ZONE_ABBREVIATION)
configure('time_zone_location', TIME_ZONE_LOCATION)
configure('unarchiver_format', UNARCHIVER_FORMAT)
configure('unit', UNIT)
configure('wast_input_format', WAST_INPUT_FORMAT)
configure('wast_output_format', WAST_OUTPUT_FORMAT)
configure('word_set', WORD_SET)
