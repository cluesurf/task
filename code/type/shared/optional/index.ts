import merge from 'lodash/merge'
import {
  ArchiveFormat,
  AssemblySyntax,
  BackendCompilationOutput,
  CInputFormat,
  CalibreInputFormat,
  CalibreOutputFormat,
  ClangFormat,
  CliLogFormat,
  CommandKey,
  CommandName,
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
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
  CppInputFormat,
  EnscriptInputFormat,
  EnscriptOutputFormat,
  FfmpegCodecAudio,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegFormat,
  FfmpegStrictOption,
  Flip,
  FontFormat,
  ForgeMessageDigest,
  GifsicleOptimizeOption,
  ImageMagickColorSpace,
  ImageMagickCompression,
  ImageMagickFormat,
  ImageMagickGravity,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
  LlvmArchitecture,
  LlvmOptimizationLevel,
  ObjdumpDemangleStyle,
  ObjdumpHideOption,
  ObjdumpShowOption,
  PandocInputFormat,
  PandocOutputFormat,
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
  PrettierArrowParensOption,
  PrettierEndOfLineOption,
  PrettierHtmlWhitespaceSensitivityOption,
  PrettierPlugin,
  PrettierProseWrapOption,
  PrettierTypescriptTrailingCommaOption,
  PrettierXmlQuoteAttributesOption,
  PrettierXmlWhitespaceSensitivityOption,
  PuppeteerInputFormat,
  PuppeteerLifeCycleEvent,
  PuppeteerOutputFormat,
  QrCodeErrorCorrectionLevel,
  QrCodeFormat,
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
  SwiftInputFormat,
  SymbolSet,
  TimeZone,
  Unit,
  WastInputFormat,
  WastOutputFormat,
  WordSet,
} from '~/code/type/shared/index.js'

