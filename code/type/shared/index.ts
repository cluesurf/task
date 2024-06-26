import merge from 'lodash/merge'

export type AddAudioToVideoWithFfmpeg = {
  inputVideoPath: string
  inputAudioPath: string
  outputPath: string
  audioCodec: string
  fit: boolean
}
export type AnonymousSymbolSet = {
  form: 'anonymous-symbol-set'
  list: string
}
export type AnonymousWordSet = {
  form: 'anonymous-word-set'
  list: Array<string>
}
export type Archive = {
  input: {
    path: string
  }
  output: {
    format: ArchiveFormat
    file: {
      path: string
    }
  }
}

export type ArchiveFormat =
  | 'zip'
  | 'rar'
  | '7z'
  | 'tar'
  | 'gzip'
  | 'bzip2'

export type AssemblySyntax = 'intel' | 'att'

export type BackendCompilationOutput =
  | 'assembly'
  | 'llvm-ir'
  | 'llvm-bitcode'
  | 'binary'
export type BackendCompilationOutputData = {
  extension?: string
}
export type BuildBaseFileInput = {
  tool?: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type BuildBaseInputDirectoryOrFileOutputFile = {
  input: {
    directory?: {
      path: string
    }
    file?: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type BuildBaseInputFileOutputDirectory = {
  output: {
    directory: {
      path: string
    }
  }
  input: {
    file: {
      path: string
    }
  }
}
export type BuildCommandToOptimizeGifWithGifsicle = {
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
  output: {
    file: {
      path: string
    }
  }
}
export type BuildFormatInputOutput = {
  tool?: string
  input: {
    format: string
  }
  output: {
    format: string
  }
}

export type CInputFormat = 'c'
export type CalculateGematria = {
  input: {
    string: {
      decoded: string
      encoded?: string
    }
  }
}
export type CalibreFormatData = {
  head: string
}

export type CalibreInputFormat =
  | 'azw4'
  | 'chm'
  | 'comic'
  | 'djvu'
  | 'docx'
  | 'epub'
  | 'fb2'
  | 'htlz'
  | 'html'
  | 'lit'
  | 'lrf'
  | 'mobi'
  | 'odt'
  | 'pdb'
  | 'pdf'
  | 'pml'
  | 'rb'
  | 'rtf'
  | 'recipe'
  | 'snb'
  | 'tcr'
  | 'txt'

export type CalibreInputProfile =
  | 'cybookg3'
  | 'cybook_opus'
  | 'default'
  | 'hanlinv3'
  | 'hanlinv5'
  | 'illiad'
  | 'irexdr1000'
  | 'irexdr800'
  | 'kindle'
  | 'msreader'
  | 'mobipocket'
  | 'nook'
  | 'sony'
  | 'sony300'
  | 'sony900'

export type CalibreOutputFormat =
  | 'azw3'
  | 'docx'
  | 'epub'
  | 'fb2'
  | 'html'
  | 'htmlz'
  | 'lit'
  | 'lrf'
  | 'mobi'
  | 'oeb'
  | 'pdb'
  | 'pdf'
  | 'pml'
  | 'rb'
  | 'rtf'
  | 'snb'
  | 'tcr'
  | 'txt'
  | 'txtz'

export type CalibreOutputProfile =
  | 'cybookg3'
  | 'cybook_opus'
  | 'default'
  | 'generic_eink'
  | 'generic_eink_hd'
  | 'generic_eink_large'
  | 'hanlinv3'
  | 'hanlinv5'
  | 'illiad'
  | 'ipad'
  | 'ipad3'
  | 'irexdr1000'
  | 'irexdr800'
  | 'jetbook5'
  | 'kindle'
  | 'kindle_dx'
  | 'kindle_fire'
  | 'kindle_oasis'
  | 'kindle_pw'
  | 'kindle_pw3'
  | 'kindle_voyage'
  | 'kobo'
  | 'msreader'
  | 'mobipocket'
  | 'nook'
  | 'nook_color'
  | 'nook_hd_plus'
  | 'pocketbook_900'
  | 'pocketbook_pro_912'
  | 'galaxy'
  | 'sony'
  | 'sony300'
  | 'sony900'
  | 'sony-landscape'
  | 'sonyt3'
  | 'tablet'

export type CallHandle = 'external' | 'remote' | 'client'
export type CheckFileTypeUsingMagicBytes = {
  input: {
    file: {
      path: string
    }
  }
}

export type Cipher =
  | 'aes_ecb'
  | 'aes_cbc'
  | 'aes_cfb'
  | 'aes_ofb'
  | 'aes_ctr'
  | 'aes_gcm'
  | '3_des_ecb'
  | '3_des_cbc'
  | 'des_ecb'
  | 'des_cbc'
export type CipherData = {
  head: string
}

export type ClangFormat = 'c' | 'cpp'

export type CliLogFormat = 'plain' | 'json' | 'pretty'
export type Command = {
  name: CommandName
  key: CommandKey
  link: Array<string>
}

export type CommandKey =
  | 'ffmpeg'
  | 'black'
  | 'asmfmt'
  | 'ktfmt'
  | 'convert'
  | 'pandoc'
  | 'java'
  | 'clang++'
  | 'clang'
  | 'llc'
  | 'clang-format'
  | 'swift-format'
  | 'swiftc'
  | 'fontforge'
  | 'mogrify'
  | '7z'
  | 'inkscape'
  | 'unar'
  | 'rar'
  | 'pdflatex'
  | 'objdump'
  | 'rustc'
  | 'rustfmt'
  | 'rubocop'
  | 'shfmt'
  | 'zip'
  | 'tar'
  | 'exiftool'
  | 'ebook-convert'
  | 'soffice'
  | 'jupyter'
  | 'docx2pdf'
  | 'unoconv'
  | 'gifsicle'
  | 'patool'
  | 'identify'
  | 'perltidy'
  | 'pdfcrop'
  | 'enscript'
  | 'ps2pdf'

export type CommandName =
  | 'ffmpeg'
  | 'black'
  | 'asmfmt'
  | 'ktfmt'
  | 'convert'
  | 'pandoc'
  | 'java'
  | 'clang++'
  | 'clang'
  | 'llc'
  | 'clang-format'
  | 'swift-format'
  | 'swiftc'
  | 'fontforge'
  | 'mogrify'
  | '7z'
  | 'inkscape'
  | 'unar'
  | 'rar'
  | 'pdflatex'
  | 'objdump'
  | 'rustc'
  | 'rustfmt'
  | 'rubocop'
  | 'shfmt'
  | 'zip'
  | 'tar'
  | 'exiftool'
  | 'ebook-convert'
  | 'soffice'
  | 'jupyter'
  | 'docx2pdf'
  | 'unoconv'
  | 'gifsicle'
  | 'patool'
  | 'identify'
  | 'perltidy'
  | 'pdfcrop'
  | 'enscript'
  | 'ps2pdf'
export type CommandSequence = {
  call: Array<Command>
}
export type CompileApi = {
  input: {
    format: string
  }
  output: {
    format: string
  }
}
export type CompileAsm = {
  input: {
    format: string
    file: {
      path: string
    }
  }
}
export type CompileCCommandInput = {
  input: {
    format: CInputFormat
    file: LocalPath
  }
  output: {
    format: BackendCompilationOutput
    file: LocalPath
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileCliBase = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}
export type CompileCppCommandInput = {
  input: {
    format: CppInputFormat
    file: LocalPath
  }
  output: {
    format: BackendCompilationOutput
    file: LocalPath
    architecture?: LlvmArchitecture
    syntax?: AssemblySyntax
  }
  pathScope?: string
  optimizationLevel?: LlvmOptimizationLevel
  fastMath?: boolean
}
export type CompileJava = {
  input: {
    format: string
    file: {
      path: string
    }
  }
}
export type CompileLlvm = {
  input: {
    format: string
    file: {
      path: string
    }
  }
}
export type CompileLlvmIrToAssembly = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    syntax?: AssemblySyntax
    architecture?: LlvmArchitecture
    file: {
      path: string
    }
  }
}
export type CompileRustCommandInput = {
  input: {
    format: RustInputFormat
    file: LocalPath
  }
  output: {
    format: RustOutputFormat
    file: LocalPath
    optimize?: boolean
    target?: RustCompilerTarget
  }
  pathScope?: string
  explain?: boolean
}
export type CompileSwiftCommandInput = {
  input: {
    format: SwiftInputFormat
    file: LocalPath
  }
  output: {
    format: BackendCompilationOutput
    file: LocalPath
  }
  pathScope?: string
}
export type CompileWastCommandInput = {
  input: {
    format: WastInputFormat
    file: LocalPath
  }
  output: {
    format: WastOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type CompressMp4WithFfmpeg = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
  audioCodec?: FfmpegCodecAudio
  videoCodec?: FfmpegCodecVideo
}

export type ConversionUnitAcre =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitAmpere =
  | 'ampere'
  | 'milliampere'
  | 'kiloampere'

export type ConversionUnitArcminute =
  | 'radian'
  | 'degree'
  | 'gradian'
  | 'arcminute'
  | 'arcsecond'

export type ConversionUnitArcsecond =
  | 'radian'
  | 'degree'
  | 'gradian'
  | 'arcminute'
  | 'arcsecond'

export type ConversionUnitBar =
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'

export type ConversionUnitBit =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitByte =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitCelsius =
  | 'celsius'
  | 'kelvin'
  | 'fahrenheit'
  | 'rankine'

export type ConversionUnitCentilitre =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCentilitrePerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCentimeter =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitCubicCentimeter =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCubicCentimeterPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicFoot =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCubicFootPerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicFootPerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicFootPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicInch =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCubicInchPerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicInchPerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicInchPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicKilometer =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCubicKilometerPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicMeter =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCubicMeterPerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicMeterPerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicMeterPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicMillimeter =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCubicMillimeterPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicYard =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCubicYardPerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicYardPerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCubicYardPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitCup =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitCupPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitDay =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitDecilitre =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitDecilitrePerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitDegree =
  | 'radian'
  | 'degree'
  | 'gradian'
  | 'arcminute'
  | 'arcsecond'

export type ConversionUnitDegreePerSecond =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitDozen = 'each' | 'dozen'

export type ConversionUnitEach = 'each' | 'dozen'

export type ConversionUnitFahrenheit =
  | 'celsius'
  | 'kelvin'
  | 'fahrenheit'
  | 'rankine'

export type ConversionUnitFluidOunce =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitFluidOuncePerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitFluidOuncePerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitFluidOuncePerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitFoot =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitFootCandle = 'lux' | 'foot-candle'

export type ConversionUnitFootPerSecond =
  | 'metre-per-second'
  | 'kilometre-per-hour'
  | 'mile-per-hour'
  | 'knot'
  | 'foot-per-second'

export type ConversionUnitGallon =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitGallonPerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitGallonPerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitGallonPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitGigabit =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitGigabyte =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitGigahertz =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitGigavoltAmpere =
  | 'volt-ampere'
  | 'millivolt-ampere'
  | 'kilovolt-ampere'
  | 'megavolt-ampere'
  | 'gigavolt-ampere'

export type ConversionUnitGigavoltAmpereReactive =
  | 'volt-ampere-reactive'
  | 'millivolt-ampere-reactive'
  | 'kilovolt-ampere-reactive'
  | 'megavolt-ampere-reactive'
  | 'gigavolt-ampere-reactive'

export type ConversionUnitGigavoltAmpereReactiveHour =
  | 'volt-ampere-reactive-hour'
  | 'millivolt-ampere-reactive-hour'
  | 'kilovolt-ampere-reactive-hour'
  | 'megavolt-ampere-reactive-hour'
  | 'gigavolt-ampere-reactive-hour'

export type ConversionUnitGigawatt =
  | 'watt'
  | 'milliwatt'
  | 'kilowatt'
  | 'megawatt'
  | 'gigawatt'

export type ConversionUnitGigawattHour =
  | 'watt-hour'
  | 'milliwatt-hour'
  | 'kilowatt-hour'
  | 'megawatt-hour'
  | 'gigawatt-hour'
  | 'joule'
  | 'kilojoule'

export type ConversionUnitGlas =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitGradian =
  | 'radian'
  | 'degree'
  | 'gradian'
  | 'arcminute'
  | 'arcsecond'

export type ConversionUnitGram =
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'

export type ConversionUnitHectare =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitHectopascal =
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'

export type ConversionUnitHertz =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitHour =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitInch =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitJoule =
  | 'watt-hour'
  | 'milliwatt-hour'
  | 'kilowatt-hour'
  | 'megawatt-hour'
  | 'gigawatt-hour'
  | 'joule'
  | 'kilojoule'

export type ConversionUnitKaffekopp =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitKanna =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitKelvin =
  | 'celsius'
  | 'kelvin'
  | 'fahrenheit'
  | 'rankine'

export type ConversionUnitKiloampere =
  | 'ampere'
  | 'milliampere'
  | 'kiloampere'

export type ConversionUnitKilobit =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitKilobyte =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitKilogram =
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'

export type ConversionUnitKilohertz =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitKilojoule =
  | 'watt-hour'
  | 'milliwatt-hour'
  | 'kilowatt-hour'
  | 'megawatt-hour'
  | 'gigawatt-hour'
  | 'joule'
  | 'kilojoule'

export type ConversionUnitKilolitre =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitKilolitrePerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitKilolitrePerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitKilolitrePerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitKilometer =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitKilometrePerHour =
  | 'metre-per-second'
  | 'kilometre-per-hour'
  | 'mile-per-hour'
  | 'knot'
  | 'foot-per-second'

export type ConversionUnitKilopascal =
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'

export type ConversionUnitKilopoundPerSquareInch =
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'

export type ConversionUnitKilovolt = 'volt' | 'millivolt' | 'kilovolt'

export type ConversionUnitKilovoltAmpere =
  | 'volt-ampere'
  | 'millivolt-ampere'
  | 'kilovolt-ampere'
  | 'megavolt-ampere'
  | 'gigavolt-ampere'

export type ConversionUnitKilovoltAmpereReactive =
  | 'volt-ampere-reactive'
  | 'millivolt-ampere-reactive'
  | 'kilovolt-ampere-reactive'
  | 'megavolt-ampere-reactive'
  | 'gigavolt-ampere-reactive'

export type ConversionUnitKilovoltAmpereReactiveHour =
  | 'volt-ampere-reactive-hour'
  | 'millivolt-ampere-reactive-hour'
  | 'kilovolt-ampere-reactive-hour'
  | 'megavolt-ampere-reactive-hour'
  | 'gigavolt-ampere-reactive-hour'

export type ConversionUnitKilowatt =
  | 'watt'
  | 'milliwatt'
  | 'kilowatt'
  | 'megawatt'
  | 'gigawatt'

export type ConversionUnitKilowattHour =
  | 'watt-hour'
  | 'milliwatt-hour'
  | 'kilowatt-hour'
  | 'megawatt-hour'
  | 'gigawatt-hour'
  | 'joule'
  | 'kilojoule'

export type ConversionUnitKnot =
  | 'metre-per-second'
  | 'kilometre-per-hour'
  | 'mile-per-hour'
  | 'knot'
  | 'foot-per-second'

export type ConversionUnitLitre =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitLitrePerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitLitrePerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitLitrePerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitLux = 'lux' | 'foot-candle'

export type ConversionUnitMatsked =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitMegabit =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitMegabyte =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitMegahertz =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitMegapascal =
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'

export type ConversionUnitMegavoltAmpere =
  | 'volt-ampere'
  | 'millivolt-ampere'
  | 'kilovolt-ampere'
  | 'megavolt-ampere'
  | 'gigavolt-ampere'

export type ConversionUnitMegavoltAmpereReactive =
  | 'volt-ampere-reactive'
  | 'millivolt-ampere-reactive'
  | 'kilovolt-ampere-reactive'
  | 'megavolt-ampere-reactive'
  | 'gigavolt-ampere-reactive'

export type ConversionUnitMegavoltAmpereReactiveHour =
  | 'volt-ampere-reactive-hour'
  | 'millivolt-ampere-reactive-hour'
  | 'kilovolt-ampere-reactive-hour'
  | 'megavolt-ampere-reactive-hour'
  | 'gigavolt-ampere-reactive-hour'

export type ConversionUnitMegawatt =
  | 'watt'
  | 'milliwatt'
  | 'kilowatt'
  | 'megawatt'
  | 'gigawatt'

export type ConversionUnitMegawattHour =
  | 'watt-hour'
  | 'milliwatt-hour'
  | 'kilowatt-hour'
  | 'megawatt-hour'
  | 'gigawatt-hour'
  | 'joule'
  | 'kilojoule'

export type ConversionUnitMeter =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitMetrePerSecond =
  | 'metre-per-second'
  | 'kilometre-per-hour'
  | 'mile-per-hour'
  | 'knot'
  | 'foot-per-second'

export type ConversionUnitMetricTonne =
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'

export type ConversionUnitMicrogram =
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'

export type ConversionUnitMicrosecond =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitMile =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitMilePerHour =
  | 'metre-per-second'
  | 'kilometre-per-hour'
  | 'mile-per-hour'
  | 'knot'
  | 'foot-per-second'

export type ConversionUnitMilliampere =
  | 'ampere'
  | 'milliampere'
  | 'kiloampere'

export type ConversionUnitMilligram =
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'

export type ConversionUnitMillihertz =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitMillilitre =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitMillilitrePerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitMillimeter =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitMillisecond =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitMillivolt = 'volt' | 'millivolt' | 'kilovolt'

export type ConversionUnitMillivoltAmpere =
  | 'volt-ampere'
  | 'millivolt-ampere'
  | 'kilovolt-ampere'
  | 'megavolt-ampere'
  | 'gigavolt-ampere'

export type ConversionUnitMillivoltAmpereReactive =
  | 'volt-ampere-reactive'
  | 'millivolt-ampere-reactive'
  | 'kilovolt-ampere-reactive'
  | 'megavolt-ampere-reactive'
  | 'gigavolt-ampere-reactive'

export type ConversionUnitMillivoltAmpereReactiveHour =
  | 'volt-ampere-reactive-hour'
  | 'millivolt-ampere-reactive-hour'
  | 'kilovolt-ampere-reactive-hour'
  | 'megavolt-ampere-reactive-hour'
  | 'gigavolt-ampere-reactive-hour'

export type ConversionUnitMilliwatt =
  | 'watt'
  | 'milliwatt'
  | 'kilowatt'
  | 'megawatt'
  | 'gigawatt'

export type ConversionUnitMilliwattHour =
  | 'watt-hour'
  | 'milliwatt-hour'
  | 'kilowatt-hour'
  | 'megawatt-hour'
  | 'gigawatt-hour'
  | 'joule'
  | 'kilojoule'

export type ConversionUnitMinute =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitMinutePerKilometre =
  | 'minute-per-kilometre'
  | 'second-per-metre'
  | 'minute-per-mile'
  | 'second-per-foot'

export type ConversionUnitMinutePerMile =
  | 'minute-per-kilometre'
  | 'second-per-metre'
  | 'minute-per-mile'
  | 'second-per-foot'

export type ConversionUnitMonth =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitNanosecond =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitOunce =
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'

export type ConversionUnitPartPerBillion =
  | 'part-per-million'
  | 'part-per-billion'
  | 'part-per-trillion'
  | 'part-per-quadrillion'

export type ConversionUnitPartPerMillion =
  | 'part-per-million'
  | 'part-per-billion'
  | 'part-per-trillion'
  | 'part-per-quadrillion'

export type ConversionUnitPartPerQuadrillion =
  | 'part-per-million'
  | 'part-per-billion'
  | 'part-per-trillion'
  | 'part-per-quadrillion'

export type ConversionUnitPartPerTrillion =
  | 'part-per-million'
  | 'part-per-billion'
  | 'part-per-trillion'
  | 'part-per-quadrillion'

export type ConversionUnitPascal =
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'

export type ConversionUnitPint =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitPintPerHour =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitPintPerMinute =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitPintPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitPound =
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'

export type ConversionUnitPoundPerSquareInch =
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'

export type ConversionUnitQuart =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitQuartPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitRadian =
  | 'radian'
  | 'degree'
  | 'gradian'
  | 'arcminute'
  | 'arcsecond'

export type ConversionUnitRadianPerSecond =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitRankine =
  | 'celsius'
  | 'kelvin'
  | 'fahrenheit'
  | 'rankine'

export type ConversionUnitRotationPerMinute =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitSecond =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitSecondPerFoot =
  | 'minute-per-kilometre'
  | 'second-per-metre'
  | 'minute-per-mile'
  | 'second-per-foot'

export type ConversionUnitSecondPerMetre =
  | 'minute-per-kilometre'
  | 'second-per-metre'
  | 'minute-per-mile'
  | 'second-per-foot'

export type ConversionUnitSquareCentimeter =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitSquareFoot =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitSquareInch =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitSquareKilometer =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitSquareMeter =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitSquareMile =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitSquareMillimeter =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitSquareYard =
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'

export type ConversionUnitTablespoon =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitTablespoonPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitTeaspoon =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitTeaspoonPerSecond =
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'

export type ConversionUnitTerabit =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitTerabyte =
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'

export type ConversionUnitTerahertz =
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'

export type ConversionUnitTesked =
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'

export type ConversionUnitTon =
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'

export type ConversionUnitTorr =
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'

export type ConversionUnitUsSurveyFoot =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitVolt = 'volt' | 'millivolt' | 'kilovolt'

export type ConversionUnitVoltAmpere =
  | 'volt-ampere'
  | 'millivolt-ampere'
  | 'kilovolt-ampere'
  | 'megavolt-ampere'
  | 'gigavolt-ampere'

export type ConversionUnitVoltAmpereReactive =
  | 'volt-ampere-reactive'
  | 'millivolt-ampere-reactive'
  | 'kilovolt-ampere-reactive'
  | 'megavolt-ampere-reactive'
  | 'gigavolt-ampere-reactive'

export type ConversionUnitVoltAmpereReactiveHour =
  | 'volt-ampere-reactive-hour'
  | 'millivolt-ampere-reactive-hour'
  | 'kilovolt-ampere-reactive-hour'
  | 'megavolt-ampere-reactive-hour'
  | 'gigavolt-ampere-reactive-hour'

export type ConversionUnitWatt =
  | 'watt'
  | 'milliwatt'
  | 'kilowatt'
  | 'megawatt'
  | 'gigawatt'

export type ConversionUnitWattHour =
  | 'watt-hour'
  | 'milliwatt-hour'
  | 'kilowatt-hour'
  | 'megawatt-hour'
  | 'gigawatt-hour'
  | 'joule'
  | 'kilojoule'

export type ConversionUnitWeek =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export type ConversionUnitYard =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'

export type ConversionUnitYear =
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
export type ConvertAcre = {
  input: {
    format: 'acre'
    value: number
  }
  output: {
    format: ConversionUnitAcre
  }
}
export type ConvertAmpere = {
  input: {
    format: 'ampere'
    value: number
  }
  output: {
    format: ConversionUnitAmpere
  }
}
export type ConvertApi = {
  input: {
    format: string
  }
  output: {
    format: string
  }
}
export type ConvertArchiveCommandInput = {
  input: {
    format: ArchiveFormat
    file: LocalPath
  }
  output: {
    format: ArchiveFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertArcminute = {
  input: {
    format: 'arcminute'
    value: number
  }
  output: {
    format: ConversionUnitArcminute
  }
}
export type ConvertArcsecond = {
  input: {
    format: 'arcsecond'
    value: number
  }
  output: {
    format: ConversionUnitArcsecond
  }
}
export type ConvertBar = {
  input: {
    format: 'bar'
    value: number
  }
  output: {
    format: ConversionUnitBar
  }
}
export type ConvertBit = {
  input: {
    format: 'bit'
    value: number
  }
  output: {
    format: ConversionUnitBit
  }
}
export type ConvertByte = {
  input: {
    format: 'byte'
    value: number
  }
  output: {
    format: ConversionUnitByte
  }
}
export type ConvertCelsius = {
  input: {
    format: 'celsius'
    value: number
  }
  output: {
    format: ConversionUnitCelsius
  }
}
export type ConvertCentilitre = {
  input: {
    format: 'centilitre'
    value: number
  }
  output: {
    format: ConversionUnitCentilitre
  }
}
export type ConvertCentilitrePerSecond = {
  input: {
    format: 'centilitre-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCentilitrePerSecond
  }
}
export type ConvertCentimeter = {
  input: {
    format: 'centimeter'
    value: number
  }
  output: {
    format: ConversionUnitCentimeter
  }
}
export type ConvertCliBase = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}
export type ConvertCubicCentimeter = {
  input: {
    format: 'cubic-centimeter'
    value: number
  }
  output: {
    format: ConversionUnitCubicCentimeter
  }
}
export type ConvertCubicCentimeterPerSecond = {
  input: {
    format: 'cubic-centimeter-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCubicCentimeterPerSecond
  }
}
export type ConvertCubicFoot = {
  input: {
    format: 'cubic-foot'
    value: number
  }
  output: {
    format: ConversionUnitCubicFoot
  }
}
export type ConvertCubicFootPerHour = {
  input: {
    format: 'cubic-foot-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitCubicFootPerHour
  }
}
export type ConvertCubicFootPerMinute = {
  input: {
    format: 'cubic-foot-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitCubicFootPerMinute
  }
}
export type ConvertCubicFootPerSecond = {
  input: {
    format: 'cubic-foot-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCubicFootPerSecond
  }
}
export type ConvertCubicInch = {
  input: {
    format: 'cubic-inch'
    value: number
  }
  output: {
    format: ConversionUnitCubicInch
  }
}
export type ConvertCubicInchPerHour = {
  input: {
    format: 'cubic-inch-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitCubicInchPerHour
  }
}
export type ConvertCubicInchPerMinute = {
  input: {
    format: 'cubic-inch-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitCubicInchPerMinute
  }
}
export type ConvertCubicInchPerSecond = {
  input: {
    format: 'cubic-inch-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCubicInchPerSecond
  }
}
export type ConvertCubicKilometer = {
  input: {
    format: 'cubic-kilometer'
    value: number
  }
  output: {
    format: ConversionUnitCubicKilometer
  }
}
export type ConvertCubicKilometerPerSecond = {
  input: {
    format: 'cubic-kilometer-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCubicKilometerPerSecond
  }
}
export type ConvertCubicMeter = {
  input: {
    format: 'cubic-meter'
    value: number
  }
  output: {
    format: ConversionUnitCubicMeter
  }
}
export type ConvertCubicMeterPerHour = {
  input: {
    format: 'cubic-meter-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitCubicMeterPerHour
  }
}
export type ConvertCubicMeterPerMinute = {
  input: {
    format: 'cubic-meter-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitCubicMeterPerMinute
  }
}
export type ConvertCubicMeterPerSecond = {
  input: {
    format: 'cubic-meter-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCubicMeterPerSecond
  }
}
export type ConvertCubicMillimeter = {
  input: {
    format: 'cubic-millimeter'
    value: number
  }
  output: {
    format: ConversionUnitCubicMillimeter
  }
}
export type ConvertCubicMillimeterPerSecond = {
  input: {
    format: 'cubic-millimeter-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCubicMillimeterPerSecond
  }
}
export type ConvertCubicYard = {
  input: {
    format: 'cubic-yard'
    value: number
  }
  output: {
    format: ConversionUnitCubicYard
  }
}
export type ConvertCubicYardPerHour = {
  input: {
    format: 'cubic-yard-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitCubicYardPerHour
  }
}
export type ConvertCubicYardPerMinute = {
  input: {
    format: 'cubic-yard-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitCubicYardPerMinute
  }
}
export type ConvertCubicYardPerSecond = {
  input: {
    format: 'cubic-yard-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCubicYardPerSecond
  }
}
export type ConvertCup = {
  input: {
    format: 'cup'
    value: number
  }
  output: {
    format: ConversionUnitCup
  }
}
export type ConvertCupPerSecond = {
  input: {
    format: 'cup-per-second'
    value: number
  }
  output: {
    format: ConversionUnitCupPerSecond
  }
}
export type ConvertDay = {
  input: {
    format: 'day'
    value: number
  }
  output: {
    format: ConversionUnitDay
  }
}
export type ConvertDecilitre = {
  input: {
    format: 'decilitre'
    value: number
  }
  output: {
    format: ConversionUnitDecilitre
  }
}
export type ConvertDecilitrePerSecond = {
  input: {
    format: 'decilitre-per-second'
    value: number
  }
  output: {
    format: ConversionUnitDecilitrePerSecond
  }
}
export type ConvertDegree = {
  input: {
    format: 'degree'
    value: number
  }
  output: {
    format: ConversionUnitDegree
  }
}
export type ConvertDegreePerSecond = {
  input: {
    format: 'degree-per-second'
    value: number
  }
  output: {
    format: ConversionUnitDegreePerSecond
  }
}
export type ConvertDocumentWithCalibreCommandInput = {
  input: {
    format: CalibreInputFormat
    file: LocalPath
  }
  output: {
    format: CalibreOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithEnscriptCommandInput = {
  input: {
    format: EnscriptInputFormat
    file: LocalPath
  }
  output: {
    format: EnscriptOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithLibreOfficeCommandInput = {
  input: {
    format: LibreOfficeInputFormat
    file: LocalPath
  }
  output: {
    format: LibreOfficeOutputFormat
    directory: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocCommandInput = {
  input: {
    format: PandocInputFormat
    file: LocalPath
  }
  output: {
    format: PandocOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDozen = {
  input: {
    format: 'dozen'
    value: number
  }
  output: {
    format: ConversionUnitDozen
  }
}
export type ConvertEach = {
  input: {
    format: 'each'
    value: number
  }
  output: {
    format: ConversionUnitEach
  }
}
export type ConvertFahrenheit = {
  input: {
    format: 'fahrenheit'
    value: number
  }
  output: {
    format: ConversionUnitFahrenheit
  }
}
export type ConvertFileBase = {
  tool?: string
  remote?: boolean
  async?: boolean
  input: {
    format: string
    file: FileContent | FilePath
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
}
export type ConvertFileBaseRemote = {
  tool?: string
  remote?: boolean
  async?: boolean
  input: {
    format: string
    file: FileContent | FilePath
  }
  output: {
    format: string
  }
}
export type ConvertFluidOunce = {
  input: {
    format: 'fluid-ounce'
    value: number
  }
  output: {
    format: ConversionUnitFluidOunce
  }
}
export type ConvertFluidOuncePerHour = {
  input: {
    format: 'fluid-ounce-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitFluidOuncePerHour
  }
}
export type ConvertFluidOuncePerMinute = {
  input: {
    format: 'fluid-ounce-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitFluidOuncePerMinute
  }
}
export type ConvertFluidOuncePerSecond = {
  input: {
    format: 'fluid-ounce-per-second'
    value: number
  }
  output: {
    format: ConversionUnitFluidOuncePerSecond
  }
}
export type ConvertFontWithFontForgeCommandInput = {
  input: {
    format: FontFormat
    file: LocalPath
  }
  output: {
    format: FontFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertFoot = {
  input: {
    format: 'foot'
    value: number
  }
  output: {
    format: ConversionUnitFoot
  }
}
export type ConvertFootCandle = {
  input: {
    format: 'foot-candle'
    value: number
  }
  output: {
    format: ConversionUnitFootCandle
  }
}
export type ConvertFootPerSecond = {
  input: {
    format: 'foot-per-second'
    value: number
  }
  output: {
    format: ConversionUnitFootPerSecond
  }
}
export type ConvertGallon = {
  input: {
    format: 'gallon'
    value: number
  }
  output: {
    format: ConversionUnitGallon
  }
}
export type ConvertGallonPerHour = {
  input: {
    format: 'gallon-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitGallonPerHour
  }
}
export type ConvertGallonPerMinute = {
  input: {
    format: 'gallon-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitGallonPerMinute
  }
}
export type ConvertGallonPerSecond = {
  input: {
    format: 'gallon-per-second'
    value: number
  }
  output: {
    format: ConversionUnitGallonPerSecond
  }
}
export type ConvertGigabit = {
  input: {
    format: 'gigabit'
    value: number
  }
  output: {
    format: ConversionUnitGigabit
  }
}
export type ConvertGigabyte = {
  input: {
    format: 'gigabyte'
    value: number
  }
  output: {
    format: ConversionUnitGigabyte
  }
}
export type ConvertGigahertz = {
  input: {
    format: 'gigahertz'
    value: number
  }
  output: {
    format: ConversionUnitGigahertz
  }
}
export type ConvertGigavoltAmpere = {
  input: {
    format: 'gigavolt-ampere'
    value: number
  }
  output: {
    format: ConversionUnitGigavoltAmpere
  }
}
export type ConvertGigavoltAmpereReactive = {
  input: {
    format: 'gigavolt-ampere-reactive'
    value: number
  }
  output: {
    format: ConversionUnitGigavoltAmpereReactive
  }
}
export type ConvertGigavoltAmpereReactiveHour = {
  input: {
    format: 'gigavolt-ampere-reactive-hour'
    value: number
  }
  output: {
    format: ConversionUnitGigavoltAmpereReactiveHour
  }
}
export type ConvertGigawatt = {
  input: {
    format: 'gigawatt'
    value: number
  }
  output: {
    format: ConversionUnitGigawatt
  }
}
export type ConvertGigawattHour = {
  input: {
    format: 'gigawatt-hour'
    value: number
  }
  output: {
    format: ConversionUnitGigawattHour
  }
}
export type ConvertGlas = {
  input: {
    format: 'glas'
    value: number
  }
  output: {
    format: ConversionUnitGlas
  }
}
export type ConvertGradian = {
  input: {
    format: 'gradian'
    value: number
  }
  output: {
    format: ConversionUnitGradian
  }
}
export type ConvertGram = {
  input: {
    format: 'gram'
    value: number
  }
  output: {
    format: ConversionUnitGram
  }
}
export type ConvertHectare = {
  input: {
    format: 'hectare'
    value: number
  }
  output: {
    format: ConversionUnitHectare
  }
}
export type ConvertHectopascal = {
  input: {
    format: 'hectopascal'
    value: number
  }
  output: {
    format: ConversionUnitHectopascal
  }
}
export type ConvertHertz = {
  input: {
    format: 'hertz'
    value: number
  }
  output: {
    format: ConversionUnitHertz
  }
}
export type ConvertHour = {
  input: {
    format: 'hour'
    value: number
  }
  output: {
    format: ConversionUnitHour
  }
}
export type ConvertHtmlWithPuppeteerCommandInput = {
  input: {
    format: PuppeteerInputFormat
    file: LocalPath
  }
  output: {
    format: PuppeteerOutputFormat
    file: LocalPath
  }
  pathScope?: string
  viewport: {
    width?: number
    height?: number
  }
  proxy?: string
  waitUntil?: PuppeteerLifeCycleEvent
}
export type ConvertImageWithImageMagickCommandInput = {
  input: {
    format: ImageMagickInputFormat
    file: LocalPath
  }
  output: {
    format: ImageMagickOutputFormat
    file: LocalPath
  }
  pathScope?: string
  colorCount?: number
  colorMatrix?: ImageMagicColorMatrix
  colorSpace?: ImageMagickColorSpace
  compare?: boolean
  compression?: ImageMagickCompression
  density?: number
  quality?: number
}
export type ConvertImageWithInkscapeCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertInch = {
  input: {
    format: 'inch'
    value: number
  }
  output: {
    format: ConversionUnitInch
  }
}
export type ConvertJoule = {
  input: {
    format: 'joule'
    value: number
  }
  output: {
    format: ConversionUnitJoule
  }
}
export type ConvertKaffekopp = {
  input: {
    format: 'kaffekopp'
    value: number
  }
  output: {
    format: ConversionUnitKaffekopp
  }
}
export type ConvertKanna = {
  input: {
    format: 'kanna'
    value: number
  }
  output: {
    format: ConversionUnitKanna
  }
}
export type ConvertKelvin = {
  input: {
    format: 'kelvin'
    value: number
  }
  output: {
    format: ConversionUnitKelvin
  }
}
export type ConvertKiloampere = {
  input: {
    format: 'kiloampere'
    value: number
  }
  output: {
    format: ConversionUnitKiloampere
  }
}
export type ConvertKilobit = {
  input: {
    format: 'kilobit'
    value: number
  }
  output: {
    format: ConversionUnitKilobit
  }
}
export type ConvertKilobyte = {
  input: {
    format: 'kilobyte'
    value: number
  }
  output: {
    format: ConversionUnitKilobyte
  }
}
export type ConvertKilogram = {
  input: {
    format: 'kilogram'
    value: number
  }
  output: {
    format: ConversionUnitKilogram
  }
}
export type ConvertKilohertz = {
  input: {
    format: 'kilohertz'
    value: number
  }
  output: {
    format: ConversionUnitKilohertz
  }
}
export type ConvertKilojoule = {
  input: {
    format: 'kilojoule'
    value: number
  }
  output: {
    format: ConversionUnitKilojoule
  }
}
export type ConvertKilolitre = {
  input: {
    format: 'kilolitre'
    value: number
  }
  output: {
    format: ConversionUnitKilolitre
  }
}
export type ConvertKilolitrePerHour = {
  input: {
    format: 'kilolitre-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitKilolitrePerHour
  }
}
export type ConvertKilolitrePerMinute = {
  input: {
    format: 'kilolitre-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitKilolitrePerMinute
  }
}
export type ConvertKilolitrePerSecond = {
  input: {
    format: 'kilolitre-per-second'
    value: number
  }
  output: {
    format: ConversionUnitKilolitrePerSecond
  }
}
export type ConvertKilometer = {
  input: {
    format: 'kilometer'
    value: number
  }
  output: {
    format: ConversionUnitKilometer
  }
}
export type ConvertKilometrePerHour = {
  input: {
    format: 'kilometre-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitKilometrePerHour
  }
}
export type ConvertKilopascal = {
  input: {
    format: 'kilopascal'
    value: number
  }
  output: {
    format: ConversionUnitKilopascal
  }
}
export type ConvertKilopoundPerSquareInch = {
  input: {
    format: 'kilopound-per-square-inch'
    value: number
  }
  output: {
    format: ConversionUnitKilopoundPerSquareInch
  }
}
export type ConvertKilovolt = {
  input: {
    format: 'kilovolt'
    value: number
  }
  output: {
    format: ConversionUnitKilovolt
  }
}
export type ConvertKilovoltAmpere = {
  input: {
    format: 'kilovolt-ampere'
    value: number
  }
  output: {
    format: ConversionUnitKilovoltAmpere
  }
}
export type ConvertKilovoltAmpereReactive = {
  input: {
    format: 'kilovolt-ampere-reactive'
    value: number
  }
  output: {
    format: ConversionUnitKilovoltAmpereReactive
  }
}
export type ConvertKilovoltAmpereReactiveHour = {
  input: {
    format: 'kilovolt-ampere-reactive-hour'
    value: number
  }
  output: {
    format: ConversionUnitKilovoltAmpereReactiveHour
  }
}
export type ConvertKilowatt = {
  input: {
    format: 'kilowatt'
    value: number
  }
  output: {
    format: ConversionUnitKilowatt
  }
}
export type ConvertKilowattHour = {
  input: {
    format: 'kilowatt-hour'
    value: number
  }
  output: {
    format: ConversionUnitKilowattHour
  }
}
export type ConvertKnot = {
  input: {
    format: 'knot'
    value: number
  }
  output: {
    format: ConversionUnitKnot
  }
}
export type ConvertLatexToPngCommandInput = {
  input: {
    format: ConvertLatexToPngInputFormat
    file: LocalPath
  }
  output: {
    format: ConvertLatexToPngOutputFormat
    file: LocalPath
  }
  pathScope?: string
}

export type ConvertLatexToPngInputFormat = 'tex'

export type ConvertLatexToPngOutputFormat = 'png'
export type ConvertLatexWithPdfLatexCommandInput = {
  input: {
    format: PdfLatexInputFormat
    file: LocalPath
  }
  output: {
    format: PdfLatexOutputFormat
    directory: LocalPath
  }
  pathScope?: string
}
export type ConvertLitre = {
  input: {
    format: 'litre'
    value: number
  }
  output: {
    format: ConversionUnitLitre
  }
}
export type ConvertLitrePerHour = {
  input: {
    format: 'litre-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitLitrePerHour
  }
}
export type ConvertLitrePerMinute = {
  input: {
    format: 'litre-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitLitrePerMinute
  }
}
export type ConvertLitrePerSecond = {
  input: {
    format: 'litre-per-second'
    value: number
  }
  output: {
    format: ConversionUnitLitrePerSecond
  }
}
export type ConvertLux = {
  input: {
    format: 'lux'
    value: number
  }
  output: {
    format: ConversionUnitLux
  }
}
export type ConvertMatsked = {
  input: {
    format: 'matsked'
    value: number
  }
  output: {
    format: ConversionUnitMatsked
  }
}
export type ConvertMegabit = {
  input: {
    format: 'megabit'
    value: number
  }
  output: {
    format: ConversionUnitMegabit
  }
}
export type ConvertMegabyte = {
  input: {
    format: 'megabyte'
    value: number
  }
  output: {
    format: ConversionUnitMegabyte
  }
}
export type ConvertMegahertz = {
  input: {
    format: 'megahertz'
    value: number
  }
  output: {
    format: ConversionUnitMegahertz
  }
}
export type ConvertMegapascal = {
  input: {
    format: 'megapascal'
    value: number
  }
  output: {
    format: ConversionUnitMegapascal
  }
}
export type ConvertMegavoltAmpere = {
  input: {
    format: 'megavolt-ampere'
    value: number
  }
  output: {
    format: ConversionUnitMegavoltAmpere
  }
}
export type ConvertMegavoltAmpereReactive = {
  input: {
    format: 'megavolt-ampere-reactive'
    value: number
  }
  output: {
    format: ConversionUnitMegavoltAmpereReactive
  }
}
export type ConvertMegavoltAmpereReactiveHour = {
  input: {
    format: 'megavolt-ampere-reactive-hour'
    value: number
  }
  output: {
    format: ConversionUnitMegavoltAmpereReactiveHour
  }
}
export type ConvertMegawatt = {
  input: {
    format: 'megawatt'
    value: number
  }
  output: {
    format: ConversionUnitMegawatt
  }
}
export type ConvertMegawattHour = {
  input: {
    format: 'megawatt-hour'
    value: number
  }
  output: {
    format: ConversionUnitMegawattHour
  }
}
export type ConvertMeter = {
  input: {
    format: 'meter'
    value: number
  }
  output: {
    format: ConversionUnitMeter
  }
}
export type ConvertMetrePerSecond = {
  input: {
    format: 'metre-per-second'
    value: number
  }
  output: {
    format: ConversionUnitMetrePerSecond
  }
}
export type ConvertMetricTonne = {
  input: {
    format: 'metric-tonne'
    value: number
  }
  output: {
    format: ConversionUnitMetricTonne
  }
}
export type ConvertMicrogram = {
  input: {
    format: 'microgram'
    value: number
  }
  output: {
    format: ConversionUnitMicrogram
  }
}
export type ConvertMicrosecond = {
  input: {
    format: 'microsecond'
    value: number
  }
  output: {
    format: ConversionUnitMicrosecond
  }
}
export type ConvertMile = {
  input: {
    format: 'mile'
    value: number
  }
  output: {
    format: ConversionUnitMile
  }
}
export type ConvertMilePerHour = {
  input: {
    format: 'mile-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitMilePerHour
  }
}
export type ConvertMilliampere = {
  input: {
    format: 'milliampere'
    value: number
  }
  output: {
    format: ConversionUnitMilliampere
  }
}
export type ConvertMilligram = {
  input: {
    format: 'milligram'
    value: number
  }
  output: {
    format: ConversionUnitMilligram
  }
}
export type ConvertMillihertz = {
  input: {
    format: 'millihertz'
    value: number
  }
  output: {
    format: ConversionUnitMillihertz
  }
}
export type ConvertMillilitre = {
  input: {
    format: 'millilitre'
    value: number
  }
  output: {
    format: ConversionUnitMillilitre
  }
}
export type ConvertMillilitrePerSecond = {
  input: {
    format: 'millilitre-per-second'
    value: number
  }
  output: {
    format: ConversionUnitMillilitrePerSecond
  }
}
export type ConvertMillimeter = {
  input: {
    format: 'millimeter'
    value: number
  }
  output: {
    format: ConversionUnitMillimeter
  }
}
export type ConvertMillisecond = {
  input: {
    format: 'millisecond'
    value: number
  }
  output: {
    format: ConversionUnitMillisecond
  }
}
export type ConvertMillivolt = {
  input: {
    format: 'millivolt'
    value: number
  }
  output: {
    format: ConversionUnitMillivolt
  }
}
export type ConvertMillivoltAmpere = {
  input: {
    format: 'millivolt-ampere'
    value: number
  }
  output: {
    format: ConversionUnitMillivoltAmpere
  }
}
export type ConvertMillivoltAmpereReactive = {
  input: {
    format: 'millivolt-ampere-reactive'
    value: number
  }
  output: {
    format: ConversionUnitMillivoltAmpereReactive
  }
}
export type ConvertMillivoltAmpereReactiveHour = {
  input: {
    format: 'millivolt-ampere-reactive-hour'
    value: number
  }
  output: {
    format: ConversionUnitMillivoltAmpereReactiveHour
  }
}
export type ConvertMilliwatt = {
  input: {
    format: 'milliwatt'
    value: number
  }
  output: {
    format: ConversionUnitMilliwatt
  }
}
export type ConvertMilliwattHour = {
  input: {
    format: 'milliwatt-hour'
    value: number
  }
  output: {
    format: ConversionUnitMilliwattHour
  }
}
export type ConvertMinute = {
  input: {
    format: 'minute'
    value: number
  }
  output: {
    format: ConversionUnitMinute
  }
}
export type ConvertMinutePerKilometre = {
  input: {
    format: 'minute-per-kilometre'
    value: number
  }
  output: {
    format: ConversionUnitMinutePerKilometre
  }
}
export type ConvertMinutePerMile = {
  input: {
    format: 'minute-per-mile'
    value: number
  }
  output: {
    format: ConversionUnitMinutePerMile
  }
}
export type ConvertMonth = {
  input: {
    format: 'month'
    value: number
  }
  output: {
    format: ConversionUnitMonth
  }
}
export type ConvertMp4ToGifWithFfmpeg = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
  fps: number
  width: number
  startTime: number | string
  endTime: number | string
  duration: number | string
}
export type ConvertNanosecond = {
  input: {
    format: 'nanosecond'
    value: number
  }
  output: {
    format: ConversionUnitNanosecond
  }
}
export type ConvertOunce = {
  input: {
    format: 'ounce'
    value: number
  }
  output: {
    format: ConversionUnitOunce
  }
}
export type ConvertPartPerBillion = {
  input: {
    format: 'part-per-billion'
    value: number
  }
  output: {
    format: ConversionUnitPartPerBillion
  }
}
export type ConvertPartPerMillion = {
  input: {
    format: 'part-per-million'
    value: number
  }
  output: {
    format: ConversionUnitPartPerMillion
  }
}
export type ConvertPartPerQuadrillion = {
  input: {
    format: 'part-per-quadrillion'
    value: number
  }
  output: {
    format: ConversionUnitPartPerQuadrillion
  }
}
export type ConvertPartPerTrillion = {
  input: {
    format: 'part-per-trillion'
    value: number
  }
  output: {
    format: ConversionUnitPartPerTrillion
  }
}
export type ConvertPascal = {
  input: {
    format: 'pascal'
    value: number
  }
  output: {
    format: ConversionUnitPascal
  }
}
export type ConvertPint = {
  input: {
    format: 'pint'
    value: number
  }
  output: {
    format: ConversionUnitPint
  }
}
export type ConvertPintPerHour = {
  input: {
    format: 'pint-per-hour'
    value: number
  }
  output: {
    format: ConversionUnitPintPerHour
  }
}
export type ConvertPintPerMinute = {
  input: {
    format: 'pint-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitPintPerMinute
  }
}
export type ConvertPintPerSecond = {
  input: {
    format: 'pint-per-second'
    value: number
  }
  output: {
    format: ConversionUnitPintPerSecond
  }
}
export type ConvertPound = {
  input: {
    format: 'pound'
    value: number
  }
  output: {
    format: ConversionUnitPound
  }
}
export type ConvertPoundPerSquareInch = {
  input: {
    format: 'pound-per-square-inch'
    value: number
  }
  output: {
    format: ConversionUnitPoundPerSquareInch
  }
}
export type ConvertQuart = {
  input: {
    format: 'quart'
    value: number
  }
  output: {
    format: ConversionUnitQuart
  }
}
export type ConvertQuartPerSecond = {
  input: {
    format: 'quart-per-second'
    value: number
  }
  output: {
    format: ConversionUnitQuartPerSecond
  }
}
export type ConvertRadian = {
  input: {
    format: 'radian'
    value: number
  }
  output: {
    format: ConversionUnitRadian
  }
}
export type ConvertRadianPerSecond = {
  input: {
    format: 'radian-per-second'
    value: number
  }
  output: {
    format: ConversionUnitRadianPerSecond
  }
}
export type ConvertRankine = {
  input: {
    format: 'rankine'
    value: number
  }
  output: {
    format: ConversionUnitRankine
  }
}
export type ConvertRotationPerMinute = {
  input: {
    format: 'rotation-per-minute'
    value: number
  }
  output: {
    format: ConversionUnitRotationPerMinute
  }
}
export type ConvertSecond = {
  input: {
    format: 'second'
    value: number
  }
  output: {
    format: ConversionUnitSecond
  }
}
export type ConvertSecondPerFoot = {
  input: {
    format: 'second-per-foot'
    value: number
  }
  output: {
    format: ConversionUnitSecondPerFoot
  }
}
export type ConvertSecondPerMetre = {
  input: {
    format: 'second-per-metre'
    value: number
  }
  output: {
    format: ConversionUnitSecondPerMetre
  }
}
export type ConvertSquareCentimeter = {
  input: {
    format: 'square-centimeter'
    value: number
  }
  output: {
    format: ConversionUnitSquareCentimeter
  }
}
export type ConvertSquareFoot = {
  input: {
    format: 'square-foot'
    value: number
  }
  output: {
    format: ConversionUnitSquareFoot
  }
}
export type ConvertSquareInch = {
  input: {
    format: 'square-inch'
    value: number
  }
  output: {
    format: ConversionUnitSquareInch
  }
}
export type ConvertSquareKilometer = {
  input: {
    format: 'square-kilometer'
    value: number
  }
  output: {
    format: ConversionUnitSquareKilometer
  }
}
export type ConvertSquareMeter = {
  input: {
    format: 'square-meter'
    value: number
  }
  output: {
    format: ConversionUnitSquareMeter
  }
}
export type ConvertSquareMile = {
  input: {
    format: 'square-mile'
    value: number
  }
  output: {
    format: ConversionUnitSquareMile
  }
}
export type ConvertSquareMillimeter = {
  input: {
    format: 'square-millimeter'
    value: number
  }
  output: {
    format: ConversionUnitSquareMillimeter
  }
}
export type ConvertSquareYard = {
  input: {
    format: 'square-yard'
    value: number
  }
  output: {
    format: ConversionUnitSquareYard
  }
}
export type ConvertTablespoon = {
  input: {
    format: 'tablespoon'
    value: number
  }
  output: {
    format: ConversionUnitTablespoon
  }
}
export type ConvertTablespoonPerSecond = {
  input: {
    format: 'tablespoon-per-second'
    value: number
  }
  output: {
    format: ConversionUnitTablespoonPerSecond
  }
}
export type ConvertTeaspoon = {
  input: {
    format: 'teaspoon'
    value: number
  }
  output: {
    format: ConversionUnitTeaspoon
  }
}
export type ConvertTeaspoonPerSecond = {
  input: {
    format: 'teaspoon-per-second'
    value: number
  }
  output: {
    format: ConversionUnitTeaspoonPerSecond
  }
}
export type ConvertTerabit = {
  input: {
    format: 'terabit'
    value: number
  }
  output: {
    format: ConversionUnitTerabit
  }
}
export type ConvertTerabyte = {
  input: {
    format: 'terabyte'
    value: number
  }
  output: {
    format: ConversionUnitTerabyte
  }
}
export type ConvertTerahertz = {
  input: {
    format: 'terahertz'
    value: number
  }
  output: {
    format: ConversionUnitTerahertz
  }
}
export type ConvertTesked = {
  input: {
    format: 'tesked'
    value: number
  }
  output: {
    format: ConversionUnitTesked
  }
}
export type ConvertTimeZone = {
  input: {
    date: string
  }
  output: {
    timezone: TimeZone
    format: string
  }
}
export type ConvertTon = {
  input: {
    format: 'ton'
    value: number
  }
  output: {
    format: ConversionUnitTon
  }
}
export type ConvertTorr = {
  input: {
    format: 'torr'
    value: number
  }
  output: {
    format: ConversionUnitTorr
  }
}
export type ConvertUnit = {
  input: {
    format: Unit
    value: number
  }
  output: {
    format: Unit
  }
}
export type ConvertUsSurveyFoot = {
  input: {
    format: 'us-survey-foot'
    value: number
  }
  output: {
    format: ConversionUnitUsSurveyFoot
  }
}
export type ConvertVideoToAudioWithFfmpeg = {
  inputPath: string
  outputPath: string
}
export type ConvertVideoWithFfmpegBase = {
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
export type ConvertVideoWithFfmpegCommandInput = {
  input: {
    format: FfmpegFormat
    file: LocalPath
  }
  output: {
    format: FfmpegFormat
    file: LocalPath
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
export type ConvertVolt = {
  input: {
    format: 'volt'
    value: number
  }
  output: {
    format: ConversionUnitVolt
  }
}
export type ConvertVoltAmpere = {
  input: {
    format: 'volt-ampere'
    value: number
  }
  output: {
    format: ConversionUnitVoltAmpere
  }
}
export type ConvertVoltAmpereReactive = {
  input: {
    format: 'volt-ampere-reactive'
    value: number
  }
  output: {
    format: ConversionUnitVoltAmpereReactive
  }
}
export type ConvertVoltAmpereReactiveHour = {
  input: {
    format: 'volt-ampere-reactive-hour'
    value: number
  }
  output: {
    format: ConversionUnitVoltAmpereReactiveHour
  }
}
export type ConvertWatt = {
  input: {
    format: 'watt'
    value: number
  }
  output: {
    format: ConversionUnitWatt
  }
}
export type ConvertWattHour = {
  input: {
    format: 'watt-hour'
    value: number
  }
  output: {
    format: ConversionUnitWattHour
  }
}
export type ConvertWeek = {
  input: {
    format: 'week'
    value: number
  }
  output: {
    format: ConversionUnitWeek
  }
}
export type ConvertYard = {
  input: {
    format: 'yard'
    value: number
  }
  output: {
    format: ConversionUnitYard
  }
}
export type ConvertYear = {
  input: {
    format: 'year'
    value: number
  }
  output: {
    format: ConversionUnitYear
  }
}

export type CppInputFormat = 'cpp'
export type CropPdfWithPdfCrop = {
  margin?: number
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type DisassembleBinaryWithObjdump = {
  show: Array<ObjdumpShowOption>
  demangleStyle: ObjdumpDemangleStyle
  disassembleAll: boolean
  hide: ObjdumpHideOption
  color: boolean
}

export type EnscriptInputFormat = 'txt'

export type EnscriptOutputFormat = 'html' | 'ps' | 'rtf'
export type ExiftoolFamilyData = {
  head: string
  family: Array<number>
}
export type ExiftoolImageFormatData = {
  head: string
  read?: boolean
  write?: boolean
  create?: boolean
}
export type ExiftoolTagData = {
  head: string
}
export type ExtractWith7Z = {
  input: {
    format: string
    path: string
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
}
export type ExtractWithUnarchiver = {
  input: {
    password?: string
    format: ArchiveFormat
    file: {
      path: string
    }
  }
  output: {
    overwrite?: boolean
    directory: {
      path: string
    }
  }
}

export type FfmpegCodecAudio =
  | '4gv'
  | '8svx_exp'
  | '8svx_fib'
  | 'aac'
  | 'aac_latm'
  | 'ac3'
  | 'ac4'
  | 'acelp.kelvin'
  | 'adpcm_4xm'
  | 'adpcm_adx'
  | 'adpcm_afc'
  | 'adpcm_agm'
  | 'adpcm_aica'
  | 'adpcm_argo'
  | 'adpcm_ct'
  | 'adpcm_dtk'
  | 'adpcm_ea'
  | 'adpcm_ea_maxis_xa'
  | 'adpcm_ea_r1'
  | 'adpcm_ea_r2'
  | 'adpcm_ea_r3'
  | 'adpcm_ea_xas'
  | 'adpcm_g722'
  | 'adpcm_g726'
  | 'adpcm_g726le'
  | 'adpcm_ima_acorn'
  | 'adpcm_ima_alp'
  | 'adpcm_ima_amv'
  | 'adpcm_ima_apc'
  | 'adpcm_ima_apm'
  | 'adpcm_ima_cunning'
  | 'adpcm_ima_dat4'
  | 'adpcm_ima_dk3'
  | 'adpcm_ima_dk4'
  | 'adpcm_ima_ea_eacs'
  | 'adpcm_ima_ea_sead'
  | 'adpcm_ima_iss'
  | 'adpcm_ima_moflex'
  | 'adpcm_ima_mtf'
  | 'adpcm_ima_oki'
  | 'adpcm_ima_qt'
  | 'adpcm_ima_rad'
  | 'adpcm_ima_smjpeg'
  | 'adpcm_ima_ssi'
  | 'adpcm_ima_wav'
  | 'adpcm_ima_ws'
  | 'adpcm_ms'
  | 'adpcm_mtaf'
  | 'adpcm_psx'
  | 'adpcm_sbpro_2'
  | 'adpcm_sbpro_3'
  | 'adpcm_sbpro_4'
  | 'adpcm_swf'
  | 'adpcm_thp'
  | 'adpcm_thp_le'
  | 'adpcm_vima'
  | 'adpcm_xa'
  | 'adpcm_xmd'
  | 'adpcm_yamaha'
  | 'adpcm_zork'
  | 'alac'
  | 'amr_nb'
  | 'amr_wb'
  | 'anull'
  | 'apac'
  | 'ape'
  | 'aptx'
  | 'aptx_hd'
  | 'atrac1'
  | 'atrac3'
  | 'atrac3al'
  | 'atrac3p'
  | 'atrac3pal'
  | 'atrac9'
  | 'avc'
  | 'binkaudio_dct'
  | 'binkaudio_rdft'
  | 'bmv_audio'
  | 'bonk'
  | 'cbd2_dpcm'
  | 'celt'
  | 'codec2'
  | 'comfortnoise'
  | 'cook'
  | 'derf_dpcm'
  | 'dfpwm'
  | 'dolby_e'
  | 'dsd_lsbf'
  | 'dsd_lsbf_planar'
  | 'dsd_msbf'
  | 'dsd_msbf_planar'
  | 'dsicinaudio'
  | 'dss_sp'
  | 'dst'
  | 'dts'
  | 'dvaudio'
  | 'eac3'
  | 'evrc'
  | 'fastaudio'
  | 'flac'
  | 'ftr'
  | 'g723_1'
  | 'g729'
  | 'gremlin_dpcm'
  | 'gsm'
  | 'gsm_ms'
  | 'hca'
  | 'hcom'
  | 'iac'
  | 'ilbc'
  | 'imc'
  | 'interplay_dpcm'
  | 'interplayacm'
  | 'mace3'
  | 'mace6'
  | 'metasound'
  | 'misc4'
  | 'mlp'
  | 'mp1'
  | 'mp2'
  | 'mp3'
  | 'mp3adu'
  | 'mp3on4'
  | 'mp4als'
  | 'mpegh_3d_audio'
  | 'msnsiren'
  | 'musepack7'
  | 'musepack8'
  | 'nellymoser'
  | 'opus'
  | 'osq'
  | 'paf_audio'
  | 'pcm_alaw'
  | 'pcm_bluray'
  | 'pcm_dvd'
  | 'pcm_f16le'
  | 'pcm_f24le'
  | 'pcm_f32be'
  | 'pcm_f32le'
  | 'pcm_f64be'
  | 'pcm_f64le'
  | 'pcm_lxf'
  | 'pcm_mulaw'
  | 'pcm_s16be'
  | 'pcm_s16be_planar'
  | 'pcm_s16le'
  | 'pcm_s16le_planar'
  | 'pcm_s24be'
  | 'pcm_s24daud'
  | 'pcm_s24le'
  | 'pcm_s24le_planar'
  | 'pcm_s32be'
  | 'pcm_s32le'
  | 'pcm_s32le_planar'
  | 'pcm_s64be'
  | 'pcm_s64le'
  | 'pcm_s8'
  | 'pcm_s8_planar'
  | 'pcm_sga'
  | 'pcm_u16be'
  | 'pcm_u16le'
  | 'pcm_u24be'
  | 'pcm_u24le'
  | 'pcm_u32be'
  | 'pcm_u32le'
  | 'pcm_u8'
  | 'pcm_vidc'
  | 'qcelp'
  | 'qdm2'
  | 'qdmc'
  | 'ra_144'
  | 'ra_288'
  | 'ralf'
  | 'rka'
  | 'roq_dpcm'
  | 's302m'
  | 'sbc'
  | 'sdx2_dpcm'
  | 'shorten'
  | 'sipr'
  | 'siren'
  | 'smackaudio'
  | 'smv'
  | 'sol_dpcm'
  | 'sonic'
  | 'sonicls'
  | 'speex'
  | 'tak'
  | 'truehd'
  | 'truespeech'
  | 'tta'
  | 'twinvq'
  | 'vmdaudio'
  | 'vorbis'
  | 'wady_dpcm'
  | 'wavarc'
  | 'wavesynth'
  | 'wavpack'
  | 'westwood_snd1'
  | 'wmalossless'
  | 'wmapro'
  | 'wmav1'
  | 'wmav2'
  | 'wmavoice'
  | 'xan_dpcm'
  | 'xma1'
  | 'xma2'
export type FfmpegCodecData = {
  label: string
  type?: string
  supportsDecoding: boolean
  supportsEncoding: boolean
  intraFrameOnly: boolean
  lossy: boolean
  lossless: boolean
}

export type FfmpegCodecSubtitle =
  | 'arib_caption'
  | 'ass'
  | 'dvb_subtitle'
  | 'dvb_teletext'
  | 'dvd_subtitle'
  | 'eia_608'
  | 'hdmv_pgs_subtitle'
  | 'hdmv_text_subtitle'
  | 'jacosub'
  | 'microdvd'
  | 'mov_text'
  | 'mpl2'
  | 'pjs'
  | 'realtext'
  | 'sami'
  | 'srt'
  | 'ssa'
  | 'stl'
  | 'subrip'
  | 'subviewer'
  | 'subviewer1'
  | 'text'
  | 'ttml'
  | 'vplayer'
  | 'webvtt'
  | 'xsub'

export type FfmpegCodecVideo =
  | '012v'
  | '4xm'
  | '8bps'
  | 'a64_multi'
  | 'a64_multi5'
  | 'aasc'
  | 'agm'
  | 'aic'
  | 'alias_pix'
  | 'amv'
  | 'anm'
  | 'ansi'
  | 'apng'
  | 'arbc'
  | 'argo'
  | 'asv1'
  | 'asv2'
  | 'aura'
  | 'aura2'
  | 'av1'
  | 'avrn'
  | 'avrp'
  | 'avs'
  | 'avs2'
  | 'avs3'
  | 'avui'
  | 'ayuv'
  | 'bethsoftvid'
  | 'bfi'
  | 'binkvideo'
  | 'bintext'
  | 'bitpacked'
  | 'bmp'
  | 'bmv_video'
  | 'brender_pix'
  | 'c93'
  | 'cavs'
  | 'cdgraphics'
  | 'cdtoons'
  | 'cdxl'
  | 'cfhd'
  | 'cinepak'
  | 'clearvideo'
  | 'cljr'
  | 'cllc'
  | 'cmv'
  | 'cpia'
  | 'cri'
  | 'cscd'
  | 'cyuv'
  | 'daala'
  | 'dds'
  | 'dfa'
  | 'dirac'
  | 'dnxhd'
  | 'dpx'
  | 'dsicinvideo'
  | 'dvvideo'
  | 'dxa'
  | 'dxtory'
  | 'dxv'
  | 'escape124'
  | 'escape130'
  | 'evc'
  | 'exr'
  | 'ffv1'
  | 'ffvhuff'
  | 'fic'
  | 'fits'
  | 'flashsv'
  | 'flashsv2'
  | 'flic'
  | 'flv1'
  | 'fmvc'
  | 'fraps'
  | 'frwu'
  | 'g2m'
  | 'gdv'
  | 'gem'
  | 'gif'
  | 'h261'
  | 'h263'
  | 'h263i'
  | 'h263p'
  | 'h264'
  | 'hap'
  | 'hdr'
  | 'hevc'
  | 'hnm4video'
  | 'hq_hqa'
  | 'hqx'
  | 'huffyuv'
  | 'hymt'
  | 'idcin'
  | 'idf'
  | 'iff_ilbm'
  | 'imm4'
  | 'imm5'
  | 'indeo2'
  | 'indeo3'
  | 'indeo4'
  | 'indeo5'
  | 'interplayvideo'
  | 'ipu'
  | 'jpeg2000'
  | 'jpegls'
  | 'jpegxl'
  | 'jv'
  | 'kgv1'
  | 'kmvc'
  | 'lagarith'
  | 'ljpeg'
  | 'loco'
  | 'lscr'
  | 'm101'
  | 'mad'
  | 'magicyuv'
  | 'mdec'
  | 'media100'
  | 'mimic'
  | 'mjpeg'
  | 'mjpegb'
  | 'mmvideo'
  | 'mobiclip'
  | 'motionpixels'
  | 'mpeg1video'
  | 'mpeg2video'
  | 'mpeg4'
  | 'msa1'
  | 'mscc'
  | 'msmpeg4v1'
  | 'msmpeg4v2'
  | 'msmpeg4v3'
  | 'msp2'
  | 'msrle'
  | 'mss1'
  | 'mss2'
  | 'msvideo1'
  | 'mszh'
  | 'mts2'
  | 'mv30'
  | 'mvc1'
  | 'mvc2'
  | 'mvdv'
  | 'mvha'
  | 'mwsc'
  | 'mxpeg'
  | 'notchlc'
  | 'nuv'
  | 'paf_video'
  | 'pam'
  | 'pbm'
  | 'pcx'
  | 'pdv'
  | 'pfm'
  | 'pgm'
  | 'pgmyuv'
  | 'pgx'
  | 'phm'
  | 'photocd'
  | 'pictor'
  | 'pixlet'
  | 'png'
  | 'ppm'
  | 'prores'
  | 'prosumer'
  | 'psd'
  | 'ptx'
  | 'qdraw'
  | 'qoi'
  | 'qpeg'
  | 'qtrle'
  | 'r10k'
  | 'r210'
  | 'rasc'
  | 'rawvideo'
  | 'rl2'
  | 'roq'
  | 'rpza'
  | 'rscc'
  | 'rtv1'
  | 'rv10'
  | 'rv20'
  | 'rv30'
  | 'rv40'
  | 'sanm'
  | 'scpr'
  | 'screenpresso'
  | 'sga'
  | 'sgi'
  | 'sgirle'
  | 'sheervideo'
  | 'simbiosis_imx'
  | 'smackvideo'
  | 'smc'
  | 'smvjpeg'
  | 'snow'
  | 'sp5x'
  | 'speedhq'
  | 'srgc'
  | 'sunrast'
  | 'svg'
  | 'svq1'
  | 'svq3'
  | 'targa'
  | 'targa_y216'
  | 'tdsc'
  | 'tgq'
  | 'tgv'
  | 'theora'
  | 'thp'
  | 'tiertexseqvideo'
  | 'tiff'
  | 'tmv'
  | 'tqi'
  | 'truemotion1'
  | 'truemotion2'
  | 'truemotion2rt'
  | 'tscc'
  | 'tscc2'
  | 'txd'
  | 'ulti'
  | 'utvideo'
  | 'v210'
  | 'v210x'
  | 'v308'
  | 'v408'
  | 'v410'
  | 'vb'
  | 'vble'
  | 'vbn'
  | 'vc1'
  | 'vc1image'
  | 'vcr1'
  | 'vixl'
  | 'vmdvideo'
  | 'vmix'
  | 'vmnc'
  | 'vnull'
  | 'vp3'
  | 'vp4'
  | 'vp5'
  | 'vp6'
  | 'vp6a'
  | 'vp6f'
  | 'vp7'
  | 'vp8'
  | 'vp9'
  | 'vqc'
  | 'vvc'
  | 'wbmp'
  | 'wcmv'
  | 'webp'
  | 'wmv1'
  | 'wmv2'
  | 'wmv3'
  | 'wmv3image'
  | 'wnv1'
  | 'wrapped_avframe'
  | 'ws_vqa'
  | 'xan_wc3'
  | 'xan_wc4'
  | 'xbin'
  | 'xbm'
  | 'xface'
  | 'xpm'
  | 'xwd'
  | 'y41p'
  | 'ylc'
  | 'yop'
  | 'yuv4'
  | 'zerocodec'
  | 'zlib'
  | 'zmbv'

export type FfmpegDecoderAudio =
  | '8svx_exp'
  | '8svx_fib'
  | 'aac'
  | 'aac_fixed'
  | 'aac_at'
  | 'aac_latm'
  | 'ac3'
  | 'ac3_fixed'
  | 'ac3_at'
  | 'acelp.kelvin'
  | 'adpcm_4xm'
  | 'adpcm_adx'
  | 'adpcm_afc'
  | 'adpcm_agm'
  | 'adpcm_aica'
  | 'adpcm_argo'
  | 'adpcm_ct'
  | 'adpcm_dtk'
  | 'adpcm_ea'
  | 'adpcm_ea_maxis_xa'
  | 'adpcm_ea_r1'
  | 'adpcm_ea_r2'
  | 'adpcm_ea_r3'
  | 'adpcm_ea_xas'
  | 'g722'
  | 'g726'
  | 'g726le'
  | 'adpcm_ima_acorn'
  | 'adpcm_ima_alp'
  | 'adpcm_ima_amv'
  | 'adpcm_ima_apc'
  | 'adpcm_ima_apm'
  | 'adpcm_ima_cunning'
  | 'adpcm_ima_dat4'
  | 'adpcm_ima_dk3'
  | 'adpcm_ima_dk4'
  | 'adpcm_ima_ea_eacs'
  | 'adpcm_ima_ea_sead'
  | 'adpcm_ima_iss'
  | 'adpcm_ima_moflex'
  | 'adpcm_ima_mtf'
  | 'adpcm_ima_oki'
  | 'adpcm_ima_qt'
  | 'adpcm_ima_qt_at'
  | 'adpcm_ima_rad'
  | 'adpcm_ima_smjpeg'
  | 'adpcm_ima_ssi'
  | 'adpcm_ima_wav'
  | 'adpcm_ima_ws'
  | 'adpcm_ms'
  | 'adpcm_mtaf'
  | 'adpcm_psx'
  | 'adpcm_sbpro_2'
  | 'adpcm_sbpro_3'
  | 'adpcm_sbpro_4'
  | 'adpcm_swf'
  | 'adpcm_thp'
  | 'adpcm_thp_le'
  | 'adpcm_vima'
  | 'adpcm_xa'
  | 'adpcm_xmd'
  | 'adpcm_yamaha'
  | 'adpcm_zork'
  | 'alac'
  | 'alac_at'
  | 'amrnb'
  | 'amr_nb_at'
  | 'libopencore_amrnb'
  | 'amrwb'
  | 'libopencore_amrwb'
  | 'anull'
  | 'apac'
  | 'ape'
  | 'aptx'
  | 'aptx_hd'
  | 'atrac1'
  | 'atrac3'
  | 'atrac3al'
  | 'atrac3plus'
  | 'atrac3plusal'
  | 'atrac9'
  | 'on2avc'
  | 'binkaudio_dct'
  | 'binkaudio_rdft'
  | 'bmv_audio'
  | 'bonk'
  | 'cbd2_dpcm'
  | 'comfortnoise'
  | 'cook'
  | 'derf_dpcm'
  | 'dfpwm'
  | 'dolby_e'
  | 'dsd_lsbf'
  | 'dsd_lsbf_planar'
  | 'dsd_msbf'
  | 'dsd_msbf_planar'
  | 'dsicinaudio'
  | 'dss_sp'
  | 'dst'
  | 'dca'
  | 'dvaudio'
  | 'eac3'
  | 'eac3_at'
  | 'evrc'
  | 'fastaudio'
  | 'flac'
  | 'ftr'
  | 'g723_1'
  | 'g729'
  | 'gremlin_dpcm'
  | 'gsm'
  | 'gsm_ms'
  | 'gsm_ms_at'
  | 'hca'
  | 'hcom'
  | 'iac'
  | 'ilbc'
  | 'ilbc_at'
  | 'imc'
  | 'interplay_dpcm'
  | 'interplayacm'
  | 'mace3'
  | 'mace6'
  | 'metasound'
  | 'misc4'
  | 'mlp'
  | 'mp1'
  | 'mp1float'
  | 'mp1_at'
  | 'mp2'
  | 'mp2float'
  | 'mp2_at'
  | 'mp3float'
  | 'mp3'
  | 'mp3_at'
  | 'mp3adufloat'
  | 'mp3adu'
  | 'mp3on4float'
  | 'mp3on4'
  | 'als'
  | 'msnsiren'
  | 'mpc7'
  | 'mpc8'
  | 'nellymoser'
  | 'opus'
  | 'libopus'
  | 'osq'
  | 'paf_audio'
  | 'pcm_alaw'
  | 'pcm_alaw_at'
  | 'pcm_bluray'
  | 'pcm_dvd'
  | 'pcm_f16le'
  | 'pcm_f24le'
  | 'pcm_f32be'
  | 'pcm_f32le'
  | 'pcm_f64be'
  | 'pcm_f64le'
  | 'pcm_lxf'
  | 'pcm_mulaw'
  | 'pcm_mulaw_at'
  | 'pcm_s16be'
  | 'pcm_s16be_planar'
  | 'pcm_s16le'
  | 'pcm_s16le_planar'
  | 'pcm_s24be'
  | 'pcm_s24daud'
  | 'pcm_s24le'
  | 'pcm_s24le_planar'
  | 'pcm_s32be'
  | 'pcm_s32le'
  | 'pcm_s32le_planar'
  | 'pcm_s64be'
  | 'pcm_s64le'
  | 'pcm_s8'
  | 'pcm_s8_planar'
  | 'pcm_sga'
  | 'pcm_u16be'
  | 'pcm_u16le'
  | 'pcm_u24be'
  | 'pcm_u24le'
  | 'pcm_u32be'
  | 'pcm_u32le'
  | 'pcm_u8'
  | 'pcm_vidc'
  | 'qcelp'
  | 'qdm2'
  | 'qdm2_at'
  | 'qdmc'
  | 'qdmc_at'
  | 'real_144'
  | 'real_288'
  | 'ralf'
  | 'rka'
  | 'roq_dpcm'
  | 's302m'
  | 'sbc'
  | 'sdx2_dpcm'
  | 'shorten'
  | 'sipr'
  | 'siren'
  | 'smackaud'
  | 'sol_dpcm'
  | 'sonic'
  | 'speex'
  | 'libspeex'
  | 'tak'
  | 'truehd'
  | 'truespeech'
  | 'tta'
  | 'twinvq'
  | 'vmdaudio'
  | 'vorbis'
  | 'libvorbis'
  | 'wady_dpcm'
  | 'wavarc'
  | 'wavesynth'
  | 'wavpack'
  | 'ws_snd1'
  | 'wmalossless'
  | 'wmapro'
  | 'wmav1'
  | 'wmav2'
  | 'wmavoice'
  | 'xan_dpcm'
  | 'xma1'
  | 'xma2'
export type FfmpegDecoderData = {
  label: string
  type: string
  frameLevelMultithreading: boolean
  sliceLevelMultithreading: boolean
  experimental: boolean
  supportsDrawHorizontalBand: boolean
  supportsDirectRenderingMethod1: boolean
}

export type FfmpegDecoderSubtitle =
  | 'libaribb24'
  | 'ssa'
  | 'ass'
  | 'dvbsub'
  | 'dvdsub'
  | 'cc_dec'
  | 'pgssub'
  | 'jacosub'
  | 'microdvd'
  | 'mov_text'
  | 'mpl2'
  | 'pjs'
  | 'realtext'
  | 'sami'
  | 'stl'
  | 'srt'
  | 'subrip'
  | 'subviewer'
  | 'subviewer1'
  | 'text'
  | 'vplayer'
  | 'webvtt'
  | 'xsub'

export type FfmpegDecoderVideo =
  | '012v'
  | '4xm'
  | '8bps'
  | 'aasc'
  | 'agm'
  | 'aic'
  | 'alias_pix'
  | 'amv'
  | 'anm'
  | 'ansi'
  | 'apng'
  | 'arbc'
  | 'argo'
  | 'asv1'
  | 'asv2'
  | 'aura'
  | 'aura2'
  | 'libdav1d'
  | 'libaom-av1'
  | 'av1'
  | 'avrn'
  | 'avrp'
  | 'avs'
  | 'avui'
  | 'ayuv'
  | 'bethsoftvid'
  | 'bfi'
  | 'binkvideo'
  | 'bintext'
  | 'bitpacked'
  | 'bmp'
  | 'bmv_video'
  | 'brender_pix'
  | 'c93'
  | 'cavs'
  | 'cdgraphics'
  | 'cdtoons'
  | 'cdxl'
  | 'cfhd'
  | 'cinepak'
  | 'clearvideo'
  | 'cljr'
  | 'cllc'
  | 'eacmv'
  | 'cpia'
  | 'cri'
  | 'camstudio'
  | 'cyuv'
  | 'dds'
  | 'dfa'
  | 'dirac'
  | 'dnxhd'
  | 'dpx'
  | 'dsicinvideo'
  | 'dvvideo'
  | 'dxa'
  | 'dxtory'
  | 'dxv'
  | 'escape124'
  | 'escape130'
  | 'exr'
  | 'ffv1'
  | 'ffvhuff'
  | 'fic'
  | 'fits'
  | 'flashsv'
  | 'flashsv2'
  | 'flic'
  | 'flv'
  | 'fmvc'
  | 'fraps'
  | 'frwu'
  | 'g2m'
  | 'gdv'
  | 'gem'
  | 'gif'
  | 'h261'
  | 'h263'
  | 'h263i'
  | 'h263p'
  | 'h264'
  | 'hap'
  | 'hdr'
  | 'hevc'
  | 'hnm4video'
  | 'hq_hqa'
  | 'hqx'
  | 'huffyuv'
  | 'hymt'
  | 'idcinvideo'
  | 'idf'
  | 'iff'
  | 'imm4'
  | 'imm5'
  | 'indeo2'
  | 'indeo3'
  | 'indeo4'
  | 'indeo5'
  | 'interplayvideo'
  | 'ipu'
  | 'jpeg2000'
  | 'jpegls'
  | 'libjxl'
  | 'jv'
  | 'kgv1'
  | 'kmvc'
  | 'lagarith'
  | 'loco'
  | 'lscr'
  | 'm101'
  | 'eamad'
  | 'magicyuv'
  | 'mdec'
  | 'media100'
  | 'mimic'
  | 'mjpeg'
  | 'mjpegb'
  | 'mmvideo'
  | 'mobiclip'
  | 'motionpixels'
  | 'mpeg1video'
  | 'mpeg2video'
  | 'mpegvideo'
  | 'mpeg4'
  | 'msa1'
  | 'mscc'
  | 'msmpeg4v1'
  | 'msmpeg4v2'
  | 'msmpeg4'
  | 'msp2'
  | 'msrle'
  | 'mss1'
  | 'mss2'
  | 'msvideo1'
  | 'mszh'
  | 'mts2'
  | 'mv30'
  | 'mvc1'
  | 'mvc2'
  | 'mvdv'
  | 'mvha'
  | 'mwsc'
  | 'mxpeg'
  | 'notchlc'
  | 'nuv'
  | 'paf_video'
  | 'pam'
  | 'pbm'
  | 'pcx'
  | 'pdv'
  | 'pfm'
  | 'pgm'
  | 'pgmyuv'
  | 'pgx'
  | 'phm'
  | 'photocd'
  | 'pictor'
  | 'pixlet'
  | 'png'
  | 'ppm'
  | 'prores'
  | 'prosumer'
  | 'psd'
  | 'ptx'
  | 'qdraw'
  | 'qoi'
  | 'qpeg'
  | 'qtrle'
  | 'r10k'
  | 'r210'
  | 'rasc'
  | 'rawvideo'
  | 'rl2'
  | 'roqvideo'
  | 'rpza'
  | 'rscc'
  | 'rtv1'
  | 'rv10'
  | 'rv20'
  | 'rv30'
  | 'rv40'
  | 'sanm'
  | 'scpr'
  | 'screenpresso'
  | 'sga'
  | 'sgi'
  | 'sgirle'
  | 'sheervideo'
  | 'simbiosis_imx'
  | 'smackvid'
  | 'smc'
  | 'smvjpeg'
  | 'snow'
  | 'sp5x'
  | 'speedhq'
  | 'srgc'
  | 'sunrast'
  | 'svq1'
  | 'svq3'
  | 'targa'
  | 'targa_y216'
  | 'tdsc'
  | 'eatgq'
  | 'eatgv'
  | 'theora'
  | 'thp'
  | 'tiertexseqvideo'
  | 'tiff'
  | 'tmv'
  | 'eatqi'
  | 'truemotion1'
  | 'truemotion2'
  | 'truemotion2rt'
  | 'camtasia'
  | 'tscc2'
  | 'txd'
  | 'ultimotion'
  | 'utvideo'
  | 'v210'
  | 'v210x'
  | 'v308'
  | 'v408'
  | 'v410'
  | 'vb'
  | 'vble'
  | 'vbn'
  | 'vc1'
  | 'vc1image'
  | 'vcr1'
  | 'xl'
  | 'vmdvideo'
  | 'vmix'
  | 'vmnc'
  | 'vnull'
  | 'vp3'
  | 'vp4'
  | 'vp5'
  | 'vp6'
  | 'vp6a'
  | 'vp6f'
  | 'vp7'
  | 'vp8'
  | 'libvpx'
  | 'vp9'
  | 'libvpx-vp9'
  | 'vqc'
  | 'wbmp'
  | 'wcmv'
  | 'webp'
  | 'wmv1'
  | 'wmv2'
  | 'wmv3'
  | 'wmv3image'
  | 'wnv1'
  | 'wrapped_avframe'
  | 'vqavideo'
  | 'xan_wc3'
  | 'xan_wc4'
  | 'xbin'
  | 'xbm'
  | 'xface'
  | 'xpm'
  | 'xwd'
  | 'y41p'
  | 'ylc'
  | 'yop'
  | 'yuv4'
  | 'zerocodec'
  | 'zlib'
  | 'zmbv'

export type FfmpegEncoderAudio =
  | 'aac'
  | 'aac_at'
  | 'ac3'
  | 'ac3_fixed'
  | 'adpcm_adx'
  | 'adpcm_argo'
  | 'g722'
  | 'g726'
  | 'g726le'
  | 'adpcm_ima_alp'
  | 'adpcm_ima_amv'
  | 'adpcm_ima_apm'
  | 'adpcm_ima_qt'
  | 'adpcm_ima_ssi'
  | 'adpcm_ima_wav'
  | 'adpcm_ima_ws'
  | 'adpcm_ms'
  | 'adpcm_swf'
  | 'adpcm_yamaha'
  | 'alac'
  | 'alac_at'
  | 'libopencore_amrnb'
  | 'anull'
  | 'aptx'
  | 'aptx_hd'
  | 'comfortnoise'
  | 'dfpwm'
  | 'dca'
  | 'eac3'
  | 'flac'
  | 'g723_1'
  | 'ilbc_at'
  | 'mlp'
  | 'mp2'
  | 'mp2fixed'
  | 'libmp3lame'
  | 'nellymoser'
  | 'opus'
  | 'libopus'
  | 'pcm_alaw'
  | 'pcm_alaw_at'
  | 'pcm_bluray'
  | 'pcm_dvd'
  | 'pcm_f32be'
  | 'pcm_f32le'
  | 'pcm_f64be'
  | 'pcm_f64le'
  | 'pcm_mulaw'
  | 'pcm_mulaw_at'
  | 'pcm_s16be'
  | 'pcm_s16be_planar'
  | 'pcm_s16le'
  | 'pcm_s16le_planar'
  | 'pcm_s24be'
  | 'pcm_s24daud'
  | 'pcm_s24le'
  | 'pcm_s24le_planar'
  | 'pcm_s32be'
  | 'pcm_s32le'
  | 'pcm_s32le_planar'
  | 'pcm_s64be'
  | 'pcm_s64le'
  | 'pcm_s8'
  | 'pcm_s8_planar'
  | 'pcm_u16be'
  | 'pcm_u16le'
  | 'pcm_u24be'
  | 'pcm_u24le'
  | 'pcm_u32be'
  | 'pcm_u32le'
  | 'pcm_u8'
  | 'pcm_vidc'
  | 'real_144'
  | 'roq_dpcm'
  | 's302m'
  | 'sbc'
  | 'sonic'
  | 'sonicls'
  | 'libspeex'
  | 'truehd'
  | 'tta'
  | 'vorbis'
  | 'libvorbis'
  | 'wavpack'
  | 'wmav1'
  | 'wmav2'
export type FfmpegEncoderData = {
  label: string
  type: string
  frameLevelMultithreading: boolean
  sliceLevelMultithreading: boolean
  experimental: boolean
  supportsDrawHorizontalBand: boolean
  supportsDirectRenderingMethod1: boolean
}

export type FfmpegEncoderSubtitle =
  | 'ssa'
  | 'ass'
  | 'dvbsub'
  | 'dvdsub'
  | 'mov_text'
  | 'srt'
  | 'subrip'
  | 'text'
  | 'ttml'
  | 'webvtt'
  | 'xsub'

export type FfmpegEncoderVideo =
  | 'a64multi'
  | 'a64multi5'
  | 'alias_pix'
  | 'amv'
  | 'apng'
  | 'asv1'
  | 'asv2'
  | 'libaom-av1'
  | 'librav1e'
  | 'libsvtav1'
  | 'avrp'
  | 'avui'
  | 'ayuv'
  | 'bitpacked'
  | 'bmp'
  | 'cfhd'
  | 'cinepak'
  | 'cljr'
  | 'vc2'
  | 'dnxhd'
  | 'dpx'
  | 'dvvideo'
  | 'exr'
  | 'ffv1'
  | 'ffvhuff'
  | 'fits'
  | 'flashsv'
  | 'flashsv2'
  | 'flv'
  | 'gif'
  | 'h261'
  | 'h263'
  | 'h263p'
  | 'libx264'
  | 'libx264rgb'
  | 'h264_videotoolbox'
  | 'hap'
  | 'hdr'
  | 'libx265'
  | 'hevc_videotoolbox'
  | 'huffyuv'
  | 'jpeg2000'
  | 'libopenjpeg'
  | 'jpegls'
  | 'libjxl'
  | 'ljpeg'
  | 'magicyuv'
  | 'mjpeg'
  | 'mpeg1video'
  | 'mpeg2video'
  | 'mpeg4'
  | 'libxvid'
  | 'msmpeg4v2'
  | 'msmpeg4'
  | 'msrle'
  | 'msvideo1'
  | 'pam'
  | 'pbm'
  | 'pcx'
  | 'pfm'
  | 'pgm'
  | 'pgmyuv'
  | 'phm'
  | 'png'
  | 'ppm'
  | 'prores'
  | 'prores_aw'
  | 'prores_ks'
  | 'prores_videotoolbox'
  | 'qoi'
  | 'qtrle'
  | 'r10k'
  | 'r210'
  | 'rawvideo'
  | 'roqvideo'
  | 'rpza'
  | 'rv10'
  | 'rv20'
  | 'sgi'
  | 'smc'
  | 'snow'
  | 'speedhq'
  | 'sunrast'
  | 'svq1'
  | 'targa'
  | 'libtheora'
  | 'tiff'
  | 'utvideo'
  | 'v210'
  | 'v308'
  | 'v408'
  | 'v410'
  | 'vbn'
  | 'vnull'
  | 'libvpx'
  | 'libvpx-vp9'
  | 'wbmp'
  | 'libwebp_anim'
  | 'libwebp'
  | 'wmv1'
  | 'wmv2'
  | 'wrapped_avframe'
  | 'xbm'
  | 'xface'
  | 'xwd'
  | 'y41p'
  | 'yuv4'
  | 'zlib'
  | 'zmbv'

export type FfmpegFormat =
  | '3dostr'
  | '3g2'
  | '3gp'
  | '4xm'
  | 'a64'
  | 'aa'
  | 'aac'
  | 'aax'
  | 'ac3'
  | 'ac4'
  | 'ace'
  | 'acm'
  | 'act'
  | 'adf'
  | 'adp'
  | 'ads'
  | 'adts'
  | 'adx'
  | 'aea'
  | 'afc'
  | 'aiff'
  | 'aix'
  | 'alaw'
  | 'alias_pix'
  | 'alp'
  | 'amr'
  | 'amrnb'
  | 'amrwb'
  | 'amv'
  | 'anm'
  | 'apac'
  | 'apc'
  | 'ape'
  | 'apm'
  | 'apng'
  | 'aptx'
  | 'aptx_hd'
  | 'aqtitle'
  | 'argo_asf'
  | 'argo_brp'
  | 'argo_cvg'
  | 'asf'
  | 'asf_o'
  | 'asf_stream'
  | 'ass'
  | 'ast'
  | 'au'
  | 'audiotoolbox'
  | 'av1'
  | 'avfoundation'
  | 'avi'
  | 'avif'
  | 'avm2'
  | 'avr'
  | 'avs'
  | 'avs2'
  | 'avs3'
  | 'bethsoftvid'
  | 'bfi'
  | 'bfstm'
  | 'bin'
  | 'bink'
  | 'binka'
  | 'bit'
  | 'bitpacked'
  | 'bmp_pipe'
  | 'bmv'
  | 'boa'
  | 'bonk'
  | 'brender_pix'
  | 'brstm'
  | 'c93'
  | 'caf'
  | 'cavsvideo'
  | 'cdg'
  | 'cdxl'
  | 'cine'
  | 'codec2'
  | 'codec2raw'
  | 'concat'
  | 'crc'
  | 'cri_pipe'
  | 'dash'
  | 'data'
  | 'daud'
  | 'dcstr'
  | 'dds_pipe'
  | 'derf'
  | 'dfa'
  | 'dfpwm'
  | 'dhav'
  | 'dirac'
  | 'dnxhd'
  | 'dpx_pipe'
  | 'dsf'
  | 'dsicin'
  | 'dss'
  | 'dts'
  | 'dtshd'
  | 'dv'
  | 'dvbsub'
  | 'dvbtxt'
  | 'dvd'
  | 'dxa'
  | 'ea'
  | 'ea_cdata'
  | 'eac3'
  | 'epaf'
  | 'evc'
  | 'exr_pipe'
  | 'f32be'
  | 'f32le'
  | 'f4v'
  | 'f64be'
  | 'f64le'
  | 'ffmetadata'
  | 'fifo'
  | 'fifo_test'
  | 'film_cpk'
  | 'filmstrip'
  | 'fits'
  | 'flac'
  | 'flic'
  | 'flv'
  | 'framecrc'
  | 'framehash'
  | 'framemd5'
  | 'frm'
  | 'fsb'
  | 'fwse'
  | 'g722'
  | 'g723_1'
  | 'g726'
  | 'g726le'
  | 'g729'
  | 'gdv'
  | 'gem_pipe'
  | 'genh'
  | 'gif'
  | 'gif_pipe'
  | 'gsm'
  | 'gxf'
  | 'h261'
  | 'h263'
  | 'h264'
  | 'hash'
  | 'hca'
  | 'hcom'
  | 'hdr_pipe'
  | 'hds'
  | 'hevc'
  | 'hls'
  | 'hnm'
  | 'ico'
  | 'idcin'
  | 'idf'
  | 'iff'
  | 'ifv'
  | 'ilbc'
  | 'image2'
  | 'image2pipe'
  | 'imf'
  | 'ingenient'
  | 'ipmovie'
  | 'ipod'
  | 'ipu'
  | 'ircam'
  | 'ismv'
  | 'iss'
  | 'iv8'
  | 'ivf'
  | 'ivr'
  | 'j2k_pipe'
  | 'jacosub'
  | 'jpeg_pipe'
  | 'jpegls_pipe'
  | 'jpegxl_anim'
  | 'jpegxl_pipe'
  | 'jv'
  | 'kux'
  | 'kvag'
  | 'laf'
  | 'latm'
  | 'lavfi'
  | 'live_flv'
  | 'lmlm4'
  | 'loas'
  | 'lrc'
  | 'luodat'
  | 'lvf'
  | 'lxf'
  | 'm4v'
  | 'matroska'
  | 'matroska-webm'
  | 'mca'
  | 'mcc'
  | 'md5'
  | 'mgsts'
  | 'microdvd'
  | 'mjpeg'
  | 'mjpeg_2000'
  | 'mkvtimestamp_v2'
  | 'mlp'
  | 'mlv'
  | 'mm'
  | 'mmf'
  | 'mods'
  | 'moflex'
  | 'mov'
  | 'mp2'
  | 'mp3'
  | 'mp4'
  | 'mpc'
  | 'mpc8'
  | 'mpeg'
  | 'mpeg1video'
  | 'mpeg2video'
  | 'mpegts'
  | 'mpegtsraw'
  | 'mpegvideo'
  | 'mpjpeg'
  | 'mpl2'
  | 'mpsub'
  | 'msf'
  | 'msnwctcp'
  | 'msp'
  | 'mtaf'
  | 'mtv'
  | 'mulaw'
  | 'musx'
  | 'mv'
  | 'mvi'
  | 'mxf'
  | 'mxf_d10'
  | 'mxf_opatom'
  | 'mxg'
  | 'nc'
  | 'nistsphere'
  | 'nsp'
  | 'nsv'
  | 'null'
  | 'nut'
  | 'nuv'
  | 'obu'
  | 'oga'
  | 'ogg'
  | 'ogv'
  | 'oma'
  | 'opus'
  | 'osq'
  | 'paf'
  | 'pam_pipe'
  | 'pbm_pipe'
  | 'pcx_pipe'
  | 'pdv'
  | 'pfm_pipe'
  | 'pgm_pipe'
  | 'pgmyuv_pipe'
  | 'pgx_pipe'
  | 'phm_pipe'
  | 'photocd_pipe'
  | 'pictor_pipe'
  | 'pjs'
  | 'pmp'
  | 'png_pipe'
  | 'pp_bnk'
  | 'ppm_pipe'
  | 'psd_pipe'
  | 'psp'
  | 'psxstr'
  | 'pva'
  | 'pvf'
  | 'qcp'
  | 'qdraw_pipe'
  | 'qoi_pipe'
  | 'r3d'
  | 'rawvideo'
  | 'realtext'
  | 'redspark'
  | 'rka'
  | 'rl2'
  | 'rm'
  | 'roq'
  | 'rpl'
  | 'rsd'
  | 'rso'
  | 'rtp'
  | 'rtp_mpegts'
  | 'rtsp'
  | 's16be'
  | 's16le'
  | 's24be'
  | 's24le'
  | 's32be'
  | 's32le'
  | 's337m'
  | 's8'
  | 'sami'
  | 'sap'
  | 'sbc'
  | 'sbg'
  | 'scc'
  | 'scd'
  | 'sdns'
  | 'sdp'
  | 'sdr2'
  | 'sds'
  | 'sdx'
  | 'segment'
  | 'ser'
  | 'sga'
  | 'sgi_pipe'
  | 'shn'
  | 'siff'
  | 'simbiosis_imx'
  | 'sln'
  | 'smjpeg'
  | 'smk'
  | 'smoothstreaming'
  | 'smush'
  | 'sol'
  | 'sox'
  | 'spdif'
  | 'spx'
  | 'srt'
  | 'stl'
  | 'stream_segment'
  | 'streamhash'
  | 'subviewer'
  | 'subviewer1'
  | 'sunrast_pipe'
  | 'sup'
  | 'svag'
  | 'svcd'
  | 'svg_pipe'
  | 'svs'
  | 'swf'
  | 'tak'
  | 'tedcaptions'
  | 'tee'
  | 'thp'
  | 'tiertexseq'
  | 'tiff_pipe'
  | 'tmv'
  | 'truehd'
  | 'tta'
  | 'ttml'
  | 'tty'
  | 'txd'
  | 'ty'
  | 'u16be'
  | 'u16le'
  | 'u24be'
  | 'u24le'
  | 'u32be'
  | 'u32le'
  | 'u8'
  | 'uncodedframecrc'
  | 'usm'
  | 'v210'
  | 'v210x'
  | 'vag'
  | 'vbn_pipe'
  | 'vc1'
  | 'vc1test'
  | 'vcd'
  | 'vidc'
  | 'vividas'
  | 'vivo'
  | 'vmd'
  | 'vob'
  | 'vobsub'
  | 'voc'
  | 'vpk'
  | 'vplayer'
  | 'vqf'
  | 'vvc'
  | 'w64'
  | 'wady'
  | 'wav'
  | 'wavarc'
  | 'wc3movie'
  | 'webm'
  | 'webm_chunk'
  | 'webm_dash_manifest'
  | 'webp'
  | 'webp_pipe'
  | 'webvtt'
  | 'wsaud'
  | 'wsd'
  | 'wsvqa'
  | 'wtv'
  | 'wv'
  | 'wve'
  | 'x11grab'
  | 'xa'
  | 'xbin'
  | 'xbm_pipe'
  | 'xmd'
  | 'xmv'
  | 'xpm_pipe'
  | 'xvag'
  | 'xwd_pipe'
  | 'xwma'
  | 'yop'
  | 'yuv4mpegpipe'
export type FfmpegFormatData = {
  label: string
  supportsDemuxing: boolean
  supportsMuxing: boolean
}

export type FfmpegStrictOption =
  | 'very'
  | 'strict'
  | 'normal'
  | 'unofficial'
  | 'experimental'
export type FfmpegStrictOptionData = {
  note: string
}
export type FileContent = {
  content: ArrayBuffer | Blob | string
}
export type FileContentWithSha256 = {
  sha256: string
  content: ArrayBuffer | Blob | string
}
export type FileHasOutputContent = {
  content: boolean
}
export type FileInputPath = {
  path: string
}
export type FileOutputPath = {
  path: string
}
export type FilePath = {
  path: string
}

export type FileReaderEncoding =
  | 'utf-8'
  | 'ibm866'
  | 'iso-8859-2'
  | 'iso-8859-3'
  | 'iso-8859-4'
  | 'iso-8859-5'
  | 'iso-8859-6'
  | 'iso-8859-7'
  | 'iso-8859-8'
  | 'iso-8859-8-i'
  | 'iso-8859-10'
  | 'iso-8859-13'
  | 'iso-8859-14'
  | 'iso-8859-15'
  | 'iso-8859-16'
  | 'koi8-r'
  | 'koi8-u'
  | 'macintosh'
  | 'windows-874'
  | 'windows-1250'
  | 'windows-1251'
  | 'windows-1252'
  | 'windows-1253'
  | 'windows-1254'
  | 'windows-1255'
  | 'windows-1256'
  | 'windows-1257'
  | 'windows-1258'
  | 'x-mac-cyrillic'

export type Flip = 'horizontal' | 'vertical'

export type FontFormat =
  | 'ttf'
  | 'otf'
  | 'woff2'
  | 'woff'
  | 'svg'
  | 'eot'
  | 'bmp'

export type ForgeMessageDigest =
  | 'sha1'
  | 'sha256'
  | 'sha384'
  | 'sha512'
  | 'sha512/224'
  | 'sha512/256'
export type FormatApi = {
  format: string
}
export type FormatAssemblyCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatC = {
  format: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type FormatCliBase = {
  format: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}

export type FormatCodeFormat =
  | 'angular'
  | 'flow'
  | 'glimmer'
  | 'graphql'
  | 'html'
  | 'markdown'
  | 'meriyah'
  | 'postcss'
  | 'typescript'
  | 'yaml'
  | 'python'
  | 'swift'
  | 'c'
  | 'assembly'
  | 'cpp'
  | 'sql'
export type FormatCodeWithClangFormatCommandInput = {
  format: ClangFormat
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
  style: {
    path: string
  }
}
export type FormatCodeWithPrettier = {
  code: string
  format: PrettierPlugin
}
export type FormatCpp = {
  format: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type FormatCssWithPrettier = {
  code: string
  singleQuote?: boolean
}
export type FormatGraphqlWithPrettier = {
  code: string
  bracketSpacing?: boolean
}
export type FormatHtmlWithPrettier = {
  code: string
  bracketSameLine?: boolean
  htmlWhitespaceSensitivity?: PrettierHtmlWhitespaceSensitivityOption
  singleAttributePerLine?: boolean
  vueIndentScriptAndStyle?: boolean
}
export type FormatJava = {
  format: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type FormatJavaWithPrettier = {
  code: string
  maxLineLength?: number
  indentationSize?: number
  useTabs?: boolean
  trailingComma?: boolean
}
export type FormatKotlinCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatMarkdownWithPrettier = {
  code: string
  proseWrap?: PrettierProseWrapOption
  singleQuote?: boolean
}
export type FormatPythonCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatRuby = {
  format: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}
export type FormatRustCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatRustWithPrettier = {
  code: string
  useTabs?: boolean
  indentationSize?: number
  maxLineLength?: number
  endOfLine?: PrettierEndOfLineOption
}
export type FormatShWithPrettier = {
  code: string
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
export type FormatSqlWithContent = {
  format: string
  input: {
    file: {
      content: ArrayBuffer | string
    }
  }
}
export type FormatSwiftCommandInput = {
  format: string
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type FormatTypescriptWithPrettier = {
  code: string
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
export type FormatXmlWithPrettier = {
  code: string
  xmlSelfClosingSpace?: boolean
  indentationSize?: number
  xmlWhitespaceSensitivity?: PrettierXmlWhitespaceSensitivityOption
  maxLineLength?: number
  xmlSortAttributesByKey?: boolean
  xmlQuoteAttributes?: PrettierXmlQuoteAttributesOption
}
export type FormatYamlWithPrettier = {
  code: string
  bracketSpacing?: boolean
  singleQuote?: boolean
  proseWrap?: PrettierProseWrapOption
}
export type GematriaSystemCalculation = {
  system: {
    slug: string
    title: string
  }
  reduction: number
  summation: number
}
export type GematriaSystemCalculationResult = {
  string: {
    decoded: string
    encoded: string
  }
  script: {
    slug: string
    title: string
  }
  calculation: Array<GematriaSystemCalculation>
}
export type GenerateHaikuPhrase = {
  format: 'haiku_phrase'
  separator?: string
  adjectives: Array<NamedWordSet | AnonymousWordSet>
  nouns: Array<NamedWordSet | AnonymousWordSet>
}
export type GenerateHash = {
  class: ForgeMessageDigest
  content: string | ArrayBuffer
}
export type GenerateMurmurHash = {
  input: string
  seed: number
  version?: string
}
export type GenerateQrCode = {
  errorCorrectionLevel: QrCodeErrorCorrectionLevel
  format: QrCodeFormat
  margin: number
  color?: {
    dark: string
    light: string
  }
}
export type GenerateRandomPhrase = {
  format: 'random_phrase'
  separator?: string
  minSize?: number
  maxSize?: number
  exclusions?: Array<WeightedWordSet>
  inclusions: Array<WeightedWordSet>
}
export type GenerateRandomSymbols = {
  format: 'random_symbols'
  minSize?: number
  maxSize?: number
  exclusions?: Array<WeightedSymbolSet>
  inclusions: Array<WeightedSymbolSet>
}

export type GifsicleOptimizeOption = '1' | '2' | '3'
export type ImageMagicColorMatrix = {
  row: number
  column: number
  value: Array<number>
}

export type ImageMagickChannel =
  | 'red'
  | 'green'
  | 'blue'
  | 'alpha'
  | 'gray'
  | 'cyan'
  | 'magenta'
  | 'yellow'
  | 'black'
  | 'opacity'
  | 'index'
  | 'rgb'
  | 'rgba'
  | 'cmyk'
  | 'cmyka'
export type ImageMagickChannelData = {
  head: string
}

export type ImageMagickColorSpace =
  | 'cmy'
  | 'cmyk'
  | 'gray'
  | 'hcl'
  | 'hclp'
  | 'hsb'
  | 'hsi'
  | 'hsl'
  | 'hsv'
  | 'hwb'
  | 'jzazbz'
  | 'lab'
  | 'lchab'
  | 'lchuv'
  | 'lms'
  | 'log'
  | 'luv'
  | 'ohta'
  | 'oklab'
  | 'oklch'
  | 'rec601ycbcr'
  | 'rec709ycbcr'
  | 'rgb'
  | 'scrgb'
  | 'srgb'
  | 'transparent'
  | 'xyy'
  | 'xyz'
  | 'ycbcr'
  | 'ycc'
  | 'ydbdr'
  | 'yiq'
  | 'ypbpr'
  | 'yuv'
  | 'undefined'
export type ImageMagickColorSpaceData = {
  head: string
  note?: string
}

export type ImageMagickCompression =
  | 'none'
  | 'bzip'
  | 'fax'
  | 'group4'
  | 'jpeg'
  | 'jpeg2000'
  | 'lossless'
  | 'lzw'
  | 'rle'
  | 'zip'
export type ImageMagickCompressionData = {
  head: string
}

export type ImageMagickFormat =
  | '3fr'
  | '3g2'
  | '3gp'
  | 'aai'
  | 'ai'
  | 'apng'
  | 'art'
  | 'arw'
  | 'ashlar'
  | 'avi'
  | 'avif'
  | 'avs'
  | 'bayer'
  | 'bayera'
  | 'bgr'
  | 'bgra'
  | 'bgro'
  | 'bmp'
  | 'bmp2'
  | 'bmp3'
  | 'brf'
  | 'cal'
  | 'cals'
  | 'canvas'
  | 'caption'
  | 'cin'
  | 'cip'
  | 'clip'
  | 'cmyk'
  | 'cmyka'
  | 'cr2'
  | 'cr3'
  | 'crw'
  | 'cube'
  | 'cur'
  | 'cut'
  | 'data'
  | 'dcm'
  | 'dcr'
  | 'dcraw'
  | 'dcx'
  | 'dds'
  | 'dfont'
  | 'dng'
  | 'dpx'
  | 'dot'
  | 'dxt1'
  | 'dxt5'
  | 'epdf'
  | 'epi'
  | 'eps'
  | 'eps2'
  | 'eps3'
  | 'epsf'
  | 'epsi'
  | 'ept'
  | 'ept2'
  | 'ept3'
  | 'erf'
  | 'exr'
  | 'farbfeld'
  | 'fax'
  | 'ff'
  | 'file'
  | 'fits'
  | 'fl32'
  | 'flv'
  | 'fractal'
  | 'ftp'
  | 'ftxt'
  | 'fts'
  | 'g3'
  | 'g4'
  | 'gif'
  | 'gif87'
  | 'gradient'
  | 'gray'
  | 'graya'
  | 'group4'
  | 'hald'
  | 'hdr'
  | 'heic'
  | 'heif'
  | 'histogram'
  | 'hrz'
  | 'htm'
  | 'html'
  | 'http'
  | 'https'
  | 'icb'
  | 'ico'
  | 'icon'
  | 'iiq'
  | 'info'
  | 'inline'
  | 'ipl'
  | 'isobrl'
  | 'isobrl6'
  | 'j2c'
  | 'j2k'
  | 'jng'
  | 'jnx'
  | 'jp2'
  | 'jpc'
  | 'jpe'
  | 'jpeg'
  | 'jpg'
  | 'jpm'
  | 'jps'
  | 'jpt'
  | 'json'
  | 'jxl'
  | 'k25'
  | 'kdc'
  | 'label'
  | 'm2v'
  | 'm4v'
  | 'mac'
  | 'map'
  | 'mask'
  | 'mat'
  | 'matte'
  | 'mef'
  | 'miff'
  | 'mkv'
  | 'mng'
  | 'mono'
  | 'mov'
  | 'mp4'
  | 'mpc'
  | 'mpeg'
  | 'mpg'
  | 'mpo'
  | 'mrw'
  | 'msl'
  | 'msvg'
  | 'mtv'
  | 'mvg'
  | 'nef'
  | 'nrw'
  | 'null'
  | 'ora'
  | 'orf'
  | 'otb'
  | 'otf'
  | 'pal'
  | 'palm'
  | 'pam'
  | 'pango'
  | 'pattern'
  | 'pbm'
  | 'pcd'
  | 'pcds'
  | 'pcl'
  | 'pct'
  | 'pcx'
  | 'pdb'
  | 'pdf'
  | 'pdfa'
  | 'pef'
  | 'pes'
  | 'pfa'
  | 'pfb'
  | 'pfm'
  | 'pgm'
  | 'pgx'
  | 'phm'
  | 'picon'
  | 'pict'
  | 'pix'
  | 'pjpeg'
  | 'plasma'
  | 'png'
  | 'png00'
  | 'png24'
  | 'png32'
  | 'png48'
  | 'png64'
  | 'png8'
  | 'pnm'
  | 'ppm'
  | 'ps'
  | 'ps2'
  | 'ps3'
  | 'psb'
  | 'psd'
  | 'ptif'
  | 'pwp'
  | 'qoi'
  | 'raf'
  | 'ras'
  | 'raw'
  | 'rgb'
  | 'rgb565'
  | 'rgba'
  | 'rgbo'
  | 'rgf'
  | 'rla'
  | 'rle'
  | 'rmf'
  | 'rw2'
  | 'scr'
  | 'sct'
  | 'sfw'
  | 'sgi'
  | 'shtml'
  | 'six'
  | 'sixel'
  | 'sr2'
  | 'srf'
  | 'stegano'
  | 'strimg'
  | 'sun'
  | 'svg'
  | 'svgz'
  | 'text'
  | 'tga'
  | 'thumbnail'
  | 'tiff'
  | 'tiff64'
  | 'tile'
  | 'tim'
  | 'tm2'
  | 'ttc'
  | 'ttf'
  | 'txt'
  | 'ubrl'
  | 'ubrl6'
  | 'uil'
  | 'uyvy'
  | 'vda'
  | 'vicar'
  | 'vid'
  | 'viff'
  | 'vips'
  | 'vst'
  | 'wbmp'
  | 'webp'
  | 'webm'
  | 'wmv'
  | 'wpg'
  | 'x3f'
  | 'xbm'
  | 'xc'
  | 'xcf'
  | 'xpm'
  | 'xps'
  | 'xv'
  | 'yaml'
  | 'ycbcr'
  | 'ycbcra'
  | 'yuv'
export type ImageMagickFormatData = {
  head: string
  note?: string
  read?: boolean
  write?: boolean
  multiple?: boolean
  supportsBlob?: boolean
}

export type ImageMagickGravity =
  | 'forget'
  | 'northwest'
  | 'north'
  | 'northeast'
  | 'west'
  | 'center'
  | 'east'
  | 'southwest'
  | 'south'
  | 'southeast'

export type ImageMagickInputFormat =
  | '3fr'
  | '3g2'
  | '3gp'
  | 'aai'
  | 'ai'
  | 'apng'
  | 'art'
  | 'arw'
  | 'avi'
  | 'avif'
  | 'avs'
  | 'bayer'
  | 'bayera'
  | 'bgr'
  | 'bgra'
  | 'bgro'
  | 'bmp'
  | 'bmp2'
  | 'bmp3'
  | 'cal'
  | 'cals'
  | 'canvas'
  | 'caption'
  | 'cin'
  | 'clip'
  | 'cmyk'
  | 'cmyka'
  | 'cr2'
  | 'cr3'
  | 'crw'
  | 'cube'
  | 'cur'
  | 'cut'
  | 'data'
  | 'dcm'
  | 'dcr'
  | 'dcraw'
  | 'dcx'
  | 'dds'
  | 'dfont'
  | 'dng'
  | 'dpx'
  | 'dxt1'
  | 'dxt5'
  | 'epdf'
  | 'epi'
  | 'eps'
  | 'epsf'
  | 'epsi'
  | 'ept'
  | 'ept2'
  | 'ept3'
  | 'erf'
  | 'exr'
  | 'farbfeld'
  | 'fax'
  | 'ff'
  | 'file'
  | 'fits'
  | 'fl32'
  | 'flv'
  | 'fractal'
  | 'ftp'
  | 'fts'
  | 'ftxt'
  | 'g3'
  | 'g4'
  | 'gif'
  | 'gif87'
  | 'gradient'
  | 'gray'
  | 'graya'
  | 'group4'
  | 'hald'
  | 'hdr'
  | 'heic'
  | 'heif'
  | 'histogram'
  | 'hrz'
  | 'http'
  | 'https'
  | 'icb'
  | 'ico'
  | 'icon'
  | 'iiq'
  | 'inline'
  | 'ipl'
  | 'j2c'
  | 'j2k'
  | 'jng'
  | 'jnx'
  | 'jp2'
  | 'jpc'
  | 'jpe'
  | 'jpeg'
  | 'jpg'
  | 'jpm'
  | 'jps'
  | 'jpt'
  | 'jxl'
  | 'k25'
  | 'kdc'
  | 'label'
  | 'm2v'
  | 'm4v'
  | 'mac'
  | 'map'
  | 'mask'
  | 'mat'
  | 'mef'
  | 'miff'
  | 'mkv'
  | 'mng'
  | 'mono'
  | 'mov'
  | 'mp4'
  | 'mpc'
  | 'mpeg'
  | 'mpg'
  | 'mpo'
  | 'mrw'
  | 'msl'
  | 'msvg'
  | 'mtv'
  | 'mvg'
  | 'nef'
  | 'nrw'
  | 'null'
  | 'orf'
  | 'otb'
  | 'otf'
  | 'pal'
  | 'palm'
  | 'pam'
  | 'pattern'
  | 'pbm'
  | 'pcd'
  | 'pcds'
  | 'pcl'
  | 'pct'
  | 'pcx'
  | 'pdb'
  | 'pdfa'
  | 'pef'
  | 'pes'
  | 'pfa'
  | 'pfb'
  | 'pfm'
  | 'pgm'
  | 'pgx'
  | 'phm'
  | 'picon'
  | 'pict'
  | 'pix'
  | 'pjpeg'
  | 'plasma'
  | 'png'
  | 'png00'
  | 'png24'
  | 'png32'
  | 'png48'
  | 'png64'
  | 'png8'
  | 'pnm'
  | 'ppm'
  | 'ps'
  | 'psb'
  | 'psd'
  | 'ptif'
  | 'pwp'
  | 'qoi'
  | 'raf'
  | 'ras'
  | 'raw'
  | 'rgb'
  | 'rgb565'
  | 'rgba'
  | 'rgbo'
  | 'rgf'
  | 'rla'
  | 'rle'
  | 'rmf'
  | 'rw2'
  | 'scr'
  | 'sct'
  | 'sfw'
  | 'sgi'
  | 'six'
  | 'sixel'
  | 'txt'
  | 'sr2'
  | 'srf'
  | 'stegano'
  | 'strimg'
  | 'sun'
  | 'svg'
  | 'svgz'
  | 'text'
  | 'tga'
  | 'tiff'
  | 'tiff64'
  | 'tile'
  | 'tim'
  | 'tm2'
  | 'ttc'
  | 'ttf'
  | 'uyvy'
  | 'vda'
  | 'vicar'
  | 'vid'
  | 'viff'
  | 'vips'
  | 'vst'
  | 'wbmp'
  | 'webm'
  | 'webp'
  | 'wmv'
  | 'wpg'
  | 'x3f'
  | 'xbm'
  | 'xc'
  | 'xcf'
  | 'xpm'
  | 'xps'
  | 'xv'
  | 'ycbcr'
  | 'ycbcra'
  | 'yuv'

export type ImageMagickOutputFormat =
  | 'aai'
  | 'ai'
  | 'apng'
  | 'art'
  | 'ashlar'
  | 'avif'
  | 'avs'
  | 'bayer'
  | 'bayera'
  | 'bgr'
  | 'bgra'
  | 'bgro'
  | 'bmp'
  | 'bmp2'
  | 'bmp3'
  | 'brf'
  | 'cal'
  | 'cals'
  | 'cin'
  | 'cip'
  | 'clip'
  | 'cmyk'
  | 'cmyka'
  | 'cur'
  | 'data'
  | 'dcx'
  | 'dds'
  | 'dpx'
  | 'dxt1'
  | 'dxt5'
  | 'epdf'
  | 'epi'
  | 'eps'
  | 'eps2'
  | 'eps3'
  | 'epsf'
  | 'epsi'
  | 'ept'
  | 'ept2'
  | 'ept3'
  | 'exr'
  | 'farbfeld'
  | 'fax'
  | 'ff'
  | 'fits'
  | 'fl32'
  | 'flv'
  | 'fts'
  | 'ftxt'
  | 'g3'
  | 'g4'
  | 'gif'
  | 'gif87'
  | 'gray'
  | 'graya'
  | 'group4'
  | 'hdr'
  | 'heic'
  | 'heif'
  | 'hrz'
  | 'htm'
  | 'html'
  | 'icb'
  | 'ico'
  | 'icon'
  | 'info'
  | 'inline'
  | 'ipl'
  | 'isobrl'
  | 'isobrl6'
  | 'j2c'
  | 'j2k'
  | 'jng'
  | 'jp2'
  | 'jpc'
  | 'jpe'
  | 'jpeg'
  | 'jpg'
  | 'jpm'
  | 'jps'
  | 'jpt'
  | 'json'
  | 'jxl'
  | 'kernel'
  | 'm2v'
  | 'm4v'
  | 'map'
  | 'mask'
  | 'mat'
  | 'matte'
  | 'miff'
  | 'mkv'
  | 'mng'
  | 'mono'
  | 'mov'
  | 'mp4'
  | 'mpc'
  | 'mpeg'
  | 'mpg'
  | 'msl'
  | 'msvg'
  | 'mtv'
  | 'mvg'
  | 'null'
  | 'otb'
  | 'pal'
  | 'palm'
  | 'pam'
  | 'pbm'
  | 'pcd'
  | 'pcds'
  | 'pcl'
  | 'pct'
  | 'pcx'
  | 'pdb'
  | 'pdfa'
  | 'pfm'
  | 'pgm'
  | 'pgx'
  | 'phm'
  | 'picon'
  | 'pict'
  | 'pjpeg'
  | 'png'
  | 'png00'
  | 'png24'
  | 'png32'
  | 'png48'
  | 'png64'
  | 'png8'
  | 'pnm'
  | 'ppm'
  | 'ps'
  | 'ps2'
  | 'ps3'
  | 'psb'
  | 'psd'
  | 'ptif'
  | 'qoi'
  | 'ras'
  | 'rgb'
  | 'rgba'
  | 'rgbo'
  | 'rgf'
  | 'sgi'
  | 'shtml'
  | 'six'
  | 'sixel'
  | 'txt'
  | 'strimg'
  | 'sun'
  | 'svg'
  | 'svgz'
  | 'tga'
  | 'tiff'
  | 'tiff64'
  | 'ubrl'
  | 'ubrl6'
  | 'uil'
  | 'uyvy'
  | 'vda'
  | 'vicar'
  | 'vid'
  | 'viff'
  | 'vips'
  | 'vst'
  | 'wbmp'
  | 'webm'
  | 'webp'
  | 'wmv'
  | 'wpg'
  | 'xbm'
  | 'xpm'
  | 'xv'
  | 'yaml'
  | 'ycbcr'
  | 'ycbcra'
  | 'yuv'

export type InkscapeExportFormat =
  | 'svg'
  | 'png'
  | 'ps'
  | 'eps'
  | 'pdf'
  | 'emf'
  | 'wmf'
  | 'xaml'

export type InkscapeImportFormat = 'ai'
export type InspectColor = {
  value: string
}
export type InspectMetadataFromImage = {
  input: {
    format: string
    file: {
      path: string
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

export type LibreOfficeInputFormat =
  | 'html'
  | 'mediawiki'
  | 'csv'
  | 'pptx'
  | 'ppt'
  | 'docx'
  | 'doc'
  | 'pdf'
  | 'wmf'
  | 'emf'
  | 'svg'
  | 'xlsx'
  | 'xls'

export type LibreOfficeOutputFormat =
  | 'html'
  | 'mediawiki'
  | 'csv'
  | 'pptx'
  | 'ppt'
  | 'wmf'
  | 'emf'
  | 'svg'
  | 'xlsx'
  | 'xls'
  | 'epub'
  | 'pdf'

export type LlvmArchitecture =
  | 'aarch64'
  | 'aarch64_32'
  | 'aarch64_be'
  | 'amdgcn'
  | 'arm'
  | 'arm64'
  | 'arm64_32'
  | 'armeb'
  | 'avr'
  | 'bpf'
  | 'bpfeb'
  | 'bpfel'
  | 'hexagon'
  | 'lanai'
  | 'mips'
  | 'mips64'
  | 'mips64el'
  | 'mipsel'
  | 'msp430'
  | 'nvptx'
  | 'nvptx64'
  | 'ppc32'
  | 'ppc64'
  | 'ppc64le'
  | 'r600'
  | 'riscv32'
  | 'riscv64'
  | 'sparc'
  | 'sparcel'
  | 'sparcv9'
  | 'systemz'
  | 'thumb'
  | 'thumbeb'
  | 'wasm32'
  | 'wasm64'
  | 'x86'
  | 'x86_64'
  | 'xcore'
export type LlvmArchitectureData = {
  host: string
  note: string
  cpu: Array<string>
  feature: Array<string>
}

export type LlvmCpu =
  | '440'
  | '450'
  | '601'
  | '602'
  | '603'
  | '604'
  | '620'
  | '750'
  | '970'
  | '7400'
  | '7450'
  | 'a_64_fx'
  | 'apple_a_10'
  | 'apple_a_11'
  | 'apple_a_12'
  | 'apple_a_13'
  | 'apple_a_7'
  | 'apple_a_8'
  | 'apple_a_9'
  | 'apple_latest'
  | 'apple_s_4'
  | 'apple_s_5'
  | 'carmel'
  | 'cortex_a_34'
  | 'cortex_a_35'
  | 'cortex_a_53'
  | 'cortex_a_55'
  | 'cortex_a_57'
  | 'cortex_a_65'
  | 'cortex_a_65_ae'
  | 'cortex_a_72'
  | 'cortex_a_73'
  | 'cortex_a_75'
  | 'cortex_a_76'
  | 'cortex_a_76_ae'
  | 'cortex_a_77'
  | 'cortex_a_78'
  | 'cortex_x_1'
  | 'cyclone'
  | 'exynos_m_3'
  | 'exynos_m_4'
  | 'exynos_m_5'
  | 'falkor'
  | 'generic'
  | 'kryo'
  | 'neoverse_e_1'
  | 'neoverse_n_1'
  | 'saphira'
  | 'thunderx'
  | 'thunderx_2_t_99'
  | 'thunderx_3_t_110'
  | 'thunderxt_81'
  | 'thunderxt_83'
  | 'thunderxt_88'
  | 'tsv_110'
  | 'bonaire'
  | 'carrizo'
  | 'fiji'
  | 'generic_hsa'
  | 'gfx_1010'
  | 'gfx_1011'
  | 'gfx_1012'
  | 'gfx_1030'
  | 'gfx_600'
  | 'gfx_601'
  | 'gfx_700'
  | 'gfx_701'
  | 'gfx_702'
  | 'gfx_703'
  | 'gfx_704'
  | 'gfx_801'
  | 'gfx_802'
  | 'gfx_803'
  | 'gfx_810'
  | 'gfx_900'
  | 'gfx_902'
  | 'gfx_904'
  | 'gfx_906'
  | 'gfx_908'
  | 'gfx_909'
  | 'hainan'
  | 'hawaii'
  | 'iceland'
  | 'kabini'
  | 'kaveri'
  | 'mullins'
  | 'oland'
  | 'pitcairn'
  | 'polaris_10'
  | 'polaris_11'
  | 'stoney'
  | 'tahiti'
  | 'tonga'
  | 'verde'
  | 'arm_1020_e'
  | 'arm_1020_t'
  | 'arm_1022_e'
  | 'arm_10_e'
  | 'arm_10_tdmi'
  | 'arm_1136_j_s'
  | 'arm_1136_jf_s'
  | 'arm_1156_t_2_s'
  | 'arm_1156_t_2_f_s'
  | 'arm_1176_j_s'
  | 'arm_1176_jz_s'
  | 'arm_1176_jzf_s'
  | 'arm_710_t'
  | 'arm_720_t'
  | 'arm_7_tdmi'
  | 'arm_7_tdmi_s'
  | 'arm_8'
  | 'arm_810'
  | 'arm_9'
  | 'arm_920'
  | 'arm_920_t'
  | 'arm_922_t'
  | 'arm_926_ej_s'
  | 'arm_940_t'
  | 'arm_946_e_s'
  | 'arm_966_e_s'
  | 'arm_968_e_s'
  | 'arm_9_e'
  | 'arm_9_tdmi'
  | 'cortex_a_12'
  | 'cortex_a_15'
  | 'cortex_a_17'
  | 'cortex_a_32'
  | 'cortex_a_5'
  | 'cortex_a_7'
  | 'cortex_a_8'
  | 'cortex_a_9'
  | 'cortex_m_0'
  | 'cortex_m_0_plus'
  | 'cortex_m_1'
  | 'cortex_m_23'
  | 'cortex_m_3'
  | 'cortex_m_33'
  | 'cortex_m_35_p'
  | 'cortex_m_4'
  | 'cortex_m_55'
  | 'cortex_m_7'
  | 'cortex_r_4'
  | 'cortex_r_4_f'
  | 'cortex_r_5'
  | 'cortex_r_52'
  | 'cortex_r_7'
  | 'cortex_r_8'
  | 'ep_9312'
  | 'iwmmxt'
  | 'krait'
  | 'mpcore'
  | 'mpcorenovfp'
  | 'sc_000'
  | 'sc_300'
  | 'strongarm'
  | 'strongarm_110'
  | 'strongarm_1100'
  | 'strongarm_1110'
  | 'swift'
  | 'xscale'
  | 'at_43_usb_320'
  | 'at_43_usb_355'
  | 'at_76_c_711'
  | 'at_86_rf_401'
  | 'at_90_c_8534'
  | 'at_90_can_128'
  | 'at_90_can_32'
  | 'at_90_can_64'
  | 'at_90_pwm_1'
  | 'at_90_pwm_161'
  | 'at_90_pwm_2'
  | 'at_90_pwm_216'
  | 'at_90_pwm_2_b'
  | 'at_90_pwm_3'
  | 'at_90_pwm_316'
  | 'at_90_pwm_3_b'
  | 'at_90_pwm_81'
  | 'at_90_s_1200'
  | 'at_90_s_2313'
  | 'at_90_s_2323'
  | 'at_90_s_2333'
  | 'at_90_s_2343'
  | 'at_90_s_4414'
  | 'at_90_s_4433'
  | 'at_90_s_4434'
  | 'at_90_s_8515'
  | 'at_90_s_8535'
  | 'at_90_scr_100'
  | 'at_90_usb_1286'
  | 'at_90_usb_1287'
  | 'at_90_usb_162'
  | 'at_90_usb_646'
  | 'at_90_usb_647'
  | 'at_90_usb_82'
  | 'at_94_k'
  | 'ata_5272'
  | 'ata_5505'
  | 'ata_5790'
  | 'ata_5795'
  | 'ata_6285'
  | 'ata_6286'
  | 'ata_6289'
  | 'atmega_103'
  | 'atmega_128'
  | 'atmega_1280'
  | 'atmega_1281'
  | 'atmega_1284'
  | 'atmega_1284_p'
  | 'atmega_1284_rfr_2'
  | 'atmega_128_a'
  | 'atmega_128_rfa_1'
  | 'atmega_128_rfr_2'
  | 'atmega_16'
  | 'atmega_161'
  | 'atmega_162'
  | 'atmega_163'
  | 'atmega_164_a'
  | 'atmega_164_p'
  | 'atmega_164_pa'
  | 'atmega_165'
  | 'atmega_165_a'
  | 'atmega_165_p'
  | 'atmega_165_pa'
  | 'atmega_168'
  | 'atmega_168_a'
  | 'atmega_168_p'
  | 'atmega_168_pa'
  | 'atmega_169'
  | 'atmega_169_a'
  | 'atmega_169_p'
  | 'atmega_169_pa'
  | 'atmega_16_a'
  | 'atmega_16_hva'
  | 'atmega_16_hva_2'
  | 'atmega_16_hvb'
  | 'atmega_16_hvbrevb'
  | 'atmega_16_m_1'
  | 'atmega_16_u_2'
  | 'atmega_16_u_4'
  | 'atmega_2560'
  | 'atmega_2561'
  | 'atmega_2564_rfr_2'
  | 'atmega_256_rfr_2'
  | 'atmega_32'
  | 'atmega_323'
  | 'atmega_324_a'
  | 'atmega_324_p'
  | 'atmega_324_pa'
  | 'atmega_325'
  | 'atmega_3250'
  | 'atmega_3250_a'
  | 'atmega_3250_p'
  | 'atmega_3250_pa'
  | 'atmega_325_a'
  | 'atmega_325_p'
  | 'atmega_325_pa'
  | 'atmega_328'
  | 'atmega_328_p'
  | 'atmega_329'
  | 'atmega_3290'
  | 'atmega_3290_a'
  | 'atmega_3290_p'
  | 'atmega_3290_pa'
  | 'atmega_329_a'
  | 'atmega_329_p'
  | 'atmega_329_pa'
  | 'atmega_32_a'
  | 'atmega_32_c_1'
  | 'atmega_32_hvb'
  | 'atmega_32_hvbrevb'
  | 'atmega_32_m_1'
  | 'atmega_32_u_2'
  | 'atmega_32_u_4'
  | 'atmega_32_u_6'
  | 'atmega_406'
  | 'atmega_48'
  | 'atmega_48_a'
  | 'atmega_48_p'
  | 'atmega_48_pa'
  | 'atmega_64'
  | 'atmega_640'
  | 'atmega_644'
  | 'atmega_644_a'
  | 'atmega_644_p'
  | 'atmega_644_pa'
  | 'atmega_644_rfr_2'
  | 'atmega_645'
  | 'atmega_6450'
  | 'atmega_6450_a'
  | 'atmega_6450_p'
  | 'atmega_645_a'
  | 'atmega_645_p'
  | 'atmega_649'
  | 'atmega_6490'
  | 'atmega_6490_a'
  | 'atmega_6490_p'
  | 'atmega_649_a'
  | 'atmega_649_p'
  | 'atmega_64_a'
  | 'atmega_64_c_1'
  | 'atmega_64_hve'
  | 'atmega_64_m_1'
  | 'atmega_64_rfr_2'
  | 'atmega_8'
  | 'atmega_8515'
  | 'atmega_8535'
  | 'atmega_88'
  | 'atmega_88_a'
  | 'atmega_88_p'
  | 'atmega_88_pa'
  | 'atmega_8_a'
  | 'atmega_8_hva'
  | 'atmega_8_u_2'
  | 'attiny_10'
  | 'attiny_102'
  | 'attiny_104'
  | 'attiny_11'
  | 'attiny_12'
  | 'attiny_13'
  | 'attiny_13_a'
  | 'attiny_15'
  | 'attiny_1634'
  | 'attiny_167'
  | 'attiny_20'
  | 'attiny_22'
  | 'attiny_2313'
  | 'attiny_2313_a'
  | 'attiny_24'
  | 'attiny_24_a'
  | 'attiny_25'
  | 'attiny_26'
  | 'attiny_261'
  | 'attiny_261_a'
  | 'attiny_28'
  | 'attiny_4'
  | 'attiny_40'
  | 'attiny_4313'
  | 'attiny_43_u'
  | 'attiny_44'
  | 'attiny_44_a'
  | 'attiny_45'
  | 'attiny_461'
  | 'attiny_461_a'
  | 'attiny_48'
  | 'attiny_5'
  | 'attiny_828'
  | 'attiny_84'
  | 'attiny_84_a'
  | 'attiny_85'
  | 'attiny_861'
  | 'attiny_861_a'
  | 'attiny_87'
  | 'attiny_88'
  | 'attiny_9'
  | 'atxmega_128_a_1'
  | 'atxmega_128_a_1_u'
  | 'atxmega_128_a_3'
  | 'atxmega_128_a_3_u'
  | 'atxmega_128_a_4_u'
  | 'atxmega_128_b_1'
  | 'atxmega_128_b_3'
  | 'atxmega_128_c_3'
  | 'atxmega_128_d_3'
  | 'atxmega_128_d_4'
  | 'atxmega_16_a_4'
  | 'atxmega_16_a_4_u'
  | 'atxmega_16_c_4'
  | 'atxmega_16_d_4'
  | 'atxmega_16_e_5'
  | 'atxmega_192_a_3'
  | 'atxmega_192_a_3_u'
  | 'atxmega_192_c_3'
  | 'atxmega_192_d_3'
  | 'atxmega_256_a_3'
  | 'atxmega_256_a_3_b'
  | 'atxmega_256_a_3_bu'
  | 'atxmega_256_a_3_u'
  | 'atxmega_256_c_3'
  | 'atxmega_256_d_3'
  | 'atxmega_32_a_4'
  | 'atxmega_32_a_4_u'
  | 'atxmega_32_c_4'
  | 'atxmega_32_d_4'
  | 'atxmega_32_e_5'
  | 'atxmega_32_x_1'
  | 'atxmega_384_c_3'
  | 'atxmega_384_d_3'
  | 'atxmega_64_a_1'
  | 'atxmega_64_a_1_u'
  | 'atxmega_64_a_3'
  | 'atxmega_64_a_3_u'
  | 'atxmega_64_a_4_u'
  | 'atxmega_64_b_1'
  | 'atxmega_64_b_3'
  | 'atxmega_64_c_3'
  | 'atxmega_64_d_3'
  | 'atxmega_64_d_4'
  | 'atxmega_8_e_5'
  | 'avr_1'
  | 'avr_2'
  | 'avr_25'
  | 'avr_3'
  | 'avr_31'
  | 'avr_35'
  | 'avr_4'
  | 'avr_5'
  | 'avr_51'
  | 'avr_6'
  | 'avrtiny'
  | 'avrxmega_1'
  | 'avrxmega_2'
  | 'avrxmega_3'
  | 'avrxmega_4'
  | 'avrxmega_5'
  | 'avrxmega_6'
  | 'avrxmega_7'
  | 'm_3000'
  | 'probe'
  | 'v_1'
  | 'v_2'
  | 'v_3'
  | 'hexagonv_5'
  | 'hexagonv_55'
  | 'hexagonv_60'
  | 'hexagonv_62'
  | 'hexagonv_65'
  | 'hexagonv_66'
  | 'hexagonv_67'
  | 'hexagonv_67_t'
  | 'mips_1'
  | 'mips_2'
  | 'mips_3'
  | 'mips_32'
  | 'mips_32_r_2'
  | 'mips_32_r_3'
  | 'mips_32_r_5'
  | 'mips_32_r_6'
  | 'mips_4'
  | 'mips_5'
  | 'mips_64'
  | 'mips_64_r_2'
  | 'mips_64_r_3'
  | 'mips_64_r_5'
  | 'mips_64_r_6'
  | 'octeon'
  | 'p_5600'
  | 'msp_430'
  | 'msp_430_x'
  | 'sm_20'
  | 'sm_21'
  | 'sm_30'
  | 'sm_32'
  | 'sm_35'
  | 'sm_37'
  | 'sm_50'
  | 'sm_52'
  | 'sm_53'
  | 'sm_60'
  | 'sm_61'
  | 'sm_62'
  | 'sm_70'
  | 'sm_72'
  | 'sm_75'
  | 'sm_80'
  | '603_e'
  | '603_ev'
  | '604_e'
  | 'a_2'
  | 'a_2_q'
  | 'e_500'
  | 'e_500_mc'
  | 'e_5500'
  | 'future'
  | 'g_3'
  | 'g_4'
  | 'g_5'
  | 'ppc'
  | 'ppc_32'
  | 'ppc_64'
  | 'ppc_64_le'
  | 'pwr_10'
  | 'pwr_3'
  | 'pwr_4'
  | 'pwr_5'
  | 'pwr_5_x'
  | 'pwr_6'
  | 'pwr_6_x'
  | 'pwr_7'
  | 'pwr_8'
  | 'pwr_9'
  | 'barts'
  | 'caicos'
  | 'cayman'
  | 'cedar'
  | 'cypress'
  | 'juniper'
  | 'r_600'
  | 'r_630'
  | 'redwood'
  | 'rs_880'
  | 'rv_670'
  | 'rv_710'
  | 'rv_730'
  | 'rv_770'
  | 'sumo'
  | 'turks'
  | 'generic_rv_32'
  | 'generic_rv_64'
  | 'rocket_rv_32'
  | 'rocket_rv_64'
  | 'sifive_e_31'
  | 'sifive_u_54'
  | 'at_697_e'
  | 'at_697_f'
  | 'f_934'
  | 'gr_712_rc'
  | 'gr_740'
  | 'hypersparc'
  | 'leon_2'
  | 'leon_3'
  | 'leon_4'
  | 'ma_2080'
  | 'ma_2085'
  | 'ma_2100'
  | 'ma_2150'
  | 'ma_2155'
  | 'ma_2450'
  | 'ma_2455'
  | 'ma_2480'
  | 'ma_2485'
  | 'ma_2_x_5_x'
  | 'ma_2_x_8_x'
  | 'myriad_2'
  | 'myriad_2_1'
  | 'myriad_2_2'
  | 'myriad_2_3'
  | 'niagara'
  | 'niagara_2'
  | 'niagara_3'
  | 'niagara_4'
  | 'sparclet'
  | 'sparclite'
  | 'sparclite_86_x'
  | 'supersparc'
  | 'tsc_701'
  | 'ultrasparc'
  | 'ultrasparc_3'
  | 'ut_699'
  | 'v_7'
  | 'v_8'
  | 'v_9'
  | 'arch_10'
  | 'arch_11'
  | 'arch_12'
  | 'arch_13'
  | 'arch_8'
  | 'arch_9'
  | 'z_10'
  | 'z_13'
  | 'z_14'
  | 'z_15'
  | 'z_196'
  | 'z_ec_12'
  | 'bleeding_edge'
  | 'mvp'
  | 'amdfam_10'
  | 'athlon'
  | 'athlon_4'
  | 'athlon_fx'
  | 'athlon_mp'
  | 'athlon_tbird'
  | 'athlon_xp'
  | 'athlon_64'
  | 'athlon_64_sse_3'
  | 'atom'
  | 'barcelona'
  | 'bdver_1'
  | 'bdver_2'
  | 'bdver_3'
  | 'bdver_4'
  | 'bonnell'
  | 'broadwell'
  | 'btver_1'
  | 'btver_2'
  | 'c_3'
  | 'c_3_2'
  | 'cannonlake'
  | 'cascadelake'
  | 'cooperlake'
  | 'core_avx_i'
  | 'core_avx_2'
  | 'core_2'
  | 'corei_7'
  | 'corei_7_avx'
  | 'geode'
  | 'goldmont'
  | 'goldmont_plus'
  | 'haswell'
  | 'i_386'
  | 'i_486'
  | 'i_586'
  | 'i_686'
  | 'icelake_client'
  | 'icelake_server'
  | 'ivybridge'
  | 'k_6'
  | 'k_6_2'
  | 'k_6_3'
  | 'k_8'
  | 'k_8_sse_3'
  | 'knl'
  | 'knm'
  | 'lakemont'
  | 'nehalem'
  | 'nocona'
  | 'opteron'
  | 'opteron_sse_3'
  | 'penryn'
  | 'pentium'
  | 'pentium_m'
  | 'pentium_mmx'
  | 'pentium_2'
  | 'pentium_3'
  | 'pentium_3_m'
  | 'pentium_4'
  | 'pentium_4_m'
  | 'pentiumpro'
  | 'prescott'
  | 'sandybridge'
  | 'silvermont'
  | 'skx'
  | 'skylake'
  | 'skylake_avx_512'
  | 'slm'
  | 'tigerlake'
  | 'tremont'
  | 'westmere'
  | 'winchip_c_6'
  | 'winchip_2'
  | 'x_86_64'
  | 'yonah'
  | 'znver_1'
  | 'znver_2'
export type LlvmCpuData = {
  host: string
  note: string
}

export type LlvmFeature =
  | 'a_35'
  | 'a_53'
  | 'a_55'
  | 'a_57'
  | 'a_64_fx'
  | 'a_65'
  | 'a_72'
  | 'a_73'
  | 'a_75'
  | 'a_76'
  | 'a_77'
  | 'aes'
  | 'aggressive_fma'
  | 'alternate_sextload_cvt_f_32_pattern'
  | 'altnzcv'
  | 'am'
  | 'amvs'
  | 'apple_a_10'
  | 'apple_a_11'
  | 'apple_a_12'
  | 'apple_a_13'
  | 'apple_a_7'
  | 'arith_bcc_fusion'
  | 'arith_cbz_fusion'
  | 'balance_fp_ops'
  | 'bf_16'
  | 'bti'
  | 'call_saved_x_10'
  | 'call_saved_x_11'
  | 'call_saved_x_12'
  | 'call_saved_x_13'
  | 'call_saved_x_14'
  | 'call_saved_x_15'
  | 'call_saved_x_18'
  | 'call_saved_x_8'
  | 'call_saved_x_9'
  | 'carmel'
  | 'ccdp'
  | 'ccidx'
  | 'ccpp'
  | 'complxnum'
  | 'cortex_a_78'
  | 'cortex_x_1'
  | 'crc'
  | 'crypto'
  | 'custom_cheap_as_move'
  | 'disable_latency_sched_heuristic'
  | 'dit'
  | 'dotprod'
  | 'ecv'
  | 'ete'
  | 'exynos_cheap_as_move'
  | 'exynosm_3'
  | 'exynosm_4'
  | 'f_32_mm'
  | 'f_64_mm'
  | 'falkor'
  | 'fgt'
  | 'fmi'
  | 'force_32_bit_jump_tables'
  | 'fp_armv_8'
  | 'fp_16_fml'
  | 'fptoint'
  | 'fullfp_16'
  | 'fuse_address'
  | 'fuse_aes'
  | 'fuse_arith_logic'
  | 'fuse_crypto_eor'
  | 'fuse_csel'
  | 'fuse_literals'
  | 'harden_sls_blr'
  | 'harden_sls_retbr'
  | 'i_8_mm'
  | 'jsconv'
  | 'kryo'
  | 'lor'
  | 'lse'
  | 'lsl_fast'
  | 'mpam'
  | 'mte'
  | 'neon'
  | 'neoversee_1'
  | 'neoversen_1'
  | 'no_neg_immediates'
  | 'nv'
  | 'pa'
  | 'pan'
  | 'pan_rwv'
  | 'perfmon'
  | 'pmu'
  | 'predictable_select_expensive'
  | 'predres'
  | 'rand'
  | 'ras'
  | 'rasv_8_4'
  | 'rcpc'
  | 'rcpc_immo'
  | 'rdm'
  | 'reserve_x_1'
  | 'reserve_x_10'
  | 'reserve_x_11'
  | 'reserve_x_12'
  | 'reserve_x_13'
  | 'reserve_x_14'
  | 'reserve_x_15'
  | 'reserve_x_18'
  | 'reserve_x_2'
  | 'reserve_x_20'
  | 'reserve_x_21'
  | 'reserve_x_22'
  | 'reserve_x_23'
  | 'reserve_x_24'
  | 'reserve_x_25'
  | 'reserve_x_26'
  | 'reserve_x_27'
  | 'reserve_x_28'
  | 'reserve_x_3'
  | 'reserve_x_30'
  | 'reserve_x_4'
  | 'reserve_x_5'
  | 'reserve_x_6'
  | 'reserve_x_7'
  | 'reserve_x_9'
  | 'saphira'
  | 'sb'
  | 'sel_2'
  | 'sha_2'
  | 'sha_3'
  | 'slow_misaligned_128_store'
  | 'slow_paired_128'
  | 'slow_strqro_store'
  | 'sm_4'
  | 'spe'
  | 'specrestrict'
  | 'ssbs'
  | 'strict_align'
  | 'sve'
  | 'sve_2'
  | 'sve_2_aes'
  | 'sve_2_bitperm'
  | 'sve_2_sha_3'
  | 'sve_2_sm_4'
  | 'tagged_globals'
  | 'thunderx'
  | 'thunderx_2_t_99'
  | 'thunderx_3_t_110'
  | 'thunderxt_81'
  | 'thunderxt_83'
  | 'thunderxt_88'
  | 'tlb_rmi'
  | 'tme'
  | 'tpidr_el_1'
  | 'tpidr_el_2'
  | 'tpidr_el_3'
  | 'tracev_8_4'
  | 'trbe'
  | 'tsv_110'
  | 'uaops'
  | 'use_aa'
  | 'use_experimental_zeroing_pseudos'
  | 'use_postra_scheduler'
  | 'use_reciprocal_square_root'
  | 'v_8_1_a'
  | 'v_8_2_a'
  | 'v_8_3_a'
  | 'v_8_4_a'
  | 'v_8_5_a'
  | 'v_8_6_a'
  | 'vh'
  | 'zcm'
  | 'zcz'
  | 'zcz_fp'
  | 'zcz_fp_workaround'
  | 'zcz_gp'
  | '16_bit_insts'
  | 'dump_code'
  | 'a_16'
  | 'add_no_carry_insts'
  | 'aperture_regs'
  | 'atomic_fadd_insts'
  | 'auto_waitcnt_before_barrier'
  | 'ci_insts'
  | 'code_object_v_3'
  | 'cumode'
  | 'dl_insts'
  | 'dot_1_insts'
  | 'dot_2_insts'
  | 'dot_3_insts'
  | 'dot_4_insts'
  | 'dot_5_insts'
  | 'dot_6_insts'
  | 'dpp'
  | 'dpp_8'
  | 'ds_src_2_insts'
  | 'dumpcode'
  | 'enable_ds_128'
  | 'enable_prt_strict_null'
  | 'fast_denormal_f_32'
  | 'fast_fmaf'
  | 'flat_address_space'
  | 'flat_for_global'
  | 'flat_global_insts'
  | 'flat_inst_offsets'
  | 'flat_scratch_insts'
  | 'flat_segment_offset_bug'
  | 'fma_mix_insts'
  | 'fmaf'
  | 'fp_64'
  | 'g_16'
  | 'gcn_3_encoding'
  | 'get_wave_id_inst'
  | 'gfx_10'
  | 'gfx_10_3_insts'
  | 'gfx_10_insts'
  | 'gfx_10_b_encoding'
  | 'gfx_7_gfx_8_gfx_9_insts'
  | 'gfx_8_insts'
  | 'gfx_9'
  | 'gfx_9_insts'
  | 'half_rate_64_ops'
  | 'inst_fwd_prefetch_bug'
  | 'int_clamp_insts'
  | 'inv_2_pi_inline_imm'
  | 'lds_branch_vmem_war_hazard'
  | 'lds_misaligned_bug'
  | 'ldsbankcount_16'
  | 'ldsbankcount_32'
  | 'load_store_opt'
  | 'localmemorysize_0'
  | 'localmemorysize_32768'
  | 'localmemorysize_65536'
  | 'mad_mac_f_32_insts'
  | 'mad_mix_insts'
  | 'mai_insts'
  | 'max_private_element_size_16'
  | 'max_private_element_size_4'
  | 'max_private_element_size_8'
  | 'mfma_inline_literal_bug'
  | 'mimg_r_128'
  | 'movrel'
  | 'no_data_dep_hazard'
  | 'no_sdst_cmpx'
  | 'no_sram_ecc_support'
  | 'no_xnack_support'
  | 'nsa_encoding'
  | 'nsa_to_vmem_bug'
  | 'offset_3_f_bug'
  | 'pk_fmac_f_16_inst'
  | 'promote_alloca'
  | 'r_128_a_16'
  | 'register_banking'
  | 's_memrealtime'
  | 's_memtime_inst'
  | 'scalar_atomics'
  | 'scalar_flat_scratch_insts'
  | 'scalar_stores'
  | 'sdwa'
  | 'sdwa_mav'
  | 'sdwa_omod'
  | 'sdwa_out_mods_vopc'
  | 'sdwa_scalar'
  | 'sdwa_sdst'
  | 'sea_islands'
  | 'sgpr_init_bug'
  | 'si_scheduler'
  | 'smem_to_vector_write_hazard'
  | 'southern_islands'
  | 'sram_ecc'
  | 'trap_handler'
  | 'trig_reduced_range'
  | 'unaligned_buffer_access'
  | 'unaligned_scratch_access'
  | 'unpacked_d_16_vmem'
  | 'unsafe_ds_offset_folding'
  | 'vcmpx_exec_war_hazard'
  | 'vcmpx_permlane_hazard'
  | 'vgpr_index_mode'
  | 'vmem_to_scalar_write_hazard'
  | 'volcanic_islands'
  | 'vop_3_literal'
  | 'vop_3_p'
  | 'vscnt'
  | 'wavefrontsize_16'
  | 'wavefrontsize_32'
  | 'wavefrontsize_64'
  | 'xnack'
  | '32_bit'
  | '8_msecext'
  | 'a_12'
  | 'a_15'
  | 'a_17'
  | 'a_32'
  | 'a_5'
  | 'a_7'
  | 'a_8'
  | 'a_9'
  | 'aclass'
  | 'acquire_release'
  | 'armv_2'
  | 'armv_2_a'
  | 'armv_3'
  | 'armv_3_m'
  | 'armv_4'
  | 'armv_4_t'
  | 'armv_5_t'
  | 'armv_5_te'
  | 'armv_5_tej'
  | 'armv_6'
  | 'armv_6_m'
  | 'armv_6_j'
  | 'armv_6_k'
  | 'armv_6_kz'
  | 'armv_6_s_m'
  | 'armv_6_t_2'
  | 'armv_7_a'
  | 'armv_7_m'
  | 'armv_7_r'
  | 'armv_7_e_m'
  | 'armv_7_k'
  | 'armv_7_s'
  | 'armv_7_ve'
  | 'armv_8_a'
  | 'armv_8_m_base'
  | 'armv_8_m_main'
  | 'armv_8_r'
  | 'armv_8_1_a'
  | 'armv_8_1_m_main'
  | 'armv_8_2_a'
  | 'armv_8_3_a'
  | 'armv_8_4_a'
  | 'armv_8_5_a'
  | 'armv_8_6_a'
  | 'avoid_movs_shop'
  | 'avoid_partial_cpsr'
  | 'cde'
  | 'cdecp_0'
  | 'cdecp_1'
  | 'cdecp_2'
  | 'cdecp_3'
  | 'cdecp_4'
  | 'cdecp_5'
  | 'cdecp_6'
  | 'cdecp_7'
  | 'cheap_predicable_cpsr'
  | 'd_32'
  | 'db'
  | 'dfb'
  | 'disable_postra_scheduler'
  | 'dont_widen_vmovs'
  | 'dsp'
  | 'execute_only'
  | 'expand_fp_mlx'
  | 'exynos'
  | 'fp_armv_8_d_16'
  | 'fp_armv_8_d_16_sp'
  | 'fp_armv_8_sp'
  | 'fp_16'
  | 'fpao'
  | 'fpregs'
  | 'fpregs_16'
  | 'fpregs_64'
  | 'hwdiv'
  | 'hwdiv_arm'
  | 'iwmmxt'
  | 'iwmmxt_2'
  | 'krait'
  | 'lob'
  | 'long_calls'
  | 'loop_align'
  | 'm_3'
  | 'mclass'
  | 'mp'
  | 'muxed_units'
  | 'mve'
  | 'mve_fp'
  | 'mve_1_beat'
  | 'mve_2_beat'
  | 'mve_4_beat'
  | 'nacl_trap'
  | 'neon_fpmovs'
  | 'neonfp'
  | 'no_branch_predictor'
  | 'no_movt'
  | 'noarm'
  | 'nonpipelined_vfp'
  | 'prefer_ishst'
  | 'prefer_vmovsr'
  | 'prof_unpr'
  | 'r_4'
  | 'r_5'
  | 'r_52'
  | 'r_7'
  | 'rclass'
  | 'read_tp_hard'
  | 'reserve_r_9'
  | 'ret_addr_stack'
  | 'slow_fp_brcc'
  | 'slow_load_d_subreg'
  | 'slow_odd_reg'
  | 'slow_vdup_32'
  | 'slow_vgetlni_32'
  | 'slowfpvfmx'
  | 'slowfpvmlx'
  | 'soft_float'
  | 'splat_vfp_neon'
  | 'swift'
  | 'thumb_mode'
  | 'thumb_2'
  | 'trustzone'
  | 'use_misched'
  | 'v_4_t'
  | 'v_5_t'
  | 'v_5_te'
  | 'v_6'
  | 'v_6_k'
  | 'v_6_m'
  | 'v_6_t_2'
  | 'v_7'
  | 'v_7_clrex'
  | 'v_8'
  | 'v_8_1_m_main'
  | 'v_8_m'
  | 'v_8_m_main'
  | 'vfp_2'
  | 'vfp_2_sp'
  | 'vfp_3'
  | 'vfp_3_d_16'
  | 'vfp_3_d_16_sp'
  | 'vfp_3_sp'
  | 'vfp_4'
  | 'vfp_4_d_16'
  | 'vfp_4_d_16_sp'
  | 'vfp_4_sp'
  | 'virtualization'
  | 'vldn_align'
  | 'vmlx_forwarding'
  | 'vmlx_hazards'
  | 'wide_stride_vfp'
  | 'xscale'
  | 'addsubiw'
  | 'avr_0'
  | 'avr_1'
  | 'avr_2'
  | 'avr_25'
  | 'avr_3'
  | 'avr_31'
  | 'avr_35'
  | 'avr_4'
  | 'avr_5'
  | 'avr_51'
  | 'avr_6'
  | 'avrtiny'
  | 'break'
  | 'des'
  | 'eijmpcall'
  | 'elpm'
  | 'elpmx'
  | 'ijmpcall'
  | 'jmpcall'
  | 'lpm'
  | 'lpmx'
  | 'memmappedregs'
  | 'movw'
  | 'mul'
  | 'rmw'
  | 'smallstack'
  | 'special'
  | 'spm'
  | 'spmx'
  | 'sram'
  | 'tinyencoding'
  | 'xmega'
  | 'xmegau'
  | 'alu_32'
  | 'dummy'
  | 'dwarfris'
  | 'audio'
  | 'compound'
  | 'duplex'
  | 'hvx'
  | 'hvx_length_128_b'
  | 'hvx_length_64_b'
  | 'hvxv_60'
  | 'hvxv_62'
  | 'hvxv_65'
  | 'hvxv_66'
  | 'hvxv_67'
  | 'mem_noshuf'
  | 'memops'
  | 'noreturn_stack_elim'
  | 'nvj'
  | 'nvs'
  | 'packets'
  | 'prev_65'
  | 'reserved_r_19'
  | 'small_data'
  | 'tinycore'
  | 'unsafe_fp'
  | 'v_5'
  | 'v_55'
  | 'v_60'
  | 'v_62'
  | 'v_65'
  | 'v_66'
  | 'v_67'
  | 'zreg'
  | 'abs_2008'
  | 'cnmips'
  | 'cnmipsp'
  | 'dspr_2'
  | 'dspr_3'
  | 'eva'
  | 'fpxx'
  | 'ginv'
  | 'gp_64'
  | 'micromips'
  | 'mips_1'
  | 'mips_16'
  | 'mips_2'
  | 'mips_3'
  | 'mips_32'
  | 'mips_32_r_2'
  | 'mips_32_r_3'
  | 'mips_32_r_5'
  | 'mips_32_r_6'
  | 'mips_3_32'
  | 'mips_3_32_r_2'
  | 'mips_3_d'
  | 'mips_4'
  | 'mips_4_32'
  | 'mips_4_32_r_2'
  | 'mips_5'
  | 'mips_5_32_r_2'
  | 'mips_64'
  | 'mips_64_r_2'
  | 'mips_64_r_3'
  | 'mips_64_r_5'
  | 'mips_64_r_6'
  | 'msa'
  | 'mt'
  | 'nan_2008'
  | 'noabicalls'
  | 'nomadd_4'
  | 'nooddspreg'
  | 'p_5600'
  | 'ptr_64'
  | 'single_float'
  | 'sym_32'
  | 'use_indirect_jump_hazard'
  | 'use_tcc_in_div'
  | 'vfpu'
  | 'virt'
  | 'xgot'
  | 'ext'
  | 'hwmult_16'
  | 'hwmult_32'
  | 'hwmultf_5'
  | 'ptx_32'
  | 'ptx_40'
  | 'ptx_41'
  | 'ptx_42'
  | 'ptx_43'
  | 'ptx_50'
  | 'ptx_60'
  | 'ptx_61'
  | 'ptx_63'
  | 'ptx_64'
  | 'ptx_65'
  | 'ptx_70'
  | 'sm_20'
  | 'sm_21'
  | 'sm_30'
  | 'sm_32'
  | 'sm_35'
  | 'sm_37'
  | 'sm_50'
  | 'sm_52'
  | 'sm_53'
  | 'sm_60'
  | 'sm_61'
  | 'sm_62'
  | 'sm_70'
  | 'sm_72'
  | 'sm_75'
  | 'sm_80'
  | '64_bit'
  | '64_bitregs'
  | 'allow_unaligned_fp_access'
  | 'altivec'
  | 'booke'
  | 'bpermd'
  | 'cmpb'
  | 'crbits'
  | 'direct_move'
  | 'e_500'
  | 'extdiv'
  | 'fcpsgn'
  | 'float_128'
  | 'fpcvt'
  | 'fprnd'
  | 'fpu'
  | 'fre'
  | 'fres'
  | 'frsqrte'
  | 'frsqrtes'
  | 'fsqrt'
  | 'fuse_addi_load'
  | 'fuse_addis_load'
  | 'fusion'
  | 'hard_float'
  | 'htm'
  | 'icbt'
  | 'invariant_function_descriptors'
  | 'isa_v_30_instructions'
  | 'isa_v_31_instructions'
  | 'isel'
  | 'ldbrx'
  | 'lfiwax'
  | 'longcall'
  | 'mfocrf'
  | 'msync'
  | 'partword_atomics'
  | 'pcrelative_memops'
  | 'popcntd'
  | 'power_10_vector'
  | 'power_8_altivec'
  | 'power_8_vector'
  | 'power_9_altivec'
  | 'power_9_vector'
  | 'ppc_postra_sched'
  | 'ppc_prera_sched'
  | 'ppc_4_xx'
  | 'ppc_6_xx'
  | 'prefix_instrs'
  | 'qpx'
  | 'recipprec'
  | 'secure_plt'
  | 'slow_popcntd'
  | 'stfiwx'
  | 'two_const_nr'
  | 'vectors_use_two_units'
  | 'vsx'
  | 'has_vertex_cache'
  | 'r_600_alu_inst'
  | 'cayman_isa'
  | 'cfalubug'
  | 'evergreen'
  | 'fetch_16'
  | 'fetch_8'
  | 'northern_islands'
  | 'r_600'
  | 'r_700'
  | 'a'
  | 'c'
  | 'd'
  | 'e'
  | 'experimental_b'
  | 'experimental_v'
  | 'experimental_zbb'
  | 'experimental_zbc'
  | 'experimental_zbe'
  | 'experimental_zbf'
  | 'experimental_zbm'
  | 'experimental_zbp'
  | 'experimental_zbproposedc'
  | 'experimental_zbr'
  | 'experimental_zbs'
  | 'experimental_zbt'
  | 'f'
  | 'm'
  | 'no_rvc_hints'
  | 'relax'
  | 'reserve_x_16'
  | 'reserve_x_17'
  | 'reserve_x_19'
  | 'reserve_x_29'
  | 'reserve_x_31'
  | 'reserve_x_8'
  | 'save_restore'
  | 'deprecated_v_8'
  | 'detectroundchange'
  | 'fixallfdivsqrt'
  | 'hard_quad_float'
  | 'hasleoncasa'
  | 'hasumacsmac'
  | 'insertnopload'
  | 'leon'
  | 'leoncyclecounter'
  | 'leonpwrpsr'
  | 'no_fmuls'
  | 'no_fsmuld'
  | 'popc'
  | 'soft_mul_div'
  | 'v_9'
  | 'vis'
  | 'vis_2'
  | 'vis_3'
  | 'deflate_conversion'
  | 'dfp_packed_conversion'
  | 'dfp_zoned_conversion'
  | 'distinct_ops'
  | 'enhanced_dat_2'
  | 'enhanced_sort'
  | 'execution_hint'
  | 'fast_serialization'
  | 'fp_extension'
  | 'guarded_storage'
  | 'high_word'
  | 'insert_reference_bits_multiple'
  | 'interlocked_access_1'
  | 'load_and_trap'
  | 'load_and_zero_rightmost_byte'
  | 'load_store_on_cond'
  | 'load_store_on_cond_2'
  | 'message_security_assist_extension_3'
  | 'message_security_assist_extension_4'
  | 'message_security_assist_extension_5'
  | 'message_security_assist_extension_7'
  | 'message_security_assist_extension_8'
  | 'message_security_assist_extension_9'
  | 'miscellaneous_extensions'
  | 'miscellaneous_extensions_2'
  | 'miscellaneous_extensions_3'
  | 'population_count'
  | 'processor_assist'
  | 'reset_reference_bits_multiple'
  | 'transactional_execution'
  | 'vector'
  | 'vector_enhancements_1'
  | 'vector_enhancements_2'
  | 'vector_packed_decimal'
  | 'vector_packed_decimal_enhancement'
  | 'atomics'
  | 'bulk_memory'
  | 'exception_handling'
  | 'multivalue'
  | 'mutable_globals'
  | 'nontrapping_fptoint'
  | 'reference_types'
  | 'sign_ext'
  | 'simd_128'
  | 'tail_call'
  | 'unimplemented_simd_128'
  | '16_bit_mode'
  | '32_bit_mode'
  | '3_dnow'
  | '3_dnowa'
  | '64_bit_mode'
  | 'adx'
  | 'amx_bf_16'
  | 'amx_int_8'
  | 'amx_tile'
  | 'avx'
  | 'avx_2'
  | 'avx_512_bf_16'
  | 'avx_512_bitalg'
  | 'avx_512_bw'
  | 'avx_512_cd'
  | 'avx_512_dq'
  | 'avx_512_er'
  | 'avx_512_f'
  | 'avx_512_ifma'
  | 'avx_512_pf'
  | 'avx_512_vbmi'
  | 'avx_512_vbmi_2'
  | 'avx_512_vl'
  | 'avx_512_vnni'
  | 'avx_512_vp_2_intersect'
  | 'avx_512_vpopcntdq'
  | 'bmi'
  | 'bmi_2'
  | 'branchfusion'
  | 'cldemote'
  | 'clflushopt'
  | 'clwb'
  | 'clzero'
  | 'cmov'
  | 'cx_16'
  | 'cx_8'
  | 'enqcmd'
  | 'ermsb'
  | 'f_16_c'
  | 'false_deps_lzcnt_tzcnt'
  | 'false_deps_popcnt'
  | 'fast_11_bytenop'
  | 'fast_15_bytenop'
  | 'fast_7_bytenop'
  | 'fast_bextr'
  | 'fast_gather'
  | 'fast_hops'
  | 'fast_lzcnt'
  | 'fast_scalar_fsqrt'
  | 'fast_scalar_shift_masks'
  | 'fast_shld_rotate'
  | 'fast_variable_shuffle'
  | 'fast_vector_fsqrt'
  | 'fast_vector_shift_masks'
  | 'fma'
  | 'fma_4'
  | 'fsgsbase'
  | 'fxsr'
  | 'gfni'
  | 'idivl_to_divb'
  | 'idivq_to_divl'
  | 'invpcid'
  | 'lea_sp'
  | 'lea_uses_ag'
  | 'lvi_cfi'
  | 'lvi_load_hardening'
  | 'lwp'
  | 'lzcnt'
  | 'macrofusion'
  | 'merge_to_threeway_branch'
  | 'mmx'
  | 'movbe'
  | 'movdir_64_b'
  | 'movdiri'
  | 'mpx'
  | 'mwaitx'
  | 'nopl'
  | 'pad_short_functions'
  | 'pclmul'
  | 'pconfig'
  | 'pku'
  | 'popcnt'
  | 'prefer_128_bit'
  | 'prefer_256_bit'
  | 'prefer_mask_registers'
  | 'prefetchwt_1'
  | 'prfchw'
  | 'ptwrite'
  | 'rdpid'
  | 'rdrnd'
  | 'rdseed'
  | 'retpoline'
  | 'retpoline_external_thunk'
  | 'retpoline_indirect_branches'
  | 'retpoline_indirect_calls'
  | 'rtm'
  | 'sahf'
  | 'serialize'
  | 'seses'
  | 'sgx'
  | 'sha'
  | 'shstk'
  | 'slow_3_ops_lea'
  | 'slow_incdec'
  | 'slow_lea'
  | 'slow_pmaddwd'
  | 'slow_pmulld'
  | 'slow_shld'
  | 'slow_two_mem_ops'
  | 'slow_unaligned_mem_16'
  | 'slow_unaligned_mem_32'
  | 'sse'
  | 'sse_unaligned_mem'
  | 'sse_2'
  | 'sse_3'
  | 'sse_4_1'
  | 'sse_4_2'
  | 'sse_4_a'
  | 'ssse_3'
  | 'tbm'
  | 'tsxldtrk'
  | 'use_glm_div_sqrt_costs'
  | 'vaes'
  | 'vpclmulqdq'
  | 'vzeroupper'
  | 'waitpkg'
  | 'wbnoinvd'
  | 'x_87'
  | 'xop'
  | 'xsave'
  | 'xsavec'
  | 'xsaveopt'
  | 'xsaves'
export type LlvmFeatureData = {
  host: string
  note: string
}

export type LlvmOptimizationLevel = '0' | '1' | '2' | '3'
export type LocalInputPath = {
  path: string
}
export type LocalOutputPath = {
  path: string
}
export type LocalPath = {
  path: string
}
export type NamedSymbolSet = {
  form: 'named-symbol-set'
  name: SymbolSet
}
export type NamedWordSet = {
  form: 'named-word-set'
  name: WordSet
}

export type ObjdumpDemangleStyle =
  | 'none'
  | 'auto'
  | 'gnu-v3'
  | 'java'
  | 'gnat'
  | 'dlang'
  | 'rust'

export type ObjdumpHideOption = 'address' | 'instruction_byte'

export type ObjdumpShowOption =
  | 'archive_header'
  | 'debugging_info'
  | 'section_header_summary'
  | 'source_code'
  | 'all_header'
export type PandocFormatData = {
  head: string
}

export type PandocInputFormat =
  | 'bibtex'
  | 'biblatex'
  | 'bits'
  | 'commonmark'
  | 'commonmark_x'
  | 'creole'
  | 'csljson'
  | 'csv'
  | 'tsv'
  | 'docbook'
  | 'docx'
  | 'dokuwiki'
  | 'endnotexml'
  | 'epub'
  | 'fb2'
  | 'gfm'
  | 'haddock'
  | 'html'
  | 'ipynb'
  | 'jats'
  | 'jira'
  | 'json'
  | 'latex'
  | 'markdown'
  | 'markdown_mmd'
  | 'markdown_phpextra'
  | 'markdown_strict'
  | 'mediawiki'
  | 'man'
  | 'muse'
  | 'native'
  | 'odt'
  | 'opml'
  | 'org'
  | 'ris'
  | 'rtf'
  | 'rst'
  | 't2t'
  | 'textile'
  | 'tikiwiki'
  | 'twiki'
  | 'typst'
  | 'vimwiki'

export type PandocOutputFormat =
  | 'asciidoc'
  | 'asciidoc_legacy'
  | 'asciidoctor'
  | 'beamer'
  | 'bibtex'
  | 'biblatex'
  | 'chunkedhtml'
  | 'commonmark'
  | 'commonmark_x'
  | 'context'
  | 'csljson'
  | 'docbook4'
  | 'docbook5'
  | 'docx'
  | 'dokuwiki'
  | 'epub3'
  | 'epub2'
  | 'fb2'
  | 'gfm'
  | 'haddock'
  | 'html5'
  | 'html4'
  | 'icml'
  | 'ipynb'
  | 'jats_archiving'
  | 'jats_articleauthoring'
  | 'jats_publishing'
  | 'jats'
  | 'jira'
  | 'json'
  | 'latex'
  | 'man'
  | 'markdown'
  | 'markdown_mmd'
  | 'markdown_phpextra'
  | 'markdown_strict'
  | 'markua'
  | 'mediawiki'
  | 'ms'
  | 'muse'
  | 'native'
  | 'odt'
  | 'opml'
  | 'opendocument'
  | 'org'
  | 'pdf'
  | 'plain'
  | 'pptx'
  | 'rst'
  | 'rtf'
  | 'texinfo'
  | 'textile'
  | 'slideous'
  | 'slidy'
  | 'dzslides'
  | 'revealjs'
  | 's5'
  | 'tei'
  | 'typst'
  | 'xwiki'
  | 'zimwiki'

export type PatoolFormat =
  | '7z'
  | 'ace'
  | 'adf'
  | 'alzip'
  | 'ape'
  | 'ar'
  | 'arc'
  | 'arj'
  | 'bzip2'
  | 'bzip3'
  | 'cab'
  | 'chm'
  | 'compress'
  | 'cpio'
  | 'deb'
  | 'dms'
  | 'flac'
  | 'gzip'
  | 'iso'
  | 'lrzip'
  | 'lzh'
  | 'lzip'
  | 'lzma'
  | 'lzop'
  | 'rpm'
  | 'rar'
  | 'rzip'
  | 'shn'
  | 'tar'
  | 'xz'
  | 'zip'
  | 'zoo'
  | 'zstandard'

export type PdfLatexInputFormat = 'tex'

export type PdfLatexOutputFormat = 'pdf'

export type PleasantAdjective =
  | 'aged'
  | 'ancient'
  | 'autumn'
  | 'billowing'
  | 'bitter'
  | 'black'
  | 'blue'
  | 'bold'
  | 'broad'
  | 'broken'
  | 'calm'
  | 'cold'
  | 'cool'
  | 'crimson'
  | 'curly'
  | 'damp'
  | 'dark'
  | 'dawn'
  | 'delicate'
  | 'divine'
  | 'dry'
  | 'empty'
  | 'falling'
  | 'fancy'
  | 'flat'
  | 'floral'
  | 'fragrant'
  | 'frosty'
  | 'gentle'
  | 'green'
  | 'hidden'
  | 'holy'
  | 'icy'
  | 'jolly'
  | 'late'
  | 'lingering'
  | 'little'
  | 'lively'
  | 'long'
  | 'lucky'
  | 'misty'
  | 'morning'
  | 'muddy'
  | 'mute'
  | 'nameless'
  | 'noisy'
  | 'odd'
  | 'old'
  | 'orange'
  | 'patient'
  | 'plain'
  | 'polished'
  | 'proud'
  | 'purple'
  | 'quiet'
  | 'rapid'
  | 'raspy'
  | 'red'
  | 'restless'
  | 'rough'
  | 'round'
  | 'royal'
  | 'shiny'
  | 'shrill'
  | 'shy'
  | 'silent'
  | 'small'
  | 'snowy'
  | 'soft'
  | 'solitary'
  | 'sparkling'
  | 'spring'
  | 'square'
  | 'steep'
  | 'still'
  | 'summer'
  | 'super'
  | 'sweet'
  | 'throbbing'
  | 'tight'
  | 'tiny'
  | 'twilight'
  | 'wandering'
  | 'weathered'
  | 'white'
  | 'wild'
  | 'winter'
  | 'wispy'
  | 'withered'
  | 'yellow'
  | 'young'

export type PleasantNoun =
  | 'art'
  | 'band'
  | 'bar'
  | 'base'
  | 'bird'
  | 'block'
  | 'boat'
  | 'bonus'
  | 'bread'
  | 'breeze'
  | 'brook'
  | 'bush'
  | 'butterfly'
  | 'cake'
  | 'cell'
  | 'cherry'
  | 'cloud'
  | 'credit'
  | 'darkness'
  | 'dawn'
  | 'dew'
  | 'disk'
  | 'dream'
  | 'dust'
  | 'feather'
  | 'field'
  | 'fire'
  | 'firefly'
  | 'flower'
  | 'fog'
  | 'forest'
  | 'frog'
  | 'frost'
  | 'glade'
  | 'glitter'
  | 'grass'
  | 'hall'
  | 'hat'
  | 'haze'
  | 'heart'
  | 'hill'
  | 'king'
  | 'lab'
  | 'lake'
  | 'leaf'
  | 'limit'
  | 'math'
  | 'meadow'
  | 'mode'
  | 'moon'
  | 'morning'
  | 'mountain'
  | 'mouse'
  | 'mud'
  | 'night'
  | 'paper'
  | 'pine'
  | 'poetry'
  | 'pond'
  | 'queen'
  | 'rain'
  | 'recipe'
  | 'resonance'
  | 'rice'
  | 'river'
  | 'salad'
  | 'scene'
  | 'sea'
  | 'shadow'
  | 'shape'
  | 'silence'
  | 'sky'
  | 'smoke'
  | 'snow'
  | 'snowflake'
  | 'sound'
  | 'star'
  | 'sun'
  | 'sun'
  | 'sunset'
  | 'surf'
  | 'term'
  | 'thunder'
  | 'tooth'
  | 'tree'
  | 'truth'
  | 'union'
  | 'unit'
  | 'violet'
  | 'voice'
  | 'water'
  | 'waterfall'
  | 'wave'
  | 'wildflower'
  | 'wind'
  | 'wood'

export type PrettierArrowParensOption = 'always' | 'avoid'

export type PrettierEndOfLineOption = 'lf' | 'crlf' | 'cr' | 'auto'

export type PrettierHtmlWhitespaceSensitivityOption =
  | 'css'
  | 'strict'
  | 'ignore'

export type PrettierPlugin =
  | 'angular'
  | 'flow'
  | 'glimmer'
  | 'graphql'
  | 'html'
  | 'markdown'
  | 'meriyah'
  | 'postcss'
  | 'typescript'
  | 'yaml'

export type PrettierProseWrapOption = 'always' | 'never' | 'preserve'

export type PrettierTypescriptTrailingCommaOption =
  | 'all'
  | 'es5'
  | 'none'

export type PrettierXmlQuoteAttributesOption =
  | 'preserve'
  | 'single'
  | 'double'

export type PrettierXmlWhitespaceSensitivityOption =
  | 'strict'
  | 'preserve'
  | 'ignore'

export type PuppeteerInputFormat = 'html'

export type PuppeteerLifeCycleEvent =
  | 'load'
  | 'domcontentloaded'
  | 'networkidle0'
  | 'networkidle2'
export type PuppeteerLifeCycleEventContentValue =
  PuppeteerLifeCycleEventData

export type PuppeteerLifeCycleEventContent = Record<
  PuppeteerLifeCycleEvent,
  PuppeteerLifeCycleEventContentValue
>
export type PuppeteerLifeCycleEventData = {
  note: string
}

export type PuppeteerMarkdownInputFormat = 'md'

export type PuppeteerOutputFormat = 'pdf' | 'png'

export type PuppeteerTxtInputFormat = 'txt'

export type QrCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

export type QrCodeFormat = 'png' | 'jpg' | 'webp'
export type RemoteInputPath = {
  path: string
}
export type RemoteOutputPath = {
  path: string
}
export type RemotePath = {
  path: string
}
export type RemoveAudioFromVideoWithFfmpeg = {
  inputPath: string
  outputPath: string
}
export type RemoveImageMetadata = {
  input: {
    format: string
    file: {
      path: string
    }
  }
}
export type ReplaceImageColorWithImageMagick = {
  inputPath: string
  outputPath: string
  startColor: string
  endColor: string
  fuzz: number
}
export type Request = {
  path: string
  body: object
}
export type ResizeImageWithImageMagick = {
  inputPath: string
  outputPath: string
  width: number
  height: number
  stretch: boolean
  gravity: ImageMagickGravity
}
export type ResolveInputForCompileLocalExternal = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForCompileLocalInternal = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForCompileRemote = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForConvertLocalExternal = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForConvertLocalInternal = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForConvertRemote = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForFormatLocalExternal = {
  pathScope?: string
  format: string
  input: {
    file: FilePath | FileContent
  }
  output: {
    file?: LocalPath
  }
}
export type ResolveInputForFormatLocalInternal = {
  pathScope?: string
  format: string
  input: {
    file: FilePath | FileContent
  }
  output: {
    file?: LocalPath
  }
}
export type ResolveInputForFormatRemote = {
  pathScope?: string
  format: string
  input: {
    file: FilePath | FileContent
  }
  output: {
    file?: LocalPath
  }
}
export type ResolveInputForSanitizeLocalExternal = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForSanitizeLocalInternal = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}
export type ResolveInputForSanitizeRemote = {
  pathScope?: string
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
}

export type RustCompilerTarget =
  | 'aarch64-apple-darwin'
  | 'aarch64-apple-ios'
  | 'aarch64-apple-ios-macabi'
  | 'aarch64-apple-ios-sim'
  | 'aarch64-apple-tvos'
  | 'aarch64-apple-tvos-sim'
  | 'aarch64-apple-watchos-sim'
  | 'aarch64-fuchsia'
  | 'aarch64-kmc-solid_asp3'
  | 'aarch64-linux-android'
  | 'aarch64-nintendo-switch-freestanding'
  | 'aarch64-pc-windows-gnullvm'
  | 'aarch64-pc-windows-msvc'
  | 'aarch64-unknown-freebsd'
  | 'aarch64-unknown-fuchsia'
  | 'aarch64-unknown-hermit'
  | 'aarch64-unknown-linux-gnu'
  | 'aarch64-unknown-linux-gnu_ilp32'
  | 'aarch64-unknown-linux-musl'
  | 'aarch64-unknown-linux-ohos'
  | 'aarch64-unknown-netbsd'
  | 'aarch64-unknown-none'
  | 'aarch64-unknown-none-softfloat'
  | 'aarch64-unknown-nto-qnx710'
  | 'aarch64-unknown-openbsd'
  | 'aarch64-unknown-redox'
  | 'aarch64-unknown-teeos'
  | 'aarch64-unknown-uefi'
  | 'aarch64-uwp-windows-msvc'
  | 'aarch64-wrs-vxworks'
  | 'aarch64_be-unknown-linux-gnu'
  | 'aarch64_be-unknown-linux-gnu_ilp32'
  | 'aarch64_be-unknown-netbsd'
  | 'arm-linux-androideabi'
  | 'arm-unknown-linux-gnueabi'
  | 'arm-unknown-linux-gnueabihf'
  | 'arm-unknown-linux-musleabi'
  | 'arm-unknown-linux-musleabihf'
  | 'arm64_32-apple-watchos'
  | 'armeb-unknown-linux-gnueabi'
  | 'armebv7r-none-eabi'
  | 'armebv7r-none-eabihf'
  | 'armv4t-none-eabi'
  | 'armv4t-unknown-linux-gnueabi'
  | 'armv5te-none-eabi'
  | 'armv5te-unknown-linux-gnueabi'
  | 'armv5te-unknown-linux-musleabi'
  | 'armv5te-unknown-linux-uclibceabi'
  | 'armv6-unknown-freebsd'
  | 'armv6-unknown-netbsd-eabihf'
  | 'armv6k-nintendo-3ds'
  | 'armv7-linux-androideabi'
  | 'armv7-sony-vita-newlibeabihf'
  | 'armv7-unknown-freebsd'
  | 'armv7-unknown-linux-gnueabi'
  | 'armv7-unknown-linux-gnueabihf'
  | 'armv7-unknown-linux-musleabi'
  | 'armv7-unknown-linux-musleabihf'
  | 'armv7-unknown-linux-ohos'
  | 'armv7-unknown-linux-uclibceabi'
  | 'armv7-unknown-linux-uclibceabihf'
  | 'armv7-unknown-netbsd-eabihf'
  | 'armv7-wrs-vxworks-eabihf'
  | 'armv7a-kmc-solid_asp3-eabi'
  | 'armv7a-kmc-solid_asp3-eabihf'
  | 'armv7a-none-eabi'
  | 'armv7a-none-eabihf'
  | 'armv7k-apple-watchos'
  | 'armv7r-none-eabi'
  | 'armv7r-none-eabihf'
  | 'armv7s-apple-ios'
  | 'asmjs-unknown-emscripten'
  | 'avr-unknown-gnu-atmega328'
  | 'bpfeb-unknown-none'
  | 'bpfel-unknown-none'
  | 'csky-unknown-linux-gnuabiv2'
  | 'csky-unknown-linux-gnuabiv2hf'
  | 'hexagon-unknown-linux-musl'
  | 'i386-apple-ios'
  | 'i586-pc-nto-qnx700'
  | 'i586-pc-windows-msvc'
  | 'i586-unknown-linux-gnu'
  | 'i586-unknown-linux-musl'
  | 'i586-unknown-netbsd'
  | 'i686-apple-darwin'
  | 'i686-linux-android'
  | 'i686-pc-windows-gnu'
  | 'i686-pc-windows-gnullvm'
  | 'i686-pc-windows-msvc'
  | 'i686-unknown-freebsd'
  | 'i686-unknown-haiku'
  | 'i686-unknown-hurd-gnu'
  | 'i686-unknown-linux-gnu'
  | 'i686-unknown-linux-musl'
  | 'i686-unknown-netbsd'
  | 'i686-unknown-openbsd'
  | 'i686-unknown-uefi'
  | 'i686-uwp-windows-gnu'
  | 'i686-uwp-windows-msvc'
  | 'i686-wrs-vxworks'
  | 'loongarch64-unknown-linux-gnu'
  | 'loongarch64-unknown-none'
  | 'loongarch64-unknown-none-softfloat'
  | 'm68k-unknown-linux-gnu'
  | 'mips-unknown-linux-gnu'
  | 'mips-unknown-linux-musl'
  | 'mips-unknown-linux-uclibc'
  | 'mips64-openwrt-linux-musl'
  | 'mips64-unknown-linux-gnuabi64'
  | 'mips64-unknown-linux-muslabi64'
  | 'mips64el-unknown-linux-gnuabi64'
  | 'mips64el-unknown-linux-muslabi64'
  | 'mipsel-sony-psp'
  | 'mipsel-sony-psx'
  | 'mipsel-unknown-linux-gnu'
  | 'mipsel-unknown-linux-musl'
  | 'mipsel-unknown-linux-uclibc'
  | 'mipsel-unknown-netbsd'
  | 'mipsel-unknown-none'
  | 'mipsisa32r6-unknown-linux-gnu'
  | 'mipsisa32r6el-unknown-linux-gnu'
  | 'mipsisa64r6-unknown-linux-gnuabi64'
  | 'mipsisa64r6el-unknown-linux-gnuabi64'
  | 'msp430-none-elf'
  | 'nvptx64-nvidia-cuda'
  | 'powerpc-unknown-freebsd'
  | 'powerpc-unknown-linux-gnu'
  | 'powerpc-unknown-linux-gnuspe'
  | 'powerpc-unknown-linux-musl'
  | 'powerpc-unknown-netbsd'
  | 'powerpc-unknown-openbsd'
  | 'powerpc-wrs-vxworks'
  | 'powerpc-wrs-vxworks-spe'
  | 'powerpc64-ibm-aix'
  | 'powerpc64-unknown-freebsd'
  | 'powerpc64-unknown-linux-gnu'
  | 'powerpc64-unknown-linux-musl'
  | 'powerpc64-unknown-openbsd'
  | 'powerpc64-wrs-vxworks'
  | 'powerpc64le-unknown-freebsd'
  | 'powerpc64le-unknown-linux-gnu'
  | 'powerpc64le-unknown-linux-musl'
  | 'riscv32gc-unknown-linux-gnu'
  | 'riscv32gc-unknown-linux-musl'
  | 'riscv32i-unknown-none-elf'
  | 'riscv32im-unknown-none-elf'
  | 'riscv32imac-esp-espidf'
  | 'riscv32imac-unknown-none-elf'
  | 'riscv32imac-unknown-xous-elf'
  | 'riscv32imc-esp-espidf'
  | 'riscv32imc-unknown-none-elf'
  | 'riscv64-linux-android'
  | 'riscv64gc-unknown-freebsd'
  | 'riscv64gc-unknown-fuchsia'
  | 'riscv64gc-unknown-hermit'
  | 'riscv64gc-unknown-linux-gnu'
  | 'riscv64gc-unknown-linux-musl'
  | 'riscv64gc-unknown-netbsd'
  | 'riscv64gc-unknown-none-elf'
  | 'riscv64gc-unknown-openbsd'
  | 'riscv64imac-unknown-none-elf'
  | 's390x-unknown-linux-gnu'
  | 's390x-unknown-linux-musl'
  | 'sparc-unknown-linux-gnu'
  | 'sparc-unknown-none-elf'
  | 'sparc64-unknown-linux-gnu'
  | 'sparc64-unknown-netbsd'
  | 'sparc64-unknown-openbsd'
  | 'sparcv9-sun-solaris'
  | 'thumbv4t-none-eabi'
  | 'thumbv5te-none-eabi'
  | 'thumbv6m-none-eabi'
  | 'thumbv7a-pc-windows-msvc'
  | 'thumbv7a-uwp-windows-msvc'
  | 'thumbv7em-none-eabi'
  | 'thumbv7em-none-eabihf'
  | 'thumbv7m-none-eabi'
  | 'thumbv7neon-linux-androideabi'
  | 'thumbv7neon-unknown-linux-gnueabihf'
  | 'thumbv7neon-unknown-linux-musleabihf'
  | 'thumbv8m.base-none-eabi'
  | 'thumbv8m.main-none-eabi'
  | 'thumbv8m.main-none-eabihf'
  | 'wasm32-unknown-emscripten'
  | 'wasm32-unknown-unknown'
  | 'wasm32-wasi'
  | 'wasm32-wasi-preview1-threads'
  | 'wasm64-unknown-unknown'
  | 'x86_64-apple-darwin'
  | 'x86_64-apple-ios'
  | 'x86_64-apple-ios-macabi'
  | 'x86_64-apple-tvos'
  | 'x86_64-apple-watchos-sim'
  | 'x86_64-fortanix-unknown-sgx'
  | 'x86_64-fuchsia'
  | 'x86_64-linux-android'
  | 'x86_64-pc-nto-qnx710'
  | 'x86_64-pc-solaris'
  | 'x86_64-pc-windows-gnu'
  | 'x86_64-pc-windows-gnullvm'
  | 'x86_64-pc-windows-msvc'
  | 'x86_64-sun-solaris'
  | 'x86_64-unikraft-linux-musl'
  | 'x86_64-unknown-dragonfly'
  | 'x86_64-unknown-freebsd'
  | 'x86_64-unknown-fuchsia'
  | 'x86_64-unknown-haiku'
  | 'x86_64-unknown-hermit'
  | 'x86_64-unknown-illumos'
  | 'x86_64-unknown-l4re-uclibc'
  | 'x86_64-unknown-linux-gnu'
  | 'x86_64-unknown-linux-gnux32'
  | 'x86_64-unknown-linux-musl'
  | 'x86_64-unknown-linux-ohos'
  | 'x86_64-unknown-netbsd'
  | 'x86_64-unknown-none'
  | 'x86_64-unknown-openbsd'
  | 'x86_64-unknown-redox'
  | 'x86_64-unknown-uefi'
  | 'x86_64-uwp-windows-gnu'
  | 'x86_64-uwp-windows-msvc'
  | 'x86_64-wrs-vxworks'
  | 'x86_64h-apple-darwin'

export type RustInputFormat = 'rust'

export type RustOutputFormat =
  | 'binary'
  | 'assembly'
  | 'llvm-ir'
  | 'llvm-bitcode'
  | 'mir'
export type SanitizeApi = {
  input: {
    format: string
  }
}
export type SanitizeHtmlCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}

export type SharedGematriaLanguage =
  | 'arabic'
  | 'coptic'
  | 'devanagari'
  | 'elderFuthark'
  | 'greek'
  | 'gothic'
  | 'hebrew'
  | 'japanese'
  | 'latin'
  | 'tibetan'
export type SlicePdf = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  startPage: number
  endPage: number
  output: {
    file: {
      path: string
    }
  }
}
export type SlicePdfWithData = {
  input: {
    format: string
    file: {
      data: ArrayBuffer
    }
  }
  startPage: number
  endPage: number
}

export type SwiftInputFormat = 'swift'

export type SymbolSet =
  | 'latin-lowercase'
  | 'latin-uppercase'
  | 'latin-number'
  | 'latin-symbol'
export type SymbolSetContentValue = SymbolSetData

export type SymbolSetContent = Record<SymbolSet, SymbolSetContentValue>
export type SymbolSetData = {
  list: string
}

export type Task =
  | 'decompress'
  | 'compress'
  | 'convert'
  | 'replace'
  | 'create'
  | 'remove'
  | 'rename'
  | 'update'
  | 'upload'
  | 'resize'
  | 'format'
  | 'split'
  | 'build'
  | 'slice'
  | 'read'
  | 'add'
  | 'verify'
  | 'inspect'
  | 'compile'
  | 'disassemble'
export type TextStyle = {
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

export type TimeZone =
  | 'NUT'
  | 'SST'
  | 'CKT'
  | 'HAST'
  | 'TAHT'
  | 'MART'
  | 'GAMT'
  | 'AKST'
  | 'PST'
  | 'GMT-7'
  | 'MST'
  | 'YT'
  | 'CST'
  | 'EAST'
  | 'GALT'
  | 'ACT'
  | 'COT'
  | 'EST'
  | 'ECT'
  | 'PET'
  | 'AMT'
  | 'AST'
  | 'BOT'
  | 'CLT'
  | 'GYT'
  | 'PYT'
  | 'VET'
  | 'ART'
  | 'BRT'
  | 'FKST'
  | 'GFT'
  | 'SRT'
  | 'UYT'
  | 'NST'
  | 'FNT'
  | 'GST'
  | 'PM'
  | 'CVT'
  | 'WGT'
  | 'AZOT'
  | 'EGT'
  | 'GMT'
  | 'CET'
  | 'WAT'
  | 'WET'
  | 'CAT'
  | 'EET'
  | 'SAST'
  | 'GMT+3'
  | 'EAT'
  | 'IST'
  | 'MSK'
  | 'SYOT'
  | 'TRT'
  | 'IRST'
  | 'AZT'
  | 'GET'
  | 'MUT'
  | 'RET'
  | 'SAMT'
  | 'SCT'
  | 'AFT'
  | 'FSAT'
  | 'MVT'
  | 'MAWT'
  | 'PKT'
  | 'TJT'
  | 'TMT'
  | 'UZT'
  | 'AQTT'
  | 'YEKT'
  | 'NPT'
  | 'BST'
  | 'BTT'
  | 'ALMT'
  | 'IOT'
  | 'KGT'
  | 'OMST'
  | 'VOST'
  | 'CCT'
  | 'MMT'
  | 'CXT'
  | 'DAVT'
  | 'HOVT'
  | 'ICT'
  | 'NOVT'
  | 'WIB'
  | 'AWST'
  | 'BNT'
  | 'WITA'
  | 'HKT'
  | 'IRKT'
  | 'MYT'
  | 'PHT'
  | 'SGT'
  | 'TWT'
  | 'ULAT'
  | 'ACWST'
  | 'TLT'
  | 'WIT'
  | 'JST'
  | 'KST'
  | 'PWT'
  | 'YAKT'
  | 'ACST'
  | 'AEST'
  | 'ChST'
  | 'CHUT'
  | 'DDUT'
  | 'PGT'
  | 'VLAT'
  | 'LHST'
  | 'CAST'
  | 'KOST'
  | 'NCT'
  | 'NFT'
  | 'SAKT'
  | 'SBT'
  | 'VUT'
  | 'FJT'
  | 'GILT'
  | 'MHT'
  | 'NRT'
  | 'NZST'
  | 'PETT'
  | 'TVT'
  | 'WAKT'
  | 'WFT'
  | 'CHAST'
  | 'WST'
  | 'PHOT'
  | 'TKT'
  | 'TOT'
  | 'LINT'
  | 'Pacific/Niue'
  | 'Pacific/Midway'
  | 'Pacific/Pago_Pago'
  | 'Pacific/Rarotonga'
  | 'Pacific/Honolulu'
  | 'Pacific/Tahiti'
  | 'Pacific/Marquesas'
  | 'Pacific/Gambier'
  | 'America/Adak'
  | 'America/Anchorage'
  | 'Pacific/Pitcairn'
  | 'America/Hermosillo'
  | 'America/Phoenix'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Vancouver'
  | 'America/Whitehorse'
  | 'America/Belize'
  | 'America/Guatemala'
  | 'America/Managua'
  | 'America/Mexico_City'
  | 'America/Costa_Rica'
  | 'America/El_Salvador'
  | 'America/Regina'
  | 'America/Tegucigalpa'
  | 'Pacific/Easter'
  | 'Pacific/Galapagos'
  | 'America/Edmonton'
  | 'America/Ciudad_Juarez'
  | 'America/Denver'
  | 'America/Rio_Branco'
  | 'America/Chicago'
  | 'America/Matamoros'
  | 'America/Winnipeg'
  | 'America/Bogota'
  | 'America/Atikokan'
  | 'America/Cancun'
  | 'America/Cayman'
  | 'America/Jamaica'
  | 'America/Panama'
  | 'America/Guayaquil'
  | 'America/Lima'
  | 'America/Manaus'
  | 'America/St_Kitts'
  | 'America/Blanc-Sablon'
  | 'America/Montserrat'
  | 'America/Barbados'
  | 'America/St_Lucia'
  | 'America/Port_of_Spain'
  | 'America/Martinique'
  | 'America/St_Barthelemy'
  | 'America/St_Vincent'
  | 'America/Kralendijk'
  | 'America/Guadeloupe'
  | 'America/Marigot'
  | 'America/Aruba'
  | 'America/Lower_Princes'
  | 'America/Tortola'
  | 'America/Dominica'
  | 'America/St_Thomas'
  | 'America/Grenada'
  | 'America/Antigua'
  | 'America/Puerto_Rico'
  | 'America/Santo_Domingo'
  | 'America/Anguilla'
  | 'America/Curacao'
  | 'America/La_Paz'
  | 'America/Santiago'
  | 'America/Havana'
  | 'America/Grand_Turk'
  | 'America/Nassau'
  | 'America/New_York'
  | 'America/Port-au-Prince'
  | 'America/Toronto'
  | 'America/Guyana'
  | 'America/Asuncion'
  | 'America/Caracas'
  | 'America/Argentina/Buenos_Aires'
  | 'America/Halifax'
  | 'Atlantic/Bermuda'
  | 'America/Thule'
  | 'America/Sao_Paulo'
  | 'Antarctica/Palmer'
  | 'America/Punta_Arenas'
  | 'Atlantic/Stanley'
  | 'America/Cayenne'
  | 'America/Paramaribo'
  | 'America/Montevideo'
  | 'America/St_Johns'
  | 'America/Noronha'
  | 'Atlantic/South_Georgia'
  | 'America/Miquelon'
  | 'Atlantic/Cape_Verde'
  | 'America/Nuuk'
  | 'Atlantic/Azores'
  | 'America/Scoresbysund'
  | 'Africa/Abidjan'
  | 'Africa/Bamako'
  | 'Africa/Bissau'
  | 'Africa/Conakry'
  | 'Africa/Dakar'
  | 'America/Danmarkshavn'
  | 'Africa/Freetown'
  | 'Atlantic/St_Helena'
  | 'Africa/Accra'
  | 'Africa/Lome'
  | 'Africa/Monrovia'
  | 'Africa/Nouakchott'
  | 'Africa/Ouagadougou'
  | 'Atlantic/Reykjavik'
  | 'Africa/Sao_Tome'
  | 'Africa/Banjul'
  | 'Africa/Algiers'
  | 'Africa/Tunis'
  | 'Europe/Isle_of_Man'
  | 'Europe/Dublin'
  | 'Europe/London'
  | 'Europe/Jersey'
  | 'Europe/Guernsey'
  | 'Africa/Bangui'
  | 'Africa/Malabo'
  | 'Africa/Brazzaville'
  | 'Africa/Porto-Novo'
  | 'Africa/Douala'
  | 'Africa/Kinshasa'
  | 'Africa/Lagos'
  | 'Africa/Libreville'
  | 'Africa/Luanda'
  | 'Africa/Ndjamena'
  | 'Africa/Niamey'
  | 'Africa/Casablanca'
  | 'Africa/El_Aaiun'
  | 'Atlantic/Canary'
  | 'Europe/Lisbon'
  | 'Atlantic/Faroe'
  | 'Africa/Bujumbura'
  | 'Africa/Gaborone'
  | 'Africa/Harare'
  | 'Africa/Juba'
  | 'Africa/Khartoum'
  | 'Africa/Kigali'
  | 'Africa/Blantyre'
  | 'Africa/Lubumbashi'
  | 'Africa/Lusaka'
  | 'Africa/Maputo'
  | 'Africa/Windhoek'
  | 'Europe/Amsterdam'
  | 'Europe/Andorra'
  | 'Europe/Belgrade'
  | 'Europe/Berlin'
  | 'Europe/Bratislava'
  | 'Europe/Brussels'
  | 'Europe/Budapest'
  | 'Europe/Copenhagen'
  | 'Europe/Gibraltar'
  | 'Europe/Ljubljana'
  | 'Arctic/Longyearbyen'
  | 'Europe/Luxembourg'
  | 'Europe/Madrid'
  | 'Europe/Monaco'
  | 'Europe/Oslo'
  | 'Europe/Paris'
  | 'Europe/Podgorica'
  | 'Europe/Prague'
  | 'Europe/Rome'
  | 'Europe/San_Marino'
  | 'Europe/Malta'
  | 'Europe/Sarajevo'
  | 'Europe/Skopje'
  | 'Europe/Stockholm'
  | 'Europe/Tirane'
  | 'Europe/Vaduz'
  | 'Europe/Vatican'
  | 'Europe/Vienna'
  | 'Europe/Warsaw'
  | 'Europe/Zagreb'
  | 'Europe/Zurich'
  | 'Europe/Kaliningrad'
  | 'Africa/Tripoli'
  | 'Antarctica/Troll'
  | 'Africa/Johannesburg'
  | 'Africa/Mbabane'
  | 'Africa/Maseru'
  | 'Asia/Kuwait'
  | 'Asia/Bahrain'
  | 'Asia/Baghdad'
  | 'Asia/Qatar'
  | 'Asia/Riyadh'
  | 'Asia/Aden'
  | 'Asia/Amman'
  | 'Asia/Damascus'
  | 'Africa/Addis_Ababa'
  | 'Indian/Antananarivo'
  | 'Africa/Asmara'
  | 'Africa/Dar_es_Salaam'
  | 'Africa/Djibouti'
  | 'Africa/Kampala'
  | 'Indian/Mayotte'
  | 'Africa/Mogadishu'
  | 'Indian/Comoro'
  | 'Africa/Nairobi'
  | 'Europe/Athens'
  | 'Asia/Beirut'
  | 'Europe/Bucharest'
  | 'Africa/Cairo'
  | 'Europe/Chisinau'
  | 'Asia/Hebron'
  | 'Europe/Helsinki'
  | 'Europe/Kyiv'
  | 'Europe/Mariehamn'
  | 'Asia/Nicosia'
  | 'Europe/Riga'
  | 'Europe/Sofia'
  | 'Europe/Tallinn'
  | 'Europe/Vilnius'
  | 'Asia/Jerusalem'
  | 'Europe/Minsk'
  | 'Europe/Moscow'
  | 'Europe/Simferopol'
  | 'Antarctica/Syowa'
  | 'Europe/Istanbul'
  | 'Asia/Tehran'
  | 'Asia/Yerevan'
  | 'Asia/Baku'
  | 'Asia/Tbilisi'
  | 'Asia/Dubai'
  | 'Asia/Muscat'
  | 'Indian/Mauritius'
  | 'Indian/Reunion'
  | 'Europe/Samara'
  | 'Indian/Mahe'
  | 'Asia/Kabul'
  | 'Indian/Kerguelen'
  | 'Indian/Maldives'
  | 'Antarctica/Mawson'
  | 'Asia/Karachi'
  | 'Asia/Dushanbe'
  | 'Asia/Ashgabat'
  | 'Asia/Tashkent'
  | 'Asia/Aqtobe'
  | 'Asia/Yekaterinburg'
  | 'Asia/Colombo'
  | 'Asia/Kolkata'
  | 'Asia/Kathmandu'
  | 'Asia/Dhaka'
  | 'Asia/Thimphu'
  | 'Asia/Urumqi'
  | 'Asia/Almaty'
  | 'Indian/Chagos'
  | 'Asia/Bishkek'
  | 'Asia/Omsk'
  | 'Antarctica/Vostok'
  | 'Indian/Cocos'
  | 'Asia/Yangon'
  | 'Indian/Christmas'
  | 'Antarctica/Davis'
  | 'Asia/Hovd'
  | 'Asia/Bangkok'
  | 'Asia/Ho_Chi_Minh'
  | 'Asia/Phnom_Penh'
  | 'Asia/Vientiane'
  | 'Asia/Novosibirsk'
  | 'Asia/Jakarta'
  | 'Australia/Perth'
  | 'Asia/Brunei'
  | 'Asia/Makassar'
  | 'Asia/Macau'
  | 'Asia/Shanghai'
  | 'Asia/Hong_Kong'
  | 'Asia/Irkutsk'
  | 'Asia/Kuala_Lumpur'
  | 'Asia/Manila'
  | 'Asia/Singapore'
  | 'Asia/Taipei'
  | 'Asia/Ulaanbaatar'
  | 'Australia/Eucla'
  | 'Asia/Dili'
  | 'Asia/Jayapura'
  | 'Asia/Tokyo'
  | 'Asia/Pyongyang'
  | 'Asia/Seoul'
  | 'Pacific/Palau'
  | 'Asia/Chita'
  | 'Australia/Adelaide'
  | 'Australia/Darwin'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Saipan'
  | 'Pacific/Chuuk'
  | 'Antarctica/DumontDUrville'
  | 'Pacific/Port_Moresby'
  | 'Asia/Vladivostok'
  | 'Australia/Lord_Howe'
  | 'Pacific/Bougainville'
  | 'Antarctica/Casey'
  | 'Pacific/Kosrae'
  | 'Pacific/Noumea'
  | 'Pacific/Norfolk'
  | 'Asia/Sakhalin'
  | 'Pacific/Guadalcanal'
  | 'Pacific/Efate'
  | 'Pacific/Fiji'
  | 'Pacific/Tarawa'
  | 'Pacific/Majuro'
  | 'Pacific/Nauru'
  | 'Pacific/Auckland'
  | 'Antarctica/McMurdo'
  | 'Asia/Kamchatka'
  | 'Pacific/Funafuti'
  | 'Pacific/Wake'
  | 'Pacific/Wallis'
  | 'Pacific/Chatham'
  | 'Pacific/Apia'
  | 'Pacific/Kanton'
  | 'Pacific/Fakaofo'
  | 'Pacific/Tongatapu'
  | 'Pacific/Kiritimati'

export type TimeZoneAbbreviation =
  | 'NUT'
  | 'SST'
  | 'CKT'
  | 'HAST'
  | 'TAHT'
  | 'MART'
  | 'GAMT'
  | 'AKST'
  | 'PST'
  | 'GMT-7'
  | 'MST'
  | 'YT'
  | 'CST'
  | 'EAST'
  | 'GALT'
  | 'ACT'
  | 'COT'
  | 'EST'
  | 'ECT'
  | 'PET'
  | 'AMT'
  | 'AST'
  | 'BOT'
  | 'CLT'
  | 'GYT'
  | 'PYT'
  | 'VET'
  | 'ART'
  | 'BRT'
  | 'FKST'
  | 'GFT'
  | 'SRT'
  | 'UYT'
  | 'NST'
  | 'FNT'
  | 'GST'
  | 'PM'
  | 'CVT'
  | 'WGT'
  | 'AZOT'
  | 'EGT'
  | 'GMT'
  | 'CET'
  | 'WAT'
  | 'WET'
  | 'CAT'
  | 'EET'
  | 'SAST'
  | 'GMT+3'
  | 'EAT'
  | 'IST'
  | 'MSK'
  | 'SYOT'
  | 'TRT'
  | 'IRST'
  | 'AZT'
  | 'GET'
  | 'MUT'
  | 'RET'
  | 'SAMT'
  | 'SCT'
  | 'AFT'
  | 'FSAT'
  | 'MVT'
  | 'MAWT'
  | 'PKT'
  | 'TJT'
  | 'TMT'
  | 'UZT'
  | 'AQTT'
  | 'YEKT'
  | 'NPT'
  | 'BST'
  | 'BTT'
  | 'ALMT'
  | 'IOT'
  | 'KGT'
  | 'OMST'
  | 'VOST'
  | 'CCT'
  | 'MMT'
  | 'CXT'
  | 'DAVT'
  | 'HOVT'
  | 'ICT'
  | 'NOVT'
  | 'WIB'
  | 'AWST'
  | 'BNT'
  | 'WITA'
  | 'HKT'
  | 'IRKT'
  | 'MYT'
  | 'PHT'
  | 'SGT'
  | 'TWT'
  | 'ULAT'
  | 'ACWST'
  | 'TLT'
  | 'WIT'
  | 'JST'
  | 'KST'
  | 'PWT'
  | 'YAKT'
  | 'ACST'
  | 'AEST'
  | 'ChST'
  | 'CHUT'
  | 'DDUT'
  | 'PGT'
  | 'VLAT'
  | 'LHST'
  | 'CAST'
  | 'KOST'
  | 'NCT'
  | 'NFT'
  | 'SAKT'
  | 'SBT'
  | 'VUT'
  | 'FJT'
  | 'GILT'
  | 'MHT'
  | 'NRT'
  | 'NZST'
  | 'PETT'
  | 'TVT'
  | 'WAKT'
  | 'WFT'
  | 'CHAST'
  | 'WST'
  | 'PHOT'
  | 'TKT'
  | 'TOT'
  | 'LINT'
export type TimeZoneAbbreviationContentValue = TimeZoneAbbreviationData

export type TimeZoneAbbreviationContent = Record<
  TimeZoneAbbreviation,
  TimeZoneAbbreviationContentValue
>
export type TimeZoneAbbreviationData = {
  name: Array<string>
}
export type TimeZoneContentValue = TimeZoneData

export type TimeZoneContent = Record<
  TimeZoneLocation,
  TimeZoneContentValue
>
export type TimeZoneData = {
  name: string
  alternativeName: string
  group: Array<string>
  continentCode: string
  continentName: string
  countryName: string
  countryCode: string
  mainCities: Array<string>
  rawOffsetInMinutes: number
  abbreviation: string
}

export type TimeZoneLocation =
  | 'Pacific/Niue'
  | 'Pacific/Midway'
  | 'Pacific/Pago_Pago'
  | 'Pacific/Rarotonga'
  | 'Pacific/Honolulu'
  | 'Pacific/Tahiti'
  | 'Pacific/Marquesas'
  | 'Pacific/Gambier'
  | 'America/Adak'
  | 'America/Anchorage'
  | 'Pacific/Pitcairn'
  | 'America/Hermosillo'
  | 'America/Phoenix'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Vancouver'
  | 'America/Whitehorse'
  | 'America/Belize'
  | 'America/Guatemala'
  | 'America/Managua'
  | 'America/Mexico_City'
  | 'America/Costa_Rica'
  | 'America/El_Salvador'
  | 'America/Regina'
  | 'America/Tegucigalpa'
  | 'Pacific/Easter'
  | 'Pacific/Galapagos'
  | 'America/Edmonton'
  | 'America/Ciudad_Juarez'
  | 'America/Denver'
  | 'America/Rio_Branco'
  | 'America/Chicago'
  | 'America/Matamoros'
  | 'America/Winnipeg'
  | 'America/Bogota'
  | 'America/Atikokan'
  | 'America/Cancun'
  | 'America/Cayman'
  | 'America/Jamaica'
  | 'America/Panama'
  | 'America/Guayaquil'
  | 'America/Lima'
  | 'America/Manaus'
  | 'America/St_Kitts'
  | 'America/Blanc-Sablon'
  | 'America/Montserrat'
  | 'America/Barbados'
  | 'America/St_Lucia'
  | 'America/Port_of_Spain'
  | 'America/Martinique'
  | 'America/St_Barthelemy'
  | 'America/St_Vincent'
  | 'America/Kralendijk'
  | 'America/Guadeloupe'
  | 'America/Marigot'
  | 'America/Aruba'
  | 'America/Lower_Princes'
  | 'America/Tortola'
  | 'America/Dominica'
  | 'America/St_Thomas'
  | 'America/Grenada'
  | 'America/Antigua'
  | 'America/Puerto_Rico'
  | 'America/Santo_Domingo'
  | 'America/Anguilla'
  | 'America/Curacao'
  | 'America/La_Paz'
  | 'America/Santiago'
  | 'America/Havana'
  | 'America/Grand_Turk'
  | 'America/Nassau'
  | 'America/New_York'
  | 'America/Port-au-Prince'
  | 'America/Toronto'
  | 'America/Guyana'
  | 'America/Asuncion'
  | 'America/Caracas'
  | 'America/Argentina/Buenos_Aires'
  | 'America/Halifax'
  | 'Atlantic/Bermuda'
  | 'America/Thule'
  | 'America/Sao_Paulo'
  | 'Antarctica/Palmer'
  | 'America/Punta_Arenas'
  | 'Atlantic/Stanley'
  | 'America/Cayenne'
  | 'America/Paramaribo'
  | 'America/Montevideo'
  | 'America/St_Johns'
  | 'America/Noronha'
  | 'Atlantic/South_Georgia'
  | 'America/Miquelon'
  | 'Atlantic/Cape_Verde'
  | 'America/Nuuk'
  | 'Atlantic/Azores'
  | 'America/Scoresbysund'
  | 'Africa/Abidjan'
  | 'Africa/Bamako'
  | 'Africa/Bissau'
  | 'Africa/Conakry'
  | 'Africa/Dakar'
  | 'America/Danmarkshavn'
  | 'Africa/Freetown'
  | 'Atlantic/St_Helena'
  | 'Africa/Accra'
  | 'Africa/Lome'
  | 'Africa/Monrovia'
  | 'Africa/Nouakchott'
  | 'Africa/Ouagadougou'
  | 'Atlantic/Reykjavik'
  | 'Africa/Sao_Tome'
  | 'Africa/Banjul'
  | 'Africa/Algiers'
  | 'Africa/Tunis'
  | 'Europe/Isle_of_Man'
  | 'Europe/Dublin'
  | 'Europe/London'
  | 'Europe/Jersey'
  | 'Europe/Guernsey'
  | 'Africa/Bangui'
  | 'Africa/Malabo'
  | 'Africa/Brazzaville'
  | 'Africa/Porto-Novo'
  | 'Africa/Douala'
  | 'Africa/Kinshasa'
  | 'Africa/Lagos'
  | 'Africa/Libreville'
  | 'Africa/Luanda'
  | 'Africa/Ndjamena'
  | 'Africa/Niamey'
  | 'Africa/Casablanca'
  | 'Africa/El_Aaiun'
  | 'Atlantic/Canary'
  | 'Europe/Lisbon'
  | 'Atlantic/Faroe'
  | 'Africa/Bujumbura'
  | 'Africa/Gaborone'
  | 'Africa/Harare'
  | 'Africa/Juba'
  | 'Africa/Khartoum'
  | 'Africa/Kigali'
  | 'Africa/Blantyre'
  | 'Africa/Lubumbashi'
  | 'Africa/Lusaka'
  | 'Africa/Maputo'
  | 'Africa/Windhoek'
  | 'Europe/Amsterdam'
  | 'Europe/Andorra'
  | 'Europe/Belgrade'
  | 'Europe/Berlin'
  | 'Europe/Bratislava'
  | 'Europe/Brussels'
  | 'Europe/Budapest'
  | 'Europe/Copenhagen'
  | 'Europe/Gibraltar'
  | 'Europe/Ljubljana'
  | 'Arctic/Longyearbyen'
  | 'Europe/Luxembourg'
  | 'Europe/Madrid'
  | 'Europe/Monaco'
  | 'Europe/Oslo'
  | 'Europe/Paris'
  | 'Europe/Podgorica'
  | 'Europe/Prague'
  | 'Europe/Rome'
  | 'Europe/San_Marino'
  | 'Europe/Malta'
  | 'Europe/Sarajevo'
  | 'Europe/Skopje'
  | 'Europe/Stockholm'
  | 'Europe/Tirane'
  | 'Europe/Vaduz'
  | 'Europe/Vatican'
  | 'Europe/Vienna'
  | 'Europe/Warsaw'
  | 'Europe/Zagreb'
  | 'Europe/Zurich'
  | 'Europe/Kaliningrad'
  | 'Africa/Tripoli'
  | 'Antarctica/Troll'
  | 'Africa/Johannesburg'
  | 'Africa/Mbabane'
  | 'Africa/Maseru'
  | 'Asia/Kuwait'
  | 'Asia/Bahrain'
  | 'Asia/Baghdad'
  | 'Asia/Qatar'
  | 'Asia/Riyadh'
  | 'Asia/Aden'
  | 'Asia/Amman'
  | 'Asia/Damascus'
  | 'Africa/Addis_Ababa'
  | 'Indian/Antananarivo'
  | 'Africa/Asmara'
  | 'Africa/Dar_es_Salaam'
  | 'Africa/Djibouti'
  | 'Africa/Kampala'
  | 'Indian/Mayotte'
  | 'Africa/Mogadishu'
  | 'Indian/Comoro'
  | 'Africa/Nairobi'
  | 'Europe/Athens'
  | 'Asia/Beirut'
  | 'Europe/Bucharest'
  | 'Africa/Cairo'
  | 'Europe/Chisinau'
  | 'Asia/Hebron'
  | 'Europe/Helsinki'
  | 'Europe/Kyiv'
  | 'Europe/Mariehamn'
  | 'Asia/Nicosia'
  | 'Europe/Riga'
  | 'Europe/Sofia'
  | 'Europe/Tallinn'
  | 'Europe/Vilnius'
  | 'Asia/Jerusalem'
  | 'Europe/Minsk'
  | 'Europe/Moscow'
  | 'Europe/Simferopol'
  | 'Antarctica/Syowa'
  | 'Europe/Istanbul'
  | 'Asia/Tehran'
  | 'Asia/Yerevan'
  | 'Asia/Baku'
  | 'Asia/Tbilisi'
  | 'Asia/Dubai'
  | 'Asia/Muscat'
  | 'Indian/Mauritius'
  | 'Indian/Reunion'
  | 'Europe/Samara'
  | 'Indian/Mahe'
  | 'Asia/Kabul'
  | 'Indian/Kerguelen'
  | 'Indian/Maldives'
  | 'Antarctica/Mawson'
  | 'Asia/Karachi'
  | 'Asia/Dushanbe'
  | 'Asia/Ashgabat'
  | 'Asia/Tashkent'
  | 'Asia/Aqtobe'
  | 'Asia/Yekaterinburg'
  | 'Asia/Colombo'
  | 'Asia/Kolkata'
  | 'Asia/Kathmandu'
  | 'Asia/Dhaka'
  | 'Asia/Thimphu'
  | 'Asia/Urumqi'
  | 'Asia/Almaty'
  | 'Indian/Chagos'
  | 'Asia/Bishkek'
  | 'Asia/Omsk'
  | 'Antarctica/Vostok'
  | 'Indian/Cocos'
  | 'Asia/Yangon'
  | 'Indian/Christmas'
  | 'Antarctica/Davis'
  | 'Asia/Hovd'
  | 'Asia/Bangkok'
  | 'Asia/Ho_Chi_Minh'
  | 'Asia/Phnom_Penh'
  | 'Asia/Vientiane'
  | 'Asia/Novosibirsk'
  | 'Asia/Jakarta'
  | 'Australia/Perth'
  | 'Asia/Brunei'
  | 'Asia/Makassar'
  | 'Asia/Macau'
  | 'Asia/Shanghai'
  | 'Asia/Hong_Kong'
  | 'Asia/Irkutsk'
  | 'Asia/Kuala_Lumpur'
  | 'Asia/Manila'
  | 'Asia/Singapore'
  | 'Asia/Taipei'
  | 'Asia/Ulaanbaatar'
  | 'Australia/Eucla'
  | 'Asia/Dili'
  | 'Asia/Jayapura'
  | 'Asia/Tokyo'
  | 'Asia/Pyongyang'
  | 'Asia/Seoul'
  | 'Pacific/Palau'
  | 'Asia/Chita'
  | 'Australia/Adelaide'
  | 'Australia/Darwin'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Saipan'
  | 'Pacific/Chuuk'
  | 'Antarctica/DumontDUrville'
  | 'Pacific/Port_Moresby'
  | 'Asia/Vladivostok'
  | 'Australia/Lord_Howe'
  | 'Pacific/Bougainville'
  | 'Antarctica/Casey'
  | 'Pacific/Kosrae'
  | 'Pacific/Noumea'
  | 'Pacific/Norfolk'
  | 'Asia/Sakhalin'
  | 'Pacific/Guadalcanal'
  | 'Pacific/Efate'
  | 'Pacific/Fiji'
  | 'Pacific/Tarawa'
  | 'Pacific/Majuro'
  | 'Pacific/Nauru'
  | 'Pacific/Auckland'
  | 'Antarctica/McMurdo'
  | 'Asia/Kamchatka'
  | 'Pacific/Funafuti'
  | 'Pacific/Wake'
  | 'Pacific/Wallis'
  | 'Pacific/Chatham'
  | 'Pacific/Apia'
  | 'Pacific/Kanton'
  | 'Pacific/Fakaofo'
  | 'Pacific/Tongatapu'
  | 'Pacific/Kiritimati'

export type UnarchiverFormat =
  | 'zip'
  | 'rar'
  | '7z'
  | 'tar'
  | 'gzip'
  | 'bzip2'
  | 'lzma'
  | 'cab'
  | 'msi'
  | 'nsis'
  | 'exe'
  | 'iso'
export type UnarchiverFormatData = {
  head: string
}

export type Unit =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'kilometer'
  | 'inch'
  | 'yard'
  | 'us-survey-foot'
  | 'foot'
  | 'mile'
  | 'square-millimeter'
  | 'square-centimeter'
  | 'square-meter'
  | 'hectare'
  | 'square-kilometer'
  | 'square-inch'
  | 'square-yard'
  | 'square-foot'
  | 'acre'
  | 'square-mile'
  | 'microgram'
  | 'milligram'
  | 'gram'
  | 'kilogram'
  | 'metric-tonne'
  | 'ounce'
  | 'pound'
  | 'ton'
  | 'cubic-millimeter'
  | 'cubic-centimeter'
  | 'millilitre'
  | 'centilitre'
  | 'decilitre'
  | 'litre'
  | 'kilolitre'
  | 'cubic-meter'
  | 'cubic-kilometer'
  | 'tesked'
  | 'matsked'
  | 'kaffekopp'
  | 'glas'
  | 'kanna'
  | 'teaspoon'
  | 'tablespoon'
  | 'cubic-inch'
  | 'fluid-ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'cubic-foot'
  | 'cubic-yard'
  | 'each'
  | 'dozen'
  | 'celsius'
  | 'kelvin'
  | 'fahrenheit'
  | 'rankine'
  | 'nanosecond'
  | 'microsecond'
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'bit'
  | 'kilobit'
  | 'megabit'
  | 'gigabit'
  | 'terabit'
  | 'byte'
  | 'kilobyte'
  | 'megabyte'
  | 'gigabyte'
  | 'terabyte'
  | 'part-per-million'
  | 'part-per-billion'
  | 'part-per-trillion'
  | 'part-per-quadrillion'
  | 'metre-per-second'
  | 'kilometre-per-hour'
  | 'mile-per-hour'
  | 'knot'
  | 'foot-per-second'
  | 'minute-per-kilometre'
  | 'second-per-metre'
  | 'minute-per-mile'
  | 'second-per-foot'
  | 'pascal'
  | 'kilopascal'
  | 'megapascal'
  | 'hectopascal'
  | 'bar'
  | 'torr'
  | 'pound-per-square-inch'
  | 'kilopound-per-square-inch'
  | 'ampere'
  | 'milliampere'
  | 'kiloampere'
  | 'volt'
  | 'millivolt'
  | 'kilovolt'
  | 'watt'
  | 'milliwatt'
  | 'kilowatt'
  | 'megawatt'
  | 'gigawatt'
  | 'volt-ampere-reactive'
  | 'millivolt-ampere-reactive'
  | 'kilovolt-ampere-reactive'
  | 'megavolt-ampere-reactive'
  | 'gigavolt-ampere-reactive'
  | 'volt-ampere'
  | 'millivolt-ampere'
  | 'kilovolt-ampere'
  | 'megavolt-ampere'
  | 'gigavolt-ampere'
  | 'watt-hour'
  | 'milliwatt-hour'
  | 'kilowatt-hour'
  | 'megawatt-hour'
  | 'gigawatt-hour'
  | 'joule'
  | 'kilojoule'
  | 'volt-ampere-reactive-hour'
  | 'millivolt-ampere-reactive-hour'
  | 'kilovolt-ampere-reactive-hour'
  | 'megavolt-ampere-reactive-hour'
  | 'gigavolt-ampere-reactive-hour'
  | 'cubic-millimeter-per-second'
  | 'cubic-centimeter-per-second'
  | 'millilitre-per-second'
  | 'centilitre-per-second'
  | 'decilitre-per-second'
  | 'litre-per-second'
  | 'litre-per-minute'
  | 'litre-per-hour'
  | 'kilolitre-per-second'
  | 'kilolitre-per-minute'
  | 'kilolitre-per-hour'
  | 'cubic-meter-per-second'
  | 'cubic-meter-per-minute'
  | 'cubic-meter-per-hour'
  | 'cubic-kilometer-per-second'
  | 'teaspoon-per-second'
  | 'tablespoon-per-second'
  | 'cubic-inch-per-second'
  | 'cubic-inch-per-minute'
  | 'cubic-inch-per-hour'
  | 'fluid-ounce-per-second'
  | 'fluid-ounce-per-minute'
  | 'fluid-ounce-per-hour'
  | 'cup-per-second'
  | 'pint-per-second'
  | 'pint-per-minute'
  | 'pint-per-hour'
  | 'quart-per-second'
  | 'gallon-per-second'
  | 'gallon-per-minute'
  | 'gallon-per-hour'
  | 'cubic-foot-per-second'
  | 'cubic-foot-per-minute'
  | 'cubic-foot-per-hour'
  | 'cubic-yard-per-second'
  | 'cubic-yard-per-minute'
  | 'cubic-yard-per-hour'
  | 'lux'
  | 'foot-candle'
  | 'millihertz'
  | 'hertz'
  | 'kilohertz'
  | 'megahertz'
  | 'gigahertz'
  | 'terahertz'
  | 'rotation-per-minute'
  | 'degree-per-second'
  | 'radian-per-second'
  | 'radian'
  | 'degree'
  | 'gradian'
  | 'arcminute'
  | 'arcsecond'
export type UnitKey = {
  key: string
}
export type UnitKeyHashValue = UnitKey

export type UnitKeyHash = Record<Unit, UnitKeyHashValue>
export type ValidatePdfWithData = {
  input: {
    format: string
    file: {
      data: ArrayBuffer
    }
  }
}
export type VerifyCliBase = {
  format: string
  file: {
    path: string
  }
  help?: boolean
  log?: CliLogFormat
}
export type VerifyImageWithImageMagick = {
  format: ImageMagickFormat
  file: {
    path: string
  }
}

export type WastInputFormat = 'wast'

export type WastOutputFormat = 'wasm'
export type WeightedSymbolSet = {
  value: NamedSymbolSet | AnonymousSymbolSet
  weight: number
}
export type WeightedWordSet = {
  value: NamedWordSet | AnonymousWordSet
  weight: number
}

export type WordSet = 'pleasant-adjective' | 'pleasant-noun'
export type WordSetContentValue = WordSetData

export type WordSetContent = Record<WordSet, WordSetContentValue>
export type WordSetData = {
  name: string
}
export type WriteMetadataToImage = {
  input: {
    format: string
    file: {
      path: string
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
