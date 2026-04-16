// `task inspect figma <url-or-key>` — summary of a Figma file.
// Shows the file title, last-modified, version, and a short
// outline of pages + frames.

import { getFileSummary, listComponents, type FigmaNode } from '~/code/tool/node/figma'
import { renderTable } from '~/code/tool/terminal/component/table'

export type InspectFigmaNodeInput = {
  fileKey: string
  show?: 'overview' | 'components' | 'pages'
}

async function inspectFigmaNode(
  source: InspectFigmaNodeInput,
): Promise<void> {
  const show = source.show ?? 'overview'

  if (show === 'components') {
    const r = await listComponents(source.fileKey)
    process.stdout.write(JSON.stringify(r, null, 2) + '\n')
    return
  }

  const summary = await getFileSummary(source.fileKey)

  if (show === 'pages') {
    process.stdout.write(
      renderTable({
        columns: [
          { header: 'PAGE', align: 'left' },
          { header: 'ID', align: 'left' },
          { header: 'FRAMES', align: 'right' },
        ],
        rows: summary.pages.map(p => [
          p.name,
          p.id,
          countFrames(p),
        ]),
        color: process.stdout.isTTY ?? false,
      }),
    )
    return
  }

  // overview: key/value summary + per-page row count.
  const color = process.stdout.isTTY ?? false
  const fmt = (k: string, v: string) =>
    `  ${color ? '\x1b[2m' : ''}${k.padEnd(14)}${color ? '\x1b[0m' : ''}${v}\n`
  process.stdout.write('\n')
  process.stdout.write(fmt('title', summary.name))
  process.stdout.write(fmt('last-modified', new Date(summary.lastModified).toISOString()))
  process.stdout.write(fmt('version', summary.version))
  process.stdout.write(fmt('pages', String(summary.pages.length)))
  process.stdout.write(
    renderTable({
      columns: [
        { header: 'PAGE', align: 'left' },
        { header: 'ID', align: 'left' },
        { header: 'FRAMES', align: 'right' },
      ],
      rows: summary.pages.map(p => [p.name, p.id, countFrames(p)]),
      color,
    }),
  )
}

function countFrames(page: FigmaNode): number {
  return (page.children ?? []).filter(
    n => n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'COMPONENT_SET',
  ).length
}

export default inspectFigmaNode
export { inspectFigmaNode }
