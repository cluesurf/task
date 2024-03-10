import _ from 'lodash'

export type ClangStyleAll = {
  basedOnStyle?: string
  alignAfterOpenBracket?:
    | 'align'
    | 'dontAlign'
    | 'alwaysBreak'
    | 'blockIndent'
  alignArrayOfStructures?: 'left' | 'right' | 'none'
  alignConsecutiveAssignments?: {
    enabled: boolean
    acrossEmptyLines: boolean
    acrossComments: boolean
    alignCompound: boolean
    alignFunctionPointers: boolean
    padOperators: boolean
  }
  alignConsecutiveBitFields?: {
    enabled: boolean
    acrossEmptyLines: boolean
    acrossComments: boolean
    alignCompound: boolean
    alignFunctionPointers: boolean
    padOperators: boolean
  }
  alignConsecutiveDeclarations?: {
    enabled: boolean
    acrossEmptyLines: boolean
    acrossComments: boolean
    alignCompound: boolean
    alignFunctionPointers: boolean
    padOperators: boolean
  }
  alignConsecutiveMacros?: {
    enabled: boolean
    acrossEmptyLines: boolean
    acrossComments: boolean
    alignCompound: boolean
    alignFunctionPointers: boolean
    padOperators: boolean
  }
  alignConsecutiveShortCaseStatements?: {
    enabled: boolean
    acrossEmptyLines: boolean
    acrossComments: boolean
    alignCaseColons: boolean
  }
  alignEscapedNewlines?: 'dontAlign' | 'left' | 'right'
  alignOperands?: 'dontAlign' | 'align' | 'alignAfterOperator'
  alignTrailingComments?: {
    kind: {}
    overEmptyLines: number
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
    afterCaseLabel: boolean
    afterClass: boolean
    afterControlStatement: {}
    afterEnum: boolean
    afterFunction: boolean
    afterNamespace: boolean
    afterObjCDeclaration: boolean
    afterStruct: boolean
    afterUnion: boolean
    afterExternBlock: boolean
    beforeCatch: boolean
    beforeElse: boolean
    beforeLambdaBody: boolean
    beforeWhile: boolean
    indentBraces: boolean
    splitEmptyFunction: boolean
    splitEmptyRecord: boolean
    splitEmptyNamespace: boolean
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
    afterControlStatements: boolean
    afterForeachMacros: boolean
    afterFunctionDeclarationName: boolean
    afterFunctionDefinitionName: boolean
    afterIfMacros: boolean
    afterOverloadedOperator: boolean
    afterPlacementOperator: {}
    afterRequiresInClause: boolean
    afterRequiresInExpression: boolean
    beforeNonEmptyParentheses: boolean
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
    minimum: number
    maximum: number
  }
  spacesInParens?: 'never' | 'custom'
  spacesInParensOptions?: {
    inConditionalStatements: boolean
    inCStyleCasts: boolean
    inEmptyParentheses: boolean
    other: boolean
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

export const CLANG_STYLE_ALL = {
  link: {
    basedOnStyle: {
      host: 'BasedOnStyle',
      head: 'Based on style',
      like: 'string',
      note: 'The style used for all options not specifically set in the configuration.',
      need: false,
      case: {
        llvm: {
          head: 'Llvm',
          host: 'LLVM',
          note: 'A style complying with the `LLVM coding standards <https://llvm.org/docs/CodingStandards.html>`_.',
        },
        google: {
          head: 'Google',
          host: 'Google',
          note: "A style complying with `Google's C++ style guide <https://google.github.io/styleguide/cppguide.html>`_.",
        },
        chromium: {
          head: 'Chromium',
          host: 'Chromium',
          note: "A style complying with `Chromium's style guide <https://chromium.googlesource.com/chromium/src/+/refs/heads/main/styleguide/styleguide.md>`_.",
        },
        mozilla: {
          head: 'Mozilla',
          host: 'Mozilla',
          note: "A style complying with `Mozilla's style guide <https://firefox-source-docs.mozilla.org/code-quality/coding-style/index.html>`_.",
        },
        webKit: {
          head: 'Web kit',
          host: 'WebKit',
          note: "A style complying with `WebKit's style guide <https://www.webkit.org/coding/coding-style.html>`_.",
        },
        microsoft: {
          head: 'Microsoft',
          host: 'Microsoft',
          note: "A style complying with `Microsoft's style guide <https://docs.microsoft.com/en-us/visualstudio/ide/editorconfig-code-style-settings-reference>`_.",
        },
        gnu: {
          head: 'Gnu',
          host: 'GNU',
          note: 'A style complying with the `GNU coding standards <https://www.gnu.org/prep/standards/standards.html>`_.',
        },
        inheritParentConfig: {
          head: 'Inherit parent config',
          host: 'InheritParentConfig',
          note: 'Not a real style, but allows to use the `.clang-format` file from the parent directory (or its parent if there is none). If there is no parent file found it falls back to the `fallback` style, and applies the changes to that.',
        },
      },
    },
    accessModifierOffset: {
      host: 'AccessModifierOffset',
      head: 'Access modifier offset',
      note: 'The extra indent or outdent of access modifiers, e.g. `public:`.',
      need: false,
    },
    alignAfterOpenBracket: {
      host: 'AlignAfterOpenBracket',
      head: 'Align after open bracket',
      note: 'If `true`, horizontally aligns arguments after an open bracket.',
      need: false,
      case: {
        align: {
          head: 'Align',
          host: 'Align',
          note: 'Align parameters on the open bracket,.',
        },
        dontAlign: {
          head: 'Dont align',
          host: 'DontAlign',
          note: "Don't align, instead use `ContinuationIndentWidth`,.",
        },
        alwaysBreak: {
          head: 'Always break',
          host: 'AlwaysBreak',
          note: "Always break after an open bracket, if the parameters don't fit on a single line,.",
        },
        blockIndent: {
          head: 'Block indent',
          host: 'BlockIndent',
          note: "Always break after an open bracket, if the parameters don't fit on a single line. Closing brackets will be placed on a new line.",
        },
      },
    },
    alignArrayOfStructures: {
      host: 'AlignArrayOfStructures',
      head: 'Align array of structures',
      note: 'if not `None`, when using initialization for an array of structs aligns the fields into columns.',
      need: false,
      case: {
        left: {
          head: 'Left',
          host: 'Left',
          note: 'Align array column and left justify the columns.',
        },
        right: {
          head: 'Right',
          host: 'Right',
          note: 'Align array column and right justify the columns.',
        },
        none: {
          head: 'None',
          host: 'None',
          note: "Don't align array initializer columns.",
        },
      },
    },
    alignConsecutiveAssignments: {
      host: 'AlignConsecutiveAssignments',
      head: 'Align consecutive assignments',
      note: 'Style of aligning consecutive assignments.',
      link: {
        enabled: {
          head: 'Enabled',
          host: 'Enabled',
          like: 'boolean',
          note: 'Whether aligning is enabled.',
        },
        acrossEmptyLines: {
          head: 'Across empty lines',
          host: 'AcrossEmptyLines',
          like: 'boolean',
          note: 'Whether to align across empty lines.',
        },
        acrossComments: {
          head: 'Across comments',
          host: 'AcrossComments',
          like: 'boolean',
          note: 'Whether to align across comments.',
        },
        alignCompound: {
          head: 'Align compound',
          host: 'AlignCompound',
          like: 'boolean',
          note: 'Whether compound assignments like `+=` are aligned along with `=`.',
        },
        alignFunctionPointers: {
          head: 'Align function pointers',
          host: 'AlignFunctionPointers',
          like: 'boolean',
          note: 'Whether function pointers are aligned.',
        },
        padOperators: {
          head: 'Pad operators',
          host: 'PadOperators',
          like: 'boolean',
          note: 'Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.',
        },
      },
      need: false,
    },
    alignConsecutiveBitFields: {
      host: 'AlignConsecutiveBitFields',
      head: 'Align consecutive bit fields',
      note: 'Style of aligning consecutive bit fields.',
      link: {
        enabled: {
          head: 'Enabled',
          host: 'Enabled',
          like: 'boolean',
          note: 'Whether aligning is enabled.',
        },
        acrossEmptyLines: {
          head: 'Across empty lines',
          host: 'AcrossEmptyLines',
          like: 'boolean',
          note: 'Whether to align across empty lines.',
        },
        acrossComments: {
          head: 'Across comments',
          host: 'AcrossComments',
          like: 'boolean',
          note: 'Whether to align across comments.',
        },
        alignCompound: {
          head: 'Align compound',
          host: 'AlignCompound',
          like: 'boolean',
          note: 'Whether compound assignments like `+=` are aligned along with `=`.',
        },
        alignFunctionPointers: {
          head: 'Align function pointers',
          host: 'AlignFunctionPointers',
          like: 'boolean',
          note: 'Whether function pointers are aligned.',
        },
        padOperators: {
          head: 'Pad operators',
          host: 'PadOperators',
          like: 'boolean',
          note: 'Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.',
        },
      },
      need: false,
    },
    alignConsecutiveDeclarations: {
      host: 'AlignConsecutiveDeclarations',
      head: 'Align consecutive declarations',
      note: 'Style of aligning consecutive declarations.',
      link: {
        enabled: {
          head: 'Enabled',
          host: 'Enabled',
          like: 'boolean',
          note: 'Whether aligning is enabled.',
        },
        acrossEmptyLines: {
          head: 'Across empty lines',
          host: 'AcrossEmptyLines',
          like: 'boolean',
          note: 'Whether to align across empty lines.',
        },
        acrossComments: {
          head: 'Across comments',
          host: 'AcrossComments',
          like: 'boolean',
          note: 'Whether to align across comments.',
        },
        alignCompound: {
          head: 'Align compound',
          host: 'AlignCompound',
          like: 'boolean',
          note: 'Whether compound assignments like `+=` are aligned along with `=`.',
        },
        alignFunctionPointers: {
          head: 'Align function pointers',
          host: 'AlignFunctionPointers',
          like: 'boolean',
          note: 'Whether function pointers are aligned.',
        },
        padOperators: {
          head: 'Pad operators',
          host: 'PadOperators',
          like: 'boolean',
          note: 'Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.',
        },
      },
      need: false,
    },
    alignConsecutiveMacros: {
      host: 'AlignConsecutiveMacros',
      head: 'Align consecutive macros',
      note: 'Style of aligning consecutive macro definitions.',
      link: {
        enabled: {
          head: 'Enabled',
          host: 'Enabled',
          like: 'boolean',
          note: 'Whether aligning is enabled.',
        },
        acrossEmptyLines: {
          head: 'Across empty lines',
          host: 'AcrossEmptyLines',
          like: 'boolean',
          note: 'Whether to align across empty lines.',
        },
        acrossComments: {
          head: 'Across comments',
          host: 'AcrossComments',
          like: 'boolean',
          note: 'Whether to align across comments.',
        },
        alignCompound: {
          head: 'Align compound',
          host: 'AlignCompound',
          like: 'boolean',
          note: 'Whether compound assignments like `+=` are aligned along with `=`.',
        },
        alignFunctionPointers: {
          head: 'Align function pointers',
          host: 'AlignFunctionPointers',
          like: 'boolean',
          note: 'Whether function pointers are aligned.',
        },
        padOperators: {
          head: 'Pad operators',
          host: 'PadOperators',
          like: 'boolean',
          note: 'Whether short assignment operators are left-padded to the same length as long ones in order to put all assignment operators to the right of the left hand side.',
        },
      },
      need: false,
    },
    alignConsecutiveShortCaseStatements: {
      host: 'AlignConsecutiveShortCaseStatements',
      head: 'Align consecutive short case statements',
      note: 'Style of aligning consecutive short case labels.',
      link: {
        enabled: {
          head: 'Enabled',
          host: 'Enabled',
          like: 'boolean',
          note: 'Whether aligning is enabled.',
        },
        acrossEmptyLines: {
          head: 'Across empty lines',
          host: 'AcrossEmptyLines',
          like: 'boolean',
          note: 'Whether to align across empty lines.',
        },
        acrossComments: {
          head: 'Across comments',
          host: 'AcrossComments',
          like: 'boolean',
          note: 'Whether to align across comments.',
        },
        alignCaseColons: {
          head: 'Align case colons',
          host: 'AlignCaseColons',
          like: 'boolean',
          note: 'Whether aligned case labels are aligned on the colon, or on the , or on the tokens after the colon.',
        },
      },
      need: false,
    },
    alignEscapedNewlines: {
      host: 'AlignEscapedNewlines',
      head: 'Align escaped newlines',
      note: 'Options for aligning backslashes in escaped newlines.',
      need: false,
      case: {
        dontAlign: {
          head: 'Dont align',
          host: 'DontAlign',
          note: "Don't align escaped newlines.",
        },
        left: {
          head: 'Left',
          host: 'Left',
          note: 'Align escaped newlines as far left as possible.',
        },
        right: {
          head: 'Right',
          host: 'Right',
          note: 'Align escaped newlines in the right-most column.',
        },
      },
    },
    alignOperands: {
      host: 'AlignOperands',
      head: 'Align operands',
      note: 'If `true`, horizontally align operands of binary and ternary expressions.',
      need: false,
      case: {
        dontAlign: {
          head: 'Dont align',
          host: 'DontAlign',
          note: 'Do not align operands of binary and ternary expressions.',
        },
        align: {
          head: 'Align',
          host: 'Align',
          note: 'Horizontally align operands of binary and ternary expressions.',
        },
        alignAfterOperator: {
          head: 'Align after operator',
          host: 'AlignAfterOperator',
          note: 'Horizontally align operands of binary and ternary expressions.',
        },
      },
    },
    alignTrailingComments: {
      host: 'AlignTrailingComments',
      head: 'Align trailing comments',
      note: 'Control of trailing comments.',
      link: {
        kind: {
          head: 'Kind',
          host: 'Kind',
          note: 'Specifies the way to align trailing comments.',
          nested: true,
          link: {
            leave: {
              head: 'Leave',
              host: 'Leave',
              note: 'Leave trailing comments as they are.',
            },
            always: {
              head: 'Always',
              host: 'Always',
              note: 'Align trailing comments.',
            },
            never: {
              head: 'Never',
              host: 'Never',
              note: "Don't align trailing comments but other formatter applies.",
            },
          },
        },
        overEmptyLines: {
          head: 'Over empty lines',
          host: 'OverEmptyLines',
          like: 'integer',
          note: 'How many empty lines to apply alignment. When both `MaxEmptyLinesToKeep` and `OverEmptyLines` are set to 2, it formats like below.',
        },
      },
      need: false,
    },
    allowAllArgumentsOnNextLine: {
      host: 'AllowAllArgumentsOnNextLine',
      head: 'Allow all arguments on next line',
      like: 'boolean',
      note: "If a function call or braced initializer list doesn't fit on a line, allow putting all arguments onto the next line, even if `BinPackArguments` is `false`.",
      need: false,
    },
    allowAllConstructorInitializersOnNextLine: {
      host: 'AllowAllConstructorInitializersOnNextLine',
      head: 'Allow all constructor initializers on next line',
      like: 'boolean',
      note: 'This option is **deprecated**. See `NextLine` of `PackConstructorInitializers`.',
      need: false,
    },
    allowAllParametersOfDeclarationOnNextLine: {
      host: 'AllowAllParametersOfDeclarationOnNextLine',
      head: 'Allow all parameters of declaration on next line',
      like: 'boolean',
      note: "If the function declaration doesn't fit on a line, allow putting all parameters of a function declaration onto the next line even if `BinPackParameters` is `false`.",
      need: false,
    },
    allowBreakBeforeNoexceptSpecifier: {
      host: 'AllowBreakBeforeNoexceptSpecifier',
      head: 'Allow break before noexcept specifier',
      note: 'Controls if there could be a line break before a `noexcept` specifier.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'No line break allowed.',
        },
        onlyWithParen: {
          head: 'Only with paren',
          host: 'OnlyWithParen',
          note: 'For a simple `noexcept` there is no line break allowed, but when we have a condition it is.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Line breaks are allowed. But note that because of the associated penalties `clang-format` often prefers not to break before the `noexcept`.',
        },
      },
    },
    allowShortBlocksOnASingleLine: {
      host: 'AllowShortBlocksOnASingleLine',
      head: 'Allow short blocks on a single line',
      note: 'Dependent on the value, `while (true) { continue; }` can be put on a single line.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Never merge blocks into a single line.',
        },
        empty: {
          head: 'Empty',
          host: 'Empty',
          note: 'Only merge empty blocks.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Always merge short blocks into a single line.',
        },
      },
    },
    allowShortCaseLabelsOnASingleLine: {
      host: 'AllowShortCaseLabelsOnASingleLine',
      head: 'Allow short case labels on a single line',
      like: 'boolean',
      note: 'If `true`, short case labels will be contracted to a single line.',
      need: false,
    },
    allowShortCompoundRequirementOnASingleLine: {
      host: 'AllowShortCompoundRequirementOnASingleLine',
      head: 'Allow short compound requirement on a single line',
      like: 'boolean',
      note: 'Allow short compound requirement on a single line.',
      need: false,
    },
    allowShortEnumsOnASingleLine: {
      host: 'AllowShortEnumsOnASingleLine',
      head: 'Allow short enums on a single line',
      like: 'boolean',
      note: 'Allow short enums on a single line.',
      need: false,
    },
    allowShortFunctionsOnASingleLine: {
      host: 'AllowShortFunctionsOnASingleLine',
      head: 'Allow short functions on a single line',
      note: 'Dependent on the value, `int f() { return 0; }` can be put on a single line.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: 'Never merge functions into a single line.',
        },
        inlineOnly: {
          head: 'Inline only',
          host: 'InlineOnly',
          note: 'Only merge functions defined inside a class. Same as "inline", except it does not implies "empty": i.e. top level empty functions are not merged either.',
        },
        empty: {
          head: 'Empty',
          host: 'Empty',
          note: 'Only merge empty functions.',
        },
        inline: {
          head: 'Inline',
          host: 'Inline',
          note: 'Only merge functions defined inside a class. Implies "empty".',
        },
        all: {
          head: 'All',
          host: 'All',
          note: 'Merge all functions fitting on a single line.',
        },
      },
    },
    allowShortIfStatementsOnASingleLine: {
      host: 'AllowShortIfStatementsOnASingleLine',
      head: 'Allow short if statements on a single line',
      note: 'Dependent on the value, `if (a) return;` can be put on a single line.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Never put short ifs on the same line.',
        },
        withoutElse: {
          head: 'Without else',
          host: 'WithoutElse',
          note: 'Put short ifs on the same line only if there is no else statement.',
        },
        onlyFirstIf: {
          head: 'Only first if',
          host: 'OnlyFirstIf',
          note: 'Put short ifs, but not else ifs nor else statements, on the same line.',
        },
        allIfsAndElse: {
          head: 'All ifs and else',
          host: 'AllIfsAndElse',
          note: 'Always put short ifs, else ifs and else statements on the same line.',
        },
      },
    },
    allowShortLambdasOnASingleLine: {
      host: 'AllowShortLambdasOnASingleLine',
      head: 'Allow short lambdas on a single line',
      note: 'Dependent on the value, `auto lambda []() { return 0; }` can be put on a single line.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: 'Never merge lambdas into a single line.',
        },
        empty: {
          head: 'Empty',
          host: 'Empty',
          note: 'Only merge empty lambdas.',
        },
        inline: {
          head: 'Inline',
          host: 'Inline',
          note: 'Merge lambda into a single line if the lambda is argument of a function.',
        },
        all: {
          head: 'All',
          host: 'All',
          note: 'Merge all lambdas fitting on a single line.',
        },
      },
    },
    allowShortLoopsOnASingleLine: {
      host: 'AllowShortLoopsOnASingleLine',
      head: 'Allow short loops on a single line',
      like: 'boolean',
      note: 'If `true`, `while (true) continue;` can be put on a single line.',
      need: false,
    },
    alwaysBreakAfterDefinitionReturnType: {
      host: 'AlwaysBreakAfterDefinitionReturnType',
      head: 'Always break after definition return type',
      note: 'The function definition return type breaking style to use. This option is **deprecated** and is retained for backwards compatibility.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: 'Break after return type automatically.',
        },
        all: {
          head: 'All',
          host: 'All',
          note: 'Always break after the return type.',
        },
        topLevel: {
          head: 'Top level',
          host: 'TopLevel',
          note: 'Always break after the return types of top-level functions.',
        },
      },
    },
    alwaysBreakAfterReturnType: {
      host: 'AlwaysBreakAfterReturnType',
      head: 'Always break after return type',
      note: 'The function declaration return type breaking style to use.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: 'Break after return type automatically.',
        },
        all: {
          head: 'All',
          host: 'All',
          note: 'Always break after the return type.',
        },
        topLevel: {
          head: 'Top level',
          host: 'TopLevel',
          note: 'Always break after the return types of top-level functions.',
        },
        allDefinitions: {
          head: 'All definitions',
          host: 'AllDefinitions',
          note: 'Always break after the return type of function definitions.',
        },
        topLevelDefinitions: {
          head: 'Top level definitions',
          host: 'TopLevelDefinitions',
          note: 'Always break after the return type of top-level definitions.',
        },
      },
    },
    alwaysBreakBeforeMultilineStrings: {
      host: 'AlwaysBreakBeforeMultilineStrings',
      head: 'Always break before multiline strings',
      like: 'boolean',
      note: 'If `true`, always break before multiline string literals.',
      need: false,
    },
    alwaysBreakTemplateDeclarations: {
      host: 'AlwaysBreakTemplateDeclarations',
      head: 'Always break template declarations',
      note: 'The template declaration breaking style to use.',
      need: false,
      case: {
        no: {
          head: 'No',
          host: 'No',
          note: 'Do not force break before declaration.',
        },
        multiLine: {
          head: 'Multi line',
          host: 'MultiLine',
          note: 'Force break after template declaration only when the following declaration spans multiple lines.',
        },
        yes: {
          head: 'Yes',
          host: 'Yes',
          note: 'Always break after template declaration.',
        },
      },
    },
    attributeMacros: {
      host: 'AttributeMacros',
      head: 'Attribute macros',
      like: 'string',
      list: true,
      note: 'A vector of strings that should be interpreted as attributes/qualifiers instead of identifiers. This can be useful for language extensions or static analyzer annotations.',
      need: false,
    },
    binPackArguments: {
      host: 'BinPackArguments',
      head: 'Bin pack arguments',
      like: 'boolean',
      note: "If `false`, a function call's arguments will either be all on the same line or will have one line each.",
      need: false,
    },
    binPackParameters: {
      host: 'BinPackParameters',
      head: 'Bin pack parameters',
      like: 'boolean',
      note: "If `false`, a function declaration's or function definition's parameters will either all be on the same line or will have one line each.",
      need: false,
    },
    bitFieldColonSpacing: {
      host: 'BitFieldColonSpacing',
      head: 'Bit field colon spacing',
      note: 'The BitFieldColonSpacingStyle to use for bitfields.',
      need: false,
      case: {
        both: {
          head: 'Both',
          host: 'Both',
          note: 'Add one space on each side of the `:`.',
        },
        none: {
          head: 'None',
          host: 'None',
          note: 'Add no space around the `:` (except when needed for `AlignConsecutiveBitFields`).',
        },
        before: {
          head: 'Before',
          host: 'Before',
          note: 'Add space before the `:` only.',
        },
        after: {
          head: 'After',
          host: 'After',
          note: 'Add space after the `:` only (space may be added before if needed for `AlignConsecutiveBitFields`).',
        },
      },
    },
    braceWrapping: {
      host: 'BraceWrapping',
      head: 'Brace wrapping',
      note: 'Control of individual brace wrapping cases.',
      link: {
        afterCaseLabel: {
          head: 'After case label',
          host: 'AfterCaseLabel',
          like: 'boolean',
          note: 'Wrap case labels.',
        },
        afterClass: {
          head: 'After class',
          host: 'AfterClass',
          like: 'boolean',
          note: 'Wrap class definitions.',
        },
        afterControlStatement: {
          head: 'After control statement',
          host: 'AfterControlStatement',
          note: 'Wrap control statements (`if`/`for`/`while`/`switch`/..).',
          nested: true,
          link: {
            never: {
              head: 'Never',
              host: 'Never',
              note: 'Never wrap braces after a control statement.',
            },
            multiLine: {
              head: 'Multi line',
              host: 'MultiLine',
              note: 'Only wrap braces after a multi-line control statement.',
            },
            always: {
              head: 'Always',
              host: 'Always',
              note: 'Always wrap braces after a control statement.',
            },
          },
        },
        afterEnum: {
          head: 'After enum',
          host: 'AfterEnum',
          like: 'boolean',
          note: 'Wrap enum definitions.',
        },
        afterFunction: {
          head: 'After function',
          host: 'AfterFunction',
          like: 'boolean',
          note: 'Wrap function definitions.',
        },
        afterNamespace: {
          head: 'After namespace',
          host: 'AfterNamespace',
          like: 'boolean',
          note: 'Wrap namespace definitions.',
        },
        afterObjCDeclaration: {
          head: 'After obj c declaration',
          host: 'AfterObjCDeclaration',
          like: 'boolean',
          note: 'Wrap ObjC definitions (interfaces, implementations...).',
        },
        afterStruct: {
          head: 'After struct',
          host: 'AfterStruct',
          like: 'boolean',
          note: 'Wrap struct definitions.',
        },
        afterUnion: {
          head: 'After union',
          host: 'AfterUnion',
          like: 'boolean',
          note: 'Wrap union definitions.',
        },
        afterExternBlock: {
          head: 'After extern block',
          host: 'AfterExternBlock',
          like: 'boolean',
          note: 'Wrap extern blocks.',
        },
        beforeCatch: {
          head: 'Before catch',
          host: 'BeforeCatch',
          like: 'boolean',
          note: 'Wrap before `catch`.',
        },
        beforeElse: {
          head: 'Before else',
          host: 'BeforeElse',
          like: 'boolean',
          note: 'Wrap before `else`.',
        },
        beforeLambdaBody: {
          head: 'Before lambda body',
          host: 'BeforeLambdaBody',
          like: 'boolean',
          note: 'Wrap lambda block.',
        },
        beforeWhile: {
          head: 'Before while',
          host: 'BeforeWhile',
          like: 'boolean',
          note: 'Wrap before `while`.',
        },
        indentBraces: {
          head: 'Indent braces',
          host: 'IndentBraces',
          like: 'boolean',
          note: 'Indent the wrapped braces themselves.',
        },
        splitEmptyFunction: {
          head: 'Split empty function',
          host: 'SplitEmptyFunction',
          like: 'boolean',
          note: 'If `false`, empty function body can be put on a single line. This option is used only if the opening brace of the function has already been wrapped, i.e. the `AfterFunction` brace wrapping mode is set, and the function could/should not be put on a single line (as per `AllowShortFunctionsOnASingleLine` and constructor formatting options).',
        },
        splitEmptyRecord: {
          head: 'Split empty record',
          host: 'SplitEmptyRecord',
          like: 'boolean',
          note: 'If `false`, empty record (e.g. class, struct or union) body can be put on a single line. This option is used only if the opening brace of the record has already been wrapped, i.e. the `AfterClass` (for classes) brace wrapping mode is set.',
        },
        splitEmptyNamespace: {
          head: 'Split empty namespace',
          host: 'SplitEmptyNamespace',
          like: 'boolean',
          note: 'If `false`, empty namespace body can be put on a single line. This option is used only if the opening brace of the namespace has already been wrapped, i.e. the `AfterNamespace` brace wrapping mode is set.',
        },
      },
      need: false,
    },
    bracedInitializerIndentWidth: {
      host: 'BracedInitializerIndentWidth',
      head: 'Braced initializer indent width',
      like: 'integer',
      note: 'The number of columns to use to indent the contents of braced init lists.',
      need: false,
    },
    breakAdjacentStringLiterals: {
      host: 'BreakAdjacentStringLiterals',
      head: 'Break adjacent string literals',
      like: 'boolean',
      note: 'Break between adjacent string literals.',
      need: false,
    },
    breakAfterAttributes: {
      host: 'BreakAfterAttributes',
      head: 'Break after attributes',
      note: 'Break after a group of C++11 attributes before variable or function (including constructor/destructor) declaration/definition names or before control statements, i.e. `if`, `switch` (including `case` and `default` labels), `for`, and `while` statements.',
      need: false,
      case: {
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Always break after attributes.',
        },
        leave: {
          head: 'Leave',
          host: 'Leave',
          note: 'Leave the line breaking after attributes as is.',
        },
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Never break after attributes.',
        },
      },
    },
    breakArrays: {
      host: 'BreakArrays',
      head: 'Break arrays',
      like: 'boolean',
      note: 'If `true`, clang-format will always break after a Json array `[` otherwise it will scan until the closing `]` to determine if it should add newlines between elements (prettier compatible).',
      need: false,
    },
    breakBeforeBinaryOperators: {
      host: 'BreakBeforeBinaryOperators',
      head: 'Break before binary operators',
      note: 'The way to wrap binary operators.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: 'Break after operators.',
        },
        nonAssignment: {
          head: 'Non assignment',
          host: 'NonAssignment',
          note: "Break before operators that aren't assignments.",
        },
        all: {
          head: 'All',
          host: 'All',
          note: 'Break before operators.',
        },
      },
    },
    breakBeforeBraces: {
      host: 'BreakBeforeBraces',
      head: 'Break before braces',
      note: 'The brace breaking style to use.',
      need: false,
      case: {
        attach: {
          head: 'Attach',
          host: 'Attach',
          note: 'Always attach braces to surrounding context.',
        },
        linux: {
          head: 'Linux',
          host: 'Linux',
          note: 'Like `Attach`, but break before braces on function, namespace and class definitions.',
        },
        mozilla: {
          head: 'Mozilla',
          host: 'Mozilla',
          note: 'Like `Attach`, but break before braces on enum, function, and record definitions.',
        },
        stroustrup: {
          head: 'Stroustrup',
          host: 'Stroustrup',
          note: 'Like `Attach`, but break before function definitions, `catch`, and `else`.',
        },
        allman: {
          head: 'Allman',
          host: 'Allman',
          note: 'Always break before braces.',
        },
        whitesmiths: {
          head: 'Whitesmiths',
          host: 'Whitesmiths',
          note: 'Like `Allman` but always indent braces and line up code with braces.',
        },
        gnu: {
          head: 'Gnu',
          host: 'GNU',
          note: 'Always break before braces and add an extra level of indentation to braces of control statements, not to those of class, function or other definitions.',
        },
        webKit: {
          head: 'Web kit',
          host: 'WebKit',
          note: 'Like `Attach`, but break before functions.',
        },
        custom: {
          head: 'Custom',
          host: 'Custom',
          note: 'Configure each individual brace in `BraceWrapping`.',
        },
      },
    },
    breakBeforeConceptDeclarations: {
      host: 'BreakBeforeConceptDeclarations',
      head: 'Break before concept declarations',
      note: 'The concept declaration style to use.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Keep the template declaration line together with `concept`.',
        },
        allowed: {
          head: 'Allowed',
          host: 'Allowed',
          note: 'Breaking between template declaration and `concept` is allowed. The actual behavior depends on the content and line breaking rules and penalties.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Always break before `concept`, putting it in the line after the template declaration.',
        },
      },
    },
    breakBeforeInlineAsmColon: {
      host: 'BreakBeforeInlineASMColon',
      head: 'Break before inline asm colon',
      note: 'The inline ASM colon style to use.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'No break before inline ASM colon.',
        },
        onlyMultiline: {
          head: 'Only multiline',
          host: 'OnlyMultiline',
          note: 'Break before inline ASM colon if the line length is longer than column limit.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Always break before inline ASM colon.',
        },
      },
    },
    breakBeforeTernaryOperators: {
      host: 'BreakBeforeTernaryOperators',
      head: 'Break before ternary operators',
      like: 'boolean',
      note: 'If `true`, ternary operators will be placed after line breaks.',
      need: false,
    },
    breakConstructorInitializers: {
      host: 'BreakConstructorInitializers',
      head: 'Break constructor initializers',
      note: 'The break constructor initializers style to use.',
      need: false,
      case: {
        beforeColon: {
          head: 'Before colon',
          host: 'BeforeColon',
          note: 'Break constructor initializers before the colon and after the commas.',
        },
        beforeComma: {
          head: 'Before comma',
          host: 'BeforeComma',
          note: 'Break constructor initializers before the colon and commas, and align the commas with the colon.',
        },
        afterColon: {
          head: 'After colon',
          host: 'AfterColon',
          note: 'Break constructor initializers after the colon and commas.',
        },
      },
    },
    breakInheritanceList: {
      host: 'BreakInheritanceList',
      head: 'Break inheritance list',
      note: 'The inheritance list style to use.',
      need: false,
      case: {
        beforeColon: {
          head: 'Before colon',
          host: 'BeforeColon',
          note: 'Break inheritance list before the colon and after the commas.',
        },
        beforeComma: {
          head: 'Before comma',
          host: 'BeforeComma',
          note: 'Break inheritance list before the colon and commas, and align the commas with the colon.',
        },
        afterColon: {
          head: 'After colon',
          host: 'AfterColon',
          note: 'Break inheritance list after the colon and commas.',
        },
        afterComma: {
          head: 'After comma',
          host: 'AfterComma',
          note: 'Break inheritance list only after the commas.',
        },
      },
    },
    breakStringLiterals: {
      host: 'BreakStringLiterals',
      head: 'Break string literals',
      like: 'boolean',
      note: 'Allow breaking string literals when formatting.',
      need: false,
    },
    columnLimit: {
      host: 'ColumnLimit',
      head: 'Column limit',
      like: 'integer',
      note: 'The column limit.',
      need: false,
    },
    commentPragmas: {
      host: 'CommentPragmas',
      head: 'Comment pragmas',
      like: 'string',
      note: 'A regular expression that describes comments with special meaning, which should not be split into lines or otherwise changed.',
      need: false,
    },
    compactNamespaces: {
      host: 'CompactNamespaces',
      head: 'Compact namespaces',
      like: 'boolean',
      note: 'If `true`, consecutive namespace declarations will be on the same line. If `false`, each namespace is declared on a new line.',
      need: false,
    },
    constructorInitializerAllOnOneLineOrOnePerLine: {
      host: 'ConstructorInitializerAllOnOneLineOrOnePerLine',
      head: 'Constructor initializer all on one line or one per line',
      like: 'boolean',
      note: 'This option is **deprecated**. See `CurrentLine` of `PackConstructorInitializers`.',
      need: false,
    },
    constructorInitializerIndentWidth: {
      host: 'ConstructorInitializerIndentWidth',
      head: 'Constructor initializer indent width',
      like: 'integer',
      note: 'The number of characters to use for indentation of constructor initializer lists as well as inheritance lists.',
      need: false,
    },
    continuationIndentWidth: {
      host: 'ContinuationIndentWidth',
      head: 'Continuation indent width',
      like: 'integer',
      note: 'Indent width for line continuations.',
      need: false,
    },
    deriveLineEnding: {
      host: 'DeriveLineEnding',
      head: 'Derive line ending',
      like: 'boolean',
      note: 'This option is **deprecated**. See `DeriveLF` and `DeriveCRLF` of `LineEnding`.',
      need: false,
    },
    derivePointerAlignment: {
      host: 'DerivePointerAlignment',
      head: 'Derive pointer alignment',
      like: 'boolean',
      note: 'If `true`, analyze the formatted file for the most common alignment of `&` and `*`.',
      need: false,
    },
    disableFormat: {
      host: 'DisableFormat',
      head: 'Disable format',
      like: 'boolean',
      note: 'Disables formatting completely.',
      need: false,
    },
    emptyLineAfterAccessModifier: {
      host: 'EmptyLineAfterAccessModifier',
      head: 'Empty line after access modifier',
      note: 'Defines when to put an empty line after access modifiers.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Remove all empty lines after access modifiers.',
        },
        leave: {
          head: 'Leave',
          host: 'Leave',
          note: 'Keep existing empty lines after access modifiers.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Always add empty line after access modifiers if there are none.',
        },
      },
    },
    emptyLineBeforeAccessModifier: {
      host: 'EmptyLineBeforeAccessModifier',
      head: 'Empty line before access modifier',
      note: 'Defines in which cases to put empty line before access modifiers.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Remove all empty lines before access modifiers.',
        },
        leave: {
          head: 'Leave',
          host: 'Leave',
          note: 'Keep existing empty lines before access modifiers.',
        },
        logicalBlock: {
          head: 'Logical block',
          host: 'LogicalBlock',
          note: 'Add empty line only when access modifier starts a new logical block.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Always add empty line before access modifiers unless access modifier is at the start of struct or class definition.',
        },
      },
    },
    experimentalAutoDetectBinPacking: {
      host: 'ExperimentalAutoDetectBinPacking',
      head: 'Experimental auto detect bin packing',
      like: 'boolean',
      note: 'If `true`, clang-format detects whether function calls and definitions are formatted with one parameter per line.',
      need: false,
    },
    fixNamespaceComments: {
      host: 'FixNamespaceComments',
      head: 'Fix namespace comments',
      like: 'boolean',
      note: "If `true`, clang-format adds missing namespace end comments for namespaces and fixes invalid existing ones. This doesn't affect short namespaces, which are controlled by `ShortNamespaceLines`.",
      need: false,
    },
    forEachMacros: {
      host: 'ForEachMacros',
      head: 'For each macros',
      like: 'string',
      list: true,
      note: 'A vector of macros that should be interpreted as foreach loops instead of as function calls.',
      need: false,
    },
    ifMacros: {
      host: 'IfMacros',
      head: 'If macros',
      like: 'string',
      list: true,
      note: 'A vector of macros that should be interpreted as conditionals instead of as function calls.',
      need: false,
    },
    includeBlocks: {
      host: 'IncludeBlocks',
      head: 'Include blocks',
      note: 'Dependent on the value, multiple `#include` blocks can be sorted as one and divided based on category.',
      need: false,
      case: {
        preserve: {
          head: 'Preserve',
          host: 'Preserve',
          note: 'Sort each `#include` block separately.',
        },
        merge: {
          head: 'Merge',
          host: 'Merge',
          note: 'Merge multiple `#include` blocks together and sort as one.',
        },
        regroup: {
          head: 'Regroup',
          host: 'Regroup',
          note: 'Merge multiple `#include` blocks together and sort as one.',
        },
      },
    },
    includeCategories: {
      host: 'IncludeCategories',
      head: 'Include categories',
      list: true,
      note: 'Regular expressions denoting the different `#include` categories used for ordering `#includes`.',
      need: false,
    },
    includeIsMainRegex: {
      host: 'IncludeIsMainRegex',
      head: 'Include is main regex',
      like: 'string',
      note: 'Specify a regular expression of suffixes that are allowed in the file-to-main-include mapping.',
      need: false,
    },
    includeIsMainSourceRegex: {
      host: 'IncludeIsMainSourceRegex',
      head: 'Include is main source regex',
      like: 'string',
      note: 'Specify a regular expression for files being formatted that are allowed to be considered "main" in the file-to-main-include mapping.',
      need: false,
    },
    indentAccessModifiers: {
      host: 'IndentAccessModifiers',
      head: 'Indent access modifiers',
      like: 'boolean',
      note: 'Specify whether access modifiers should have their own indentation level.',
      need: false,
    },
    indentCaseBlocks: {
      host: 'IndentCaseBlocks',
      head: 'Indent case blocks',
      like: 'boolean',
      note: 'Indent case label blocks one level from the case label.',
      need: false,
    },
    indentCaseLabels: {
      host: 'IndentCaseLabels',
      head: 'Indent case labels',
      like: 'boolean',
      note: 'Indent case labels one level from the switch statement.',
      need: false,
    },
    indentExternBlock: {
      host: 'IndentExternBlock',
      head: 'Indent extern block',
      note: 'IndentExternBlockStyle is the type of indenting of extern blocks.',
      need: false,
      case: {
        afterExternBlock: {
          head: 'After extern block',
          host: 'AfterExternBlock',
          note: "Backwards compatible with AfterExternBlock's indenting.",
        },
        noIndent: {
          head: 'No indent',
          host: 'NoIndent',
          note: 'Does not indent extern blocks.',
        },
        indent: {
          head: 'Indent',
          host: 'Indent',
          note: 'Indents extern blocks.',
        },
      },
    },
    indentGotoLabels: {
      host: 'IndentGotoLabels',
      head: 'Indent goto labels',
      like: 'boolean',
      note: 'Indent goto labels.',
      need: false,
    },
    indentPpDirectives: {
      host: 'IndentPPDirectives',
      head: 'Indent pp directives',
      note: 'The preprocessor directive indenting style to use.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: 'Does not indent any directives.',
        },
        afterHash: {
          head: 'After hash',
          host: 'AfterHash',
          note: 'Indents directives after the hash.',
        },
        beforeHash: {
          head: 'Before hash',
          host: 'BeforeHash',
          note: 'Indents directives before the hash.',
        },
      },
    },
    indentRequiresClause: {
      host: 'IndentRequiresClause',
      head: 'Indent requires clause',
      like: 'boolean',
      note: 'Indent the requires clause in a template. This only applies when `RequiresClausePosition` is `OwnLine`, or `WithFollowing`.',
      need: false,
    },
    indentWidth: {
      host: 'IndentWidth',
      head: 'Indent width',
      like: 'integer',
      note: 'The number of columns to use for indentation.',
      need: false,
    },
    indentWrappedFunctionNames: {
      host: 'IndentWrappedFunctionNames',
      head: 'Indent wrapped function names',
      like: 'boolean',
      note: 'Indent if a function definition or declaration is wrapped after the type.',
      need: false,
    },
    insertBraces: {
      host: 'InsertBraces',
      head: 'Insert braces',
      like: 'boolean',
      note: 'Insert braces after control statements (`if`, `else`, `for`, `do`, and `while`) in C++ unless the control statements are inside macro definitions or the braces would enclose preprocessor directives.',
      need: false,
    },
    insertNewlineAtEof: {
      host: 'InsertNewlineAtEOF',
      head: 'Insert newline at eof',
      like: 'boolean',
      note: 'Insert a newline at end of file if missing.',
      need: false,
    },
    insertTrailingCommas: {
      host: 'InsertTrailingCommas',
      head: 'Insert trailing commas',
      note: 'If set to `TCS_Wrapped` will insert trailing commas in container literals (arrays and objects) that wrap across multiple lines.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: 'Do not insert trailing commas.',
        },
        wrapped: {
          head: 'Wrapped',
          host: 'Wrapped',
          note: 'Insert trailing commas in container literals that were wrapped over multiple lines. Note that this is conceptually incompatible with bin-packing, because the trailing comma is used as an indicator that a container should be formatted one-per-line (i.e. not bin-packed).',
        },
      },
    },
    integerLiteralSeparator: {
      host: 'IntegerLiteralSeparator',
      head: 'Integer literal separator',
      note: "Format integer literal separators (`'` for C++ and `_` for C#, Java, and JavaScript).",
      link: {
        binary: {
          head: 'Binary',
          host: 'Binary',
          note: 'Format separators in binary literals.',
          nested: true,
        },
        binaryMinDigits: {
          head: 'Binary min digits',
          host: 'BinaryMinDigits',
          note: 'Format separators in binary literals with a minimum number of digits.',
          nested: true,
        },
        decimal: {
          head: 'Decimal',
          host: 'Decimal',
          note: 'Format separators in decimal literals.',
          nested: true,
        },
        decimalMinDigits: {
          head: 'Decimal min digits',
          host: 'DecimalMinDigits',
          note: 'Format separators in decimal literals with a minimum number of digits.',
          nested: true,
        },
        hex: {
          head: 'Hex',
          host: 'Hex',
          note: 'Format separators in hexadecimal literals.',
          nested: true,
        },
        hexMinDigits: {
          head: 'Hex min digits',
          host: 'HexMinDigits',
          note: 'Format separators in hexadecimal literals with a minimum number of digits.',
          nested: true,
        },
      },
      need: false,
    },
    keepEmptyLinesAtEof: {
      host: 'KeepEmptyLinesAtEOF',
      head: 'Keep empty lines at eof',
      like: 'boolean',
      note: 'Keep empty lines (up to `MaxEmptyLinesToKeep`) at end of file.',
      need: false,
    },
    keepEmptyLinesAtTheStartOfBlocks: {
      host: 'KeepEmptyLinesAtTheStartOfBlocks',
      head: 'Keep empty lines at the start of blocks',
      like: 'boolean',
      note: 'If true, the empty line at the start of blocks is kept.',
      need: false,
    },
    lambdaBodyIndentation: {
      host: 'LambdaBodyIndentation',
      head: 'Lambda body indentation',
      note: 'The indentation style of lambda bodies. `Signature` (the default) causes the lambda body to be indented one additional level relative to the indentation level of the signature. `OuterScope` forces the lambda body to be indented one additional level relative to the parent scope containing the lambda signature.',
      need: false,
      case: {
        signature: {
          head: 'Signature',
          host: 'Signature',
          note: 'Align lambda body relative to the lambda signature. This is the default.',
        },
        outerScope: {
          head: 'Outer scope',
          host: 'OuterScope',
          note: 'For statements within block scope, align lambda body relative to the indentation level of the outer scope the lambda signature resides in.',
        },
      },
    },
    language: {
      host: 'Language',
      head: 'Language',
      note: 'Language, this format style is targeted at.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: 'Do not use.',
        },
        cpp: {
          head: 'Cpp',
          host: 'Cpp',
          note: 'Should be used for C, C++.',
        },
        cSharp: {
          head: 'C sharp',
          host: 'CSharp',
          note: 'Should be used for C#.',
        },
        java: {
          head: 'Java',
          host: 'Java',
          note: 'Should be used for Java.',
        },
        javaScript: {
          head: 'Java script',
          host: 'JavaScript',
          note: 'Should be used for JavaScript.',
        },
        json: {
          head: 'Json',
          host: 'Json',
          note: 'Should be used for JSON.',
        },
        objC: {
          head: 'Obj c',
          host: 'ObjC',
          note: 'Should be used for Objective-C, Objective-C++.',
        },
        proto: {
          head: 'Proto',
          host: 'Proto',
          note: 'Should be used for Protocol Buffers (https://developers.google.com/protocol-buffers/).',
        },
        tableGen: {
          head: 'Table gen',
          host: 'TableGen',
          note: 'Should be used for TableGen code.',
        },
        textProto: {
          head: 'Text proto',
          host: 'TextProto',
          note: 'Should be used for Protocol Buffer messages in text format (https://developers.google.com/protocol-buffers/).',
        },
        verilog: {
          head: 'Verilog',
          host: 'Verilog',
          note: 'Should be used for Verilog and SystemVerilog.',
        },
      },
    },
    lineEnding: {
      host: 'LineEnding',
      head: 'Line ending',
      note: 'Line ending style (`\\n` or `\\r\\n`) to use.',
      need: false,
      case: {
        lf: {
          head: 'Lf',
          host: 'LF',
          note: 'Use `\\n`.',
        },
        crlf: {
          head: 'Crlf',
          host: 'CRLF',
          note: 'Use `\\r\\n`.',
        },
        deriveLf: {
          head: 'Derive lf',
          host: 'DeriveLF',
          note: 'Use `\\n` unless the input has more lines ending in `\\r\\n`.',
        },
        deriveCrlf: {
          head: 'Derive crlf',
          host: 'DeriveCRLF',
          note: 'Use `\\r\\n` unless the input has more lines ending in `\\n`.',
        },
      },
    },
    macroBlockBegin: {
      host: 'MacroBlockBegin',
      head: 'Macro block begin',
      like: 'string',
      note: 'A regular expression matching macros that start a block.',
      need: false,
    },
    macroBlockEnd: {
      host: 'MacroBlockEnd',
      head: 'Macro block end',
      like: 'string',
      note: 'A regular expression matching macros that end a block.',
      need: false,
    },
    macros: {
      host: 'Macros',
      head: 'Macros',
      like: 'string',
      list: true,
      note: 'A list of macros of the form `<definition>=<expansion>` .',
      need: false,
    },
    maxEmptyLinesToKeep: {
      host: 'MaxEmptyLinesToKeep',
      head: 'Max empty lines to keep',
      like: 'integer',
      note: 'The maximum number of consecutive empty lines to keep.',
      need: false,
    },
    namespaceIndentation: {
      host: 'NamespaceIndentation',
      head: 'Namespace indentation',
      note: 'The indentation used for namespaces.',
      need: false,
      case: {
        none: {
          head: 'None',
          host: 'None',
          note: "Don't indent in namespaces.",
        },
        inner: {
          head: 'Inner',
          host: 'Inner',
          note: 'Indent only in inner namespaces (nested in other namespaces).',
        },
        all: {
          head: 'All',
          host: 'All',
          note: 'Indent in all namespaces.',
        },
      },
    },
    namespaceMacros: {
      host: 'NamespaceMacros',
      head: 'Namespace macros',
      like: 'string',
      list: true,
      note: 'A vector of macros which are used to open namespace blocks.',
      need: false,
    },
    ppIndentWidth: {
      host: 'PPIndentWidth',
      head: 'Pp indent width',
      note: 'The number of columns to use for indentation of preprocessor statements.',
      need: false,
    },
    packConstructorInitializers: {
      host: 'PackConstructorInitializers',
      head: 'Pack constructor initializers',
      note: 'The pack constructor initializers style to use.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Always put each constructor initializer on its own line.',
        },
        binPack: {
          head: 'Bin pack',
          host: 'BinPack',
          note: 'Bin-pack constructor initializers.',
        },
        currentLine: {
          head: 'Current line',
          host: 'CurrentLine',
          note: 'Put all constructor initializers on the current line if they fit.',
        },
        nextLine: {
          head: 'Next line',
          host: 'NextLine',
          note: 'Same as `PCIS_CurrentLine` except that if all constructor initializers do not fit on the current line, try to fit them on the next line.',
        },
        nextLineOnly: {
          head: 'Next line only',
          host: 'NextLineOnly',
          note: 'Put all constructor initializers on the next line if they fit.',
        },
      },
    },
    penaltyBreakAssignment: {
      host: 'PenaltyBreakAssignment',
      head: 'Penalty break assignment',
      like: 'integer',
      note: 'The penalty for breaking around an assignment operator.',
      need: false,
    },
    penaltyBreakBeforeFirstCallParameter: {
      host: 'PenaltyBreakBeforeFirstCallParameter',
      head: 'Penalty break before first call parameter',
      like: 'integer',
      note: 'The penalty for breaking a function call after `call(`.',
      need: false,
    },
    penaltyBreakComment: {
      host: 'PenaltyBreakComment',
      head: 'Penalty break comment',
      like: 'integer',
      note: 'The penalty for each line break introduced inside a comment.',
      need: false,
    },
    penaltyBreakFirstLessLess: {
      host: 'PenaltyBreakFirstLessLess',
      head: 'Penalty break first less less',
      like: 'integer',
      note: 'The penalty for breaking before the first `<<`.',
      need: false,
    },
    penaltyBreakOpenParenthesis: {
      host: 'PenaltyBreakOpenParenthesis',
      head: 'Penalty break open parenthesis',
      like: 'integer',
      note: 'The penalty for breaking after `(`.',
      need: false,
    },
    penaltyBreakString: {
      host: 'PenaltyBreakString',
      head: 'Penalty break string',
      like: 'integer',
      note: 'The penalty for each line break introduced inside a string literal.',
      need: false,
    },
    penaltyBreakTemplateDeclaration: {
      host: 'PenaltyBreakTemplateDeclaration',
      head: 'Penalty break template declaration',
      like: 'integer',
      note: 'The penalty for breaking after template declaration.',
      need: false,
    },
    penaltyExcessCharacter: {
      host: 'PenaltyExcessCharacter',
      head: 'Penalty excess character',
      like: 'integer',
      note: 'The penalty for each character outside of the column limit.',
      need: false,
    },
    penaltyIndentedWhitespace: {
      host: 'PenaltyIndentedWhitespace',
      head: 'Penalty indented whitespace',
      like: 'integer',
      note: 'Penalty for each character of whitespace indentation (counted relative to leading non-whitespace column).',
      need: false,
    },
    penaltyReturnTypeOnItsOwnLine: {
      host: 'PenaltyReturnTypeOnItsOwnLine',
      head: 'Penalty return type on its own line',
      like: 'integer',
      note: 'Penalty for putting the return type of a function onto its own line.',
      need: false,
    },
    pointerAlignment: {
      host: 'PointerAlignment',
      head: 'Pointer alignment',
      note: 'Pointer and reference alignment style.',
      need: false,
      case: {
        left: {
          head: 'Left',
          host: 'Left',
          note: 'Align pointer to the left.',
        },
        right: {
          head: 'Right',
          host: 'Right',
          note: 'Align pointer to the right.',
        },
        middle: {
          head: 'Middle',
          host: 'Middle',
          note: 'Align pointer in the middle.',
        },
      },
    },
    qualifierAlignment: {
      host: 'QualifierAlignment',
      head: 'Qualifier alignment',
      note: 'Different ways to arrange specifiers and qualifiers (e.g. const/volatile).',
      need: false,
      case: {
        leave: {
          head: 'Leave',
          host: 'Leave',
          note: "Don't change specifiers/qualifiers to either Left or Right alignment (default).",
        },
        left: {
          head: 'Left',
          host: 'Left',
          note: 'Change specifiers/qualifiers to be left-aligned.',
        },
        right: {
          head: 'Right',
          host: 'Right',
          note: 'Change specifiers/qualifiers to be right-aligned.',
        },
        custom: {
          head: 'Custom',
          host: 'Custom',
          note: 'Change specifiers/qualifiers to be aligned based on `QualifierOrder`.',
        },
      },
    },
    qualifierOrder: {
      host: 'QualifierOrder',
      head: 'Qualifier order',
      like: 'string',
      list: true,
      note: 'The order in which the qualifiers appear.',
      need: false,
    },
    rawStringFormats: {
      host: 'RawStringFormats',
      head: 'Raw string formats',
      list: true,
      note: 'Defines hints for detecting supported languages code blocks in raw strings.',
      need: false,
    },
    referenceAlignment: {
      host: 'ReferenceAlignment',
      head: 'Reference alignment',
      note: 'Reference alignment style (overrides `PointerAlignment` for references).',
      need: false,
      case: {
        pointer: {
          head: 'Pointer',
          host: 'Pointer',
          note: 'Align reference like `PointerAlignment`.',
        },
        left: {
          head: 'Left',
          host: 'Left',
          note: 'Align reference to the left.',
        },
        right: {
          head: 'Right',
          host: 'Right',
          note: 'Align reference to the right.',
        },
        middle: {
          head: 'Middle',
          host: 'Middle',
          note: 'Align reference in the middle.',
        },
      },
    },
    reflowComments: {
      host: 'ReflowComments',
      head: 'Reflow comments',
      like: 'boolean',
      note: 'If `true`, clang-format will attempt to re-flow comments. That is it will touch a comment and *reflow* long comments into new lines, trying to obey the `ColumnLimit`.',
      need: false,
    },
    removeBracesLlvm: {
      host: 'RemoveBracesLLVM',
      head: 'Remove braces llvm',
      like: 'boolean',
      note: 'Remove optional braces of control statements (`if`, `else`, `for`, and `while`) in C++ according to the LLVM coding style.',
      need: false,
    },
    removeParentheses: {
      host: 'RemoveParentheses',
      head: 'Remove parentheses',
      note: 'Remove redundant parentheses.',
      need: false,
      case: {
        leave: {
          head: 'Leave',
          host: 'Leave',
          note: 'Do not remove parentheses.',
        },
        multipleParentheses: {
          head: 'Multiple parentheses',
          host: 'MultipleParentheses',
          note: 'Replace multiple parentheses with single parentheses.',
        },
        returnStatement: {
          head: 'Return statement',
          host: 'ReturnStatement',
          note: 'Also remove parentheses enclosing the expression in a `return`/`co_return` statement.',
        },
      },
    },
    removeSemicolon: {
      host: 'RemoveSemicolon',
      head: 'Remove semicolon',
      like: 'boolean',
      note: 'Remove semicolons after the closing brace of a non-empty function.',
      need: false,
    },
    requiresClausePosition: {
      host: 'RequiresClausePosition',
      head: 'Requires clause position',
      note: 'The position of the `requires` clause.',
      need: false,
      case: {
        ownLine: {
          head: 'Own line',
          host: 'OwnLine',
          note: 'Always put the `requires` clause on its own line.',
        },
        withPreceding: {
          head: 'With preceding',
          host: 'WithPreceding',
          note: 'Try to put the clause together with the preceding part of a declaration.',
        },
        withFollowing: {
          head: 'With following',
          host: 'WithFollowing',
          note: 'Try to put the `requires` clause together with the class or function declaration.',
        },
        singleLine: {
          head: 'Single line',
          host: 'SingleLine',
          note: 'Try to put everything in the same line if possible. Otherwise normal line breaking rules take over.',
        },
      },
    },
    requiresExpressionIndentation: {
      host: 'RequiresExpressionIndentation',
      head: 'Requires expression indentation',
      note: 'The indentation used for requires expression bodies.',
      need: false,
      case: {
        outerScope: {
          head: 'Outer scope',
          host: 'OuterScope',
          note: 'Align requires expression body relative to the indentation level of the outer scope the requires expression resides in.',
        },
        keyword: {
          head: 'Keyword',
          host: 'Keyword',
          note: 'Align requires expression body relative to the `requires` keyword.',
        },
      },
    },
    separateDefinitionBlocks: {
      host: 'SeparateDefinitionBlocks',
      head: 'Separate definition blocks',
      note: 'Specifies the use of empty lines to separate definition blocks, including classes, structs, enums, and functions.',
      need: false,
      case: {
        leave: {
          head: 'Leave',
          host: 'Leave',
          note: 'Leave definition blocks as they are.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Insert an empty line between definition blocks.',
        },
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Remove any empty line between definition blocks.',
        },
      },
    },
    shortNamespaceLines: {
      host: 'ShortNamespaceLines',
      head: 'Short namespace lines',
      like: 'integer',
      note: 'The maximal number of unwrapped lines that a short namespace spans.',
      need: false,
    },
    sortIncludes: {
      host: 'SortIncludes',
      head: 'Sort includes',
      note: 'Controls if and how clang-format will sort `#includes`.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Includes are never sorted.',
        },
        caseSensitive: {
          head: 'Case sensitive',
          host: 'CaseSensitive',
          note: 'Includes are sorted in an ASCIIbetical or case sensitive fashion.',
        },
        caseInsensitive: {
          head: 'Case insensitive',
          host: 'CaseInsensitive',
          note: 'Includes are sorted in an alphabetical or case insensitive fashion.',
        },
      },
    },
    sortUsingDeclarations: {
      host: 'SortUsingDeclarations',
      head: 'Sort using declarations',
      note: 'Controls if and how clang-format will sort using declarations.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Using declarations are never sorted.',
        },
        lexicographic: {
          head: 'Lexicographic',
          host: 'Lexicographic',
          note: 'Using declarations are sorted in the order defined as follows: Split the strings by "::" and discard any initial empty strings. Sort the lists of names lexicographically, and within those groups, names are in case-insensitive lexicographic order.',
        },
        lexicographicNumeric: {
          head: 'Lexicographic numeric',
          host: 'LexicographicNumeric',
          note: 'Using declarations are sorted in the order defined as follows: Split the strings by "::" and discard any initial empty strings. The last element of each list is a non-namespace name; all others are namespace names. Sort the lists of names lexicographically, where the sort order of individual names is that all non-namespace names come before all namespace names, and within those groups, names are in case-insensitive lexicographic order.',
        },
      },
    },
    spaceAfterCStyleCast: {
      host: 'SpaceAfterCStyleCast',
      head: 'Space after c style cast',
      like: 'boolean',
      note: 'If `true`, a space is inserted after C style casts.',
      need: false,
    },
    spaceAfterLogicalNot: {
      host: 'SpaceAfterLogicalNot',
      head: 'Space after logical not',
      like: 'boolean',
      note: 'If `true`, a space is inserted after the logical not operator (`!`).',
      need: false,
    },
    spaceAfterTemplateKeyword: {
      host: 'SpaceAfterTemplateKeyword',
      head: 'Space after template keyword',
      like: 'boolean',
      note: "If `true`, a space will be inserted after the 'template' keyword.",
      need: false,
    },
    spaceAroundPointerQualifiers: {
      host: 'SpaceAroundPointerQualifiers',
      head: 'Space around pointer qualifiers',
      note: 'Defines in which cases to put a space before or after pointer qualifiers.',
      need: false,
      case: {
        default: {
          head: 'Default',
          host: 'Default',
          note: "Don't ensure spaces around pointer qualifiers and use PointerAlignment instead.",
        },
        before: {
          head: 'Before',
          host: 'Before',
          note: 'Ensure that there is a space before pointer qualifiers.',
        },
        after: {
          head: 'After',
          host: 'After',
          note: 'Ensure that there is a space after pointer qualifiers.',
        },
        both: {
          head: 'Both',
          host: 'Both',
          note: 'Ensure that there is a space both before and after pointer qualifiers.',
        },
      },
    },
    spaceBeforeAssignmentOperators: {
      host: 'SpaceBeforeAssignmentOperators',
      head: 'Space before assignment operators',
      like: 'boolean',
      note: 'If `false`, spaces will be removed before assignment operators.',
      need: false,
    },
    spaceBeforeCaseColon: {
      host: 'SpaceBeforeCaseColon',
      head: 'Space before case colon',
      like: 'boolean',
      note: 'If `false`, spaces will be removed before case colon.',
      need: false,
    },
    spaceBeforeCtorInitializerColon: {
      host: 'SpaceBeforeCtorInitializerColon',
      head: 'Space before ctor initializer colon',
      like: 'boolean',
      note: 'If `false`, spaces will be removed before constructor initializer colon.',
      need: false,
    },
    spaceBeforeInheritanceColon: {
      host: 'SpaceBeforeInheritanceColon',
      head: 'Space before inheritance colon',
      like: 'boolean',
      note: 'If `false`, spaces will be removed before inheritance colon.',
      need: false,
    },
    spaceBeforeJsonColon: {
      host: 'SpaceBeforeJsonColon',
      head: 'Space before json colon',
      like: 'boolean',
      note: 'If `true`, a space will be added before a JSON colon. For other languages, e.g. JavaScript, use `SpacesInContainerLiterals` instead.',
      need: false,
    },
    spaceBeforeParens: {
      host: 'SpaceBeforeParens',
      head: 'Space before parens',
      note: 'Defines in which cases to put a space before opening parentheses.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Never put a space before opening parentheses.',
        },
        controlStatements: {
          head: 'Control statements',
          host: 'ControlStatements',
          note: 'Put a space before opening parentheses only after control statement keywords (`for/if/while...`).',
        },
        controlStatementsExceptControlMacros: {
          head: 'Control statements except control macros',
          host: 'ControlStatementsExceptControlMacros',
          note: "Same as `SBPO_ControlStatements` except this option doesn't apply to ForEach and If macros. This is useful in projects where ForEach/If macros are treated as function calls instead of control statements.",
        },
        nonEmptyParentheses: {
          head: 'Non empty parentheses',
          host: 'NonEmptyParentheses',
          note: "Put a space before opening parentheses only if the parentheses are not empty i.e. '()'.",
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: "Always put a space before opening parentheses, except when it's prohibited by the syntax rules (in function-like macro definitions) or when determined by other style rules (after unary operators, opening parentheses, etc.).",
        },
        custom: {
          head: 'Custom',
          host: 'Custom',
          note: 'Configure each individual space before parentheses in `SpaceBeforeParensOptions`.',
        },
      },
    },
    spaceBeforeParensOptions: {
      host: 'SpaceBeforeParensOptions',
      head: 'Space before parens options',
      note: 'Control of individual space before parentheses.',
      link: {
        afterControlStatements: {
          head: 'After control statements',
          host: 'AfterControlStatements',
          like: 'boolean',
          note: 'If `true`, put space between control statement keywords (for/if/while...) and opening parentheses.',
        },
        afterForeachMacros: {
          head: 'After foreach macros',
          host: 'AfterForeachMacros',
          like: 'boolean',
          note: 'If `true`, put space between foreach macros and opening parentheses.',
        },
        afterFunctionDeclarationName: {
          head: 'After function declaration name',
          host: 'AfterFunctionDeclarationName',
          like: 'boolean',
          note: 'If `true`, put a space between function declaration name and opening parentheses.',
        },
        afterFunctionDefinitionName: {
          head: 'After function definition name',
          host: 'AfterFunctionDefinitionName',
          like: 'boolean',
          note: 'If `true`, put a space between function definition name and opening parentheses.',
        },
        afterIfMacros: {
          head: 'After if macros',
          host: 'AfterIfMacros',
          like: 'boolean',
          note: 'If `true`, put space between if macros and opening parentheses.',
        },
        afterOverloadedOperator: {
          head: 'After overloaded operator',
          host: 'AfterOverloadedOperator',
          like: 'boolean',
          note: 'If `true`, put a space between operator overloading and opening parentheses.',
        },
        afterPlacementOperator: {
          head: 'After placement operator',
          host: 'AfterPlacementOperator',
          note: ':versionbadge:`clang-format 18`.',
          nested: true,
          link: {
            never: {
              head: 'Never',
              host: 'Never',
              note: 'Remove space after `new/delete` operators and before `(`.',
            },
            always: {
              head: 'Always',
              host: 'Always',
              note: 'Always add space after `new/delete` operators and before `(`.',
            },
            leave: {
              head: 'Leave',
              host: 'Leave',
              note: 'Leave placement `new/delete` expressions as they are.',
            },
          },
        },
        afterRequiresInClause: {
          head: 'After requires in clause',
          host: 'AfterRequiresInClause',
          like: 'boolean',
          note: 'If `true`, put space between requires keyword in a requires clause and opening parentheses, if there is one.',
        },
        afterRequiresInExpression: {
          head: 'After requires in expression',
          host: 'AfterRequiresInExpression',
          like: 'boolean',
          note: 'If `true`, put space between requires keyword in a requires expression and opening parentheses.',
        },
        beforeNonEmptyParentheses: {
          head: 'Before non empty parentheses',
          host: 'BeforeNonEmptyParentheses',
          like: 'boolean',
          note: 'If `true`, put a space before opening parentheses only if the parentheses are not empty.',
        },
      },
      need: false,
    },
    spaceBeforeRangeBasedForLoopColon: {
      host: 'SpaceBeforeRangeBasedForLoopColon',
      head: 'Space before range based for loop colon',
      like: 'boolean',
      note: 'If `false`, spaces will be removed before range-based for loop colon.',
      need: false,
    },
    spaceBeforeSquareBrackets: {
      host: 'SpaceBeforeSquareBrackets',
      head: 'Space before square brackets',
      like: 'boolean',
      note: 'If `true`, spaces will be before `[`.',
      need: false,
    },
    spaceInEmptyBlock: {
      host: 'SpaceInEmptyBlock',
      head: 'Space in empty block',
      like: 'boolean',
      note: 'If `true`, spaces will be inserted into `{}`.',
      need: false,
    },
    spaceInEmptyParentheses: {
      host: 'SpaceInEmptyParentheses',
      head: 'Space in empty parentheses',
      like: 'boolean',
      note: 'If `true`, spaces may be inserted into `()`.',
      need: false,
    },
    spacesBeforeTrailingComments: {
      host: 'SpacesBeforeTrailingComments',
      head: 'Spaces before trailing comments',
      like: 'integer',
      note: 'The number of spaces before trailing line comments (`//` - comments).',
      need: false,
    },
    spacesInAngles: {
      host: 'SpacesInAngles',
      head: 'Spaces in angles',
      note: 'The SpacesInAnglesStyle to use for template argument lists.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Remove spaces after `<` and before `>`.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Add spaces after `<` and before `>`.',
        },
        leave: {
          head: 'Leave',
          host: 'Leave',
          note: 'Keep a single space after `<` and before `>` if any spaces were present. Option `Standard: Cpp03` takes precedence.',
        },
      },
    },
    spacesInCStyleCastParentheses: {
      host: 'SpacesInCStyleCastParentheses',
      head: 'Spaces in c style cast parentheses',
      like: 'boolean',
      note: 'If `true`, spaces may be inserted into C style casts.',
      need: false,
    },
    spacesInConditionalStatement: {
      host: 'SpacesInConditionalStatement',
      head: 'Spaces in conditional statement',
      like: 'boolean',
      note: 'If `true`, spaces will be inserted around if/for/switch/while conditions.',
      need: false,
    },
    spacesInContainerLiterals: {
      host: 'SpacesInContainerLiterals',
      head: 'Spaces in container literals',
      like: 'boolean',
      note: 'If `true`, spaces are inserted inside container literals (e.g. ObjC and Javascript array and dict literals). For JSON, use `SpaceBeforeJsonColon` instead.',
      need: false,
    },
    spacesInLineCommentPrefix: {
      host: 'SpacesInLineCommentPrefix',
      head: 'Spaces in line comment prefix',
      note: 'How many spaces are allowed at the start of a line comment. To disable the maximum set it to `-1`, apart from that the maximum takes precedence over the minimum.',
      link: {
        minimum: {
          head: 'Minimum',
          host: 'Minimum',
          like: 'integer',
          note: 'The minimum number of spaces at the start of the comment.',
        },
        maximum: {
          head: 'Maximum',
          host: 'Maximum',
          like: 'integer',
          note: 'The maximum number of spaces at the start of the comment.',
        },
      },
      need: false,
    },
    spacesInParens: {
      host: 'SpacesInParens',
      head: 'Spaces in parens',
      note: 'Defines in which cases spaces will be inserted after `(` and before `)`.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Never put a space in parentheses.',
        },
        custom: {
          head: 'Custom',
          host: 'Custom',
          note: 'Configure each individual space in parentheses in `SpacesInParensOptions`.',
        },
      },
    },
    spacesInParensOptions: {
      host: 'SpacesInParensOptions',
      head: 'Spaces in parens options',
      note: 'Control of individual spaces in parentheses.',
      link: {
        inConditionalStatements: {
          head: 'In conditional statements',
          host: 'InConditionalStatements',
          like: 'boolean',
          note: 'Put a space in parentheses only inside conditional statements (`for/if/while/switch...`).',
        },
        inCStyleCasts: {
          head: 'In c style casts',
          host: 'InCStyleCasts',
          like: 'boolean',
          note: 'Put a space in C style casts.',
        },
        inEmptyParentheses: {
          head: 'In empty parentheses',
          host: 'InEmptyParentheses',
          like: 'boolean',
          note: "Put a space in parentheses only if the parentheses are empty i.e. '()'.",
        },
        other: {
          head: 'Other',
          host: 'Other',
          like: 'boolean',
          note: 'Put a space in parentheses not covered by preceding options.',
        },
      },
      need: false,
    },
    spacesInParentheses: {
      host: 'SpacesInParentheses',
      head: 'Spaces in parentheses',
      like: 'boolean',
      note: 'If `true`, spaces will be inserted after `(` and before `)`.',
      need: false,
    },
    spacesInSquareBrackets: {
      host: 'SpacesInSquareBrackets',
      head: 'Spaces in square brackets',
      like: 'boolean',
      note: 'If `true`, spaces will be inserted after `[` and before `]`.',
      need: false,
    },
    standard: {
      host: 'Standard',
      head: 'Standard',
      note: 'Parse and format C++ constructs compatible with this standard.',
      need: false,
      case: {
        lsCpp03: {
          head: 'Ls cpp 03',
          host: 'LS_Cpp03',
          note: '(in configuration: `c++03`) Parse and format as C++03.',
        },
        lsCpp11: {
          head: 'Ls cpp 11',
          host: 'LS_Cpp11',
          note: '(in configuration: `c++11`) Parse and format as C++11.',
        },
        lsCpp14: {
          head: 'Ls cpp 14',
          host: 'LS_Cpp14',
          note: '(in configuration: `c++14`) Parse and format as C++14.',
        },
        lsCpp17: {
          head: 'Ls cpp 17',
          host: 'LS_Cpp17',
          note: '(in configuration: `c++17`) Parse and format as C++17.',
        },
        lsCpp20: {
          head: 'Ls cpp 20',
          host: 'LS_Cpp20',
          note: '(in configuration: `c++20`) Parse and format as C++20.',
        },
        latest: {
          head: 'Latest',
          host: 'Latest',
          note: 'Parse and format using the latest supported language version.',
        },
        auto: {
          head: 'Auto',
          host: 'Auto',
          note: 'Automatic detection based on the input.',
        },
      },
    },
    statementAttributeLikeMacros: {
      host: 'StatementAttributeLikeMacros',
      head: 'Statement attribute like macros',
      like: 'string',
      list: true,
      note: 'Macros which are ignored in front of a statement, as if they were an attribute. So that they are not parsed as identifier, for example for Qts emit.',
      need: false,
    },
    statementMacros: {
      host: 'StatementMacros',
      head: 'Statement macros',
      like: 'string',
      list: true,
      note: 'A vector of macros that should be interpreted as complete statements.',
      need: false,
    },
    tabWidth: {
      host: 'TabWidth',
      head: 'Tab width',
      like: 'integer',
      note: 'The number of columns used for tab stops.',
      need: false,
    },
    typeNames: {
      host: 'TypeNames',
      head: 'Type names',
      like: 'string',
      list: true,
      note: 'A vector of non-keyword identifiers that should be interpreted as type names.',
      need: false,
    },
    typenameMacros: {
      host: 'TypenameMacros',
      head: 'Typename macros',
      like: 'string',
      list: true,
      note: 'A vector of macros that should be interpreted as type declarations instead of as function calls.',
      need: false,
    },
    useCrlf: {
      host: 'UseCRLF',
      head: 'Use crlf',
      like: 'boolean',
      note: 'This option is **deprecated**. See `LF` and `CRLF` of `LineEnding`.',
      need: false,
    },
    useTab: {
      host: 'UseTab',
      head: 'Use tab',
      note: 'The way to use tab characters in the resulting file.',
      need: false,
      case: {
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Never use tab.',
        },
        forIndentation: {
          head: 'For indentation',
          host: 'ForIndentation',
          note: 'Use tabs only for indentation.',
        },
        forContinuationAndIndentation: {
          head: 'For continuation and indentation',
          host: 'ForContinuationAndIndentation',
          note: 'Fill all leading whitespace with tabs, and use spaces for alignment that appears within a line (e.g. consecutive assignments and declarations).',
        },
        alignWithSpaces: {
          head: 'Align with spaces',
          host: 'AlignWithSpaces',
          note: 'Use tabs for line continuation and indentation, and spaces for alignment.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Use tabs whenever we need to fill whitespace that spans at least from one tab stop to the next one.',
        },
      },
    },
    verilogBreakBetweenInstancePorts: {
      host: 'VerilogBreakBetweenInstancePorts',
      head: 'Verilog break between instance ports',
      like: 'boolean',
      note: 'For Verilog, put each port on its own line in module instantiations.',
      need: false,
    },
    whitespaceSensitiveMacros: {
      host: 'WhitespaceSensitiveMacros',
      head: 'Whitespace sensitive macros',
      like: 'string',
      list: true,
      note: 'A vector of macros which are whitespace-sensitive and should not be touched.',
      need: false,
    },
  },
}
export type ClangStyleCpp = ClangStyleAll & {
  cpp11BracedListStyle?: boolean
  spaceBeforeCpp11BracedList?: boolean
}

