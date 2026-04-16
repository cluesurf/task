/**
 * `task dump font` -- shell out to `ttx` (fontTools). Direction is
 * inferred from the input extension:
 *
 *   .ttf / .otf -> .ttx   (dump)
 *   .ttx        -> .ttf   (compile)
 *
 * When no output path is passed, we pick the canonical sibling:
 * `foo.ttf` -> `foo.ttx`, `foo.ttx` -> `foo.ttf`.
 */

import path from 'node:path'
import type { DumpFontNodeLocalInput } from '~/code/form/action/dump/font/node'
import {
  DumpFontNodeInputParser,
  DumpFontNodeLocalInputParser,
  DumpFontNodeOutputParser,
} from '~/code/form/action/dump/font/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildDumpFontCommand } from './command'

async function runLocal(input: DumpFontNodeLocalInput) {
  const inputPath = input.input.file.path
  const inputExt = path.extname(inputPath).toLowerCase()

  let direction: 'dump' | 'compile'
  let defaultOut: string
  if (inputExt === '.ttf' || inputExt === '.otf') {
    direction = 'dump'
    defaultOut = inputPath.replace(/\.(ttf|otf)$/i, '') + '.ttx'
  } else if (inputExt === '.ttx') {
    direction = 'compile'
    defaultOut = inputPath.replace(/\.ttx$/i, '') + '.ttf'
  } else {
    throw new Error(
      `dump font: unsupported input extension "${inputExt}". ` +
        `Expected .ttf, .otf, or .ttx.`,
    )
  }

  const outputPath = input.output?.file?.path ?? defaultOut
  await ensureParentDir(outputPath)

  await runCommandSequence(
    buildDumpFontCommand({
      input: inputPath,
      output: outputPath,
      tables: input.tables
        ? input.tables
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        : undefined,
    }),
  )

  return { file: { path: outputPath }, direction }
}

const [dumpFontNode, testDumpFontNode] = createNodeHandler({
  parsers: {
    input: DumpFontNodeInputParser,
    local: DumpFontNodeLocalInputParser,
    output: DumpFontNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { dumpFontNode, testDumpFontNode }
