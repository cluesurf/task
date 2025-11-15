import {
  FileContent,
  FilePath,
  LocalPath,
} from '~/code/form/object/file/index'

export type ClangFormat = 'c' | 'cpp'
export type FormatApi = {
  format: string
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
export type FormatMarkdownWithPrettier = {
  code: string
  proseWrap?: PrettierProseWrapOption
  singleQuote?: boolean
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
