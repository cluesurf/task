// Figma REST backend. Auth via $FIGMA_TOKEN (personal access
// token, one click in Figma settings). Takes either a file key
// (`abc123...`) or a full figma.com URL.

const API_BASE = 'https://api.figma.com/v1'

function token(): string {
  const t = process.env.FIGMA_TOKEN ?? process.env.FIGMA_ACCESS_TOKEN
  if (!t) {
    throw new Error(
      'FIGMA_TOKEN not set. Create one at https://www.figma.com/settings (Personal access tokens).',
    )
  }
  return t
}

/** Extract a file key from a Figma URL, or return the key as-is. */
export function resolveFileKey(urlOrKey: string): string {
  const m = urlOrKey.match(/figma\.com\/(?:file|design|board|proto)\/([a-zA-Z0-9]+)/)
  if (m && m[1]) return m[1]
  return urlOrKey
}

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'x-figma-token': token() },
  })
  if (!res.ok) {
    throw new Error(`figma API ${path}: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

// ─── types ────────────────────────────────────────────────────────

export type FigmaNode = {
  id: string
  name: string
  type: string
  children?: FigmaNode[]
}

export type FigmaFile = {
  name: string
  lastModified: string
  thumbnailUrl?: string
  version: string
  document: FigmaNode
  components?: Record<string, { key: string; name: string; description?: string }>
  componentSets?: Record<string, { key: string; name: string; description?: string }>
  styles?: Record<string, { key: string; name: string; styleType: string }>
}

export type FigmaImageFormat = 'svg' | 'png' | 'jpg' | 'pdf'

// ─── ops ──────────────────────────────────────────────────────────

/** Shallow file fetch — enough for a summary without pulling the
 * whole document tree. */
export async function getFileSummary(key: string): Promise<{
  name: string
  lastModified: string
  version: string
  pages: FigmaNode[]
}> {
  const file = await api<FigmaFile>(`/files/${resolveFileKey(key)}?depth=2`)
  return {
    name: file.name,
    lastModified: file.lastModified,
    version: file.version,
    pages: file.document.children ?? [],
  }
}

export async function getFile(key: string): Promise<FigmaFile> {
  return api<FigmaFile>(`/files/${resolveFileKey(key)}`)
}

export async function listComponents(key: string): Promise<unknown> {
  return api(`/files/${resolveFileKey(key)}/components`)
}

export async function listStyles(key: string): Promise<unknown> {
  return api(`/files/${resolveFileKey(key)}/styles`)
}

export async function getFileVersions(key: string): Promise<unknown> {
  return api(`/files/${resolveFileKey(key)}/versions`)
}

/** Render nodes. Returns a `{ [nodeId]: url }` map of temporary
 * image URLs; callers fetch and save the bytes. */
export async function renderNodes(
  key: string,
  nodeIds: string[],
  opts: { format?: FigmaImageFormat; scale?: number } = {},
): Promise<Record<string, string>> {
  const params = new URLSearchParams({
    ids: nodeIds.join(','),
    format: opts.format ?? 'svg',
  })
  if (opts.scale) params.set('scale', String(opts.scale))
  const r = await api<{ images: Record<string, string>; err?: string }>(
    `/images/${resolveFileKey(key)}?${params}`,
  )
  if (r.err) throw new Error(`figma render: ${r.err}`)
  return r.images
}

/** Walk the document tree and return every top-level frame
 * across every page. Convenient for bulk export. */
export function collectFrames(doc: FigmaNode): FigmaNode[] {
  const out: FigmaNode[] = []
  for (const page of doc.children ?? []) {
    for (const node of page.children ?? []) {
      if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        out.push(node)
      }
    }
  }
  return out
}
