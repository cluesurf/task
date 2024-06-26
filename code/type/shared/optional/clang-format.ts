import merge from 'lodash/merge'

export type ClangStyleAllOptional = {
  basedOnStyle?: string
  alignAfterOpenBracket?:
    | 'align'
    | 'dontAlign'
    | 'alwaysBreak'
    | 'blockIndent'
  alignArrayOfStructures?: 'left' | 'right' | 'none'
  alignConsecutiveAssignments?: {
    enabled?: boolean
    acrossEmptyLines?: boolean
    acrossComments?: boolean
    alignCompound?: boolean
    alignFunctionPointers?: boolean
    padOperators?: boolean
  }
  alignConsecutiveBitFields?: {
    enabled?: boolean
    acrossEmptyLines?: boolean
    acrossComments?: boolean
    alignCompound?: boolean
    alignFunctionPointers?: boolean
    padOperators?: boolean
  }
  alignConsecutiveDeclarations?: {
    enabled?: boolean
    acrossEmptyLines?: boolean
    acrossComments?: boolean
    alignCompound?: boolean
    alignFunctionPointers?: boolean
    padOperators?: boolean
  }
  alignConsecutiveMacros?: {
    enabled?: boolean
    acrossEmptyLines?: boolean
    acrossComments?: boolean
    alignCompound?: boolean
    alignFunctionPointers?: boolean
    padOperators?: boolean
  }
  alignConsecutiveShortCaseStatements?: {
    enabled?: boolean
    acrossEmptyLines?: boolean
    acrossComments?: boolean
    alignCaseColons?: boolean
  }
  alignEscapedNewlines?: 'dontAlign' | 'left' | 'right'
  alignOperands?: 'dontAlign' | 'align' | 'alignAfterOperator'
  alignTrailingComments?: {
    kind?: {}
    overEmptyLines?: number
  }
  allowAllArgumentsOnNextLine?: boolean
  allowAllConstructorInitializersOnNextLine?: boolean
  allowAllParametersOfDeclarationOnNextLine?: boolean
  allowBreakBeforeNoexceptSpecifier?:
    | 'never'
    | 'onlyWithParen'
    | 'always'
  allowShortBlocksOnASingleLine?: 'never' | 'empty' | 'always'
  allowShortCaseLabelsOnASingleLine?: boolean
  allowShortCompoundRequirementOnASingleLine?: boolean
  allowShortEnumsOnASingleLine?: boolean
  allowShortFunctionsOnASingleLine?:
    | 'none'
    | 'inlineOnly'
    | 'empty'
    | 'inline'
    | 'all'
  allowShortIfStatementsOnASingleLine?:
    | 'never'
    | 'withoutElse'
    | 'onlyFirstIf'
    | 'allIfsAndElse'
  allowShortLambdasOnASingleLine?: 'none' | 'empty' | 'inline' | 'all'
  allowShortLoopsOnASingleLine?: boolean
  alwaysBreakAfterDefinitionReturnType?: 'none' | 'all' | 'topLevel'
  alwaysBreakAfterReturnType?:
    | 'none'
    | 'all'
    | 'topLevel'
    | 'allDefinitions'
    | 'topLevelDefinitions'
  alwaysBreakBeforeMultilineStrings?: boolean
  alwaysBreakTemplateDeclarations?: 'no' | 'multiLine' | 'yes'
  attributeMacros?: Array<string>
  binPackArguments?: boolean
  binPackParameters?: boolean
  bitFieldColonSpacing?: 'both' | 'none' | 'before' | 'after'
  braceWrapping?: {
    afterCaseLabel?: boolean
    afterClass?: boolean
    afterControlStatement?: {}
    afterEnum?: boolean
    afterFunction?: boolean
    afterNamespace?: boolean
    afterObjCDeclaration?: boolean
    afterStruct?: boolean
    afterUnion?: boolean
    afterExternBlock?: boolean
    beforeCatch?: boolean
    beforeElse?: boolean
    beforeLambdaBody?: boolean
    beforeWhile?: boolean
    indentBraces?: boolean
    splitEmptyFunction?: boolean
    splitEmptyRecord?: boolean
    splitEmptyNamespace?: boolean
  }
  bracedInitializerIndentWidth?: number
  breakAdjacentStringLiterals?: boolean
  breakAfterAttributes?: 'always' | 'leave' | 'never'
  breakArrays?: boolean
  breakBeforeBinaryOperators?: 'none' | 'nonAssignment' | 'all'
  breakBeforeBraces?:
    | 'attach'
    | 'linux'
    | 'mozilla'
    | 'stroustrup'
    | 'allman'
    | 'whitesmiths'
    | 'gnu'
    | 'webKit'
    | 'custom'
  breakBeforeConceptDeclarations?: 'never' | 'allowed' | 'always'
  breakBeforeInlineAsmColon?: 'never' | 'onlyMultiline' | 'always'
  breakBeforeTernaryOperators?: boolean
  breakConstructorInitializers?:
    | 'beforeColon'
    | 'beforeComma'
    | 'afterColon'
  breakInheritanceList?:
    | 'beforeColon'
    | 'beforeComma'
    | 'afterColon'
    | 'afterComma'
  breakStringLiterals?: boolean
  columnLimit?: number
  commentPragmas?: string
  compactNamespaces?: boolean
  constructorInitializerAllOnOneLineOrOnePerLine?: boolean
  constructorInitializerIndentWidth?: number
  continuationIndentWidth?: number
  deriveLineEnding?: boolean
  derivePointerAlignment?: boolean
  disableFormat?: boolean
  emptyLineAfterAccessModifier?: 'never' | 'leave' | 'always'
  emptyLineBeforeAccessModifier?:
    | 'never'
    | 'leave'
    | 'logicalBlock'
    | 'always'
  experimentalAutoDetectBinPacking?: boolean
  fixNamespaceComments?: boolean
  forEachMacros?: Array<string>
  ifMacros?: Array<string>
  includeBlocks?: 'preserve' | 'merge' | 'regroup'
  includeIsMainRegex?: string
  includeIsMainSourceRegex?: string
  indentAccessModifiers?: boolean
  indentCaseBlocks?: boolean
  indentCaseLabels?: boolean
  indentExternBlock?: 'afterExternBlock' | 'noIndent' | 'indent'
  indentGotoLabels?: boolean
  indentPpDirectives?: 'none' | 'afterHash' | 'beforeHash'
  indentRequiresClause?: boolean
  indentWidth?: number
  indentWrappedFunctionNames?: boolean
  insertBraces?: boolean
  insertNewlineAtEof?: boolean
  insertTrailingCommas?: 'none' | 'wrapped'
  integerLiteralSeparator?: {}
  keepEmptyLinesAtEof?: boolean
  keepEmptyLinesAtTheStartOfBlocks?: boolean
  lambdaBodyIndentation?: 'signature' | 'outerScope'
  language?:
    | 'none'
    | 'cpp'
    | 'cSharp'
    | 'java'
    | 'javaScript'
    | 'json'
    | 'objC'
    | 'proto'
    | 'tableGen'
    | 'textProto'
    | 'verilog'
  lineEnding?: 'lf' | 'crlf' | 'deriveLf' | 'deriveCrlf'
  macroBlockBegin?: string
  macroBlockEnd?: string
  macros?: Array<string>
  maxEmptyLinesToKeep?: number
  namespaceIndentation?: 'none' | 'inner' | 'all'
  namespaceMacros?: Array<string>
  packConstructorInitializers?:
    | 'never'
    | 'binPack'
    | 'currentLine'
    | 'nextLine'
    | 'nextLineOnly'
  penaltyBreakAssignment?: number
  penaltyBreakBeforeFirstCallParameter?: number
  penaltyBreakComment?: number
  penaltyBreakFirstLessLess?: number
  penaltyBreakOpenParenthesis?: number
  penaltyBreakString?: number
  penaltyBreakTemplateDeclaration?: number
  penaltyExcessCharacter?: number
  penaltyIndentedWhitespace?: number
  penaltyReturnTypeOnItsOwnLine?: number
  pointerAlignment?: 'left' | 'right' | 'middle'
  qualifierAlignment?: 'leave' | 'left' | 'right' | 'custom'
  qualifierOrder?: Array<string>
  referenceAlignment?: 'pointer' | 'left' | 'right' | 'middle'
  reflowComments?: boolean
  removeBracesLlvm?: boolean
  removeParentheses?:
    | 'leave'
    | 'multipleParentheses'
    | 'returnStatement'
  removeSemicolon?: boolean
  requiresClausePosition?:
    | 'ownLine'
    | 'withPreceding'
    | 'withFollowing'
    | 'singleLine'
  requiresExpressionIndentation?: 'outerScope' | 'keyword'
  separateDefinitionBlocks?: 'leave' | 'always' | 'never'
  shortNamespaceLines?: number
  sortIncludes?: 'never' | 'caseSensitive' | 'caseInsensitive'
  sortUsingDeclarations?:
    | 'never'
    | 'lexicographic'
    | 'lexicographicNumeric'
  spaceAfterCStyleCast?: boolean
  spaceAfterLogicalNot?: boolean
  spaceAfterTemplateKeyword?: boolean
  spaceAroundPointerQualifiers?: 'default' | 'before' | 'after' | 'both'
  spaceBeforeAssignmentOperators?: boolean
  spaceBeforeCaseColon?: boolean
  spaceBeforeCtorInitializerColon?: boolean
  spaceBeforeInheritanceColon?: boolean
  spaceBeforeJsonColon?: boolean
  spaceBeforeParens?:
    | 'never'
    | 'controlStatements'
    | 'controlStatementsExceptControlMacros'
    | 'nonEmptyParentheses'
    | 'always'
    | 'custom'
  spaceBeforeParensOptions?: {
    afterControlStatements?: boolean
    afterForeachMacros?: boolean
    afterFunctionDeclarationName?: boolean
    afterFunctionDefinitionName?: boolean
    afterIfMacros?: boolean
    afterOverloadedOperator?: boolean
    afterPlacementOperator?: {}
    afterRequiresInClause?: boolean
    afterRequiresInExpression?: boolean
    beforeNonEmptyParentheses?: boolean
  }
  spaceBeforeRangeBasedForLoopColon?: boolean
  spaceBeforeSquareBrackets?: boolean
  spaceInEmptyBlock?: boolean
  spaceInEmptyParentheses?: boolean
  spacesBeforeTrailingComments?: number
  spacesInAngles?: 'never' | 'always' | 'leave'
  spacesInCStyleCastParentheses?: boolean
  spacesInConditionalStatement?: boolean
  spacesInContainerLiterals?: boolean
  spacesInLineCommentPrefix?: {
    minimum?: number
    maximum?: number
  }
  spacesInParens?: 'never' | 'custom'
  spacesInParensOptions?: {
    inConditionalStatements?: boolean
    inCStyleCasts?: boolean
    inEmptyParentheses?: boolean
    other?: boolean
  }
  spacesInParentheses?: boolean
  spacesInSquareBrackets?: boolean
  standard?:
    | 'lsCpp03'
    | 'lsCpp11'
    | 'lsCpp14'
    | 'lsCpp17'
    | 'lsCpp20'
    | 'latest'
    | 'auto'
  statementAttributeLikeMacros?: Array<string>
  statementMacros?: Array<string>
  tabWidth?: number
  typeNames?: Array<string>
  typenameMacros?: Array<string>
  useCrlf?: boolean
  useTab?:
    | 'never'
    | 'forIndentation'
    | 'forContinuationAndIndentation'
    | 'alignWithSpaces'
    | 'always'
  verilogBreakBetweenInstancePorts?: boolean
  whitespaceSensitiveMacros?: Array<string>
}
export type ClangStyleCppOptional = ClangStyleAllOptional & {
  cpp11BracedListStyle?: boolean
  spaceBeforeCpp11BracedList?: boolean
}
export type ClangStyleJavaOptional = ClangStyleAllOptional & {
  breakAfterJavaFieldAnnotations?: boolean
  javaImportGroups?: Array<string>
  sortJavaStaticImport?: 'before' | 'after'
}
export type ClangStyleJavascriptOptional = ClangStyleAllOptional & {
  javaScriptQuotes?: 'leave' | 'single' | 'double'
  javaScriptWrapImports?: boolean
}
export type ClangStyleObjcOptional = ClangStyleAllOptional & {
  objCBinPackProtocolList?: 'auto' | 'always' | 'never'
  objCBlockIndentWidth?: number
  objCBreakBeforeNestedBlockParam?: boolean
  objCPropertyAttributeOrder?: Array<string>
  objCSpaceAfterProperty?: boolean
  objCSpaceBeforeProtocolList?: boolean
}
