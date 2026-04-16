/**
 * Top-level `task.archive({...})` router. Picks the best backend
 * for the requested output format unless the caller forces a
 * specific tool via `input.tool`.
 *
 * Per-format defaults:
 *   zip         → zip
 *   rar         → rar
 *   7z          → 7z
 *   tar(.*)     → tar
 *   gz/bz2/xz/zst (single-file) → 7z
 *
 * Override by passing `tool: 'atool' | 'patool' | ...` on the input.
 */

import { spawnAndWait } from '~/code/tool/node/spawn'
import type { Archive } from '~/code/form/action/archive'

type ArchiveInput = Archive & { tool?: ArchiveTool }

export type ArchiveTool =
  | 'zip'
  | 'rar'
  | '7z'
  | 'tar'
  | 'atool'
  | 'patool'

const DEFAULT_TOOL_BY_FORMAT: Record<string, ArchiveTool> = {
  zip: 'zip',
  rar: 'rar',
  '7z': '7z',
  tar: 'tar',
  'tar.gz': 'tar',
  'tar.bz2': 'tar',
  'tar.xz': 'tar',
  'tar.zst': 'tar',
  tgz: 'tar',
  tbz2: 'tar',
  txz: 'tar',
  tzst: 'tar',
  gz: '7z',
  bz2: '7z',
  xz: '7z',
  zst: '7z',
}

async function archiveNode(source: ArchiveInput): Promise<void> {
  const tool = pickTool(source)
  const { bin, args } = await buildSequence({ tool, source })
  await spawnAndWait({ verb: 'archive', bin, args })
}

function pickTool(source: ArchiveInput): ArchiveTool {
  if (source.tool) return source.tool
  const fmt = source.output.format
  const tool = DEFAULT_TOOL_BY_FORMAT[fmt]
  if (!tool) {
    throw new Error(`No default archive tool for format "${fmt}"`)
  }
  return tool
}

async function buildSequence({
  tool,
  source,
}: {
  tool: ArchiveTool
  source: ArchiveInput
}) {
  switch (tool) {
    case 'zip': {
      const { buildCommandToArchiveWithZip } = await import('./zip/command')
      return buildCommandToArchiveWithZip(source as never)
    }
    case 'rar': {
      const { buildCommandToArchiveWithRar } = await import('./rar/command')
      return buildCommandToArchiveWithRar(source as never)
    }
    case '7z': {
      const { buildCommandToArchiveWithSevenzip } = await import(
        './sevenzip/command'
      )
      return buildCommandToArchiveWithSevenzip(source as never)
    }
    case 'tar': {
      const { buildCommandToArchiveWithTar } = await import('./tar/command')
      return buildCommandToArchiveWithTar(source as never)
    }
    case 'atool': {
      const { buildCommandToArchiveWithAtool } = await import(
        './atool/command'
      )
      return buildCommandToArchiveWithAtool(source as never)
    }
    case 'patool': {
      const { buildCommandToArchiveWithPatool } = await import(
        './patool/command'
      )
      return buildCommandToArchiveWithPatool(source as never)
    }
  }
}

export default archiveNode
export { archiveNode }
