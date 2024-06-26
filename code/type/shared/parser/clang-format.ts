import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@termsurf/form'
import * as code from '~/code/type/code.js'

import {
  ClangStyleAll,
  ClangStyleCpp,
  ClangStyleJava,
  ClangStyleJavascript,
  ClangStyleObjc,
} from '~/code/type/shared/clang-format.js'

let ClangStyleAllModel: z.ZodType<ClangStyleAll>

export const ClangStyleAllParser = (): z.ZodType<ClangStyleAll> => {
  if (!ClangStyleAllModel) {
    ClangStyleAllModel = z.object({
      basedOnStyle: z.optional(z.string()),
      alignAfterOpenBracket: z.optional(
        z.enum(['align', 'dontAlign', 'alwaysBreak', 'blockIndent']),
      ),
      alignArrayOfStructures: z.optional(
        z.enum(['left', 'right', 'none']),
      ),
      alignConsecutiveAssignments: z.optional(
        z.object({
          enabled: z.boolean(),
          acrossEmptyLines: z.boolean(),
          acrossComments: z.boolean(),
          alignCompound: z.boolean(),
          alignFunctionPointers: z.boolean(),
          padOperators: z.boolean(),
        }),
      ),
      alignConsecutiveBitFields: z.optional(
        z.object({
          enabled: z.boolean(),
          acrossEmptyLines: z.boolean(),
          acrossComments: z.boolean(),
          alignCompound: z.boolean(),
          alignFunctionPointers: z.boolean(),
          padOperators: z.boolean(),
        }),
      ),
      alignConsecutiveDeclarations: z.optional(
        z.object({
          enabled: z.boolean(),
          acrossEmptyLines: z.boolean(),
          acrossComments: z.boolean(),
          alignCompound: z.boolean(),
          alignFunctionPointers: z.boolean(),
          padOperators: z.boolean(),
        }),
      ),
      alignConsecutiveMacros: z.optional(
        z.object({
          enabled: z.boolean(),
          acrossEmptyLines: z.boolean(),
          acrossComments: z.boolean(),
          alignCompound: z.boolean(),
          alignFunctionPointers: z.boolean(),
          padOperators: z.boolean(),
        }),
      ),
      alignConsecutiveShortCaseStatements: z.optional(
        z.object({
          enabled: z.boolean(),
          acrossEmptyLines: z.boolean(),
          acrossComments: z.boolean(),
          alignCaseColons: z.boolean(),
        }),
      ),
      alignEscapedNewlines: z.optional(
        z.enum(['dontAlign', 'left', 'right']),
      ),
      alignOperands: z.optional(
        z.enum(['dontAlign', 'align', 'alignAfterOperator']),
      ),
      alignTrailingComments: z.optional(
        z.object({
          kind: z.object({}),
          overEmptyLines: z.number().int(),
        }),
      ),
      allowAllArgumentsOnNextLine: z.optional(z.boolean()),
      allowAllConstructorInitializersOnNextLine: z.optional(
        z.boolean(),
      ),
      allowAllParametersOfDeclarationOnNextLine: z.optional(
        z.boolean(),
      ),
      allowBreakBeforeNoexceptSpecifier: z.optional(
        z.enum(['never', 'onlyWithParen', 'always']),
      ),
      allowShortBlocksOnASingleLine: z.optional(
        z.enum(['never', 'empty', 'always']),
      ),
      allowShortCaseLabelsOnASingleLine: z.optional(z.boolean()),
      allowShortCompoundRequirementOnASingleLine: z.optional(
        z.boolean(),
      ),
      allowShortEnumsOnASingleLine: z.optional(z.boolean()),
      allowShortFunctionsOnASingleLine: z.optional(
        z.enum(['none', 'inlineOnly', 'empty', 'inline', 'all']),
      ),
      allowShortIfStatementsOnASingleLine: z.optional(
        z.enum([
          'never',
          'withoutElse',
          'onlyFirstIf',
          'allIfsAndElse',
        ]),
      ),
      allowShortLambdasOnASingleLine: z.optional(
        z.enum(['none', 'empty', 'inline', 'all']),
      ),
      allowShortLoopsOnASingleLine: z.optional(z.boolean()),
      alwaysBreakAfterDefinitionReturnType: z.optional(
        z.enum(['none', 'all', 'topLevel']),
      ),
      alwaysBreakAfterReturnType: z.optional(
        z.enum([
          'none',
          'all',
          'topLevel',
          'allDefinitions',
          'topLevelDefinitions',
        ]),
      ),
      alwaysBreakBeforeMultilineStrings: z.optional(z.boolean()),
      alwaysBreakTemplateDeclarations: z.optional(
        z.enum(['no', 'multiLine', 'yes']),
      ),
      attributeMacros: z.optional(z.array(z.string())),
      binPackArguments: z.optional(z.boolean()),
      binPackParameters: z.optional(z.boolean()),
      bitFieldColonSpacing: z.optional(
        z.enum(['both', 'none', 'before', 'after']),
      ),
      braceWrapping: z.optional(
        z.object({
          afterCaseLabel: z.boolean(),
          afterClass: z.boolean(),
          afterControlStatement: z.object({}),
          afterEnum: z.boolean(),
          afterFunction: z.boolean(),
          afterNamespace: z.boolean(),
          afterObjCDeclaration: z.boolean(),
          afterStruct: z.boolean(),
          afterUnion: z.boolean(),
          afterExternBlock: z.boolean(),
          beforeCatch: z.boolean(),
          beforeElse: z.boolean(),
          beforeLambdaBody: z.boolean(),
          beforeWhile: z.boolean(),
          indentBraces: z.boolean(),
          splitEmptyFunction: z.boolean(),
          splitEmptyRecord: z.boolean(),
          splitEmptyNamespace: z.boolean(),
        }),
      ),
      bracedInitializerIndentWidth: z.optional(z.number().int()),
      breakAdjacentStringLiterals: z.optional(z.boolean()),
      breakAfterAttributes: z.optional(
        z.enum(['always', 'leave', 'never']),
      ),
      breakArrays: z.optional(z.boolean()),
      breakBeforeBinaryOperators: z.optional(
        z.enum(['none', 'nonAssignment', 'all']),
      ),
      breakBeforeBraces: z.optional(
        z.enum([
          'attach',
          'linux',
          'mozilla',
          'stroustrup',
          'allman',
          'whitesmiths',
          'gnu',
          'webKit',
          'custom',
        ]),
      ),
      breakBeforeConceptDeclarations: z.optional(
        z.enum(['never', 'allowed', 'always']),
      ),
      breakBeforeInlineAsmColon: z.optional(
        z.enum(['never', 'onlyMultiline', 'always']),
      ),
      breakBeforeTernaryOperators: z.optional(z.boolean()),
      breakConstructorInitializers: z.optional(
        z.enum(['beforeColon', 'beforeComma', 'afterColon']),
      ),
      breakInheritanceList: z.optional(
        z.enum([
          'beforeColon',
          'beforeComma',
          'afterColon',
          'afterComma',
        ]),
      ),
      breakStringLiterals: z.optional(z.boolean()),
      columnLimit: z.optional(z.number().int()),
      commentPragmas: z.optional(z.string()),
      compactNamespaces: z.optional(z.boolean()),
      constructorInitializerAllOnOneLineOrOnePerLine: z.optional(
        z.boolean(),
      ),
      constructorInitializerIndentWidth: z.optional(z.number().int()),
      continuationIndentWidth: z.optional(z.number().int()),
      deriveLineEnding: z.optional(z.boolean()),
      derivePointerAlignment: z.optional(z.boolean()),
      disableFormat: z.optional(z.boolean()),
      emptyLineAfterAccessModifier: z.optional(
        z.enum(['never', 'leave', 'always']),
      ),
      emptyLineBeforeAccessModifier: z.optional(
        z.enum(['never', 'leave', 'logicalBlock', 'always']),
      ),
      experimentalAutoDetectBinPacking: z.optional(z.boolean()),
      fixNamespaceComments: z.optional(z.boolean()),
      forEachMacros: z.optional(z.array(z.string())),
      ifMacros: z.optional(z.array(z.string())),
      includeBlocks: z.optional(
        z.enum(['preserve', 'merge', 'regroup']),
      ),
      includeIsMainRegex: z.optional(z.string()),
      includeIsMainSourceRegex: z.optional(z.string()),
      indentAccessModifiers: z.optional(z.boolean()),
      indentCaseBlocks: z.optional(z.boolean()),
      indentCaseLabels: z.optional(z.boolean()),
      indentExternBlock: z.optional(
        z.enum(['afterExternBlock', 'noIndent', 'indent']),
      ),
      indentGotoLabels: z.optional(z.boolean()),
      indentPpDirectives: z.optional(
        z.enum(['none', 'afterHash', 'beforeHash']),
      ),
      indentRequiresClause: z.optional(z.boolean()),
      indentWidth: z.optional(z.number().int()),
      indentWrappedFunctionNames: z.optional(z.boolean()),
      insertBraces: z.optional(z.boolean()),
      insertNewlineAtEof: z.optional(z.boolean()),
      insertTrailingCommas: z.optional(z.enum(['none', 'wrapped'])),
      integerLiteralSeparator: z.optional(z.object({})),
      keepEmptyLinesAtEof: z.optional(z.boolean()),
      keepEmptyLinesAtTheStartOfBlocks: z.optional(z.boolean()),
      lambdaBodyIndentation: z.optional(
        z.enum(['signature', 'outerScope']),
      ),
      language: z.optional(
        z.enum([
          'none',
          'cpp',
          'cSharp',
          'java',
          'javaScript',
          'json',
          'objC',
          'proto',
          'tableGen',
          'textProto',
          'verilog',
        ]),
      ),
      lineEnding: z.optional(
        z.enum(['lf', 'crlf', 'deriveLf', 'deriveCrlf']),
      ),
      macroBlockBegin: z.optional(z.string()),
      macroBlockEnd: z.optional(z.string()),
      macros: z.optional(z.array(z.string())),
      maxEmptyLinesToKeep: z.optional(z.number().int()),
      namespaceIndentation: z.optional(
        z.enum(['none', 'inner', 'all']),
      ),
      namespaceMacros: z.optional(z.array(z.string())),
      packConstructorInitializers: z.optional(
        z.enum([
          'never',
          'binPack',
          'currentLine',
          'nextLine',
          'nextLineOnly',
        ]),
      ),
      penaltyBreakAssignment: z.optional(z.number().int()),
      penaltyBreakBeforeFirstCallParameter: z.optional(
        z.number().int(),
      ),
      penaltyBreakComment: z.optional(z.number().int()),
      penaltyBreakFirstLessLess: z.optional(z.number().int()),
      penaltyBreakOpenParenthesis: z.optional(z.number().int()),
      penaltyBreakString: z.optional(z.number().int()),
      penaltyBreakTemplateDeclaration: z.optional(z.number().int()),
      penaltyExcessCharacter: z.optional(z.number().int()),
      penaltyIndentedWhitespace: z.optional(z.number().int()),
      penaltyReturnTypeOnItsOwnLine: z.optional(z.number().int()),
      pointerAlignment: z.optional(z.enum(['left', 'right', 'middle'])),
      qualifierAlignment: z.optional(
        z.enum(['leave', 'left', 'right', 'custom']),
      ),
      qualifierOrder: z.optional(z.array(z.string())),
      referenceAlignment: z.optional(
        z.enum(['pointer', 'left', 'right', 'middle']),
      ),
      reflowComments: z.optional(z.boolean()),
      removeBracesLlvm: z.optional(z.boolean()),
      removeParentheses: z.optional(
        z.enum(['leave', 'multipleParentheses', 'returnStatement']),
      ),
      removeSemicolon: z.optional(z.boolean()),
      requiresClausePosition: z.optional(
        z.enum([
          'ownLine',
          'withPreceding',
          'withFollowing',
          'singleLine',
        ]),
      ),
      requiresExpressionIndentation: z.optional(
        z.enum(['outerScope', 'keyword']),
      ),
      separateDefinitionBlocks: z.optional(
        z.enum(['leave', 'always', 'never']),
      ),
      shortNamespaceLines: z.optional(z.number().int()),
      sortIncludes: z.optional(
        z.enum(['never', 'caseSensitive', 'caseInsensitive']),
      ),
      sortUsingDeclarations: z.optional(
        z.enum(['never', 'lexicographic', 'lexicographicNumeric']),
      ),
      spaceAfterCStyleCast: z.optional(z.boolean()),
      spaceAfterLogicalNot: z.optional(z.boolean()),
      spaceAfterTemplateKeyword: z.optional(z.boolean()),
      spaceAroundPointerQualifiers: z.optional(
        z.enum(['default', 'before', 'after', 'both']),
      ),
      spaceBeforeAssignmentOperators: z.optional(z.boolean()),
      spaceBeforeCaseColon: z.optional(z.boolean()),
      spaceBeforeCtorInitializerColon: z.optional(z.boolean()),
      spaceBeforeInheritanceColon: z.optional(z.boolean()),
      spaceBeforeJsonColon: z.optional(z.boolean()),
      spaceBeforeParens: z.optional(
        z.enum([
          'never',
          'controlStatements',
          'controlStatementsExceptControlMacros',
          'nonEmptyParentheses',
          'always',
          'custom',
        ]),
      ),
      spaceBeforeParensOptions: z.optional(
        z.object({
          afterControlStatements: z.boolean(),
          afterForeachMacros: z.boolean(),
          afterFunctionDeclarationName: z.boolean(),
          afterFunctionDefinitionName: z.boolean(),
          afterIfMacros: z.boolean(),
          afterOverloadedOperator: z.boolean(),
          afterPlacementOperator: z.object({}),
          afterRequiresInClause: z.boolean(),
          afterRequiresInExpression: z.boolean(),
          beforeNonEmptyParentheses: z.boolean(),
        }),
      ),
      spaceBeforeRangeBasedForLoopColon: z.optional(z.boolean()),
      spaceBeforeSquareBrackets: z.optional(z.boolean()),
      spaceInEmptyBlock: z.optional(z.boolean()),
      spaceInEmptyParentheses: z.optional(z.boolean()),
      spacesBeforeTrailingComments: z.optional(z.number().int()),
      spacesInAngles: z.optional(z.enum(['never', 'always', 'leave'])),
      spacesInCStyleCastParentheses: z.optional(z.boolean()),
      spacesInConditionalStatement: z.optional(z.boolean()),
      spacesInContainerLiterals: z.optional(z.boolean()),
      spacesInLineCommentPrefix: z.optional(
        z.object({
          minimum: z.number().int(),
          maximum: z.number().int(),
        }),
      ),
      spacesInParens: z.optional(z.enum(['never', 'custom'])),
      spacesInParensOptions: z.optional(
        z.object({
          inConditionalStatements: z.boolean(),
          inCStyleCasts: z.boolean(),
          inEmptyParentheses: z.boolean(),
          other: z.boolean(),
        }),
      ),
      spacesInParentheses: z.optional(z.boolean()),
      spacesInSquareBrackets: z.optional(z.boolean()),
      standard: z.optional(
        z.enum([
          'lsCpp03',
          'lsCpp11',
          'lsCpp14',
          'lsCpp17',
          'lsCpp20',
          'latest',
          'auto',
        ]),
      ),
      statementAttributeLikeMacros: z.optional(z.array(z.string())),
      statementMacros: z.optional(z.array(z.string())),
      tabWidth: z.optional(z.number().int()),
      typeNames: z.optional(z.array(z.string())),
      typenameMacros: z.optional(z.array(z.string())),
      useCrlf: z.optional(z.boolean()),
      useTab: z.optional(
        z.enum([
          'never',
          'forIndentation',
          'forContinuationAndIndentation',
          'alignWithSpaces',
          'always',
        ]),
      ),
      verilogBreakBetweenInstancePorts: z.optional(z.boolean()),
      whitespaceSensitiveMacros: z.optional(z.array(z.string())),
    }) as z.ZodType<ClangStyleAll>
  }
  return ClangStyleAllModel!
}