export const CLANG_STYLE_CPP = _.merge({}, CLANG_STYLE_ALL, {
  link: {
    cpp11BracedListStyle: {
      host: 'Cpp11BracedListStyle',
      head: 'Braced list style',
      like: 'boolean',
      note: 'If `true`, format braced lists as best suited for C++11 braced lists.',
      need: false,
    },
    spaceBeforeCpp11BracedList: {
      host: 'SpaceBeforeCpp11BracedList',
      head: 'Space before braced list',
      like: 'boolean',
      note: 'If `true`, a space will be inserted before a C++11 braced list used to initialize an object (after the preceding identifier or type).',
      need: false,
    },
  },
})
export type ClangStyleJava = ClangStyleAll & {
  breakAfterJavaFieldAnnotations?: boolean
  javaImportGroups?: Array<string>
  sortJavaStaticImport?: 'before' | 'after'
}

export const CLANG_STYLE_JAVA = _.merge({}, CLANG_STYLE_ALL, {
  link: {
    breakAfterJavaFieldAnnotations: {
      host: 'BreakAfterJavaFieldAnnotations',
      head: 'Break after field annotations',
      like: 'boolean',
      note: 'Break after each annotation on a field in Java files.',
      need: false,
    },
    javaImportGroups: {
      host: 'JavaImportGroups',
      head: 'Import groups',
      like: 'string',
      list: true,
      note: 'A vector of prefixes ordered by the desired groups for Java imports.',
      need: false,
    },
    sortJavaStaticImport: {
      host: 'SortJavaStaticImport',
      head: 'Sort static import',
      note: 'When sorting Java imports, by default static imports are placed before non-static imports. If `JavaStaticImportAfterImport` is `After`, static imports are placed after non-static imports.',
      need: false,
      case: {
        before: {
          head: 'Before',
          host: 'Before',
          note: 'Static imports are placed before non-static imports.',
        },
        after: {
          head: 'After',
          host: 'After',
          note: 'Static imports are placed after non-static imports.',
        },
      },
    },
  },
})
export type ClangStyleJavascript = ClangStyleAll & {
  javaScriptQuotes?: 'leave' | 'single' | 'double'
  javaScriptWrapImports?: boolean
}

