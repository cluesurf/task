import { fitCommandToScreen } from '../shared/screen.js'
import prettier from 'prettier/standalone'

const PRETTIER = {
  arrowParens: 'avoid' as const,
  bracketSpacing: true,
  endOfLine: 'lf' as const,
  importOrder: [
    '^\\w(.*)$',
    '^@(.*)$',
    '~(.*)$',
    '\\..(.*)$',
    '\\.(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  parser: 'typescript',
  printWidth: 72,
  proseWrap: 'always' as const,
  quoteProps: 'as-needed' as const,
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all' as const,
  useTabs: false,
}

export function formatTypeScriptCode(code: string) {
  return prettier.format(code, {
    ...PRETTIER,
    parser: 'typescript',
  })
}

export async function formatCommand(input: Array<string>) {
  return fitCommandToScreen(input)
}
