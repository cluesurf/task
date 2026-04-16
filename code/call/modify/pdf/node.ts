/**
 * `task modify pdf` (Node) -- qpdf shell-out for both `--order`
 * and `--remove`. Browser path stays in `./browser.ts`.
 *
 *   --order 3,1,2 -> qpdf --empty --pages in 3,1,2 -- out
 *   --remove 2,5  -> derive complement spec, then same recipe
 */

import type { ModifyPdfNodeLocalInput } from '~/code/form/action/modify/pdf/node'
import {
  ModifyPdfNodeInputParser,
  ModifyPdfNodeLocalInputParser,
  ModifyPdfNodeOutputParser,
} from '~/code/form/action/modify/pdf/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndCapture, spawnAndWait } from '~/code/tool/node/spawn'
import {
  parsePageList,
  parsePageRanges,
} from '~/code/tool/shared/pdf-pages'
import {
  buildPdfinfoCommand,
  buildQpdfReorderCommand,
  complementSpec,
} from './command'

async function runLocal(
  input: ModifyPdfNodeLocalInput,
) {
  if (input.order && input.remove) {
    throw new Error('Pass either --order or --remove, not both')
  }
  if (!input.order && !input.remove) {
    throw new Error('Pass --order <list> or --remove <list>')
  }

  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)

  let spec: string
  let pagesAfter: number

  if (input.order) {
    pagesAfter = parsePageList(input.order).length
    spec = input.order
  } else {
    const total = await pdfPageCount(inputPath)
    const drop = new Set(parsePageRanges(input.remove!))
    spec = complementSpec(total, drop)
    pagesAfter = total - drop.size
  }

  const command = buildQpdfReorderCommand({
    input: inputPath,
    output: outputPath,
    spec,
  })
  await spawnAndWait({
    verb: 'modify pdf',
    bin: command.bin,
    args: command.args,
  })

  return { file: { path: outputPath } }
}

async function pdfPageCount(inputPath: string): Promise<number> {
  const command = buildPdfinfoCommand(inputPath)
  const stdout = await spawnAndCapture({
    verb: 'modify pdf',
    bin: command.bin,
    args: command.args,
  })
  const match = stdout.match(/^Pages:\s+(\d+)/m)
  if (!match) {
    throw new Error(
      `pdfinfo could not read page count from "${inputPath}"`,
    )
  }
  return Number(match[1])
}

const [modifyPdfNode, testModifyPdfNode] = createNodeHandler({
  parsers: {
    input: ModifyPdfNodeInputParser,
    local: ModifyPdfNodeLocalInputParser,
    output: ModifyPdfNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default modifyPdfNode
export { modifyPdfNode, testModifyPdfNode }