export const CLANG_STYLE_JAVASCRIPT = _.merge({}, CLANG_STYLE_ALL, {
  link: {
    javaScriptQuotes: {
      host: 'JavaScriptQuotes',
      head: 'Quotes',
      note: 'The JavaScriptQuoteStyle to use for JavaScript strings.',
      need: false,
      case: {
        leave: {
          head: 'Leave',
          host: 'Leave',
          note: 'Leave string quotes as they are.',
        },
        single: {
          head: 'Single',
          host: 'Single',
          note: 'Always use single quotes.',
        },
        double: {
          head: 'Double',
          host: 'Double',
          note: 'Always use double quotes.',
        },
      },
    },
    javaScriptWrapImports: {
      host: 'JavaScriptWrapImports',
      head: 'Wrap imports',
      like: 'boolean',
      note: 'Whether to wrap JavaScript import/export statements.',
      need: false,
    },
  },
})
export type ClangStyleObjc = ClangStyleAll & {
  objCBinPackProtocolList?: 'auto' | 'always' | 'never'
  objCBlockIndentWidth?: number
  objCBreakBeforeNestedBlockParam?: boolean
  objCPropertyAttributeOrder?: Array<string>
  objCSpaceAfterProperty?: boolean
  objCSpaceBeforeProtocolList?: boolean
}

