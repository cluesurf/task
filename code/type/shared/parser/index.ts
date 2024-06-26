import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@termsurf/form'
import * as code from '~/code/type/code.js'

import {
  AddAudioToVideoWithFfmpeg,
  AnonymousSymbolSet,
  AnonymousWordSet,
  Archive,
  ArchiveFormat,
  AssemblySyntax,
  BackendCompilationOutput,
  BackendCompilationOutputData,
  BuildBaseFileInput,
  BuildBaseInputDirectoryOrFileOutputFile,
  BuildBaseInputFileOutputDirectory,
  BuildCommandToOptimizeGifWithGifsicle,
  BuildFormatInputOutput,
  CInputFormat,
  CalculateGematria,
  CalibreFormatData,
  CalibreInputFormat,
  CalibreInputProfile,
  CalibreOutputFormat,
  CalibreOutputProfile,
  CallHandle,
  CheckFileTypeUsingMagicBytes,
  Cipher,
  CipherData,
  ClangFormat,
  CliLogFormat,
  Command,
  CommandKey,
  CommandName,
  CommandSequence,
  CompileApi,
  CompileAsm,
  CompileCCommandInput,
  CompileCliBase,
  CompileCppCommandInput,
  CompileJava,
  CompileLlvm,
  CompileLlvmIrToAssembly,
  CompileRustCommandInput,
  CompileSwiftCommandInput,
  CompileWastCommandInput,
  CompressMp4WithFfmpeg,
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
  ConvertAcre,
  ConvertAmpere,
  ConvertApi,
  ConvertArchiveCommandInput,
  ConvertArcminute,
  ConvertArcsecond,
  ConvertBar,
  ConvertBit,
  ConvertByte,
  ConvertCelsius,
  ConvertCentilitre,
  ConvertCentilitrePerSecond,
  ConvertCentimeter,
  ConvertCliBase,
  ConvertCubicCentimeter,
  ConvertCubicCentimeterPerSecond,
  ConvertCubicFoot,
  ConvertCubicFootPerHour,
  ConvertCubicFootPerMinute,
  ConvertCubicFootPerSecond,
  ConvertCubicInch,
  ConvertCubicInchPerHour,
  ConvertCubicInchPerMinute,
  ConvertCubicInchPerSecond,
  ConvertCubicKilometer,
  ConvertCubicKilometerPerSecond,
  ConvertCubicMeter,
  ConvertCubicMeterPerHour,
  ConvertCubicMeterPerMinute,
  ConvertCubicMeterPerSecond,
  ConvertCubicMillimeter,
  ConvertCubicMillimeterPerSecond,
  ConvertCubicYard,
  ConvertCubicYardPerHour,
  ConvertCubicYardPerMinute,
  ConvertCubicYardPerSecond,
  ConvertCup,
  ConvertCupPerSecond,
  ConvertDay,
  ConvertDecilitre,
  ConvertDecilitrePerSecond,
  ConvertDegree,
  ConvertDegreePerSecond,
  ConvertDocumentWithCalibreCommandInput,
  ConvertDocumentWithEnscriptCommandInput,
  ConvertDocumentWithJupyterCommandInput,
  ConvertDocumentWithLibreOfficeCommandInput,
  ConvertDocumentWithPandocCommandInput,
  ConvertDozen,
  ConvertEach,
  ConvertFahrenheit,
  ConvertFileBase,
  ConvertFileBaseRemote,
  ConvertFluidOunce,
  ConvertFluidOuncePerHour,
  ConvertFluidOuncePerMinute,
  ConvertFluidOuncePerSecond,
  ConvertFontWithFontForgeCommandInput,
  ConvertFoot,
  ConvertFootCandle,
  ConvertFootPerSecond,
  ConvertGallon,
  ConvertGallonPerHour,
  ConvertGallonPerMinute,
  ConvertGallonPerSecond,
  ConvertGigabit,
  ConvertGigabyte,
  ConvertGigahertz,
  ConvertGigavoltAmpere,
  ConvertGigavoltAmpereReactive,
  ConvertGigavoltAmpereReactiveHour,
  ConvertGigawatt,
  ConvertGigawattHour,
  ConvertGlas,
  ConvertGradian,
  ConvertGram,
  ConvertHectare,
  ConvertHectopascal,
  ConvertHertz,
  ConvertHour,
  ConvertHtmlWithPuppeteerCommandInput,
  ConvertImageWithImageMagickCommandInput,
  ConvertImageWithInkscapeCommandInput,
  ConvertInch,
  ConvertJoule,
  ConvertKaffekopp,
  ConvertKanna,
  ConvertKelvin,
  ConvertKiloampere,
  ConvertKilobit,
  ConvertKilobyte,
  ConvertKilogram,
  ConvertKilohertz,
  ConvertKilojoule,
  ConvertKilolitre,
  ConvertKilolitrePerHour,
  ConvertKilolitrePerMinute,
  ConvertKilolitrePerSecond,
  ConvertKilometer,
  ConvertKilometrePerHour,
  ConvertKilopascal,
  ConvertKilopoundPerSquareInch,
  ConvertKilovolt,
  ConvertKilovoltAmpere,
  ConvertKilovoltAmpereReactive,
  ConvertKilovoltAmpereReactiveHour,
  ConvertKilowatt,
  ConvertKilowattHour,
  ConvertKnot,
  ConvertLatexToPngCommandInput,
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
  ConvertLatexWithPdfLatexCommandInput,
  ConvertLitre,
  ConvertLitrePerHour,
  ConvertLitrePerMinute,
  ConvertLitrePerSecond,
  ConvertLux,
  ConvertMatsked,
  ConvertMegabit,
  ConvertMegabyte,
  ConvertMegahertz,
  ConvertMegapascal,
  ConvertMegavoltAmpere,
  ConvertMegavoltAmpereReactive,
  ConvertMegavoltAmpereReactiveHour,
  ConvertMegawatt,
  ConvertMegawattHour,
  ConvertMeter,
  ConvertMetrePerSecond,
  ConvertMetricTonne,
  ConvertMicrogram,
  ConvertMicrosecond,
  ConvertMile,
  ConvertMilePerHour,
  ConvertMilliampere,
  ConvertMilligram,
  ConvertMillihertz,
  ConvertMillilitre,
  ConvertMillilitrePerSecond,
  ConvertMillimeter,
  ConvertMillisecond,
  ConvertMillivolt,
  ConvertMillivoltAmpere,
  ConvertMillivoltAmpereReactive,
  ConvertMillivoltAmpereReactiveHour,
  ConvertMilliwatt,
  ConvertMilliwattHour,
  ConvertMinute,
  ConvertMinutePerKilometre,
  ConvertMinutePerMile,
  ConvertMonth,
  ConvertMp4ToGifWithFfmpeg,
  ConvertNanosecond,
  ConvertOunce,
  ConvertPartPerBillion,
  ConvertPartPerMillion,
  ConvertPartPerQuadrillion,
  ConvertPartPerTrillion,
  ConvertPascal,
  ConvertPint,
  ConvertPintPerHour,
  ConvertPintPerMinute,
  ConvertPintPerSecond,
  ConvertPound,
  ConvertPoundPerSquareInch,
  ConvertQuart,
  ConvertQuartPerSecond,
  ConvertRadian,
  ConvertRadianPerSecond,
  ConvertRankine,
  ConvertRotationPerMinute,
  ConvertSecond,
  ConvertSecondPerFoot,
  ConvertSecondPerMetre,
  ConvertSquareCentimeter,
  ConvertSquareFoot,
  ConvertSquareInch,
  ConvertSquareKilometer,
  ConvertSquareMeter,
  ConvertSquareMile,
  ConvertSquareMillimeter,
  ConvertSquareYard,
  ConvertTablespoon,
  ConvertTablespoonPerSecond,
  ConvertTeaspoon,
  ConvertTeaspoonPerSecond,
  ConvertTerabit,
  ConvertTerabyte,
  ConvertTerahertz,
  ConvertTesked,
  ConvertTimeZone,
  ConvertTon,
  ConvertTorr,
  ConvertUnit,
  ConvertUsSurveyFoot,
  ConvertVideoToAudioWithFfmpeg,
  ConvertVideoWithFfmpegBase,
  ConvertVideoWithFfmpegCommandInput,
  ConvertVolt,
  ConvertVoltAmpere,
  ConvertVoltAmpereReactive,
  ConvertVoltAmpereReactiveHour,
  ConvertWatt,
  ConvertWattHour,
  ConvertWeek,
  ConvertYard,
  ConvertYear,
  CppInputFormat,
  CropPdfWithPdfCrop,
  DisassembleBinaryWithObjdump,
  EnscriptInputFormat,
  EnscriptOutputFormat,
  ExiftoolFamilyData,
  ExiftoolImageFormatData,
  ExiftoolTagData,
  ExtractWith7Z,
  ExtractWithUnarchiver,
  FfmpegCodecAudio,
  FfmpegCodecData,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegDecoderAudio,
  FfmpegDecoderData,
  FfmpegDecoderSubtitle,
  FfmpegDecoderVideo,
  FfmpegEncoderAudio,
  FfmpegEncoderData,
  FfmpegEncoderSubtitle,
  FfmpegEncoderVideo,
  FfmpegFormat,
  FfmpegFormatData,
  FfmpegStrictOption,
  FfmpegStrictOptionData,
  FileContent,
  FileContentWithSha256,
  FileHasOutputContent,
  FileInputPath,
  FileOutputPath,
  FilePath,
  FileReaderEncoding,
  Flip,
  FontFormat,
  ForgeMessageDigest,
  FormatApi,
  FormatAssemblyCommandInput,
  FormatC,
  FormatCliBase,
  FormatCodeFormat,
  FormatCodeWithClangFormatCommandInput,
  FormatCodeWithPrettier,
  FormatCpp,
  FormatCssWithPrettier,
  FormatGraphqlWithPrettier,
  FormatHtmlWithPrettier,
  FormatJava,
  FormatJavaWithPrettier,
  FormatKotlinCommandInput,
  FormatMarkdownWithPrettier,
  FormatPythonCommandInput,
  FormatRuby,
  FormatRustCommandInput,
  FormatRustWithPrettier,
  FormatShWithPrettier,
  FormatSqlWithContent,
  FormatSwiftCommandInput,
  FormatTypescriptWithPrettier,
  FormatXmlWithPrettier,
  FormatYamlWithPrettier,
  GematriaSystemCalculation,
  GematriaSystemCalculationResult,
  GenerateHaikuPhrase,
  GenerateHash,
  GenerateMurmurHash,
  GenerateQrCode,
  GenerateRandomPhrase,
  GenerateRandomSymbols,
  GifsicleOptimizeOption,
  ImageMagicColorMatrix,
  ImageMagickChannel,
  ImageMagickChannelData,
  ImageMagickColorSpace,
  ImageMagickColorSpaceData,
  ImageMagickCompression,
  ImageMagickCompressionData,
  ImageMagickFormat,
  ImageMagickFormatData,
  ImageMagickGravity,
  ImageMagickInputFormat,
  ImageMagickOutputFormat,
  InkscapeExportFormat,
  InkscapeImportFormat,
  InspectColor,
  InspectMetadataFromImage,
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
  LlvmArchitecture,
  LlvmArchitectureData,
  LlvmCpu,
  LlvmCpuData,
  LlvmFeature,
  LlvmFeatureData,
  LlvmOptimizationLevel,
  LocalInputPath,
  LocalOutputPath,
  LocalPath,
  NamedSymbolSet,
  NamedWordSet,
  ObjdumpDemangleStyle,
  ObjdumpHideOption,
  ObjdumpShowOption,
  PandocFormatData,
  PandocInputFormat,
  PandocOutputFormat,
  PatoolFormat,
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
  PleasantAdjective,
  PleasantNoun,
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
  PuppeteerLifeCycleEventData,
  PuppeteerMarkdownInputFormat,
  PuppeteerOutputFormat,
  PuppeteerTxtInputFormat,
  QrCodeErrorCorrectionLevel,
  QrCodeFormat,
  RemoteInputPath,
  RemoteOutputPath,
  RemotePath,
  RemoveAudioFromVideoWithFfmpeg,
  RemoveImageMetadata,
  ReplaceImageColorWithImageMagick,
  Request,
  ResizeImageWithImageMagick,
  ResolveInputForCompileLocalExternal,
  ResolveInputForCompileLocalInternal,
  ResolveInputForCompileRemote,
  ResolveInputForConvertLocalExternal,
  ResolveInputForConvertLocalInternal,
  ResolveInputForConvertRemote,
  ResolveInputForFormatLocalExternal,
  ResolveInputForFormatLocalInternal,
  ResolveInputForFormatRemote,
  ResolveInputForSanitizeLocalExternal,
  ResolveInputForSanitizeLocalInternal,
  ResolveInputForSanitizeRemote,
  RustCompilerTarget,
  RustInputFormat,
  RustOutputFormat,
  SanitizeApi,
  SanitizeHtmlCommandInput,
  SharedGematriaLanguage,
  SlicePdf,
  SlicePdfWithData,
  SwiftInputFormat,
  SymbolSet,
  SymbolSetData,
  Task,
  TextStyle,
  TimeZone,
  TimeZoneAbbreviation,
  TimeZoneAbbreviationData,
  TimeZoneData,
  TimeZoneLocation,
  UnarchiverFormat,
  UnarchiverFormatData,
  Unit,
  UnitKey,
  ValidatePdfWithData,
  VerifyCliBase,
  VerifyImageWithImageMagick,
  WastInputFormat,
  WastOutputFormat,
  WeightedSymbolSet,
  WeightedWordSet,
  WordSet,
  WordSetData,
  WriteMetadataToImage,
} from '~/code/type/shared/index.js'

let AddAudioToVideoWithFfmpegModel: z.ZodType<AddAudioToVideoWithFfmpeg>

export const AddAudioToVideoWithFfmpegParser =
  (): z.ZodType<AddAudioToVideoWithFfmpeg> => {
    if (!AddAudioToVideoWithFfmpegModel) {
      AddAudioToVideoWithFfmpegModel = z.object({
        inputVideoPath: z.string(),
        inputAudioPath: z.string(),
        outputPath: z.string(),
        audioCodec: z.string(),
        fit: z.boolean(),
      }) as z.ZodType<AddAudioToVideoWithFfmpeg>
    }
    return AddAudioToVideoWithFfmpegModel!
  }

let AnonymousSymbolSetModel: z.ZodType<AnonymousSymbolSet>

export const AnonymousSymbolSetParser =
  (): z.ZodType<AnonymousSymbolSet> => {
    if (!AnonymousSymbolSetModel) {
      AnonymousSymbolSetModel = z.object({
        form: z.literal('anonymous-symbol-set'),
        list: z.string(),
      }) as z.ZodType<AnonymousSymbolSet>
    }
    return AnonymousSymbolSetModel!
  }

let AnonymousWordSetModel: z.ZodType<AnonymousWordSet>

export const AnonymousWordSetParser =
  (): z.ZodType<AnonymousWordSet> => {
    if (!AnonymousWordSetModel) {
      AnonymousWordSetModel = z.object({
        form: z.literal('anonymous-word-set'),
        list: z.array(z.string()),
      }) as z.ZodType<AnonymousWordSet>
    }
    return AnonymousWordSetModel!
  }

let ArchiveModel: z.ZodType<Archive>