let ClangStyleCppModel: z.ZodType<ClangStyleCpp>

export const ClangStyleCppParser = (): z.ZodType<ClangStyleCpp> => {
  if (!ClangStyleCppModel) {
    ClangStyleCppModel = (ClangStyleAllParser() as any).extend({
      cpp11BracedListStyle: z.optional(z.boolean()),
      spaceBeforeCpp11BracedList: z.optional(z.boolean()),
    }) as z.ZodType<ClangStyleCpp>
  }
  return ClangStyleCppModel!
}

let ClangStyleJavaModel: z.ZodType<ClangStyleJava>

export const ClangStyleJavaParser = (): z.ZodType<ClangStyleJava> => {
  if (!ClangStyleJavaModel) {
    ClangStyleJavaModel = (ClangStyleAllParser() as any).extend({
      breakAfterJavaFieldAnnotations: z.optional(z.boolean()),
      javaImportGroups: z.optional(z.array(z.string())),
      sortJavaStaticImport: z.optional(z.enum(['before', 'after'])),
    }) as z.ZodType<ClangStyleJava>
  }
  return ClangStyleJavaModel!
}

let ClangStyleJavascriptModel: z.ZodType<ClangStyleJavascript>

export const ClangStyleJavascriptParser =
  (): z.ZodType<ClangStyleJavascript> => {
    if (!ClangStyleJavascriptModel) {
      ClangStyleJavascriptModel = (ClangStyleAllParser() as any).extend(
        {
          javaScriptQuotes: z.optional(
            z.enum(['leave', 'single', 'double']),
          ),
          javaScriptWrapImports: z.optional(z.boolean()),
        },
      ) as z.ZodType<ClangStyleJavascript>
    }
    return ClangStyleJavascriptModel!
  }

let ClangStyleObjcModel: z.ZodType<ClangStyleObjc>

export const ClangStyleObjcParser = (): z.ZodType<ClangStyleObjc> => {
  if (!ClangStyleObjcModel) {
    ClangStyleObjcModel = (ClangStyleAllParser() as any).extend({
      objCBinPackProtocolList: z.optional(
        z.enum(['auto', 'always', 'never']),
      ),
      objCBlockIndentWidth: z.optional(z.number().int()),
      objCBreakBeforeNestedBlockParam: z.optional(z.boolean()),
      objCPropertyAttributeOrder: z.optional(z.array(z.string())),
      objCSpaceAfterProperty: z.optional(z.boolean()),
      objCSpaceBeforeProtocolList: z.optional(z.boolean()),
    }) as z.ZodType<ClangStyleObjc>
  }
  return ClangStyleObjcModel!
}