export type AddAudioToVideoWithFfmpegOptional = {
  inputVideoPath?: string
  inputAudioPath?: string
  outputPath?: string
  audioCodec?: string
  fit?: boolean
}
export type AnonymousSymbolSetOptional = {
  form?: 'anonymous-symbol-set'
  list?: string
}
export type AnonymousWordSetOptional = {
  form?: 'anonymous-word-set'
  list?: Array<string>
}
export type ArchiveOptional = {
  input?: {
    path?: string
  }
  output?: {
    format?: ArchiveFormat
    file?: {
      path?: string
    }
  }
}
export type BackendCompilationOutputDataOptional = {
  extension?: string
}
export type BuildBaseFileInputOptional = {
  tool?: string
  input?: {
    file?: {
      path?: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
}
export type BuildBaseInputDirectoryOrFileOutputFileOptional = {
  input?: {
    directory?: {
      path?: string
    }
    file?: {
      path?: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
}
export type BuildBaseInputFileOutputDirectoryOptional = {
  output?: {
    directory?: {
      path?: string
    }
  }
  input?: {
    file?: {
      path?: string
    }
  }
}
export type BuildCommandToOptimizeGifWithGifsicleOptional = {
  lossy?: number
  background?: string
  left?: number
  right?: number
  top?: number
  bottom?: number
  flip?: Flip
  transparent?: string
  optimize?: GifsicleOptimizeOption
  scale?: number
  output?: {
    file?: {
      path?: string
    }
  }
}
export type BuildFormatInputOutputOptional = {
  tool?: string
  input?: {
    format?: string
  }
  output?: {
    format?: string
  }
}
export type CalculateGematriaOptional = {
  input?: {
    string?: {
      decoded?: string
      encoded?: string
    }
  }
}
export type CalibreFormatDataOptional = {
  head?: string
}
export type CheckFileTypeUsingMagicBytesOptional = {
  input?: {
    file?: {
      path?: string
    }
  }
}
export type CipherDataOptional = {
  head?: string
}
export type CommandOptional = {
  name?: CommandName
  key?: CommandKey
  link?: Array<string>
}
export type CommandSequenceOptional = {
  call?: Array<CommandOptional>
}
export type CompileApiOptional = {
  input?: {
    format?: string
  }
  output?: {
    format?: string
  }
}
export type CompileAsmOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
}
export type CompileCCommandInputOptional = {
  input?: {
    format?: CInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalPathOptional
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCliBaseOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
  output?: {
    format?: string
    file?: {
      path?: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}
export type CompileCppCommandInputOptional = {
  input?: {
    format?: CppInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalPathOptional
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileJavaOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
}
export type CompileLlvmOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
}
export type CompileLlvmIrToAssemblyOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
  output?: {
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
    file?: {
      path?: string
    }
  }
}
export type CompileRustCommandInputOptional = {
  input?: {
    format?: RustInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: RustOutputFormat
    file?: LocalPathOptional
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileSwiftCommandInputOptional = {
  input?: {
    format?: SwiftInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: BackendCompilationOutput
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type CompileWastCommandInputOptional = {
  input?: {
    format?: WastInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: WastOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type CompressMp4WithFfmpegOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
  output?: {
    format?: string
    file?: {
      path?: string
    }
  }
  audioCodec?: FfmpegCodecAudio
  videoCodec?: FfmpegCodecVideo
}
export type ConvertAcreOptional = {
  input?: {
    format?: 'acre'
    value?: number
  }
  output?: {
    format?: ConversionUnitAcre
  }
}
export type ConvertAmpereOptional = {
  input?: {
    format?: 'ampere'
    value?: number
  }
  output?: {
    format?: ConversionUnitAmpere
  }
}
export type ConvertApiOptional = {
  input?: {
    format?: string
  }
  output?: {
    format?: string
  }
}
export type ConvertArchiveCommandInputOptional = {
  input?: {
    format?: ArchiveFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: ArchiveFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertArcminuteOptional = {
  input?: {
    format?: 'arcminute'
    value?: number
  }
  output?: {
    format?: ConversionUnitArcminute
  }
}
export type ConvertArcsecondOptional = {
  input?: {
    format?: 'arcsecond'
    value?: number
  }
  output?: {
    format?: ConversionUnitArcsecond
  }
}
export type ConvertBarOptional = {
  input?: {
    format?: 'bar'
    value?: number
  }
  output?: {
    format?: ConversionUnitBar
  }
}
export type ConvertBitOptional = {
  input?: {
    format?: 'bit'
    value?: number
  }
  output?: {
    format?: ConversionUnitBit
  }
}
export type ConvertByteOptional = {
  input?: {
    format?: 'byte'
    value?: number
  }
  output?: {
    format?: ConversionUnitByte
  }
}
export type ConvertCelsiusOptional = {
  input?: {
    format?: 'celsius'
    value?: number
  }
  output?: {
    format?: ConversionUnitCelsius
  }
}
export type ConvertCentilitreOptional = {
  input?: {
    format?: 'centilitre'
    value?: number
  }
  output?: {
    format?: ConversionUnitCentilitre
  }
}
export type ConvertCentilitrePerSecondOptional = {
  input?: {
    format?: 'centilitre-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCentilitrePerSecond
  }
}
export type ConvertCentimeterOptional = {
  input?: {
    format?: 'centimeter'
    value?: number
  }
  output?: {
    format?: ConversionUnitCentimeter
  }
}
export type ConvertCliBaseOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
  output?: {
    format?: string
    file?: {
      path?: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}
export type ConvertCubicCentimeterOptional = {
  input?: {
    format?: 'cubic-centimeter'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicCentimeter
  }
}
export type ConvertCubicCentimeterPerSecondOptional = {
  input?: {
    format?: 'cubic-centimeter-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicCentimeterPerSecond
  }
}
export type ConvertCubicFootOptional = {
  input?: {
    format?: 'cubic-foot'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicFoot
  }
}
export type ConvertCubicFootPerHourOptional = {
  input?: {
    format?: 'cubic-foot-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicFootPerHour
  }
}
export type ConvertCubicFootPerMinuteOptional = {
  input?: {
    format?: 'cubic-foot-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicFootPerMinute
  }
}
export type ConvertCubicFootPerSecondOptional = {
  input?: {
    format?: 'cubic-foot-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicFootPerSecond
  }
}
export type ConvertCubicInchOptional = {
  input?: {
    format?: 'cubic-inch'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicInch
  }
}
export type ConvertCubicInchPerHourOptional = {
  input?: {
    format?: 'cubic-inch-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicInchPerHour
  }
}
export type ConvertCubicInchPerMinuteOptional = {
  input?: {
    format?: 'cubic-inch-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicInchPerMinute
  }
}
export type ConvertCubicInchPerSecondOptional = {
  input?: {
    format?: 'cubic-inch-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicInchPerSecond
  }
}
export type ConvertCubicKilometerOptional = {
  input?: {
    format?: 'cubic-kilometer'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicKilometer
  }
}
export type ConvertCubicKilometerPerSecondOptional = {
  input?: {
    format?: 'cubic-kilometer-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicKilometerPerSecond
  }
}
export type ConvertCubicMeterOptional = {
  input?: {
    format?: 'cubic-meter'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicMeter
  }
}
export type ConvertCubicMeterPerHourOptional = {
  input?: {
    format?: 'cubic-meter-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicMeterPerHour
  }
}
export type ConvertCubicMeterPerMinuteOptional = {
  input?: {
    format?: 'cubic-meter-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicMeterPerMinute
  }
}
export type ConvertCubicMeterPerSecondOptional = {
  input?: {
    format?: 'cubic-meter-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicMeterPerSecond
  }
}
export type ConvertCubicMillimeterOptional = {
  input?: {
    format?: 'cubic-millimeter'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicMillimeter
  }
}
export type ConvertCubicMillimeterPerSecondOptional = {
  input?: {
    format?: 'cubic-millimeter-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicMillimeterPerSecond
  }
}
export type ConvertCubicYardOptional = {
  input?: {
    format?: 'cubic-yard'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicYard
  }
}
export type ConvertCubicYardPerHourOptional = {
  input?: {
    format?: 'cubic-yard-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicYardPerHour
  }
}
export type ConvertCubicYardPerMinuteOptional = {
  input?: {
    format?: 'cubic-yard-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicYardPerMinute
  }
}
export type ConvertCubicYardPerSecondOptional = {
  input?: {
    format?: 'cubic-yard-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCubicYardPerSecond
  }
}
export type ConvertCupOptional = {
  input?: {
    format?: 'cup'
    value?: number
  }
  output?: {
    format?: ConversionUnitCup
  }
}
export type ConvertCupPerSecondOptional = {
  input?: {
    format?: 'cup-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitCupPerSecond
  }
}
export type ConvertDayOptional = {
  input?: {
    format?: 'day'
    value?: number
  }
  output?: {
    format?: ConversionUnitDay
  }
}
export type ConvertDecilitreOptional = {
  input?: {
    format?: 'decilitre'
    value?: number
  }
  output?: {
    format?: ConversionUnitDecilitre
  }
}
export type ConvertDecilitrePerSecondOptional = {
  input?: {
    format?: 'decilitre-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitDecilitrePerSecond
  }
}
export type ConvertDegreeOptional = {
  input?: {
    format?: 'degree'
    value?: number
  }
  output?: {
    format?: ConversionUnitDegree
  }
}
export type ConvertDegreePerSecondOptional = {
  input?: {
    format?: 'degree-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitDegreePerSecond
  }
}
export type ConvertDocumentWithCalibreCommandInputOptional = {
  input?: {
    format?: CalibreInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: CalibreOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithEnscriptCommandInputOptional = {
  input?: {
    format?: EnscriptInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: EnscriptOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterCommandInputOptional = {
  input?: {
    format?: string
    file?: LocalPathOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeCommandInputOptional = {
  input?: {
    format?: LibreOfficeInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: LibreOfficeOutputFormat
    directory?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocCommandInputOptional = {
  input?: {
    format?: PandocInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: PandocOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertDozenOptional = {
  input?: {
    format?: 'dozen'
    value?: number
  }
  output?: {
    format?: ConversionUnitDozen
  }
}
export type ConvertEachOptional = {
  input?: {
    format?: 'each'
    value?: number
  }
  output?: {
    format?: ConversionUnitEach
  }
}
export type ConvertFahrenheitOptional = {
  input?: {
    format?: 'fahrenheit'
    value?: number
  }
  output?: {
    format?: ConversionUnitFahrenheit
  }
}
export type ConvertFileBaseOptional = {
  tool?: string
  remote?: boolean
  async?: boolean
  input?: {
    format?: string
    file?: FileContentOptional | FilePathOptional
  }
  output?: {
    format?: string
    file?: {
      path?: string
    }
  }
}
export type ConvertFileBaseRemoteOptional = {
  tool?: string
  remote?: boolean
  async?: boolean
  input?: {
    format?: string
    file?: FileContentOptional | FilePathOptional
  }
  output?: {
    format?: string
  }
}
export type ConvertFluidOunceOptional = {
  input?: {
    format?: 'fluid-ounce'
    value?: number
  }
  output?: {
    format?: ConversionUnitFluidOunce
  }
}
export type ConvertFluidOuncePerHourOptional = {
  input?: {
    format?: 'fluid-ounce-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitFluidOuncePerHour
  }
}
export type ConvertFluidOuncePerMinuteOptional = {
  input?: {
    format?: 'fluid-ounce-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitFluidOuncePerMinute
  }
}
export type ConvertFluidOuncePerSecondOptional = {
  input?: {
    format?: 'fluid-ounce-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitFluidOuncePerSecond
  }
}
export type ConvertFontWithFontForgeCommandInputOptional = {
  input?: {
    format?: FontFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: FontFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertFootOptional = {
  input?: {
    format?: 'foot'
    value?: number
  }
  output?: {
    format?: ConversionUnitFoot
  }
}
export type ConvertFootCandleOptional = {
  input?: {
    format?: 'foot-candle'
    value?: number
  }
  output?: {
    format?: ConversionUnitFootCandle
  }
}
export type ConvertFootPerSecondOptional = {
  input?: {
    format?: 'foot-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitFootPerSecond
  }
}
export type ConvertGallonOptional = {
  input?: {
    format?: 'gallon'
    value?: number
  }
  output?: {
    format?: ConversionUnitGallon
  }
}
export type ConvertGallonPerHourOptional = {
  input?: {
    format?: 'gallon-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitGallonPerHour
  }
}
export type ConvertGallonPerMinuteOptional = {
  input?: {
    format?: 'gallon-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitGallonPerMinute
  }
}
export type ConvertGallonPerSecondOptional = {
  input?: {
    format?: 'gallon-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitGallonPerSecond
  }
}
export type ConvertGigabitOptional = {
  input?: {
    format?: 'gigabit'
    value?: number
  }
  output?: {
    format?: ConversionUnitGigabit
  }
}
export type ConvertGigabyteOptional = {
  input?: {
    format?: 'gigabyte'
    value?: number
  }
  output?: {
    format?: ConversionUnitGigabyte
  }
}
export type ConvertGigahertzOptional = {
  input?: {
    format?: 'gigahertz'
    value?: number
  }
  output?: {
    format?: ConversionUnitGigahertz
  }
}
export type ConvertGigavoltAmpereOptional = {
  input?: {
    format?: 'gigavolt-ampere'
    value?: number
  }
  output?: {
    format?: ConversionUnitGigavoltAmpere
  }
}
export type ConvertGigavoltAmpereReactiveOptional = {
  input?: {
    format?: 'gigavolt-ampere-reactive'
    value?: number
  }
  output?: {
    format?: ConversionUnitGigavoltAmpereReactive
  }
}
export type ConvertGigavoltAmpereReactiveHourOptional = {
  input?: {
    format?: 'gigavolt-ampere-reactive-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitGigavoltAmpereReactiveHour
  }
}
export type ConvertGigawattOptional = {
  input?: {
    format?: 'gigawatt'
    value?: number
  }
  output?: {
    format?: ConversionUnitGigawatt
  }
}
export type ConvertGigawattHourOptional = {
  input?: {
    format?: 'gigawatt-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitGigawattHour
  }
}
export type ConvertGlasOptional = {
  input?: {
    format?: 'glas'
    value?: number
  }
  output?: {
    format?: ConversionUnitGlas
  }
}
export type ConvertGradianOptional = {
  input?: {
    format?: 'gradian'
    value?: number
  }
  output?: {
    format?: ConversionUnitGradian
  }
}
export type ConvertGramOptional = {
  input?: {
    format?: 'gram'
    value?: number
  }
  output?: {
    format?: ConversionUnitGram
  }
}
export type ConvertHectareOptional = {
  input?: {
    format?: 'hectare'
    value?: number
  }
  output?: {
    format?: ConversionUnitHectare
  }
}
export type ConvertHectopascalOptional = {
  input?: {
    format?: 'hectopascal'
    value?: number
  }
  output?: {
    format?: ConversionUnitHectopascal
  }
}
export type ConvertHertzOptional = {
  input?: {
    format?: 'hertz'
    value?: number
  }
  output?: {
    format?: ConversionUnitHertz
  }
}
export type ConvertHourOptional = {
  input?: {
    format?: 'hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitHour
  }
}
export type ConvertHtmlWithPuppeteerCommandInputOptional = {
  input?: {
    format?: PuppeteerInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: PuppeteerOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
  viewport?: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertImageWithImageMagickCommandInputOptional = {
  input?: {
    format?: ImageMagickInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: ImageMagickOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrixOptional
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithInkscapeCommandInputOptional = {
  input?: {
    format?: string
    file?: LocalPathOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertInchOptional = {
  input?: {
    format?: 'inch'
    value?: number
  }
  output?: {
    format?: ConversionUnitInch
  }
}
export type ConvertJouleOptional = {
  input?: {
    format?: 'joule'
    value?: number
  }
  output?: {
    format?: ConversionUnitJoule
  }
}
export type ConvertKaffekoppOptional = {
  input?: {
    format?: 'kaffekopp'
    value?: number
  }
  output?: {
    format?: ConversionUnitKaffekopp
  }
}
export type ConvertKannaOptional = {
  input?: {
    format?: 'kanna'
    value?: number
  }
  output?: {
    format?: ConversionUnitKanna
  }
}
export type ConvertKelvinOptional = {
  input?: {
    format?: 'kelvin'
    value?: number
  }
  output?: {
    format?: ConversionUnitKelvin
  }
}
export type ConvertKiloampereOptional = {
  input?: {
    format?: 'kiloampere'
    value?: number
  }
  output?: {
    format?: ConversionUnitKiloampere
  }
}
export type ConvertKilobitOptional = {
  input?: {
    format?: 'kilobit'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilobit
  }
}
export type ConvertKilobyteOptional = {
  input?: {
    format?: 'kilobyte'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilobyte
  }
}
export type ConvertKilogramOptional = {
  input?: {
    format?: 'kilogram'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilogram
  }
}
export type ConvertKilohertzOptional = {
  input?: {
    format?: 'kilohertz'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilohertz
  }
}
export type ConvertKilojouleOptional = {
  input?: {
    format?: 'kilojoule'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilojoule
  }
}
export type ConvertKilolitreOptional = {
  input?: {
    format?: 'kilolitre'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilolitre
  }
}
export type ConvertKilolitrePerHourOptional = {
  input?: {
    format?: 'kilolitre-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilolitrePerHour
  }
}
export type ConvertKilolitrePerMinuteOptional = {
  input?: {
    format?: 'kilolitre-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilolitrePerMinute
  }
}
export type ConvertKilolitrePerSecondOptional = {
  input?: {
    format?: 'kilolitre-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilolitrePerSecond
  }
}
export type ConvertKilometerOptional = {
  input?: {
    format?: 'kilometer'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilometer
  }
}
export type ConvertKilometrePerHourOptional = {
  input?: {
    format?: 'kilometre-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilometrePerHour
  }
}
export type ConvertKilopascalOptional = {
  input?: {
    format?: 'kilopascal'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilopascal
  }
}
export type ConvertKilopoundPerSquareInchOptional = {
  input?: {
    format?: 'kilopound-per-square-inch'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilopoundPerSquareInch
  }
}
export type ConvertKilovoltOptional = {
  input?: {
    format?: 'kilovolt'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilovolt
  }
}
export type ConvertKilovoltAmpereOptional = {
  input?: {
    format?: 'kilovolt-ampere'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilovoltAmpere
  }
}
export type ConvertKilovoltAmpereReactiveOptional = {
  input?: {
    format?: 'kilovolt-ampere-reactive'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilovoltAmpereReactive
  }
}
export type ConvertKilovoltAmpereReactiveHourOptional = {
  input?: {
    format?: 'kilovolt-ampere-reactive-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilovoltAmpereReactiveHour
  }
}
export type ConvertKilowattOptional = {
  input?: {
    format?: 'kilowatt'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilowatt
  }
}
export type ConvertKilowattHourOptional = {
  input?: {
    format?: 'kilowatt-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitKilowattHour
  }
}
export type ConvertKnotOptional = {
  input?: {
    format?: 'knot'
    value?: number
  }
  output?: {
    format?: ConversionUnitKnot
  }
}
export type ConvertLatexToPngCommandInputOptional = {
  input?: {
    format?: ConvertLatexToPngInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: ConvertLatexToPngOutputFormat
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexCommandInputOptional = {
  input?: {
    format?: PdfLatexInputFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: PdfLatexOutputFormat
    directory?: LocalPathOptional
  }
  pathScope?: string
}
export type ConvertLitreOptional = {
  input?: {
    format?: 'litre'
    value?: number
  }
  output?: {
    format?: ConversionUnitLitre
  }
}
export type ConvertLitrePerHourOptional = {
  input?: {
    format?: 'litre-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitLitrePerHour
  }
}
export type ConvertLitrePerMinuteOptional = {
  input?: {
    format?: 'litre-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitLitrePerMinute
  }
}
export type ConvertLitrePerSecondOptional = {
  input?: {
    format?: 'litre-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitLitrePerSecond
  }
}
export type ConvertLuxOptional = {
  input?: {
    format?: 'lux'
    value?: number
  }
  output?: {
    format?: ConversionUnitLux
  }
}
export type ConvertMatskedOptional = {
  input?: {
    format?: 'matsked'
    value?: number
  }
  output?: {
    format?: ConversionUnitMatsked
  }
}
export type ConvertMegabitOptional = {
  input?: {
    format?: 'megabit'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegabit
  }
}
export type ConvertMegabyteOptional = {
  input?: {
    format?: 'megabyte'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegabyte
  }
}
export type ConvertMegahertzOptional = {
  input?: {
    format?: 'megahertz'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegahertz
  }
}
export type ConvertMegapascalOptional = {
  input?: {
    format?: 'megapascal'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegapascal
  }
}
export type ConvertMegavoltAmpereOptional = {
  input?: {
    format?: 'megavolt-ampere'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegavoltAmpere
  }
}
export type ConvertMegavoltAmpereReactiveOptional = {
  input?: {
    format?: 'megavolt-ampere-reactive'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegavoltAmpereReactive
  }
}
export type ConvertMegavoltAmpereReactiveHourOptional = {
  input?: {
    format?: 'megavolt-ampere-reactive-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegavoltAmpereReactiveHour
  }
}
export type ConvertMegawattOptional = {
  input?: {
    format?: 'megawatt'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegawatt
  }
}
export type ConvertMegawattHourOptional = {
  input?: {
    format?: 'megawatt-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitMegawattHour
  }
}
export type ConvertMeterOptional = {
  input?: {
    format?: 'meter'
    value?: number
  }
  output?: {
    format?: ConversionUnitMeter
  }
}
export type ConvertMetrePerSecondOptional = {
  input?: {
    format?: 'metre-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitMetrePerSecond
  }
}
export type ConvertMetricTonneOptional = {
  input?: {
    format?: 'metric-tonne'
    value?: number
  }
  output?: {
    format?: ConversionUnitMetricTonne
  }
}
export type ConvertMicrogramOptional = {
  input?: {
    format?: 'microgram'
    value?: number
  }
  output?: {
    format?: ConversionUnitMicrogram
  }
}
export type ConvertMicrosecondOptional = {
  input?: {
    format?: 'microsecond'
    value?: number
  }
  output?: {
    format?: ConversionUnitMicrosecond
  }
}
export type ConvertMileOptional = {
  input?: {
    format?: 'mile'
    value?: number
  }
  output?: {
    format?: ConversionUnitMile
  }
}
export type ConvertMilePerHourOptional = {
  input?: {
    format?: 'mile-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitMilePerHour
  }
}
export type ConvertMilliampereOptional = {
  input?: {
    format?: 'milliampere'
    value?: number
  }
  output?: {
    format?: ConversionUnitMilliampere
  }
}
export type ConvertMilligramOptional = {
  input?: {
    format?: 'milligram'
    value?: number
  }
  output?: {
    format?: ConversionUnitMilligram
  }
}
export type ConvertMillihertzOptional = {
  input?: {
    format?: 'millihertz'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillihertz
  }
}
export type ConvertMillilitreOptional = {
  input?: {
    format?: 'millilitre'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillilitre
  }
}
export type ConvertMillilitrePerSecondOptional = {
  input?: {
    format?: 'millilitre-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillilitrePerSecond
  }
}
export type ConvertMillimeterOptional = {
  input?: {
    format?: 'millimeter'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillimeter
  }
}
export type ConvertMillisecondOptional = {
  input?: {
    format?: 'millisecond'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillisecond
  }
}
export type ConvertMillivoltOptional = {
  input?: {
    format?: 'millivolt'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillivolt
  }
}
export type ConvertMillivoltAmpereOptional = {
  input?: {
    format?: 'millivolt-ampere'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillivoltAmpere
  }
}
export type ConvertMillivoltAmpereReactiveOptional = {
  input?: {
    format?: 'millivolt-ampere-reactive'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillivoltAmpereReactive
  }
}
export type ConvertMillivoltAmpereReactiveHourOptional = {
  input?: {
    format?: 'millivolt-ampere-reactive-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitMillivoltAmpereReactiveHour
  }
}
export type ConvertMilliwattOptional = {
  input?: {
    format?: 'milliwatt'
    value?: number
  }
  output?: {
    format?: ConversionUnitMilliwatt
  }
}
export type ConvertMilliwattHourOptional = {
  input?: {
    format?: 'milliwatt-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitMilliwattHour
  }
}
export type ConvertMinuteOptional = {
  input?: {
    format?: 'minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitMinute
  }
}
export type ConvertMinutePerKilometreOptional = {
  input?: {
    format?: 'minute-per-kilometre'
    value?: number
  }
  output?: {
    format?: ConversionUnitMinutePerKilometre
  }
}
export type ConvertMinutePerMileOptional = {
  input?: {
    format?: 'minute-per-mile'
    value?: number
  }
  output?: {
    format?: ConversionUnitMinutePerMile
  }
}
export type ConvertMonthOptional = {
  input?: {
    format?: 'month'
    value?: number
  }
  output?: {
    format?: ConversionUnitMonth
  }
}
export type ConvertMp4ToGifWithFfmpegOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
  output?: {
    format?: string
    file?: {
      path?: string
    }
  }
  fps?: number
  width?: number
  startTime?: number | string
  endTime?: number | string
  duration?: number | string
}
export type ConvertNanosecondOptional = {
  input?: {
    format?: 'nanosecond'
    value?: number
  }
  output?: {
    format?: ConversionUnitNanosecond
  }
}
export type ConvertOunceOptional = {
  input?: {
    format?: 'ounce'
    value?: number
  }
  output?: {
    format?: ConversionUnitOunce
  }
}
export type ConvertPartPerBillionOptional = {
  input?: {
    format?: 'part-per-billion'
    value?: number
  }
  output?: {
    format?: ConversionUnitPartPerBillion
  }
}
export type ConvertPartPerMillionOptional = {
  input?: {
    format?: 'part-per-million'
    value?: number
  }
  output?: {
    format?: ConversionUnitPartPerMillion
  }
}
export type ConvertPartPerQuadrillionOptional = {
  input?: {
    format?: 'part-per-quadrillion'
    value?: number
  }
  output?: {
    format?: ConversionUnitPartPerQuadrillion
  }
}
export type ConvertPartPerTrillionOptional = {
  input?: {
    format?: 'part-per-trillion'
    value?: number
  }
  output?: {
    format?: ConversionUnitPartPerTrillion
  }
}
export type ConvertPascalOptional = {
  input?: {
    format?: 'pascal'
    value?: number
  }
  output?: {
    format?: ConversionUnitPascal
  }
}
export type ConvertPintOptional = {
  input?: {
    format?: 'pint'
    value?: number
  }
  output?: {
    format?: ConversionUnitPint
  }
}
export type ConvertPintPerHourOptional = {
  input?: {
    format?: 'pint-per-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitPintPerHour
  }
}
export type ConvertPintPerMinuteOptional = {
  input?: {
    format?: 'pint-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitPintPerMinute
  }
}
export type ConvertPintPerSecondOptional = {
  input?: {
    format?: 'pint-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitPintPerSecond
  }
}
export type ConvertPoundOptional = {
  input?: {
    format?: 'pound'
    value?: number
  }
  output?: {
    format?: ConversionUnitPound
  }
}
export type ConvertPoundPerSquareInchOptional = {
  input?: {
    format?: 'pound-per-square-inch'
    value?: number
  }
  output?: {
    format?: ConversionUnitPoundPerSquareInch
  }
}
export type ConvertQuartOptional = {
  input?: {
    format?: 'quart'
    value?: number
  }
  output?: {
    format?: ConversionUnitQuart
  }
}
export type ConvertQuartPerSecondOptional = {
  input?: {
    format?: 'quart-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitQuartPerSecond
  }
}
export type ConvertRadianOptional = {
  input?: {
    format?: 'radian'
    value?: number
  }
  output?: {
    format?: ConversionUnitRadian
  }
}
export type ConvertRadianPerSecondOptional = {
  input?: {
    format?: 'radian-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitRadianPerSecond
  }
}
export type ConvertRankineOptional = {
  input?: {
    format?: 'rankine'
    value?: number
  }
  output?: {
    format?: ConversionUnitRankine
  }
}
export type ConvertRotationPerMinuteOptional = {
  input?: {
    format?: 'rotation-per-minute'
    value?: number
  }
  output?: {
    format?: ConversionUnitRotationPerMinute
  }
}
export type ConvertSecondOptional = {
  input?: {
    format?: 'second'
    value?: number
  }
  output?: {
    format?: ConversionUnitSecond
  }
}
export type ConvertSecondPerFootOptional = {
  input?: {
    format?: 'second-per-foot'
    value?: number
  }
  output?: {
    format?: ConversionUnitSecondPerFoot
  }
}
export type ConvertSecondPerMetreOptional = {
  input?: {
    format?: 'second-per-metre'
    value?: number
  }
  output?: {
    format?: ConversionUnitSecondPerMetre
  }
}
export type ConvertSquareCentimeterOptional = {
  input?: {
    format?: 'square-centimeter'
    value?: number
  }
  output?: {
    format?: ConversionUnitSquareCentimeter
  }
}
export type ConvertSquareFootOptional = {
  input?: {
    format?: 'square-foot'
    value?: number
  }
  output?: {
    format?: ConversionUnitSquareFoot
  }
}
export type ConvertSquareInchOptional = {
  input?: {
    format?: 'square-inch'
    value?: number
  }
  output?: {
    format?: ConversionUnitSquareInch
  }
}
export type ConvertSquareKilometerOptional = {
  input?: {
    format?: 'square-kilometer'
    value?: number
  }
  output?: {
    format?: ConversionUnitSquareKilometer
  }
}
export type ConvertSquareMeterOptional = {
  input?: {
    format?: 'square-meter'
    value?: number
  }
  output?: {
    format?: ConversionUnitSquareMeter
  }
}
export type ConvertSquareMileOptional = {
  input?: {
    format?: 'square-mile'
    value?: number
  }
  output?: {
    format?: ConversionUnitSquareMile
  }
}
export type ConvertSquareMillimeterOptional = {
  input?: {
    format?: 'square-millimeter'
    value?: number
  }
  output?: {
    format?: ConversionUnitSquareMillimeter
  }
}
export type ConvertSquareYardOptional = {
  input?: {
    format?: 'square-yard'
    value?: number
  }
  output?: {
    format?: ConversionUnitSquareYard
  }
}
export type ConvertTablespoonOptional = {
  input?: {
    format?: 'tablespoon'
    value?: number
  }
  output?: {
    format?: ConversionUnitTablespoon
  }
}
export type ConvertTablespoonPerSecondOptional = {
  input?: {
    format?: 'tablespoon-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitTablespoonPerSecond
  }
}
export type ConvertTeaspoonOptional = {
  input?: {
    format?: 'teaspoon'
    value?: number
  }
  output?: {
    format?: ConversionUnitTeaspoon
  }
}
export type ConvertTeaspoonPerSecondOptional = {
  input?: {
    format?: 'teaspoon-per-second'
    value?: number
  }
  output?: {
    format?: ConversionUnitTeaspoonPerSecond
  }
}
export type ConvertTerabitOptional = {
  input?: {
    format?: 'terabit'
    value?: number
  }
  output?: {
    format?: ConversionUnitTerabit
  }
}
export type ConvertTerabyteOptional = {
  input?: {
    format?: 'terabyte'
    value?: number
  }
  output?: {
    format?: ConversionUnitTerabyte
  }
}
export type ConvertTerahertzOptional = {
  input?: {
    format?: 'terahertz'
    value?: number
  }
  output?: {
    format?: ConversionUnitTerahertz
  }
}
export type ConvertTeskedOptional = {
  input?: {
    format?: 'tesked'
    value?: number
  }
  output?: {
    format?: ConversionUnitTesked
  }
}
export type ConvertTimeZoneOptional = {
  input?: {
    date?: string
  }
  output?: {
    timezone?: TimeZone
    format?: string
  }
}
export type ConvertTonOptional = {
  input?: {
    format?: 'ton'
    value?: number
  }
  output?: {
    format?: ConversionUnitTon
  }
}
export type ConvertTorrOptional = {
  input?: {
    format?: 'torr'
    value?: number
  }
  output?: {
    format?: ConversionUnitTorr
  }
}
export type ConvertUnitOptional = {
  input?: {
    format?: Unit
    value?: number
  }
  output?: {
    format?: Unit
  }
}
export type ConvertUsSurveyFootOptional = {
  input?: {
    format?: 'us-survey-foot'
    value?: number
  }
  output?: {
    format?: ConversionUnitUsSurveyFoot
  }
}
export type ConvertVideoToAudioWithFfmpegOptional = {
  inputPath?: string
  outputPath?: string
}
export type ConvertVideoWithFfmpegBaseOptional = {
  audioCodec?: FfmpegCodecAudio
  videoCodec?: FfmpegCodecVideo
  audioBitRate?: number
  videoBitRate?: number
  frameRate?: number
  startTime?: number | string
  endTime?: number | string
  strict?: FfmpegStrictOption
  overwrite?: boolean
  progress?: boolean
  scaleWidth?: number
  scaleHeight?: number
  audioChannels?: number
  audioSamplingFrequency?: number
  subtitleCodec?: FfmpegCodecSubtitle
  duration?: number | string
  rotation?: number
}
export type ConvertVideoWithFfmpegCommandInputOptional = {
  input?: {
    format?: FfmpegFormat
    file?: LocalPathOptional
  }
  output?: {
    format?: FfmpegFormat
    file?: LocalPathOptional
  }
  pathScope?: string
  audioCodec?: FfmpegCodecAudio
  videoCodec?: FfmpegCodecVideo
  audioBitRate?: number
  videoBitRate?: number
  frameRate?: number
  startTime?: number | string
  endTime?: number | string
  strict?: FfmpegStrictOption
  overwrite?: boolean
  progress?: boolean
  scaleWidth?: number
  scaleHeight?: number
  audioChannels?: number
  audioSamplingFrequency?: number
  subtitleCodec?: FfmpegCodecSubtitle
  duration?: number | string
  rotation?: number
}
export type ConvertVoltOptional = {
  input?: {
    format?: 'volt'
    value?: number
  }
  output?: {
    format?: ConversionUnitVolt
  }
}
export type ConvertVoltAmpereOptional = {
  input?: {
    format?: 'volt-ampere'
    value?: number
  }
  output?: {
    format?: ConversionUnitVoltAmpere
  }
}
export type ConvertVoltAmpereReactiveOptional = {
  input?: {
    format?: 'volt-ampere-reactive'
    value?: number
  }
  output?: {
    format?: ConversionUnitVoltAmpereReactive
  }
}
export type ConvertVoltAmpereReactiveHourOptional = {
  input?: {
    format?: 'volt-ampere-reactive-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitVoltAmpereReactiveHour
  }
}
export type ConvertWattOptional = {
  input?: {
    format?: 'watt'
    value?: number
  }
  output?: {
    format?: ConversionUnitWatt
  }
}
export type ConvertWattHourOptional = {
  input?: {
    format?: 'watt-hour'
    value?: number
  }
  output?: {
    format?: ConversionUnitWattHour
  }
}
export type ConvertWeekOptional = {
  input?: {
    format?: 'week'
    value?: number
  }
  output?: {
    format?: ConversionUnitWeek
  }
}
export type ConvertYardOptional = {
  input?: {
    format?: 'yard'
    value?: number
  }
  output?: {
    format?: ConversionUnitYard
  }
}
export type ConvertYearOptional = {
  input?: {
    format?: 'year'
    value?: number
  }
  output?: {
    format?: ConversionUnitYear
  }
}
export type CropPdfWithPdfCropOptional = {
  margin?: number
  input?: {
    file?: {
      path?: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
}
export type DisassembleBinaryWithObjdumpOptional = {
  show?: Array<ObjdumpShowOption>
  demangleStyle?: ObjdumpDemangleStyle
  disassembleAll?: boolean
  hide?: ObjdumpHideOption
  color?: boolean
}
export type ExiftoolFamilyDataOptional = {
  head?: string
  family?: Array<number>
}
export type ExiftoolImageFormatDataOptional = {
  head?: string
  read?: boolean
  write?: boolean
  create?: boolean
}
export type ExiftoolTagDataOptional = {
  head?: string
}
export type ExtractWith7ZOptional = {
  input?: {
    format?: string
    path?: string
  }
  output?: {
    format?: string
    file?: {
      path?: string
    }
  }
}
export type ExtractWithUnarchiverOptional = {
  input?: {
    password?: string
    format?: ArchiveFormat
    file?: {
      path?: string
    }
  }
  output?: {
    overwrite?: boolean
    directory?: {
      path?: string
    }
  }
}
export type FfmpegCodecDataOptional = {
  label?: string
  type?: string
  supportsDecoding?: boolean
  supportsEncoding?: boolean
  intraFrameOnly?: boolean
  lossy?: boolean
  lossless?: boolean
}
export type FfmpegDecoderDataOptional = {
  label?: string
  type?: string
  frameLevelMultithreading?: boolean
  sliceLevelMultithreading?: boolean
  experimental?: boolean
  supportsDrawHorizontalBand?: boolean
  supportsDirectRenderingMethod1?: boolean
}
export type FfmpegEncoderDataOptional = {
  label?: string
  type?: string
  frameLevelMultithreading?: boolean
  sliceLevelMultithreading?: boolean
  experimental?: boolean
  supportsDrawHorizontalBand?: boolean
  supportsDirectRenderingMethod1?: boolean
}
export type FfmpegFormatDataOptional = {
  label?: string
  supportsDemuxing?: boolean
  supportsMuxing?: boolean
}
export type FfmpegStrictOptionDataOptional = {
  note?: string
}
export type FileContentOptional = {
  content?: ArrayBuffer | Blob | string
}
export type FileContentWithSha256Optional = {
  sha256?: string
  content?: ArrayBuffer | Blob | string
}
export type FileHasOutputContentOptional = {
  content?: boolean
}
export type FileInputPathOptional = {
  path?: string
}
export type FileOutputPathOptional = {
  path?: string
}
export type FilePathOptional = {
  path?: string
}
export type FormatApiOptional = {
  format?: string
}
export type FormatAssemblyCommandInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatCOptional = {
  format?: string
  input?: {
    file?: {
      path?: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
}
export type FormatCliBaseOptional = {
  format?: string
  input?: {
    file?: {
      path?: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}
export type FormatCodeWithClangFormatCommandInputOptional = {
  format?: ClangFormat
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
  style?: {
    path?: string
  }
}
export type FormatCodeWithPrettierOptional = {
  code?: string
  format?: PrettierPlugin
}
export type FormatCppOptional = {
  format?: string
  input?: {
    file?: {
      path?: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
}
export type FormatCssWithPrettierOptional = {
  code?: string
  singleQuote?: boolean
}
export type FormatGraphqlWithPrettierOptional = {
  code?: string
  bracketSpacing?: boolean
}
export type FormatHtmlWithPrettierOptional = {
  code?: string
  bracketSameLine?: boolean
  htmlWhitespaceSensitivity?: PrettierHtmlWhitespaceSensitivityOption
  singleAttributePerLine?: boolean
  vueIndentScriptAndStyle?: boolean
}
export type FormatJavaOptional = {
  format?: string
  input?: {
    file?: {
      path?: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
}
export type FormatJavaWithPrettierOptional = {
  code?: string
  maxLineLength?: number
  indentationSize?: number
  useTabs?: boolean
  trailingComma?: boolean
}
export type FormatKotlinCommandInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatMarkdownWithPrettierOptional = {
  code?: string
  proseWrap?: PrettierProseWrapOption
  singleQuote?: boolean
}
export type FormatPythonCommandInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatRubyOptional = {
  format?: string
  input?: {
    file?: {
      path?: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
}
export type FormatRustCommandInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatRustWithPrettierOptional = {
  code?: string
  useTabs?: boolean
  indentationSize?: number
  maxLineLength?: number
  endOfLine?: PrettierEndOfLineOption
}
export type FormatShWithPrettierOptional = {
  code?: string
  keepComments?: boolean
  stopAt?: string
  variant?: string
  indent?: number
  binaryNextLine?: boolean
  switchCaseIndent?: boolean
  spaceRedirects?: boolean
  keepPadding?: boolean
  minify?: boolean
  functionNextLine?: boolean
}
export type FormatSqlWithContentOptional = {
  format?: string
  input?: {
    file?: {
      content?: ArrayBuffer | string
    }
  }
}
export type FormatSwiftCommandInputOptional = {
  format?: string
  input?: {
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type FormatTypescriptWithPrettierOptional = {
  code?: string
  jsxSingleQuote?: boolean
  singleQuote?: boolean
  semiColon?: boolean
  indentationSize?: number
  maxLineLength?: number
  trailingComma?: PrettierTypescriptTrailingCommaOption
  bracketSpacing?: boolean
  bracketSameLine?: boolean
  arrowParentheses?: PrettierArrowParensOption
  endOfLine?: PrettierEndOfLineOption
  singleAttributePerLine?: boolean
}
export type FormatXmlWithPrettierOptional = {
  code?: string
  xmlSelfClosingSpace?: boolean
  indentationSize?: number
  xmlWhitespaceSensitivity?: PrettierXmlWhitespaceSensitivityOption
  maxLineLength?: number
  xmlSortAttributesByKey?: boolean
  xmlQuoteAttributes?: PrettierXmlQuoteAttributesOption
}
export type FormatYamlWithPrettierOptional = {
  code?: string
  bracketSpacing?: boolean
  singleQuote?: boolean
  proseWrap?: PrettierProseWrapOption
}
export type GematriaSystemCalculationOptional = {
  system?: {
    slug?: string
    title?: string
  }
  reduction?: number
  summation?: number
}
export type GematriaSystemCalculationResultOptional = {
  string?: {
    decoded?: string
    encoded?: string
  }
  script?: {
    slug?: string
    title?: string
  }
  calculation?: Array<GematriaSystemCalculationOptional>
}
export type GenerateHaikuPhraseOptional = {
  format?: 'haiku_phrase'
  separator?: string
  adjectives?: Array<NamedWordSetOptional | AnonymousWordSetOptional>
  nouns?: Array<NamedWordSetOptional | AnonymousWordSetOptional>
}
export type GenerateHashOptional = {
  class?: ForgeMessageDigest
  content?: string | ArrayBuffer
}
export type GenerateMurmurHashOptional = {
  input?: string
  seed?: number
  version?: string
}
export type GenerateQrCodeOptional = {
  errorCorrectionLevel?: QrCodeErrorCorrectionLevel
  format?: QrCodeFormat
  margin?: number
  color?: {
    dark?: string
    light?: string
  }
}
export type GenerateRandomPhraseOptional = {
  format?: 'random_phrase'
  separator?: string
  minSize?: number
  maxSize?: number
  exclusions?: Array<WeightedWordSetOptional>
  inclusions?: Array<WeightedWordSetOptional>
}
export type GenerateRandomSymbolsOptional = {
  format?: 'random_symbols'
  minSize?: number
  maxSize?: number
  exclusions?: Array<WeightedSymbolSetOptional>
  inclusions?: Array<WeightedSymbolSetOptional>
}
export type ImageMagicColorMatrixOptional = {
  row?: number
  column?: number
  value?: Array<number>
}
export type ImageMagickChannelDataOptional = {
  head?: string
}
export type ImageMagickColorSpaceDataOptional = {
  head?: string
  note?: string
}
export type ImageMagickCompressionDataOptional = {
  head?: string
}
export type ImageMagickFormatDataOptional = {
  head?: string
  note?: string
  read?: boolean
  write?: boolean
  multiple?: boolean
  supportsBlob?: boolean
}
export type InspectColorOptional = {
  value?: string
}
export type InspectMetadataFromImageOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
  copyright?: string
  creator?: string
  license?: string
  keywords?: Array<string>
  artist?: string
  originalDate?: Date
  allDates?: Date
  creationDate?: Date
  title?: string
  description?: string
}
export type LlvmArchitectureDataOptional = {
  host?: string
  note?: string
  cpu?: Array<string>
  feature?: Array<string>
}
export type LlvmCpuDataOptional = {
  host?: string
  note?: string
}
export type LlvmFeatureDataOptional = {
  host?: string
  note?: string
}
export type LocalInputPathOptional = {
  path?: string
}
export type LocalOutputPathOptional = {
  path?: string
}
export type LocalPathOptional = {
  path?: string
}
export type NamedSymbolSetOptional = {
  form?: 'named-symbol-set'
  name?: SymbolSet
}
export type NamedWordSetOptional = {
  form?: 'named-word-set'
  name?: WordSet
}
export type PandocFormatDataOptional = {
  head?: string
}
export type PuppeteerLifeCycleEventDataOptional = {
  note?: string
}
export type RemoteInputPathOptional = {
  path?: string
}
export type RemoteOutputPathOptional = {
  path?: string
}
export type RemotePathOptional = {
  path?: string
}
export type RemoveAudioFromVideoWithFfmpegOptional = {
  inputPath?: string
  outputPath?: string
}
export type RemoveImageMetadataOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
}
export type ReplaceImageColorWithImageMagickOptional = {
  inputPath?: string
  outputPath?: string
  startColor?: string
  endColor?: string
  fuzz?: number
}
export type RequestOptional = {
  path?: string
  body?: object
}
export type ResizeImageWithImageMagickOptional = {
  inputPath?: string
  outputPath?: string
  width?: number
  height?: number
  stretch?: boolean
  gravity?: ImageMagickGravity
}
export type ResolveInputForCompileLocalExternalOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type ResolveInputForCompileLocalInternalOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type ResolveInputForCompileRemoteOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type ResolveInputForConvertLocalExternalOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type ResolveInputForConvertLocalInternalOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type ResolveInputForConvertRemoteOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type ResolveInputForFormatLocalExternalOptional = {
  pathScope?: string
  format?: string
  input?: {
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    file?: LocalPathOptional
  }
}
export type ResolveInputForFormatLocalInternalOptional = {
  pathScope?: string
  format?: string
  input?: {
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    file?: LocalPathOptional
  }
}
export type ResolveInputForFormatRemoteOptional = {
  pathScope?: string
  format?: string
  input?: {
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    file?: LocalPathOptional
  }
}
export type ResolveInputForSanitizeLocalExternalOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type ResolveInputForSanitizeLocalInternalOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type ResolveInputForSanitizeRemoteOptional = {
  pathScope?: string
  input?: {
    format?: string
    file?: FilePathOptional | FileContentOptional
  }
  output?: {
    format?: string
    file?: LocalPathOptional
  }
}
export type SanitizeApiOptional = {
  input?: {
    format?: string
  }
}
export type SanitizeHtmlCommandInputOptional = {
  input?: {
    format?: string
    file?: LocalPathOptional
  }
  output?: {
    file?: LocalPathOptional
  }
  pathScope?: string
}
export type SlicePdfOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
  startPage?: number
  endPage?: number
  output?: {
    file?: {
      path?: string
    }
  }
}
export type SlicePdfWithDataOptional = {
  input?: {
    format?: string
    file?: {
      data?: ArrayBuffer
    }
  }
  startPage?: number
  endPage?: number
}
export type SymbolSetDataOptional = {
  list?: string
}
export type TextStyleOptional = {
  color?: string
  bold?: boolean
  italic?: boolean
  font?: {
    size?: number
    family?: Array<string>
  }
  lineHeight?: number
  letterSpacing?: number
  allCaps?: boolean
}
export type TimeZoneAbbreviationDataOptional = {
  name?: Array<string>
}
export type TimeZoneDataOptional = {
  name?: string
  alternativeName?: string
  group?: Array<string>
  continentCode?: string
  continentName?: string
  countryName?: string
  countryCode?: string
  mainCities?: Array<string>
  rawOffsetInMinutes?: number
  abbreviation?: string
}
export type UnarchiverFormatDataOptional = {
  head?: string
}
export type UnitKeyOptional = {
  key?: string
}
export type ValidatePdfWithDataOptional = {
  input?: {
    format?: string
    file?: {
      data?: ArrayBuffer
    }
  }
}
export type VerifyCliBaseOptional = {
  format?: string
  file?: {
    path?: string
  }
  help?: boolean
  log?: CliLogFormat
}
export type VerifyImageWithImageMagickOptional = {
  format?: ImageMagickFormat
  file?: {
    path?: string
  }
}
export type WeightedSymbolSetOptional = {
  value?: NamedSymbolSetOptional | AnonymousSymbolSetOptional
  weight?: number
}
export type WeightedWordSetOptional = {
  value?: NamedWordSetOptional | AnonymousWordSetOptional
  weight?: number
}
export type WordSetDataOptional = {
  name?: string
}
export type WriteMetadataToImageOptional = {
  input?: {
    format?: string
    file?: {
      path?: string
    }
  }
  copyright?: string
  creator?: string
  license?: string
  keywords?: Array<string>
  artist?: string
  originalDate?: Date
  allDates?: Date
  creationDate?: Date
  title?: string
  description?: string
}