export const ArchiveParser = (): z.ZodType<Archive> => {
  if (!ArchiveModel) {
    ArchiveModel = z.object({
      input: z.object({
        path: z.string(),
      }),
      output: z.object({
        format: z.lazy(() => ArchiveFormatParser()),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<Archive>
  }
  return ArchiveModel!
}

let ArchiveFormatModel: z.ZodType<ArchiveFormat>

export const ArchiveFormatParser = () => {
  if (!ArchiveFormatModel) {
    ArchiveFormatModel = z.enum(
      LOAD('archive_format') as readonly [string, ...string[]],
    ) as z.ZodType<ArchiveFormat>
  }
  return ArchiveFormatModel!
}

let AssemblySyntaxModel: z.ZodType<AssemblySyntax>

export const AssemblySyntaxParser = () => {
  if (!AssemblySyntaxModel) {
    AssemblySyntaxModel = z.enum(
      LOAD('assembly_syntax') as readonly [string, ...string[]],
    ) as z.ZodType<AssemblySyntax>
  }
  return AssemblySyntaxModel!
}

let BackendCompilationOutputModel: z.ZodType<BackendCompilationOutput>

export const BackendCompilationOutputParser = () => {
  if (!BackendCompilationOutputModel) {
    BackendCompilationOutputModel = z.enum(
      LOAD('backend_compilation_output') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<BackendCompilationOutput>
  }
  return BackendCompilationOutputModel!
}

let BackendCompilationOutputDataModel: z.ZodType<BackendCompilationOutputData>

export const BackendCompilationOutputDataParser =
  (): z.ZodType<BackendCompilationOutputData> => {
    if (!BackendCompilationOutputDataModel) {
      BackendCompilationOutputDataModel = z.object({
        extension: z.optional(z.string()),
      }) as z.ZodType<BackendCompilationOutputData>
    }
    return BackendCompilationOutputDataModel!
  }

let BuildBaseFileInputModel: z.ZodType<BuildBaseFileInput>

export const BuildBaseFileInputParser =
  (): z.ZodType<BuildBaseFileInput> => {
    if (!BuildBaseFileInputModel) {
      BuildBaseFileInputModel = z.object({
        tool: z.optional(z.string()),
        input: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<BuildBaseFileInput>
    }
    return BuildBaseFileInputModel!
  }

let BuildBaseInputDirectoryOrFileOutputFileModel: z.ZodType<BuildBaseInputDirectoryOrFileOutputFile>

export const BuildBaseInputDirectoryOrFileOutputFileParser =
  (): z.ZodType<BuildBaseInputDirectoryOrFileOutputFile> => {
    if (!BuildBaseInputDirectoryOrFileOutputFileModel) {
      BuildBaseInputDirectoryOrFileOutputFileModel = z.object({
        input: z.object({
          directory: z.optional(
            z.object({
              path: z.string(),
            }),
          ),
          file: z.optional(
            z.object({
              path: z.string(),
            }),
          ),
        }),
        output: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<BuildBaseInputDirectoryOrFileOutputFile>
    }
    return BuildBaseInputDirectoryOrFileOutputFileModel!
  }

let BuildBaseInputFileOutputDirectoryModel: z.ZodType<BuildBaseInputFileOutputDirectory>

export const BuildBaseInputFileOutputDirectoryParser =
  (): z.ZodType<BuildBaseInputFileOutputDirectory> => {
    if (!BuildBaseInputFileOutputDirectoryModel) {
      BuildBaseInputFileOutputDirectoryModel = z.object({
        output: z.object({
          directory: z.object({
            path: z.string(),
          }),
        }),
        input: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<BuildBaseInputFileOutputDirectory>
    }
    return BuildBaseInputFileOutputDirectoryModel!
  }

let BuildCommandToOptimizeGifWithGifsicleModel: z.ZodType<BuildCommandToOptimizeGifWithGifsicle>

export const BuildCommandToOptimizeGifWithGifsicleParser =
  (): z.ZodType<BuildCommandToOptimizeGifWithGifsicle> => {
    if (!BuildCommandToOptimizeGifWithGifsicleModel) {
      BuildCommandToOptimizeGifWithGifsicleModel = z.object({
        lossy: z.optional(z.number().int().gte(0)),
        background: z.optional(z.string()),
        left: z.optional(z.number().int()),
        right: z.optional(z.number().int()),
        top: z.optional(z.number().int()),
        bottom: z.optional(z.number().int()),
        flip: z.optional(z.lazy(() => FlipParser())),
        transparent: z.optional(z.string()),
        optimize: z.optional(
          z.lazy(() => GifsicleOptimizeOptionParser()),
        ),
        scale: z.optional(z.number()),
        output: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<BuildCommandToOptimizeGifWithGifsicle>
    }
    return BuildCommandToOptimizeGifWithGifsicleModel!
  }

let BuildFormatInputOutputModel: z.ZodType<BuildFormatInputOutput>

export const BuildFormatInputOutputParser =
  (): z.ZodType<BuildFormatInputOutput> => {
    if (!BuildFormatInputOutputModel) {
      BuildFormatInputOutputModel = z.object({
        tool: z.optional(z.string()),
        input: z.object({
          format: z.string(),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<BuildFormatInputOutput>
    }
    return BuildFormatInputOutputModel!
  }

let CInputFormatModel: z.ZodType<CInputFormat>

export const CInputFormatParser = () => {
  if (!CInputFormatModel) {
    CInputFormatModel = z.enum(
      LOAD('c_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<CInputFormat>
  }
  return CInputFormatModel!
}

let CalculateGematriaModel: z.ZodType<CalculateGematria>

export const CalculateGematriaParser =
  (): z.ZodType<CalculateGematria> => {
    if (!CalculateGematriaModel) {
      CalculateGematriaModel = z.object({
        input: z.object({
          string: z.object({
            decoded: z.string(),
            encoded: z.optional(z.string()),
          }),
        }),
      }) as z.ZodType<CalculateGematria>
    }
    return CalculateGematriaModel!
  }

let CalibreFormatDataModel: z.ZodType<CalibreFormatData>

export const CalibreFormatDataParser =
  (): z.ZodType<CalibreFormatData> => {
    if (!CalibreFormatDataModel) {
      CalibreFormatDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<CalibreFormatData>
    }
    return CalibreFormatDataModel!
  }

let CalibreInputFormatModel: z.ZodType<CalibreInputFormat>

export const CalibreInputFormatParser = () => {
  if (!CalibreInputFormatModel) {
    CalibreInputFormatModel = z.enum(
      LOAD('calibre_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<CalibreInputFormat>
  }
  return CalibreInputFormatModel!
}

let CalibreInputProfileModel: z.ZodType<CalibreInputProfile>

export const CalibreInputProfileParser = () => {
  if (!CalibreInputProfileModel) {
    CalibreInputProfileModel = z.enum(
      LOAD('calibre_input_profile') as readonly [string, ...string[]],
    ) as z.ZodType<CalibreInputProfile>
  }
  return CalibreInputProfileModel!
}

let CalibreOutputFormatModel: z.ZodType<CalibreOutputFormat>

export const CalibreOutputFormatParser = () => {
  if (!CalibreOutputFormatModel) {
    CalibreOutputFormatModel = z.enum(
      LOAD('calibre_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<CalibreOutputFormat>
  }
  return CalibreOutputFormatModel!
}

let CalibreOutputProfileModel: z.ZodType<CalibreOutputProfile>

export const CalibreOutputProfileParser = () => {
  if (!CalibreOutputProfileModel) {
    CalibreOutputProfileModel = z.enum(
      LOAD('calibre_output_profile') as readonly [string, ...string[]],
    ) as z.ZodType<CalibreOutputProfile>
  }
  return CalibreOutputProfileModel!
}

let CallHandleModel: z.ZodType<CallHandle>

export const CallHandleParser = () => {
  if (!CallHandleModel) {
    CallHandleModel = z.enum(
      LOAD('call_handle') as readonly [string, ...string[]],
    ) as z.ZodType<CallHandle>
  }
  return CallHandleModel!
}

let CheckFileTypeUsingMagicBytesModel: z.ZodType<CheckFileTypeUsingMagicBytes>

export const CheckFileTypeUsingMagicBytesParser =
  (): z.ZodType<CheckFileTypeUsingMagicBytes> => {
    if (!CheckFileTypeUsingMagicBytesModel) {
      CheckFileTypeUsingMagicBytesModel = z.object({
        input: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<CheckFileTypeUsingMagicBytes>
    }
    return CheckFileTypeUsingMagicBytesModel!
  }

let CipherModel: z.ZodType<Cipher>

export const CipherParser = () => {
  if (!CipherModel) {
    CipherModel = z.enum(
      LOAD('cipher') as readonly [string, ...string[]],
    ) as z.ZodType<Cipher>
  }
  return CipherModel!
}

let CipherDataModel: z.ZodType<CipherData>

export const CipherDataParser = (): z.ZodType<CipherData> => {
  if (!CipherDataModel) {
    CipherDataModel = z.object({
      head: z.string(),
    }) as z.ZodType<CipherData>
  }
  return CipherDataModel!
}

let ClangFormatModel: z.ZodType<ClangFormat>

export const ClangFormatParser = () => {
  if (!ClangFormatModel) {
    ClangFormatModel = z.enum(
      LOAD('clang_format') as readonly [string, ...string[]],
    ) as z.ZodType<ClangFormat>
  }
  return ClangFormatModel!
}

let CliLogFormatModel: z.ZodType<CliLogFormat>

export const CliLogFormatParser = () => {
  if (!CliLogFormatModel) {
    CliLogFormatModel = z.enum(
      LOAD('cli_log_format') as readonly [string, ...string[]],
    ) as z.ZodType<CliLogFormat>
  }
  return CliLogFormatModel!
}

let CommandModel: z.ZodType<Command>

export const CommandParser = (): z.ZodType<Command> => {
  if (!CommandModel) {
    CommandModel = z.object({
      name: z.lazy(() => CommandNameParser()),
      key: z.lazy(() => CommandKeyParser()),
      link: z.array(z.string()),
    }) as z.ZodType<Command>
  }
  return CommandModel!
}

let CommandKeyModel: z.ZodType<CommandKey>

export const CommandKeyParser = () => {
  if (!CommandKeyModel) {
    CommandKeyModel = z.enum(
      LOAD('command_key') as readonly [string, ...string[]],
    ) as z.ZodType<CommandKey>
  }
  return CommandKeyModel!
}

let CommandNameModel: z.ZodType<CommandName>

export const CommandNameParser = () => {
  if (!CommandNameModel) {
    CommandNameModel = z.enum(
      LOAD('command_name') as readonly [string, ...string[]],
    ) as z.ZodType<CommandName>
  }
  return CommandNameModel!
}

let CommandSequenceModel: z.ZodType<CommandSequence>

export const CommandSequenceParser = (): z.ZodType<CommandSequence> => {
  if (!CommandSequenceModel) {
    CommandSequenceModel = z.object({
      call: z.array(z.lazy(() => CommandParser())),
    }) as z.ZodType<CommandSequence>
  }
  return CommandSequenceModel!
}

let CompileApiModel: z.ZodType<CompileApi>

export const CompileApiParser = (): z.ZodType<CompileApi> => {
  if (!CompileApiModel) {
    CompileApiModel = z.object({
      input: z.object({
        format: z.string(),
      }),
      output: z.object({
        format: z.string(),
      }),
    }) as z.ZodType<CompileApi>
  }
  return CompileApiModel!
}

let CompileAsmModel: z.ZodType<CompileAsm>

export const CompileAsmParser = (): z.ZodType<CompileAsm> => {
  if (!CompileAsmModel) {
    CompileAsmModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<CompileAsm>
  }
  return CompileAsmModel!
}

let CompileCCommandInputModel: z.ZodType<CompileCCommandInput>

export const CompileCCommandInputParser =
  (): z.ZodType<CompileCCommandInput> => {
    if (!CompileCCommandInputModel) {
      CompileCCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCCommandInput>
    }
    return CompileCCommandInputModel!
  }

let CompileCliBaseModel: z.ZodType<CompileCliBase>

export const CompileCliBaseParser = (): z.ZodType<CompileCliBase> => {
  if (!CompileCliBaseModel) {
    CompileCliBaseModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      help: z.optional(z.boolean()),
      log: z
        .optional(z.lazy(() => CliLogFormatParser()))
        .default('pretty'),
    }) as z.ZodType<CompileCliBase>
  }
  return CompileCliBaseModel!
}

let CompileCppCommandInputModel: z.ZodType<CompileCppCommandInput>

export const CompileCppCommandInputParser =
  (): z.ZodType<CompileCppCommandInput> => {
    if (!CompileCppCommandInputModel) {
      CompileCppCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CppInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
        }),
        pathScope: z.optional(z.string()),
        optimizationLevel: z
          .optional(z.lazy(() => LlvmOptimizationLevelParser()))
          .default('0'),
        fastMath: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileCppCommandInput>
    }
    return CompileCppCommandInputModel!
  }

let CompileJavaModel: z.ZodType<CompileJava>

export const CompileJavaParser = (): z.ZodType<CompileJava> => {
  if (!CompileJavaModel) {
    CompileJavaModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<CompileJava>
  }
  return CompileJavaModel!
}

let CompileLlvmModel: z.ZodType<CompileLlvm>

export const CompileLlvmParser = (): z.ZodType<CompileLlvm> => {
  if (!CompileLlvmModel) {
    CompileLlvmModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<CompileLlvm>
  }
  return CompileLlvmModel!
}

let CompileLlvmIrToAssemblyModel: z.ZodType<CompileLlvmIrToAssembly>

export const CompileLlvmIrToAssemblyParser =
  (): z.ZodType<CompileLlvmIrToAssembly> => {
    if (!CompileLlvmIrToAssemblyModel) {
      CompileLlvmIrToAssemblyModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          syntax: z
            .optional(z.lazy(() => AssemblySyntaxParser()))
            .default('intel'),
          architecture: z
            .optional(z.lazy(() => LlvmArchitectureParser()))
            .default('x86_64'),
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<CompileLlvmIrToAssembly>
    }
    return CompileLlvmIrToAssemblyModel!
  }

let CompileRustCommandInputModel: z.ZodType<CompileRustCommandInput>

export const CompileRustCommandInputParser =
  (): z.ZodType<CompileRustCommandInput> => {
    if (!CompileRustCommandInputModel) {
      CompileRustCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => RustInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => RustOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
          optimize: z.optional(z.boolean()).default(false),
          target: z.optional(z.lazy(() => RustCompilerTargetParser())),
        }),
        pathScope: z.optional(z.string()),
        explain: z.optional(z.boolean()).default(false),
      }) as z.ZodType<CompileRustCommandInput>
    }
    return CompileRustCommandInputModel!
  }

let CompileSwiftCommandInputModel: z.ZodType<CompileSwiftCommandInput>

export const CompileSwiftCommandInputParser =
  (): z.ZodType<CompileSwiftCommandInput> => {
    if (!CompileSwiftCommandInputModel) {
      CompileSwiftCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftCommandInput>
    }
    return CompileSwiftCommandInputModel!
  }

let CompileWastCommandInputModel: z.ZodType<CompileWastCommandInput>

export const CompileWastCommandInputParser =
  (): z.ZodType<CompileWastCommandInput> => {
    if (!CompileWastCommandInputModel) {
      CompileWastCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastCommandInput>
    }
    return CompileWastCommandInputModel!
  }

let CompressMp4WithFfmpegModel: z.ZodType<CompressMp4WithFfmpeg>

export const CompressMp4WithFfmpegParser =
  (): z.ZodType<CompressMp4WithFfmpeg> => {
    if (!CompressMp4WithFfmpegModel) {
      CompressMp4WithFfmpegModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        audioCodec: z
          .optional(z.lazy(() => FfmpegCodecAudioParser()))
          .default('aac'),
        videoCodec: z
          .optional(z.lazy(() => FfmpegCodecVideoParser()))
          .default('h264'),
      }) as z.ZodType<CompressMp4WithFfmpeg>
    }
    return CompressMp4WithFfmpegModel!
  }

let ConversionUnitAcreModel: z.ZodType<ConversionUnitAcre>

export const ConversionUnitAcreParser = () => {
  if (!ConversionUnitAcreModel) {
    ConversionUnitAcreModel = z.enum(
      LOAD('conversion_unit_acre') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitAcre>
  }
  return ConversionUnitAcreModel!
}

let ConversionUnitAmpereModel: z.ZodType<ConversionUnitAmpere>

export const ConversionUnitAmpereParser = () => {
  if (!ConversionUnitAmpereModel) {
    ConversionUnitAmpereModel = z.enum(
      LOAD('conversion_unit_ampere') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitAmpere>
  }
  return ConversionUnitAmpereModel!
}

let ConversionUnitArcminuteModel: z.ZodType<ConversionUnitArcminute>

export const ConversionUnitArcminuteParser = () => {
  if (!ConversionUnitArcminuteModel) {
    ConversionUnitArcminuteModel = z.enum(
      LOAD('conversion_unit_arcminute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitArcminute>
  }
  return ConversionUnitArcminuteModel!
}

let ConversionUnitArcsecondModel: z.ZodType<ConversionUnitArcsecond>

export const ConversionUnitArcsecondParser = () => {
  if (!ConversionUnitArcsecondModel) {
    ConversionUnitArcsecondModel = z.enum(
      LOAD('conversion_unit_arcsecond') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitArcsecond>
  }
  return ConversionUnitArcsecondModel!
}

let ConversionUnitBarModel: z.ZodType<ConversionUnitBar>

export const ConversionUnitBarParser = () => {
  if (!ConversionUnitBarModel) {
    ConversionUnitBarModel = z.enum(
      LOAD('conversion_unit_bar') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitBar>
  }
  return ConversionUnitBarModel!
}

let ConversionUnitBitModel: z.ZodType<ConversionUnitBit>

export const ConversionUnitBitParser = () => {
  if (!ConversionUnitBitModel) {
    ConversionUnitBitModel = z.enum(
      LOAD('conversion_unit_bit') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitBit>
  }
  return ConversionUnitBitModel!
}

let ConversionUnitByteModel: z.ZodType<ConversionUnitByte>

export const ConversionUnitByteParser = () => {
  if (!ConversionUnitByteModel) {
    ConversionUnitByteModel = z.enum(
      LOAD('conversion_unit_byte') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitByte>
  }
  return ConversionUnitByteModel!
}

let ConversionUnitCelsiusModel: z.ZodType<ConversionUnitCelsius>

export const ConversionUnitCelsiusParser = () => {
  if (!ConversionUnitCelsiusModel) {
    ConversionUnitCelsiusModel = z.enum(
      LOAD('conversion_unit_celsius') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitCelsius>
  }
  return ConversionUnitCelsiusModel!
}

let ConversionUnitCentilitreModel: z.ZodType<ConversionUnitCentilitre>

export const ConversionUnitCentilitreParser = () => {
  if (!ConversionUnitCentilitreModel) {
    ConversionUnitCentilitreModel = z.enum(
      LOAD('conversion_unit_centilitre') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCentilitre>
  }
  return ConversionUnitCentilitreModel!
}

let ConversionUnitCentilitrePerSecondModel: z.ZodType<ConversionUnitCentilitrePerSecond>

export const ConversionUnitCentilitrePerSecondParser = () => {
  if (!ConversionUnitCentilitrePerSecondModel) {
    ConversionUnitCentilitrePerSecondModel = z.enum(
      LOAD('conversion_unit_centilitre_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCentilitrePerSecond>
  }
  return ConversionUnitCentilitrePerSecondModel!
}

let ConversionUnitCentimeterModel: z.ZodType<ConversionUnitCentimeter>

export const ConversionUnitCentimeterParser = () => {
  if (!ConversionUnitCentimeterModel) {
    ConversionUnitCentimeterModel = z.enum(
      LOAD('conversion_unit_centimeter') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCentimeter>
  }
  return ConversionUnitCentimeterModel!
}

let ConversionUnitCubicCentimeterModel: z.ZodType<ConversionUnitCubicCentimeter>

export const ConversionUnitCubicCentimeterParser = () => {
  if (!ConversionUnitCubicCentimeterModel) {
    ConversionUnitCubicCentimeterModel = z.enum(
      LOAD('conversion_unit_cubic_centimeter') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicCentimeter>
  }
  return ConversionUnitCubicCentimeterModel!
}

let ConversionUnitCubicCentimeterPerSecondModel: z.ZodType<ConversionUnitCubicCentimeterPerSecond>

export const ConversionUnitCubicCentimeterPerSecondParser = () => {
  if (!ConversionUnitCubicCentimeterPerSecondModel) {
    ConversionUnitCubicCentimeterPerSecondModel = z.enum(
      LOAD('conversion_unit_cubic_centimeter_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicCentimeterPerSecond>
  }
  return ConversionUnitCubicCentimeterPerSecondModel!
}

let ConversionUnitCubicFootModel: z.ZodType<ConversionUnitCubicFoot>

export const ConversionUnitCubicFootParser = () => {
  if (!ConversionUnitCubicFootModel) {
    ConversionUnitCubicFootModel = z.enum(
      LOAD('conversion_unit_cubic_foot') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicFoot>
  }
  return ConversionUnitCubicFootModel!
}

let ConversionUnitCubicFootPerHourModel: z.ZodType<ConversionUnitCubicFootPerHour>

export const ConversionUnitCubicFootPerHourParser = () => {
  if (!ConversionUnitCubicFootPerHourModel) {
    ConversionUnitCubicFootPerHourModel = z.enum(
      LOAD('conversion_unit_cubic_foot_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicFootPerHour>
  }
  return ConversionUnitCubicFootPerHourModel!
}

let ConversionUnitCubicFootPerMinuteModel: z.ZodType<ConversionUnitCubicFootPerMinute>

export const ConversionUnitCubicFootPerMinuteParser = () => {
  if (!ConversionUnitCubicFootPerMinuteModel) {
    ConversionUnitCubicFootPerMinuteModel = z.enum(
      LOAD('conversion_unit_cubic_foot_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicFootPerMinute>
  }
  return ConversionUnitCubicFootPerMinuteModel!
}

let ConversionUnitCubicFootPerSecondModel: z.ZodType<ConversionUnitCubicFootPerSecond>

export const ConversionUnitCubicFootPerSecondParser = () => {
  if (!ConversionUnitCubicFootPerSecondModel) {
    ConversionUnitCubicFootPerSecondModel = z.enum(
      LOAD('conversion_unit_cubic_foot_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicFootPerSecond>
  }
  return ConversionUnitCubicFootPerSecondModel!
}

let ConversionUnitCubicInchModel: z.ZodType<ConversionUnitCubicInch>

export const ConversionUnitCubicInchParser = () => {
  if (!ConversionUnitCubicInchModel) {
    ConversionUnitCubicInchModel = z.enum(
      LOAD('conversion_unit_cubic_inch') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicInch>
  }
  return ConversionUnitCubicInchModel!
}

let ConversionUnitCubicInchPerHourModel: z.ZodType<ConversionUnitCubicInchPerHour>

export const ConversionUnitCubicInchPerHourParser = () => {
  if (!ConversionUnitCubicInchPerHourModel) {
    ConversionUnitCubicInchPerHourModel = z.enum(
      LOAD('conversion_unit_cubic_inch_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicInchPerHour>
  }
  return ConversionUnitCubicInchPerHourModel!
}

let ConversionUnitCubicInchPerMinuteModel: z.ZodType<ConversionUnitCubicInchPerMinute>

export const ConversionUnitCubicInchPerMinuteParser = () => {
  if (!ConversionUnitCubicInchPerMinuteModel) {
    ConversionUnitCubicInchPerMinuteModel = z.enum(
      LOAD('conversion_unit_cubic_inch_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicInchPerMinute>
  }
  return ConversionUnitCubicInchPerMinuteModel!
}

let ConversionUnitCubicInchPerSecondModel: z.ZodType<ConversionUnitCubicInchPerSecond>

export const ConversionUnitCubicInchPerSecondParser = () => {
  if (!ConversionUnitCubicInchPerSecondModel) {
    ConversionUnitCubicInchPerSecondModel = z.enum(
      LOAD('conversion_unit_cubic_inch_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicInchPerSecond>
  }
  return ConversionUnitCubicInchPerSecondModel!
}

let ConversionUnitCubicKilometerModel: z.ZodType<ConversionUnitCubicKilometer>

export const ConversionUnitCubicKilometerParser = () => {
  if (!ConversionUnitCubicKilometerModel) {
    ConversionUnitCubicKilometerModel = z.enum(
      LOAD('conversion_unit_cubic_kilometer') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicKilometer>
  }
  return ConversionUnitCubicKilometerModel!
}

let ConversionUnitCubicKilometerPerSecondModel: z.ZodType<ConversionUnitCubicKilometerPerSecond>

export const ConversionUnitCubicKilometerPerSecondParser = () => {
  if (!ConversionUnitCubicKilometerPerSecondModel) {
    ConversionUnitCubicKilometerPerSecondModel = z.enum(
      LOAD('conversion_unit_cubic_kilometer_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicKilometerPerSecond>
  }
  return ConversionUnitCubicKilometerPerSecondModel!
}

let ConversionUnitCubicMeterModel: z.ZodType<ConversionUnitCubicMeter>

export const ConversionUnitCubicMeterParser = () => {
  if (!ConversionUnitCubicMeterModel) {
    ConversionUnitCubicMeterModel = z.enum(
      LOAD('conversion_unit_cubic_meter') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicMeter>
  }
  return ConversionUnitCubicMeterModel!
}

let ConversionUnitCubicMeterPerHourModel: z.ZodType<ConversionUnitCubicMeterPerHour>

export const ConversionUnitCubicMeterPerHourParser = () => {
  if (!ConversionUnitCubicMeterPerHourModel) {
    ConversionUnitCubicMeterPerHourModel = z.enum(
      LOAD('conversion_unit_cubic_meter_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicMeterPerHour>
  }
  return ConversionUnitCubicMeterPerHourModel!
}

let ConversionUnitCubicMeterPerMinuteModel: z.ZodType<ConversionUnitCubicMeterPerMinute>

export const ConversionUnitCubicMeterPerMinuteParser = () => {
  if (!ConversionUnitCubicMeterPerMinuteModel) {
    ConversionUnitCubicMeterPerMinuteModel = z.enum(
      LOAD('conversion_unit_cubic_meter_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicMeterPerMinute>
  }
  return ConversionUnitCubicMeterPerMinuteModel!
}

let ConversionUnitCubicMeterPerSecondModel: z.ZodType<ConversionUnitCubicMeterPerSecond>

export const ConversionUnitCubicMeterPerSecondParser = () => {
  if (!ConversionUnitCubicMeterPerSecondModel) {
    ConversionUnitCubicMeterPerSecondModel = z.enum(
      LOAD('conversion_unit_cubic_meter_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicMeterPerSecond>
  }
  return ConversionUnitCubicMeterPerSecondModel!
}

let ConversionUnitCubicMillimeterModel: z.ZodType<ConversionUnitCubicMillimeter>

export const ConversionUnitCubicMillimeterParser = () => {
  if (!ConversionUnitCubicMillimeterModel) {
    ConversionUnitCubicMillimeterModel = z.enum(
      LOAD('conversion_unit_cubic_millimeter') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicMillimeter>
  }
  return ConversionUnitCubicMillimeterModel!
}

let ConversionUnitCubicMillimeterPerSecondModel: z.ZodType<ConversionUnitCubicMillimeterPerSecond>

export const ConversionUnitCubicMillimeterPerSecondParser = () => {
  if (!ConversionUnitCubicMillimeterPerSecondModel) {
    ConversionUnitCubicMillimeterPerSecondModel = z.enum(
      LOAD('conversion_unit_cubic_millimeter_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicMillimeterPerSecond>
  }
  return ConversionUnitCubicMillimeterPerSecondModel!
}

let ConversionUnitCubicYardModel: z.ZodType<ConversionUnitCubicYard>

export const ConversionUnitCubicYardParser = () => {
  if (!ConversionUnitCubicYardModel) {
    ConversionUnitCubicYardModel = z.enum(
      LOAD('conversion_unit_cubic_yard') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicYard>
  }
  return ConversionUnitCubicYardModel!
}

let ConversionUnitCubicYardPerHourModel: z.ZodType<ConversionUnitCubicYardPerHour>

export const ConversionUnitCubicYardPerHourParser = () => {
  if (!ConversionUnitCubicYardPerHourModel) {
    ConversionUnitCubicYardPerHourModel = z.enum(
      LOAD('conversion_unit_cubic_yard_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicYardPerHour>
  }
  return ConversionUnitCubicYardPerHourModel!
}

let ConversionUnitCubicYardPerMinuteModel: z.ZodType<ConversionUnitCubicYardPerMinute>

export const ConversionUnitCubicYardPerMinuteParser = () => {
  if (!ConversionUnitCubicYardPerMinuteModel) {
    ConversionUnitCubicYardPerMinuteModel = z.enum(
      LOAD('conversion_unit_cubic_yard_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicYardPerMinute>
  }
  return ConversionUnitCubicYardPerMinuteModel!
}

let ConversionUnitCubicYardPerSecondModel: z.ZodType<ConversionUnitCubicYardPerSecond>

export const ConversionUnitCubicYardPerSecondParser = () => {
  if (!ConversionUnitCubicYardPerSecondModel) {
    ConversionUnitCubicYardPerSecondModel = z.enum(
      LOAD('conversion_unit_cubic_yard_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCubicYardPerSecond>
  }
  return ConversionUnitCubicYardPerSecondModel!
}

let ConversionUnitCupModel: z.ZodType<ConversionUnitCup>

export const ConversionUnitCupParser = () => {
  if (!ConversionUnitCupModel) {
    ConversionUnitCupModel = z.enum(
      LOAD('conversion_unit_cup') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitCup>
  }
  return ConversionUnitCupModel!
}

let ConversionUnitCupPerSecondModel: z.ZodType<ConversionUnitCupPerSecond>

export const ConversionUnitCupPerSecondParser = () => {
  if (!ConversionUnitCupPerSecondModel) {
    ConversionUnitCupPerSecondModel = z.enum(
      LOAD('conversion_unit_cup_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitCupPerSecond>
  }
  return ConversionUnitCupPerSecondModel!
}

let ConversionUnitDayModel: z.ZodType<ConversionUnitDay>

export const ConversionUnitDayParser = () => {
  if (!ConversionUnitDayModel) {
    ConversionUnitDayModel = z.enum(
      LOAD('conversion_unit_day') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitDay>
  }
  return ConversionUnitDayModel!
}

let ConversionUnitDecilitreModel: z.ZodType<ConversionUnitDecilitre>

export const ConversionUnitDecilitreParser = () => {
  if (!ConversionUnitDecilitreModel) {
    ConversionUnitDecilitreModel = z.enum(
      LOAD('conversion_unit_decilitre') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitDecilitre>
  }
  return ConversionUnitDecilitreModel!
}

let ConversionUnitDecilitrePerSecondModel: z.ZodType<ConversionUnitDecilitrePerSecond>

export const ConversionUnitDecilitrePerSecondParser = () => {
  if (!ConversionUnitDecilitrePerSecondModel) {
    ConversionUnitDecilitrePerSecondModel = z.enum(
      LOAD('conversion_unit_decilitre_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitDecilitrePerSecond>
  }
  return ConversionUnitDecilitrePerSecondModel!
}

let ConversionUnitDegreeModel: z.ZodType<ConversionUnitDegree>

export const ConversionUnitDegreeParser = () => {
  if (!ConversionUnitDegreeModel) {
    ConversionUnitDegreeModel = z.enum(
      LOAD('conversion_unit_degree') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitDegree>
  }
  return ConversionUnitDegreeModel!
}

let ConversionUnitDegreePerSecondModel: z.ZodType<ConversionUnitDegreePerSecond>

export const ConversionUnitDegreePerSecondParser = () => {
  if (!ConversionUnitDegreePerSecondModel) {
    ConversionUnitDegreePerSecondModel = z.enum(
      LOAD('conversion_unit_degree_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitDegreePerSecond>
  }
  return ConversionUnitDegreePerSecondModel!
}

let ConversionUnitDozenModel: z.ZodType<ConversionUnitDozen>

export const ConversionUnitDozenParser = () => {
  if (!ConversionUnitDozenModel) {
    ConversionUnitDozenModel = z.enum(
      LOAD('conversion_unit_dozen') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitDozen>
  }
  return ConversionUnitDozenModel!
}

let ConversionUnitEachModel: z.ZodType<ConversionUnitEach>

export const ConversionUnitEachParser = () => {
  if (!ConversionUnitEachModel) {
    ConversionUnitEachModel = z.enum(
      LOAD('conversion_unit_each') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitEach>
  }
  return ConversionUnitEachModel!
}

let ConversionUnitFahrenheitModel: z.ZodType<ConversionUnitFahrenheit>

export const ConversionUnitFahrenheitParser = () => {
  if (!ConversionUnitFahrenheitModel) {
    ConversionUnitFahrenheitModel = z.enum(
      LOAD('conversion_unit_fahrenheit') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitFahrenheit>
  }
  return ConversionUnitFahrenheitModel!
}

let ConversionUnitFluidOunceModel: z.ZodType<ConversionUnitFluidOunce>

export const ConversionUnitFluidOunceParser = () => {
  if (!ConversionUnitFluidOunceModel) {
    ConversionUnitFluidOunceModel = z.enum(
      LOAD('conversion_unit_fluid_ounce') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitFluidOunce>
  }
  return ConversionUnitFluidOunceModel!
}

let ConversionUnitFluidOuncePerHourModel: z.ZodType<ConversionUnitFluidOuncePerHour>

export const ConversionUnitFluidOuncePerHourParser = () => {
  if (!ConversionUnitFluidOuncePerHourModel) {
    ConversionUnitFluidOuncePerHourModel = z.enum(
      LOAD('conversion_unit_fluid_ounce_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitFluidOuncePerHour>
  }
  return ConversionUnitFluidOuncePerHourModel!
}

let ConversionUnitFluidOuncePerMinuteModel: z.ZodType<ConversionUnitFluidOuncePerMinute>

export const ConversionUnitFluidOuncePerMinuteParser = () => {
  if (!ConversionUnitFluidOuncePerMinuteModel) {
    ConversionUnitFluidOuncePerMinuteModel = z.enum(
      LOAD('conversion_unit_fluid_ounce_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitFluidOuncePerMinute>
  }
  return ConversionUnitFluidOuncePerMinuteModel!
}

let ConversionUnitFluidOuncePerSecondModel: z.ZodType<ConversionUnitFluidOuncePerSecond>

export const ConversionUnitFluidOuncePerSecondParser = () => {
  if (!ConversionUnitFluidOuncePerSecondModel) {
    ConversionUnitFluidOuncePerSecondModel = z.enum(
      LOAD('conversion_unit_fluid_ounce_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitFluidOuncePerSecond>
  }
  return ConversionUnitFluidOuncePerSecondModel!
}

let ConversionUnitFootModel: z.ZodType<ConversionUnitFoot>

export const ConversionUnitFootParser = () => {
  if (!ConversionUnitFootModel) {
    ConversionUnitFootModel = z.enum(
      LOAD('conversion_unit_foot') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitFoot>
  }
  return ConversionUnitFootModel!
}

let ConversionUnitFootCandleModel: z.ZodType<ConversionUnitFootCandle>

export const ConversionUnitFootCandleParser = () => {
  if (!ConversionUnitFootCandleModel) {
    ConversionUnitFootCandleModel = z.enum(
      LOAD('conversion_unit_foot_candle') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitFootCandle>
  }
  return ConversionUnitFootCandleModel!
}

let ConversionUnitFootPerSecondModel: z.ZodType<ConversionUnitFootPerSecond>

export const ConversionUnitFootPerSecondParser = () => {
  if (!ConversionUnitFootPerSecondModel) {
    ConversionUnitFootPerSecondModel = z.enum(
      LOAD('conversion_unit_foot_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitFootPerSecond>
  }
  return ConversionUnitFootPerSecondModel!
}

let ConversionUnitGallonModel: z.ZodType<ConversionUnitGallon>

export const ConversionUnitGallonParser = () => {
  if (!ConversionUnitGallonModel) {
    ConversionUnitGallonModel = z.enum(
      LOAD('conversion_unit_gallon') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitGallon>
  }
  return ConversionUnitGallonModel!
}

let ConversionUnitGallonPerHourModel: z.ZodType<ConversionUnitGallonPerHour>

export const ConversionUnitGallonPerHourParser = () => {
  if (!ConversionUnitGallonPerHourModel) {
    ConversionUnitGallonPerHourModel = z.enum(
      LOAD('conversion_unit_gallon_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGallonPerHour>
  }
  return ConversionUnitGallonPerHourModel!
}

let ConversionUnitGallonPerMinuteModel: z.ZodType<ConversionUnitGallonPerMinute>

export const ConversionUnitGallonPerMinuteParser = () => {
  if (!ConversionUnitGallonPerMinuteModel) {
    ConversionUnitGallonPerMinuteModel = z.enum(
      LOAD('conversion_unit_gallon_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGallonPerMinute>
  }
  return ConversionUnitGallonPerMinuteModel!
}

let ConversionUnitGallonPerSecondModel: z.ZodType<ConversionUnitGallonPerSecond>

export const ConversionUnitGallonPerSecondParser = () => {
  if (!ConversionUnitGallonPerSecondModel) {
    ConversionUnitGallonPerSecondModel = z.enum(
      LOAD('conversion_unit_gallon_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGallonPerSecond>
  }
  return ConversionUnitGallonPerSecondModel!
}

let ConversionUnitGigabitModel: z.ZodType<ConversionUnitGigabit>

export const ConversionUnitGigabitParser = () => {
  if (!ConversionUnitGigabitModel) {
    ConversionUnitGigabitModel = z.enum(
      LOAD('conversion_unit_gigabit') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitGigabit>
  }
  return ConversionUnitGigabitModel!
}

let ConversionUnitGigabyteModel: z.ZodType<ConversionUnitGigabyte>

export const ConversionUnitGigabyteParser = () => {
  if (!ConversionUnitGigabyteModel) {
    ConversionUnitGigabyteModel = z.enum(
      LOAD('conversion_unit_gigabyte') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGigabyte>
  }
  return ConversionUnitGigabyteModel!
}

let ConversionUnitGigahertzModel: z.ZodType<ConversionUnitGigahertz>

export const ConversionUnitGigahertzParser = () => {
  if (!ConversionUnitGigahertzModel) {
    ConversionUnitGigahertzModel = z.enum(
      LOAD('conversion_unit_gigahertz') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGigahertz>
  }
  return ConversionUnitGigahertzModel!
}

let ConversionUnitGigavoltAmpereModel: z.ZodType<ConversionUnitGigavoltAmpere>

export const ConversionUnitGigavoltAmpereParser = () => {
  if (!ConversionUnitGigavoltAmpereModel) {
    ConversionUnitGigavoltAmpereModel = z.enum(
      LOAD('conversion_unit_gigavolt_ampere') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGigavoltAmpere>
  }
  return ConversionUnitGigavoltAmpereModel!
}

let ConversionUnitGigavoltAmpereReactiveModel: z.ZodType<ConversionUnitGigavoltAmpereReactive>

export const ConversionUnitGigavoltAmpereReactiveParser = () => {
  if (!ConversionUnitGigavoltAmpereReactiveModel) {
    ConversionUnitGigavoltAmpereReactiveModel = z.enum(
      LOAD('conversion_unit_gigavolt_ampere_reactive') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGigavoltAmpereReactive>
  }
  return ConversionUnitGigavoltAmpereReactiveModel!
}

let ConversionUnitGigavoltAmpereReactiveHourModel: z.ZodType<ConversionUnitGigavoltAmpereReactiveHour>

export const ConversionUnitGigavoltAmpereReactiveHourParser = () => {
  if (!ConversionUnitGigavoltAmpereReactiveHourModel) {
    ConversionUnitGigavoltAmpereReactiveHourModel = z.enum(
      LOAD(
        'conversion_unit_gigavolt_ampere_reactive_hour',
      ) as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitGigavoltAmpereReactiveHour>
  }
  return ConversionUnitGigavoltAmpereReactiveHourModel!
}

let ConversionUnitGigawattModel: z.ZodType<ConversionUnitGigawatt>

export const ConversionUnitGigawattParser = () => {
  if (!ConversionUnitGigawattModel) {
    ConversionUnitGigawattModel = z.enum(
      LOAD('conversion_unit_gigawatt') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGigawatt>
  }
  return ConversionUnitGigawattModel!
}

let ConversionUnitGigawattHourModel: z.ZodType<ConversionUnitGigawattHour>

export const ConversionUnitGigawattHourParser = () => {
  if (!ConversionUnitGigawattHourModel) {
    ConversionUnitGigawattHourModel = z.enum(
      LOAD('conversion_unit_gigawatt_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitGigawattHour>
  }
  return ConversionUnitGigawattHourModel!
}

let ConversionUnitGlasModel: z.ZodType<ConversionUnitGlas>

export const ConversionUnitGlasParser = () => {
  if (!ConversionUnitGlasModel) {
    ConversionUnitGlasModel = z.enum(
      LOAD('conversion_unit_glas') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitGlas>
  }
  return ConversionUnitGlasModel!
}

let ConversionUnitGradianModel: z.ZodType<ConversionUnitGradian>

export const ConversionUnitGradianParser = () => {
  if (!ConversionUnitGradianModel) {
    ConversionUnitGradianModel = z.enum(
      LOAD('conversion_unit_gradian') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitGradian>
  }
  return ConversionUnitGradianModel!
}

let ConversionUnitGramModel: z.ZodType<ConversionUnitGram>

export const ConversionUnitGramParser = () => {
  if (!ConversionUnitGramModel) {
    ConversionUnitGramModel = z.enum(
      LOAD('conversion_unit_gram') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitGram>
  }
  return ConversionUnitGramModel!
}

let ConversionUnitHectareModel: z.ZodType<ConversionUnitHectare>

export const ConversionUnitHectareParser = () => {
  if (!ConversionUnitHectareModel) {
    ConversionUnitHectareModel = z.enum(
      LOAD('conversion_unit_hectare') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitHectare>
  }
  return ConversionUnitHectareModel!
}

let ConversionUnitHectopascalModel: z.ZodType<ConversionUnitHectopascal>

export const ConversionUnitHectopascalParser = () => {
  if (!ConversionUnitHectopascalModel) {
    ConversionUnitHectopascalModel = z.enum(
      LOAD('conversion_unit_hectopascal') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitHectopascal>
  }
  return ConversionUnitHectopascalModel!
}

let ConversionUnitHertzModel: z.ZodType<ConversionUnitHertz>

export const ConversionUnitHertzParser = () => {
  if (!ConversionUnitHertzModel) {
    ConversionUnitHertzModel = z.enum(
      LOAD('conversion_unit_hertz') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitHertz>
  }
  return ConversionUnitHertzModel!
}

let ConversionUnitHourModel: z.ZodType<ConversionUnitHour>

export const ConversionUnitHourParser = () => {
  if (!ConversionUnitHourModel) {
    ConversionUnitHourModel = z.enum(
      LOAD('conversion_unit_hour') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitHour>
  }
  return ConversionUnitHourModel!
}

let ConversionUnitInchModel: z.ZodType<ConversionUnitInch>

export const ConversionUnitInchParser = () => {
  if (!ConversionUnitInchModel) {
    ConversionUnitInchModel = z.enum(
      LOAD('conversion_unit_inch') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitInch>
  }
  return ConversionUnitInchModel!
}

let ConversionUnitJouleModel: z.ZodType<ConversionUnitJoule>

export const ConversionUnitJouleParser = () => {
  if (!ConversionUnitJouleModel) {
    ConversionUnitJouleModel = z.enum(
      LOAD('conversion_unit_joule') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitJoule>
  }
  return ConversionUnitJouleModel!
}

let ConversionUnitKaffekoppModel: z.ZodType<ConversionUnitKaffekopp>

export const ConversionUnitKaffekoppParser = () => {
  if (!ConversionUnitKaffekoppModel) {
    ConversionUnitKaffekoppModel = z.enum(
      LOAD('conversion_unit_kaffekopp') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKaffekopp>
  }
  return ConversionUnitKaffekoppModel!
}

let ConversionUnitKannaModel: z.ZodType<ConversionUnitKanna>

export const ConversionUnitKannaParser = () => {
  if (!ConversionUnitKannaModel) {
    ConversionUnitKannaModel = z.enum(
      LOAD('conversion_unit_kanna') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitKanna>
  }
  return ConversionUnitKannaModel!
}

let ConversionUnitKelvinModel: z.ZodType<ConversionUnitKelvin>

export const ConversionUnitKelvinParser = () => {
  if (!ConversionUnitKelvinModel) {
    ConversionUnitKelvinModel = z.enum(
      LOAD('conversion_unit_kelvin') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitKelvin>
  }
  return ConversionUnitKelvinModel!
}

let ConversionUnitKiloampereModel: z.ZodType<ConversionUnitKiloampere>

export const ConversionUnitKiloampereParser = () => {
  if (!ConversionUnitKiloampereModel) {
    ConversionUnitKiloampereModel = z.enum(
      LOAD('conversion_unit_kiloampere') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKiloampere>
  }
  return ConversionUnitKiloampereModel!
}

let ConversionUnitKilobitModel: z.ZodType<ConversionUnitKilobit>

export const ConversionUnitKilobitParser = () => {
  if (!ConversionUnitKilobitModel) {
    ConversionUnitKilobitModel = z.enum(
      LOAD('conversion_unit_kilobit') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitKilobit>
  }
  return ConversionUnitKilobitModel!
}

let ConversionUnitKilobyteModel: z.ZodType<ConversionUnitKilobyte>

export const ConversionUnitKilobyteParser = () => {
  if (!ConversionUnitKilobyteModel) {
    ConversionUnitKilobyteModel = z.enum(
      LOAD('conversion_unit_kilobyte') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilobyte>
  }
  return ConversionUnitKilobyteModel!
}

let ConversionUnitKilogramModel: z.ZodType<ConversionUnitKilogram>

export const ConversionUnitKilogramParser = () => {
  if (!ConversionUnitKilogramModel) {
    ConversionUnitKilogramModel = z.enum(
      LOAD('conversion_unit_kilogram') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilogram>
  }
  return ConversionUnitKilogramModel!
}

let ConversionUnitKilohertzModel: z.ZodType<ConversionUnitKilohertz>

export const ConversionUnitKilohertzParser = () => {
  if (!ConversionUnitKilohertzModel) {
    ConversionUnitKilohertzModel = z.enum(
      LOAD('conversion_unit_kilohertz') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilohertz>
  }
  return ConversionUnitKilohertzModel!
}

let ConversionUnitKilojouleModel: z.ZodType<ConversionUnitKilojoule>

export const ConversionUnitKilojouleParser = () => {
  if (!ConversionUnitKilojouleModel) {
    ConversionUnitKilojouleModel = z.enum(
      LOAD('conversion_unit_kilojoule') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilojoule>
  }
  return ConversionUnitKilojouleModel!
}

let ConversionUnitKilolitreModel: z.ZodType<ConversionUnitKilolitre>

export const ConversionUnitKilolitreParser = () => {
  if (!ConversionUnitKilolitreModel) {
    ConversionUnitKilolitreModel = z.enum(
      LOAD('conversion_unit_kilolitre') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilolitre>
  }
  return ConversionUnitKilolitreModel!
}

let ConversionUnitKilolitrePerHourModel: z.ZodType<ConversionUnitKilolitrePerHour>

export const ConversionUnitKilolitrePerHourParser = () => {
  if (!ConversionUnitKilolitrePerHourModel) {
    ConversionUnitKilolitrePerHourModel = z.enum(
      LOAD('conversion_unit_kilolitre_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilolitrePerHour>
  }
  return ConversionUnitKilolitrePerHourModel!
}

let ConversionUnitKilolitrePerMinuteModel: z.ZodType<ConversionUnitKilolitrePerMinute>

export const ConversionUnitKilolitrePerMinuteParser = () => {
  if (!ConversionUnitKilolitrePerMinuteModel) {
    ConversionUnitKilolitrePerMinuteModel = z.enum(
      LOAD('conversion_unit_kilolitre_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilolitrePerMinute>
  }
  return ConversionUnitKilolitrePerMinuteModel!
}

let ConversionUnitKilolitrePerSecondModel: z.ZodType<ConversionUnitKilolitrePerSecond>

export const ConversionUnitKilolitrePerSecondParser = () => {
  if (!ConversionUnitKilolitrePerSecondModel) {
    ConversionUnitKilolitrePerSecondModel = z.enum(
      LOAD('conversion_unit_kilolitre_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilolitrePerSecond>
  }
  return ConversionUnitKilolitrePerSecondModel!
}

let ConversionUnitKilometerModel: z.ZodType<ConversionUnitKilometer>

export const ConversionUnitKilometerParser = () => {
  if (!ConversionUnitKilometerModel) {
    ConversionUnitKilometerModel = z.enum(
      LOAD('conversion_unit_kilometer') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilometer>
  }
  return ConversionUnitKilometerModel!
}

let ConversionUnitKilometrePerHourModel: z.ZodType<ConversionUnitKilometrePerHour>

export const ConversionUnitKilometrePerHourParser = () => {
  if (!ConversionUnitKilometrePerHourModel) {
    ConversionUnitKilometrePerHourModel = z.enum(
      LOAD('conversion_unit_kilometre_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilometrePerHour>
  }
  return ConversionUnitKilometrePerHourModel!
}

let ConversionUnitKilopascalModel: z.ZodType<ConversionUnitKilopascal>

export const ConversionUnitKilopascalParser = () => {
  if (!ConversionUnitKilopascalModel) {
    ConversionUnitKilopascalModel = z.enum(
      LOAD('conversion_unit_kilopascal') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilopascal>
  }
  return ConversionUnitKilopascalModel!
}

let ConversionUnitKilopoundPerSquareInchModel: z.ZodType<ConversionUnitKilopoundPerSquareInch>

export const ConversionUnitKilopoundPerSquareInchParser = () => {
  if (!ConversionUnitKilopoundPerSquareInchModel) {
    ConversionUnitKilopoundPerSquareInchModel = z.enum(
      LOAD('conversion_unit_kilopound_per_square_inch') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilopoundPerSquareInch>
  }
  return ConversionUnitKilopoundPerSquareInchModel!
}

let ConversionUnitKilovoltModel: z.ZodType<ConversionUnitKilovolt>

export const ConversionUnitKilovoltParser = () => {
  if (!ConversionUnitKilovoltModel) {
    ConversionUnitKilovoltModel = z.enum(
      LOAD('conversion_unit_kilovolt') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilovolt>
  }
  return ConversionUnitKilovoltModel!
}

let ConversionUnitKilovoltAmpereModel: z.ZodType<ConversionUnitKilovoltAmpere>

export const ConversionUnitKilovoltAmpereParser = () => {
  if (!ConversionUnitKilovoltAmpereModel) {
    ConversionUnitKilovoltAmpereModel = z.enum(
      LOAD('conversion_unit_kilovolt_ampere') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilovoltAmpere>
  }
  return ConversionUnitKilovoltAmpereModel!
}

let ConversionUnitKilovoltAmpereReactiveModel: z.ZodType<ConversionUnitKilovoltAmpereReactive>

export const ConversionUnitKilovoltAmpereReactiveParser = () => {
  if (!ConversionUnitKilovoltAmpereReactiveModel) {
    ConversionUnitKilovoltAmpereReactiveModel = z.enum(
      LOAD('conversion_unit_kilovolt_ampere_reactive') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilovoltAmpereReactive>
  }
  return ConversionUnitKilovoltAmpereReactiveModel!
}

let ConversionUnitKilovoltAmpereReactiveHourModel: z.ZodType<ConversionUnitKilovoltAmpereReactiveHour>

export const ConversionUnitKilovoltAmpereReactiveHourParser = () => {
  if (!ConversionUnitKilovoltAmpereReactiveHourModel) {
    ConversionUnitKilovoltAmpereReactiveHourModel = z.enum(
      LOAD(
        'conversion_unit_kilovolt_ampere_reactive_hour',
      ) as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitKilovoltAmpereReactiveHour>
  }
  return ConversionUnitKilovoltAmpereReactiveHourModel!
}

let ConversionUnitKilowattModel: z.ZodType<ConversionUnitKilowatt>

export const ConversionUnitKilowattParser = () => {
  if (!ConversionUnitKilowattModel) {
    ConversionUnitKilowattModel = z.enum(
      LOAD('conversion_unit_kilowatt') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilowatt>
  }
  return ConversionUnitKilowattModel!
}

let ConversionUnitKilowattHourModel: z.ZodType<ConversionUnitKilowattHour>

export const ConversionUnitKilowattHourParser = () => {
  if (!ConversionUnitKilowattHourModel) {
    ConversionUnitKilowattHourModel = z.enum(
      LOAD('conversion_unit_kilowatt_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitKilowattHour>
  }
  return ConversionUnitKilowattHourModel!
}

let ConversionUnitKnotModel: z.ZodType<ConversionUnitKnot>

export const ConversionUnitKnotParser = () => {
  if (!ConversionUnitKnotModel) {
    ConversionUnitKnotModel = z.enum(
      LOAD('conversion_unit_knot') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitKnot>
  }
  return ConversionUnitKnotModel!
}

let ConversionUnitLitreModel: z.ZodType<ConversionUnitLitre>

export const ConversionUnitLitreParser = () => {
  if (!ConversionUnitLitreModel) {
    ConversionUnitLitreModel = z.enum(
      LOAD('conversion_unit_litre') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitLitre>
  }
  return ConversionUnitLitreModel!
}

let ConversionUnitLitrePerHourModel: z.ZodType<ConversionUnitLitrePerHour>

export const ConversionUnitLitrePerHourParser = () => {
  if (!ConversionUnitLitrePerHourModel) {
    ConversionUnitLitrePerHourModel = z.enum(
      LOAD('conversion_unit_litre_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitLitrePerHour>
  }
  return ConversionUnitLitrePerHourModel!
}

let ConversionUnitLitrePerMinuteModel: z.ZodType<ConversionUnitLitrePerMinute>

export const ConversionUnitLitrePerMinuteParser = () => {
  if (!ConversionUnitLitrePerMinuteModel) {
    ConversionUnitLitrePerMinuteModel = z.enum(
      LOAD('conversion_unit_litre_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitLitrePerMinute>
  }
  return ConversionUnitLitrePerMinuteModel!
}

let ConversionUnitLitrePerSecondModel: z.ZodType<ConversionUnitLitrePerSecond>

export const ConversionUnitLitrePerSecondParser = () => {
  if (!ConversionUnitLitrePerSecondModel) {
    ConversionUnitLitrePerSecondModel = z.enum(
      LOAD('conversion_unit_litre_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitLitrePerSecond>
  }
  return ConversionUnitLitrePerSecondModel!
}

let ConversionUnitLuxModel: z.ZodType<ConversionUnitLux>

export const ConversionUnitLuxParser = () => {
  if (!ConversionUnitLuxModel) {
    ConversionUnitLuxModel = z.enum(
      LOAD('conversion_unit_lux') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitLux>
  }
  return ConversionUnitLuxModel!
}

let ConversionUnitMatskedModel: z.ZodType<ConversionUnitMatsked>

export const ConversionUnitMatskedParser = () => {
  if (!ConversionUnitMatskedModel) {
    ConversionUnitMatskedModel = z.enum(
      LOAD('conversion_unit_matsked') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitMatsked>
  }
  return ConversionUnitMatskedModel!
}

let ConversionUnitMegabitModel: z.ZodType<ConversionUnitMegabit>

export const ConversionUnitMegabitParser = () => {
  if (!ConversionUnitMegabitModel) {
    ConversionUnitMegabitModel = z.enum(
      LOAD('conversion_unit_megabit') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitMegabit>
  }
  return ConversionUnitMegabitModel!
}

let ConversionUnitMegabyteModel: z.ZodType<ConversionUnitMegabyte>

export const ConversionUnitMegabyteParser = () => {
  if (!ConversionUnitMegabyteModel) {
    ConversionUnitMegabyteModel = z.enum(
      LOAD('conversion_unit_megabyte') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMegabyte>
  }
  return ConversionUnitMegabyteModel!
}

let ConversionUnitMegahertzModel: z.ZodType<ConversionUnitMegahertz>

export const ConversionUnitMegahertzParser = () => {
  if (!ConversionUnitMegahertzModel) {
    ConversionUnitMegahertzModel = z.enum(
      LOAD('conversion_unit_megahertz') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMegahertz>
  }
  return ConversionUnitMegahertzModel!
}

let ConversionUnitMegapascalModel: z.ZodType<ConversionUnitMegapascal>

export const ConversionUnitMegapascalParser = () => {
  if (!ConversionUnitMegapascalModel) {
    ConversionUnitMegapascalModel = z.enum(
      LOAD('conversion_unit_megapascal') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMegapascal>
  }
  return ConversionUnitMegapascalModel!
}

let ConversionUnitMegavoltAmpereModel: z.ZodType<ConversionUnitMegavoltAmpere>

export const ConversionUnitMegavoltAmpereParser = () => {
  if (!ConversionUnitMegavoltAmpereModel) {
    ConversionUnitMegavoltAmpereModel = z.enum(
      LOAD('conversion_unit_megavolt_ampere') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMegavoltAmpere>
  }
  return ConversionUnitMegavoltAmpereModel!
}

let ConversionUnitMegavoltAmpereReactiveModel: z.ZodType<ConversionUnitMegavoltAmpereReactive>

export const ConversionUnitMegavoltAmpereReactiveParser = () => {
  if (!ConversionUnitMegavoltAmpereReactiveModel) {
    ConversionUnitMegavoltAmpereReactiveModel = z.enum(
      LOAD('conversion_unit_megavolt_ampere_reactive') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMegavoltAmpereReactive>
  }
  return ConversionUnitMegavoltAmpereReactiveModel!
}

let ConversionUnitMegavoltAmpereReactiveHourModel: z.ZodType<ConversionUnitMegavoltAmpereReactiveHour>

export const ConversionUnitMegavoltAmpereReactiveHourParser = () => {
  if (!ConversionUnitMegavoltAmpereReactiveHourModel) {
    ConversionUnitMegavoltAmpereReactiveHourModel = z.enum(
      LOAD(
        'conversion_unit_megavolt_ampere_reactive_hour',
      ) as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitMegavoltAmpereReactiveHour>
  }
  return ConversionUnitMegavoltAmpereReactiveHourModel!
}

let ConversionUnitMegawattModel: z.ZodType<ConversionUnitMegawatt>

export const ConversionUnitMegawattParser = () => {
  if (!ConversionUnitMegawattModel) {
    ConversionUnitMegawattModel = z.enum(
      LOAD('conversion_unit_megawatt') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMegawatt>
  }
  return ConversionUnitMegawattModel!
}

let ConversionUnitMegawattHourModel: z.ZodType<ConversionUnitMegawattHour>

export const ConversionUnitMegawattHourParser = () => {
  if (!ConversionUnitMegawattHourModel) {
    ConversionUnitMegawattHourModel = z.enum(
      LOAD('conversion_unit_megawatt_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMegawattHour>
  }
  return ConversionUnitMegawattHourModel!
}

let ConversionUnitMeterModel: z.ZodType<ConversionUnitMeter>

export const ConversionUnitMeterParser = () => {
  if (!ConversionUnitMeterModel) {
    ConversionUnitMeterModel = z.enum(
      LOAD('conversion_unit_meter') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitMeter>
  }
  return ConversionUnitMeterModel!
}

let ConversionUnitMetrePerSecondModel: z.ZodType<ConversionUnitMetrePerSecond>

export const ConversionUnitMetrePerSecondParser = () => {
  if (!ConversionUnitMetrePerSecondModel) {
    ConversionUnitMetrePerSecondModel = z.enum(
      LOAD('conversion_unit_metre_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMetrePerSecond>
  }
  return ConversionUnitMetrePerSecondModel!
}

let ConversionUnitMetricTonneModel: z.ZodType<ConversionUnitMetricTonne>

export const ConversionUnitMetricTonneParser = () => {
  if (!ConversionUnitMetricTonneModel) {
    ConversionUnitMetricTonneModel = z.enum(
      LOAD('conversion_unit_metric_tonne') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMetricTonne>
  }
  return ConversionUnitMetricTonneModel!
}

let ConversionUnitMicrogramModel: z.ZodType<ConversionUnitMicrogram>

export const ConversionUnitMicrogramParser = () => {
  if (!ConversionUnitMicrogramModel) {
    ConversionUnitMicrogramModel = z.enum(
      LOAD('conversion_unit_microgram') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMicrogram>
  }
  return ConversionUnitMicrogramModel!
}

let ConversionUnitMicrosecondModel: z.ZodType<ConversionUnitMicrosecond>

export const ConversionUnitMicrosecondParser = () => {
  if (!ConversionUnitMicrosecondModel) {
    ConversionUnitMicrosecondModel = z.enum(
      LOAD('conversion_unit_microsecond') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMicrosecond>
  }
  return ConversionUnitMicrosecondModel!
}

let ConversionUnitMileModel: z.ZodType<ConversionUnitMile>

export const ConversionUnitMileParser = () => {
  if (!ConversionUnitMileModel) {
    ConversionUnitMileModel = z.enum(
      LOAD('conversion_unit_mile') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitMile>
  }
  return ConversionUnitMileModel!
}

let ConversionUnitMilePerHourModel: z.ZodType<ConversionUnitMilePerHour>

export const ConversionUnitMilePerHourParser = () => {
  if (!ConversionUnitMilePerHourModel) {
    ConversionUnitMilePerHourModel = z.enum(
      LOAD('conversion_unit_mile_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMilePerHour>
  }
  return ConversionUnitMilePerHourModel!
}

let ConversionUnitMilliampereModel: z.ZodType<ConversionUnitMilliampere>

export const ConversionUnitMilliampereParser = () => {
  if (!ConversionUnitMilliampereModel) {
    ConversionUnitMilliampereModel = z.enum(
      LOAD('conversion_unit_milliampere') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMilliampere>
  }
  return ConversionUnitMilliampereModel!
}

let ConversionUnitMilligramModel: z.ZodType<ConversionUnitMilligram>

export const ConversionUnitMilligramParser = () => {
  if (!ConversionUnitMilligramModel) {
    ConversionUnitMilligramModel = z.enum(
      LOAD('conversion_unit_milligram') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMilligram>
  }
  return ConversionUnitMilligramModel!
}

let ConversionUnitMillihertzModel: z.ZodType<ConversionUnitMillihertz>

export const ConversionUnitMillihertzParser = () => {
  if (!ConversionUnitMillihertzModel) {
    ConversionUnitMillihertzModel = z.enum(
      LOAD('conversion_unit_millihertz') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMillihertz>
  }
  return ConversionUnitMillihertzModel!
}

let ConversionUnitMillilitreModel: z.ZodType<ConversionUnitMillilitre>

export const ConversionUnitMillilitreParser = () => {
  if (!ConversionUnitMillilitreModel) {
    ConversionUnitMillilitreModel = z.enum(
      LOAD('conversion_unit_millilitre') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMillilitre>
  }
  return ConversionUnitMillilitreModel!
}

let ConversionUnitMillilitrePerSecondModel: z.ZodType<ConversionUnitMillilitrePerSecond>

export const ConversionUnitMillilitrePerSecondParser = () => {
  if (!ConversionUnitMillilitrePerSecondModel) {
    ConversionUnitMillilitrePerSecondModel = z.enum(
      LOAD('conversion_unit_millilitre_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMillilitrePerSecond>
  }
  return ConversionUnitMillilitrePerSecondModel!
}

let ConversionUnitMillimeterModel: z.ZodType<ConversionUnitMillimeter>

export const ConversionUnitMillimeterParser = () => {
  if (!ConversionUnitMillimeterModel) {
    ConversionUnitMillimeterModel = z.enum(
      LOAD('conversion_unit_millimeter') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMillimeter>
  }
  return ConversionUnitMillimeterModel!
}

let ConversionUnitMillisecondModel: z.ZodType<ConversionUnitMillisecond>

export const ConversionUnitMillisecondParser = () => {
  if (!ConversionUnitMillisecondModel) {
    ConversionUnitMillisecondModel = z.enum(
      LOAD('conversion_unit_millisecond') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMillisecond>
  }
  return ConversionUnitMillisecondModel!
}

let ConversionUnitMillivoltModel: z.ZodType<ConversionUnitMillivolt>

export const ConversionUnitMillivoltParser = () => {
  if (!ConversionUnitMillivoltModel) {
    ConversionUnitMillivoltModel = z.enum(
      LOAD('conversion_unit_millivolt') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMillivolt>
  }
  return ConversionUnitMillivoltModel!
}

let ConversionUnitMillivoltAmpereModel: z.ZodType<ConversionUnitMillivoltAmpere>

export const ConversionUnitMillivoltAmpereParser = () => {
  if (!ConversionUnitMillivoltAmpereModel) {
    ConversionUnitMillivoltAmpereModel = z.enum(
      LOAD('conversion_unit_millivolt_ampere') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMillivoltAmpere>
  }
  return ConversionUnitMillivoltAmpereModel!
}

let ConversionUnitMillivoltAmpereReactiveModel: z.ZodType<ConversionUnitMillivoltAmpereReactive>

export const ConversionUnitMillivoltAmpereReactiveParser = () => {
  if (!ConversionUnitMillivoltAmpereReactiveModel) {
    ConversionUnitMillivoltAmpereReactiveModel = z.enum(
      LOAD('conversion_unit_millivolt_ampere_reactive') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMillivoltAmpereReactive>
  }
  return ConversionUnitMillivoltAmpereReactiveModel!
}

let ConversionUnitMillivoltAmpereReactiveHourModel: z.ZodType<ConversionUnitMillivoltAmpereReactiveHour>

export const ConversionUnitMillivoltAmpereReactiveHourParser = () => {
  if (!ConversionUnitMillivoltAmpereReactiveHourModel) {
    ConversionUnitMillivoltAmpereReactiveHourModel = z.enum(
      LOAD(
        'conversion_unit_millivolt_ampere_reactive_hour',
      ) as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitMillivoltAmpereReactiveHour>
  }
  return ConversionUnitMillivoltAmpereReactiveHourModel!
}

let ConversionUnitMilliwattModel: z.ZodType<ConversionUnitMilliwatt>

export const ConversionUnitMilliwattParser = () => {
  if (!ConversionUnitMilliwattModel) {
    ConversionUnitMilliwattModel = z.enum(
      LOAD('conversion_unit_milliwatt') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMilliwatt>
  }
  return ConversionUnitMilliwattModel!
}

let ConversionUnitMilliwattHourModel: z.ZodType<ConversionUnitMilliwattHour>

export const ConversionUnitMilliwattHourParser = () => {
  if (!ConversionUnitMilliwattHourModel) {
    ConversionUnitMilliwattHourModel = z.enum(
      LOAD('conversion_unit_milliwatt_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMilliwattHour>
  }
  return ConversionUnitMilliwattHourModel!
}

let ConversionUnitMinuteModel: z.ZodType<ConversionUnitMinute>

export const ConversionUnitMinuteParser = () => {
  if (!ConversionUnitMinuteModel) {
    ConversionUnitMinuteModel = z.enum(
      LOAD('conversion_unit_minute') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitMinute>
  }
  return ConversionUnitMinuteModel!
}

let ConversionUnitMinutePerKilometreModel: z.ZodType<ConversionUnitMinutePerKilometre>

export const ConversionUnitMinutePerKilometreParser = () => {
  if (!ConversionUnitMinutePerKilometreModel) {
    ConversionUnitMinutePerKilometreModel = z.enum(
      LOAD('conversion_unit_minute_per_kilometre') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMinutePerKilometre>
  }
  return ConversionUnitMinutePerKilometreModel!
}

let ConversionUnitMinutePerMileModel: z.ZodType<ConversionUnitMinutePerMile>

export const ConversionUnitMinutePerMileParser = () => {
  if (!ConversionUnitMinutePerMileModel) {
    ConversionUnitMinutePerMileModel = z.enum(
      LOAD('conversion_unit_minute_per_mile') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitMinutePerMile>
  }
  return ConversionUnitMinutePerMileModel!
}

let ConversionUnitMonthModel: z.ZodType<ConversionUnitMonth>

export const ConversionUnitMonthParser = () => {
  if (!ConversionUnitMonthModel) {
    ConversionUnitMonthModel = z.enum(
      LOAD('conversion_unit_month') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitMonth>
  }
  return ConversionUnitMonthModel!
}

let ConversionUnitNanosecondModel: z.ZodType<ConversionUnitNanosecond>

export const ConversionUnitNanosecondParser = () => {
  if (!ConversionUnitNanosecondModel) {
    ConversionUnitNanosecondModel = z.enum(
      LOAD('conversion_unit_nanosecond') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitNanosecond>
  }
  return ConversionUnitNanosecondModel!
}

let ConversionUnitOunceModel: z.ZodType<ConversionUnitOunce>

export const ConversionUnitOunceParser = () => {
  if (!ConversionUnitOunceModel) {
    ConversionUnitOunceModel = z.enum(
      LOAD('conversion_unit_ounce') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitOunce>
  }
  return ConversionUnitOunceModel!
}

let ConversionUnitPartPerBillionModel: z.ZodType<ConversionUnitPartPerBillion>

export const ConversionUnitPartPerBillionParser = () => {
  if (!ConversionUnitPartPerBillionModel) {
    ConversionUnitPartPerBillionModel = z.enum(
      LOAD('conversion_unit_part_per_billion') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitPartPerBillion>
  }
  return ConversionUnitPartPerBillionModel!
}

let ConversionUnitPartPerMillionModel: z.ZodType<ConversionUnitPartPerMillion>

export const ConversionUnitPartPerMillionParser = () => {
  if (!ConversionUnitPartPerMillionModel) {
    ConversionUnitPartPerMillionModel = z.enum(
      LOAD('conversion_unit_part_per_million') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitPartPerMillion>
  }
  return ConversionUnitPartPerMillionModel!
}

let ConversionUnitPartPerQuadrillionModel: z.ZodType<ConversionUnitPartPerQuadrillion>

export const ConversionUnitPartPerQuadrillionParser = () => {
  if (!ConversionUnitPartPerQuadrillionModel) {
    ConversionUnitPartPerQuadrillionModel = z.enum(
      LOAD('conversion_unit_part_per_quadrillion') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitPartPerQuadrillion>
  }
  return ConversionUnitPartPerQuadrillionModel!
}

let ConversionUnitPartPerTrillionModel: z.ZodType<ConversionUnitPartPerTrillion>

export const ConversionUnitPartPerTrillionParser = () => {
  if (!ConversionUnitPartPerTrillionModel) {
    ConversionUnitPartPerTrillionModel = z.enum(
      LOAD('conversion_unit_part_per_trillion') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitPartPerTrillion>
  }
  return ConversionUnitPartPerTrillionModel!
}

let ConversionUnitPascalModel: z.ZodType<ConversionUnitPascal>

export const ConversionUnitPascalParser = () => {
  if (!ConversionUnitPascalModel) {
    ConversionUnitPascalModel = z.enum(
      LOAD('conversion_unit_pascal') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitPascal>
  }
  return ConversionUnitPascalModel!
}

let ConversionUnitPintModel: z.ZodType<ConversionUnitPint>

export const ConversionUnitPintParser = () => {
  if (!ConversionUnitPintModel) {
    ConversionUnitPintModel = z.enum(
      LOAD('conversion_unit_pint') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitPint>
  }
  return ConversionUnitPintModel!
}

let ConversionUnitPintPerHourModel: z.ZodType<ConversionUnitPintPerHour>

export const ConversionUnitPintPerHourParser = () => {
  if (!ConversionUnitPintPerHourModel) {
    ConversionUnitPintPerHourModel = z.enum(
      LOAD('conversion_unit_pint_per_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitPintPerHour>
  }
  return ConversionUnitPintPerHourModel!
}

let ConversionUnitPintPerMinuteModel: z.ZodType<ConversionUnitPintPerMinute>

export const ConversionUnitPintPerMinuteParser = () => {
  if (!ConversionUnitPintPerMinuteModel) {
    ConversionUnitPintPerMinuteModel = z.enum(
      LOAD('conversion_unit_pint_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitPintPerMinute>
  }
  return ConversionUnitPintPerMinuteModel!
}

let ConversionUnitPintPerSecondModel: z.ZodType<ConversionUnitPintPerSecond>

export const ConversionUnitPintPerSecondParser = () => {
  if (!ConversionUnitPintPerSecondModel) {
    ConversionUnitPintPerSecondModel = z.enum(
      LOAD('conversion_unit_pint_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitPintPerSecond>
  }
  return ConversionUnitPintPerSecondModel!
}

let ConversionUnitPoundModel: z.ZodType<ConversionUnitPound>

export const ConversionUnitPoundParser = () => {
  if (!ConversionUnitPoundModel) {
    ConversionUnitPoundModel = z.enum(
      LOAD('conversion_unit_pound') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitPound>
  }
  return ConversionUnitPoundModel!
}

let ConversionUnitPoundPerSquareInchModel: z.ZodType<ConversionUnitPoundPerSquareInch>

export const ConversionUnitPoundPerSquareInchParser = () => {
  if (!ConversionUnitPoundPerSquareInchModel) {
    ConversionUnitPoundPerSquareInchModel = z.enum(
      LOAD('conversion_unit_pound_per_square_inch') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitPoundPerSquareInch>
  }
  return ConversionUnitPoundPerSquareInchModel!
}

let ConversionUnitQuartModel: z.ZodType<ConversionUnitQuart>

export const ConversionUnitQuartParser = () => {
  if (!ConversionUnitQuartModel) {
    ConversionUnitQuartModel = z.enum(
      LOAD('conversion_unit_quart') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitQuart>
  }
  return ConversionUnitQuartModel!
}

let ConversionUnitQuartPerSecondModel: z.ZodType<ConversionUnitQuartPerSecond>

export const ConversionUnitQuartPerSecondParser = () => {
  if (!ConversionUnitQuartPerSecondModel) {
    ConversionUnitQuartPerSecondModel = z.enum(
      LOAD('conversion_unit_quart_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitQuartPerSecond>
  }
  return ConversionUnitQuartPerSecondModel!
}

let ConversionUnitRadianModel: z.ZodType<ConversionUnitRadian>

export const ConversionUnitRadianParser = () => {
  if (!ConversionUnitRadianModel) {
    ConversionUnitRadianModel = z.enum(
      LOAD('conversion_unit_radian') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitRadian>
  }
  return ConversionUnitRadianModel!
}

let ConversionUnitRadianPerSecondModel: z.ZodType<ConversionUnitRadianPerSecond>

export const ConversionUnitRadianPerSecondParser = () => {
  if (!ConversionUnitRadianPerSecondModel) {
    ConversionUnitRadianPerSecondModel = z.enum(
      LOAD('conversion_unit_radian_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitRadianPerSecond>
  }
  return ConversionUnitRadianPerSecondModel!
}

let ConversionUnitRankineModel: z.ZodType<ConversionUnitRankine>

export const ConversionUnitRankineParser = () => {
  if (!ConversionUnitRankineModel) {
    ConversionUnitRankineModel = z.enum(
      LOAD('conversion_unit_rankine') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitRankine>
  }
  return ConversionUnitRankineModel!
}

let ConversionUnitRotationPerMinuteModel: z.ZodType<ConversionUnitRotationPerMinute>

export const ConversionUnitRotationPerMinuteParser = () => {
  if (!ConversionUnitRotationPerMinuteModel) {
    ConversionUnitRotationPerMinuteModel = z.enum(
      LOAD('conversion_unit_rotation_per_minute') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitRotationPerMinute>
  }
  return ConversionUnitRotationPerMinuteModel!
}

let ConversionUnitSecondModel: z.ZodType<ConversionUnitSecond>

export const ConversionUnitSecondParser = () => {
  if (!ConversionUnitSecondModel) {
    ConversionUnitSecondModel = z.enum(
      LOAD('conversion_unit_second') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitSecond>
  }
  return ConversionUnitSecondModel!
}

let ConversionUnitSecondPerFootModel: z.ZodType<ConversionUnitSecondPerFoot>

export const ConversionUnitSecondPerFootParser = () => {
  if (!ConversionUnitSecondPerFootModel) {
    ConversionUnitSecondPerFootModel = z.enum(
      LOAD('conversion_unit_second_per_foot') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSecondPerFoot>
  }
  return ConversionUnitSecondPerFootModel!
}

let ConversionUnitSecondPerMetreModel: z.ZodType<ConversionUnitSecondPerMetre>

export const ConversionUnitSecondPerMetreParser = () => {
  if (!ConversionUnitSecondPerMetreModel) {
    ConversionUnitSecondPerMetreModel = z.enum(
      LOAD('conversion_unit_second_per_metre') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSecondPerMetre>
  }
  return ConversionUnitSecondPerMetreModel!
}

let ConversionUnitSquareCentimeterModel: z.ZodType<ConversionUnitSquareCentimeter>

export const ConversionUnitSquareCentimeterParser = () => {
  if (!ConversionUnitSquareCentimeterModel) {
    ConversionUnitSquareCentimeterModel = z.enum(
      LOAD('conversion_unit_square_centimeter') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSquareCentimeter>
  }
  return ConversionUnitSquareCentimeterModel!
}

let ConversionUnitSquareFootModel: z.ZodType<ConversionUnitSquareFoot>

export const ConversionUnitSquareFootParser = () => {
  if (!ConversionUnitSquareFootModel) {
    ConversionUnitSquareFootModel = z.enum(
      LOAD('conversion_unit_square_foot') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSquareFoot>
  }
  return ConversionUnitSquareFootModel!
}

let ConversionUnitSquareInchModel: z.ZodType<ConversionUnitSquareInch>

export const ConversionUnitSquareInchParser = () => {
  if (!ConversionUnitSquareInchModel) {
    ConversionUnitSquareInchModel = z.enum(
      LOAD('conversion_unit_square_inch') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSquareInch>
  }
  return ConversionUnitSquareInchModel!
}

let ConversionUnitSquareKilometerModel: z.ZodType<ConversionUnitSquareKilometer>

export const ConversionUnitSquareKilometerParser = () => {
  if (!ConversionUnitSquareKilometerModel) {
    ConversionUnitSquareKilometerModel = z.enum(
      LOAD('conversion_unit_square_kilometer') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSquareKilometer>
  }
  return ConversionUnitSquareKilometerModel!
}

let ConversionUnitSquareMeterModel: z.ZodType<ConversionUnitSquareMeter>

export const ConversionUnitSquareMeterParser = () => {
  if (!ConversionUnitSquareMeterModel) {
    ConversionUnitSquareMeterModel = z.enum(
      LOAD('conversion_unit_square_meter') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSquareMeter>
  }
  return ConversionUnitSquareMeterModel!
}

let ConversionUnitSquareMileModel: z.ZodType<ConversionUnitSquareMile>

export const ConversionUnitSquareMileParser = () => {
  if (!ConversionUnitSquareMileModel) {
    ConversionUnitSquareMileModel = z.enum(
      LOAD('conversion_unit_square_mile') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSquareMile>
  }
  return ConversionUnitSquareMileModel!
}

let ConversionUnitSquareMillimeterModel: z.ZodType<ConversionUnitSquareMillimeter>

export const ConversionUnitSquareMillimeterParser = () => {
  if (!ConversionUnitSquareMillimeterModel) {
    ConversionUnitSquareMillimeterModel = z.enum(
      LOAD('conversion_unit_square_millimeter') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSquareMillimeter>
  }
  return ConversionUnitSquareMillimeterModel!
}

let ConversionUnitSquareYardModel: z.ZodType<ConversionUnitSquareYard>

export const ConversionUnitSquareYardParser = () => {
  if (!ConversionUnitSquareYardModel) {
    ConversionUnitSquareYardModel = z.enum(
      LOAD('conversion_unit_square_yard') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitSquareYard>
  }
  return ConversionUnitSquareYardModel!
}

let ConversionUnitTablespoonModel: z.ZodType<ConversionUnitTablespoon>

export const ConversionUnitTablespoonParser = () => {
  if (!ConversionUnitTablespoonModel) {
    ConversionUnitTablespoonModel = z.enum(
      LOAD('conversion_unit_tablespoon') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitTablespoon>
  }
  return ConversionUnitTablespoonModel!
}

let ConversionUnitTablespoonPerSecondModel: z.ZodType<ConversionUnitTablespoonPerSecond>

export const ConversionUnitTablespoonPerSecondParser = () => {
  if (!ConversionUnitTablespoonPerSecondModel) {
    ConversionUnitTablespoonPerSecondModel = z.enum(
      LOAD('conversion_unit_tablespoon_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitTablespoonPerSecond>
  }
  return ConversionUnitTablespoonPerSecondModel!
}

let ConversionUnitTeaspoonModel: z.ZodType<ConversionUnitTeaspoon>

export const ConversionUnitTeaspoonParser = () => {
  if (!ConversionUnitTeaspoonModel) {
    ConversionUnitTeaspoonModel = z.enum(
      LOAD('conversion_unit_teaspoon') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitTeaspoon>
  }
  return ConversionUnitTeaspoonModel!
}

let ConversionUnitTeaspoonPerSecondModel: z.ZodType<ConversionUnitTeaspoonPerSecond>

export const ConversionUnitTeaspoonPerSecondParser = () => {
  if (!ConversionUnitTeaspoonPerSecondModel) {
    ConversionUnitTeaspoonPerSecondModel = z.enum(
      LOAD('conversion_unit_teaspoon_per_second') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitTeaspoonPerSecond>
  }
  return ConversionUnitTeaspoonPerSecondModel!
}

let ConversionUnitTerabitModel: z.ZodType<ConversionUnitTerabit>

export const ConversionUnitTerabitParser = () => {
  if (!ConversionUnitTerabitModel) {
    ConversionUnitTerabitModel = z.enum(
      LOAD('conversion_unit_terabit') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitTerabit>
  }
  return ConversionUnitTerabitModel!
}

let ConversionUnitTerabyteModel: z.ZodType<ConversionUnitTerabyte>

export const ConversionUnitTerabyteParser = () => {
  if (!ConversionUnitTerabyteModel) {
    ConversionUnitTerabyteModel = z.enum(
      LOAD('conversion_unit_terabyte') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitTerabyte>
  }
  return ConversionUnitTerabyteModel!
}

let ConversionUnitTerahertzModel: z.ZodType<ConversionUnitTerahertz>

export const ConversionUnitTerahertzParser = () => {
  if (!ConversionUnitTerahertzModel) {
    ConversionUnitTerahertzModel = z.enum(
      LOAD('conversion_unit_terahertz') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitTerahertz>
  }
  return ConversionUnitTerahertzModel!
}

let ConversionUnitTeskedModel: z.ZodType<ConversionUnitTesked>

export const ConversionUnitTeskedParser = () => {
  if (!ConversionUnitTeskedModel) {
    ConversionUnitTeskedModel = z.enum(
      LOAD('conversion_unit_tesked') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitTesked>
  }
  return ConversionUnitTeskedModel!
}

let ConversionUnitTonModel: z.ZodType<ConversionUnitTon>

export const ConversionUnitTonParser = () => {
  if (!ConversionUnitTonModel) {
    ConversionUnitTonModel = z.enum(
      LOAD('conversion_unit_ton') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitTon>
  }
  return ConversionUnitTonModel!
}

let ConversionUnitTorrModel: z.ZodType<ConversionUnitTorr>

export const ConversionUnitTorrParser = () => {
  if (!ConversionUnitTorrModel) {
    ConversionUnitTorrModel = z.enum(
      LOAD('conversion_unit_torr') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitTorr>
  }
  return ConversionUnitTorrModel!
}

let ConversionUnitUsSurveyFootModel: z.ZodType<ConversionUnitUsSurveyFoot>

export const ConversionUnitUsSurveyFootParser = () => {
  if (!ConversionUnitUsSurveyFootModel) {
    ConversionUnitUsSurveyFootModel = z.enum(
      LOAD('conversion_unit_us_survey_foot') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitUsSurveyFoot>
  }
  return ConversionUnitUsSurveyFootModel!
}

let ConversionUnitVoltModel: z.ZodType<ConversionUnitVolt>

export const ConversionUnitVoltParser = () => {
  if (!ConversionUnitVoltModel) {
    ConversionUnitVoltModel = z.enum(
      LOAD('conversion_unit_volt') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitVolt>
  }
  return ConversionUnitVoltModel!
}

let ConversionUnitVoltAmpereModel: z.ZodType<ConversionUnitVoltAmpere>

export const ConversionUnitVoltAmpereParser = () => {
  if (!ConversionUnitVoltAmpereModel) {
    ConversionUnitVoltAmpereModel = z.enum(
      LOAD('conversion_unit_volt_ampere') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitVoltAmpere>
  }
  return ConversionUnitVoltAmpereModel!
}

let ConversionUnitVoltAmpereReactiveModel: z.ZodType<ConversionUnitVoltAmpereReactive>

export const ConversionUnitVoltAmpereReactiveParser = () => {
  if (!ConversionUnitVoltAmpereReactiveModel) {
    ConversionUnitVoltAmpereReactiveModel = z.enum(
      LOAD('conversion_unit_volt_ampere_reactive') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitVoltAmpereReactive>
  }
  return ConversionUnitVoltAmpereReactiveModel!
}

let ConversionUnitVoltAmpereReactiveHourModel: z.ZodType<ConversionUnitVoltAmpereReactiveHour>

export const ConversionUnitVoltAmpereReactiveHourParser = () => {
  if (!ConversionUnitVoltAmpereReactiveHourModel) {
    ConversionUnitVoltAmpereReactiveHourModel = z.enum(
      LOAD('conversion_unit_volt_ampere_reactive_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitVoltAmpereReactiveHour>
  }
  return ConversionUnitVoltAmpereReactiveHourModel!
}

let ConversionUnitWattModel: z.ZodType<ConversionUnitWatt>

export const ConversionUnitWattParser = () => {
  if (!ConversionUnitWattModel) {
    ConversionUnitWattModel = z.enum(
      LOAD('conversion_unit_watt') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitWatt>
  }
  return ConversionUnitWattModel!
}

let ConversionUnitWattHourModel: z.ZodType<ConversionUnitWattHour>

export const ConversionUnitWattHourParser = () => {
  if (!ConversionUnitWattHourModel) {
    ConversionUnitWattHourModel = z.enum(
      LOAD('conversion_unit_watt_hour') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConversionUnitWattHour>
  }
  return ConversionUnitWattHourModel!
}

let ConversionUnitWeekModel: z.ZodType<ConversionUnitWeek>

export const ConversionUnitWeekParser = () => {
  if (!ConversionUnitWeekModel) {
    ConversionUnitWeekModel = z.enum(
      LOAD('conversion_unit_week') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitWeek>
  }
  return ConversionUnitWeekModel!
}

let ConversionUnitYardModel: z.ZodType<ConversionUnitYard>

export const ConversionUnitYardParser = () => {
  if (!ConversionUnitYardModel) {
    ConversionUnitYardModel = z.enum(
      LOAD('conversion_unit_yard') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitYard>
  }
  return ConversionUnitYardModel!
}

let ConversionUnitYearModel: z.ZodType<ConversionUnitYear>

export const ConversionUnitYearParser = () => {
  if (!ConversionUnitYearModel) {
    ConversionUnitYearModel = z.enum(
      LOAD('conversion_unit_year') as readonly [string, ...string[]],
    ) as z.ZodType<ConversionUnitYear>
  }
  return ConversionUnitYearModel!
}

let ConvertAcreModel: z.ZodType<ConvertAcre>

export const ConvertAcreParser = (): z.ZodType<ConvertAcre> => {
  if (!ConvertAcreModel) {
    ConvertAcreModel = z.object({
      input: z.object({
        format: z.literal('acre'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitAcreParser()),
      }),
    }) as z.ZodType<ConvertAcre>
  }
  return ConvertAcreModel!
}

let ConvertAmpereModel: z.ZodType<ConvertAmpere>

export const ConvertAmpereParser = (): z.ZodType<ConvertAmpere> => {
  if (!ConvertAmpereModel) {
    ConvertAmpereModel = z.object({
      input: z.object({
        format: z.literal('ampere'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitAmpereParser()),
      }),
    }) as z.ZodType<ConvertAmpere>
  }
  return ConvertAmpereModel!
}

let ConvertApiModel: z.ZodType<ConvertApi>

export const ConvertApiParser = (): z.ZodType<ConvertApi> => {
  if (!ConvertApiModel) {
    ConvertApiModel = z.object({
      input: z.object({
        format: z.string(),
      }),
      output: z.object({
        format: z.string(),
      }),
    }) as z.ZodType<ConvertApi>
  }
  return ConvertApiModel!
}

let ConvertArchiveCommandInputModel: z.ZodType<ConvertArchiveCommandInput>

export const ConvertArchiveCommandInputParser =
  (): z.ZodType<ConvertArchiveCommandInput> => {
    if (!ConvertArchiveCommandInputModel) {
      ConvertArchiveCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveCommandInput>
    }
    return ConvertArchiveCommandInputModel!
  }

let ConvertArcminuteModel: z.ZodType<ConvertArcminute>

export const ConvertArcminuteParser =
  (): z.ZodType<ConvertArcminute> => {
    if (!ConvertArcminuteModel) {
      ConvertArcminuteModel = z.object({
        input: z.object({
          format: z.literal('arcminute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitArcminuteParser()),
        }),
      }) as z.ZodType<ConvertArcminute>
    }
    return ConvertArcminuteModel!
  }

let ConvertArcsecondModel: z.ZodType<ConvertArcsecond>

export const ConvertArcsecondParser =
  (): z.ZodType<ConvertArcsecond> => {
    if (!ConvertArcsecondModel) {
      ConvertArcsecondModel = z.object({
        input: z.object({
          format: z.literal('arcsecond'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitArcsecondParser()),
        }),
      }) as z.ZodType<ConvertArcsecond>
    }
    return ConvertArcsecondModel!
  }

let ConvertBarModel: z.ZodType<ConvertBar>

export const ConvertBarParser = (): z.ZodType<ConvertBar> => {
  if (!ConvertBarModel) {
    ConvertBarModel = z.object({
      input: z.object({
        format: z.literal('bar'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitBarParser()),
      }),
    }) as z.ZodType<ConvertBar>
  }
  return ConvertBarModel!
}

let ConvertBitModel: z.ZodType<ConvertBit>

export const ConvertBitParser = (): z.ZodType<ConvertBit> => {
  if (!ConvertBitModel) {
    ConvertBitModel = z.object({
      input: z.object({
        format: z.literal('bit'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitBitParser()),
      }),
    }) as z.ZodType<ConvertBit>
  }
  return ConvertBitModel!
}

let ConvertByteModel: z.ZodType<ConvertByte>

export const ConvertByteParser = (): z.ZodType<ConvertByte> => {
  if (!ConvertByteModel) {
    ConvertByteModel = z.object({
      input: z.object({
        format: z.literal('byte'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitByteParser()),
      }),
    }) as z.ZodType<ConvertByte>
  }
  return ConvertByteModel!
}

let ConvertCelsiusModel: z.ZodType<ConvertCelsius>

export const ConvertCelsiusParser = (): z.ZodType<ConvertCelsius> => {
  if (!ConvertCelsiusModel) {
    ConvertCelsiusModel = z.object({
      input: z.object({
        format: z.literal('celsius'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitCelsiusParser()),
      }),
    }) as z.ZodType<ConvertCelsius>
  }
  return ConvertCelsiusModel!
}

let ConvertCentilitreModel: z.ZodType<ConvertCentilitre>

export const ConvertCentilitreParser =
  (): z.ZodType<ConvertCentilitre> => {
    if (!ConvertCentilitreModel) {
      ConvertCentilitreModel = z.object({
        input: z.object({
          format: z.literal('centilitre'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCentilitreParser()),
        }),
      }) as z.ZodType<ConvertCentilitre>
    }
    return ConvertCentilitreModel!
  }

let ConvertCentilitrePerSecondModel: z.ZodType<ConvertCentilitrePerSecond>

export const ConvertCentilitrePerSecondParser =
  (): z.ZodType<ConvertCentilitrePerSecond> => {
    if (!ConvertCentilitrePerSecondModel) {
      ConvertCentilitrePerSecondModel = z.object({
        input: z.object({
          format: z.literal('centilitre-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCentilitrePerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertCentilitrePerSecond>
    }
    return ConvertCentilitrePerSecondModel!
  }

let ConvertCentimeterModel: z.ZodType<ConvertCentimeter>

export const ConvertCentimeterParser =
  (): z.ZodType<ConvertCentimeter> => {
    if (!ConvertCentimeterModel) {
      ConvertCentimeterModel = z.object({
        input: z.object({
          format: z.literal('centimeter'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCentimeterParser()),
        }),
      }) as z.ZodType<ConvertCentimeter>
    }
    return ConvertCentimeterModel!
  }

let ConvertCliBaseModel: z.ZodType<ConvertCliBase>

export const ConvertCliBaseParser = (): z.ZodType<ConvertCliBase> => {
  if (!ConvertCliBaseModel) {
    ConvertCliBaseModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      help: z.optional(z.boolean()),
      log: z
        .optional(z.lazy(() => CliLogFormatParser()))
        .default('pretty'),
    }) as z.ZodType<ConvertCliBase>
  }
  return ConvertCliBaseModel!
}

let ConvertCubicCentimeterModel: z.ZodType<ConvertCubicCentimeter>

export const ConvertCubicCentimeterParser =
  (): z.ZodType<ConvertCubicCentimeter> => {
    if (!ConvertCubicCentimeterModel) {
      ConvertCubicCentimeterModel = z.object({
        input: z.object({
          format: z.literal('cubic-centimeter'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicCentimeterParser()),
        }),
      }) as z.ZodType<ConvertCubicCentimeter>
    }
    return ConvertCubicCentimeterModel!
  }

let ConvertCubicCentimeterPerSecondModel: z.ZodType<ConvertCubicCentimeterPerSecond>

export const ConvertCubicCentimeterPerSecondParser =
  (): z.ZodType<ConvertCubicCentimeterPerSecond> => {
    if (!ConvertCubicCentimeterPerSecondModel) {
      ConvertCubicCentimeterPerSecondModel = z.object({
        input: z.object({
          format: z.literal('cubic-centimeter-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicCentimeterPerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicCentimeterPerSecond>
    }
    return ConvertCubicCentimeterPerSecondModel!
  }

let ConvertCubicFootModel: z.ZodType<ConvertCubicFoot>

export const ConvertCubicFootParser =
  (): z.ZodType<ConvertCubicFoot> => {
    if (!ConvertCubicFootModel) {
      ConvertCubicFootModel = z.object({
        input: z.object({
          format: z.literal('cubic-foot'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicFootParser()),
        }),
      }) as z.ZodType<ConvertCubicFoot>
    }
    return ConvertCubicFootModel!
  }

let ConvertCubicFootPerHourModel: z.ZodType<ConvertCubicFootPerHour>

export const ConvertCubicFootPerHourParser =
  (): z.ZodType<ConvertCubicFootPerHour> => {
    if (!ConvertCubicFootPerHourModel) {
      ConvertCubicFootPerHourModel = z.object({
        input: z.object({
          format: z.literal('cubic-foot-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicFootPerHourParser()),
        }),
      }) as z.ZodType<ConvertCubicFootPerHour>
    }
    return ConvertCubicFootPerHourModel!
  }

let ConvertCubicFootPerMinuteModel: z.ZodType<ConvertCubicFootPerMinute>

export const ConvertCubicFootPerMinuteParser =
  (): z.ZodType<ConvertCubicFootPerMinute> => {
    if (!ConvertCubicFootPerMinuteModel) {
      ConvertCubicFootPerMinuteModel = z.object({
        input: z.object({
          format: z.literal('cubic-foot-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicFootPerMinuteParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicFootPerMinute>
    }
    return ConvertCubicFootPerMinuteModel!
  }

let ConvertCubicFootPerSecondModel: z.ZodType<ConvertCubicFootPerSecond>

export const ConvertCubicFootPerSecondParser =
  (): z.ZodType<ConvertCubicFootPerSecond> => {
    if (!ConvertCubicFootPerSecondModel) {
      ConvertCubicFootPerSecondModel = z.object({
        input: z.object({
          format: z.literal('cubic-foot-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicFootPerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicFootPerSecond>
    }
    return ConvertCubicFootPerSecondModel!
  }

let ConvertCubicInchModel: z.ZodType<ConvertCubicInch>

export const ConvertCubicInchParser =
  (): z.ZodType<ConvertCubicInch> => {
    if (!ConvertCubicInchModel) {
      ConvertCubicInchModel = z.object({
        input: z.object({
          format: z.literal('cubic-inch'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicInchParser()),
        }),
      }) as z.ZodType<ConvertCubicInch>
    }
    return ConvertCubicInchModel!
  }

let ConvertCubicInchPerHourModel: z.ZodType<ConvertCubicInchPerHour>

export const ConvertCubicInchPerHourParser =
  (): z.ZodType<ConvertCubicInchPerHour> => {
    if (!ConvertCubicInchPerHourModel) {
      ConvertCubicInchPerHourModel = z.object({
        input: z.object({
          format: z.literal('cubic-inch-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicInchPerHourParser()),
        }),
      }) as z.ZodType<ConvertCubicInchPerHour>
    }
    return ConvertCubicInchPerHourModel!
  }

let ConvertCubicInchPerMinuteModel: z.ZodType<ConvertCubicInchPerMinute>

export const ConvertCubicInchPerMinuteParser =
  (): z.ZodType<ConvertCubicInchPerMinute> => {
    if (!ConvertCubicInchPerMinuteModel) {
      ConvertCubicInchPerMinuteModel = z.object({
        input: z.object({
          format: z.literal('cubic-inch-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicInchPerMinuteParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicInchPerMinute>
    }
    return ConvertCubicInchPerMinuteModel!
  }

let ConvertCubicInchPerSecondModel: z.ZodType<ConvertCubicInchPerSecond>

export const ConvertCubicInchPerSecondParser =
  (): z.ZodType<ConvertCubicInchPerSecond> => {
    if (!ConvertCubicInchPerSecondModel) {
      ConvertCubicInchPerSecondModel = z.object({
        input: z.object({
          format: z.literal('cubic-inch-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicInchPerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicInchPerSecond>
    }
    return ConvertCubicInchPerSecondModel!
  }

let ConvertCubicKilometerModel: z.ZodType<ConvertCubicKilometer>

export const ConvertCubicKilometerParser =
  (): z.ZodType<ConvertCubicKilometer> => {
    if (!ConvertCubicKilometerModel) {
      ConvertCubicKilometerModel = z.object({
        input: z.object({
          format: z.literal('cubic-kilometer'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicKilometerParser()),
        }),
      }) as z.ZodType<ConvertCubicKilometer>
    }
    return ConvertCubicKilometerModel!
  }

let ConvertCubicKilometerPerSecondModel: z.ZodType<ConvertCubicKilometerPerSecond>

export const ConvertCubicKilometerPerSecondParser =
  (): z.ZodType<ConvertCubicKilometerPerSecond> => {
    if (!ConvertCubicKilometerPerSecondModel) {
      ConvertCubicKilometerPerSecondModel = z.object({
        input: z.object({
          format: z.literal('cubic-kilometer-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicKilometerPerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicKilometerPerSecond>
    }
    return ConvertCubicKilometerPerSecondModel!
  }

let ConvertCubicMeterModel: z.ZodType<ConvertCubicMeter>

export const ConvertCubicMeterParser =
  (): z.ZodType<ConvertCubicMeter> => {
    if (!ConvertCubicMeterModel) {
      ConvertCubicMeterModel = z.object({
        input: z.object({
          format: z.literal('cubic-meter'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicMeterParser()),
        }),
      }) as z.ZodType<ConvertCubicMeter>
    }
    return ConvertCubicMeterModel!
  }

let ConvertCubicMeterPerHourModel: z.ZodType<ConvertCubicMeterPerHour>

export const ConvertCubicMeterPerHourParser =
  (): z.ZodType<ConvertCubicMeterPerHour> => {
    if (!ConvertCubicMeterPerHourModel) {
      ConvertCubicMeterPerHourModel = z.object({
        input: z.object({
          format: z.literal('cubic-meter-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicMeterPerHourParser()),
        }),
      }) as z.ZodType<ConvertCubicMeterPerHour>
    }
    return ConvertCubicMeterPerHourModel!
  }

let ConvertCubicMeterPerMinuteModel: z.ZodType<ConvertCubicMeterPerMinute>

export const ConvertCubicMeterPerMinuteParser =
  (): z.ZodType<ConvertCubicMeterPerMinute> => {
    if (!ConvertCubicMeterPerMinuteModel) {
      ConvertCubicMeterPerMinuteModel = z.object({
        input: z.object({
          format: z.literal('cubic-meter-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicMeterPerMinuteParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicMeterPerMinute>
    }
    return ConvertCubicMeterPerMinuteModel!
  }

let ConvertCubicMeterPerSecondModel: z.ZodType<ConvertCubicMeterPerSecond>

export const ConvertCubicMeterPerSecondParser =
  (): z.ZodType<ConvertCubicMeterPerSecond> => {
    if (!ConvertCubicMeterPerSecondModel) {
      ConvertCubicMeterPerSecondModel = z.object({
        input: z.object({
          format: z.literal('cubic-meter-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicMeterPerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicMeterPerSecond>
    }
    return ConvertCubicMeterPerSecondModel!
  }

let ConvertCubicMillimeterModel: z.ZodType<ConvertCubicMillimeter>

export const ConvertCubicMillimeterParser =
  (): z.ZodType<ConvertCubicMillimeter> => {
    if (!ConvertCubicMillimeterModel) {
      ConvertCubicMillimeterModel = z.object({
        input: z.object({
          format: z.literal('cubic-millimeter'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicMillimeterParser()),
        }),
      }) as z.ZodType<ConvertCubicMillimeter>
    }
    return ConvertCubicMillimeterModel!
  }

let ConvertCubicMillimeterPerSecondModel: z.ZodType<ConvertCubicMillimeterPerSecond>

export const ConvertCubicMillimeterPerSecondParser =
  (): z.ZodType<ConvertCubicMillimeterPerSecond> => {
    if (!ConvertCubicMillimeterPerSecondModel) {
      ConvertCubicMillimeterPerSecondModel = z.object({
        input: z.object({
          format: z.literal('cubic-millimeter-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicMillimeterPerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicMillimeterPerSecond>
    }
    return ConvertCubicMillimeterPerSecondModel!
  }

let ConvertCubicYardModel: z.ZodType<ConvertCubicYard>

export const ConvertCubicYardParser =
  (): z.ZodType<ConvertCubicYard> => {
    if (!ConvertCubicYardModel) {
      ConvertCubicYardModel = z.object({
        input: z.object({
          format: z.literal('cubic-yard'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicYardParser()),
        }),
      }) as z.ZodType<ConvertCubicYard>
    }
    return ConvertCubicYardModel!
  }

let ConvertCubicYardPerHourModel: z.ZodType<ConvertCubicYardPerHour>

export const ConvertCubicYardPerHourParser =
  (): z.ZodType<ConvertCubicYardPerHour> => {
    if (!ConvertCubicYardPerHourModel) {
      ConvertCubicYardPerHourModel = z.object({
        input: z.object({
          format: z.literal('cubic-yard-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCubicYardPerHourParser()),
        }),
      }) as z.ZodType<ConvertCubicYardPerHour>
    }
    return ConvertCubicYardPerHourModel!
  }

let ConvertCubicYardPerMinuteModel: z.ZodType<ConvertCubicYardPerMinute>

export const ConvertCubicYardPerMinuteParser =
  (): z.ZodType<ConvertCubicYardPerMinute> => {
    if (!ConvertCubicYardPerMinuteModel) {
      ConvertCubicYardPerMinuteModel = z.object({
        input: z.object({
          format: z.literal('cubic-yard-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicYardPerMinuteParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicYardPerMinute>
    }
    return ConvertCubicYardPerMinuteModel!
  }

let ConvertCubicYardPerSecondModel: z.ZodType<ConvertCubicYardPerSecond>

export const ConvertCubicYardPerSecondParser =
  (): z.ZodType<ConvertCubicYardPerSecond> => {
    if (!ConvertCubicYardPerSecondModel) {
      ConvertCubicYardPerSecondModel = z.object({
        input: z.object({
          format: z.literal('cubic-yard-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitCubicYardPerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertCubicYardPerSecond>
    }
    return ConvertCubicYardPerSecondModel!
  }

let ConvertCupModel: z.ZodType<ConvertCup>

export const ConvertCupParser = (): z.ZodType<ConvertCup> => {
  if (!ConvertCupModel) {
    ConvertCupModel = z.object({
      input: z.object({
        format: z.literal('cup'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitCupParser()),
      }),
    }) as z.ZodType<ConvertCup>
  }
  return ConvertCupModel!
}

let ConvertCupPerSecondModel: z.ZodType<ConvertCupPerSecond>

export const ConvertCupPerSecondParser =
  (): z.ZodType<ConvertCupPerSecond> => {
    if (!ConvertCupPerSecondModel) {
      ConvertCupPerSecondModel = z.object({
        input: z.object({
          format: z.literal('cup-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitCupPerSecondParser()),
        }),
      }) as z.ZodType<ConvertCupPerSecond>
    }
    return ConvertCupPerSecondModel!
  }

let ConvertDayModel: z.ZodType<ConvertDay>

export const ConvertDayParser = (): z.ZodType<ConvertDay> => {
  if (!ConvertDayModel) {
    ConvertDayModel = z.object({
      input: z.object({
        format: z.literal('day'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitDayParser()),
      }),
    }) as z.ZodType<ConvertDay>
  }
  return ConvertDayModel!
}

let ConvertDecilitreModel: z.ZodType<ConvertDecilitre>

export const ConvertDecilitreParser =
  (): z.ZodType<ConvertDecilitre> => {
    if (!ConvertDecilitreModel) {
      ConvertDecilitreModel = z.object({
        input: z.object({
          format: z.literal('decilitre'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitDecilitreParser()),
        }),
      }) as z.ZodType<ConvertDecilitre>
    }
    return ConvertDecilitreModel!
  }

let ConvertDecilitrePerSecondModel: z.ZodType<ConvertDecilitrePerSecond>

export const ConvertDecilitrePerSecondParser =
  (): z.ZodType<ConvertDecilitrePerSecond> => {
    if (!ConvertDecilitrePerSecondModel) {
      ConvertDecilitrePerSecondModel = z.object({
        input: z.object({
          format: z.literal('decilitre-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitDecilitrePerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertDecilitrePerSecond>
    }
    return ConvertDecilitrePerSecondModel!
  }

let ConvertDegreeModel: z.ZodType<ConvertDegree>

export const ConvertDegreeParser = (): z.ZodType<ConvertDegree> => {
  if (!ConvertDegreeModel) {
    ConvertDegreeModel = z.object({
      input: z.object({
        format: z.literal('degree'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitDegreeParser()),
      }),
    }) as z.ZodType<ConvertDegree>
  }
  return ConvertDegreeModel!
}

let ConvertDegreePerSecondModel: z.ZodType<ConvertDegreePerSecond>

export const ConvertDegreePerSecondParser =
  (): z.ZodType<ConvertDegreePerSecond> => {
    if (!ConvertDegreePerSecondModel) {
      ConvertDegreePerSecondModel = z.object({
        input: z.object({
          format: z.literal('degree-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitDegreePerSecondParser()),
        }),
      }) as z.ZodType<ConvertDegreePerSecond>
    }
    return ConvertDegreePerSecondModel!
  }

let ConvertDocumentWithCalibreCommandInputModel: z.ZodType<ConvertDocumentWithCalibreCommandInput>

export const ConvertDocumentWithCalibreCommandInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreCommandInput> => {
    if (!ConvertDocumentWithCalibreCommandInputModel) {
      ConvertDocumentWithCalibreCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreCommandInput>
    }
    return ConvertDocumentWithCalibreCommandInputModel!
  }

let ConvertDocumentWithEnscriptCommandInputModel: z.ZodType<ConvertDocumentWithEnscriptCommandInput>

export const ConvertDocumentWithEnscriptCommandInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptCommandInput> => {
    if (!ConvertDocumentWithEnscriptCommandInputModel) {
      ConvertDocumentWithEnscriptCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithEnscriptCommandInput>
    }
    return ConvertDocumentWithEnscriptCommandInputModel!
  }

let ConvertDocumentWithJupyterCommandInputModel: z.ZodType<ConvertDocumentWithJupyterCommandInput>

export const ConvertDocumentWithJupyterCommandInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterCommandInput> => {
    if (!ConvertDocumentWithJupyterCommandInputModel) {
      ConvertDocumentWithJupyterCommandInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterCommandInput>
    }
    return ConvertDocumentWithJupyterCommandInputModel!
  }

let ConvertDocumentWithLibreOfficeCommandInputModel: z.ZodType<ConvertDocumentWithLibreOfficeCommandInput>

export const ConvertDocumentWithLibreOfficeCommandInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeCommandInput> => {
    if (!ConvertDocumentWithLibreOfficeCommandInputModel) {
      ConvertDocumentWithLibreOfficeCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
          directory: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeCommandInput>
    }
    return ConvertDocumentWithLibreOfficeCommandInputModel!
  }

let ConvertDocumentWithPandocCommandInputModel: z.ZodType<ConvertDocumentWithPandocCommandInput>

export const ConvertDocumentWithPandocCommandInputParser =
  (): z.ZodType<ConvertDocumentWithPandocCommandInput> => {
    if (!ConvertDocumentWithPandocCommandInputModel) {
      ConvertDocumentWithPandocCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocCommandInput>
    }
    return ConvertDocumentWithPandocCommandInputModel!
  }

let ConvertDozenModel: z.ZodType<ConvertDozen>

export const ConvertDozenParser = (): z.ZodType<ConvertDozen> => {
  if (!ConvertDozenModel) {
    ConvertDozenModel = z.object({
      input: z.object({
        format: z.literal('dozen'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitDozenParser()),
      }),
    }) as z.ZodType<ConvertDozen>
  }
  return ConvertDozenModel!
}

let ConvertEachModel: z.ZodType<ConvertEach>

export const ConvertEachParser = (): z.ZodType<ConvertEach> => {
  if (!ConvertEachModel) {
    ConvertEachModel = z.object({
      input: z.object({
        format: z.literal('each'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitEachParser()),
      }),
    }) as z.ZodType<ConvertEach>
  }
  return ConvertEachModel!
}

let ConvertFahrenheitModel: z.ZodType<ConvertFahrenheit>

export const ConvertFahrenheitParser =
  (): z.ZodType<ConvertFahrenheit> => {
    if (!ConvertFahrenheitModel) {
      ConvertFahrenheitModel = z.object({
        input: z.object({
          format: z.literal('fahrenheit'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitFahrenheitParser()),
        }),
      }) as z.ZodType<ConvertFahrenheit>
    }
    return ConvertFahrenheitModel!
  }

let ConvertFileBaseModel: z.ZodType<ConvertFileBase>

export const ConvertFileBaseParser = (): z.ZodType<ConvertFileBase> => {
  if (!ConvertFileBaseModel) {
    ConvertFileBaseModel = z.object({
      tool: z.optional(z.string()),
      remote: z.optional(z.boolean()),
      async: z.optional(z.boolean()).default(false),
      input: z.object({
        format: z.string(),
        file: z.union([
          z.lazy(() => FileContentParser()),
          z.lazy(() => FilePathParser()),
        ]),
      }),
      output: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<ConvertFileBase>
  }
  return ConvertFileBaseModel!
}

let ConvertFileBaseRemoteModel: z.ZodType<ConvertFileBaseRemote>

export const ConvertFileBaseRemoteParser =
  (): z.ZodType<ConvertFileBaseRemote> => {
    if (!ConvertFileBaseRemoteModel) {
      ConvertFileBaseRemoteModel = z.object({
        tool: z.optional(z.string()),
        remote: z.optional(z.boolean()),
        async: z.optional(z.boolean()).default(false),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileContentParser()),
            z.lazy(() => FilePathParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertFileBaseRemote>
    }
    return ConvertFileBaseRemoteModel!
  }

let ConvertFluidOunceModel: z.ZodType<ConvertFluidOunce>

export const ConvertFluidOunceParser =
  (): z.ZodType<ConvertFluidOunce> => {
    if (!ConvertFluidOunceModel) {
      ConvertFluidOunceModel = z.object({
        input: z.object({
          format: z.literal('fluid-ounce'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitFluidOunceParser()),
        }),
      }) as z.ZodType<ConvertFluidOunce>
    }
    return ConvertFluidOunceModel!
  }

let ConvertFluidOuncePerHourModel: z.ZodType<ConvertFluidOuncePerHour>

export const ConvertFluidOuncePerHourParser =
  (): z.ZodType<ConvertFluidOuncePerHour> => {
    if (!ConvertFluidOuncePerHourModel) {
      ConvertFluidOuncePerHourModel = z.object({
        input: z.object({
          format: z.literal('fluid-ounce-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitFluidOuncePerHourParser()),
        }),
      }) as z.ZodType<ConvertFluidOuncePerHour>
    }
    return ConvertFluidOuncePerHourModel!
  }

let ConvertFluidOuncePerMinuteModel: z.ZodType<ConvertFluidOuncePerMinute>

export const ConvertFluidOuncePerMinuteParser =
  (): z.ZodType<ConvertFluidOuncePerMinute> => {
    if (!ConvertFluidOuncePerMinuteModel) {
      ConvertFluidOuncePerMinuteModel = z.object({
        input: z.object({
          format: z.literal('fluid-ounce-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitFluidOuncePerMinuteParser(),
          ),
        }),
      }) as z.ZodType<ConvertFluidOuncePerMinute>
    }
    return ConvertFluidOuncePerMinuteModel!
  }

let ConvertFluidOuncePerSecondModel: z.ZodType<ConvertFluidOuncePerSecond>

export const ConvertFluidOuncePerSecondParser =
  (): z.ZodType<ConvertFluidOuncePerSecond> => {
    if (!ConvertFluidOuncePerSecondModel) {
      ConvertFluidOuncePerSecondModel = z.object({
        input: z.object({
          format: z.literal('fluid-ounce-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitFluidOuncePerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertFluidOuncePerSecond>
    }
    return ConvertFluidOuncePerSecondModel!
  }

let ConvertFontWithFontForgeCommandInputModel: z.ZodType<ConvertFontWithFontForgeCommandInput>

export const ConvertFontWithFontForgeCommandInputParser =
  (): z.ZodType<ConvertFontWithFontForgeCommandInput> => {
    if (!ConvertFontWithFontForgeCommandInputModel) {
      ConvertFontWithFontForgeCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertFontWithFontForgeCommandInput>
    }
    return ConvertFontWithFontForgeCommandInputModel!
  }

let ConvertFootModel: z.ZodType<ConvertFoot>

export const ConvertFootParser = (): z.ZodType<ConvertFoot> => {
  if (!ConvertFootModel) {
    ConvertFootModel = z.object({
      input: z.object({
        format: z.literal('foot'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitFootParser()),
      }),
    }) as z.ZodType<ConvertFoot>
  }
  return ConvertFootModel!
}

let ConvertFootCandleModel: z.ZodType<ConvertFootCandle>

export const ConvertFootCandleParser =
  (): z.ZodType<ConvertFootCandle> => {
    if (!ConvertFootCandleModel) {
      ConvertFootCandleModel = z.object({
        input: z.object({
          format: z.literal('foot-candle'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitFootCandleParser()),
        }),
      }) as z.ZodType<ConvertFootCandle>
    }
    return ConvertFootCandleModel!
  }

let ConvertFootPerSecondModel: z.ZodType<ConvertFootPerSecond>

export const ConvertFootPerSecondParser =
  (): z.ZodType<ConvertFootPerSecond> => {
    if (!ConvertFootPerSecondModel) {
      ConvertFootPerSecondModel = z.object({
        input: z.object({
          format: z.literal('foot-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitFootPerSecondParser()),
        }),
      }) as z.ZodType<ConvertFootPerSecond>
    }
    return ConvertFootPerSecondModel!
  }

let ConvertGallonModel: z.ZodType<ConvertGallon>

export const ConvertGallonParser = (): z.ZodType<ConvertGallon> => {
  if (!ConvertGallonModel) {
    ConvertGallonModel = z.object({
      input: z.object({
        format: z.literal('gallon'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitGallonParser()),
      }),
    }) as z.ZodType<ConvertGallon>
  }
  return ConvertGallonModel!
}

let ConvertGallonPerHourModel: z.ZodType<ConvertGallonPerHour>

export const ConvertGallonPerHourParser =
  (): z.ZodType<ConvertGallonPerHour> => {
    if (!ConvertGallonPerHourModel) {
      ConvertGallonPerHourModel = z.object({
        input: z.object({
          format: z.literal('gallon-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitGallonPerHourParser()),
        }),
      }) as z.ZodType<ConvertGallonPerHour>
    }
    return ConvertGallonPerHourModel!
  }

let ConvertGallonPerMinuteModel: z.ZodType<ConvertGallonPerMinute>

export const ConvertGallonPerMinuteParser =
  (): z.ZodType<ConvertGallonPerMinute> => {
    if (!ConvertGallonPerMinuteModel) {
      ConvertGallonPerMinuteModel = z.object({
        input: z.object({
          format: z.literal('gallon-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitGallonPerMinuteParser()),
        }),
      }) as z.ZodType<ConvertGallonPerMinute>
    }
    return ConvertGallonPerMinuteModel!
  }

let ConvertGallonPerSecondModel: z.ZodType<ConvertGallonPerSecond>

export const ConvertGallonPerSecondParser =
  (): z.ZodType<ConvertGallonPerSecond> => {
    if (!ConvertGallonPerSecondModel) {
      ConvertGallonPerSecondModel = z.object({
        input: z.object({
          format: z.literal('gallon-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitGallonPerSecondParser()),
        }),
      }) as z.ZodType<ConvertGallonPerSecond>
    }
    return ConvertGallonPerSecondModel!
  }

let ConvertGigabitModel: z.ZodType<ConvertGigabit>

export const ConvertGigabitParser = (): z.ZodType<ConvertGigabit> => {
  if (!ConvertGigabitModel) {
    ConvertGigabitModel = z.object({
      input: z.object({
        format: z.literal('gigabit'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitGigabitParser()),
      }),
    }) as z.ZodType<ConvertGigabit>
  }
  return ConvertGigabitModel!
}

let ConvertGigabyteModel: z.ZodType<ConvertGigabyte>

export const ConvertGigabyteParser = (): z.ZodType<ConvertGigabyte> => {
  if (!ConvertGigabyteModel) {
    ConvertGigabyteModel = z.object({
      input: z.object({
        format: z.literal('gigabyte'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitGigabyteParser()),
      }),
    }) as z.ZodType<ConvertGigabyte>
  }
  return ConvertGigabyteModel!
}

let ConvertGigahertzModel: z.ZodType<ConvertGigahertz>

export const ConvertGigahertzParser =
  (): z.ZodType<ConvertGigahertz> => {
    if (!ConvertGigahertzModel) {
      ConvertGigahertzModel = z.object({
        input: z.object({
          format: z.literal('gigahertz'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitGigahertzParser()),
        }),
      }) as z.ZodType<ConvertGigahertz>
    }
    return ConvertGigahertzModel!
  }

let ConvertGigavoltAmpereModel: z.ZodType<ConvertGigavoltAmpere>

export const ConvertGigavoltAmpereParser =
  (): z.ZodType<ConvertGigavoltAmpere> => {
    if (!ConvertGigavoltAmpereModel) {
      ConvertGigavoltAmpereModel = z.object({
        input: z.object({
          format: z.literal('gigavolt-ampere'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitGigavoltAmpereParser()),
        }),
      }) as z.ZodType<ConvertGigavoltAmpere>
    }
    return ConvertGigavoltAmpereModel!
  }

let ConvertGigavoltAmpereReactiveModel: z.ZodType<ConvertGigavoltAmpereReactive>

export const ConvertGigavoltAmpereReactiveParser =
  (): z.ZodType<ConvertGigavoltAmpereReactive> => {
    if (!ConvertGigavoltAmpereReactiveModel) {
      ConvertGigavoltAmpereReactiveModel = z.object({
        input: z.object({
          format: z.literal('gigavolt-ampere-reactive'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitGigavoltAmpereReactiveParser(),
          ),
        }),
      }) as z.ZodType<ConvertGigavoltAmpereReactive>
    }
    return ConvertGigavoltAmpereReactiveModel!
  }

let ConvertGigavoltAmpereReactiveHourModel: z.ZodType<ConvertGigavoltAmpereReactiveHour>

export const ConvertGigavoltAmpereReactiveHourParser =
  (): z.ZodType<ConvertGigavoltAmpereReactiveHour> => {
    if (!ConvertGigavoltAmpereReactiveHourModel) {
      ConvertGigavoltAmpereReactiveHourModel = z.object({
        input: z.object({
          format: z.literal('gigavolt-ampere-reactive-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitGigavoltAmpereReactiveHourParser(),
          ),
        }),
      }) as z.ZodType<ConvertGigavoltAmpereReactiveHour>
    }
    return ConvertGigavoltAmpereReactiveHourModel!
  }

let ConvertGigawattModel: z.ZodType<ConvertGigawatt>

export const ConvertGigawattParser = (): z.ZodType<ConvertGigawatt> => {
  if (!ConvertGigawattModel) {
    ConvertGigawattModel = z.object({
      input: z.object({
        format: z.literal('gigawatt'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitGigawattParser()),
      }),
    }) as z.ZodType<ConvertGigawatt>
  }
  return ConvertGigawattModel!
}

let ConvertGigawattHourModel: z.ZodType<ConvertGigawattHour>

export const ConvertGigawattHourParser =
  (): z.ZodType<ConvertGigawattHour> => {
    if (!ConvertGigawattHourModel) {
      ConvertGigawattHourModel = z.object({
        input: z.object({
          format: z.literal('gigawatt-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitGigawattHourParser()),
        }),
      }) as z.ZodType<ConvertGigawattHour>
    }
    return ConvertGigawattHourModel!
  }

let ConvertGlasModel: z.ZodType<ConvertGlas>

export const ConvertGlasParser = (): z.ZodType<ConvertGlas> => {
  if (!ConvertGlasModel) {
    ConvertGlasModel = z.object({
      input: z.object({
        format: z.literal('glas'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitGlasParser()),
      }),
    }) as z.ZodType<ConvertGlas>
  }
  return ConvertGlasModel!
}

let ConvertGradianModel: z.ZodType<ConvertGradian>

export const ConvertGradianParser = (): z.ZodType<ConvertGradian> => {
  if (!ConvertGradianModel) {
    ConvertGradianModel = z.object({
      input: z.object({
        format: z.literal('gradian'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitGradianParser()),
      }),
    }) as z.ZodType<ConvertGradian>
  }
  return ConvertGradianModel!
}

let ConvertGramModel: z.ZodType<ConvertGram>

export const ConvertGramParser = (): z.ZodType<ConvertGram> => {
  if (!ConvertGramModel) {
    ConvertGramModel = z.object({
      input: z.object({
        format: z.literal('gram'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitGramParser()),
      }),
    }) as z.ZodType<ConvertGram>
  }
  return ConvertGramModel!
}

let ConvertHectareModel: z.ZodType<ConvertHectare>

export const ConvertHectareParser = (): z.ZodType<ConvertHectare> => {
  if (!ConvertHectareModel) {
    ConvertHectareModel = z.object({
      input: z.object({
        format: z.literal('hectare'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitHectareParser()),
      }),
    }) as z.ZodType<ConvertHectare>
  }
  return ConvertHectareModel!
}

let ConvertHectopascalModel: z.ZodType<ConvertHectopascal>

export const ConvertHectopascalParser =
  (): z.ZodType<ConvertHectopascal> => {
    if (!ConvertHectopascalModel) {
      ConvertHectopascalModel = z.object({
        input: z.object({
          format: z.literal('hectopascal'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitHectopascalParser()),
        }),
      }) as z.ZodType<ConvertHectopascal>
    }
    return ConvertHectopascalModel!
  }

let ConvertHertzModel: z.ZodType<ConvertHertz>

export const ConvertHertzParser = (): z.ZodType<ConvertHertz> => {
  if (!ConvertHertzModel) {
    ConvertHertzModel = z.object({
      input: z.object({
        format: z.literal('hertz'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitHertzParser()),
      }),
    }) as z.ZodType<ConvertHertz>
  }
  return ConvertHertzModel!
}

let ConvertHourModel: z.ZodType<ConvertHour>

export const ConvertHourParser = (): z.ZodType<ConvertHour> => {
  if (!ConvertHourModel) {
    ConvertHourModel = z.object({
      input: z.object({
        format: z.literal('hour'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitHourParser()),
      }),
    }) as z.ZodType<ConvertHour>
  }
  return ConvertHourModel!
}

let ConvertHtmlWithPuppeteerCommandInputModel: z.ZodType<ConvertHtmlWithPuppeteerCommandInput>

export const ConvertHtmlWithPuppeteerCommandInputParser =
  (): z.ZodType<ConvertHtmlWithPuppeteerCommandInput> => {
    if (!ConvertHtmlWithPuppeteerCommandInputModel) {
      ConvertHtmlWithPuppeteerCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PuppeteerInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PuppeteerOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        viewport: z.object({
          width: z.optional(z.number().int().gte(0)),
          height: z.optional(z.number().int().gte(0)),
        }),
        proxy: z.optional(z.string()),
        waitUntil: z.optional(
          z.lazy(() => PuppeteerLifeCycleEventParser()),
        ),
      }) as z.ZodType<ConvertHtmlWithPuppeteerCommandInput>
    }
    return ConvertHtmlWithPuppeteerCommandInputModel!
  }

let ConvertImageWithImageMagickCommandInputModel: z.ZodType<ConvertImageWithImageMagickCommandInput>

export const ConvertImageWithImageMagickCommandInputParser =
  (): z.ZodType<ConvertImageWithImageMagickCommandInput> => {
    if (!ConvertImageWithImageMagickCommandInputModel) {
      ConvertImageWithImageMagickCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        colorCount: z.optional(z.number().int().gte(0)),
        colorMatrix: z.optional(
          z
            .lazy(() => ImageMagicColorMatrixParser())
            .refine(
              TEST(
                'colorMatrix',
                code.test_image_magic_color_matrix.test,
              ),
            ),
        ),
        colorSpace: z.optional(
          z.lazy(() => ImageMagickColorSpaceParser()),
        ),
        compare: z.optional(z.boolean()),
        compression: z.optional(
          z.lazy(() => ImageMagickCompressionParser()),
        ),
        density: z.optional(z.number().int().gte(0)),
        quality: z.optional(z.number().int().gte(0)),
      }) as z.ZodType<ConvertImageWithImageMagickCommandInput>
    }
    return ConvertImageWithImageMagickCommandInputModel!
  }

let ConvertImageWithInkscapeCommandInputModel: z.ZodType<ConvertImageWithInkscapeCommandInput>

export const ConvertImageWithInkscapeCommandInputParser =
  (): z.ZodType<ConvertImageWithInkscapeCommandInput> => {
    if (!ConvertImageWithInkscapeCommandInputModel) {
      ConvertImageWithInkscapeCommandInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertImageWithInkscapeCommandInput>
    }
    return ConvertImageWithInkscapeCommandInputModel!
  }

let ConvertInchModel: z.ZodType<ConvertInch>

export const ConvertInchParser = (): z.ZodType<ConvertInch> => {
  if (!ConvertInchModel) {
    ConvertInchModel = z.object({
      input: z.object({
        format: z.literal('inch'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitInchParser()),
      }),
    }) as z.ZodType<ConvertInch>
  }
  return ConvertInchModel!
}

let ConvertJouleModel: z.ZodType<ConvertJoule>

export const ConvertJouleParser = (): z.ZodType<ConvertJoule> => {
  if (!ConvertJouleModel) {
    ConvertJouleModel = z.object({
      input: z.object({
        format: z.literal('joule'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitJouleParser()),
      }),
    }) as z.ZodType<ConvertJoule>
  }
  return ConvertJouleModel!
}

let ConvertKaffekoppModel: z.ZodType<ConvertKaffekopp>

export const ConvertKaffekoppParser =
  (): z.ZodType<ConvertKaffekopp> => {
    if (!ConvertKaffekoppModel) {
      ConvertKaffekoppModel = z.object({
        input: z.object({
          format: z.literal('kaffekopp'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKaffekoppParser()),
        }),
      }) as z.ZodType<ConvertKaffekopp>
    }
    return ConvertKaffekoppModel!
  }

let ConvertKannaModel: z.ZodType<ConvertKanna>

export const ConvertKannaParser = (): z.ZodType<ConvertKanna> => {
  if (!ConvertKannaModel) {
    ConvertKannaModel = z.object({
      input: z.object({
        format: z.literal('kanna'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitKannaParser()),
      }),
    }) as z.ZodType<ConvertKanna>
  }
  return ConvertKannaModel!
}

let ConvertKelvinModel: z.ZodType<ConvertKelvin>

export const ConvertKelvinParser = (): z.ZodType<ConvertKelvin> => {
  if (!ConvertKelvinModel) {
    ConvertKelvinModel = z.object({
      input: z.object({
        format: z.literal('kelvin'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitKelvinParser()),
      }),
    }) as z.ZodType<ConvertKelvin>
  }
  return ConvertKelvinModel!
}

let ConvertKiloampereModel: z.ZodType<ConvertKiloampere>

export const ConvertKiloampereParser =
  (): z.ZodType<ConvertKiloampere> => {
    if (!ConvertKiloampereModel) {
      ConvertKiloampereModel = z.object({
        input: z.object({
          format: z.literal('kiloampere'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKiloampereParser()),
        }),
      }) as z.ZodType<ConvertKiloampere>
    }
    return ConvertKiloampereModel!
  }

let ConvertKilobitModel: z.ZodType<ConvertKilobit>

export const ConvertKilobitParser = (): z.ZodType<ConvertKilobit> => {
  if (!ConvertKilobitModel) {
    ConvertKilobitModel = z.object({
      input: z.object({
        format: z.literal('kilobit'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitKilobitParser()),
      }),
    }) as z.ZodType<ConvertKilobit>
  }
  return ConvertKilobitModel!
}

let ConvertKilobyteModel: z.ZodType<ConvertKilobyte>

export const ConvertKilobyteParser = (): z.ZodType<ConvertKilobyte> => {
  if (!ConvertKilobyteModel) {
    ConvertKilobyteModel = z.object({
      input: z.object({
        format: z.literal('kilobyte'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitKilobyteParser()),
      }),
    }) as z.ZodType<ConvertKilobyte>
  }
  return ConvertKilobyteModel!
}

let ConvertKilogramModel: z.ZodType<ConvertKilogram>

export const ConvertKilogramParser = (): z.ZodType<ConvertKilogram> => {
  if (!ConvertKilogramModel) {
    ConvertKilogramModel = z.object({
      input: z.object({
        format: z.literal('kilogram'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitKilogramParser()),
      }),
    }) as z.ZodType<ConvertKilogram>
  }
  return ConvertKilogramModel!
}

let ConvertKilohertzModel: z.ZodType<ConvertKilohertz>

export const ConvertKilohertzParser =
  (): z.ZodType<ConvertKilohertz> => {
    if (!ConvertKilohertzModel) {
      ConvertKilohertzModel = z.object({
        input: z.object({
          format: z.literal('kilohertz'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilohertzParser()),
        }),
      }) as z.ZodType<ConvertKilohertz>
    }
    return ConvertKilohertzModel!
  }

let ConvertKilojouleModel: z.ZodType<ConvertKilojoule>

export const ConvertKilojouleParser =
  (): z.ZodType<ConvertKilojoule> => {
    if (!ConvertKilojouleModel) {
      ConvertKilojouleModel = z.object({
        input: z.object({
          format: z.literal('kilojoule'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilojouleParser()),
        }),
      }) as z.ZodType<ConvertKilojoule>
    }
    return ConvertKilojouleModel!
  }

let ConvertKilolitreModel: z.ZodType<ConvertKilolitre>

export const ConvertKilolitreParser =
  (): z.ZodType<ConvertKilolitre> => {
    if (!ConvertKilolitreModel) {
      ConvertKilolitreModel = z.object({
        input: z.object({
          format: z.literal('kilolitre'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilolitreParser()),
        }),
      }) as z.ZodType<ConvertKilolitre>
    }
    return ConvertKilolitreModel!
  }

let ConvertKilolitrePerHourModel: z.ZodType<ConvertKilolitrePerHour>

export const ConvertKilolitrePerHourParser =
  (): z.ZodType<ConvertKilolitrePerHour> => {
    if (!ConvertKilolitrePerHourModel) {
      ConvertKilolitrePerHourModel = z.object({
        input: z.object({
          format: z.literal('kilolitre-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilolitrePerHourParser()),
        }),
      }) as z.ZodType<ConvertKilolitrePerHour>
    }
    return ConvertKilolitrePerHourModel!
  }

let ConvertKilolitrePerMinuteModel: z.ZodType<ConvertKilolitrePerMinute>

export const ConvertKilolitrePerMinuteParser =
  (): z.ZodType<ConvertKilolitrePerMinute> => {
    if (!ConvertKilolitrePerMinuteModel) {
      ConvertKilolitrePerMinuteModel = z.object({
        input: z.object({
          format: z.literal('kilolitre-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitKilolitrePerMinuteParser(),
          ),
        }),
      }) as z.ZodType<ConvertKilolitrePerMinute>
    }
    return ConvertKilolitrePerMinuteModel!
  }

let ConvertKilolitrePerSecondModel: z.ZodType<ConvertKilolitrePerSecond>

export const ConvertKilolitrePerSecondParser =
  (): z.ZodType<ConvertKilolitrePerSecond> => {
    if (!ConvertKilolitrePerSecondModel) {
      ConvertKilolitrePerSecondModel = z.object({
        input: z.object({
          format: z.literal('kilolitre-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitKilolitrePerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertKilolitrePerSecond>
    }
    return ConvertKilolitrePerSecondModel!
  }

let ConvertKilometerModel: z.ZodType<ConvertKilometer>

export const ConvertKilometerParser =
  (): z.ZodType<ConvertKilometer> => {
    if (!ConvertKilometerModel) {
      ConvertKilometerModel = z.object({
        input: z.object({
          format: z.literal('kilometer'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilometerParser()),
        }),
      }) as z.ZodType<ConvertKilometer>
    }
    return ConvertKilometerModel!
  }

let ConvertKilometrePerHourModel: z.ZodType<ConvertKilometrePerHour>

export const ConvertKilometrePerHourParser =
  (): z.ZodType<ConvertKilometrePerHour> => {
    if (!ConvertKilometrePerHourModel) {
      ConvertKilometrePerHourModel = z.object({
        input: z.object({
          format: z.literal('kilometre-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilometrePerHourParser()),
        }),
      }) as z.ZodType<ConvertKilometrePerHour>
    }
    return ConvertKilometrePerHourModel!
  }

let ConvertKilopascalModel: z.ZodType<ConvertKilopascal>

export const ConvertKilopascalParser =
  (): z.ZodType<ConvertKilopascal> => {
    if (!ConvertKilopascalModel) {
      ConvertKilopascalModel = z.object({
        input: z.object({
          format: z.literal('kilopascal'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilopascalParser()),
        }),
      }) as z.ZodType<ConvertKilopascal>
    }
    return ConvertKilopascalModel!
  }

let ConvertKilopoundPerSquareInchModel: z.ZodType<ConvertKilopoundPerSquareInch>

export const ConvertKilopoundPerSquareInchParser =
  (): z.ZodType<ConvertKilopoundPerSquareInch> => {
    if (!ConvertKilopoundPerSquareInchModel) {
      ConvertKilopoundPerSquareInchModel = z.object({
        input: z.object({
          format: z.literal('kilopound-per-square-inch'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitKilopoundPerSquareInchParser(),
          ),
        }),
      }) as z.ZodType<ConvertKilopoundPerSquareInch>
    }
    return ConvertKilopoundPerSquareInchModel!
  }

let ConvertKilovoltModel: z.ZodType<ConvertKilovolt>

export const ConvertKilovoltParser = (): z.ZodType<ConvertKilovolt> => {
  if (!ConvertKilovoltModel) {
    ConvertKilovoltModel = z.object({
      input: z.object({
        format: z.literal('kilovolt'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitKilovoltParser()),
      }),
    }) as z.ZodType<ConvertKilovolt>
  }
  return ConvertKilovoltModel!
}

let ConvertKilovoltAmpereModel: z.ZodType<ConvertKilovoltAmpere>

export const ConvertKilovoltAmpereParser =
  (): z.ZodType<ConvertKilovoltAmpere> => {
    if (!ConvertKilovoltAmpereModel) {
      ConvertKilovoltAmpereModel = z.object({
        input: z.object({
          format: z.literal('kilovolt-ampere'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilovoltAmpereParser()),
        }),
      }) as z.ZodType<ConvertKilovoltAmpere>
    }
    return ConvertKilovoltAmpereModel!
  }

let ConvertKilovoltAmpereReactiveModel: z.ZodType<ConvertKilovoltAmpereReactive>

export const ConvertKilovoltAmpereReactiveParser =
  (): z.ZodType<ConvertKilovoltAmpereReactive> => {
    if (!ConvertKilovoltAmpereReactiveModel) {
      ConvertKilovoltAmpereReactiveModel = z.object({
        input: z.object({
          format: z.literal('kilovolt-ampere-reactive'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitKilovoltAmpereReactiveParser(),
          ),
        }),
      }) as z.ZodType<ConvertKilovoltAmpereReactive>
    }
    return ConvertKilovoltAmpereReactiveModel!
  }

let ConvertKilovoltAmpereReactiveHourModel: z.ZodType<ConvertKilovoltAmpereReactiveHour>

export const ConvertKilovoltAmpereReactiveHourParser =
  (): z.ZodType<ConvertKilovoltAmpereReactiveHour> => {
    if (!ConvertKilovoltAmpereReactiveHourModel) {
      ConvertKilovoltAmpereReactiveHourModel = z.object({
        input: z.object({
          format: z.literal('kilovolt-ampere-reactive-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitKilovoltAmpereReactiveHourParser(),
          ),
        }),
      }) as z.ZodType<ConvertKilovoltAmpereReactiveHour>
    }
    return ConvertKilovoltAmpereReactiveHourModel!
  }

let ConvertKilowattModel: z.ZodType<ConvertKilowatt>

export const ConvertKilowattParser = (): z.ZodType<ConvertKilowatt> => {
  if (!ConvertKilowattModel) {
    ConvertKilowattModel = z.object({
      input: z.object({
        format: z.literal('kilowatt'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitKilowattParser()),
      }),
    }) as z.ZodType<ConvertKilowatt>
  }
  return ConvertKilowattModel!
}

let ConvertKilowattHourModel: z.ZodType<ConvertKilowattHour>

export const ConvertKilowattHourParser =
  (): z.ZodType<ConvertKilowattHour> => {
    if (!ConvertKilowattHourModel) {
      ConvertKilowattHourModel = z.object({
        input: z.object({
          format: z.literal('kilowatt-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitKilowattHourParser()),
        }),
      }) as z.ZodType<ConvertKilowattHour>
    }
    return ConvertKilowattHourModel!
  }

let ConvertKnotModel: z.ZodType<ConvertKnot>

export const ConvertKnotParser = (): z.ZodType<ConvertKnot> => {
  if (!ConvertKnotModel) {
    ConvertKnotModel = z.object({
      input: z.object({
        format: z.literal('knot'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitKnotParser()),
      }),
    }) as z.ZodType<ConvertKnot>
  }
  return ConvertKnotModel!
}

let ConvertLatexToPngCommandInputModel: z.ZodType<ConvertLatexToPngCommandInput>

export const ConvertLatexToPngCommandInputParser =
  (): z.ZodType<ConvertLatexToPngCommandInput> => {
    if (!ConvertLatexToPngCommandInputModel) {
      ConvertLatexToPngCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexToPngCommandInput>
    }
    return ConvertLatexToPngCommandInputModel!
  }

let ConvertLatexToPngInputFormatModel: z.ZodType<ConvertLatexToPngInputFormat>

export const ConvertLatexToPngInputFormatParser = () => {
  if (!ConvertLatexToPngInputFormatModel) {
    ConvertLatexToPngInputFormatModel = z.enum(
      LOAD('convert_latex_to_png_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConvertLatexToPngInputFormat>
  }
  return ConvertLatexToPngInputFormatModel!
}

let ConvertLatexToPngOutputFormatModel: z.ZodType<ConvertLatexToPngOutputFormat>

export const ConvertLatexToPngOutputFormatParser = () => {
  if (!ConvertLatexToPngOutputFormatModel) {
    ConvertLatexToPngOutputFormatModel = z.enum(
      LOAD('convert_latex_to_png_output_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConvertLatexToPngOutputFormat>
  }
  return ConvertLatexToPngOutputFormatModel!
}

let ConvertLatexWithPdfLatexCommandInputModel: z.ZodType<ConvertLatexWithPdfLatexCommandInput>

export const ConvertLatexWithPdfLatexCommandInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexCommandInput> => {
    if (!ConvertLatexWithPdfLatexCommandInputModel) {
      ConvertLatexWithPdfLatexCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
          directory: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertLatexWithPdfLatexCommandInput>
    }
    return ConvertLatexWithPdfLatexCommandInputModel!
  }

let ConvertLitreModel: z.ZodType<ConvertLitre>

export const ConvertLitreParser = (): z.ZodType<ConvertLitre> => {
  if (!ConvertLitreModel) {
    ConvertLitreModel = z.object({
      input: z.object({
        format: z.literal('litre'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitLitreParser()),
      }),
    }) as z.ZodType<ConvertLitre>
  }
  return ConvertLitreModel!
}

let ConvertLitrePerHourModel: z.ZodType<ConvertLitrePerHour>

export const ConvertLitrePerHourParser =
  (): z.ZodType<ConvertLitrePerHour> => {
    if (!ConvertLitrePerHourModel) {
      ConvertLitrePerHourModel = z.object({
        input: z.object({
          format: z.literal('litre-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitLitrePerHourParser()),
        }),
      }) as z.ZodType<ConvertLitrePerHour>
    }
    return ConvertLitrePerHourModel!
  }

let ConvertLitrePerMinuteModel: z.ZodType<ConvertLitrePerMinute>

export const ConvertLitrePerMinuteParser =
  (): z.ZodType<ConvertLitrePerMinute> => {
    if (!ConvertLitrePerMinuteModel) {
      ConvertLitrePerMinuteModel = z.object({
        input: z.object({
          format: z.literal('litre-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitLitrePerMinuteParser()),
        }),
      }) as z.ZodType<ConvertLitrePerMinute>
    }
    return ConvertLitrePerMinuteModel!
  }

let ConvertLitrePerSecondModel: z.ZodType<ConvertLitrePerSecond>

export const ConvertLitrePerSecondParser =
  (): z.ZodType<ConvertLitrePerSecond> => {
    if (!ConvertLitrePerSecondModel) {
      ConvertLitrePerSecondModel = z.object({
        input: z.object({
          format: z.literal('litre-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitLitrePerSecondParser()),
        }),
      }) as z.ZodType<ConvertLitrePerSecond>
    }
    return ConvertLitrePerSecondModel!
  }

let ConvertLuxModel: z.ZodType<ConvertLux>

export const ConvertLuxParser = (): z.ZodType<ConvertLux> => {
  if (!ConvertLuxModel) {
    ConvertLuxModel = z.object({
      input: z.object({
        format: z.literal('lux'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitLuxParser()),
      }),
    }) as z.ZodType<ConvertLux>
  }
  return ConvertLuxModel!
}

let ConvertMatskedModel: z.ZodType<ConvertMatsked>

export const ConvertMatskedParser = (): z.ZodType<ConvertMatsked> => {
  if (!ConvertMatskedModel) {
    ConvertMatskedModel = z.object({
      input: z.object({
        format: z.literal('matsked'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitMatskedParser()),
      }),
    }) as z.ZodType<ConvertMatsked>
  }
  return ConvertMatskedModel!
}

let ConvertMegabitModel: z.ZodType<ConvertMegabit>

export const ConvertMegabitParser = (): z.ZodType<ConvertMegabit> => {
  if (!ConvertMegabitModel) {
    ConvertMegabitModel = z.object({
      input: z.object({
        format: z.literal('megabit'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitMegabitParser()),
      }),
    }) as z.ZodType<ConvertMegabit>
  }
  return ConvertMegabitModel!
}

let ConvertMegabyteModel: z.ZodType<ConvertMegabyte>

export const ConvertMegabyteParser = (): z.ZodType<ConvertMegabyte> => {
  if (!ConvertMegabyteModel) {
    ConvertMegabyteModel = z.object({
      input: z.object({
        format: z.literal('megabyte'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitMegabyteParser()),
      }),
    }) as z.ZodType<ConvertMegabyte>
  }
  return ConvertMegabyteModel!
}

let ConvertMegahertzModel: z.ZodType<ConvertMegahertz>

export const ConvertMegahertzParser =
  (): z.ZodType<ConvertMegahertz> => {
    if (!ConvertMegahertzModel) {
      ConvertMegahertzModel = z.object({
        input: z.object({
          format: z.literal('megahertz'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMegahertzParser()),
        }),
      }) as z.ZodType<ConvertMegahertz>
    }
    return ConvertMegahertzModel!
  }

let ConvertMegapascalModel: z.ZodType<ConvertMegapascal>

export const ConvertMegapascalParser =
  (): z.ZodType<ConvertMegapascal> => {
    if (!ConvertMegapascalModel) {
      ConvertMegapascalModel = z.object({
        input: z.object({
          format: z.literal('megapascal'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMegapascalParser()),
        }),
      }) as z.ZodType<ConvertMegapascal>
    }
    return ConvertMegapascalModel!
  }

let ConvertMegavoltAmpereModel: z.ZodType<ConvertMegavoltAmpere>

export const ConvertMegavoltAmpereParser =
  (): z.ZodType<ConvertMegavoltAmpere> => {
    if (!ConvertMegavoltAmpereModel) {
      ConvertMegavoltAmpereModel = z.object({
        input: z.object({
          format: z.literal('megavolt-ampere'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMegavoltAmpereParser()),
        }),
      }) as z.ZodType<ConvertMegavoltAmpere>
    }
    return ConvertMegavoltAmpereModel!
  }

let ConvertMegavoltAmpereReactiveModel: z.ZodType<ConvertMegavoltAmpereReactive>

export const ConvertMegavoltAmpereReactiveParser =
  (): z.ZodType<ConvertMegavoltAmpereReactive> => {
    if (!ConvertMegavoltAmpereReactiveModel) {
      ConvertMegavoltAmpereReactiveModel = z.object({
        input: z.object({
          format: z.literal('megavolt-ampere-reactive'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitMegavoltAmpereReactiveParser(),
          ),
        }),
      }) as z.ZodType<ConvertMegavoltAmpereReactive>
    }
    return ConvertMegavoltAmpereReactiveModel!
  }

let ConvertMegavoltAmpereReactiveHourModel: z.ZodType<ConvertMegavoltAmpereReactiveHour>

export const ConvertMegavoltAmpereReactiveHourParser =
  (): z.ZodType<ConvertMegavoltAmpereReactiveHour> => {
    if (!ConvertMegavoltAmpereReactiveHourModel) {
      ConvertMegavoltAmpereReactiveHourModel = z.object({
        input: z.object({
          format: z.literal('megavolt-ampere-reactive-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitMegavoltAmpereReactiveHourParser(),
          ),
        }),
      }) as z.ZodType<ConvertMegavoltAmpereReactiveHour>
    }
    return ConvertMegavoltAmpereReactiveHourModel!
  }

let ConvertMegawattModel: z.ZodType<ConvertMegawatt>

export const ConvertMegawattParser = (): z.ZodType<ConvertMegawatt> => {
  if (!ConvertMegawattModel) {
    ConvertMegawattModel = z.object({
      input: z.object({
        format: z.literal('megawatt'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitMegawattParser()),
      }),
    }) as z.ZodType<ConvertMegawatt>
  }
  return ConvertMegawattModel!
}

let ConvertMegawattHourModel: z.ZodType<ConvertMegawattHour>

export const ConvertMegawattHourParser =
  (): z.ZodType<ConvertMegawattHour> => {
    if (!ConvertMegawattHourModel) {
      ConvertMegawattHourModel = z.object({
        input: z.object({
          format: z.literal('megawatt-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMegawattHourParser()),
        }),
      }) as z.ZodType<ConvertMegawattHour>
    }
    return ConvertMegawattHourModel!
  }

let ConvertMeterModel: z.ZodType<ConvertMeter>

export const ConvertMeterParser = (): z.ZodType<ConvertMeter> => {
  if (!ConvertMeterModel) {
    ConvertMeterModel = z.object({
      input: z.object({
        format: z.literal('meter'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitMeterParser()),
      }),
    }) as z.ZodType<ConvertMeter>
  }
  return ConvertMeterModel!
}

let ConvertMetrePerSecondModel: z.ZodType<ConvertMetrePerSecond>

export const ConvertMetrePerSecondParser =
  (): z.ZodType<ConvertMetrePerSecond> => {
    if (!ConvertMetrePerSecondModel) {
      ConvertMetrePerSecondModel = z.object({
        input: z.object({
          format: z.literal('metre-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMetrePerSecondParser()),
        }),
      }) as z.ZodType<ConvertMetrePerSecond>
    }
    return ConvertMetrePerSecondModel!
  }

let ConvertMetricTonneModel: z.ZodType<ConvertMetricTonne>

export const ConvertMetricTonneParser =
  (): z.ZodType<ConvertMetricTonne> => {
    if (!ConvertMetricTonneModel) {
      ConvertMetricTonneModel = z.object({
        input: z.object({
          format: z.literal('metric-tonne'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMetricTonneParser()),
        }),
      }) as z.ZodType<ConvertMetricTonne>
    }
    return ConvertMetricTonneModel!
  }

let ConvertMicrogramModel: z.ZodType<ConvertMicrogram>

export const ConvertMicrogramParser =
  (): z.ZodType<ConvertMicrogram> => {
    if (!ConvertMicrogramModel) {
      ConvertMicrogramModel = z.object({
        input: z.object({
          format: z.literal('microgram'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMicrogramParser()),
        }),
      }) as z.ZodType<ConvertMicrogram>
    }
    return ConvertMicrogramModel!
  }

let ConvertMicrosecondModel: z.ZodType<ConvertMicrosecond>

export const ConvertMicrosecondParser =
  (): z.ZodType<ConvertMicrosecond> => {
    if (!ConvertMicrosecondModel) {
      ConvertMicrosecondModel = z.object({
        input: z.object({
          format: z.literal('microsecond'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMicrosecondParser()),
        }),
      }) as z.ZodType<ConvertMicrosecond>
    }
    return ConvertMicrosecondModel!
  }

let ConvertMileModel: z.ZodType<ConvertMile>

export const ConvertMileParser = (): z.ZodType<ConvertMile> => {
  if (!ConvertMileModel) {
    ConvertMileModel = z.object({
      input: z.object({
        format: z.literal('mile'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitMileParser()),
      }),
    }) as z.ZodType<ConvertMile>
  }
  return ConvertMileModel!
}

let ConvertMilePerHourModel: z.ZodType<ConvertMilePerHour>

export const ConvertMilePerHourParser =
  (): z.ZodType<ConvertMilePerHour> => {
    if (!ConvertMilePerHourModel) {
      ConvertMilePerHourModel = z.object({
        input: z.object({
          format: z.literal('mile-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMilePerHourParser()),
        }),
      }) as z.ZodType<ConvertMilePerHour>
    }
    return ConvertMilePerHourModel!
  }

let ConvertMilliampereModel: z.ZodType<ConvertMilliampere>

export const ConvertMilliampereParser =
  (): z.ZodType<ConvertMilliampere> => {
    if (!ConvertMilliampereModel) {
      ConvertMilliampereModel = z.object({
        input: z.object({
          format: z.literal('milliampere'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMilliampereParser()),
        }),
      }) as z.ZodType<ConvertMilliampere>
    }
    return ConvertMilliampereModel!
  }

let ConvertMilligramModel: z.ZodType<ConvertMilligram>

export const ConvertMilligramParser =
  (): z.ZodType<ConvertMilligram> => {
    if (!ConvertMilligramModel) {
      ConvertMilligramModel = z.object({
        input: z.object({
          format: z.literal('milligram'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMilligramParser()),
        }),
      }) as z.ZodType<ConvertMilligram>
    }
    return ConvertMilligramModel!
  }

let ConvertMillihertzModel: z.ZodType<ConvertMillihertz>

export const ConvertMillihertzParser =
  (): z.ZodType<ConvertMillihertz> => {
    if (!ConvertMillihertzModel) {
      ConvertMillihertzModel = z.object({
        input: z.object({
          format: z.literal('millihertz'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMillihertzParser()),
        }),
      }) as z.ZodType<ConvertMillihertz>
    }
    return ConvertMillihertzModel!
  }

let ConvertMillilitreModel: z.ZodType<ConvertMillilitre>

export const ConvertMillilitreParser =
  (): z.ZodType<ConvertMillilitre> => {
    if (!ConvertMillilitreModel) {
      ConvertMillilitreModel = z.object({
        input: z.object({
          format: z.literal('millilitre'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMillilitreParser()),
        }),
      }) as z.ZodType<ConvertMillilitre>
    }
    return ConvertMillilitreModel!
  }

let ConvertMillilitrePerSecondModel: z.ZodType<ConvertMillilitrePerSecond>

export const ConvertMillilitrePerSecondParser =
  (): z.ZodType<ConvertMillilitrePerSecond> => {
    if (!ConvertMillilitrePerSecondModel) {
      ConvertMillilitrePerSecondModel = z.object({
        input: z.object({
          format: z.literal('millilitre-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitMillilitrePerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertMillilitrePerSecond>
    }
    return ConvertMillilitrePerSecondModel!
  }

let ConvertMillimeterModel: z.ZodType<ConvertMillimeter>

export const ConvertMillimeterParser =
  (): z.ZodType<ConvertMillimeter> => {
    if (!ConvertMillimeterModel) {
      ConvertMillimeterModel = z.object({
        input: z.object({
          format: z.literal('millimeter'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMillimeterParser()),
        }),
      }) as z.ZodType<ConvertMillimeter>
    }
    return ConvertMillimeterModel!
  }

let ConvertMillisecondModel: z.ZodType<ConvertMillisecond>

export const ConvertMillisecondParser =
  (): z.ZodType<ConvertMillisecond> => {
    if (!ConvertMillisecondModel) {
      ConvertMillisecondModel = z.object({
        input: z.object({
          format: z.literal('millisecond'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMillisecondParser()),
        }),
      }) as z.ZodType<ConvertMillisecond>
    }
    return ConvertMillisecondModel!
  }

let ConvertMillivoltModel: z.ZodType<ConvertMillivolt>

export const ConvertMillivoltParser =
  (): z.ZodType<ConvertMillivolt> => {
    if (!ConvertMillivoltModel) {
      ConvertMillivoltModel = z.object({
        input: z.object({
          format: z.literal('millivolt'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMillivoltParser()),
        }),
      }) as z.ZodType<ConvertMillivolt>
    }
    return ConvertMillivoltModel!
  }

let ConvertMillivoltAmpereModel: z.ZodType<ConvertMillivoltAmpere>

export const ConvertMillivoltAmpereParser =
  (): z.ZodType<ConvertMillivoltAmpere> => {
    if (!ConvertMillivoltAmpereModel) {
      ConvertMillivoltAmpereModel = z.object({
        input: z.object({
          format: z.literal('millivolt-ampere'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMillivoltAmpereParser()),
        }),
      }) as z.ZodType<ConvertMillivoltAmpere>
    }
    return ConvertMillivoltAmpereModel!
  }

let ConvertMillivoltAmpereReactiveModel: z.ZodType<ConvertMillivoltAmpereReactive>

export const ConvertMillivoltAmpereReactiveParser =
  (): z.ZodType<ConvertMillivoltAmpereReactive> => {
    if (!ConvertMillivoltAmpereReactiveModel) {
      ConvertMillivoltAmpereReactiveModel = z.object({
        input: z.object({
          format: z.literal('millivolt-ampere-reactive'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitMillivoltAmpereReactiveParser(),
          ),
        }),
      }) as z.ZodType<ConvertMillivoltAmpereReactive>
    }
    return ConvertMillivoltAmpereReactiveModel!
  }

let ConvertMillivoltAmpereReactiveHourModel: z.ZodType<ConvertMillivoltAmpereReactiveHour>

export const ConvertMillivoltAmpereReactiveHourParser =
  (): z.ZodType<ConvertMillivoltAmpereReactiveHour> => {
    if (!ConvertMillivoltAmpereReactiveHourModel) {
      ConvertMillivoltAmpereReactiveHourModel = z.object({
        input: z.object({
          format: z.literal('millivolt-ampere-reactive-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitMillivoltAmpereReactiveHourParser(),
          ),
        }),
      }) as z.ZodType<ConvertMillivoltAmpereReactiveHour>
    }
    return ConvertMillivoltAmpereReactiveHourModel!
  }

let ConvertMilliwattModel: z.ZodType<ConvertMilliwatt>

export const ConvertMilliwattParser =
  (): z.ZodType<ConvertMilliwatt> => {
    if (!ConvertMilliwattModel) {
      ConvertMilliwattModel = z.object({
        input: z.object({
          format: z.literal('milliwatt'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMilliwattParser()),
        }),
      }) as z.ZodType<ConvertMilliwatt>
    }
    return ConvertMilliwattModel!
  }

let ConvertMilliwattHourModel: z.ZodType<ConvertMilliwattHour>

export const ConvertMilliwattHourParser =
  (): z.ZodType<ConvertMilliwattHour> => {
    if (!ConvertMilliwattHourModel) {
      ConvertMilliwattHourModel = z.object({
        input: z.object({
          format: z.literal('milliwatt-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMilliwattHourParser()),
        }),
      }) as z.ZodType<ConvertMilliwattHour>
    }
    return ConvertMilliwattHourModel!
  }

let ConvertMinuteModel: z.ZodType<ConvertMinute>

export const ConvertMinuteParser = (): z.ZodType<ConvertMinute> => {
  if (!ConvertMinuteModel) {
    ConvertMinuteModel = z.object({
      input: z.object({
        format: z.literal('minute'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitMinuteParser()),
      }),
    }) as z.ZodType<ConvertMinute>
  }
  return ConvertMinuteModel!
}

let ConvertMinutePerKilometreModel: z.ZodType<ConvertMinutePerKilometre>

export const ConvertMinutePerKilometreParser =
  (): z.ZodType<ConvertMinutePerKilometre> => {
    if (!ConvertMinutePerKilometreModel) {
      ConvertMinutePerKilometreModel = z.object({
        input: z.object({
          format: z.literal('minute-per-kilometre'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitMinutePerKilometreParser(),
          ),
        }),
      }) as z.ZodType<ConvertMinutePerKilometre>
    }
    return ConvertMinutePerKilometreModel!
  }

let ConvertMinutePerMileModel: z.ZodType<ConvertMinutePerMile>

export const ConvertMinutePerMileParser =
  (): z.ZodType<ConvertMinutePerMile> => {
    if (!ConvertMinutePerMileModel) {
      ConvertMinutePerMileModel = z.object({
        input: z.object({
          format: z.literal('minute-per-mile'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitMinutePerMileParser()),
        }),
      }) as z.ZodType<ConvertMinutePerMile>
    }
    return ConvertMinutePerMileModel!
  }

let ConvertMonthModel: z.ZodType<ConvertMonth>

export const ConvertMonthParser = (): z.ZodType<ConvertMonth> => {
  if (!ConvertMonthModel) {
    ConvertMonthModel = z.object({
      input: z.object({
        format: z.literal('month'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitMonthParser()),
      }),
    }) as z.ZodType<ConvertMonth>
  }
  return ConvertMonthModel!
}

let ConvertMp4ToGifWithFfmpegModel: z.ZodType<ConvertMp4ToGifWithFfmpeg>

export const ConvertMp4ToGifWithFfmpegParser =
  (): z.ZodType<ConvertMp4ToGifWithFfmpeg> => {
    if (!ConvertMp4ToGifWithFfmpegModel) {
      ConvertMp4ToGifWithFfmpegModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        fps: z.number().int(),
        width: z.number().int(),
        startTime: z.union([
          z
            .number()
            .int()
            .refine(TEST('startTime', code.test_time_integer.test)),
          z
            .string()
            .refine(TEST('startTime', code.test_time_string.test)),
        ]),
        endTime: z.union([
          z
            .number()
            .int()
            .refine(TEST('endTime', code.test_time_integer.test)),
          z
            .string()
            .refine(TEST('endTime', code.test_time_string.test)),
        ]),
        duration: z.union([
          z
            .number()
            .int()
            .refine(TEST('duration', code.test_time_integer.test)),
          z
            .string()
            .refine(TEST('duration', code.test_time_string.test)),
        ]),
      }) as z.ZodType<ConvertMp4ToGifWithFfmpeg>
    }
    return ConvertMp4ToGifWithFfmpegModel!
  }

let ConvertNanosecondModel: z.ZodType<ConvertNanosecond>

export const ConvertNanosecondParser =
  (): z.ZodType<ConvertNanosecond> => {
    if (!ConvertNanosecondModel) {
      ConvertNanosecondModel = z.object({
        input: z.object({
          format: z.literal('nanosecond'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitNanosecondParser()),
        }),
      }) as z.ZodType<ConvertNanosecond>
    }
    return ConvertNanosecondModel!
  }

let ConvertOunceModel: z.ZodType<ConvertOunce>

export const ConvertOunceParser = (): z.ZodType<ConvertOunce> => {
  if (!ConvertOunceModel) {
    ConvertOunceModel = z.object({
      input: z.object({
        format: z.literal('ounce'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitOunceParser()),
      }),
    }) as z.ZodType<ConvertOunce>
  }
  return ConvertOunceModel!
}

let ConvertPartPerBillionModel: z.ZodType<ConvertPartPerBillion>

export const ConvertPartPerBillionParser =
  (): z.ZodType<ConvertPartPerBillion> => {
    if (!ConvertPartPerBillionModel) {
      ConvertPartPerBillionModel = z.object({
        input: z.object({
          format: z.literal('part-per-billion'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitPartPerBillionParser()),
        }),
      }) as z.ZodType<ConvertPartPerBillion>
    }
    return ConvertPartPerBillionModel!
  }

let ConvertPartPerMillionModel: z.ZodType<ConvertPartPerMillion>

export const ConvertPartPerMillionParser =
  (): z.ZodType<ConvertPartPerMillion> => {
    if (!ConvertPartPerMillionModel) {
      ConvertPartPerMillionModel = z.object({
        input: z.object({
          format: z.literal('part-per-million'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitPartPerMillionParser()),
        }),
      }) as z.ZodType<ConvertPartPerMillion>
    }
    return ConvertPartPerMillionModel!
  }

let ConvertPartPerQuadrillionModel: z.ZodType<ConvertPartPerQuadrillion>

export const ConvertPartPerQuadrillionParser =
  (): z.ZodType<ConvertPartPerQuadrillion> => {
    if (!ConvertPartPerQuadrillionModel) {
      ConvertPartPerQuadrillionModel = z.object({
        input: z.object({
          format: z.literal('part-per-quadrillion'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitPartPerQuadrillionParser(),
          ),
        }),
      }) as z.ZodType<ConvertPartPerQuadrillion>
    }
    return ConvertPartPerQuadrillionModel!
  }

let ConvertPartPerTrillionModel: z.ZodType<ConvertPartPerTrillion>

export const ConvertPartPerTrillionParser =
  (): z.ZodType<ConvertPartPerTrillion> => {
    if (!ConvertPartPerTrillionModel) {
      ConvertPartPerTrillionModel = z.object({
        input: z.object({
          format: z.literal('part-per-trillion'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitPartPerTrillionParser()),
        }),
      }) as z.ZodType<ConvertPartPerTrillion>
    }
    return ConvertPartPerTrillionModel!
  }

let ConvertPascalModel: z.ZodType<ConvertPascal>

export const ConvertPascalParser = (): z.ZodType<ConvertPascal> => {
  if (!ConvertPascalModel) {
    ConvertPascalModel = z.object({
      input: z.object({
        format: z.literal('pascal'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitPascalParser()),
      }),
    }) as z.ZodType<ConvertPascal>
  }
  return ConvertPascalModel!
}

let ConvertPintModel: z.ZodType<ConvertPint>

export const ConvertPintParser = (): z.ZodType<ConvertPint> => {
  if (!ConvertPintModel) {
    ConvertPintModel = z.object({
      input: z.object({
        format: z.literal('pint'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitPintParser()),
      }),
    }) as z.ZodType<ConvertPint>
  }
  return ConvertPintModel!
}

let ConvertPintPerHourModel: z.ZodType<ConvertPintPerHour>

export const ConvertPintPerHourParser =
  (): z.ZodType<ConvertPintPerHour> => {
    if (!ConvertPintPerHourModel) {
      ConvertPintPerHourModel = z.object({
        input: z.object({
          format: z.literal('pint-per-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitPintPerHourParser()),
        }),
      }) as z.ZodType<ConvertPintPerHour>
    }
    return ConvertPintPerHourModel!
  }

let ConvertPintPerMinuteModel: z.ZodType<ConvertPintPerMinute>

export const ConvertPintPerMinuteParser =
  (): z.ZodType<ConvertPintPerMinute> => {
    if (!ConvertPintPerMinuteModel) {
      ConvertPintPerMinuteModel = z.object({
        input: z.object({
          format: z.literal('pint-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitPintPerMinuteParser()),
        }),
      }) as z.ZodType<ConvertPintPerMinute>
    }
    return ConvertPintPerMinuteModel!
  }

let ConvertPintPerSecondModel: z.ZodType<ConvertPintPerSecond>

export const ConvertPintPerSecondParser =
  (): z.ZodType<ConvertPintPerSecond> => {
    if (!ConvertPintPerSecondModel) {
      ConvertPintPerSecondModel = z.object({
        input: z.object({
          format: z.literal('pint-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitPintPerSecondParser()),
        }),
      }) as z.ZodType<ConvertPintPerSecond>
    }
    return ConvertPintPerSecondModel!
  }

let ConvertPoundModel: z.ZodType<ConvertPound>

export const ConvertPoundParser = (): z.ZodType<ConvertPound> => {
  if (!ConvertPoundModel) {
    ConvertPoundModel = z.object({
      input: z.object({
        format: z.literal('pound'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitPoundParser()),
      }),
    }) as z.ZodType<ConvertPound>
  }
  return ConvertPoundModel!
}

let ConvertPoundPerSquareInchModel: z.ZodType<ConvertPoundPerSquareInch>

export const ConvertPoundPerSquareInchParser =
  (): z.ZodType<ConvertPoundPerSquareInch> => {
    if (!ConvertPoundPerSquareInchModel) {
      ConvertPoundPerSquareInchModel = z.object({
        input: z.object({
          format: z.literal('pound-per-square-inch'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitPoundPerSquareInchParser(),
          ),
        }),
      }) as z.ZodType<ConvertPoundPerSquareInch>
    }
    return ConvertPoundPerSquareInchModel!
  }

let ConvertQuartModel: z.ZodType<ConvertQuart>

export const ConvertQuartParser = (): z.ZodType<ConvertQuart> => {
  if (!ConvertQuartModel) {
    ConvertQuartModel = z.object({
      input: z.object({
        format: z.literal('quart'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitQuartParser()),
      }),
    }) as z.ZodType<ConvertQuart>
  }
  return ConvertQuartModel!
}

let ConvertQuartPerSecondModel: z.ZodType<ConvertQuartPerSecond>

export const ConvertQuartPerSecondParser =
  (): z.ZodType<ConvertQuartPerSecond> => {
    if (!ConvertQuartPerSecondModel) {
      ConvertQuartPerSecondModel = z.object({
        input: z.object({
          format: z.literal('quart-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitQuartPerSecondParser()),
        }),
      }) as z.ZodType<ConvertQuartPerSecond>
    }
    return ConvertQuartPerSecondModel!
  }

let ConvertRadianModel: z.ZodType<ConvertRadian>

export const ConvertRadianParser = (): z.ZodType<ConvertRadian> => {
  if (!ConvertRadianModel) {
    ConvertRadianModel = z.object({
      input: z.object({
        format: z.literal('radian'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitRadianParser()),
      }),
    }) as z.ZodType<ConvertRadian>
  }
  return ConvertRadianModel!
}

let ConvertRadianPerSecondModel: z.ZodType<ConvertRadianPerSecond>

export const ConvertRadianPerSecondParser =
  (): z.ZodType<ConvertRadianPerSecond> => {
    if (!ConvertRadianPerSecondModel) {
      ConvertRadianPerSecondModel = z.object({
        input: z.object({
          format: z.literal('radian-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitRadianPerSecondParser()),
        }),
      }) as z.ZodType<ConvertRadianPerSecond>
    }
    return ConvertRadianPerSecondModel!
  }

let ConvertRankineModel: z.ZodType<ConvertRankine>

export const ConvertRankineParser = (): z.ZodType<ConvertRankine> => {
  if (!ConvertRankineModel) {
    ConvertRankineModel = z.object({
      input: z.object({
        format: z.literal('rankine'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitRankineParser()),
      }),
    }) as z.ZodType<ConvertRankine>
  }
  return ConvertRankineModel!
}

let ConvertRotationPerMinuteModel: z.ZodType<ConvertRotationPerMinute>

export const ConvertRotationPerMinuteParser =
  (): z.ZodType<ConvertRotationPerMinute> => {
    if (!ConvertRotationPerMinuteModel) {
      ConvertRotationPerMinuteModel = z.object({
        input: z.object({
          format: z.literal('rotation-per-minute'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitRotationPerMinuteParser()),
        }),
      }) as z.ZodType<ConvertRotationPerMinute>
    }
    return ConvertRotationPerMinuteModel!
  }

let ConvertSecondModel: z.ZodType<ConvertSecond>

export const ConvertSecondParser = (): z.ZodType<ConvertSecond> => {
  if (!ConvertSecondModel) {
    ConvertSecondModel = z.object({
      input: z.object({
        format: z.literal('second'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitSecondParser()),
      }),
    }) as z.ZodType<ConvertSecond>
  }
  return ConvertSecondModel!
}

let ConvertSecondPerFootModel: z.ZodType<ConvertSecondPerFoot>

export const ConvertSecondPerFootParser =
  (): z.ZodType<ConvertSecondPerFoot> => {
    if (!ConvertSecondPerFootModel) {
      ConvertSecondPerFootModel = z.object({
        input: z.object({
          format: z.literal('second-per-foot'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSecondPerFootParser()),
        }),
      }) as z.ZodType<ConvertSecondPerFoot>
    }
    return ConvertSecondPerFootModel!
  }

let ConvertSecondPerMetreModel: z.ZodType<ConvertSecondPerMetre>

export const ConvertSecondPerMetreParser =
  (): z.ZodType<ConvertSecondPerMetre> => {
    if (!ConvertSecondPerMetreModel) {
      ConvertSecondPerMetreModel = z.object({
        input: z.object({
          format: z.literal('second-per-metre'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSecondPerMetreParser()),
        }),
      }) as z.ZodType<ConvertSecondPerMetre>
    }
    return ConvertSecondPerMetreModel!
  }

let ConvertSquareCentimeterModel: z.ZodType<ConvertSquareCentimeter>

export const ConvertSquareCentimeterParser =
  (): z.ZodType<ConvertSquareCentimeter> => {
    if (!ConvertSquareCentimeterModel) {
      ConvertSquareCentimeterModel = z.object({
        input: z.object({
          format: z.literal('square-centimeter'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSquareCentimeterParser()),
        }),
      }) as z.ZodType<ConvertSquareCentimeter>
    }
    return ConvertSquareCentimeterModel!
  }

let ConvertSquareFootModel: z.ZodType<ConvertSquareFoot>

export const ConvertSquareFootParser =
  (): z.ZodType<ConvertSquareFoot> => {
    if (!ConvertSquareFootModel) {
      ConvertSquareFootModel = z.object({
        input: z.object({
          format: z.literal('square-foot'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSquareFootParser()),
        }),
      }) as z.ZodType<ConvertSquareFoot>
    }
    return ConvertSquareFootModel!
  }

let ConvertSquareInchModel: z.ZodType<ConvertSquareInch>

export const ConvertSquareInchParser =
  (): z.ZodType<ConvertSquareInch> => {
    if (!ConvertSquareInchModel) {
      ConvertSquareInchModel = z.object({
        input: z.object({
          format: z.literal('square-inch'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSquareInchParser()),
        }),
      }) as z.ZodType<ConvertSquareInch>
    }
    return ConvertSquareInchModel!
  }

let ConvertSquareKilometerModel: z.ZodType<ConvertSquareKilometer>

export const ConvertSquareKilometerParser =
  (): z.ZodType<ConvertSquareKilometer> => {
    if (!ConvertSquareKilometerModel) {
      ConvertSquareKilometerModel = z.object({
        input: z.object({
          format: z.literal('square-kilometer'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSquareKilometerParser()),
        }),
      }) as z.ZodType<ConvertSquareKilometer>
    }
    return ConvertSquareKilometerModel!
  }

let ConvertSquareMeterModel: z.ZodType<ConvertSquareMeter>

export const ConvertSquareMeterParser =
  (): z.ZodType<ConvertSquareMeter> => {
    if (!ConvertSquareMeterModel) {
      ConvertSquareMeterModel = z.object({
        input: z.object({
          format: z.literal('square-meter'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSquareMeterParser()),
        }),
      }) as z.ZodType<ConvertSquareMeter>
    }
    return ConvertSquareMeterModel!
  }

let ConvertSquareMileModel: z.ZodType<ConvertSquareMile>

export const ConvertSquareMileParser =
  (): z.ZodType<ConvertSquareMile> => {
    if (!ConvertSquareMileModel) {
      ConvertSquareMileModel = z.object({
        input: z.object({
          format: z.literal('square-mile'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSquareMileParser()),
        }),
      }) as z.ZodType<ConvertSquareMile>
    }
    return ConvertSquareMileModel!
  }

let ConvertSquareMillimeterModel: z.ZodType<ConvertSquareMillimeter>

export const ConvertSquareMillimeterParser =
  (): z.ZodType<ConvertSquareMillimeter> => {
    if (!ConvertSquareMillimeterModel) {
      ConvertSquareMillimeterModel = z.object({
        input: z.object({
          format: z.literal('square-millimeter'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSquareMillimeterParser()),
        }),
      }) as z.ZodType<ConvertSquareMillimeter>
    }
    return ConvertSquareMillimeterModel!
  }

let ConvertSquareYardModel: z.ZodType<ConvertSquareYard>

export const ConvertSquareYardParser =
  (): z.ZodType<ConvertSquareYard> => {
    if (!ConvertSquareYardModel) {
      ConvertSquareYardModel = z.object({
        input: z.object({
          format: z.literal('square-yard'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitSquareYardParser()),
        }),
      }) as z.ZodType<ConvertSquareYard>
    }
    return ConvertSquareYardModel!
  }

let ConvertTablespoonModel: z.ZodType<ConvertTablespoon>

export const ConvertTablespoonParser =
  (): z.ZodType<ConvertTablespoon> => {
    if (!ConvertTablespoonModel) {
      ConvertTablespoonModel = z.object({
        input: z.object({
          format: z.literal('tablespoon'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitTablespoonParser()),
        }),
      }) as z.ZodType<ConvertTablespoon>
    }
    return ConvertTablespoonModel!
  }

let ConvertTablespoonPerSecondModel: z.ZodType<ConvertTablespoonPerSecond>

export const ConvertTablespoonPerSecondParser =
  (): z.ZodType<ConvertTablespoonPerSecond> => {
    if (!ConvertTablespoonPerSecondModel) {
      ConvertTablespoonPerSecondModel = z.object({
        input: z.object({
          format: z.literal('tablespoon-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitTablespoonPerSecondParser(),
          ),
        }),
      }) as z.ZodType<ConvertTablespoonPerSecond>
    }
    return ConvertTablespoonPerSecondModel!
  }

let ConvertTeaspoonModel: z.ZodType<ConvertTeaspoon>

export const ConvertTeaspoonParser = (): z.ZodType<ConvertTeaspoon> => {
  if (!ConvertTeaspoonModel) {
    ConvertTeaspoonModel = z.object({
      input: z.object({
        format: z.literal('teaspoon'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitTeaspoonParser()),
      }),
    }) as z.ZodType<ConvertTeaspoon>
  }
  return ConvertTeaspoonModel!
}

let ConvertTeaspoonPerSecondModel: z.ZodType<ConvertTeaspoonPerSecond>

export const ConvertTeaspoonPerSecondParser =
  (): z.ZodType<ConvertTeaspoonPerSecond> => {
    if (!ConvertTeaspoonPerSecondModel) {
      ConvertTeaspoonPerSecondModel = z.object({
        input: z.object({
          format: z.literal('teaspoon-per-second'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitTeaspoonPerSecondParser()),
        }),
      }) as z.ZodType<ConvertTeaspoonPerSecond>
    }
    return ConvertTeaspoonPerSecondModel!
  }

let ConvertTerabitModel: z.ZodType<ConvertTerabit>

export const ConvertTerabitParser = (): z.ZodType<ConvertTerabit> => {
  if (!ConvertTerabitModel) {
    ConvertTerabitModel = z.object({
      input: z.object({
        format: z.literal('terabit'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitTerabitParser()),
      }),
    }) as z.ZodType<ConvertTerabit>
  }
  return ConvertTerabitModel!
}

let ConvertTerabyteModel: z.ZodType<ConvertTerabyte>

export const ConvertTerabyteParser = (): z.ZodType<ConvertTerabyte> => {
  if (!ConvertTerabyteModel) {
    ConvertTerabyteModel = z.object({
      input: z.object({
        format: z.literal('terabyte'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitTerabyteParser()),
      }),
    }) as z.ZodType<ConvertTerabyte>
  }
  return ConvertTerabyteModel!
}

let ConvertTerahertzModel: z.ZodType<ConvertTerahertz>

export const ConvertTerahertzParser =
  (): z.ZodType<ConvertTerahertz> => {
    if (!ConvertTerahertzModel) {
      ConvertTerahertzModel = z.object({
        input: z.object({
          format: z.literal('terahertz'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitTerahertzParser()),
        }),
      }) as z.ZodType<ConvertTerahertz>
    }
    return ConvertTerahertzModel!
  }

let ConvertTeskedModel: z.ZodType<ConvertTesked>

export const ConvertTeskedParser = (): z.ZodType<ConvertTesked> => {
  if (!ConvertTeskedModel) {
    ConvertTeskedModel = z.object({
      input: z.object({
        format: z.literal('tesked'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitTeskedParser()),
      }),
    }) as z.ZodType<ConvertTesked>
  }
  return ConvertTeskedModel!
}

let ConvertTimeZoneModel: z.ZodType<ConvertTimeZone>

export const ConvertTimeZoneParser = (): z.ZodType<ConvertTimeZone> => {
  if (!ConvertTimeZoneModel) {
    ConvertTimeZoneModel = z.object({
      input: z.object({
        date: z.string(),
      }),
      output: z.object({
        timezone: z.lazy(() => TimeZoneParser()),
        format: z.string(),
      }),
    }) as z.ZodType<ConvertTimeZone>
  }
  return ConvertTimeZoneModel!
}

let ConvertTonModel: z.ZodType<ConvertTon>

export const ConvertTonParser = (): z.ZodType<ConvertTon> => {
  if (!ConvertTonModel) {
    ConvertTonModel = z.object({
      input: z.object({
        format: z.literal('ton'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitTonParser()),
      }),
    }) as z.ZodType<ConvertTon>
  }
  return ConvertTonModel!
}

let ConvertTorrModel: z.ZodType<ConvertTorr>

export const ConvertTorrParser = (): z.ZodType<ConvertTorr> => {
  if (!ConvertTorrModel) {
    ConvertTorrModel = z.object({
      input: z.object({
        format: z.literal('torr'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitTorrParser()),
      }),
    }) as z.ZodType<ConvertTorr>
  }
  return ConvertTorrModel!
}

let ConvertUnitModel: z.ZodType<ConvertUnit>

export const ConvertUnitParser = (): z.ZodType<ConvertUnit> => {
  if (!ConvertUnitModel) {
    ConvertUnitModel = z.object({
      input: z.object({
        format: z.lazy(() => UnitParser()),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => UnitParser()),
      }),
    }) as z.ZodType<ConvertUnit>
  }
  return ConvertUnitModel!
}

let ConvertUsSurveyFootModel: z.ZodType<ConvertUsSurveyFoot>

export const ConvertUsSurveyFootParser =
  (): z.ZodType<ConvertUsSurveyFoot> => {
    if (!ConvertUsSurveyFootModel) {
      ConvertUsSurveyFootModel = z.object({
        input: z.object({
          format: z.literal('us-survey-foot'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitUsSurveyFootParser()),
        }),
      }) as z.ZodType<ConvertUsSurveyFoot>
    }
    return ConvertUsSurveyFootModel!
  }

let ConvertVideoToAudioWithFfmpegModel: z.ZodType<ConvertVideoToAudioWithFfmpeg>

export const ConvertVideoToAudioWithFfmpegParser =
  (): z.ZodType<ConvertVideoToAudioWithFfmpeg> => {
    if (!ConvertVideoToAudioWithFfmpegModel) {
      ConvertVideoToAudioWithFfmpegModel = z.object({
        inputPath: z.string(),
        outputPath: z.string(),
      }) as z.ZodType<ConvertVideoToAudioWithFfmpeg>
    }
    return ConvertVideoToAudioWithFfmpegModel!
  }

let ConvertVideoWithFfmpegBaseModel: z.ZodType<ConvertVideoWithFfmpegBase>

export const ConvertVideoWithFfmpegBaseParser =
  (): z.ZodType<ConvertVideoWithFfmpegBase> => {
    if (!ConvertVideoWithFfmpegBaseModel) {
      ConvertVideoWithFfmpegBaseModel = z.object({
        audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser())),
        videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser())),
        audioBitRate: z.optional(z.number().int()),
        videoBitRate: z.optional(z.number().int()),
        frameRate: z.optional(z.number().int()),
        startTime: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('startTime', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('startTime', code.test_time_string.test)),
          ]),
        ),
        endTime: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('endTime', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('endTime', code.test_time_string.test)),
          ]),
        ),
        strict: z
          .optional(z.lazy(() => FfmpegStrictOptionParser()))
          .default('strict'),
        overwrite: z.optional(z.boolean()).default(false),
        progress: z.optional(z.boolean()).default(false),
        scaleWidth: z.optional(z.number().int()),
        scaleHeight: z.optional(z.number().int()),
        audioChannels: z.optional(z.number().int()),
        audioSamplingFrequency: z.optional(z.number().int()),
        subtitleCodec: z.optional(
          z.lazy(() => FfmpegCodecSubtitleParser()),
        ),
        duration: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('duration', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('duration', code.test_time_string.test)),
          ]),
        ),
        rotation: z.optional(z.number()),
      }) as z.ZodType<ConvertVideoWithFfmpegBase>
    }
    return ConvertVideoWithFfmpegBaseModel!
  }

let ConvertVideoWithFfmpegCommandInputModel: z.ZodType<ConvertVideoWithFfmpegCommandInput>

export const ConvertVideoWithFfmpegCommandInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegCommandInput> => {
    if (!ConvertVideoWithFfmpegCommandInputModel) {
      ConvertVideoWithFfmpegCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser())),
        videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser())),
        audioBitRate: z.optional(z.number().int()),
        videoBitRate: z.optional(z.number().int()),
        frameRate: z.optional(z.number().int()),
        startTime: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('startTime', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('startTime', code.test_time_string.test)),
          ]),
        ),
        endTime: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('endTime', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('endTime', code.test_time_string.test)),
          ]),
        ),
        strict: z
          .optional(z.lazy(() => FfmpegStrictOptionParser()))
          .default('strict'),
        overwrite: z.optional(z.boolean()).default(false),
        progress: z.optional(z.boolean()).default(false),
        scaleWidth: z.optional(z.number().int()),
        scaleHeight: z.optional(z.number().int()),
        audioChannels: z.optional(z.number().int()),
        audioSamplingFrequency: z.optional(z.number().int()),
        subtitleCodec: z.optional(
          z.lazy(() => FfmpegCodecSubtitleParser()),
        ),
        duration: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('duration', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('duration', code.test_time_string.test)),
          ]),
        ),
        rotation: z.optional(z.number()),
      }) as z.ZodType<ConvertVideoWithFfmpegCommandInput>
    }
    return ConvertVideoWithFfmpegCommandInputModel!
  }

let ConvertVoltModel: z.ZodType<ConvertVolt>

export const ConvertVoltParser = (): z.ZodType<ConvertVolt> => {
  if (!ConvertVoltModel) {
    ConvertVoltModel = z.object({
      input: z.object({
        format: z.literal('volt'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitVoltParser()),
      }),
    }) as z.ZodType<ConvertVolt>
  }
  return ConvertVoltModel!
}

let ConvertVoltAmpereModel: z.ZodType<ConvertVoltAmpere>

export const ConvertVoltAmpereParser =
  (): z.ZodType<ConvertVoltAmpere> => {
    if (!ConvertVoltAmpereModel) {
      ConvertVoltAmpereModel = z.object({
        input: z.object({
          format: z.literal('volt-ampere'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() => ConversionUnitVoltAmpereParser()),
        }),
      }) as z.ZodType<ConvertVoltAmpere>
    }
    return ConvertVoltAmpereModel!
  }

let ConvertVoltAmpereReactiveModel: z.ZodType<ConvertVoltAmpereReactive>

export const ConvertVoltAmpereReactiveParser =
  (): z.ZodType<ConvertVoltAmpereReactive> => {
    if (!ConvertVoltAmpereReactiveModel) {
      ConvertVoltAmpereReactiveModel = z.object({
        input: z.object({
          format: z.literal('volt-ampere-reactive'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitVoltAmpereReactiveParser(),
          ),
        }),
      }) as z.ZodType<ConvertVoltAmpereReactive>
    }
    return ConvertVoltAmpereReactiveModel!
  }

let ConvertVoltAmpereReactiveHourModel: z.ZodType<ConvertVoltAmpereReactiveHour>

export const ConvertVoltAmpereReactiveHourParser =
  (): z.ZodType<ConvertVoltAmpereReactiveHour> => {
    if (!ConvertVoltAmpereReactiveHourModel) {
      ConvertVoltAmpereReactiveHourModel = z.object({
        input: z.object({
          format: z.literal('volt-ampere-reactive-hour'),
          value: z.number(),
        }),
        output: z.object({
          format: z.lazy(() =>
            ConversionUnitVoltAmpereReactiveHourParser(),
          ),
        }),
      }) as z.ZodType<ConvertVoltAmpereReactiveHour>
    }
    return ConvertVoltAmpereReactiveHourModel!
  }

let ConvertWattModel: z.ZodType<ConvertWatt>

export const ConvertWattParser = (): z.ZodType<ConvertWatt> => {
  if (!ConvertWattModel) {
    ConvertWattModel = z.object({
      input: z.object({
        format: z.literal('watt'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitWattParser()),
      }),
    }) as z.ZodType<ConvertWatt>
  }
  return ConvertWattModel!
}

let ConvertWattHourModel: z.ZodType<ConvertWattHour>

export const ConvertWattHourParser = (): z.ZodType<ConvertWattHour> => {
  if (!ConvertWattHourModel) {
    ConvertWattHourModel = z.object({
      input: z.object({
        format: z.literal('watt-hour'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitWattHourParser()),
      }),
    }) as z.ZodType<ConvertWattHour>
  }
  return ConvertWattHourModel!
}

let ConvertWeekModel: z.ZodType<ConvertWeek>

export const ConvertWeekParser = (): z.ZodType<ConvertWeek> => {
  if (!ConvertWeekModel) {
    ConvertWeekModel = z.object({
      input: z.object({
        format: z.literal('week'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitWeekParser()),
      }),
    }) as z.ZodType<ConvertWeek>
  }
  return ConvertWeekModel!
}

let ConvertYardModel: z.ZodType<ConvertYard>

export const ConvertYardParser = (): z.ZodType<ConvertYard> => {
  if (!ConvertYardModel) {
    ConvertYardModel = z.object({
      input: z.object({
        format: z.literal('yard'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitYardParser()),
      }),
    }) as z.ZodType<ConvertYard>
  }
  return ConvertYardModel!
}

let ConvertYearModel: z.ZodType<ConvertYear>

export const ConvertYearParser = (): z.ZodType<ConvertYear> => {
  if (!ConvertYearModel) {
    ConvertYearModel = z.object({
      input: z.object({
        format: z.literal('year'),
        value: z.number(),
      }),
      output: z.object({
        format: z.lazy(() => ConversionUnitYearParser()),
      }),
    }) as z.ZodType<ConvertYear>
  }
  return ConvertYearModel!
}

let CppInputFormatModel: z.ZodType<CppInputFormat>

export const CppInputFormatParser = () => {
  if (!CppInputFormatModel) {
    CppInputFormatModel = z.enum(
      LOAD('cpp_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<CppInputFormat>
  }
  return CppInputFormatModel!
}

let CropPdfWithPdfCropModel: z.ZodType<CropPdfWithPdfCrop>

export const CropPdfWithPdfCropParser =
  (): z.ZodType<CropPdfWithPdfCrop> => {
    if (!CropPdfWithPdfCropModel) {
      CropPdfWithPdfCropModel = z.object({
        margin: z.optional(z.number().int().gte(0)),
        input: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<CropPdfWithPdfCrop>
    }
    return CropPdfWithPdfCropModel!
  }

let DisassembleBinaryWithObjdumpModel: z.ZodType<DisassembleBinaryWithObjdump>

export const DisassembleBinaryWithObjdumpParser =
  (): z.ZodType<DisassembleBinaryWithObjdump> => {
    if (!DisassembleBinaryWithObjdumpModel) {
      DisassembleBinaryWithObjdumpModel = z.object({
        show: z.array(z.lazy(() => ObjdumpShowOptionParser())),
        demangleStyle: z.lazy(() => ObjdumpDemangleStyleParser()),
        disassembleAll: z.boolean(),
        hide: z.lazy(() => ObjdumpHideOptionParser()),
        color: z.boolean(),
      }) as z.ZodType<DisassembleBinaryWithObjdump>
    }
    return DisassembleBinaryWithObjdumpModel!
  }

let EnscriptInputFormatModel: z.ZodType<EnscriptInputFormat>

export const EnscriptInputFormatParser = () => {
  if (!EnscriptInputFormatModel) {
    EnscriptInputFormatModel = z.enum(
      LOAD('enscript_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<EnscriptInputFormat>
  }
  return EnscriptInputFormatModel!
}

let EnscriptOutputFormatModel: z.ZodType<EnscriptOutputFormat>

export const EnscriptOutputFormatParser = () => {
  if (!EnscriptOutputFormatModel) {
    EnscriptOutputFormatModel = z.enum(
      LOAD('enscript_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<EnscriptOutputFormat>
  }
  return EnscriptOutputFormatModel!
}

let ExiftoolFamilyDataModel: z.ZodType<ExiftoolFamilyData>

export const ExiftoolFamilyDataParser =
  (): z.ZodType<ExiftoolFamilyData> => {
    if (!ExiftoolFamilyDataModel) {
      ExiftoolFamilyDataModel = z.object({
        head: z.string(),
        family: z.array(z.number().int().gte(0)),
      }) as z.ZodType<ExiftoolFamilyData>
    }
    return ExiftoolFamilyDataModel!
  }

let ExiftoolImageFormatDataModel: z.ZodType<ExiftoolImageFormatData>

export const ExiftoolImageFormatDataParser =
  (): z.ZodType<ExiftoolImageFormatData> => {
    if (!ExiftoolImageFormatDataModel) {
      ExiftoolImageFormatDataModel = z.object({
        head: z.string(),
        read: z.optional(z.boolean()).default(false),
        write: z.optional(z.boolean()).default(false),
        create: z.optional(z.boolean()).default(false),
      }) as z.ZodType<ExiftoolImageFormatData>
    }
    return ExiftoolImageFormatDataModel!
  }

let ExiftoolTagDataModel: z.ZodType<ExiftoolTagData>

export const ExiftoolTagDataParser = (): z.ZodType<ExiftoolTagData> => {
  if (!ExiftoolTagDataModel) {
    ExiftoolTagDataModel = z.object({
      head: z.string(),
    }) as z.ZodType<ExiftoolTagData>
  }
  return ExiftoolTagDataModel!
}

let ExtractWith7ZModel: z.ZodType<ExtractWith7Z>

export const ExtractWith7ZParser = (): z.ZodType<ExtractWith7Z> => {
  if (!ExtractWith7ZModel) {
    ExtractWith7ZModel = z.object({
      input: z.object({
        format: z.string(),
        path: z.string(),
      }),
      output: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<ExtractWith7Z>
  }
  return ExtractWith7ZModel!
}

let ExtractWithUnarchiverModel: z.ZodType<ExtractWithUnarchiver>

export const ExtractWithUnarchiverParser =
  (): z.ZodType<ExtractWithUnarchiver> => {
    if (!ExtractWithUnarchiverModel) {
      ExtractWithUnarchiverModel = z.object({
        input: z.object({
          password: z.optional(z.string()),
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          overwrite: z.optional(z.boolean()).default(false),
          directory: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<ExtractWithUnarchiver>
    }
    return ExtractWithUnarchiverModel!
  }

let FfmpegCodecAudioModel: z.ZodType<FfmpegCodecAudio>

export const FfmpegCodecAudioParser = () => {
  if (!FfmpegCodecAudioModel) {
    FfmpegCodecAudioModel = z.enum(
      LOAD('ffmpeg_codec_audio') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegCodecAudio>
  }
  return FfmpegCodecAudioModel!
}

let FfmpegCodecDataModel: z.ZodType<FfmpegCodecData>

export const FfmpegCodecDataParser = (): z.ZodType<FfmpegCodecData> => {
  if (!FfmpegCodecDataModel) {
    FfmpegCodecDataModel = z.object({
      label: z.string(),
      type: z.optional(z.string()),
      supportsDecoding: z.boolean(),
      supportsEncoding: z.boolean(),
      intraFrameOnly: z.boolean(),
      lossy: z.boolean(),
      lossless: z.boolean(),
    }) as z.ZodType<FfmpegCodecData>
  }
  return FfmpegCodecDataModel!
}

let FfmpegCodecSubtitleModel: z.ZodType<FfmpegCodecSubtitle>

export const FfmpegCodecSubtitleParser = () => {
  if (!FfmpegCodecSubtitleModel) {
    FfmpegCodecSubtitleModel = z.enum(
      LOAD('ffmpeg_codec_subtitle') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegCodecSubtitle>
  }
  return FfmpegCodecSubtitleModel!
}

let FfmpegCodecVideoModel: z.ZodType<FfmpegCodecVideo>

export const FfmpegCodecVideoParser = () => {
  if (!FfmpegCodecVideoModel) {
    FfmpegCodecVideoModel = z.enum(
      LOAD('ffmpeg_codec_video') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegCodecVideo>
  }
  return FfmpegCodecVideoModel!
}

let FfmpegDecoderAudioModel: z.ZodType<FfmpegDecoderAudio>

export const FfmpegDecoderAudioParser = () => {
  if (!FfmpegDecoderAudioModel) {
    FfmpegDecoderAudioModel = z.enum(
      LOAD('ffmpeg_decoder_audio') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegDecoderAudio>
  }
  return FfmpegDecoderAudioModel!
}

let FfmpegDecoderDataModel: z.ZodType<FfmpegDecoderData>

export const FfmpegDecoderDataParser =
  (): z.ZodType<FfmpegDecoderData> => {
    if (!FfmpegDecoderDataModel) {
      FfmpegDecoderDataModel = z.object({
        label: z.string(),
        type: z.string(),
        frameLevelMultithreading: z.boolean(),
        sliceLevelMultithreading: z.boolean(),
        experimental: z.boolean(),
        supportsDrawHorizontalBand: z.boolean(),
        supportsDirectRenderingMethod1: z.boolean(),
      }) as z.ZodType<FfmpegDecoderData>
    }
    return FfmpegDecoderDataModel!
  }

let FfmpegDecoderSubtitleModel: z.ZodType<FfmpegDecoderSubtitle>

export const FfmpegDecoderSubtitleParser = () => {
  if (!FfmpegDecoderSubtitleModel) {
    FfmpegDecoderSubtitleModel = z.enum(
      LOAD('ffmpeg_decoder_subtitle') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegDecoderSubtitle>
  }
  return FfmpegDecoderSubtitleModel!
}

let FfmpegDecoderVideoModel: z.ZodType<FfmpegDecoderVideo>

export const FfmpegDecoderVideoParser = () => {
  if (!FfmpegDecoderVideoModel) {
    FfmpegDecoderVideoModel = z.enum(
      LOAD('ffmpeg_decoder_video') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegDecoderVideo>
  }
  return FfmpegDecoderVideoModel!
}

let FfmpegEncoderAudioModel: z.ZodType<FfmpegEncoderAudio>

export const FfmpegEncoderAudioParser = () => {
  if (!FfmpegEncoderAudioModel) {
    FfmpegEncoderAudioModel = z.enum(
      LOAD('ffmpeg_encoder_audio') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegEncoderAudio>
  }
  return FfmpegEncoderAudioModel!
}

let FfmpegEncoderDataModel: z.ZodType<FfmpegEncoderData>

export const FfmpegEncoderDataParser =
  (): z.ZodType<FfmpegEncoderData> => {
    if (!FfmpegEncoderDataModel) {
      FfmpegEncoderDataModel = z.object({
        label: z.string(),
        type: z.string(),
        frameLevelMultithreading: z.boolean(),
        sliceLevelMultithreading: z.boolean(),
        experimental: z.boolean(),
        supportsDrawHorizontalBand: z.boolean(),
        supportsDirectRenderingMethod1: z.boolean(),
      }) as z.ZodType<FfmpegEncoderData>
    }
    return FfmpegEncoderDataModel!
  }

let FfmpegEncoderSubtitleModel: z.ZodType<FfmpegEncoderSubtitle>

export const FfmpegEncoderSubtitleParser = () => {
  if (!FfmpegEncoderSubtitleModel) {
    FfmpegEncoderSubtitleModel = z.enum(
      LOAD('ffmpeg_encoder_subtitle') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegEncoderSubtitle>
  }
  return FfmpegEncoderSubtitleModel!
}

let FfmpegEncoderVideoModel: z.ZodType<FfmpegEncoderVideo>

export const FfmpegEncoderVideoParser = () => {
  if (!FfmpegEncoderVideoModel) {
    FfmpegEncoderVideoModel = z.enum(
      LOAD('ffmpeg_encoder_video') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegEncoderVideo>
  }
  return FfmpegEncoderVideoModel!
}

let FfmpegFormatModel: z.ZodType<FfmpegFormat>

export const FfmpegFormatParser = () => {
  if (!FfmpegFormatModel) {
    FfmpegFormatModel = z.enum(
      LOAD('ffmpeg_format') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegFormat>
  }
  return FfmpegFormatModel!
}

let FfmpegFormatDataModel: z.ZodType<FfmpegFormatData>

export const FfmpegFormatDataParser =
  (): z.ZodType<FfmpegFormatData> => {
    if (!FfmpegFormatDataModel) {
      FfmpegFormatDataModel = z.object({
        label: z.string(),
        supportsDemuxing: z.boolean(),
        supportsMuxing: z.boolean(),
      }) as z.ZodType<FfmpegFormatData>
    }
    return FfmpegFormatDataModel!
  }

let FfmpegStrictOptionModel: z.ZodType<FfmpegStrictOption>

export const FfmpegStrictOptionParser = () => {
  if (!FfmpegStrictOptionModel) {
    FfmpegStrictOptionModel = z.enum(
      LOAD('ffmpeg_strict_option') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegStrictOption>
  }
  return FfmpegStrictOptionModel!
}

let FfmpegStrictOptionDataModel: z.ZodType<FfmpegStrictOptionData>

export const FfmpegStrictOptionDataParser =
  (): z.ZodType<FfmpegStrictOptionData> => {
    if (!FfmpegStrictOptionDataModel) {
      FfmpegStrictOptionDataModel = z.object({
        note: z.string(),
      }) as z.ZodType<FfmpegStrictOptionData>
    }
    return FfmpegStrictOptionDataModel!
  }

let FileContentModel: z.ZodType<FileContent>

export const FileContentParser = (): z.ZodType<FileContent> => {
  if (!FileContentModel) {
    FileContentModel = z.object({
      content: z.union([
        z.instanceof(ArrayBuffer),
        z.instanceof(Blob),
        z.string(),
      ]),
    }) as z.ZodType<FileContent>
  }
  return FileContentModel!
}

let FileContentWithSha256Model: z.ZodType<FileContentWithSha256>

export const FileContentWithSha256Parser =
  (): z.ZodType<FileContentWithSha256> => {
    if (!FileContentWithSha256Model) {
      FileContentWithSha256Model = z.object({
        sha256: z.string().refine(TEST('sha256', code.is_sha256.test)),
        content: z.union([
          z.instanceof(ArrayBuffer),
          z.instanceof(Blob),
          z.string(),
        ]),
      }) as z.ZodType<FileContentWithSha256>
    }
    return FileContentWithSha256Model!
  }

let FileHasOutputContentModel: z.ZodType<FileHasOutputContent>

export const FileHasOutputContentParser =
  (): z.ZodType<FileHasOutputContent> => {
    if (!FileHasOutputContentModel) {
      FileHasOutputContentModel = z.object({
        content: z.boolean(),
      }) as z.ZodType<FileHasOutputContent>
    }
    return FileHasOutputContentModel!
  }

let FileInputPathModel: z.ZodType<FileInputPath>

export const FileInputPathParser = (): z.ZodType<FileInputPath> => {
  if (!FileInputPathModel) {
    FileInputPathModel = z.object({
      path: z.string(),
    }) as z.ZodType<FileInputPath>
  }
  return FileInputPathModel!
}

let FileOutputPathModel: z.ZodType<FileOutputPath>

export const FileOutputPathParser = (): z.ZodType<FileOutputPath> => {
  if (!FileOutputPathModel) {
    FileOutputPathModel = z.object({
      path: z.string(),
    }) as z.ZodType<FileOutputPath>
  }
  return FileOutputPathModel!
}

let FilePathModel: z.ZodType<FilePath>

export const FilePathParser = (): z.ZodType<FilePath> => {
  if (!FilePathModel) {
    FilePathModel = z.object({
      path: z.string(),
    }) as z.ZodType<FilePath>
  }
  return FilePathModel!
}

let FileReaderEncodingModel: z.ZodType<FileReaderEncoding>

export const FileReaderEncodingParser = () => {
  if (!FileReaderEncodingModel) {
    FileReaderEncodingModel = z.enum(
      LOAD('file_reader_encoding') as readonly [string, ...string[]],
    ) as z.ZodType<FileReaderEncoding>
  }
  return FileReaderEncodingModel!
}

let FlipModel: z.ZodType<Flip>

export const FlipParser = () => {
  if (!FlipModel) {
    FlipModel = z.enum(
      LOAD('flip') as readonly [string, ...string[]],
    ) as z.ZodType<Flip>
  }
  return FlipModel!
}

let FontFormatModel: z.ZodType<FontFormat>

export const FontFormatParser = () => {
  if (!FontFormatModel) {
    FontFormatModel = z.enum(
      LOAD('font_format') as readonly [string, ...string[]],
    ) as z.ZodType<FontFormat>
  }
  return FontFormatModel!
}

let ForgeMessageDigestModel: z.ZodType<ForgeMessageDigest>

export const ForgeMessageDigestParser = () => {
  if (!ForgeMessageDigestModel) {
    ForgeMessageDigestModel = z.enum(
      LOAD('forge_message_digest') as readonly [string, ...string[]],
    ) as z.ZodType<ForgeMessageDigest>
  }
  return ForgeMessageDigestModel!
}

let FormatApiModel: z.ZodType<FormatApi>

export const FormatApiParser = (): z.ZodType<FormatApi> => {
  if (!FormatApiModel) {
    FormatApiModel = z.object({
      format: z.string(),
    }) as z.ZodType<FormatApi>
  }
  return FormatApiModel!
}

let FormatAssemblyCommandInputModel: z.ZodType<FormatAssemblyCommandInput>

export const FormatAssemblyCommandInputParser =
  (): z.ZodType<FormatAssemblyCommandInput> => {
    if (!FormatAssemblyCommandInputModel) {
      FormatAssemblyCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyCommandInput>
    }
    return FormatAssemblyCommandInputModel!
  }

let FormatCModel: z.ZodType<FormatC>

export const FormatCParser = (): z.ZodType<FormatC> => {
  if (!FormatCModel) {
    FormatCModel = z.object({
      format: z.string(),
      input: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<FormatC>
  }
  return FormatCModel!
}

let FormatCliBaseModel: z.ZodType<FormatCliBase>

export const FormatCliBaseParser = (): z.ZodType<FormatCliBase> => {
  if (!FormatCliBaseModel) {
    FormatCliBaseModel = z.object({
      format: z.string(),
      input: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
      help: z.optional(z.boolean()),
      log: z
        .optional(z.lazy(() => CliLogFormatParser()))
        .default('pretty'),
    }) as z.ZodType<FormatCliBase>
  }
  return FormatCliBaseModel!
}

let FormatCodeFormatModel: z.ZodType<FormatCodeFormat>

export const FormatCodeFormatParser = () => {
  if (!FormatCodeFormatModel) {
    FormatCodeFormatModel = z.enum(
      LOAD('format_code_format') as readonly [string, ...string[]],
    ) as z.ZodType<FormatCodeFormat>
  }
  return FormatCodeFormatModel!
}

let FormatCodeWithClangFormatCommandInputModel: z.ZodType<FormatCodeWithClangFormatCommandInput>

export const FormatCodeWithClangFormatCommandInputParser =
  (): z.ZodType<FormatCodeWithClangFormatCommandInput> => {
    if (!FormatCodeWithClangFormatCommandInputModel) {
      FormatCodeWithClangFormatCommandInputModel = z.object({
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        style: z.object({
          path: z.string(),
        }),
      }) as z.ZodType<FormatCodeWithClangFormatCommandInput>
    }
    return FormatCodeWithClangFormatCommandInputModel!
  }

let FormatCodeWithPrettierModel: z.ZodType<FormatCodeWithPrettier>

export const FormatCodeWithPrettierParser =
  (): z.ZodType<FormatCodeWithPrettier> => {
    if (!FormatCodeWithPrettierModel) {
      FormatCodeWithPrettierModel = z.object({
        code: z.string(),
        format: z.lazy(() => PrettierPluginParser()),
      }) as z.ZodType<FormatCodeWithPrettier>
    }
    return FormatCodeWithPrettierModel!
  }

let FormatCppModel: z.ZodType<FormatCpp>

export const FormatCppParser = (): z.ZodType<FormatCpp> => {
  if (!FormatCppModel) {
    FormatCppModel = z.object({
      format: z.string(),
      input: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<FormatCpp>
  }
  return FormatCppModel!
}

let FormatCssWithPrettierModel: z.ZodType<FormatCssWithPrettier>

export const FormatCssWithPrettierParser =
  (): z.ZodType<FormatCssWithPrettier> => {
    if (!FormatCssWithPrettierModel) {
      FormatCssWithPrettierModel = z.object({
        code: z.string(),
        singleQuote: z.optional(z.boolean()).default(false),
      }) as z.ZodType<FormatCssWithPrettier>
    }
    return FormatCssWithPrettierModel!
  }

let FormatGraphqlWithPrettierModel: z.ZodType<FormatGraphqlWithPrettier>

export const FormatGraphqlWithPrettierParser =
  (): z.ZodType<FormatGraphqlWithPrettier> => {
    if (!FormatGraphqlWithPrettierModel) {
      FormatGraphqlWithPrettierModel = z.object({
        code: z.string(),
        bracketSpacing: z.optional(z.boolean()).default(true),
      }) as z.ZodType<FormatGraphqlWithPrettier>
    }
    return FormatGraphqlWithPrettierModel!
  }

let FormatHtmlWithPrettierModel: z.ZodType<FormatHtmlWithPrettier>

export const FormatHtmlWithPrettierParser =
  (): z.ZodType<FormatHtmlWithPrettier> => {
    if (!FormatHtmlWithPrettierModel) {
      FormatHtmlWithPrettierModel = z.object({
        code: z.string(),
        bracketSameLine: z.optional(z.boolean()).default(false),
        htmlWhitespaceSensitivity: z
          .optional(
            z.lazy(() =>
              PrettierHtmlWhitespaceSensitivityOptionParser(),
            ),
          )
          .default('css'),
        singleAttributePerLine: z.optional(z.boolean()).default(false),
        vueIndentScriptAndStyle: z.optional(z.boolean()).default(false),
      }) as z.ZodType<FormatHtmlWithPrettier>
    }
    return FormatHtmlWithPrettierModel!
  }

let FormatJavaModel: z.ZodType<FormatJava>

export const FormatJavaParser = (): z.ZodType<FormatJava> => {
  if (!FormatJavaModel) {
    FormatJavaModel = z.object({
      format: z.string(),
      input: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<FormatJava>
  }
  return FormatJavaModel!
}

let FormatJavaWithPrettierModel: z.ZodType<FormatJavaWithPrettier>

export const FormatJavaWithPrettierParser =
  (): z.ZodType<FormatJavaWithPrettier> => {
    if (!FormatJavaWithPrettierModel) {
      FormatJavaWithPrettierModel = z.object({
        code: z.string(),
        maxLineLength: z.optional(z.number().int().gte(0)),
        indentationSize: z.optional(z.number().int().gte(0)),
        useTabs: z.optional(z.boolean()),
        trailingComma: z.optional(z.boolean()),
      }) as z.ZodType<FormatJavaWithPrettier>
    }
    return FormatJavaWithPrettierModel!
  }

let FormatKotlinCommandInputModel: z.ZodType<FormatKotlinCommandInput>

export const FormatKotlinCommandInputParser =
  (): z.ZodType<FormatKotlinCommandInput> => {
    if (!FormatKotlinCommandInputModel) {
      FormatKotlinCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinCommandInput>
    }
    return FormatKotlinCommandInputModel!
  }

let FormatMarkdownWithPrettierModel: z.ZodType<FormatMarkdownWithPrettier>

export const FormatMarkdownWithPrettierParser =
  (): z.ZodType<FormatMarkdownWithPrettier> => {
    if (!FormatMarkdownWithPrettierModel) {
      FormatMarkdownWithPrettierModel = z.object({
        code: z.string(),
        proseWrap: z
          .optional(z.lazy(() => PrettierProseWrapOptionParser()))
          .default('preserve'),
        singleQuote: z.optional(z.boolean()).default(false),
      }) as z.ZodType<FormatMarkdownWithPrettier>
    }
    return FormatMarkdownWithPrettierModel!
  }

let FormatPythonCommandInputModel: z.ZodType<FormatPythonCommandInput>

export const FormatPythonCommandInputParser =
  (): z.ZodType<FormatPythonCommandInput> => {
    if (!FormatPythonCommandInputModel) {
      FormatPythonCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonCommandInput>
    }
    return FormatPythonCommandInputModel!
  }

let FormatRubyModel: z.ZodType<FormatRuby>

export const FormatRubyParser = (): z.ZodType<FormatRuby> => {
  if (!FormatRubyModel) {
    FormatRubyModel = z.object({
      format: z.string(),
      input: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
      output: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<FormatRuby>
  }
  return FormatRubyModel!
}

let FormatRustCommandInputModel: z.ZodType<FormatRustCommandInput>

export const FormatRustCommandInputParser =
  (): z.ZodType<FormatRustCommandInput> => {
    if (!FormatRustCommandInputModel) {
      FormatRustCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustCommandInput>
    }
    return FormatRustCommandInputModel!
  }

let FormatRustWithPrettierModel: z.ZodType<FormatRustWithPrettier>

export const FormatRustWithPrettierParser =
  (): z.ZodType<FormatRustWithPrettier> => {
    if (!FormatRustWithPrettierModel) {
      FormatRustWithPrettierModel = z.object({
        code: z.string(),
        useTabs: z.optional(z.boolean()),
        indentationSize: z.optional(z.number().int().gte(0)),
        maxLineLength: z.optional(z.number().int().gte(0)),
        endOfLine: z.optional(
          z.lazy(() => PrettierEndOfLineOptionParser()),
        ),
      }) as z.ZodType<FormatRustWithPrettier>
    }
    return FormatRustWithPrettierModel!
  }

let FormatShWithPrettierModel: z.ZodType<FormatShWithPrettier>

export const FormatShWithPrettierParser =
  (): z.ZodType<FormatShWithPrettier> => {
    if (!FormatShWithPrettierModel) {
      FormatShWithPrettierModel = z.object({
        code: z.string(),
        keepComments: z.optional(z.boolean()),
        stopAt: z.optional(z.string()),
        variant: z.optional(z.string()),
        indent: z.optional(z.number().int().gte(0)),
        binaryNextLine: z.optional(z.boolean()),
        switchCaseIndent: z.optional(z.boolean()),
        spaceRedirects: z.optional(z.boolean()),
        keepPadding: z.optional(z.boolean()),
        minify: z.optional(z.boolean()),
        functionNextLine: z.optional(z.boolean()),
      }) as z.ZodType<FormatShWithPrettier>
    }
    return FormatShWithPrettierModel!
  }

let FormatSqlWithContentModel: z.ZodType<FormatSqlWithContent>

export const FormatSqlWithContentParser =
  (): z.ZodType<FormatSqlWithContent> => {
    if (!FormatSqlWithContentModel) {
      FormatSqlWithContentModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.object({
            content: z.union([z.instanceof(ArrayBuffer), z.string()]),
          }),
        }),
      }) as z.ZodType<FormatSqlWithContent>
    }
    return FormatSqlWithContentModel!
  }

let FormatSwiftCommandInputModel: z.ZodType<FormatSwiftCommandInput>

export const FormatSwiftCommandInputParser =
  (): z.ZodType<FormatSwiftCommandInput> => {
    if (!FormatSwiftCommandInputModel) {
      FormatSwiftCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftCommandInput>
    }
    return FormatSwiftCommandInputModel!
  }

let FormatTypescriptWithPrettierModel: z.ZodType<FormatTypescriptWithPrettier>

export const FormatTypescriptWithPrettierParser =
  (): z.ZodType<FormatTypescriptWithPrettier> => {
    if (!FormatTypescriptWithPrettierModel) {
      FormatTypescriptWithPrettierModel = z.object({
        code: z.string(),
        jsxSingleQuote: z.optional(z.boolean()),
        singleQuote: z.optional(z.boolean()),
        semiColon: z.optional(z.boolean()),
        indentationSize: z.optional(z.number().int().gte(0)),
        maxLineLength: z.optional(z.number().int().gte(0)),
        trailingComma: z.optional(
          z.lazy(() => PrettierTypescriptTrailingCommaOptionParser()),
        ),
        bracketSpacing: z.optional(z.boolean()),
        bracketSameLine: z.optional(z.boolean()),
        arrowParentheses: z.optional(
          z.lazy(() => PrettierArrowParensOptionParser()),
        ),
        endOfLine: z.optional(
          z.lazy(() => PrettierEndOfLineOptionParser()),
        ),
        singleAttributePerLine: z.optional(z.boolean()),
      }) as z.ZodType<FormatTypescriptWithPrettier>
    }
    return FormatTypescriptWithPrettierModel!
  }

let FormatXmlWithPrettierModel: z.ZodType<FormatXmlWithPrettier>

export const FormatXmlWithPrettierParser =
  (): z.ZodType<FormatXmlWithPrettier> => {
    if (!FormatXmlWithPrettierModel) {
      FormatXmlWithPrettierModel = z.object({
        code: z.string(),
        xmlSelfClosingSpace: z.optional(z.boolean()).default(true),
        indentationSize: z.optional(z.number().int().gte(0)).default(2),
        xmlWhitespaceSensitivity: z
          .optional(
            z.lazy(() =>
              PrettierXmlWhitespaceSensitivityOptionParser(),
            ),
          )
          .default('strict'),
        maxLineLength: z.optional(z.number().int().gte(0)).default(80),
        xmlSortAttributesByKey: z.optional(z.boolean()).default(true),
        xmlQuoteAttributes: z
          .optional(
            z.lazy(() => PrettierXmlQuoteAttributesOptionParser()),
          )
          .default('preserve'),
      }) as z.ZodType<FormatXmlWithPrettier>
    }
    return FormatXmlWithPrettierModel!
  }

let FormatYamlWithPrettierModel: z.ZodType<FormatYamlWithPrettier>

export const FormatYamlWithPrettierParser =
  (): z.ZodType<FormatYamlWithPrettier> => {
    if (!FormatYamlWithPrettierModel) {
      FormatYamlWithPrettierModel = z.object({
        code: z.string(),
        bracketSpacing: z.optional(z.boolean()).default(true),
        singleQuote: z.optional(z.boolean()).default(false),
        proseWrap: z
          .optional(z.lazy(() => PrettierProseWrapOptionParser()))
          .default('preserve'),
      }) as z.ZodType<FormatYamlWithPrettier>
    }
    return FormatYamlWithPrettierModel!
  }

let GematriaSystemCalculationModel: z.ZodType<GematriaSystemCalculation>

export const GematriaSystemCalculationParser =
  (): z.ZodType<GematriaSystemCalculation> => {
    if (!GematriaSystemCalculationModel) {
      GematriaSystemCalculationModel = z.object({
        system: z.object({
          slug: z.string(),
          title: z.string(),
        }),
        reduction: z.number().int().gte(0),
        summation: z.number().int().gte(0),
      }) as z.ZodType<GematriaSystemCalculation>
    }
    return GematriaSystemCalculationModel!
  }

let GematriaSystemCalculationResultModel: z.ZodType<GematriaSystemCalculationResult>

export const GematriaSystemCalculationResultParser =
  (): z.ZodType<GematriaSystemCalculationResult> => {
    if (!GematriaSystemCalculationResultModel) {
      GematriaSystemCalculationResultModel = z.object({
        string: z.object({
          decoded: z.string(),
          encoded: z.string(),
        }),
        script: z.object({
          slug: z.string(),
          title: z.string(),
        }),
        calculation: z.array(
          z.lazy(() => GematriaSystemCalculationParser()),
        ),
      }) as z.ZodType<GematriaSystemCalculationResult>
    }
    return GematriaSystemCalculationResultModel!
  }

let GenerateHaikuPhraseModel: z.ZodType<GenerateHaikuPhrase>

export const GenerateHaikuPhraseParser =
  (): z.ZodType<GenerateHaikuPhrase> => {
    if (!GenerateHaikuPhraseModel) {
      GenerateHaikuPhraseModel = z.object({
        format: z.literal('haiku_phrase'),
        separator: z.optional(z.string()).default('-'),
        adjectives: z.array(
          z.union([
            z.lazy(() => NamedWordSetParser()),
            z.lazy(() => AnonymousWordSetParser()),
          ]),
        ),
        nouns: z.array(
          z.union([
            z.lazy(() => NamedWordSetParser()),
            z.lazy(() => AnonymousWordSetParser()),
          ]),
        ),
      }) as z.ZodType<GenerateHaikuPhrase>
    }
    return GenerateHaikuPhraseModel!
  }

let GenerateHashModel: z.ZodType<GenerateHash>

export const GenerateHashParser = (): z.ZodType<GenerateHash> => {
  if (!GenerateHashModel) {
    GenerateHashModel = z.object({
      class: z.lazy(() => ForgeMessageDigestParser()),
      content: z.union([z.string(), z.instanceof(ArrayBuffer)]),
    }) as z.ZodType<GenerateHash>
  }
  return GenerateHashModel!
}

let GenerateMurmurHashModel: z.ZodType<GenerateMurmurHash>

export const GenerateMurmurHashParser =
  (): z.ZodType<GenerateMurmurHash> => {
    if (!GenerateMurmurHashModel) {
      GenerateMurmurHashModel = z.object({
        input: z.string(),
        seed: z.number().int(),
        version: z.optional(z.string()).default('3'),
      }) as z.ZodType<GenerateMurmurHash>
    }
    return GenerateMurmurHashModel!
  }

let GenerateQrCodeModel: z.ZodType<GenerateQrCode>

export const GenerateQrCodeParser = (): z.ZodType<GenerateQrCode> => {
  if (!GenerateQrCodeModel) {
    GenerateQrCodeModel = z.object({
      errorCorrectionLevel: z.lazy(() =>
        QrCodeErrorCorrectionLevelParser(),
      ),
      format: z.lazy(() => QrCodeFormatParser()),
      margin: z.number().int().gte(0),
      color: z.optional(
        z.object({
          dark: z
            .string()
            .refine(TEST('dark', code.is_hex_color_8.test)),
          light: z
            .string()
            .refine(TEST('light', code.is_hex_color_8.test)),
        }),
      ),
    }) as z.ZodType<GenerateQrCode>
  }
  return GenerateQrCodeModel!
}

let GenerateRandomPhraseModel: z.ZodType<GenerateRandomPhrase>

export const GenerateRandomPhraseParser =
  (): z.ZodType<GenerateRandomPhrase> => {
    if (!GenerateRandomPhraseModel) {
      GenerateRandomPhraseModel = z.object({
        format: z.literal('random_phrase'),
        separator: z.optional(z.string()).default('-'),
        minSize: z.optional(z.number().int()).default(2),
        maxSize: z.optional(z.number().int()).default(4),
        exclusions: z.optional(
          z.array(z.lazy(() => WeightedWordSetParser())),
        ),
        inclusions: z.array(z.lazy(() => WeightedWordSetParser())),
      }) as z.ZodType<GenerateRandomPhrase>
    }
    return GenerateRandomPhraseModel!
  }

let GenerateRandomSymbolsModel: z.ZodType<GenerateRandomSymbols>

export const GenerateRandomSymbolsParser =
  (): z.ZodType<GenerateRandomSymbols> => {
    if (!GenerateRandomSymbolsModel) {
      GenerateRandomSymbolsModel = z.object({
        format: z.literal('random_symbols'),
        minSize: z.optional(z.number().int()).default(4),
        maxSize: z.optional(z.number().int()).default(16),
        exclusions: z.optional(
          z.array(z.lazy(() => WeightedSymbolSetParser())),
        ),
        inclusions: z.array(z.lazy(() => WeightedSymbolSetParser())),
      }) as z.ZodType<GenerateRandomSymbols>
    }
    return GenerateRandomSymbolsModel!
  }

let GifsicleOptimizeOptionModel: z.ZodType<GifsicleOptimizeOption>

export const GifsicleOptimizeOptionParser = () => {
  if (!GifsicleOptimizeOptionModel) {
    GifsicleOptimizeOptionModel = z.enum(
      LOAD('gifsicle_optimize_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<GifsicleOptimizeOption>
  }
  return GifsicleOptimizeOptionModel!
}

let ImageMagicColorMatrixModel: z.ZodType<ImageMagicColorMatrix>

export const ImageMagicColorMatrixParser =
  (): z.ZodType<ImageMagicColorMatrix> => {
    if (!ImageMagicColorMatrixModel) {
      ImageMagicColorMatrixModel = z.object({
        row: z.number().int().gte(0),
        column: z.number().int().gte(0),
        value: z.array(z.number()),
      }) as z.ZodType<ImageMagicColorMatrix>
    }
    return ImageMagicColorMatrixModel!
  }

let ImageMagickChannelModel: z.ZodType<ImageMagickChannel>

export const ImageMagickChannelParser = () => {
  if (!ImageMagickChannelModel) {
    ImageMagickChannelModel = z.enum(
      LOAD('image_magick_channel') as readonly [string, ...string[]],
    ) as z.ZodType<ImageMagickChannel>
  }
  return ImageMagickChannelModel!
}

let ImageMagickChannelDataModel: z.ZodType<ImageMagickChannelData>

export const ImageMagickChannelDataParser =
  (): z.ZodType<ImageMagickChannelData> => {
    if (!ImageMagickChannelDataModel) {
      ImageMagickChannelDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<ImageMagickChannelData>
    }
    return ImageMagickChannelDataModel!
  }

let ImageMagickColorSpaceModel: z.ZodType<ImageMagickColorSpace>

export const ImageMagickColorSpaceParser = () => {
  if (!ImageMagickColorSpaceModel) {
    ImageMagickColorSpaceModel = z.enum(
      LOAD('image_magick_color_space') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ImageMagickColorSpace>
  }
  return ImageMagickColorSpaceModel!
}

let ImageMagickColorSpaceDataModel: z.ZodType<ImageMagickColorSpaceData>

export const ImageMagickColorSpaceDataParser =
  (): z.ZodType<ImageMagickColorSpaceData> => {
    if (!ImageMagickColorSpaceDataModel) {
      ImageMagickColorSpaceDataModel = z.object({
        head: z.string(),
        note: z.optional(z.string()),
      }) as z.ZodType<ImageMagickColorSpaceData>
    }
    return ImageMagickColorSpaceDataModel!
  }

let ImageMagickCompressionModel: z.ZodType<ImageMagickCompression>

export const ImageMagickCompressionParser = () => {
  if (!ImageMagickCompressionModel) {
    ImageMagickCompressionModel = z.enum(
      LOAD('image_magick_compression') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ImageMagickCompression>
  }
  return ImageMagickCompressionModel!
}

let ImageMagickCompressionDataModel: z.ZodType<ImageMagickCompressionData>

export const ImageMagickCompressionDataParser =
  (): z.ZodType<ImageMagickCompressionData> => {
    if (!ImageMagickCompressionDataModel) {
      ImageMagickCompressionDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<ImageMagickCompressionData>
    }
    return ImageMagickCompressionDataModel!
  }

let ImageMagickFormatModel: z.ZodType<ImageMagickFormat>

export const ImageMagickFormatParser = () => {
  if (!ImageMagickFormatModel) {
    ImageMagickFormatModel = z.enum(
      LOAD('image_magick_format') as readonly [string, ...string[]],
    ) as z.ZodType<ImageMagickFormat>
  }
  return ImageMagickFormatModel!
}

let ImageMagickFormatDataModel: z.ZodType<ImageMagickFormatData>

export const ImageMagickFormatDataParser =
  (): z.ZodType<ImageMagickFormatData> => {
    if (!ImageMagickFormatDataModel) {
      ImageMagickFormatDataModel = z.object({
        head: z.string(),
        note: z.optional(z.string()),
        read: z.optional(z.boolean()),
        write: z.optional(z.boolean()),
        multiple: z.optional(z.boolean()),
        supportsBlob: z.optional(z.boolean()),
      }) as z.ZodType<ImageMagickFormatData>
    }
    return ImageMagickFormatDataModel!
  }

let ImageMagickGravityModel: z.ZodType<ImageMagickGravity>

export const ImageMagickGravityParser = () => {
  if (!ImageMagickGravityModel) {
    ImageMagickGravityModel = z.enum(
      LOAD('image_magick_gravity') as readonly [string, ...string[]],
    ) as z.ZodType<ImageMagickGravity>
  }
  return ImageMagickGravityModel!
}

let ImageMagickInputFormatModel: z.ZodType<ImageMagickInputFormat>

export const ImageMagickInputFormatParser = () => {
  if (!ImageMagickInputFormatModel) {
    ImageMagickInputFormatModel = z.enum(
      LOAD('image_magick_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ImageMagickInputFormat>
  }
  return ImageMagickInputFormatModel!
}

let ImageMagickOutputFormatModel: z.ZodType<ImageMagickOutputFormat>

export const ImageMagickOutputFormatParser = () => {
  if (!ImageMagickOutputFormatModel) {
    ImageMagickOutputFormatModel = z.enum(
      LOAD('image_magick_output_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ImageMagickOutputFormat>
  }
  return ImageMagickOutputFormatModel!
}

let InkscapeExportFormatModel: z.ZodType<InkscapeExportFormat>

export const InkscapeExportFormatParser = () => {
  if (!InkscapeExportFormatModel) {
    InkscapeExportFormatModel = z.enum(
      LOAD('inkscape_export_format') as readonly [string, ...string[]],
    ) as z.ZodType<InkscapeExportFormat>
  }
  return InkscapeExportFormatModel!
}

let InkscapeImportFormatModel: z.ZodType<InkscapeImportFormat>

export const InkscapeImportFormatParser = () => {
  if (!InkscapeImportFormatModel) {
    InkscapeImportFormatModel = z.enum(
      LOAD('inkscape_import_format') as readonly [string, ...string[]],
    ) as z.ZodType<InkscapeImportFormat>
  }
  return InkscapeImportFormatModel!
}

let InspectColorModel: z.ZodType<InspectColor>

export const InspectColorParser = (): z.ZodType<InspectColor> => {
  if (!InspectColorModel) {
    InspectColorModel = z.object({
      value: z.string(),
    }) as z.ZodType<InspectColor>
  }
  return InspectColorModel!
}

let InspectMetadataFromImageModel: z.ZodType<InspectMetadataFromImage>

export const InspectMetadataFromImageParser =
  (): z.ZodType<InspectMetadataFromImage> => {
    if (!InspectMetadataFromImageModel) {
      InspectMetadataFromImageModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        copyright: z.optional(z.string()),
        creator: z.optional(z.string()),
        license: z.optional(z.string()),
        keywords: z.optional(z.array(z.string())),
        artist: z.optional(z.string()),
        originalDate: z.optional(z.coerce.date()),
        allDates: z.optional(z.coerce.date()),
        creationDate: z.optional(z.coerce.date()),
        title: z.optional(z.string()),
        description: z.optional(z.string()),
      }) as z.ZodType<InspectMetadataFromImage>
    }
    return InspectMetadataFromImageModel!
  }

let LibreOfficeInputFormatModel: z.ZodType<LibreOfficeInputFormat>

export const LibreOfficeInputFormatParser = () => {
  if (!LibreOfficeInputFormatModel) {
    LibreOfficeInputFormatModel = z.enum(
      LOAD('libre_office_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<LibreOfficeInputFormat>
  }
  return LibreOfficeInputFormatModel!
}

let LibreOfficeOutputFormatModel: z.ZodType<LibreOfficeOutputFormat>

export const LibreOfficeOutputFormatParser = () => {
  if (!LibreOfficeOutputFormatModel) {
    LibreOfficeOutputFormatModel = z.enum(
      LOAD('libre_office_output_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<LibreOfficeOutputFormat>
  }
  return LibreOfficeOutputFormatModel!
}

let LlvmArchitectureModel: z.ZodType<LlvmArchitecture>

export const LlvmArchitectureParser = () => {
  if (!LlvmArchitectureModel) {
    LlvmArchitectureModel = z.enum(
      LOAD('llvm_architecture') as readonly [string, ...string[]],
    ) as z.ZodType<LlvmArchitecture>
  }
  return LlvmArchitectureModel!
}

let LlvmArchitectureDataModel: z.ZodType<LlvmArchitectureData>

export const LlvmArchitectureDataParser =
  (): z.ZodType<LlvmArchitectureData> => {
    if (!LlvmArchitectureDataModel) {
      LlvmArchitectureDataModel = z.object({
        host: z.string(),
        note: z.string(),
        cpu: z.array(z.string()),
        feature: z.array(z.string()),
      }) as z.ZodType<LlvmArchitectureData>
    }
    return LlvmArchitectureDataModel!
  }

let LlvmCpuModel: z.ZodType<LlvmCpu>

export const LlvmCpuParser = () => {
  if (!LlvmCpuModel) {
    LlvmCpuModel = z.enum(
      LOAD('llvm_cpu') as readonly [string, ...string[]],
    ) as z.ZodType<LlvmCpu>
  }
  return LlvmCpuModel!
}

let LlvmCpuDataModel: z.ZodType<LlvmCpuData>

export const LlvmCpuDataParser = (): z.ZodType<LlvmCpuData> => {
  if (!LlvmCpuDataModel) {
    LlvmCpuDataModel = z.object({
      host: z.string(),
      note: z.string(),
    }) as z.ZodType<LlvmCpuData>
  }
  return LlvmCpuDataModel!
}

let LlvmFeatureModel: z.ZodType<LlvmFeature>

export const LlvmFeatureParser = () => {
  if (!LlvmFeatureModel) {
    LlvmFeatureModel = z.enum(
      LOAD('llvm_feature') as readonly [string, ...string[]],
    ) as z.ZodType<LlvmFeature>
  }
  return LlvmFeatureModel!
}

let LlvmFeatureDataModel: z.ZodType<LlvmFeatureData>

export const LlvmFeatureDataParser = (): z.ZodType<LlvmFeatureData> => {
  if (!LlvmFeatureDataModel) {
    LlvmFeatureDataModel = z.object({
      host: z.string(),
      note: z.string(),
    }) as z.ZodType<LlvmFeatureData>
  }
  return LlvmFeatureDataModel!
}

let LlvmOptimizationLevelModel: z.ZodType<LlvmOptimizationLevel>

export const LlvmOptimizationLevelParser = () => {
  if (!LlvmOptimizationLevelModel) {
    LlvmOptimizationLevelModel = z.enum(
      LOAD('llvm_optimization_level') as readonly [string, ...string[]],
    ) as z.ZodType<LlvmOptimizationLevel>
  }
  return LlvmOptimizationLevelModel!
}

let LocalInputPathModel: z.ZodType<LocalInputPath>

export const LocalInputPathParser = (): z.ZodType<LocalInputPath> => {
  if (!LocalInputPathModel) {
    LocalInputPathModel = z.object({
      path: z.string().refine(TEST('path', code.is_local_path.test)),
    }) as z.ZodType<LocalInputPath>
  }
  return LocalInputPathModel!
}

let LocalOutputPathModel: z.ZodType<LocalOutputPath>

export const LocalOutputPathParser = (): z.ZodType<LocalOutputPath> => {
  if (!LocalOutputPathModel) {
    LocalOutputPathModel = z.object({
      path: z.string().refine(TEST('path', code.is_local_path.test)),
    }) as z.ZodType<LocalOutputPath>
  }
  return LocalOutputPathModel!
}

let LocalPathModel: z.ZodType<LocalPath>

export const LocalPathParser = (): z.ZodType<LocalPath> => {
  if (!LocalPathModel) {
    LocalPathModel = z.object({
      path: z.string().refine(TEST('path', code.is_local_path.test)),
    }) as z.ZodType<LocalPath>
  }
  return LocalPathModel!
}

let NamedSymbolSetModel: z.ZodType<NamedSymbolSet>

export const NamedSymbolSetParser = (): z.ZodType<NamedSymbolSet> => {
  if (!NamedSymbolSetModel) {
    NamedSymbolSetModel = z.object({
      form: z.literal('named-symbol-set'),
      name: z.lazy(() => SymbolSetParser()),
    }) as z.ZodType<NamedSymbolSet>
  }
  return NamedSymbolSetModel!
}

let NamedWordSetModel: z.ZodType<NamedWordSet>

export const NamedWordSetParser = (): z.ZodType<NamedWordSet> => {
  if (!NamedWordSetModel) {
    NamedWordSetModel = z.object({
      form: z.literal('named-word-set'),
      name: z.lazy(() => WordSetParser()),
    }) as z.ZodType<NamedWordSet>
  }
  return NamedWordSetModel!
}

let ObjdumpDemangleStyleModel: z.ZodType<ObjdumpDemangleStyle>

export const ObjdumpDemangleStyleParser = () => {
  if (!ObjdumpDemangleStyleModel) {
    ObjdumpDemangleStyleModel = z.enum(
      LOAD('objdump_demangle_style') as readonly [string, ...string[]],
    ) as z.ZodType<ObjdumpDemangleStyle>
  }
  return ObjdumpDemangleStyleModel!
}

let ObjdumpHideOptionModel: z.ZodType<ObjdumpHideOption>

export const ObjdumpHideOptionParser = () => {
  if (!ObjdumpHideOptionModel) {
    ObjdumpHideOptionModel = z.enum(
      LOAD('objdump_hide_option') as readonly [string, ...string[]],
    ) as z.ZodType<ObjdumpHideOption>
  }
  return ObjdumpHideOptionModel!
}

let ObjdumpShowOptionModel: z.ZodType<ObjdumpShowOption>

export const ObjdumpShowOptionParser = () => {
  if (!ObjdumpShowOptionModel) {
    ObjdumpShowOptionModel = z.enum(
      LOAD('objdump_show_option') as readonly [string, ...string[]],
    ) as z.ZodType<ObjdumpShowOption>
  }
  return ObjdumpShowOptionModel!
}

let PandocFormatDataModel: z.ZodType<PandocFormatData>

export const PandocFormatDataParser =
  (): z.ZodType<PandocFormatData> => {
    if (!PandocFormatDataModel) {
      PandocFormatDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<PandocFormatData>
    }
    return PandocFormatDataModel!
  }

let PandocInputFormatModel: z.ZodType<PandocInputFormat>

export const PandocInputFormatParser = () => {
  if (!PandocInputFormatModel) {
    PandocInputFormatModel = z.enum(
      LOAD('pandoc_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<PandocInputFormat>
  }
  return PandocInputFormatModel!
}

let PandocOutputFormatModel: z.ZodType<PandocOutputFormat>

export const PandocOutputFormatParser = () => {
  if (!PandocOutputFormatModel) {
    PandocOutputFormatModel = z.enum(
      LOAD('pandoc_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<PandocOutputFormat>
  }
  return PandocOutputFormatModel!
}

let PatoolFormatModel: z.ZodType<PatoolFormat>

export const PatoolFormatParser = () => {
  if (!PatoolFormatModel) {
    PatoolFormatModel = z.enum(
      LOAD('patool_format') as readonly [string, ...string[]],
    ) as z.ZodType<PatoolFormat>
  }
  return PatoolFormatModel!
}

let PdfLatexInputFormatModel: z.ZodType<PdfLatexInputFormat>

export const PdfLatexInputFormatParser = () => {
  if (!PdfLatexInputFormatModel) {
    PdfLatexInputFormatModel = z.enum(
      LOAD('pdf_latex_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<PdfLatexInputFormat>
  }
  return PdfLatexInputFormatModel!
}

let PdfLatexOutputFormatModel: z.ZodType<PdfLatexOutputFormat>

export const PdfLatexOutputFormatParser = () => {
  if (!PdfLatexOutputFormatModel) {
    PdfLatexOutputFormatModel = z.enum(
      LOAD('pdf_latex_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<PdfLatexOutputFormat>
  }
  return PdfLatexOutputFormatModel!
}

let PleasantAdjectiveModel: z.ZodType<PleasantAdjective>

export const PleasantAdjectiveParser = () => {
  if (!PleasantAdjectiveModel) {
    PleasantAdjectiveModel = z.enum(
      LOAD('pleasant_adjective') as readonly [string, ...string[]],
    ) as z.ZodType<PleasantAdjective>
  }
  return PleasantAdjectiveModel!
}

let PleasantNounModel: z.ZodType<PleasantNoun>

export const PleasantNounParser = () => {
  if (!PleasantNounModel) {
    PleasantNounModel = z.enum(
      LOAD('pleasant_noun') as readonly [string, ...string[]],
    ) as z.ZodType<PleasantNoun>
  }
  return PleasantNounModel!
}

let PrettierArrowParensOptionModel: z.ZodType<PrettierArrowParensOption>

export const PrettierArrowParensOptionParser = () => {
  if (!PrettierArrowParensOptionModel) {
    PrettierArrowParensOptionModel = z.enum(
      LOAD('prettier_arrow_parens_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierArrowParensOption>
  }
  return PrettierArrowParensOptionModel!
}

let PrettierEndOfLineOptionModel: z.ZodType<PrettierEndOfLineOption>

export const PrettierEndOfLineOptionParser = () => {
  if (!PrettierEndOfLineOptionModel) {
    PrettierEndOfLineOptionModel = z.enum(
      LOAD('prettier_end_of_line_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierEndOfLineOption>
  }
  return PrettierEndOfLineOptionModel!
}

let PrettierHtmlWhitespaceSensitivityOptionModel: z.ZodType<PrettierHtmlWhitespaceSensitivityOption>

export const PrettierHtmlWhitespaceSensitivityOptionParser = () => {
  if (!PrettierHtmlWhitespaceSensitivityOptionModel) {
    PrettierHtmlWhitespaceSensitivityOptionModel = z.enum(
      LOAD('prettier_html_whitespace_sensitivity_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierHtmlWhitespaceSensitivityOption>
  }
  return PrettierHtmlWhitespaceSensitivityOptionModel!
}

let PrettierPluginModel: z.ZodType<PrettierPlugin>

export const PrettierPluginParser = () => {
  if (!PrettierPluginModel) {
    PrettierPluginModel = z.enum(
      LOAD('prettier_plugin') as readonly [string, ...string[]],
    ) as z.ZodType<PrettierPlugin>
  }
  return PrettierPluginModel!
}

let PrettierProseWrapOptionModel: z.ZodType<PrettierProseWrapOption>

export const PrettierProseWrapOptionParser = () => {
  if (!PrettierProseWrapOptionModel) {
    PrettierProseWrapOptionModel = z.enum(
      LOAD('prettier_prose_wrap_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierProseWrapOption>
  }
  return PrettierProseWrapOptionModel!
}

let PrettierTypescriptTrailingCommaOptionModel: z.ZodType<PrettierTypescriptTrailingCommaOption>

export const PrettierTypescriptTrailingCommaOptionParser = () => {
  if (!PrettierTypescriptTrailingCommaOptionModel) {
    PrettierTypescriptTrailingCommaOptionModel = z.enum(
      LOAD('prettier_typescript_trailing_comma_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierTypescriptTrailingCommaOption>
  }
  return PrettierTypescriptTrailingCommaOptionModel!
}

let PrettierXmlQuoteAttributesOptionModel: z.ZodType<PrettierXmlQuoteAttributesOption>

export const PrettierXmlQuoteAttributesOptionParser = () => {
  if (!PrettierXmlQuoteAttributesOptionModel) {
    PrettierXmlQuoteAttributesOptionModel = z.enum(
      LOAD('prettier_xml_quote_attributes_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierXmlQuoteAttributesOption>
  }
  return PrettierXmlQuoteAttributesOptionModel!
}

let PrettierXmlWhitespaceSensitivityOptionModel: z.ZodType<PrettierXmlWhitespaceSensitivityOption>

export const PrettierXmlWhitespaceSensitivityOptionParser = () => {
  if (!PrettierXmlWhitespaceSensitivityOptionModel) {
    PrettierXmlWhitespaceSensitivityOptionModel = z.enum(
      LOAD('prettier_xml_whitespace_sensitivity_option') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PrettierXmlWhitespaceSensitivityOption>
  }
  return PrettierXmlWhitespaceSensitivityOptionModel!
}

let PuppeteerInputFormatModel: z.ZodType<PuppeteerInputFormat>

export const PuppeteerInputFormatParser = () => {
  if (!PuppeteerInputFormatModel) {
    PuppeteerInputFormatModel = z.enum(
      LOAD('puppeteer_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<PuppeteerInputFormat>
  }
  return PuppeteerInputFormatModel!
}

let PuppeteerLifeCycleEventModel: z.ZodType<PuppeteerLifeCycleEvent>

export const PuppeteerLifeCycleEventParser = () => {
  if (!PuppeteerLifeCycleEventModel) {
    PuppeteerLifeCycleEventModel = z.enum(
      LOAD('puppeteer_life_cycle_event') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PuppeteerLifeCycleEvent>
  }
  return PuppeteerLifeCycleEventModel!
}

let PuppeteerLifeCycleEventDataModel: z.ZodType<PuppeteerLifeCycleEventData>

export const PuppeteerLifeCycleEventDataParser =
  (): z.ZodType<PuppeteerLifeCycleEventData> => {
    if (!PuppeteerLifeCycleEventDataModel) {
      PuppeteerLifeCycleEventDataModel = z.object({
        note: z.string(),
      }) as z.ZodType<PuppeteerLifeCycleEventData>
    }
    return PuppeteerLifeCycleEventDataModel!
  }

let PuppeteerMarkdownInputFormatModel: z.ZodType<PuppeteerMarkdownInputFormat>

export const PuppeteerMarkdownInputFormatParser = () => {
  if (!PuppeteerMarkdownInputFormatModel) {
    PuppeteerMarkdownInputFormatModel = z.enum(
      LOAD('puppeteer_markdown_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PuppeteerMarkdownInputFormat>
  }
  return PuppeteerMarkdownInputFormatModel!
}

let PuppeteerOutputFormatModel: z.ZodType<PuppeteerOutputFormat>

export const PuppeteerOutputFormatParser = () => {
  if (!PuppeteerOutputFormatModel) {
    PuppeteerOutputFormatModel = z.enum(
      LOAD('puppeteer_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<PuppeteerOutputFormat>
  }
  return PuppeteerOutputFormatModel!
}

let PuppeteerTxtInputFormatModel: z.ZodType<PuppeteerTxtInputFormat>

export const PuppeteerTxtInputFormatParser = () => {
  if (!PuppeteerTxtInputFormatModel) {
    PuppeteerTxtInputFormatModel = z.enum(
      LOAD('puppeteer_txt_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<PuppeteerTxtInputFormat>
  }
  return PuppeteerTxtInputFormatModel!
}

let QrCodeErrorCorrectionLevelModel: z.ZodType<QrCodeErrorCorrectionLevel>

export const QrCodeErrorCorrectionLevelParser = () => {
  if (!QrCodeErrorCorrectionLevelModel) {
    QrCodeErrorCorrectionLevelModel = z.enum(
      LOAD('qr_code_error_correction_level') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<QrCodeErrorCorrectionLevel>
  }
  return QrCodeErrorCorrectionLevelModel!
}

let QrCodeFormatModel: z.ZodType<QrCodeFormat>

export const QrCodeFormatParser = () => {
  if (!QrCodeFormatModel) {
    QrCodeFormatModel = z.enum(
      LOAD('qr_code_format') as readonly [string, ...string[]],
    ) as z.ZodType<QrCodeFormat>
  }
  return QrCodeFormatModel!
}

let RemoteInputPathModel: z.ZodType<RemoteInputPath>

export const RemoteInputPathParser = (): z.ZodType<RemoteInputPath> => {
  if (!RemoteInputPathModel) {
    RemoteInputPathModel = z.object({
      path: z.string().refine(TEST('path', code.is_remote_path.test)),
    }) as z.ZodType<RemoteInputPath>
  }
  return RemoteInputPathModel!
}

let RemoteOutputPathModel: z.ZodType<RemoteOutputPath>

export const RemoteOutputPathParser =
  (): z.ZodType<RemoteOutputPath> => {
    if (!RemoteOutputPathModel) {
      RemoteOutputPathModel = z.object({
        path: z.string().refine(TEST('path', code.is_remote_path.test)),
      }) as z.ZodType<RemoteOutputPath>
    }
    return RemoteOutputPathModel!
  }

let RemotePathModel: z.ZodType<RemotePath>

export const RemotePathParser = (): z.ZodType<RemotePath> => {
  if (!RemotePathModel) {
    RemotePathModel = z.object({
      path: z.string().refine(TEST('path', code.is_remote_path.test)),
    }) as z.ZodType<RemotePath>
  }
  return RemotePathModel!
}

let RemoveAudioFromVideoWithFfmpegModel: z.ZodType<RemoveAudioFromVideoWithFfmpeg>

export const RemoveAudioFromVideoWithFfmpegParser =
  (): z.ZodType<RemoveAudioFromVideoWithFfmpeg> => {
    if (!RemoveAudioFromVideoWithFfmpegModel) {
      RemoveAudioFromVideoWithFfmpegModel = z.object({
        inputPath: z.string(),
        outputPath: z.string(),
      }) as z.ZodType<RemoveAudioFromVideoWithFfmpeg>
    }
    return RemoveAudioFromVideoWithFfmpegModel!
  }

let RemoveImageMetadataModel: z.ZodType<RemoveImageMetadata>

export const RemoveImageMetadataParser =
  (): z.ZodType<RemoveImageMetadata> => {
    if (!RemoveImageMetadataModel) {
      RemoveImageMetadataModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<RemoveImageMetadata>
    }
    return RemoveImageMetadataModel!
  }

let ReplaceImageColorWithImageMagickModel: z.ZodType<ReplaceImageColorWithImageMagick>

export const ReplaceImageColorWithImageMagickParser =
  (): z.ZodType<ReplaceImageColorWithImageMagick> => {
    if (!ReplaceImageColorWithImageMagickModel) {
      ReplaceImageColorWithImageMagickModel = z.object({
        inputPath: z.string(),
        outputPath: z.string(),
        startColor: z.string(),
        endColor: z.string(),
        fuzz: z.number(),
      }) as z.ZodType<ReplaceImageColorWithImageMagick>
    }
    return ReplaceImageColorWithImageMagickModel!
  }

let RequestModel: z.ZodType<Request>

export const RequestParser = (): z.ZodType<Request> => {
  if (!RequestModel) {
    RequestModel = z.object({
      path: z.string(),
      body: z.object({}).passthrough(),
    }) as z.ZodType<Request>
  }
  return RequestModel!
}

let ResizeImageWithImageMagickModel: z.ZodType<ResizeImageWithImageMagick>

export const ResizeImageWithImageMagickParser =
  (): z.ZodType<ResizeImageWithImageMagick> => {
    if (!ResizeImageWithImageMagickModel) {
      ResizeImageWithImageMagickModel = z.object({
        inputPath: z.string(),
        outputPath: z.string(),
        width: z.number().int(),
        height: z.number().int(),
        stretch: z.boolean(),
        gravity: z.lazy(() => ImageMagickGravityParser()),
      }) as z.ZodType<ResizeImageWithImageMagick>
    }
    return ResizeImageWithImageMagickModel!
  }

let ResolveInputForCompileLocalExternalModel: z.ZodType<ResolveInputForCompileLocalExternal>

export const ResolveInputForCompileLocalExternalParser =
  (): z.ZodType<ResolveInputForCompileLocalExternal> => {
    if (!ResolveInputForCompileLocalExternalModel) {
      ResolveInputForCompileLocalExternalModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForCompileLocalExternal>
    }
    return ResolveInputForCompileLocalExternalModel!
  }

let ResolveInputForCompileLocalInternalModel: z.ZodType<ResolveInputForCompileLocalInternal>

export const ResolveInputForCompileLocalInternalParser =
  (): z.ZodType<ResolveInputForCompileLocalInternal> => {
    if (!ResolveInputForCompileLocalInternalModel) {
      ResolveInputForCompileLocalInternalModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForCompileLocalInternal>
    }
    return ResolveInputForCompileLocalInternalModel!
  }

let ResolveInputForCompileRemoteModel: z.ZodType<ResolveInputForCompileRemote>

export const ResolveInputForCompileRemoteParser =
  (): z.ZodType<ResolveInputForCompileRemote> => {
    if (!ResolveInputForCompileRemoteModel) {
      ResolveInputForCompileRemoteModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForCompileRemote>
    }
    return ResolveInputForCompileRemoteModel!
  }

let ResolveInputForConvertLocalExternalModel: z.ZodType<ResolveInputForConvertLocalExternal>

export const ResolveInputForConvertLocalExternalParser =
  (): z.ZodType<ResolveInputForConvertLocalExternal> => {
    if (!ResolveInputForConvertLocalExternalModel) {
      ResolveInputForConvertLocalExternalModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForConvertLocalExternal>
    }
    return ResolveInputForConvertLocalExternalModel!
  }

let ResolveInputForConvertLocalInternalModel: z.ZodType<ResolveInputForConvertLocalInternal>

export const ResolveInputForConvertLocalInternalParser =
  (): z.ZodType<ResolveInputForConvertLocalInternal> => {
    if (!ResolveInputForConvertLocalInternalModel) {
      ResolveInputForConvertLocalInternalModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForConvertLocalInternal>
    }
    return ResolveInputForConvertLocalInternalModel!
  }

let ResolveInputForConvertRemoteModel: z.ZodType<ResolveInputForConvertRemote>

export const ResolveInputForConvertRemoteParser =
  (): z.ZodType<ResolveInputForConvertRemote> => {
    if (!ResolveInputForConvertRemoteModel) {
      ResolveInputForConvertRemoteModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForConvertRemote>
    }
    return ResolveInputForConvertRemoteModel!
  }

let ResolveInputForFormatLocalExternalModel: z.ZodType<ResolveInputForFormatLocalExternal>

export const ResolveInputForFormatLocalExternalParser =
  (): z.ZodType<ResolveInputForFormatLocalExternal> => {
    if (!ResolveInputForFormatLocalExternalModel) {
      ResolveInputForFormatLocalExternalModel = z.object({
        pathScope: z.optional(z.string()),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForFormatLocalExternal>
    }
    return ResolveInputForFormatLocalExternalModel!
  }

let ResolveInputForFormatLocalInternalModel: z.ZodType<ResolveInputForFormatLocalInternal>

export const ResolveInputForFormatLocalInternalParser =
  (): z.ZodType<ResolveInputForFormatLocalInternal> => {
    if (!ResolveInputForFormatLocalInternalModel) {
      ResolveInputForFormatLocalInternalModel = z.object({
        pathScope: z.optional(z.string()),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForFormatLocalInternal>
    }
    return ResolveInputForFormatLocalInternalModel!
  }

let ResolveInputForFormatRemoteModel: z.ZodType<ResolveInputForFormatRemote>

export const ResolveInputForFormatRemoteParser =
  (): z.ZodType<ResolveInputForFormatRemote> => {
    if (!ResolveInputForFormatRemoteModel) {
      ResolveInputForFormatRemoteModel = z.object({
        pathScope: z.optional(z.string()),
        format: z.string(),
        input: z.object({
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForFormatRemote>
    }
    return ResolveInputForFormatRemoteModel!
  }

let ResolveInputForSanitizeLocalExternalModel: z.ZodType<ResolveInputForSanitizeLocalExternal>

export const ResolveInputForSanitizeLocalExternalParser =
  (): z.ZodType<ResolveInputForSanitizeLocalExternal> => {
    if (!ResolveInputForSanitizeLocalExternalModel) {
      ResolveInputForSanitizeLocalExternalModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForSanitizeLocalExternal>
    }
    return ResolveInputForSanitizeLocalExternalModel!
  }

let ResolveInputForSanitizeLocalInternalModel: z.ZodType<ResolveInputForSanitizeLocalInternal>

export const ResolveInputForSanitizeLocalInternalParser =
  (): z.ZodType<ResolveInputForSanitizeLocalInternal> => {
    if (!ResolveInputForSanitizeLocalInternalModel) {
      ResolveInputForSanitizeLocalInternalModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForSanitizeLocalInternal>
    }
    return ResolveInputForSanitizeLocalInternalModel!
  }

let ResolveInputForSanitizeRemoteModel: z.ZodType<ResolveInputForSanitizeRemote>

export const ResolveInputForSanitizeRemoteParser =
  (): z.ZodType<ResolveInputForSanitizeRemote> => {
    if (!ResolveInputForSanitizeRemoteModel) {
      ResolveInputForSanitizeRemoteModel = z.object({
        pathScope: z.optional(z.string()),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FilePathParser()),
            z.lazy(() => FileContentParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
          file: z.optional(z.lazy(() => LocalPathParser())),
        }),
      }) as z.ZodType<ResolveInputForSanitizeRemote>
    }
    return ResolveInputForSanitizeRemoteModel!
  }

let RustCompilerTargetModel: z.ZodType<RustCompilerTarget>

export const RustCompilerTargetParser = () => {
  if (!RustCompilerTargetModel) {
    RustCompilerTargetModel = z.enum(
      LOAD('rust_compiler_target') as readonly [string, ...string[]],
    ) as z.ZodType<RustCompilerTarget>
  }
  return RustCompilerTargetModel!
}

let RustInputFormatModel: z.ZodType<RustInputFormat>

export const RustInputFormatParser = () => {
  if (!RustInputFormatModel) {
    RustInputFormatModel = z.enum(
      LOAD('rust_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<RustInputFormat>
  }
  return RustInputFormatModel!
}

let RustOutputFormatModel: z.ZodType<RustOutputFormat>

export const RustOutputFormatParser = () => {
  if (!RustOutputFormatModel) {
    RustOutputFormatModel = z.enum(
      LOAD('rust_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<RustOutputFormat>
  }
  return RustOutputFormatModel!
}

let SanitizeApiModel: z.ZodType<SanitizeApi>

export const SanitizeApiParser = (): z.ZodType<SanitizeApi> => {
  if (!SanitizeApiModel) {
    SanitizeApiModel = z.object({
      input: z.object({
        format: z.string(),
      }),
    }) as z.ZodType<SanitizeApi>
  }
  return SanitizeApiModel!
}

let SanitizeHtmlCommandInputModel: z.ZodType<SanitizeHtmlCommandInput>

export const SanitizeHtmlCommandInputParser =
  (): z.ZodType<SanitizeHtmlCommandInput> => {
    if (!SanitizeHtmlCommandInputModel) {
      SanitizeHtmlCommandInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<SanitizeHtmlCommandInput>
    }
    return SanitizeHtmlCommandInputModel!
  }

let SharedGematriaLanguageModel: z.ZodType<SharedGematriaLanguage>

export const SharedGematriaLanguageParser = () => {
  if (!SharedGematriaLanguageModel) {
    SharedGematriaLanguageModel = z.enum(
      LOAD('shared_gematria_language') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<SharedGematriaLanguage>
  }
  return SharedGematriaLanguageModel!
}

let SlicePdfModel: z.ZodType<SlicePdf>

export const SlicePdfParser = (): z.ZodType<SlicePdf> => {
  if (!SlicePdfModel) {
    SlicePdfModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      startPage: z.number().int().gte(0),
      endPage: z.number().int().gte(0),
      output: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<SlicePdf>
  }
  return SlicePdfModel!
}

let SlicePdfWithDataModel: z.ZodType<SlicePdfWithData>

export const SlicePdfWithDataParser =
  (): z.ZodType<SlicePdfWithData> => {
    if (!SlicePdfWithDataModel) {
      SlicePdfWithDataModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            data: z.instanceof(ArrayBuffer),
          }),
        }),
        startPage: z.number().int().gte(0),
        endPage: z.number().int().gte(0),
      }) as z.ZodType<SlicePdfWithData>
    }
    return SlicePdfWithDataModel!
  }

let SwiftInputFormatModel: z.ZodType<SwiftInputFormat>

export const SwiftInputFormatParser = () => {
  if (!SwiftInputFormatModel) {
    SwiftInputFormatModel = z.enum(
      LOAD('swift_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<SwiftInputFormat>
  }
  return SwiftInputFormatModel!
}

let SymbolSetModel: z.ZodType<SymbolSet>

export const SymbolSetParser = () => {
  if (!SymbolSetModel) {
    SymbolSetModel = z.enum(
      LOAD('symbol_set') as readonly [string, ...string[]],
    ) as z.ZodType<SymbolSet>
  }
  return SymbolSetModel!
}

let SymbolSetDataModel: z.ZodType<SymbolSetData>

export const SymbolSetDataParser = (): z.ZodType<SymbolSetData> => {
  if (!SymbolSetDataModel) {
    SymbolSetDataModel = z.object({
      list: z.string(),
    }) as z.ZodType<SymbolSetData>
  }
  return SymbolSetDataModel!
}

let TaskModel: z.ZodType<Task>

export const TaskParser = () => {
  if (!TaskModel) {
    TaskModel = z.enum(
      LOAD('task') as readonly [string, ...string[]],
    ) as z.ZodType<Task>
  }
  return TaskModel!
}

let TextStyleModel: z.ZodType<TextStyle>

export const TextStyleParser = (): z.ZodType<TextStyle> => {
  if (!TextStyleModel) {
    TextStyleModel = z.object({
      color: z.optional(
        z.string().refine(TEST('color', code.is_hex_color_6.test)),
      ),
      bold: z.optional(z.boolean()).default(false),
      italic: z.optional(z.boolean()).default(false),
      font: z.optional(
        z.object({
          size: z.optional(z.number().int().gte(0)),
          family: z.optional(z.array(z.string())),
        }),
      ),
      lineHeight: z.optional(z.number()),
      letterSpacing: z.optional(z.number()),
      allCaps: z.optional(z.boolean()).default(false),
    }) as z.ZodType<TextStyle>
  }
  return TextStyleModel!
}

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

let UnarchiverFormatModel: z.ZodType<UnarchiverFormat>

export const UnarchiverFormatParser = () => {
  if (!UnarchiverFormatModel) {
    UnarchiverFormatModel = z.enum(
      LOAD('unarchiver_format') as readonly [string, ...string[]],
    ) as z.ZodType<UnarchiverFormat>
  }
  return UnarchiverFormatModel!
}

let UnarchiverFormatDataModel: z.ZodType<UnarchiverFormatData>

export const UnarchiverFormatDataParser =
  (): z.ZodType<UnarchiverFormatData> => {
    if (!UnarchiverFormatDataModel) {
      UnarchiverFormatDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<UnarchiverFormatData>
    }
    return UnarchiverFormatDataModel!
  }

let UnitModel: z.ZodType<Unit>

export const UnitParser = () => {
  if (!UnitModel) {
    UnitModel = z.enum(
      LOAD('unit') as readonly [string, ...string[]],
    ) as z.ZodType<Unit>
  }
  return UnitModel!
}

let UnitKeyModel: z.ZodType<UnitKey>

export const UnitKeyParser = (): z.ZodType<UnitKey> => {
  if (!UnitKeyModel) {
    UnitKeyModel = z.object({
      key: z.string(),
    }) as z.ZodType<UnitKey>
  }
  return UnitKeyModel!
}

let ValidatePdfWithDataModel: z.ZodType<ValidatePdfWithData>

export const ValidatePdfWithDataParser =
  (): z.ZodType<ValidatePdfWithData> => {
    if (!ValidatePdfWithDataModel) {
      ValidatePdfWithDataModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            data: z.instanceof(ArrayBuffer),
          }),
        }),
      }) as z.ZodType<ValidatePdfWithData>
    }
    return ValidatePdfWithDataModel!
  }

let VerifyCliBaseModel: z.ZodType<VerifyCliBase>

export const VerifyCliBaseParser = (): z.ZodType<VerifyCliBase> => {
  if (!VerifyCliBaseModel) {
    VerifyCliBaseModel = z.object({
      format: z.string(),
      file: z.object({
        path: z.string(),
      }),
      help: z.optional(z.boolean()),
      log: z
        .optional(z.lazy(() => CliLogFormatParser()))
        .default('pretty'),
    }) as z.ZodType<VerifyCliBase>
  }
  return VerifyCliBaseModel!
}

let VerifyImageWithImageMagickModel: z.ZodType<VerifyImageWithImageMagick>

export const VerifyImageWithImageMagickParser =
  (): z.ZodType<VerifyImageWithImageMagick> => {
    if (!VerifyImageWithImageMagickModel) {
      VerifyImageWithImageMagickModel = z.object({
        format: z.lazy(() => ImageMagickFormatParser()),
        file: z.object({
          path: z.string(),
        }),
      }) as z.ZodType<VerifyImageWithImageMagick>
    }
    return VerifyImageWithImageMagickModel!
  }

let WastInputFormatModel: z.ZodType<WastInputFormat>

export const WastInputFormatParser = () => {
  if (!WastInputFormatModel) {
    WastInputFormatModel = z.enum(
      LOAD('wast_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<WastInputFormat>
  }
  return WastInputFormatModel!
}

let WastOutputFormatModel: z.ZodType<WastOutputFormat>

export const WastOutputFormatParser = () => {
  if (!WastOutputFormatModel) {
    WastOutputFormatModel = z.enum(
      LOAD('wast_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<WastOutputFormat>
  }
  return WastOutputFormatModel!
}

let WeightedSymbolSetModel: z.ZodType<WeightedSymbolSet>

export const WeightedSymbolSetParser =
  (): z.ZodType<WeightedSymbolSet> => {
    if (!WeightedSymbolSetModel) {
      WeightedSymbolSetModel = z.object({
        value: z.union([
          z.lazy(() => NamedSymbolSetParser()),
          z.lazy(() => AnonymousSymbolSetParser()),
        ]),
        weight: z.number().int(),
      }) as z.ZodType<WeightedSymbolSet>
    }
    return WeightedSymbolSetModel!
  }

let WeightedWordSetModel: z.ZodType<WeightedWordSet>

export const WeightedWordSetParser = (): z.ZodType<WeightedWordSet> => {
  if (!WeightedWordSetModel) {
    WeightedWordSetModel = z.object({
      value: z.union([
        z.lazy(() => NamedWordSetParser()),
        z.lazy(() => AnonymousWordSetParser()),
      ]),
      weight: z.number().int(),
    }) as z.ZodType<WeightedWordSet>
  }
  return WeightedWordSetModel!
}

let WordSetModel: z.ZodType<WordSet>

export const WordSetParser = () => {
  if (!WordSetModel) {
    WordSetModel = z.enum(
      LOAD('word_set') as readonly [string, ...string[]],
    ) as z.ZodType<WordSet>
  }
  return WordSetModel!
}

let WordSetDataModel: z.ZodType<WordSetData>

export const WordSetDataParser = (): z.ZodType<WordSetData> => {
  if (!WordSetDataModel) {
    WordSetDataModel = z.object({
      name: z.string(),
    }) as z.ZodType<WordSetData>
  }
  return WordSetDataModel!
}

let WriteMetadataToImageModel: z.ZodType<WriteMetadataToImage>

export const WriteMetadataToImageParser =
  (): z.ZodType<WriteMetadataToImage> => {
    if (!WriteMetadataToImageModel) {
      WriteMetadataToImageModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        copyright: z.optional(z.string()),
        creator: z.optional(z.string()),
        license: z.optional(z.string()),
        keywords: z.optional(z.array(z.string())),
        artist: z.optional(z.string()),
        originalDate: z.optional(z.coerce.date()),
        allDates: z.optional(z.coerce.date()),
        creationDate: z.optional(z.coerce.date()),
        title: z.optional(z.string()),
        description: z.optional(z.string()),
      }) as z.ZodType<WriteMetadataToImage>
    }
    return WriteMetadataToImageModel!
  }
