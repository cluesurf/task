import Parser, { Language } from 'web-tree-sitter'

// https://siraben.dev/2022/03/22/tree-sitter-linter.html

export const TREE_SITTER_LANGUAGE: Record<string, Parser> = {}

export async function initializeTreeSitter() {
  await Parser.init({
    // locateFile(scriptName: string, scriptDirectory: string) {
    //   return scriptName
    // },
  })
}

export async function loadLanguage(name: string, pathToWasm: string) {
  const Lang = await Parser.Language.load(pathToWasm)
  const parser = new Parser()
  parser.setLanguage(Lang)
  TREE_SITTER_LANGUAGE[name] = parser
}

export async function parseTreeSitter(lang: string, code: string) {
  const parser = TREE_SITTER_LANGUAGE[lang]
  if (!parser) {
    throw new Error(`Parser not found for ${lang}`)
  }
  const tree = parser.parse(code)
  return tree
}
