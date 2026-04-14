/**
 * `task modify pdf` (Node) — qpdf shell-out for both `--order`
 * and `--remove`. Browser path stays in `./browser.ts`.
 *
 *   --order 3,1,2 → qpdf --empty --pages in 3,1,2 -- out
 *   --remove 2,5  → derive complement spec, then same recipe
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { exec } from '~/code/tool/node/process'
import { runCommandSequence } from '~/code/tool/node/command'
import { getCommand } from '~/code/tool/shared/command'
import {
  parsePageList,
  parsePageRanges,
} from '~/code/tool/shared/pdf-pages'
import {
  buildQpdfReorderCommand,
  complementSpec,
} from './command'

export type ModifyPdfNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  order?: string
  remove?: string
}

export type ModifyPdfNodeOutput = {
  file: { path: string }
  pagesAfter: number
  operation: 'order' | 'remove'
}

export async function modifyPdfNode(
  source: ModifyPdfNodeInput,
): Promise<ModifyPdfNodeOutput> {
  if (source.order && source.remove) {
    throw new Error('Pass either --order or --remove, not both')
  }
  if (!source.order && !source.remove) {
    throw new Error('Pass --order <list> or --remove <list>')
  }

  const inputPath = source.input.file.path
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  let spec: string
  let pagesAfter: number
  let operation: 'order' | 'remove'

  if (source.order) {
    pagesAfter = parsePageList(source.order).length
    spec = source.order
    operation = 'order'
  } else {
    const total = await pdfPageCount(inputPath)
    const drop = new Set(parsePageRanges(source.remove!))
    spec = complementSpec(total, drop)
    pagesAfter = total - drop.size
    operation = 'remove'
  }

  await runCommandSequence(
    buildQpdfReorderCommand({ input: inputPath, output: outputPath, spec }),
  )

  return { file: { path: outputPath }, pagesAfter, operation }
}

async function pdfPageCount(input: string): Promise<number> {
  const cmd = getCommand('pdfinfo')
  cmd.link.push(input)
  const { stdout } = await exec(cmd.link)
  const match = stdout.match(/^Pages:\s+(\d+)/m)
  if (!match) {
    throw new Error(`pdfinfo could not read page count from "${input}"`)
  }
  return Number(match[1])
}
