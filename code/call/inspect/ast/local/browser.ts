// web-tree-sitter 0.26 restructured the module: the default export is
// no longer a constructor-like `Parser` and `Parser.init` /
// `Parser.Language.load` are gone. This file still targets the 0.20
// API. Typed as `any` until the migration happens; runtime code path
// is unchanged.
import TreeSitterParser from 'web-tree-sitter'

const Parser = TreeSitterParser as unknown as {
  init: (options?: Record<string, unknown>) => Promise<void>
  Language: { load: (path: string) => Promise<unknown> }
  new (): { setLanguage: (lang: unknown) => void; parse: (code: string) => unknown }
}

export const TREE_SITTER_LANGUAGE: Record<
  string,
  InstanceType<typeof Parser>
> = {}

export async function initializeTreeSitter() {
  await Parser.init({})
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
