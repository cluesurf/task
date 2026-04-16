// `task export figma <url> -o out/ --format svg` — render nodes
// (frames by default, or specific `--node <id>`) via the Figma
// `/images` endpoint and save the bytes to disk.

import path from 'node:path'
import { promises as fs } from 'node:fs'
import {
  collectFrames,
  getFile,
  renderNodes,
  type FigmaImageFormat,
  type FigmaNode,
} from '~/code/tool/node/figma'

export type ExportFigmaNodeInput = {
  fileKey: string
  output: { path: string }
  format?: FigmaImageFormat
  /** Comma-separated node ids. If empty, every top-level frame is
   * exported. */
  nodeIds?: string[]
  scale?: number
}

async function exportFigmaNode(source: ExportFigmaNodeInput): Promise<void> {
  const format = source.format ?? 'svg'
  const scale = source.scale

  // Pick nodes. Explicit ids win; otherwise enumerate the file's
  // frames so "export this Figma file" Just Works.
  let nodes: { id: string; name: string }[]
  if (source.nodeIds?.length) {
    const file = await getFile(source.fileKey)
    const byId = new Map<string, FigmaNode>()
    walk(file.document, n => byId.set(n.id, n))
    nodes = source.nodeIds.map(id => ({
      id,
      name: byId.get(id)?.name ?? id,
    }))
  } else {
    const file = await getFile(source.fileKey)
    nodes = collectFrames(file.document).map(f => ({ id: f.id, name: f.name }))
  }

  if (nodes.length === 0) {
    throw new Error('no frames or nodes to export')
  }

  const urls = await renderNodes(
    source.fileKey,
    nodes.map(n => n.id),
    { format, scale },
  )

  await fs.mkdir(source.output.path, { recursive: true })
  for (const { id, name } of nodes) {
    const url = urls[id]
    if (!url) continue
    const res = await fetch(url)
    const buf = Buffer.from(await res.arrayBuffer())
    const file = path.join(
      source.output.path,
      `${sanitize(name)}.${format}`,
    )
    await fs.writeFile(file, buf)
    process.stdout.write(`${file}\n`)
  }
}

function walk(node: FigmaNode, visit: (n: FigmaNode) => void): void {
  visit(node)
  for (const c of node.children ?? []) walk(c, visit)
}

function sanitize(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '')
}

export default exportFigmaNode
export { exportFigmaNode }