export const CLANG_STYLE_OBJC = _.merge({}, CLANG_STYLE_ALL, {
  link: {
    objCBinPackProtocolList: {
      host: 'ObjCBinPackProtocolList',
      head: 'Bin pack protocol list',
      note: 'Controls bin-packing Objective-C protocol conformance list items into as few lines as possible when they go over `ColumnLimit`.',
      need: false,
      case: {
        auto: {
          head: 'Auto',
          host: 'Auto',
          note: 'Automatically determine parameter bin-packing behavior.',
        },
        always: {
          head: 'Always',
          host: 'Always',
          note: 'Always bin-pack parameters.',
        },
        never: {
          head: 'Never',
          host: 'Never',
          note: 'Never bin-pack parameters.',
        },
      },
    },
    objCBlockIndentWidth: {
      host: 'ObjCBlockIndentWidth',
      head: 'Block indent width',
      like: 'integer',
      note: 'The number of characters to use for indentation of ObjC blocks.',
      need: false,
    },
    objCBreakBeforeNestedBlockParam: {
      host: 'ObjCBreakBeforeNestedBlockParam',
      head: 'Break before nested block param',
      like: 'boolean',
      note: 'Break parameters list into lines when there is nested block parameters in a function call.',
      need: false,
    },
    objCPropertyAttributeOrder: {
      host: 'ObjCPropertyAttributeOrder',
      head: 'Property attribute order',
      like: 'string',
      list: true,
      note: 'The order in which ObjC property attributes should appear.',
      need: false,
    },
    objCSpaceAfterProperty: {
      host: 'ObjCSpaceAfterProperty',
      head: 'Space after property',
      like: 'boolean',
      note: 'Add a space after `@property` in Objective-C, i.e. use `@property (readonly)` instead of `@property(readonly)`.',
      need: false,
    },
    objCSpaceBeforeProtocolList: {
      host: 'ObjCSpaceBeforeProtocolList',
      head: 'Space before protocol list',
      like: 'boolean',
      note: 'Add a space in front of an Objective-C protocol list, i.e. use `Foo <Protocol>` instead of `Foo<Protocol>`.',
      need: false,
    },
  },
})
